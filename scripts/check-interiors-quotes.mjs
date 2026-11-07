#!/usr/bin/env node
// Checks every quote in the interiors guides (content/interiors/*.md `checks`) word for word against the page texts
// saved when they were read, in ~/Developer/FOLDER SAMPLE - FOR APP/Interiors/sources (list and URLs:
// docs/batch-plans/us-interiors.md). Without them the check is skipped with a warning, so any machine can still build.
// When a vendor or agency changes a page, save the new text with a new date and re-check.
import fs from "node:fs";
import path from "node:path";

const DIR = process.env.INT_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/Interiors/sources";
const D = "2026-11-07";
const DOCS = {
  "asid-mn": `ASID Minnesota - Costs and fees ${D}.txt`,
  "asid-contract": `ASID - Residential contract form user guide 2018 ${D}.txt`,
  "qbo-billable": `Intuit - Enter billable expenses ${D}.txt`,
  "qbo-po": `Intuit - Create and send purchase orders ${D}.txt`,
  "qbo-deposit": `Intuit - Request a customer deposit on an estimate ${D}.txt`,
  "qbo-pricing": "Intuit - QuickBooks Online pricing 2026-11-06.txt",
  "dm-model": `Design Manager - An interior design business model ${D}.txt`,
  "sd-accounting": `Studio Designer - Accounting ${D}.txt`,
  "arhaus-terms": `Arhaus - Trade program terms and conditions ${D}.txt`,
  "arhaus-faq": `Arhaus - Trade program FAQs ${D}.txt`,
  "cra-rates": `CRA - GST HST rates calculator ${D}.txt`,
  "cra-charge": `CRA - Charge and collect the GST HST which rate ${D}.txt`,
  "cra-place": `CRA - GST HST Memorandum 3-3-3 and 3-3-6 place of supply ${D}.txt`,
  "irs-1099": `IRS - Instructions for Forms 1099-MISC and 1099-NEC ${D}.txt`,
  "usc-14706": `Cornell LII - 49 USC 14706 ${D}.txt`,
  "cfr-370.3": `Cornell LII - 49 CFR 370.3 ${D}.txt`,
  "cfr-370.5": `Cornell LII - 49 CFR 370.5 ${D}.txt`,
  "cfr-370.9": `Cornell LII - 49 CFR 370.9 ${D}.txt`,
  "bc-pst-139": `BC - PST 139 Interior designers and home stagers raw ${D}.txt`,
  "bc-pst-301": `BC - PST 301 Related services raw ${D}.txt`,
  "ca-pub35-realprop": `CDTFA - Pub 35 Improvements to real property ${D}.txt`,
  "qbo-projects": "Intuit - QuickBooks Online inventory, costing and projects 2026-11-02.txt",
  "ny-tsb-a-08-30": `New York - TSB-A-08(30)S millwork shop drawings ${D}.txt`,
  "cra-register": `CRA - When to register for and start charging the GST HST ${D}.txt`,
  "dm-ack": `Design Manager - Acknowledging purchase orders and receiving merchandise ${D}.txt`,
  "dm-deposit": `Design Manager - Deposit on project purchase order ${D}.txt`,
  "sd-proposal": `Studio Designer - Proposal confidence vs confusion ${D}.txt`,
  "programa-po": `Programa - Purchase orders for interior designers ${D}.txt`,
  "houzz-qbo": `Houzz Pro - Sync with QuickBooks Online FAQs ${D}.txt`,
  "houzz-po": `Houzz Pro - Turn on purchase orders in QuickBooks Online ${D}.txt`,
  "ca-pub35-fees": `CDTFA - Pub 35 Designer fees and merchandise ${D}.txt`,
  "ca-pub35-buy": `CDTFA - Pub 35 Purchases resale certificates use tax ${D}.txt`,
};
const files = Object.fromEntries(Object.entries(DOCS).map(([k, f]) => [k, path.join(DIR, f)]));
const absent = Object.entries(files).filter(([, f]) => !fs.existsSync(f)).map(([k]) => k);
if (absent.length) {
  console.warn(`interiors quotes: sources not found (${absent.join(", ")}); skipped (set INT_SOURCES)`);
  process.exit(0);
}

const norm = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[─–—‐]/g, "-").replace(/\s+/g, " ").trim();
const text = Object.fromEntries(Object.entries(files).map(([k, f]) => [k, norm(fs.readFileSync(f, "utf-8"))]));

const quotes = JSON.parse(fs.readFileSync("src/lib/content-data.generated.json", "utf-8"))
  .filter((e) => e.kind === "interiors")
  .flatMap((e) => (e.checks ?? []).map((c) => ({ where: `${e.slug}, ${c.reg}`, doc: c.doc, quote: c.quote })));

const missing = [];
for (const q of quotes) {
  const doc = text[q.doc];
  if (!doc) missing.push(`${q.where}: unknown doc "${q.doc}"`);
  else if (!doc.includes(norm(q.quote))) missing.push(`${q.where}: not found in ${DOCS[q.doc]}\n  "${q.quote}"`);
}
if (missing.length) {
  console.error(`interiors quotes: ${missing.length} of ${quotes.length} not found in the source text:\n${missing.join("\n")}`);
  process.exit(1);
}
console.log(`interiors quotes: ${quotes.length}/${quotes.length} found in the source text`);
