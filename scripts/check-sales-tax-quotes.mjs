#!/usr/bin/env node
// Checks every quote in the sales tax guides (content/sales-tax/*.md `checks`) and every state rule in the nexus
// checker (src/lib/sales-tax-calc.ts) word for word against the page texts saved when they were read, in
// ~/Developer/FOLDER SAMPLE - FOR APP/Sales tax/sources. Without them the check is skipped with a warning, so any
// machine can still build. When a state or the Board changes a page, save the new text with a new date and re-check.
import fs from "node:fs";
import path from "node:path";

const DIR = process.env.ST_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/Sales tax/sources";
const D = "2026-11-03";
const DOCS = {
  "sst-chart": `SST - Remote Seller State Guidance ${D}.txt`,
  "sst-faq": `SST - Remote Seller FAQs ${D}.txt`,
  "sst-exemptions": `SST - Exemptions ${D}.txt`,
  "sst-wayfair": `SST - South Dakota v Wayfair ${D}.txt`,
  "sst-free": `SST - Free sales tax services ${D}.txt`,
  "sst-states": `SST - State Information ${D}.txt`,
  "tx-remote": `Texas Comptroller - Remote Sellers ${D}.txt`,
  "tx-mfg": `Texas Comptroller - Manufacturing Exemptions ${D}.txt`,
  "tx-use": `Texas Comptroller - Use Tax ${D}.txt`,
  "tx-business": `Texas Comptroller - Engaged in Business ${D}.txt`,
  "ca-wayfair": `CDTFA - Wayfair use tax collection ${D}.txt`,
  "ca-mfg": `CDTFA - Manufacturing exemption guide ${D}.txt`,
  "ca-pub103": `CDTFA - Publication 103 Sales for Resale ${D}.txt`,
  "tx-3.291": "Texas 34 TAC 3.291 Contractors 2026-11-05.txt",
  "ca-1521": "CDTFA Regulation 1521 Construction contractors 2026-11-05.txt",
  "tx-sales": "Texas Comptroller - Sales and Use Tax 2026-11-07.txt",
  "tx-mfg-1107": "Texas Comptroller - Manufacturing Exemptions 2026-11-07.txt",
  "ca-mfg-buy": "CDTFA - Manufacturing exemption purchasers 2026-11-07.txt",
  "ny-nexus": "New York - Registration for businesses with no physical presence 2026-11-07.txt",
  "wayfair-lii": "Cornell LII - South Dakota v Wayfair opinion 2026-11-07.txt",
  "ky-hb757": "Kentucky General Assembly - 2026 HB 757 2026-11-07.txt",
  "ky-ch161": "Kentucky Acts 2026 Chapter 161 (HB 757) 2026-11-07.txt",
};
const files = Object.fromEntries(Object.entries(DOCS).map(([k, f]) => [k, path.join(DIR, f)]));
if (!Object.values(files).every((f) => fs.existsSync(f))) {
  console.warn("sales tax quotes: sources not found; skipped (set ST_SOURCES)");
  process.exit(0);
}

const norm = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[─–—‐]/g, "-").replace(/\s+/g, " ").trim();
const text = Object.fromEntries(Object.entries(files).map(([k, f]) => [k, norm(fs.readFileSync(f, "utf-8"))]));

const quotes = JSON.parse(fs.readFileSync("src/lib/content-data.generated.json", "utf-8"))
  .filter((e) => e.kind === "sales-tax")
  .flatMap((e) => (e.checks ?? []).map((c) => ({ where: `${e.slug}, ${c.reg}`, doc: c.doc, quote: c.quote })));
// The checker's state rules, read from the source file (this script is plain Node).
const calc = fs.readFileSync("src/lib/sales-tax-calc.ts", "utf-8");
// A rule that names its own source (`source: { …, doc: "key" }`) is checked against that text instead of the chart.
for (const [, code, rule, doc] of calc.matchAll(/code: "([A-Z]{2})"[^\n]*?rule: "((?:[^"\\]|\\.)*)"(?:[^\n]*?doc: "([a-z0-9-]+)")?/g)) if (rule) quotes.push({ where: `nexus checker, ${code}`, doc: doc ?? "sst-chart", quote: rule.replace(/\\"/g, '"') });

const missing = [];
for (const q of quotes) {
  const doc = text[q.doc];
  if (!doc) missing.push(`${q.where}: unknown doc "${q.doc}"`);
  else if (!doc.includes(norm(q.quote))) missing.push(`${q.where}: not found in ${DOCS[q.doc]}\n  "${q.quote}"`);
}
if (missing.length) {
  console.error(`sales tax quotes: ${missing.length} of ${quotes.length} not found in the source text:\n${missing.join("\n")}`);
  process.exit(1);
}
console.log(`sales tax quotes: ${quotes.length}/${quotes.length} found in the source text`);
