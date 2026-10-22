#!/usr/bin/env python
"""Price, parse and score the transcripts written by run.py."""

from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import statistics
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

AGENT_DIR = Path(__file__).parent
RUNS_DIR = AGENT_DIR / "runs"
DATA_INDEX_JS = AGENT_DIR.parent / "js" / "data-index.js"
PROMPTS = json.loads((AGENT_DIR / "prompts.json").read_text())
CATEGORIES = PROMPTS["categories"]
CATEGORY_NAMES = PROMPTS["category_names"]
DATA_INDEX_DOMAIN = "dataindex.us"

# USD per million input and output tokens, for the uncached-cost estimate.
PRICES_PER_MILLION = {
    "claude-haiku-4-5-20251001": (1.00, 5.00),
    "claude-sonnet-5": (2.00, 10.00),
    "claude-opus-5": (5.00, 25.00),
    "claude-opus-5-5": (4.00, 20.00),
    "claude-opus-5.5": (4.00, 20.00),
}
SEARCH_PRICE = 0.01

CANONICAL_LEVELS = {level.lower(): level for level in PROMPTS["levels"]}
LEVEL_ALIASES = {"high": "High Risk", "moderate": "Moderate Risk"}
LEVEL_REGEX = (
    "(?:" + "|".join(re.escape(level) for level in [*PROMPTS["levels"], *LEVEL_ALIASES]) + r")\b"
)
LEVEL_RANK = {"No Known Issue": 0, "Moderate Risk": 1, "High Risk": 2, "Gone": 3}


def format_error_stats(gaps: list[int]) -> str:
    """Distance from the Data Index in rubric levels; positive bias means rated safer."""
    if not gaps:
        return "no rated categories"
    errors = [abs(gap) for gap in gaps]
    return (
        f"mean {statistics.mean(errors):.2f} · median {statistics.median(errors):g} · "
        f"max {max(errors)} · min {min(errors)} levels · bias {statistics.mean(gaps):+.2f} "
        f"(n={len(gaps)})"
    )


def load_ground_truth() -> dict:
    if not DATA_INDEX_JS.exists():
        print(f"no {DATA_INDEX_JS.relative_to(AGENT_DIR.parent)}, skipping scoring")
        return {}
    if not shutil.which("node"):
        print("node not found, skipping scoring")
        return {}
    script = (
        "const fs = require('fs'), vm = require('vm');"
        "const code = fs.readFileSync(process.argv[1], 'utf8');"
        "process.stdout.write(vm.runInNewContext(code + '\\n;JSON.stringify(DATA_INDEX)'));"
    )
    result = subprocess.run(
        ["node", "-e", script, str(DATA_INDEX_JS)], capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"could not evaluate data-index.js, skipping scoring:\n{result.stderr[:500]}")
        return {}
    return json.loads(result.stdout)


def sum_usage(record: dict) -> dict:
    """Token, tool and cost totals across every request in the run.

    OpenRouter's input_tokens includes cache reads and writes, so they are
    subtracted to leave uncached input."""
    totals = dict.fromkeys(
        ("input_tokens", "cache_read_tokens", "cache_write_tokens", "output_tokens",
         "searches", "fetches"),
        0,
    )
    totals["billed"] = 0.0
    for turn in record["turns"].values():
        totals["searches"] += turn["searches"]
        totals["fetches"] += turn["fetches"]
        for usage in turn["requests"]:
            details = usage.get("input_tokens_details") or {}
            cache_read = details.get("cached_tokens") or 0
            cache_write = details.get("cache_write_tokens") or 0
            totals["input_tokens"] += max((usage.get("input_tokens") or 0) - cache_read - cache_write, 0)
            totals["cache_read_tokens"] += cache_read
            totals["cache_write_tokens"] += cache_write
            totals["output_tokens"] += usage.get("output_tokens") or 0
            totals["billed"] += usage.get("cost") or 0.0
    return totals


def uncached_cost(model: str, totals: dict) -> float | None:
    """What the run would have cost with no cache hits, for models with known prices."""
    prices = PRICES_PER_MILLION.get(model.split("/")[-1])
    if prices is None:
        return None
    input_price, output_price = prices
    all_input = totals["input_tokens"] + totals["cache_read_tokens"] + totals["cache_write_tokens"]
    return round(
        all_input / 1e6 * input_price
        + totals["output_tokens"] / 1e6 * output_price
        + totals["searches"] * SEARCH_PRICE,
        2,
    )


def assistant_reply(record: dict, turn_index: int) -> str:
    """The nth reply: 0 research, 1 assessment, 2 session metadata."""
    replies = [m["content"] for m in record["messages"] if m["role"] == "assistant"]
    return replies[turn_index] if turn_index < len(replies) else ""


def parse_levels(assessment: str) -> dict[str, str | None]:
    """The closing summary's level per category, as `Name: Level`, bold, or a table row.

    The last match wins, since the summary follows the per-category discussion."""
    levels = {}
    for key in CATEGORIES:
        pattern = rf"{re.escape(CATEGORY_NAMES[key])}\**\s*[:|]\s*\**\s*({LEVEL_REGEX})"
        found = re.findall(pattern, assessment, flags=re.IGNORECASE)
        if found:
            matched = found[-1].lower()
            levels[key] = CANONICAL_LEVELS.get(matched) or LEVEL_ALIASES[matched]
        else:
            levels[key] = None
    return levels


def score_against_index(levels: dict, truth: dict) -> list[tuple[str, str, str, int]]:
    """(category, agent level, Data Index level, gap) where both rated; positive gap is safer."""
    scored = []
    for key in CATEGORIES:
        agent_level = levels.get(key)
        index_level = CANONICAL_LEVELS.get(str((truth.get(key) or {}).get("level", "")).lower())
        if agent_level and index_level:
            scored.append((key, agent_level, index_level, LEVEL_RANK[index_level] - LEVEL_RANK[agent_level]))
    return scored


def rated_category_count(truth: dict) -> int:
    return sum(1 for key in CATEGORIES if (truth.get(key) or {}).get("level"))


def category_evidence(assessment: str, key: str) -> str:
    """The assessment's section for one category, from its heading to the next."""
    pattern = rf"^#+[^\n]*{re.escape(CATEGORY_NAMES[key])}[^\n]*\n(.*?)(?=^#+ |\Z)"
    match = re.search(pattern, assessment, flags=re.MULTILINE | re.DOTALL | re.IGNORECASE)
    return match.group(1).strip() if match else ""


def search_trail(record: dict) -> tuple[list[str], list[str]]:
    queries, fetched_urls = [], []
    for turn in record["turns"].values():
        for item in turn.get("tool_items", []):
            if item.get("type") == "openrouter:web_search":
                queries.append((item.get("action") or {}).get("query"))
            elif item.get("type") == "openrouter:web_fetch":
                fetched_urls.append(item.get("url"))
    return queries, fetched_urls


def data_index_contact(record: dict) -> tuple[list[str], list[str], bool]:
    """Visits (a leak), blocked fetch attempts, and whether the domain is merely mentioned."""
    visits, blocked, mentions = [], [], []

    def walk(node, field_name="", refused=False):
        if isinstance(node, dict):
            refused = refused or bool(node.get("error"))
            for name, value in node.items():
                walk(value, name, refused)
        elif isinstance(node, list):
            for value in node:
                walk(value, field_name, refused)
        elif isinstance(node, str) and DATA_INDEX_DOMAIN in node:
            host = urlparse(node).netloc.lower() if field_name in ("url", "uri") else ""
            if host == DATA_INDEX_DOMAIN or host.endswith("." + DATA_INDEX_DOMAIN):
                (blocked if refused else visits).append(node)
            else:
                mentions.append(node)

    walk([record["turns"], record["messages"]])
    return sorted(set(visits)), sorted(set(blocked)), bool(mentions)


def reasoning_effort(record: dict) -> str:
    for turn in record["turns"].values():
        effort = ((turn.get("request") or {}).get("reasoning") or {}).get("effort")
        if effort:
            return effort
    return "default"


def turn_reasoning_tokens(turn: dict) -> int | None:
    usage = turn["requests"][0] if turn.get("requests") else {}
    return (usage.get("output_tokens_details") or {}).get("reasoning_tokens")


def print_run(record: dict, totals: dict, levels: dict, trail: tuple, contact: tuple,
              billed: float, uncached: float | None) -> None:
    key, model = record["dataset"]["key"], record["model"]
    seconds = " · ".join(f"{label} {turn['seconds']}s" for label, turn in record["turns"].items())
    print(f"\n{key}  {model}  trial {record.get('trial', 0)}  {record['harness']}  {seconds}")

    if record["terminate_reason"] != "completed":
        print(f"   FAILED: {record['terminate_reason'][:200]}")
    visits, blocked, mentioned = contact
    if visits:
        print(f"   LEAK: the agent reached the Data Index: {', '.join(visits)[:200]}")
    else:
        if mentioned:
            print("   note: dataindex.us is mentioned in a page or the reply, but never visited")
        if blocked:
            print(f"   note: the agent tried to fetch the Data Index and was blocked: {', '.join(blocked)[:200]}")

    print(f"   search: {json.dumps(record['search_tool'])}")
    catalog_entry = record["catalog"].get("entry")
    accepted = catalog_entry.get("reasoning") if isinstance(catalog_entry, dict) else None
    per_turn = []
    for label, turn in record["turns"].items():
        tokens = turn_reasoning_tokens(turn)
        applied = (turn.get("response_meta") or {}).get("reasoning")
        per_turn.append(f"{label} {'?' if tokens is None else tokens}"
                        + (f" {json.dumps(applied)}" if applied else ""))
    print(f"   reasoning: {record['reasoning']} · catalog: {json.dumps(accepted)}")
    print(f"   reasoning tokens: {' · '.join(per_turn)}")

    print(
        f"   tokens: {totals['input_tokens']:,} in · "
        f"{totals['cache_read_tokens']:,} cache read · "
        f"{totals['cache_write_tokens']:,} cache write · "
        f"{totals['output_tokens']:,} out · {totals['searches']} searches"
    )
    print(f"   cost: ${billed} as billed" + (f" · ${uncached} if uncached" if uncached is not None else ""))
    print("   levels: " + "  ".join(f"{key}={levels[key] or '?'}" for key in CATEGORIES))
    unparsed = [key for key in CATEGORIES if not levels[key]]
    if unparsed:
        print(f"   could not parse: {', '.join(unparsed)}")
    queries, fetched_urls = trail
    print(f"   trail: {len(queries)} searches, {len(fetched_urls)} fetches")


def print_scoring(scored: list, rated_count: int) -> None:
    gaps = [gap for *_, gap in scored]
    matches = gaps.count(0)
    print(f"   vs Data Index: {matches}/{rated_count} match · {sum(map(abs, gaps))} levels off · "
          f"{sum(gap > 0 for gap in gaps)} rated safer, {sum(gap < 0 for gap in gaps)} rated riskier")
    print(f"   error: {format_error_stats(gaps)}")
    for category, agent_level, index_level, gap in scored:
        if gap:
            print(f"      {category}: {agent_level}, Data Index {index_level}")
    if len(scored) < rated_count:
        print(f"   {rated_count - len(scored)} categories unrated, scored as misses")


def print_model_summaries(rows: list[dict]) -> None:
    by_model = defaultdict(list)
    for row in rows:
        by_model[row["model"]].append(row)

    print("\nby model")
    for model, model_rows in sorted(by_model.items()):
        run_count = len(model_rows)
        gaps = [gap for row in model_rows for gap in row["_gaps"]]
        matches = sum(row["matches"] for row in model_rows)
        rated = sum(row["scored"] for row in model_rows)
        failed = sum(row["failed"] for row in model_rows)
        leaked = sum(row["_leaked"] for row in model_rows)

        match_rate = f"{matches}/{rated} ({matches / rated:.0%})" if rated else "unscored"
        flags = (f" ({failed} failed)" if failed else "") + (
            f" ({leaked} reached the Data Index)" if leaked else "")
        print(
            f"   {model}: {run_count} runs{flags} · match {match_rate} · "
            f"{sum(row['levels_off'] for row in model_rows)} levels off · "
            f"{sum(gap > 0 for gap in gaps)} safer, {sum(gap < 0 for gap in gaps)} riskier · "
            f"${sum(row['cost'] for row in model_rows) / run_count:.2f} avg · "
            f"{sum(row['searches'] for row in model_rows) / run_count:.0f} searches, "
            f"{sum(row['fetches'] for row in model_rows) / run_count:.0f} fetches avg"
        )
        unrated = rated - len(gaps)
        print(f"      error: {format_error_stats(gaps)}"
              + (f" · {unrated} unrated, left out of the error" if unrated else ""))


def write_summaries(rows: list[dict]) -> None:
    """summary.csv, one row per run, and summary.md, one row per model plus error by dataset."""
    if not rows:
        return
    with open(RUNS_DIR / "summary.csv", "w", newline="") as handle:
        public_fields = [name for name in rows[0] if not name.startswith("_")]
        writer = csv.DictWriter(handle, fieldnames=public_fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

    by_model = defaultdict(list)
    for row in rows:
        by_model[row["model"]].append(row)

    def format_stat(values, function, template):
        return template.format(function(values)) if values else "n/a"

    lines = [
        "# Background agent results", "",
        "Averages are per run, one run per dataset. Error is distance on the rubric "
        "scale (No Known Issue 0, Moderate 1, High 2, Gone 3); bias is positive when "
        "the agent rates data safer than the Data Index.", "",
        "| Model | Runs | Failed | Matches | Mean error | Median | Max | Bias | "
        "Cost / dataset | Total cost | Minutes / dataset | Searches | Fetches | Effort | Reasoning tokens |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |",
    ]
    for model, model_rows in sorted(by_model.items()):
        run_count = len(model_rows)
        gaps = [gap for row in model_rows for gap in row["_gaps"]]
        errors = [abs(gap) for gap in gaps]
        matches = sum(row["matches"] for row in model_rows)
        rated = sum(row["scored"] for row in model_rows)
        total_cost = sum(row["cost"] for row in model_rows)
        match_cell = f"{matches}/{rated} ({matches / rated:.0%})" if rated else "unscored"
        efforts = ", ".join(sorted({row["effort"] for row in model_rows}))
        lines.append(
            f"| {model} | {run_count} | {sum(row['failed'] for row in model_rows)} | {match_cell} | "
            f"{format_stat(errors, statistics.mean, '{:.2f}')} | "
            f"{format_stat(errors, statistics.median, '{:g}')} | "
            f"{format_stat(errors, max, '{}')} | "
            f"{format_stat(gaps, statistics.mean, '{:+.2f}')} | "
            f"${total_cost / run_count:.2f} | ${total_cost:.2f} | "
            f"{sum(row['seconds'] for row in model_rows) / run_count / 60:.1f} | "
            f"{sum(row['searches'] for row in model_rows) / run_count:.1f} | "
            f"{sum(row['fetches'] for row in model_rows) / run_count:.1f} | {efforts} | "
            f"{sum(row['reasoning_tokens'] for row in model_rows) / run_count:,.0f} |"
        )

    models = sorted(by_model)
    lines += [
        "", "## Mean error by dataset", "",
        "| Dataset | " + " | ".join(models) + " |",
        "| --- |" + " ---: |" * len(models),
    ]
    for dataset in sorted({row["dataset"] for row in rows}):
        cells = []
        for model in models:
            hits = [row for row in by_model[model] if row["dataset"] == dataset and row["mean_error"] != ""]
            cells.append(f"{hits[0]['mean_error']:.2f}" if hits else "n/a")
        lines.append(f"| {dataset} | " + " | ".join(cells) + " |")

    (RUNS_DIR / "summary.md").write_text("\n".join(lines) + "\n")
    print(f"wrote {(RUNS_DIR / 'summary.md').relative_to(AGENT_DIR)} and "
          f"{(RUNS_DIR / 'summary.csv').relative_to(AGENT_DIR)}")


def write_agent_results(agent_results: dict) -> None:
    """One AGENT_RESULTS block per model, ready to paste into js/site.js."""
    for model, results in agent_results.items():
        path = RUNS_DIR / f"agent_results__{model.replace('/', '_')}.js"
        path.write_text("const AGENT_RESULTS = " + json.dumps(results, indent=2) + ";\n")
        print(f"wrote {path.relative_to(AGENT_DIR)}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("datasets", nargs="*", help="dataset keys; default every run")
    args = parser.parse_args()

    records = [json.loads(path.read_text()) for path in sorted(RUNS_DIR.glob("*__*.json"))]
    records = [r for r in records if not args.datasets or r["dataset"]["key"] in args.datasets]
    if not records:
        sys.exit("no runs found")
    ground_truth = load_ground_truth()

    rows = []
    agent_results = defaultdict(dict)
    for record in records:
        key, model = record["dataset"]["key"], record["model"]
        trial = record.get("trial", 0)
        failed = record["terminate_reason"] != "completed"
        totals = sum_usage(record)
        billed = round(totals["billed"], 2)
        assessment = assistant_reply(record, 1)
        levels = parse_levels(assessment)
        trail = search_trail(record)
        contact = data_index_contact(record)

        print_run(record, totals, levels, trail, contact, billed, uncached_cost(model, totals))

        truth = ground_truth.get(key)
        scored = score_against_index(levels, truth) if truth else []
        rated_count = rated_category_count(truth) if truth else 0
        if truth:
            print_scoring(scored, rated_count)
        elif ground_truth:
            print("   vs Data Index: no entry for this dataset")

        gaps = [gap for *_, gap in scored]
        rows.append({
            "model": model,
            "harness": record["harness"],
            "dataset": key,
            "trial": trial,
            "failed": int(failed),
            "effort": reasoning_effort(record),
            **{category: levels[category] or "" for category in CATEGORIES},
            "matches": gaps.count(0),
            "scored": rated_count,
            "levels_off": sum(map(abs, gaps)),
            "mean_error": round(statistics.mean(map(abs, gaps)), 3) if gaps else "",
            "bias": round(statistics.mean(gaps), 3) if gaps else "",
            "cost": billed,
            "seconds": round(sum(turn.get("seconds", 0) for turn in record["turns"].values()), 1),
            "searches": totals["searches"],
            "fetches": totals["fetches"],
            "reasoning_tokens": sum(turn_reasoning_tokens(turn) or 0 for turn in record["turns"].values()),
            "_gaps": gaps,
            "_leaked": bool(contact[0]),
        })

        if trial == 0 and not failed:
            agent_results[model][key] = {
                category: {"level": levels[category], "evidence": category_evidence(assessment, category)}
                for category in CATEGORIES
            }

    print_model_summaries(rows)
    write_summaries(rows)
    write_agent_results(agent_results)
    return 0


if __name__ == "__main__":
    sys.exit(main())
