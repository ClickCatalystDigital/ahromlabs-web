// Checks the AI assistant question library (src/lib/ai-assistant.ts) and the number check behind
// /ai-assistant/number-check, the way scripts/erp.check.ts checks the ERP list. Private inputs live outside this
// public repo, in ~/.config/ahrom-labs (AI_PRIVATE): the question → app look-up map and the names that must never
// be published. The client apps (AI_APPS, default ~/Developer) give the real look-up lists. Without either, those
// checks are skipped with a warning, so a machine without them can still build.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { questions, vendorTests, ASSISTANT, aiQuestionsJson } from "../src/lib/ai-assistant";
import { checkNumbers } from "../src/lib/number-check";
import { getContent } from "../src/lib/content";

const fail: string[] = [];
const warn: string[] = [];
const PRIVATE = process.env.AI_PRIVATE ?? path.join(os.homedir(), ".config/ahrom-labs");
const APPS = process.env.AI_APPS ?? path.join(os.homedir(), "Developer");
const read = (f: string) => (fs.existsSync(f) ? fs.readFileSync(f, "utf-8") : null);

// ── Library shape ──
const ids = new Set<string>();
for (const q of questions) {
  if (ids.has(q.id)) fail.push(`${q.id}: duplicate id`);
  ids.add(q.id);
  if (!q.id.startsWith(`${q.industry}.`)) fail.push(`${q.id}: id should start with "${q.industry}."`);
  for (const k of ["question", "answer", "check"] as const) if (!q[k]?.trim()) fail.push(`${q.id}: missing ${k}`);
}
for (const t of vendorTests) for (const k of ["title", "ask", "pass", "fail"] as const) if (!t[k]?.trim()) fail.push(`test ${t.id}: missing ${k}`);
for (const a of Object.values(ASSISTANT)) if (!a.name) fail.push(`assistant for ${a.system} has no name`);

// ── Nothing private in what is published ──
// Real phrasings carry no digits (amounts, dates, part and PO numbers) and no codes; names are checked below.
for (const q of questions)
  for (const line of q.alsoAsked ?? []) {
    if (/\d/.test(line)) fail.push(`${q.id}: phrasing has a digit: "${line}"`);
    if (/\b[A-Z]{2,}-|\b[A-Z]+\d|\d+[A-Z]{2,}/.test(line)) fail.push(`${q.id}: phrasing has a code: "${line}"`);
  }
const json = JSON.stringify(aiQuestionsJson());
if (/"lookup"/.test(json)) fail.push("questions.json carries a look-up key");
const banned = read(path.join(PRIVATE, "ai-banned-names.txt"));
if (banned) {
  const names = banned.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  // The library, and every AI assistant guide.
  const published = [...questions.map((q) => [q.question, q.answer, q.check, ...(q.alsoAsked ?? [])].join(" ")), ...getContent("ai-assistant").map((g) => g.body)].join("\n");
  for (const n of names) if (new RegExp(`\\b${n}\\b`, "i").test(published)) fail.push(`library names "${n}"`);
} else warn.push(`no ${path.join(PRIVATE, "ai-banned-names.txt")}; names not checked`);

// ── Every live look-up in each app has a question; typed counts match the apps ──
const PREFIX: Record<string, string> = { "savistar-saag": "projects", "ls-technologies": "trading", "boiler-manufacturer": "manufacturing" };
const map = read(path.join(PRIVATE, "ai-lookups.json"));
const counts: Record<string, number> = {};
if (map) {
  // Where each app keeps its look-ups, relative to AI_APPS; private, like the map itself.
  const { lookups, toolFiles: TOOL_FILES }: { lookups: Record<string, string>; toolFiles: Record<string, string> } = JSON.parse(map);
  for (const id of Object.keys(lookups)) if (!ids.has(id)) fail.push(`ai-lookups.json: no question "${id}"`);
  for (const [sys, file] of Object.entries(TOOL_FILES)) {
    const src = read(path.join(APPS, file));
    if (!src) { warn.push(`${file} not found; ${sys} coverage not checked`); continue; }
    const keys = [...new Set([...src.matchAll(/^\s*key: '([a-z_]+)'/gm)].map((m) => m[1]))];
    counts[sys] = keys.length;
    const covered = new Set(Object.entries(lookups).filter(([id]) => id.startsWith(`${PREFIX[sys]}.`)).map(([, k]) => k));
    for (const k of keys) if (!covered.has(k)) fail.push(`${ASSISTANT[sys as keyof typeof ASSISTANT].name}: look-up "${k}" has no question`);
    for (const k of covered) if (!keys.includes(k)) fail.push(`${ASSISTANT[sys as keyof typeof ASSISTANT].name}: question mapped to "${k}", which the app doesn't have`);
  }
} else warn.push(`no ${path.join(PRIVATE, "ai-lookups.json")}; coverage not checked`);
if (counts["savistar-saag"]) {
  const note = fs.readFileSync("content/notes/assistant-that-answers-from-your-ledger.md", "utf-8");
  const typed = [...note.matchAll(/there are (\d+) of these look-ups|look-ups \(Savistar & Saag\)\s*\n\s*value: (\d+)/g)].map((m) => Number(m[1] ?? m[2]));
  if (!typed.length) fail.push("note: Savistar's look-up count not found; keep it in a form this check reads");
  for (const n of typed) if (n !== counts["savistar-saag"]) fail.push(`note says ${n} look-ups at Savistar; the app has ${counts["savistar-saag"]}`);
}

// ── One search question per page: no two hub pages share a title or description opening ──
const stem = (s: string, n: number) => s.toLowerCase().replace(/[^a-z ]/g, "").split(/\s+/).slice(0, n).join(" ");
const pages = [
  ...getContent("ai-assistant").map((g) => ({ at: g.slug, title: g.title, description: g.description ?? g.answer })),
  ...["", "number-check", "questions", "vendor-test"].map((r) => {
    const src = fs.readFileSync(`src/app/ai-assistant/${r ? `${r}/` : ""}page.tsx`, "utf-8");
    return { at: r || "hub", title: src.match(/const title = "([^"]+)"/)![1], description: src.match(/description: "([^"]+)"/)![1] };
  }),
];
for (const [i, a] of pages.entries())
  for (const b of pages.slice(i + 1)) {
    if (stem(a.title, 6) === stem(b.title, 6)) fail.push(`${a.at} and ${b.at} share a title opening`);
    if (stem(a.description, 5) === stem(b.description, 5)) fail.push(`${a.at} and ${b.at} share a description opening`);
  }

// ── The number check: figures in the data pass in any format; anything else is flagged ──
const data = "Mehta,125000,300\nInvoiced\t₹8,72,020\nPaid\t2,50,160\nBilled 1250000; outstanding 12,43,500; due 28 Oct";
const flagged = (answer: string) => checkNumbers(answer, data).filter((n) => !n.ok).map((n) => n.text);
const expect = (answer: string, want: string[]) => {
  const got = flagged(answer);
  if (got.join("|") !== want.join("|")) fail.push(`number check: "${answer}" flagged [${got}] not [${want}]`);
};
expect("₹8,72,020 invoiced and ₹2,50,160 paid, due 28 Oct", []);
expect("₹1,25,000 from the Mehtas, 12.5 lakh billed", []);
expect("47% won, 25 items, 3 left", ["47", "25"]);
expect("about ₹12.4 lakh outstanding", ["12.4 lakh"]);
expect("125000300 in total", ["125000300"]);

for (const w of warn) console.warn(`ai-assistant.check: ${w}`);
if (fail.length) {
  console.error(`ai-assistant.check: ${fail.length} problem(s)\n- ${fail.join("\n- ")}`);
  process.exit(1);
}
console.log(`ai-assistant.check: ${questions.length} questions, ${vendorTests.length} vendor tests, look-ups covered (${Object.entries(counts).map(([s, n]) => `${ASSISTANT[s as keyof typeof ASSISTANT].name} ${n}`).join(", ") || "apps not found"}), number check OK`);
