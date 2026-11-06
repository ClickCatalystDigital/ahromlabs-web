#!/usr/bin/env node
// Checks every quote in the ASME guides (content/asme/*.md frontmatter `checks`) word for word against the
// free official text it cites, like scripts/check-boq-quotes.mjs. The ASME Code itself is copyrighted and never
// quoted; the documents here are ASME's public certification pages and handbook, the National Board's public pages and NB-264, and the IBR 2026 Gazette (for the
// India pages). Without the source files the check is skipped with a warning, so any machine can still build.
import fs from "node:fs";
import path from "node:path";

const ASME = process.env.ASME_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/ASME/sources";
const IBR = process.env.IBR_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/IBR 2026/sources";
const DOCS = {
  "asme-handbook": path.join(ASME, "ASME BPV-GUI-03 Informational Handbook 2023-05-12.txt"),
  "asme-price-guide": path.join(ASME, "ASME - Price Guide for Certifications (BPV and common fees) 2026-11-05.txt"),
  "asme-faq": path.join(ASME, "ASME - Certification FAQ (scheduling and demonstration excerpts) 2026-11-05.txt"),
  "ibr-2026": path.join(IBR, "IBR 2026 - Gazette No 596 2026-10-01.txt"),
  // Batches 4–9 (docs/batch-plans/asme.md): ASME and National Board public pages, read 2026-11-05.
  ...Object.fromEntries(Object.entries({
    "asme-bpv-cert": "ASME - Boiler and Pressure Vessel Certification page 2026-11-05",
    "asme-forms": "ASME - Data Report Forms page 2026-11-05",
    "asme-aia": "ASME - Authorized Inspection Agency Accreditation page 2026-11-05",
    "asme-books": "ASME - Required Code Books page 2026-11-05",
    "asme-faq-full": "ASME - Certification FAQ full page 2026-11-05",
    "nb-registration": "NBBI - Data Report Registration page 2026-11-05",
    "nb-about": "NBBI - About Us page 2026-11-05",
    "nb-accreditation": "NBBI - Accreditation page 2026-11-05",
    "nb-r-stamp": "NBBI - R Certificate of Authorization page 2026-11-05",
    "nb-commission": "NBBI - Commissioned Inspectors page 2026-11-05",
    "nb-264": "NBBI - NB-264 Criteria for ASME Registration Rev 19",
    "nb-stamping": "NBBI - Synopsis Stamping Requirements by Jurisdiction 2024",
    "asme-ix": "ASME - BPVC Section IX product page 2026-11-05",
    "aws-sperko-2025": "AWS - Welding Journal July 2025 Sperko Section IX changes (free lead) 2026-11-05",
    // Batches 6–9, read 2026-11-06. ASME product pages carry the publisher's one-line description from the page's JSON-LD.
    "asme-viii1": "ASME - BPVC Section VIII Division 1 product page 2026-11-06",
    "asme-ii-a": "ASME - BPVC Section II Part A product page 2026-11-06",
    "asme-ii-d": "ASME - BPVC Section II Part D product page 2026-11-06",
    "asme-v": "ASME - BPVC Section V product page 2026-11-06",
    "asme-xiii": "ASME - BPVC Section XIII product page 2026-11-06",
    "asme-b311": "ASME - B31.1 Power Piping product page 2026-11-06",
    "asme-b313": "ASME - B31.3 Process Piping product page 2026-11-06",
    "asme-bpvc-2025": "ASME - 2025 BPVC page 2026-11-06",
    "asme-code-cases": "ASME - Code Cases page 2026-11-06",
    "nb-nbic": "NBBI - NBIC page 2026-11-06",
    "nb-nbic-2025": "NBBI - NBIC 2025 Edition Changes page 2026-11-06",
    "nb-forms": "NBBI - NBIC Report Forms page 2026-11-06",
    "nb-synopsis": "NBBI - NB-370 Synopsis page 2026-11-06",
    "nb-editions": "NBBI - Synopsis NBIC and ASME Code Editions by Jurisdiction 2026",
    // State rules (Ohio, Michigan, Texas from Cornell LII: the official sites refused automated reads).
    "pa-3a": "Pennsylvania - 34 Pa Code ch 3a contents and definitions 2026-11-06",
    "pa-3a-4": "Pennsylvania - 34 Pa Code 3a.4 Adoption of National standards 2026-11-06",
    "pa-3a-21": "Pennsylvania - 34 Pa Code 3a.21 Stamping 2026-11-06",
    "oh-4101-4-3-01": "Ohio - OAC 4101-4-3-01 (LII copy) 2026-11-06",
    "mi-339-5204": "Michigan - Mich Admin Code R 339.5204 (LII copy) 2026-11-06",
    "tx-65-2": "Texas - 16 TAC 65.2 Definitions (LII copy) 2026-11-06",
    "ca-453": "California - 8 CCR 453 Definitions 2026-11-06",
    "ca-454": "California - 8 CCR 454 Air tanks 2026-11-06",
  }).map(([k, f]) => [k, path.join(ASME, `${f}.txt`)])),
};

if (!Object.values(DOCS).every((f) => fs.existsSync(f))) {
  console.warn("asme quotes: sources not found; skipped (set ASME_SOURCES and IBR_SOURCES)");
  process.exit(0);
}

const norm = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[─–—‐]/g, "-").replace(/\s+/g, " ").trim();
const text = Object.fromEntries(Object.entries(DOCS).map(([k, f]) => [k, norm(fs.readFileSync(f, "utf-8"))]));

const entries = JSON.parse(fs.readFileSync("src/lib/content-data.generated.json", "utf-8")).filter((e) => e.kind === "asme");
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
  console.error(`asme quotes: ${missing.length} of ${total} not found in the official text:\n${missing.join("\n")}`);
  process.exit(1);
}
console.log(`asme quotes: ${total}/${total} found in the official text`);
