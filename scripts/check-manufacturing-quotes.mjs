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
  "irs-538": path.join(DIR, "IRS - Publication 538 Accounting Periods and Methods 2026-11-03.txt"),
  "gs1-upc": path.join(DIR, "GS1 US - How to get a UPC barcode 2026-11-03.txt"),
  acumatica: path.join(DIR, "Acumatica - Distribution management 2026-11-03.txt"),
  odoo: path.join(DIR, "Odoo - Inventory 2026-11-03.txt"),
  fishbowl: path.join(DIR, "Fishbowl - Home 2026-11-03.txt"),
  katana: path.join(DIR, "Katana - Home 2026-11-03.txt"),
  "intuit-sunset": path.join(DIR, "Intuit - QuickBooks Desktop 2023 service discontinuation policy 2026-11-03.txt"),
  "intuit-plans": path.join(DIR, "Intuit - QuickBooks Desktop and Online solutions 2026-11-03.txt"),
  "intuit-pricing": path.join(DIR, "Intuit - QuickBooks Online pricing 2026-11-03.txt"),
  "intuit-dev": path.join(DIR, "Intuit Developer - QuickBooks Online API docs (browser text) 2026-11-03.txt"),
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
