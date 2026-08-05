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
    caveat: "TEAM DECISION #1 — this category may be cut or rescoped. Binoc covers granularity diffing; publication-schedule slippage is not covered. In-person participants found it hard to benchmark.",
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

/* ---------- Page wiring ---------- */

function getState() {
  let s = {};
  try { s = JSON.parse(sessionStorage.getItem("aibench") || "{}"); }
  catch (e) { s = {}; }
  return s;
}
function setState(patch) {
  const s = Object.assign(getState(), patch);
  try { sessionStorage.setItem("aibench", JSON.stringify(s)); } catch (e) {}
  return s;
}

function renderDatasetCard(el, key) {
  const d = DATASETS[key];
  if (!d || d.custom) {
    el.innerHTML =
      '<p class="hint">Using your own dataset? Have its title, publisher, ' +
      "description, and URL ready — the Phase 3 prompt builder will ask for them. " +
      '<span class="flag">TEAM DECISION #3</span> covers how the dataset list grows.</p>';
    return;
  }
  el.innerHTML = `
    <h3>${d.title}</h3>
    <p class="meta">${d.org} · <a href="${d.url}" target="_blank" rel="noopener">${d.url}</a></p>
    <p>${d.description}</p>`;
}

function renderRubric(el, categoryKeys) {
  el.innerHTML = categoryKeys.map((k) => {
    const c = RUBRIC[k];
    const caveat = c.caveat ? `<p class="flag-block">${c.caveat}</p>` : "";
    const rows = Object.entries(c.levels).map(([lvl, txt]) => {
      const cls = lvl.toLowerCase().replace(/\s+/g, "-");
      return `<tr><th class="lvl lvl-${cls}">${lvl}</th><td>${txt}</td></tr>`;
    }).join("");
    return `<section class="rubric-cat">
      <h3>${c.name}</h3>${caveat}
      <table class="rubric"><tbody>${rows}</tbody></table>
    </section>`;
  }).join("");
}

function wireCopyButtons(root) {
  (root || document).querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = document.getElementById(btn.dataset.copyTarget);
      navigator.clipboard.writeText(src.textContent).then(() => {
        const prev = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => { btn.textContent = prev; }, 1500);
      });
    });
  });
}

/* Phase 1 page */
function initPhase1() {
  const dsSelect = document.getElementById("dataset-select");
  const dsCard = document.getElementById("dataset-card");
  const triadSelect = document.getElementById("triad-select");
  const rubricEl = document.getElementById("triad-rubric");
  const state = getState();

  if (state.dataset) dsSelect.value = state.dataset;
  if (state.triad) triadSelect.value = state.triad;

  function refresh() {
    setState({ dataset: dsSelect.value, triad: triadSelect.value });
    renderDatasetCard(dsCard, dsSelect.value);
    renderRubric(rubricEl, TRIADS[triadSelect.value].categories);
  }
  dsSelect.addEventListener("change", refresh);
  triadSelect.addEventListener("change", refresh);
  refresh();

  document.querySelectorAll("a[data-form='assessment']")
    .forEach((a) => { a.href = FORM_URLS.assessment; });
}

/* Phase 3 page */
function initPhase3() {
  const state = getState();
  const dsSelect = document.getElementById("dataset-select");
  const triadSelect = document.getElementById("triad-select");
  const customFields = document.getElementById("custom-dataset-fields");
  const p1 = document.getElementById("prompt-step-one");
  const p2 = document.getElementById("prompt-step-two");

  if (state.dataset) dsSelect.value = state.dataset;
  if (state.triad) triadSelect.value = state.triad;

  function currentDataset() {
    if (dsSelect.value !== "custom") return DATASETS[dsSelect.value];
    return {
      title: document.getElementById("c-title").value,
      org: document.getElementById("c-org").value,
      description: document.getElementById("c-desc").value,
      url: document.getElementById("c-url").value
    };
  }

  function refresh() {
    setState({ dataset: dsSelect.value, triad: triadSelect.value });
    customFields.hidden = dsSelect.value !== "custom";
    p1.textContent = stepOnePrompt(currentDataset());
    p2.textContent = stepTwoPrompt(TRIADS[triadSelect.value].categories);
  }

  dsSelect.addEventListener("change", refresh);
  triadSelect.addEventListener("change", refresh);
  ["c-title", "c-org", "c-desc", "c-url"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", refresh);
  });
  refresh();
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
