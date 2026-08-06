/* AI Benchmarking Exercise — shared data + behavior.
   All editable content (datasets, rubric, prompts, form URLs) lives here.
   See PLAN.md §5–7. */

const FORM_URLS = {
  assessment: "#TODO-researcher-assessment-form",
  evaluation: "#TODO-exercise-evaluation-form",
  transcript: "#TODO-transcript-submission" // open decision #5
};

const DATASETS = {
  nhis: {
    title: "National Health Interview Survey",
    org: "Centers for Disease Control and Prevention (NCHS)",
    url: "https://www.cdc.gov/nchs/nhis/index.html",
    description:
      "The National Health Interview Survey (NHIS) monitors the health of the U.S. " +
      "population by collecting and analyzing data on a broad range of health topics " +
      "for children and adults. Conducted by CDC's National Center for Health " +
      "Statistics, it is the nation's largest and oldest national health survey, " +
      "collecting data since 1957 from about 27,000 adults each year through " +
      "confidential, face-to-face interviews."
  },
  ahs: {
    title: "American Housing Survey",
    org: "U.S. Census Bureau",
    url: "https://www.census.gov/programs-surveys/ahs.html",
    description:
      "The survey provides up-to-date information about the quality and cost of " +
      "housing in the United States and major metropolitan areas, including the " +
      "physical condition of homes and neighborhoods, the costs of financing and " +
      "maintaining homes, and the characteristics of residents. Planners, policy " +
      "makers, and community stakeholders use the AHS to assess housing needs."
  },
  hifld: {
    title: "Homeland Infrastructure Foundation-Level Data (HIFLD) Open",
    org: "Department of Homeland Security",
    url: "https://www.dhs.gov/gmo/hifld",
    description:
      "The public-facing portal for the HIFLD program, providing geospatial data " +
      "and tools for planners, analysts, and others throughout the homeland " +
      "security enterprise, supporting missions including law enforcement, border " +
      "protection, emergency management, critical infrastructure protection, and " +
      "national operations and data fusion centers."
  },
  custom: {
    title: "", org: "", url: "", description: "",
    custom: true
  }
};

const TRIADS = {
  a: {
    label: "Triad A — Historical Data Availability · Staffing and Funding · Policy",
    categories: ["historical", "staffing", "policy"]
  },
  b: {
    label: "Triad B — Future Data Availability · Data Quality · Statutory Context",
    categories: ["future", "quality", "statutory"]
  },
  all: {
    label: "All six categories (only if time allows)",
    categories: ["historical", "staffing", "policy", "future", "quality", "statutory"]
  }
};

/* Rubric text. Wording merged from the Assessment Rubric slide and
   AI Prompting 2.0 (which carries the more precise phrasing). */
const RUBRIC = {
  historical: {
    name: "Historical Data Availability",
    levels: {
      "Gone": "Data files prior to the current year or cycle are no longer publicly available.",
      "High Risk": "Some data files prior to the current year or cycle are removed.",
      "Moderate Risk": "Some data elements that exist in the dataset prior to the current year or cycle are removed.",
      "No Known Issue": "Data prior to the current year or cycle remain accessible with no known alterations."
    }
  },
  future: {
    name: "Future Data Availability",
    levels: {
      "Gone": "Data collection and publication has been terminated.",
      "High Risk": "Statutory publication deadline missed and/or collection or publication skipped and/or ICR expired for more than one year.",
      "Moderate Risk": "Typical or intended publication date missed and/or collection or publication delayed; ICR expired up to one year.",
      "No Known Issue": "Data published on time or as expected and ICR active or renewed before expiration."
    }
  },
  quality: {
    name: "Data Quality",
    levels: {
      "Gone": "Data collection and publication has been terminated.",
      "High Risk": "Reductions in granularity, timeliness, or frequency.",
      "Moderate Risk": "Potential or emerging risk to granularity, timeliness, or frequency.",
      "No Known Issue": "Maintained or improved granularity, timeliness, or frequency."
    }
  },
  statutory: {
    name: "Statutory Context",
    levels: {
      "Gone": "N/A",
      "High Risk": "Statutory authorization is vague and/or there are alternative data collections that could serve as substitutes and/or no known programmatic use.",
      "Moderate Risk": "Not explicitly required by statute but required for the implementation of a state or federal program, and there are no alternative data collections that could serve as substitutes.",
      "No Known Issue": "Statutorily required and/or statutory authorization is explicitly named and it is clear what has to be collected, and there aren't alternative data collections that could serve as substitutes and/or required for implementation of a federal program."
    }
  },
  staffing: {
    name: "Staffing and Funding",
    levels: {
      "Gone": "All of the staff in the division or agency are gone and/or all funding has been terminated.",
      "High Risk": "40% or more of staff lost, and/or 1,000 or more staff lost, and/or budget cut by 20% or more, and/or leadership removed.",
      "Moderate Risk": "10–39% of staff lost, and/or 500–999 staff lost, and/or budget cut by 10–19%, and/or threatened change in leadership.",
      "No Known Issue": "Less than 10% of staff lost and less than 10% of budget cut and no known change in leadership."
    }
  },
  policy: {
    name: "Policy",
    levels: {
      "Gone": "Data collection and publication has been terminated.",
      "High Risk": "Presidential Action-driven information collection request (ICR); negative policy note on site; other significant changes in accordance with Administration priorities.",
      "Moderate Risk": "Proposed or pending changes; statements by administration officials suggesting a change is being considered or planned.",
      "No Known Issue": "No notable changes since January 2025 affecting what data is collected and published."
    }
  }
};

/* ---------- Prompt templates (Phase 3) ---------- */

function stepOnePrompt(d) {
  return `#data research
I am researching a federal dataset. Find out everything you can about this dataset, such as who publishes it, under what authority or mandate, its history, its typical users, and its benefits to the public. Be sure your research comprehensively covers each of those perspectives, as well as any others that you discover or seem useful. I believe this is accurate information, but please check:

Dataset title: ${d.title || "FILL IN"}
Organization/publisher: ${d.org || "FILL IN"}
Description: ${d.description || "FILL IN"}
URL: ${d.url || "FILL IN"}

Return a complete report on everything that a preservationist, data librarian, data scientist, or policy activist might want to know about this data.`;
}

/* Per decision D5, the in-person "Sources for context" URL list is dropped. */
function stepTwoPrompt(categoryKeys) {
  const rubricText = categoryKeys.map((k) => {
    const c = RUBRIC[k];
    const lines = Object.entries(c.levels)
      .map(([lvl, txt]) => `- ${lvl}: ${txt}`)
      .join("\n");
    return `### ${c.name}\n${lines}`;
  }).join("\n\n");

  const summary = categoryKeys
    .map((k) => `${RUBRIC[k].name}: <level>`)
    .join("\n");

  return `# Dataset risk assessment
I would like your help in assessing the likelihood that this data will be changed or removed from its primary location, and that users will no longer be able to access accurate and reliable copies of it, based on the rubric below.

## Sources for context
To help assess the rubric categories, perform additional research on the data, the agency, the data's topics and typical users, covering topics such as proposed regulatory or funding changes, recent news, and political commentary.

## Rubric
This rubric is divided up into categories. Each category is divided up into risk levels. In your output, please select the appropriate risk level for each category based on your research.

${rubricText}

For each category, concisely list the evidence and supporting sources that would support each risk level. Then indicate which risk level you find most appropriate and why.

Conclude with a simple summary of risk levels:
${summary}`;
}

/* ---------- Shared state ----------
   Phase 1 is the single source of truth for dataset, categories, and ratings.
   Phase 3 reads this and never re-asks. localStorage (not session) so closing
   the tab between phases doesn't wipe 50 minutes of work. */

const STATE_KEY = "aibench";

function getState() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(STATE_KEY) || "{}"); }
  catch (e) { s = {}; }
  return s;
}
function setState(patch) {
  const s = Object.assign(getState(), patch);
  try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch (e) {}
  return s;
}

/* Has Phase 1 actually been filled in? */
function hasPhase1(s) {
  return !!(s.dataset && s.triad);
}

/* Resolve the chosen dataset, including a bring-your-own one. */
function datasetFromState(s) {
  const key = s.dataset || "nhis";
  if (key !== "custom") return DATASETS[key];
  const c = s.custom || {};
  return {
    title: c.title || "", org: c.org || "",
    description: c.description || "", url: c.url || "",
    custom: true
  };
}

function categoriesFromState(s) {
  return TRIADS[s.triad] ? TRIADS[s.triad].categories : TRIADS.a.categories;
}

/* ---------- Small helpers ---------- */

function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function slug(v) {
  return String(v).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function setValue(id, v) {
  const el = document.getElementById(id);
  if (el) el.value = v || "";
}
function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const prev = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(() => { btn.textContent = prev; }, 1500);
  });
}

const RATING_OPTIONS = ["", "Gone", "High Risk", "Moderate Risk", "No Known Issue", "Couldn't assess"];

/* ---------- Rendering ---------- */

function renderDatasetCard(el, s) {
  const d = datasetFromState(s);
  if (d.custom && !d.title) {
    el.innerHTML =
      '<p class="hint">Using your own dataset? Fill in its title, publisher, ' +
      "description, and URL above. Phase 3 builds its prompts straight from these " +
      'fields, so you won\'t be asked for them again. ' +
      '<span class="flag">TEAM DECISION #3</span> covers how the dataset list grows.</p>';
    return;
  }
  const link = d.url
    ? `<a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.url)}</a>`
    : "<em>no URL given</em>";
  el.innerHTML = `
    <h3>${esc(d.title)}</h3>
    <p class="meta">${esc(d.org) || "<em>no publisher given</em>"} · ${link}</p>
    <p>${esc(d.description)}</p>`;
}

function rubricTable(c) {
  const rows = Object.entries(c.levels).map(([lvl, txt]) =>
    `<tr><th class="lvl lvl-${slug(lvl)}">${lvl}</th><td>${txt}</td></tr>`
  ).join("");
  return `<table class="rubric"><tbody>${rows}</tbody></table>`;
}

function renderRubric(el, categoryKeys) {
  el.innerHTML = categoryKeys.map((k) => {
    const c = RUBRIC[k];
    const caveat = c.caveat ? `<p class="flag-block">${c.caveat}</p>` : "";
    return `<section class="rubric-cat">
      <h3>${c.name}</h3>${caveat}
      ${rubricTable(c)}
    </section>`;
  }).join("");
}

/* Phase 1 worksheet: rubric + the participant's own rating and evidence. */
function renderWorksheet(el, categoryKeys, s) {
  const ratings = s.ratings || {};
  el.innerHTML = categoryKeys.map((k) => {
    const c = RUBRIC[k];
    const r = ratings[k] || {};
    const opts = RATING_OPTIONS.map((o) =>
      `<option value="${esc(o)}"${r.level === o ? " selected" : ""}>${o || "— choose a level —"}</option>`
    ).join("");
    return `<section class="rubric-cat">
      <h3>${c.name}</h3>
      ${rubricTable(c)}
      <div class="worksheet" data-cat="${k}">
        <p class="worksheet-title">Your assessment</p>
        <div>
          <label for="lvl-${k}">Risk level</label>
          <select id="lvl-${k}" data-field="level">${opts}</select>
        </div>
        <div>
          <label for="ev-${k}">Evidence and notes</label>
          <textarea id="ev-${k}" data-field="evidence" rows="3"
            placeholder="What did you find, and where?">${esc(r.evidence)}</textarea>
        </div>
      </div>
    </section>`;
  }).join("");
}

/* Plain-text dump of the Phase 1 worksheet, for pasting into the official form. */
function worksheetText(s) {
  const d = datasetFromState(s);
  const lines = [`Dataset: ${d.title || "(not set)"}`, `Publisher: ${d.org || "(not set)"}`, ""];
  categoriesFromState(s).forEach((k) => {
    const r = (s.ratings || {})[k] || {};
    lines.push(`## ${RUBRIC[k].name}`);
    lines.push(`Risk level: ${r.level || "(not rated)"}`);
    lines.push(`Evidence: ${r.evidence || "(none recorded)"}`);
    lines.push("");
  });
  return lines.join("\n").trim();
}

function wireCopyButtons(root) {
  (root || document).querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      copyText(btn, document.getElementById(btn.dataset.copyTarget).textContent);
    });
  });
}

/* ---------- Phase 1 ---------- */

function initPhase1() {
  const dsSelect = document.getElementById("dataset-select");
  const dsCard = document.getElementById("dataset-card");
  const customFields = document.getElementById("custom-dataset-fields");
  const triadSelect = document.getElementById("triad-select");
  const rubricEl = document.getElementById("triad-rubric");

  const state = getState();
  if (state.dataset) dsSelect.value = state.dataset;
  if (state.triad) triadSelect.value = state.triad;
  const c = state.custom || {};
  setValue("c-title", c.title);
  setValue("c-org", c.org);
  setValue("c-desc", c.description);
  setValue("c-url", c.url);

  function saveCustom() {
    setState({ custom: {
      title: document.getElementById("c-title").value,
      org: document.getElementById("c-org").value,
      description: document.getElementById("c-desc").value,
      url: document.getElementById("c-url").value
    }});
  }

  function refreshDataset() {
    customFields.hidden = dsSelect.value !== "custom";
    setState({ dataset: dsSelect.value });
    renderDatasetCard(dsCard, getState());
  }

  function refreshRubric() {
    setState({ triad: triadSelect.value });
    renderWorksheet(rubricEl, categoriesFromState(getState()), getState());
  }

  dsSelect.addEventListener("change", refreshDataset);
  triadSelect.addEventListener("change", refreshRubric);
  ["c-title", "c-org", "c-desc", "c-url"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => { saveCustom(); refreshDataset(); });
  });

  /* Delegated — the worksheet is re-rendered whenever the triad changes. */
  rubricEl.addEventListener("input", (e) => {
    const field = e.target.dataset && e.target.dataset.field;
    if (!field) return;
    const cat = e.target.closest("[data-cat]").dataset.cat;
    const ratings = Object.assign({}, getState().ratings);
    ratings[cat] = Object.assign({}, ratings[cat], { [field]: e.target.value });
    setState({ ratings: ratings });
  });

  refreshDataset();
  refreshRubric();

  const copyBtn = document.getElementById("copy-worksheet");
  if (copyBtn) copyBtn.addEventListener("click", () => copyText(copyBtn, worksheetText(getState())));

  document.querySelectorAll("a[data-form='assessment']")
    .forEach((a) => { a.href = FORM_URLS.assessment; });
}

/* ---------- Phase 3 ---------- */

/* Read-only recap of everything Phase 1 decided. Deliberately rendered
   outside the dark prompt blocks: this is context for the participant,
   not text to paste — the same values are already inside the prompts. */
function renderCarryover(el, s) {
  if (!hasPhase1(s)) {
    el.innerHTML = `<div class="carryover missing">
      <p class="label">Nothing carried over</p>
      <p>We couldn't find your Phase 1 choices in this browser. The prompts below fall
      back to defaults. <a href="phase-1.html">Go back to Phase 1</a> to set your dataset
      and categories — they should not change between phases.</p>
    </div>`;
    return;
  }
  const d = datasetFromState(s);
  const ratings = s.ratings || {};
  const rows = categoriesFromState(s).map((k) => {
    const r = ratings[k] || {};
    const badge = r.level
      ? `<span class="rating-badge lvl-${slug(r.level)}">${esc(r.level)}</span>`
      : '<span class="rating-badge none">not rated</span>';
    return `<li>${RUBRIC[k].name} ${badge}</li>`;
  }).join("");
  const link = d.url
    ? ` · <a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.url)}</a>`
    : "";

  el.innerHTML = `<div class="carryover">
    <p class="label">Carried over from Phase 1</p>
    <p><strong>${esc(d.title) || "(no dataset title)"}</strong>
      <span class="meta">${esc(d.org)}${link}</span></p>
    <p class="cats-intro">Your categories and ratings:</p>
    <ul class="cats">${rows}</ul>
    <p class="hint">These are locked to keep your two assessments comparable —
      <a href="phase-1.html">change them in Phase 1</a> if something is wrong. The
      dataset details are already built into the prompts below, so there's nothing
      here you need to copy. Your own ratings are <strong>not</strong> in the prompts:
      the agent must reach its own conclusion.</p>
  </div>`;
}

/* The one thing Phase 3 actually asks the participant to type. */
function renderAiNotes(el, s) {
  const ratings = s.ratings || {};
  const notes = s.aiNotes || {};
  el.innerHTML = categoriesFromState(s).map((k) => {
    const r = ratings[k] || {};
    const badge = r.level
      ? `<span class="rating-badge lvl-${slug(r.level)}">${esc(r.level)}</span>`
      : '<span class="rating-badge none">not rated</span>';
    const prior = r.evidence
      ? `<p class="prior"><span>Your Phase 1 evidence:</span> ${esc(r.evidence)}</p>`
      : '<p class="prior empty">No Phase 1 evidence recorded for this category.</p>';
    return `<section class="ai-note" data-cat="${k}">
      <h3>${RUBRIC[k].name} ${badge}</h3>
      ${prior}
      <label for="ai-${k}">What the agent added that your research hadn't</label>
      <textarea id="ai-${k}" data-field="note" rows="3"
        placeholder="New sources, angles, or evidence — or leave blank">${esc(notes[k])}</textarea>
    </section>`;
  }).join("");
}

function aiNotesText(s) {
  const d = datasetFromState(s);
  const notes = s.aiNotes || {};
  const ratings = s.ratings || {};
  const lines = [`Dataset: ${d.title || "(not set)"}`, ""];
  categoriesFromState(s).forEach((k) => {
    const r = ratings[k] || {};
    lines.push(`## ${RUBRIC[k].name}`);
    lines.push(`My Phase 1 rating: ${r.level || "(not rated)"}`);
    lines.push(`What the AI added: ${notes[k] || "(nothing new)"}`);
    lines.push("");
  });
  return lines.join("\n").trim();
}

function initPhase3() {
  const state = getState();
  const cats = categoriesFromState(state);
  const dataset = datasetFromState(state);

  renderCarryover(document.getElementById("carryover"), state);

  document.getElementById("prompt-step-one").textContent = stepOnePrompt(dataset);
  document.getElementById("prompt-step-two").textContent = stepTwoPrompt(cats);

  const notesEl = document.getElementById("ai-notes");
  renderAiNotes(notesEl, state);
  notesEl.addEventListener("input", (e) => {
    if (!e.target.dataset || e.target.dataset.field !== "note") return;
    const cat = e.target.closest("[data-cat]").dataset.cat;
    const aiNotes = Object.assign({}, getState().aiNotes);
    aiNotes[cat] = e.target.value;
    setState({ aiNotes: aiNotes });
  });

  const copyBtn = document.getElementById("copy-ai-notes");
  if (copyBtn) copyBtn.addEventListener("click", () => copyText(copyBtn, aiNotesText(getState())));

  wireCopyButtons();

  document.querySelectorAll("a[data-form='evaluation']")
    .forEach((a) => { a.href = FORM_URLS.evaluation; });
  document.querySelectorAll("a[data-form='transcript']")
    .forEach((a) => { a.href = FORM_URLS.transcript; });
}

/* Rubric reference page */
function initRubricPage() {
  renderRubric(document.getElementById("full-rubric"),
    ["historical", "future", "quality", "statutory", "staffing", "policy"]);
}
