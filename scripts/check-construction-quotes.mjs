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
  "fl-713.06": "Construction/sources/Florida Statutes 713.06 Liens of persons not in privity 2026-11-05.txt",
  "ca-8124-8204": "Construction/sources/California Civil Code 8124-8138 and 8204 waiver forms and preliminary notice 2026-11-05.txt",
  "tx-53": "Construction/sources/Texas Property Code 53.056 and 53.281-53.287 waiver and release 2026-11-05.txt",
  "wy-29-10-101": "Construction/sources/Wyoming WS 29-10-101 Preliminary notice and lien waiver forms 2026-11-05.txt",
  "ma-254-32": "Construction/sources/Massachusetts GL c254 s32 Void covenants and partial waiver form 2026-11-07.txt",
  "mi-570-1115": "Construction/sources/Michigan MCL 570.1115 Waiver of construction lien 2026-11-07.txt",
  cpwd: `Construction/sources/CPWD Works Manual 2022 ${D}.txt`,
  "gst-wc": `Construction/sources/GST Council - Works Contracts in GST flyer ${D}.txt`,
  "it-act-2025": "ERP/sources/it-act-2025.txt",
  // Batches 2–3 (docs/batch-plans/construction.md), read 2026-11-05.
  ...Object.fromEntries(Object.entries({
    "far-32.103": "FAR 32.103 Progress payments under construction contracts",
    "far-52.236-2": "FAR 52.236-2 Differing site conditions",
    "usc-31-3905": "31 USC 3905 Prompt Payment Act construction",
    "usc-26-460": "26 USC 460 Long-term contracts",
    "irs-rp-2025-32": "IRS Rev Proc 2025-32 inflation adjustments 2026",
    "sba-994f": "SBA Form 994F Schedule of Work in Process",
    "tx-pr-28": "Texas Property Code ch 28 Prompt payment",
    "tx-pr-53": "Texas Property Code 53.101 Funds required to be reserved",
    "tx-gv-2252": "Texas Government Code 2252.032 and 2251.022 Retainage and subcontractor payment",
    "ca-civ-8800": "California Civil Code 8800 Progress payment",
    "ca-civ-8811": "California Civil Code 8811 Retention cap private works",
    "ca-civ-8812": "California Civil Code 8812 Retention release",
    "ca-pcc-7201": "California Public Contract Code 7201 Retention public works",
    "ny-gbs-756": "New York GBL 756 and 756-a Construction contracts",
    "ny-gbs-756-c": "New York GBL 756-c Retention",
    "ny-gbs-757": "New York GBL 757 Void provisions",
    "fl-255.078": "Florida Statutes 255.078 Public construction retainage",
    "aia-g714sum": "AIA G714 Construction Change Directive summary",
    "aia-covccd": "AIA Change orders vs construction change directives",
    // Plain pdftotext, not -layout: the layout text splits Clause 7's sentences with its margin labels.
    "cpwd-gcc-2023": "CPWD General Conditions of Contract 2023 Construction Works",
    "cgst-act": "CGST Act 2017 CBIC updated 30.09.2020",
    "cgst-rate-15-2025": "CGST Notification 15-2025 Central Tax Rate",
    // Batch 3b: liens, prompt pay, certified payroll.
    "ca-8204": "California Civil Code 8204 Preliminary notice",
    "ca-8412-8460": "California Civil Code 8412 8414 8460 Claim of lien deadlines",
    "ca-7108.5-8814": "California prompt payment B&P 7108.5 and Civil Code 8814",
    "ny-lien-10": "New York Lien Law 10 and GBL 756-a subcontractor payment",
    "tx-53.052": "Texas Property Code 53.052 and 53.158 Lien affidavit and suit",
    "fl-713.08": "Florida Statutes 713.08 Claim of lien",
    "fl-715.12": "Florida Statutes 715.12 Construction Contract Prompt Payment Law",
    "fl-255.073": "Florida Statutes 255.073 Timely payment for construction services",
    "usc-40-3133": "40 USC 3133 Miller Act rights of persons furnishing labor or material",
    "usc-40-3142": "40 USC 3142 Davis-Bacon rate of wages",
    "usc-40-3145": "40 USC 3145 Copeland Act weekly statement",
    "usc-31-3903": "31 USC 3903 Prompt Payment Act regulations",
    "cfr-29-5.5": "29 CFR 5.5 Contract provisions and related matters",
    "dol-dbra": "DOL WH-347 instructions and Davis-Bacon page",
    // Batch 3c: India labour codes (in force from 21 November 2025), cess.
    "ss-code": "Code on Social Security 2020 Gazette",
    "osh-code": "OSH Code 2020 Gazette",
    "ss-rules-2026": "Social Security (Central) Rules 2026 G.S.R. 344(E)",
    "osh-rules-2026": "OSH (Central) Rules 2026 G.S.R. 345(E)",
    "cess-2026": "Gazette S.O. 2322(E) 8 May 2026 BOCW cess one per cent",
  }).map(([k, name]) => [k, `Construction/sources/${name} 2026-11-05.txt`])),
  msmed: "ERP/sources/msmed-act-2006.txt",
  "icai-as7": "Construction/sources/ICAI AS 7 Construction Contracts 2026-11-06.txt",
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
