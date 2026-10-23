// Self-check for Ahrom AI's shortlist and routing (src/lib/ahrom-ai.ts), no network:
//   npx jiti scripts/ahrom-ai.check.ts
import assert from "node:assert/strict";
import { buildEntries, shortlist, route, words } from "../src/lib/ahrom-ai";

const entries = buildEntries();
const ids = (q: string) => shortlist(entries, q).map((e) => e.id);

// Hinglish and buyer words reach the pages' words.
assert.ok(words("ERP banane ka kharcha kitna hai").includes("cost"));
assert.ok(words("karigar ki hajri").includes("attendance"));
// The buyer FAQs are always offered; the daily-wage page comes in on its words.
assert.ok(ids("hello").includes("faq/ownership"));
assert.ok(ids("payroll for contract labour").some((id) => id.startsWith("service/daily-wage-payroll")));
assert.ok(ids("karigar ki hajri aur pagar").some((id) => id.startsWith("service/daily-wage-payroll")));
// IBR forms only on an IBR word; the list stays within Jev's 40 options.
assert.ok(!ids("what does it cost").some((id) => id.startsWith("guide/")));
assert.ok(ids("which IBR form certifies a small boiler").some((id) => id.startsWith("guide/")));
assert.ok(shortlist(entries, "tally invoice stock payroll boiler ibr form").length <= 40);

// BOQ questions reach the BOQ pages.
assert.ok(ids("interior boq format in excel").includes("boq-tool/template"));
assert.ok(ids("how is a wardrobe measured in a boq").includes("boq/measurement-rules"));
assert.ok(ids("free tool to check my boq").includes("boq-tool/check"));
assert.ok(ids("variation order after boq agreed").includes("boq/variation-orders"));

// Routing, on Jev-shaped answers.
const list = shortlist(entries, "who owns the code");
const own = `e${list.findIndex((e) => e.id === "faq/ownership")}`;
const j = (kind: string, kp: number, entry: string, ep: number, asIs: number) => ({
  kind: { probabilities: { [kind]: kp } }, entry: { probabilities: { [entry]: ep } }, as_is: { noul: asIs },
});
assert.equal(route(list, j("about_us", 0.95, own, 0.9, 0.8)).path, "entry");
assert.equal(route(list, j("about_us", 0.95, own, 0.9, 0.2)).path, "write"); // e.g. Hinglish
assert.equal(route(list, j("about_us", 0.95, own, 0.5, 0.9)).path, "write"); // unsure entry
assert.equal(route(list, j("about_us", 0.9, "none", 0.8, 0)).path, "miss");
assert.equal(route(list, j("small_talk", 0.95, "none", 0.9, 0)).path, "small_talk");
assert.equal(route(list, j("small_talk", 0.7, own, 0.8, 0.8)).path, "entry"); // "hey, who owns the code?"
assert.equal(route(list, j("contact_me", 0.9, "none", 0.9, 0)).path, "contact");
assert.equal(route(list, j("out_of_scope", 0.95, own, 0.4, 0)).path, "miss");

console.log(`ahrom-ai: ok (${entries.length} entries)`);
