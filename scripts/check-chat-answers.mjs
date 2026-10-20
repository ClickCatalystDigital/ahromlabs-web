#!/usr/bin/env node
// Asks Ahrom AI the questions business owners ask and checks the *answer*, not
// just retrieval (that's check-chatbot.mjs). Each question runs twice, because
// answers vary; both runs must pass. Exit code 1 on any failure.
//
//   npm run chat:check                       today's chat: AI Search /chat/completions
//   npm run chat:check -- --url http://localhost:3000/api/ahrom-ai
//                                            the Jev route (docs/ahrom-ai-router-plan.md)
//   npm run chat:check -- --only cost        questions whose id contains "cost"
//   npm run chat:check -- --url https://ahromlabs.com/api/ahrom-ai --pace
//                                            the live route, 6.5 s between questions to stay
//                                            under its 10-a-minute limit (CHAT_LIMITER)
//
// A check is [id, question, must[], mustNot[]]: every `must` pattern has to
// match, no `mustNot` may. Expected wording comes from src/lib/engagement.ts and
// the pages, so a wording change there may need a pattern change here.
import { AI_SEARCH_URL } from "../src/lib/ai-search.ts";

const NOT_COVERED = /doesn'?t cover|does not cover|not covered|doesn'?t say/i;
const LEAK = /\bwe need to (search|retrieve|use)|the instructions (say|mention)|let'?s open/i;
const CONTACT = /ahromlabs\.com\/#contact/;
// The route's "talk to Pujan" reply: wrong for a question the site answers.
const HANDOFF = /Tell Pujan about your business/;

const CHECKS = [
  // What we are, what we build
  ["intro", "What does Ahrom Labs do?", [/manufactur|trading/i], [NOT_COVERED]],
  ["systems", "What kind of systems do you build?", [/ERP|operations/i], [NOT_COVERED]],
  ["industries", "Which industries have you worked with?", [/boiler/i, /electronic|interior|furniture/i], [NOT_COVERED]],
  ["clients", "Who have you built systems for?", [/LS Technologies|Savistar|Saag/i], [/Shanti/i, NOT_COVERED]],
  ["fit", "We're a 40-person manufacturer, is a custom system right for us?", [/spreadsheet|off-the-shelf|outgrown|fit/i], [NOT_COVERED]],
  ["demo", "Can I see a demo?", [/(boiler|interiors|electronics)-erp\.ahromlabs\.com/], [NOT_COVERED]],
  // Money and time
  ["cost", "How much does a custom ERP cost?", [/3\s*[–-]\s*15 lakh|₹3/], [NOT_COVERED]],
  ["cost-hinglish", "ERP banane ka kharcha kitna hai?", [/3\s*[–-]\s*15 lakh|₹3/], [NOT_COVERED]],
  ["pricing", "How do you charge for a project?", [/fixed/i, /phase/i], [/hourly rate of|per hour/i, NOT_COVERED]],
  ["amc", "What does the AMC cost?", [/15\s*[–-]\s*21\s*%|15 to 21/], [NOT_COVERED]],
  ["go-live", "How long does it take to go live?", [/days or weeks|couple of months|first phase/i], [/\d+\s*[–-]\s*\d+\s*months/i, NOT_COVERED]],
  ["changes", "What if our requirements change midway?", [/written down|priced|agreed/i], [NOT_COVERED]],
  // Terms
  ["ownership", "Who owns the code?", [/ours|Ahrom Labs owns|stays with us|licen[cs]e/i], [/\byou (will )?own (the )?(code|software)\b/i, NOT_COVERED]],
  ["ownership-2", "Is the source code ours after we pay?", [/not (a copy|yours)|stays with us|licen[cs]e/i], [/\byes,? (it is|the code is) yours/i, NOT_COVERED]],
  ["data", "What happens to our data?", [/export/i], [NOT_COVERED]],
  ["hosting", "Is it on the cloud or our own server?", [/cloud/i], [NOT_COVERED]],
  ["hosting-cost", "Who pays for the server?", [/included in the AMC|AMC/i], [NOT_COVERED]],
  ["continuity", "You're a small firm, what if you're unavailable?", [/developers|AI agents|system document/i], [NOT_COVERED]],
  // Systems people ask about by name
  ["tally", "Can we keep using Tally?", [/Tally can stay|keep|stay as your books|alongside/i], [NOT_COVERED]],
  ["payroll", "Can you handle payroll for contract labour?", [/daily|attendance|wage/i], [NOT_COVERED]],
  ["portal", "Can our customers track their orders?", [/portal|login|track/i], [NOT_COVERED]],
  ["documents", "Can it read our purchase invoices automatically?", [/extract|read|AI/i], [NOT_COVERED]],
  ["ibr", "Can your system make IBR forms for boilers?", [/IBR|Form|certificate/i], [NOT_COVERED]],
  // The service pages (20 Oct 2026): a "can you build X?" is answered, not sent to the contact page
  ["crm-leads", "Can your CRM take leads from WhatsApp and IndiaMART?", [/IndiaMART/i, /WhatsApp/i], [NOT_COVERED]],
  ["supplier", "Do you build a supplier portal?", [/link|supplier/i], [NOT_COVERED]],
  ["ai-assistant", "Can you build an AI assistant that answers from our own data?", [/assistant|answer/i], [NOT_COVERED, HANDOFF]],
  ["search-docs", "Can you search our old drawings and quotations?", [/search|drawing|quotation/i], [NOT_COVERED, HANDOFF]],
  ["portal-demo", "Can I try the customer portal in a demo?", [/-erp\.ahromlabs\.com\/demo/], [NOT_COVERED]],
  ["bom", "Can you import our BOM from Excel?", [/BOM|bill.of.materials/i], [NOT_COVERED]],
  ["offcuts", "Do you track offcuts and remnants?", [/remnant|offcut/i], [NOT_COVERED]],
  // Talking to a person
  ["contact", "I want to talk to someone about a project", [CONTACT], []],
  // Small talk and the edges
  ["hi", "hi", [/Ahrom|build|ask/i], [NOT_COVERED, CONTACT]],
  ["ghosts", "are you afraid of ghosts?", [/./], [NOT_COVERED, CONTACT]],
  ["who", "who are you?", [/Ahrom AI|assistant/i], [NOT_COVERED]],
  ["uncovered", "Do you build mobile games?", [NOT_COVERED, CONTACT], []],
  ["unnamed-client", "Which boiler company did you build for?", [/./], [/Shanti/i]],
];

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1];
};
const url = arg("--url");
const only = arg("--only");
const pace = process.argv.includes("--pace") ? 6500 : 0;

// The text of one answer, from either target.
async function ask(question) {
  const messages = [{ role: "user", content: question }];
  if (url) {
    const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages }) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  }
  const r = await fetch(`${AI_SEARCH_URL}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://ahromlabs.com" },
    body: JSON.stringify({ messages, stream: false }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return (await r.json()).choices?.[0]?.message?.content ?? "";
}

let failed = 0;
let total = 0;
for (const [id, question, must, mustNot] of CHECKS) {
  if (only && !id.includes(only)) continue;
  total++;
  const problems = [];
  let ms = 0;
  for (let run = 1; run <= 2; run++) {
    if (pace) await new Promise((r) => setTimeout(r, pace));
    const t = Date.now();
    let text;
    try {
      text = await ask(question);
    } catch (e) {
      problems.push(`run ${run}: ${e.message}`);
      continue;
    }
    ms = Math.max(ms, Date.now() - t);
    if (LEAK.test(text)) problems.push(`run ${run}: leaked reasoning`);
    for (const p of must) if (!p.test(text)) problems.push(`run ${run}: missing ${p}`);
    for (const p of mustNot) if (p.test(text)) problems.push(`run ${run}: has ${p}`);
    if (problems.length && run === 1) problems.push(`  said: ${text.slice(0, 160).replace(/\s+/g, " ")}`);
  }
  if (problems.length) failed++;
  console.log(`${problems.length ? "FAIL" : "pass"}  ${id.padEnd(15)} ${(ms / 1000).toFixed(1)}s  ${question}`);
  for (const p of problems) console.log(`        ${p}`);
}
console.log(`\n${total - failed}/${total} answered right both times (${url ?? "AI Search chat"})`);
process.exit(failed ? 1 : 0);
