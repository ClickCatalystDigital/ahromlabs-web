#!/usr/bin/env node
// Checks every IBR quote on the site against the official text, so a wrong or
// half-remembered rule can't ship: form titles, regulation quotes in
// src/lib/ibr-forms.ts, and `checks` in content/ibr/*.md guides. Each quote must
// appear verbatim (case, quote marks, dashes and line breaks normalised) in the
// IBR 2026 Gazette, or for `old.quote`s in the IBR 1950 forms index, or for
// guide checks marked `doc: act` in the Boilers Act, 2025.
//
// The sources are 30 MB of PDF, kept outside the repo. Point IBR_SOURCES at the
// folder holding the pdftotext output; without it the check is skipped with a
// warning, so a machine without the PDFs can still build.
//   node scripts/check-ibr-quotes.mjs           # check
//   node scripts/check-ibr-quotes.mjs --sheet   # also print the claim sheet
import fs from "node:fs";
import path from "node:path";
import { ibrForms } from "../src/lib/ibr-forms.ts";

const SOURCES = process.env.IBR_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/IBR 2026/sources";
const GAZETTE = path.join(SOURCES, "IBR 2026 - Gazette No 596 2026-10-01.txt");
const INDEX_1950 = path.join(SOURCES, "IBR 1950 - forms index.txt");
const ACT_2025 = path.join(SOURCES, "Boilers Act 2025 - Gazette 2025-04-04.txt");

if (![GAZETTE, INDEX_1950, ACT_2025].every((f) => fs.existsSync(f))) {
  console.warn(`ibr quotes: sources not found in ${SOURCES}; skipped (set IBR_SOURCES)`);
  process.exit(0);
}

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[─–—‐]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

// pdftotext separates pages with form feeds; keep them so a match can report its page.
const pages = (file) => fs.readFileSync(file, "utf-8").split("\f").map(norm);
const gazette = pages(GAZETTE);
const index1950 = pages(INDEX_1950);
const docs = { "2026": gazette, "1950": index1950, act: pages(ACT_2025) };
// A quote may run across a page break, so also try each page joined to the next.
const find = (doc, quote) => {
  const q = norm(quote);
  for (let i = 0; i < doc.length; i++) {
    if (doc[i].includes(q) || (i + 1 < doc.length && `${doc[i]} ${doc[i + 1]}`.includes(q))) return i + 1;
  }
  return 0;
};

const claims = [];
for (const f of ibrForms) {
  const name = f.part ? `${f.form} ${f.part}` : f.form;
  claims.push({ where: `${name} title`, doc: "2026", quote: f.quote });
  if (f.old) claims.push({ where: `${name} ← ${f.old.form} (1950)`, doc: "1950", quote: f.old.quote });
  for (const fact of f.page?.facts ?? []) claims.push({ where: `${name}, reg ${fact.reg}`, doc: "2026", quote: fact.quote });
}

// Guides: content/ibr/*.md frontmatter `checks: [{reg, quote}]`, already parsed
// into the generated content data by build-content.mjs.
const data = JSON.parse(fs.readFileSync(new URL("../src/lib/content-data.generated.json", import.meta.url), "utf-8"));
for (const g of data.filter((e) => e.kind === "guide")) {
  // `doc: act` checks a quote against the Boilers Act, 2025 instead of the regulations.
  for (const c of g.checks ?? []) claims.push({ where: `/ibr/${g.slug}, ${c.reg}`, doc: c.doc ?? "2026", quote: c.quote });
}

let missing = 0;
for (const c of claims) {
  c.page = find(docs[c.doc], c.quote);
  if (!c.page) {
    missing++;
    console.log(`MISSING  ${c.where}: "${c.quote}"`);
  }
}
if (process.argv.includes("--sheet")) {
  for (const c of claims) console.log(`${c.page ? `p.${c.page}`.padEnd(7) : "MISSING"} ${c.doc}  ${c.where}: "${c.quote.slice(0, 110)}${c.quote.length > 110 ? "…" : ""}"`);
}
console.log(`ibr quotes: ${claims.length - missing}/${claims.length} found in the official text`);
process.exit(missing ? 1 : 0);
