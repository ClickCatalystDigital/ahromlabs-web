// Checks the ERP requirements library (src/lib/erp.ts) the way scripts/boq.check.ts checks the BOQ one:
// every line is testable, every link points at something that exists, every production figure is
// already published on the site, and every statutory quote is found word for word in the official
// text. Statutory texts live outside the repo in ERP_SOURCES; without them the quote check is skipped
// with a warning, so a machine without them can still build.
import fs from "node:fs";
import path from "node:path";
import { requirements, departments, ERP_DOCS } from "../src/lib/erp";
import { services } from "../src/lib/services";

const SOURCES = process.env.ERP_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/ERP/sources";
const fail: string[] = [];
const exists = (dir: string, slug: string) => fs.existsSync(path.join("content", dir, `${slug}.md`));
const serviceSlugs = new Set(services.map((s) => s.slug));
const deptSlugs = new Set(departments.map((d) => d.slug));

// The published text a benchmark must appear in: service and work data, and every content page.
const published = [
  fs.readFileSync("src/lib/services.ts", "utf-8"),
  fs.readFileSync("src/lib/work.ts", "utf-8"),
  ...["notes", "patterns", "industries"].flatMap((d) =>
    fs.readdirSync(path.join("content", d)).map((f) => fs.readFileSync(path.join("content", d, f), "utf-8")),
  ),
].join("\n");

const norm = (s: string) =>
  s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[─–—‐]/g, "-").replace(/\s+/g, " ").trim();
const haveSources = Object.values(ERP_DOCS).every((d) => fs.existsSync(path.join(SOURCES, d.file)));
const docText: Record<string, string> = {};
if (haveSources) for (const [k, d] of Object.entries(ERP_DOCS)) docText[k] = norm(fs.readFileSync(path.join(SOURCES, d.file), "utf-8"));

const ids = new Set<string>();
let quotes = 0;
for (const r of requirements) {
  const at = r.id;
  if (ids.has(r.id)) fail.push(`${at}: duplicate id`);
  ids.add(r.id);
  if (!deptSlugs.has(r.dept)) fail.push(`${at}: unknown dept "${r.dept}"`);
  if (!r.id.startsWith(`${r.dept}.`)) fail.push(`${at}: id should start with "${r.dept}."`);
  for (const k of ["question", "text", "why", "test"] as const) if (!r[k]?.trim()) fail.push(`${at}: missing ${k}`);
  if (!r.appliesTo.length || !r.roles.length) fail.push(`${at}: empty appliesTo or roles`);
  if (r.service && !serviceSlugs.has(r.service)) fail.push(`${at}: service "${r.service}" not in services.ts`);
  if (r.pattern && !exists("patterns", r.pattern)) fail.push(`${at}: pattern "${r.pattern}" not found`);
  if (r.note && !exists("notes", r.note)) fail.push(`${at}: note "${r.note}" not found`);
  if (r.term && !exists("terms", r.term)) fail.push(`${at}: glossary term "${r.term}" not found`);
  if (r.benchmark && !published.includes(r.benchmark)) fail.push(`${at}: benchmark "${r.benchmark}" isn't published on the site`);
  const s = r.statutory;
  if (s) {
    if (!(s.doc in ERP_DOCS)) fail.push(`${at}: unknown doc "${s.doc}"`);
    else if (s.quote) {
      quotes++;
      if (haveSources && !docText[s.doc].includes(norm(s.quote))) fail.push(`${at}: quote not found in ${ERP_DOCS[s.doc].file}\n  "${s.quote}"`);
    } else if (!s.cited) fail.push(`${at}: statutory line needs a quote or a reason it is cited`);
  }
}
for (const d of departments) if (!requirements.some((r) => r.dept === d.slug)) fail.push(`dept ${d.slug}: no requirements`);

// The /erp guides (content/erp/*.md) quote the same official texts; each check names its doc.
const guides = JSON.parse(fs.readFileSync("src/lib/content-data.generated.json", "utf-8")).filter((e: { kind: string }) => e.kind === "erp");
for (const g of guides as { slug: string; checks?: { reg: string; quote: string; doc?: string }[] }[]) {
  for (const c of g.checks ?? []) {
    quotes++;
    if (!c.doc || !(c.doc in ERP_DOCS)) fail.push(`guide ${g.slug}: check "${c.reg}" needs a doc from ERP_DOCS`);
    else if (haveSources && !docText[c.doc].includes(norm(c.quote))) fail.push(`guide ${g.slug}, ${c.reg}: quote not found in ${ERP_DOCS[c.doc as keyof typeof ERP_DOCS].file}\n  "${c.quote}"`);
  }
}

if (fail.length) {
  console.error(`erp: ${fail.length} problem(s):\n${fail.join("\n")}`);
  process.exit(1);
}
if (!haveSources) console.warn(`erp: statutory sources not found in ${SOURCES}; quotes not checked (set ERP_SOURCES)`);
console.log(`erp: ${requirements.length} requirements in ${departments.length} departments OK; ${haveSources ? `${quotes}/${quotes} statutory quotes found in the official text` : "quotes skipped"}`);

// The checker's selection rules, on the cases the plan names.
import assert from "node:assert/strict";
import { selectRequirements, applies, toCsv } from "../src/lib/erp-check";
const allDepts = departments.map((d) => d.slug);
const ids_ = (a: Parameters<typeof selectRequirements>[0]) => selectRequirements(a).flatMap((g) => g.items.map((r) => r.id));
const bigMaker = ids_({ industry: "manufacturing", turnover: 15, company: true, tally: "keep", depts: allDepts });
for (const id of ["accounts.e-invoice", "accounts.e-invoice-30-days", "accounts.tally-posting", "accounts.audit-trail", "integrations.tally"]) assert.ok(bigMaker.includes(id), `large manufacturer keeping Tally should get ${id}`);
assert.ok(!bigMaker.includes("accounts.gst-returns"), "keeping Tally: GST returns come from Tally, not the ERP");
const smallTrader = ids_({ industry: "trading", turnover: 2, company: false, tally: "replace", depts: allDepts });
for (const id of ["accounts.e-invoice", "accounts.e-invoice-30-days", "accounts.audit-trail", "accounts.tally-posting", "production.bom-import"]) assert.ok(!smallTrader.includes(id), `small trader shouldn't get ${id}`);
assert.ok(smallTrader.includes("accounts.gst-returns"), "replacing Tally: the ERP prepares returns");
const mid = ids_({ industry: "trading", turnover: 7, company: true, tally: "keep", depts: allDepts });
assert.ok(mid.includes("accounts.e-invoice") && !mid.includes("accounts.e-invoice-30-days"), "₹5–10 crore: e-invoice yes, 30-day rule no");
assert.ok(!applies(requirements.find((r) => r.id === "accounts.audit-trail")!, { industry: "trading", turnover: 20, company: true, tally: "keep", depts: ["sales"] }), "department filter applies");
const csv = toCsv(selectRequirements({ industry: "manufacturing", turnover: 15, company: true, tally: "keep", depts: allDepts }));
assert.equal(csv.trim().split("\r\n").length, bigMaker.length + 1, "CSV has one row per requirement plus the header");
console.log("erp checker: OK");
