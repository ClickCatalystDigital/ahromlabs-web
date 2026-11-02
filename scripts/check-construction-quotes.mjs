#!/usr/bin/env node
// Checks every quote in the construction guides (content/construction/*.md `checks`) word for word against the
// texts saved when they were read: ~/Developer/FOLDER SAMPLE - FOR APP/Construction/sources (FAR, state lien
// statutes, CPWD Works Manual, GST Council note) and the Income-tax Act, 2025 in ../ERP/sources. Without them the
// check is skipped with a warning, so any machine can still build.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.env.CON_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP";
const D = "2026-11-03";
const DOCS = {
  "far-52.232-5": `Construction/sources/FAR 52.232-5 Payments under fixed-price construction contracts ${D}.txt`,
  "far-52.232-27": `Construction/sources/FAR 52.232-27 Prompt payment for construction contracts ${D}.txt`,
  "far-52.243-4": `Construction/sources/FAR 52.243-4 Changes ${D}.txt`,
  "az-33-1008": `Construction/sources/Arizona ARS 33-1008 Waiver of lien ${D}.txt`,
  "fl-713.20": `Construction/sources/Florida Statutes 713.20 Waiver or release of liens ${D}.txt`,
  cpwd: `Construction/sources/CPWD Works Manual 2022 ${D}.txt`,
  "gst-wc": `Construction/sources/GST Council - Works Contracts in GST flyer ${D}.txt`,
  "it-act-2025": "ERP/sources/it-act-2025.txt",
};
const files = Object.fromEntries(Object.entries(DOCS).map(([k, f]) => [k, path.join(ROOT, f)]));
if (!Object.values(files).every((f) => fs.existsSync(f))) {
  console.warn("construction quotes: sources not found; skipped (set CON_SOURCES)");
  process.exit(0);
}
// PDFs come through with line-end hyphens and page furniture; join hyphenated breaks and collapse space.
const norm = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[─–—‐]/g, "-").replace(/-\n\s*/g, "-").replace(/\s+/g, " ").trim();
const text = Object.fromEntries(Object.entries(files).map(([k, f]) => [k, norm(fs.readFileSync(f, "utf-8"))]));

const entries = JSON.parse(fs.readFileSync("src/lib/content-data.generated.json", "utf-8")).filter((e) => e.kind === "construction");
let total = 0;
const missing = [];
for (const e of entries) for (const c of e.checks ?? []) {
  total++;
  const doc = text[c.doc];
  if (!doc) missing.push(`${e.slug}: unknown doc "${c.doc}"`);
  else if (!doc.includes(norm(c.quote))) missing.push(`${e.slug}, ${c.reg}: not found in ${DOCS[c.doc]}\n  "${c.quote}"`);
}
if (missing.length) {
  console.error(`construction quotes: ${missing.length} of ${total} not found in the source text:\n${missing.join("\n")}`);
  process.exit(1);
}
console.log(`construction quotes: ${total}/${total} found in the source text`);
