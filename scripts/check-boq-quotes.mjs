#!/usr/bin/env node
// Checks every quote in the BOQ guides (content/boq/*.md frontmatter `checks`) word for word against
// the official text it cites, the same way scripts/check-ibr-quotes.mjs checks the IBR pages. Each
// check names its document in `doc`. Indian Standards are cited, never quoted (BIS texts are paid),
// so the documents here are the public ones: CPWD's contract conditions, and later the GST Acts.
//
// The sources are kept outside the repo; point BOQ_SOURCES at the folder. Without it the check is
// skipped with a warning, so a machine without them can still build.
import fs from "node:fs";
import path from "node:path";

const SOURCES = process.env.BOQ_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/BOQ/sources";
const DOCS = { "cpwd-gcc-2026": "CPWD GCC Construction Works 2026-04.txt" };

if (!Object.values(DOCS).every((f) => fs.existsSync(path.join(SOURCES, f)))) {
  console.warn(`boq quotes: sources not found in ${SOURCES}; skipped (set BOQ_SOURCES)`);
  process.exit(0);
}

const norm = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[─–—‐]/g, "-").replace(/\s+/g, " ").trim();
const text = Object.fromEntries(Object.entries(DOCS).map(([k, f]) => [k, norm(fs.readFileSync(path.join(SOURCES, f), "utf-8"))]));

const entries = JSON.parse(fs.readFileSync("src/lib/content-data.generated.json", "utf-8")).filter((e) => e.kind === "boq");
let total = 0;
const missing = [];
for (const e of entries) {
  for (const c of e.checks ?? []) {
    total++;
    const doc = text[c.doc];
    if (!doc) missing.push(`${e.slug}: unknown doc "${c.doc}"`);
    else if (!doc.includes(norm(c.quote))) missing.push(`${e.slug}, ${c.reg}: not found in ${DOCS[c.doc]}\n  "${c.quote}"`);
  }
}
if (missing.length) {
  console.error(`boq quotes: ${missing.length} of ${total} not found in the official text:\n${missing.join("\n")}`);
  process.exit(1);
}
console.log(`boq quotes: ${total}/${total} found in the official text`);
