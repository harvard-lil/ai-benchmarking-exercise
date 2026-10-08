// Regenerates agent/prompts.json from js/site.js, so the agent sends exactly
// the prompts a participant sees: stepOnePrompt for research, stepTwoPrompt
// over all six categories for the assessment.
//
//     node agent/dump_prompts.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const site = fs.readFileSync(path.join(here, "..", "js", "site.js"), "utf8");

// site.js is a browser script. Its top level only declares data and
// functions, so it can be evaluated as is; the extra statement at the end
// reads those declarations, which share the script's scope.
const context = vm.createContext({});
vm.runInContext(
  `${site}
;globalThis.__prompts = {
  categories: CATEGORY_ORDER,
  category_names: Object.fromEntries(CATEGORY_ORDER.map((k) => [k, RUBRIC[k].name])),
  levels: Object.keys(RUBRIC[CATEGORY_ORDER[0]].levels),
  datasets: Object.entries(DATASETS)
    .filter(([, d]) => !d.custom)
    .map(([key, d]) => ({
      key,
      title: d.title,
      research: stepOnePrompt(d),
      assessment: stepTwoPrompt(CATEGORY_ORDER),
    })),
};`,
  context,
);

const out = path.join(here, "prompts.json");
fs.writeFileSync(out, JSON.stringify(context.__prompts, null, 2) + "\n");
console.log(
  `wrote ${path.relative(process.cwd(), out)}: ${context.__prompts.datasets.length} datasets`,
);
