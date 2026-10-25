// Checks the AI assistant question library (src/lib/ai-assistant.ts) and the number check behind
// /ai-assistant/number-check, the way scripts/erp.check.ts checks the ERP list.
import fs from "node:fs";
import { questions, vendorTests, ASSISTANT } from "../src/lib/ai-assistant";
import { checkNumbers } from "../src/lib/number-check";

const fail: string[] = [];
const ids = new Set<string>();
for (const q of questions) {
  if (ids.has(q.id)) fail.push(`${q.id}: duplicate id`);
  ids.add(q.id);
  if (!q.id.startsWith(`${q.industry}.`)) fail.push(`${q.id}: id should start with "${q.industry}."`);
  for (const k of ["question", "answer", "check"] as const) if (!q[k]?.trim()) fail.push(`${q.id}: missing ${k}`);
}
for (const t of vendorTests) for (const k of ["title", "ask", "pass", "fail"] as const) if (!t[k]?.trim()) fail.push(`test ${t.id}: missing ${k}`);
// The boiler manufacturer is never named on the site.
if (/shanti/i.test(fs.readFileSync("src/lib/ai-assistant.ts", "utf-8") + fs.readdirSync("content/ai-assistant").map((f) => fs.readFileSync(`content/ai-assistant/${f}`, "utf-8")).join(""))) fail.push("a client that must not be named is named");
for (const a of Object.values(ASSISTANT)) if (!a.name) fail.push(`assistant for ${a.system} has no name`);

// The number check: figures in the data pass in any format; anything else is flagged.
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

if (fail.length) {
  console.error(`ai-assistant.check: ${fail.length} problem(s)\n- ${fail.join("\n- ")}`);
  process.exit(1);
}
console.log(`ai-assistant.check: ${questions.length} questions, ${vendorTests.length} vendor tests, number check OK`);
