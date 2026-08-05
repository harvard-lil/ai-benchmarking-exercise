# AI Benchmarking Exercise — Online Version: Plan & Outline

**Status:** Draft v0.1 (Akshay, Aug 2026) — for iteration with Molly, Kyle, Ben, Halle
**Repo target:** GitHub Pages static site under the LIL org
**This document is the source of truth for the site.** Every page in the repo maps to a
section below. Edit here first, then propagate to the HTML.

---

## 1. Purpose and hypothesis

The AI Benchmarking Exercise tests **whether AI agents can assess risk to federal
datasets** as well as (or differently from) human researchers, using a shared rubric
developed by data policy experts.

Explicit goals (Tuesday onsite notes):

1. **Prove or disprove the hypothesis** — this is research instrumentation, *not* a
   pedagogical tool (that may come later, but is out of scope for v1).
2. **Harvest prompts.** If humans-prompting-AI works, the prompts people converge on
   tell us how to engineer a better automated tool (feeds Binoc / future tooling).

**Audience:** data rescue groups and policy wonks — people with domain judgment, not
necessarily AI experience.

---

## 2. The three phases (retooled for online)

| Phase | Who | Mode | On the website? |
|-------|-----|------|-----------------|
| 1. Human research | Participant alone, no AI | Async or sync | Yes — full instructions |
| 2. Automated AI benchmark | Team-run harness, zero human interaction | Offline | Explainer only |
| 3. Human-prompted AI | Participant + agent of their choice | **Sync/in-person only** | Yes — flagged sync-only |

Phase 2 is not participant-facing. The site explains it exists (so participants
understand what their work is being compared against) but the harness lives in a
separate repo. Requirements captured from notes: agent-agnostic framework; agent logs
its reasoning as it goes; consider constraining time/tokens (open decision #2).

---

## 3. Decision log (traceable to onsite notes)

| # | Decision | Source |
|---|----------|--------|
| D1 | Static site, GitHub repo under LIL org, packaged as a website | Tue notes, "From our perspective" |
| D2 | No framework preference at LIL; Jacob restyles later → plain semantic HTML/CSS, no build step | PubData notes (same convention) |
| D3 | Participants choose their own dataset (dropdown or tag) | Tue notes, "Ideation" |
| D4 | Any AI agent allowed; participant reports which agent + submits transcript | Tue notes, "Ideation" |
| D5 | Drop the source-URL list from Part 2, query 2 (Step Two prompt) | Tue notes, explicit |
| D6 | Still (at least) 2 phases; retooled to 3 as in §2 | Tue notes |
| D7 | Capture research *process*: ask which source types used (government / media / social / other) | Tue notes, "doesn't chart their research process" |
| D8 | Instruct participants to turn memory OFF (works in ChatGPT and Claude) | Tue notes |
| D9 | Thinking/extended-reasoning mode required where the agent supports it | Exercise doc + AI Prompting 2.0 |
| D10 | dataindex.us (America's Data Index) is embargoed until the final comparison step | Exercise doc, "Rules of Engagement" |
| D11 | Prompts nudge toward post-Jan-1-2024 information for contemporary answers | AI Prompting 2.0 |
| D12 | Neutral-feedback discipline: coach the bot's *method*, never its *answer* | AI Prompting 2.0 |
| D13 | Final 15 min: participants evaluate the exercise + summarize key takeaway | AI Prompting 2.0 open Qs (leaning yes) |

## 4. Open decisions — flagged for the team

These appear as visible `TEAM DECISION` callouts in the site so nobody mistakes a
placeholder for a settled choice.

1. **Data Quality rubric category** — cut it, or rescope? Binoc covers
   diffing/granularity; publication-schedule slippage is not covered. In-person
   feedback confirmed confusion ("I'm not sure what the benchmark should be").
   *Current scaffold: retained, with a caveat note.*
2. **Constrain the AI in Phase 2?** Match human time budget vs. let it run to
   confidence. Don't build a token furnace.
3. **Dataset list** — v1 dropdown seeds the original three (NHIS, AHS, HIFLD Open).
   Expand to tags? Free choice? Where does the canonical list live?
4. **Category assignment** — in person, participants got one of two triads
   (Historical + Staffing/Funding + Policy) or (Future + Data Quality + Statutory).
   Online async: keep triads (time-boxed, comparable) or let people do all six?
   *Current scaffold: participant picks a triad; "all six" allowed if time permits.*
5. **Transcript collection** — Google Drive upload vs. email vs. form paste-in.
   Also: confirm each agent's transcript is trivially exportable, and note any
   agent-specific export instructions.
6. **AI-assisted search leakage** — Google AI Overviews, Westlaw, etc. during
   Phase 1 ("human only"). Ban, allow-with-disclosure, or ignore? Prompt doc raises
   it; nothing decided.
7. **Proprietary/paywalled sources** — in person these were allowed for humans.
   Agents mostly can't reach them. Note the asymmetry in analysis, or restrict humans?
8. **Legal term definitions** — define "statute," "regulation," "ICR" for
   participants (and/or in prompts)? At what stage?
9. **Form backend** — Google Forms (matches in-person) vs. anything else. Static
   site just links out either way. Placeholder URLs in scaffold are marked `TODO`.

---

## 5. Site map

```
index.html      Landing: what/why, hypothesis, audience, the three phases, how to run it
phase-1.html    Human research: setup, rules of engagement, dataset picker,
                category triads, rubric (inline reference), assessment form link
phase-2.html    Automated benchmark explainer (team-run; not participant-facing)
phase-3.html    Sync-only prompting session: agent setup, Step One / Step Two
                prompt builder (auto-fills dataset + selected rubric categories),
                feedback templates, transcript submission, evaluation
rubric.html     Full six-category rubric as a standalone reference page
css/style.css   Single stylesheet (semantic selectors; easy for Jacob to replace)
js/site.js      Dataset definitions, triad definitions, rubric text,
                prompt-template builder, copy-to-clipboard
```

Design intent: quiet, readable, obviously-a-draft-skin. All content in semantic HTML;
all data (datasets, rubric, prompts) lives in `js/site.js` as plain objects so the
copy can be edited in one place.

## 6. Page outlines

### index.html — Landing
- Eyebrow: Harvard Law School Library · LIL · Public Data Project
- H1 + one-paragraph framing: "Can AI assess risks to public data?"
- The hypothesis + the two goals (§1)
- The three phases as cards, with async/sync badges
- Who this is for; time expectation (~50 min Phase 1, ~50 min Phase 3, mirroring
  the in-person schedule)
- Start button → phase-1.html

### phase-1.html — Human research
- **Setup:** pick a dataset (dropdown, D3) → shows title/publisher/description/URL;
  pick a category triad (open decision #4)
- **Rules of engagement** (adapted from in-person):
  - Do NOT consult dataindex.us — embargoed until the end (D10)
  - Do NOT use AI in this phase, including AI search summaries (open decision #6)
  - DO look anywhere else: news, social media, government sites, paywalled material
  - You are researching the *ecosystem around the data*, not becoming a dataset expert
  - Running out of time on a category is itself data — note it and move on
- Inline rubric for the chosen triad (full rubric on rubric.html)
- **Record your process:** which source types did you use (D7)
- Submit: Researcher Assessment Form link (`TODO` URL) — field spec in §7
- Then: async participants stop here (Phase 2 is ours); sync participants continue

### phase-2.html — Automated benchmark (explainer)
- What the harness does: same dataset, same rubric, zero human steering
- Agent-agnostic; reasoning logged; time/token constraint TBD (open decision #2)
- Why participants can't see results yet (contamination)
- Link to harness repo (`TODO`)

### phase-3.html — Prompting session (SYNC ONLY banner)
- **Agent setup:** any agent (D4); memory OFF (D8); thinking mode ON (D9);
  fresh conversation; record which agent + version
- **Step One — dataset research prompt:** template auto-filled from the Phase 1
  dataset selection; copy button. Italic-style participant guidance rendered as
  distinct "for you, not the bot" asides
- Scan-and-revise loop with the "I like that this report covers ___ / Please revise
  the report to ___" template (incl. post-2024 lever, D11)
- **Step Two — risk assessment prompt:** builds the prompt with ONLY the selected
  triad's rubric text; source-URL list dropped (D5); evidence-per-level +
  final summary block format preserved
- Feedback loop template + the anti-nudging warning verbatim in spirit (D12):
  coach method, not answers; keep the liked/wanting structure so we can mine
  transcripts for what worked
- **Submit:** transcript (mechanism TODO, open decision #5) + Exercise Evaluation
  (D13, `TODO` URL)
- **Now compare:** dataindex.us link unlocked here, per the in-person closer

### rubric.html — Reference
- All six categories × four levels (Gone / High Risk / Moderate Risk / No Known Issue)
- Data Quality carries the open-decision caveat (open decision #1)
- Provenance note: rubric by data policy experts; wording merged from the
  Assessment Rubric slide + AI Prompting 2.0 (which has the more precise
  "prior to the current year or cycle" phrasing)

## 7. Form field specs (rebuild in Google Forms)

**Researcher Assessment of Dataset** (mirrors the July 2026 CSV):
1. Name (short text)
2. Which dataset did you evaluate? (choice; mirror site dropdown)
3. Which categories were you asked to evaluate? (choice: Triad A / Triad B / All six)
4–9. One question per category: risk level (Gone / High / Moderate / No Known Issue /
   Couldn't assess) **plus** an optional free-text evidence note. *(The July CSV mixed
   levels and prose in one field — splitting these will make analysis much easier.)*
10. **NEW (D7):** Which source types did you use? (checkboxes: government sites,
    mainstream news, trade/sector press, social media, paywalled databases, other)
11. Comments (long text)

**Exercise Evaluation:** agent used (+ version/mode), what worked / what didn't,
key takeaway (D13), permission to use transcript excerpts.

## 8. Out of scope for this repo
- Phase 2 harness (separate repo; requirements in §2)
- Visual design (Jacob)
- Pedagogical adaptation
- Multi-language, accounts, any backend

## 9. Next steps (Akshay)
- [ ] Circulate this doc + staging link; collect calls on open decisions 1–9
- [ ] Get LIL GitHub org access; push repo; enable Pages (main / root)
- [ ] Rebuild the two Google Forms per §7; swap `TODO` URLs in `js/site.js`
- [ ] Decide transcript intake; write per-agent export instructions
- [ ] Spec Phase 2 harness repo with Kyle
