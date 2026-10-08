#!/usr/bin/env python
"""Price, parse and score the transcripts run.py wrote.

    python agent/report.py            # every run in agent/runs
    python agent/report.py nhis       # one dataset

Prints, per run: tokens, cost as billed and cost had nothing been cached, the
rubric levels parsed from the assessment turn, agreement with America's Data
Index, and the search trail. Ends with a per-model summary. Writes one
runs/agent_results__<model>.js per model, the AGENT_RESULTS block for js/site.js.

Ground truth is read from js/data-index.js. Needs node on the PATH to evaluate
it; without either, scoring is skipped and everything else still runs.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
import statistics
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

HERE = Path(__file__).parent
RUNS = HERE / "runs"
DATA_INDEX_JS = HERE.parent / "js" / "data-index.js"
PROMPTS = json.loads((HERE / "prompts.json").read_text())
CATEGORIES = PROMPTS["categories"]
CATEGORY_NAMES = PROMPTS["category_names"]

# (input, output) USD per million tokens, and the cache-read multiplier, from
# each model's page on platform.claude.com. Cache writes bill at 1.25x input for
# the 5-minute TTL and 2x for the 1-hour TTL. Web search is $10 per 1,000
# searches; web fetch is tokens only. Opus 5 is unverified.
PRICES = {
    "claude-haiku-4-5-20251001": (1.00, 5.00, 0.1),
    "claude-sonnet-5": (2.00, 10.00, 0.1),
    "claude-opus-5-5": (4.00, 20.00, 0.05),
    "claude-opus-5": (5.00, 25.00, 0.1),
}
SEARCH_USD = 0.01
WRITE_5M, WRITE_1H = 1.25, 2.0

LEVEL_PATTERN = "|".join(re.escape(level) for level in PROMPTS["levels"])
CANONICAL = {level.lower(): level for level in PROMPTS["levels"]}

# Order of the levels, used to measure how far apart two ratings are. A miss
# where the agent's rank is lower than the Data Index's rated the data safer.
RANK = {"No Known Issue": 0, "Moderate Risk": 1, "High Risk": 2, "Gone": 3}


def distance_stats(gaps: list) -> str:
    """Error as distance on the rubric scale, No Known Issue 0 to Gone 3: how
    many levels each rating sits from the Data Index's. Bias is the signed
    mean, positive when the agent rates data safer than the Data Index does."""
    if not gaps:
        return "no rated categories"
    errors = [abs(g) for g in gaps]
    return (f"mean {statistics.mean(errors):.2f} · median {statistics.median(errors):g} · "
            f"max {max(errors)} · min {min(errors)} levels · bias {statistics.mean(gaps):+.2f} "
            f"(n={len(gaps)})")


def load_ground_truth() -> dict:
    """DATA_INDEX from js/data-index.js, evaluated by node so the JavaScript
    object literal never has to be parsed by hand. Empty if unavailable."""
    if not DATA_INDEX_JS.exists():
        print(f"no {DATA_INDEX_JS.relative_to(HERE.parent)}, skipping scoring")
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


def totals(record: dict) -> dict:
    """Sum every billed request across the run's three turns."""
    keys = (
        "input_tokens",
        "output_tokens",
        "cache_read_input_tokens",
        "cache_creation_input_tokens",
    )
    total = dict.fromkeys(keys, 0)
    total["write_1h"] = 0
    total["searches"] = 0
    total["fetches"] = 0
    total["billed"] = 0.0
    for turn in record["turns"].values():
        # The OpenRouter path counts its searches and fetches per turn.
        total["searches"] += turn.get("searches", 0)
        total["fetches"] += turn.get("fetches", 0)
        for usage in turn["requests"]:
            # Earlier OpenRouter runs saved OpenRouter's usage under "raw".
            usage = usage.get("raw", usage)
            if "cache_read_input_tokens" in usage:
                # Anthropic's field names, from the earlier Anthropic-tools runs.
                read = usage.get("cache_read_input_tokens") or 0
                write = usage.get("cache_creation_input_tokens") or 0
                total["input_tokens"] += usage.get("input_tokens") or 0
                breakdown = usage.get("cache_creation") or {}
                total["write_1h"] += breakdown.get("ephemeral_1h_input_tokens") or 0
            else:
                # OpenRouter's field names. Its input_tokens includes cached
                # tokens, so they are taken out to get uncached input.
                details = usage.get("input_tokens_details") or {}
                read = details.get("cached_tokens") or 0
                write = details.get("cache_write_tokens") or 0
                total["input_tokens"] += max((usage.get("input_tokens") or 0) - read - write, 0)
            total["cache_read_input_tokens"] += read
            total["cache_creation_input_tokens"] += write
            total["output_tokens"] += usage.get("output_tokens") or 0
            server = usage.get("server_tool_use") or {}
            total["searches"] += server.get("web_search_requests") or 0
            # OpenRouter reports what it actually billed for each request.
            total["billed"] += usage.get("cost") or 0.0
    return total


def cost(model: str, total: dict, cached: bool) -> float | None:
    """Spend in USD, as billed, or as it would have been with no cache hits.

    Writes the API attributes to the 1-hour TTL are priced at 2x. Any write it
    does not attribute to either TTL is priced at the 5-minute rate, the lower
    of the two, so this can undercount slightly rather than overcount."""
    # OpenRouter ids carry a provider prefix, as in anthropic/claude-sonnet-5.
    model = model.split("/")[-1]
    if model not in PRICES:
        return None
    rate_in, rate_out, read_rate = PRICES[model]
    read = total["cache_read_input_tokens"]
    write = total["cache_creation_input_tokens"]
    write_1h = min(total["write_1h"], write)
    if cached:
        billable_in = (
            total["input_tokens"]
            + read_rate * read
            + WRITE_1H * write_1h
            + WRITE_5M * (write - write_1h)
        )
    else:
        billable_in = total["input_tokens"] + read + write
    return round(
        billable_in / 1e6 * rate_in
        + total["output_tokens"] / 1e6 * rate_out
        + total["searches"] * SEARCH_USD,
        2,
    )


def assistant_text(record: dict, turn_index: int) -> str:
    """Text of the nth assistant message: 0 research, 1 assessment, 2 metadata."""
    replies = [m for m in record["messages"] if m["role"] == "assistant"]
    if turn_index >= len(replies):
        return ""  # the run failed before this reply
    content = replies[turn_index]["content"]
    if isinstance(content, str):
        return content  # OpenRouter replies are plain text
    return "".join(b.get("text", "") for b in content if b["type"] == "text")


def parse_levels(text: str) -> dict:
    """The six summary lines the prompt asks for. Models format them differently:
    plain `Category: Level`, bold, or a markdown table row `| Category | Level |`.
    The separator is whatever sits between the two, so match on that. The last
    match per category wins, since the summary follows the per-category discussion."""
    levels = {}
    for key in CATEGORIES:
        pattern = (
            rf"{re.escape(CATEGORY_NAMES[key])}\**\s*[:|]\s*\**\s*({LEVEL_PATTERN})"
        )
        found = re.findall(pattern, text, flags=re.IGNORECASE)
        levels[key] = CANONICAL[found[-1].lower()] if found else None
    return levels


def score(levels: dict, truth: dict) -> list:
    """(category, agent level, Data Index level, gap) for every category both
    rated. gap is Data Index rank minus agent rank: positive means the agent
    rated the data safer than the Data Index did."""
    rows = []
    for key in CATEGORIES:
        agent = levels.get(key)
        index = CANONICAL.get(str((truth.get(key) or {}).get("level", "")).lower())
        if agent and index:
            rows.append((key, agent, index, RANK[index] - RANK[agent]))
    return rows


def evidence(text: str, key: str) -> str:
    """The assessment's section for one category: its heading to the next."""
    pattern = rf"^#+[^\n]*{re.escape(CATEGORY_NAMES[key])}[^\n]*\n(.*?)(?=^#+ |\Z)"
    match = re.search(pattern, text, flags=re.MULTILINE | re.DOTALL | re.IGNORECASE)
    return match.group(1).strip() if match else ""


def trail(record: dict) -> tuple[list, list]:
    """Queries searched and URLs fetched, in order."""
    queries, fetched = [], []
    # OpenRouter path: the search and fetch items saved with each turn.
    for turn in record["turns"].values():
        for item in turn.get("tool_items", []):
            if item.get("type") == "openrouter:web_search":
                queries.append((item.get("action") or {}).get("query"))
            elif item.get("type") == "openrouter:web_fetch":
                fetched.append(item.get("url"))
    for message in record["messages"]:
        if isinstance(message["content"], str):
            continue
        for block in message["content"]:
            if block["type"] != "server_tool_use":
                continue
            value = block.get("input") or {}
            if block["name"] == "web_search":
                queries.append(value.get("query"))
            elif block["name"] == "web_fetch":
                fetched.append(value.get("url"))
    return queries, fetched


def answer_key_contact(record: dict) -> tuple[list, bool]:
    """Whether a run touched the Data Index, in two strengths.

    A visit is any URL on the Data Index's domain that the agent fetched or
    that a search returned to it: those are the agent reading the answer key.
    A mention is the domain named anywhere else, such as a news article that
    cites the Data Index, or the agent's own reply. Mentions are worth knowing
    about but are not leaks."""
    visits, text = [], []

    def walk(node, key=""):
        if isinstance(node, dict):
            for k, v in node.items():
                walk(v, k)
        elif isinstance(node, list):
            for v in node:
                walk(v, key)
        elif isinstance(node, str) and "dataindex.us" in node:
            host = urlparse(node).netloc.lower() if key in ("url", "uri") else ""
            if host == "dataindex.us" or host.endswith(".dataindex.us"):
                visits.append(node)
            else:
                text.append(node)

    walk([record["turns"], record["messages"]])
    return sorted(set(visits)), bool(text)


def main() -> int:
    wanted = set(sys.argv[1:])
    records = [json.loads(p.read_text()) for p in sorted(RUNS.glob("*__*.json"))]
    # Files written by an earlier version of run.py have no "turns" key.
    records = [r for r in records if "turns" in r]
    records = [r for r in records if not wanted or r["dataset"]["key"] in wanted]
    if not records:
        sys.exit("no runs found")
    ground_truth = load_ground_truth()

    agent_results = defaultdict(dict)
    summary = defaultdict(lambda: {"runs": 0, "failed": 0, "leaked": 0, "scored": 0, "match": 0, "off": 0,
                                   "safer": 0, "riskier": 0, "cost": 0.0, "gaps": [],
                                   "searches": 0, "fetches": 0})
    for record in records:
        key, model = record["dataset"]["key"], record["model"]
        total = totals(record)
        assessment = assistant_text(record, 1)
        levels = parse_levels(assessment)
        queries, fetched = trail(record)
        seconds = " · ".join(f"{k} {t['seconds']}s" for k, t in record["turns"].items())
        # Prefer the provider's own bill; fall back to the price table.
        billed = round(total["billed"], 2) if total["billed"] else cost(model, total, True)
        uncached = cost(model, total, False)
        trial = record.get("trial", 0)
        # The same model through a different harness is a different arm: keep
        # the earlier Anthropic-native runs apart from OpenRouter runs.
        # Runs from before the move to OpenRouter used Anthropic's own tools.
        harness = record.get("harness", "anthropic tools")
        arm = f"{model} via {harness}"
        failure = record.get("terminate_reason", "completed") != "completed"
        visits, mentioned = answer_key_contact(record)
        leaked = bool(visits)

        print(f"\n{key}  {model}  trial {trial}  {harness}  {seconds}")
        if failure:
            print(f"   FAILED: {record['terminate_reason'][:200]}")
        if leaked:
            print(f"   LEAK: the agent reached the Data Index: {', '.join(visits)[:200]}")
        elif mentioned:
            print("   note: dataindex.us is mentioned in a page or the reply, but never visited")
        if record.get("search_tool"):
            print(f"   search: {json.dumps(record['search_tool'])}")
        if record.get("reasoning"):
            entry = (record.get("catalog") or {}).get("entry")
            accepts = entry.get("reasoning") if isinstance(entry, dict) else None
            per_turn = []
            for label, t in record["turns"].items():
                # The usage count covers the whole turn. OpenRouter's audit
                # record covers only one model call of it, so it is the fallback.
                usage = t["requests"][0] if t.get("requests") else {}
                usage = usage.get("raw", usage)
                tokens = (usage.get("output_tokens_details") or {}).get("reasoning_tokens")
                if tokens is None:
                    tokens = (t.get("generation") or {}).get("native_tokens_reasoning", "?")
                applied = (t.get("response_meta") or {}).get("reasoning")
                per_turn.append(f"{label} {tokens}" + (f" {json.dumps(applied)}" if applied else ""))
            print(f"   reasoning: {record['reasoning']} · catalog: {json.dumps(accepts)}")
            print(f"   reasoning tokens: {' · '.join(per_turn)}")
        print(
            f"   tokens: {total['input_tokens']:,} in · "
            f"{total['cache_read_input_tokens']:,} cache read · "
            f"{total['cache_creation_input_tokens']:,} cache write · "
            f"{total['output_tokens']:,} out · {total['searches']} searches"
        )
        print(f"   cost: ${billed} as billed"
              + (f" · ${uncached} if uncached" if uncached is not None else ""))
        print("   levels: " + "  ".join(f"{k}={levels[k] or '?'}" for k in CATEGORIES))
        missing = [k for k in CATEGORIES if not levels[k]]
        if missing:
            print(f"   could not parse: {', '.join(missing)}")
        print(f"   trail: {len(queries)} searches, {len(fetched)} fetches")
        fetches = max(len(fetched), total["fetches"])

        s = summary[arm]
        s["runs"] += 1
        s["failed"] += failure
        s["leaked"] += leaked
        s["cost"] += billed or 0.0
        s["searches"] += max(len(queries), total["searches"])
        s["fetches"] += fetches
        if key in ground_truth:
            rows = score(levels, ground_truth[key])
            # Every category the Data Index rates counts, so a failed run or an
            # unrated category scores as a miss: no gain from not answering.
            truth_cats = sum(1 for k in CATEGORIES if (ground_truth[key].get(k) or {}).get("level"))
            matches = sum(1 for *_, gap in rows if gap == 0)
            off = sum(abs(gap) for *_, gap in rows)
            safer = sum(1 for *_, gap in rows if gap > 0)
            riskier = sum(1 for *_, gap in rows if gap < 0)
            print(f"   vs Data Index: {matches}/{truth_cats} match · {off} levels off · "
                  f"{safer} rated safer, {riskier} rated riskier")
            print(f"   error: {distance_stats([gap for *_, gap in rows])}")
            for cat, agent, index, gap in rows:
                if gap:
                    print(f"      {cat}: {agent}, Data Index {index}")
            s["scored"] += truth_cats
            if len(rows) < truth_cats:
                print(f"   {truth_cats - len(rows)} categories unrated, scored as misses")
            s["match"] += matches
            s["off"] += off
            s["gaps"].extend(gap for *_, gap in rows)
            s["safer"] += safer
            s["riskier"] += riskier
        elif ground_truth:
            print("   vs Data Index: no entry for this dataset")

        if trial != 0 or failure:
            continue  # the site shows trial 0 of a completed run
        agent_results[model][key] = {
            k: {"level": levels[k], "evidence": evidence(assessment, k)} for k in CATEGORIES
        }

    print("\nby model and harness")
    for arm, s in sorted(summary.items()):
        rate = f"{s['match']}/{s['scored']} ({s['match'] / s['scored']:.0%})" if s["scored"] else "unscored"
        failed = f" ({s['failed']} failed)" if s["failed"] else ""
        failed += f" ({s['leaked']} reached the Data Index)" if s["leaked"] else ""
        print(f"   {arm}: {s['runs']} runs{failed} · match {rate} · {s['off']} levels off · "
              f"{s['safer']} safer, {s['riskier']} riskier · ${s['cost'] / s['runs']:.2f} avg · "
              f"{s['searches'] / s['runs']:.0f} searches, {s['fetches'] / s['runs']:.0f} fetches avg")
        unrated = s["scored"] - len(s["gaps"])
        print(f"      error: {distance_stats(s['gaps'])}"
              + (f" · {unrated} unrated, left out of the error" if unrated else ""))

    for model, results in agent_results.items():
        out = RUNS / f"agent_results__{model.replace('/', '_')}.js"
        out.write_text("const AGENT_RESULTS = " + json.dumps(results, indent=2) + ";\n")
        print(f"wrote {out.relative_to(HERE)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())