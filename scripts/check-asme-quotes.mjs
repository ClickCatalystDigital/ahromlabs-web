#!/usr/bin/env node
// Checks every quote in the ASME guides (content/asme/*.md frontmatter `checks`) word for word against the
// free official text it cites, like scripts/check-boq-quotes.mjs. The ASME Code itself is copyrighted and never
// quoted; the documents here are ASME's public certification handbook, price guide and FAQ, and the IBR 2026 Gazette (for the
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
