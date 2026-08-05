# AI Benchmarking Exercise

Static site for the Public Data Project's AI Benchmarking Exercise: testing whether AI
agents can assess risk to federal datasets against an expert-authored rubric, compared
with human researchers.

**Read [PLAN.md](PLAN.md) first** — it is the source of truth for the site's content,
the decision log tracing every choice to the July 2026 onsite notes, and the list of
open `TEAM DECISION` items (which are also flagged visibly in the pages).

## Structure

```
index.html      Landing / overview
phase-1.html    Human research (async + sync)
phase-2.html    Automated benchmark explainer (team-run harness; separate repo)
phase-3.html    Human-prompted AI session (sync only) with a live prompt builder
rubric.html     Six-category rubric reference
css/style.css   Single stylesheet — placeholder skin, pending design pass (Jacob)
js/site.js      ALL editable content: datasets, rubric text, prompt templates,
                form URLs, page wiring. Edit copy here, not in the HTML.
```

No build step, no dependencies. Google Fonts is the only external resource.

## Local development

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Any static server works; opening the files directly also works, though the
copy-to-clipboard buttons require a secure context or localhost.)

## Deploy (GitHub Pages)

1. Push to the LIL org repo, `main` branch.
2. Repo Settings → Pages → Deploy from branch → `main` / `/ (root)`.

## Before launch (TODOs)

- Replace the three `#TODO-…` URLs in `js/site.js` (`FORM_URLS`) with real
  Google Form links — field specs in PLAN.md §7.
- Resolve the numbered `TEAM DECISION` flags (PLAN.md §4).
- Link the Phase 2 harness repo from `phase-2.html` once it exists.
