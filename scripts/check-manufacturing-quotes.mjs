#!/usr/bin/env node
// Checks every quote in the manufacturing guides (content/manufacturing/*.md frontmatter `checks`) word for word
// against the text of the Intuit pages it cites, saved when the page was checked (the browser text, since
// Intuit's site doesn't serve plain downloads). Without the source files the check is skipped with a warning,
// so any machine can still build. When Intuit changes a page, save the new text with a new date and re-check.
import fs from "node:fs";
import path from "node:path";

const DIR = process.env.MFG_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/Manufacturing/sources";
const DOCS = {
  "intuit-mo": path.join(DIR, "Intuit - Get started with manufacturing orders and assemblies 2026-11-02.txt"),
  "intuit-qbo": path.join(DIR, "Intuit - QuickBooks Online inventory, costing and projects 2026-11-02.txt"),
  "intuit-desktop": path.join(DIR, "Intuit - QuickBooks Desktop Enterprise manufacturing and Advanced Inventory 2026-11-02.txt"),
};

if (!Object.values(DOCS).every((f) => fs.existsSync(f))) {
  console.warn("manufacturing quotes: sources not found; skipped (set MFG_SOURCES)");
  process.exit(0);
}

const norm = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[─–—‐]/g, "-").replace(/\s+/g, " ").trim();
const text = Object.fromEntries(Object.entries(DOCS).map(([k, f]) => [k, norm(fs.readFileSync(f, "utf-8"))]));

const entries = JSON.parse(fs.readFileSync("src/lib/content-data.generated.json", "utf-8")).filter((e) => e.kind === "manufacturing");
let total = 0;
const missing = [];
for (const e of entries) {
  for (const c of e.checks ?? []) {
    total++;
    const doc = text[c.doc];
    if (!doc) missing.push(`${e.slug}: unknown doc "${c.doc}"`);
    else if (!doc.includes(norm(c.quote))) missing.push(`${e.slug}, ${c.reg}: not found in ${path.basename(DOCS[c.doc])}\n  "${c.quote}"`);
  }
}
if (missing.length) {
  console.error(`manufacturing quotes: ${missing.length} of ${total} not found in the source text:\n${missing.join("\n")}`);
  process.exit(1);
}
console.log(`manufacturing quotes: ${total}/${total} found in the source text`);
