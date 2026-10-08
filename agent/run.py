#!/usr/bin/env python
"""
Experiment over AI risk assesment task
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
RUNS = HERE / "runs"
PROMPTS = json.loads((HERE / "prompts.json").read_text())

# Verbatim from sessionMetaPrompt() in js/site.js.
SESSION_META_PROMPT = (
    "Emit a session_metadata YAML block reporting: current date, model "
    "identifier, knowledge cutoff, surface, whether memory is enabled, whether "
    "custom preferences or styles are active, all tools and MCP servers "
    "available, which tools were actually called in this session, and whether "
    "attachments were present. Mark any field not directly observable as "
    "unknown rather than inferring it."
)

DATA_INDEX = "dataindex.us"
NATIVE_SEARCH = ("anthropic/", "openai/", "google/", "x-ai/", "perplexity/")
NO_DOMAIN_FILTER = ("google/",)
FETCH_TOOL = {"type": "openrouter:web_fetch",
              "parameters": {"engine": "openrouter", "blocked_domains": [DATA_INDEX],
                             "max_content_tokens": 10_000}}
TARGET_EFFORT = "medium"
EFFORT_ORDER = ["minimal", "low", "medium", "high", "xhigh", "max"]

# Reasoning effort set to medium, but some models that don't have a medium use the next effort level up
def effort_for(catalog: dict) -> str:
    entry = catalog.get("entry")
    supported = ((entry.get("reasoning") or {}).get("supported_efforts") or []) if isinstance(entry, dict) else []
    if not supported or TARGET_EFFORT in supported:
        return TARGET_EFFORT
    above = [e for e in EFFORT_ORDER[EFFORT_ORDER.index(TARGET_EFFORT):] if e in supported]
    return above[0] if above else supported[0]

def search_tool(model: str) -> dict:
    """The search tool for this model: its provider's own engine where one
    exists, at the provider's defaults, and Exa with 10 results otherwise."""
    if model.startswith(NATIVE_SEARCH):
        parameters = {"engine": "native"}
    else:
        parameters = {"engine": "exa", "max_results": 10}
    if not model.startswith(NO_DOMAIN_FILTER):
        parameters["excluded_domains"] = [DATA_INDEX]
    return {"type": "openrouter:web_search", "parameters": parameters}

# Max tool calls ceiling
MAX_TOOL_CALLS = 200
STOP_TOOLS_WHEN = [{"type": "step_count_is", "step_count": MAX_TOOL_CALLS}]

# Override 5 min cache default
CACHE_CONTROL = {"type": "ephemeral", "ttl": "1h"}
OPENROUTER_URL = "https://openrouter.ai/api/v1"

def load_env(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip("'\""))

def openrouter_stream(path: str, body: dict) -> dict:
    """POST with streaming on and return the final response object."""
    data = json.dumps({**body, "stream": True}).encode()
    headers = {"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}",
               "Content-Type": "application/json"}
    for attempt in range(6):
        request = urllib.request.Request(f"{OPENROUTER_URL}/{path}", data=data, headers=headers)
        try:
            stream = urllib.request.urlopen(request, timeout=600)
            break
        except urllib.error.HTTPError as exc:
            if exc.code not in (408, 429, 500, 502, 503, 504) or attempt == 5:
                raise RuntimeError(f"HTTP {exc.code}: {exc.read()[:300]!r}") from None
        except urllib.error.URLError:
            if attempt == 5:
                raise
        time.sleep(5 * 2 ** attempt)
    final = None
    with stream:
        for raw in stream:
            line = raw.decode("utf-8").strip()
            if not line.startswith("data:") or line == "data: [DONE]":
                continue
            event = json.loads(line[5:])
            if event.get("type") in ("response.completed", "response.incomplete", "response.failed"):
                final = event["response"]
            elif event.get("type") == "error" or "error" in event:
                raise RuntimeError(f"stream error: {json.dumps(event)[:300]}")
    if final is None:
        raise RuntimeError("the stream ended without a final response")
    return final

def openrouter_get(path: str) -> dict:
    request = urllib.request.Request(
        f"{OPENROUTER_URL}/{path}",
        headers={"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}"},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.load(response)

# For logging OpenRouter model details
def catalog_entry(model: str) -> dict:
    """OpenRouter's own catalog entry for the model"""
    try:
        catalog = openrouter_get("models")["data"]
        entry = next((m for m in catalog if m.get("id") == model), None)
        return {"fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "entry": entry or "model not in catalog"}
    except Exception as exc:
        return {"error": f"{type(exc).__name__}: {exc}"[:300]}

def turn(
    model: str, max_tokens: int, messages: list, context: list, prompt: str, session_id: str, upstream: list, effort: str
) -> dict:
    """Append one prompt, run it to completion, append the reply."""
    messages.append({"role": "user", "content": prompt})
    context.append({"role": "user", "content": prompt})
    started = time.perf_counter()
    body = {
        "model": model,
        "max_output_tokens": max_tokens,
        "input": context,
        "tools": [search_tool(model), FETCH_TOOL],
        "cache_control": CACHE_CONTROL,
        "session_id": session_id,
        "stop_server_tools_when": STOP_TOOLS_WHEN,
        "reasoning": {"effort": effort},
    }
    if upstream:
        body["provider"] = {"order": upstream, "allow_fallbacks": False}

    response = openrouter_stream("responses", body)
    if response.get("status") == "failed":
        raise RuntimeError(f"response failed: {response.get('error')}")

    # Parses response stream
    items = response.get("output") or []
    text = "".join(
        part.get("text") or ""
        for item in items if item.get("type") == "message"
        for part in item.get("content") or [] if part.get("type") == "output_text"
    )
    tool_items = [i for i in items if str(i.get("type", "")).startswith("openrouter:")]
    searches = sum(i["type"] == "openrouter:web_search" for i in tool_items)
    fetches = sum(i["type"] == "openrouter:web_fetch" for i in tool_items)
    messages.append({"role": "assistant", "content": text})
    context.extend(items)

    usage = response.get("usage") or {}
    if (response.get("incomplete_details") or {}).get("reason") == "max_output_tokens":
        print("   warning: the reply hit max_tokens and was cut off")
        ended = "length"
    elif searches + fetches >= MAX_TOOL_CALLS:
        ended = "tool_ceiling"
    else:
        ended = "answered"
    return {
        "request": {k: v for k, v in body.items() if k != "input"},
        "response_meta": {k: v for k, v in response.items() if k != "output"},
        "requests": [usage],
        "searches": searches,
        "fetches": fetches,
        "tool_items": tool_items,
        "ended": ended,
        "seconds": round(time.perf_counter() - started, 1),
    }

def run_one(dataset: dict, model: str, max_tokens: int, trial: int, upstream: list) -> dict:
    """Run the three prompts and return the record, even when a turn fails."""
    started_at = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    session_id = f"{dataset['key']}-{model}-t{trial}-{started_at}"
    catalog = catalog_entry(model)
    effort = effort_for(catalog)
    messages: list = []
    context: list = []
    turns = {}
    prompts = {
        "research": dataset["research"],
        "assessment": dataset["assessment"],
        "session_metadata": SESSION_META_PROMPT,
    }
    terminate_reason = "completed"
    try:
        for label, prompt in prompts.items():
            turns[label] = turn(model, max_tokens, messages, context, prompt, session_id, upstream, effort)
            last = turns[label]["requests"][-1]
            cached = (last.get("input_tokens_details") or {}).get("cached_tokens") or 0
            print(
                f"   {label}: {turns[label]['seconds']}s, "
                f"{turns[label]['searches']} searches, {turns[label]['fetches']} fetches, "
                f"{last.get('input_tokens') or 0:,} in, of which {cached:,} cached / "
                f"{last.get('output_tokens') or 0:,} out"
            )
    except Exception as exc:
        terminate_reason = f"error: {type(exc).__name__}: {exc}"[:500]
        print(f"   failed: {terminate_reason}"[:300])
    return {
        "dataset": {"key": dataset["key"], "title": dataset["title"]},
        "model": model,
        "harness": "openrouter tools",
        "context": "full: each turn's whole output is carried into the next",
        "search_tool": search_tool(model)["parameters"],
        "fetch_tool": FETCH_TOOL["parameters"],
        "reasoning": f"effort {effort}",
        "catalog": catalog,
        "upstream": upstream,
        "trial": trial,
        "terminate_reason": terminate_reason,
        "max_tokens": max_tokens,
        "started_at": started_at,
        "prompts": prompts,
        "turns": turns,
        "messages": messages,
    }

def finished(path: Path) -> bool:
        try:
            return json.loads(path.read_text()).get("terminate_reason") == "completed"
        except (FileNotFoundError, ValueError):
            return False

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("datasets", nargs="*", help="dataset keys; default nhis")
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--model", default="anthropic/claude-sonnet-5",
                        help="an OpenRouter model id, as listed on openrouter.ai/models")
    parser.add_argument(
        "--max-tokens", type=int, default=32768,
        help="output ceiling per request, the same for every model; a ceiling, not a target",
    )
    parser.add_argument("--trials", type=int, default=1, help="independent runs per dataset")
    parser.add_argument(
        "--upstream", nargs="*", default=[],
        help="provider slugs to serve the model, in order, with fallback off",
    )
    parser.add_argument("--force", action="store_true", help="re-run finished datasets")
    args = parser.parse_args()

    load_env(HERE / ".env")
    if not os.environ.get("OPENROUTER_API_KEY"):
        sys.exit("OPENROUTER_API_KEY is not set")

    by_key = {d["key"]: d for d in PROMPTS["datasets"]}
    wanted = list(by_key) if args.all else (args.datasets or ["nhis"])
    unknown = [k for k in wanted if k not in by_key]
    if unknown:
        sys.exit(f"unknown dataset(s): {', '.join(unknown)}")

    RUNS.mkdir(exist_ok=True)
    stem = args.model.replace("/", "_")

    def run_path(key: str, trial: int) -> Path:
        return RUNS / (f"{key}__{stem}.json" if trial == 0 else f"{key}__{stem}__t{trial}.json")

    jobs = [(k, t) for k in wanted for t in range(args.trials)]
    todo = [(k, t) for k, t in jobs if args.force or not finished(run_path(k, t))]
    print(f"{args.model}: {len(todo)} to run, {len(jobs) - len(todo)} already done")
    print(f"search: {json.dumps(search_tool(args.model)['parameters'])}")

    failed = []
    for i, (key, trial) in enumerate(todo, 1):
        print(f"\n[{i}/{len(todo)}] {key} trial {trial}: {by_key[key]['title']}")
        record = run_one(by_key[key], args.model, args.max_tokens, trial, args.upstream)
        if record["terminate_reason"] != "completed":
            failed.append(f"{key} t{trial}")
        path = run_path(key, trial)
        path.write_text(json.dumps(record, indent=2))
        print(f"   wrote {path.relative_to(HERE)}")

    if failed:
        print(f"\nfailed, and saved as failures: {', '.join(failed)}")
    return 1 if failed and len(failed) == len(todo) else 0

if __name__ == "__main__":
    sys.exit(main())