#!/usr/bin/env node
// Asks the site chatbot's search index the questions buyers ask, and checks the
// right passage comes back. Runs after `npm run deploy` (once the sync has had
// time) or on its own: `npm run search:check`. Exit code 1 when any question
// misses, so a regression is loud.
//
// It checks retrieval (the public /search endpoint), not the chat reply: retrieval
// is what wording and settings change, and it isn't hidden by the chat's 48-hour
// answer cache. If the right passage is retrieved, the chat answers from it.
//
// Adding a page? Add two or three questions for it here, in a buyer's words, each
// with a phrase only the right answer contains. See docs/corpus-playbook.md.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { AI_SEARCH_URL } from "../src/lib/ai-search.ts";
import { IBR_2026_URL } from "../src/lib/ibr-forms.ts";

const CHECKS = [
  // Interior BOQ (/boq)
  ["What is the difference between a BOQ and a quotation?", /list of work, not the price|Binding once accepted|binding.*accepted/i],
  ["How is a wardrobe measured in a BOQ?", /60 sq ft|front elevation/],
  ["Which plywood grade should an interior BOQ name?", /IS 303|BWP/],
  ["Do you have an interior BOQ format in Excel?", /Excel template|blank BOQ/],
  ["How are changes after the BOQ is agreed priced?", /variation/i],
  // "Interior BOQ kaise banaye?" is checked in scripts/ahrom-ai.check.ts instead: the chat answers through that
  // router (Hinglish synonyms there), and this index, the fallback, ranks its Hinglish wording below the threshold.
  // ERP requirements (/erp)
  ["What should an ERP requirements checklist include?", /test|what to make a vendor show|vendor must show/i],
  ["Does my ERP need an audit trail?", /cannot be disabled|can't be switched off/],
  ["When is e-invoicing mandatory for my business?", /₹5 crore|five crore/],
  ["What should I ask an ERP vendor to show in a demo?", /in front of you|demo script/i],
  ["Do you have an ERP requirements template in Excel?", /scorecard|scores/i],
  // AI assistants (/ai-assistant)
  ["How can I check if an AI assistant made up a number?", /number check|not in the data|isn't in the data/i],
  ["How do I test an AI assistant before buying it?", /vendor|demo|tests?/i],
  ["Is it safe to give an AI assistant our business data?", /what is sent|the question|own key|read-only/i],
  // Ownership and licence
  ["Who owns the code?", /not a copy of the code/],
  ["Who owns the software after I pay?", /software stays ours/],
  ["Is the code ours once we pay for the build?", /not a copy of the code/],
  ["Do we get a licence to the system or the source code?", /software stays ours|not a copy of the code/],
  ["If we stop paying the AMC, can we keep using the system?", /for as long as the annual maintenance contract/],
  ["Can we get a copy of the source code?", /not a copy of the code/],
  // Money, time, hosting
  ["How much does a custom ERP cost in India?", /₹3–15 lakh/],
  ["ERP banane ka kharcha kitna hai?", /₹3–15 lakh/],
  ["ERP software ki price kya hogi approx?", /₹3–15 lakh/],
  ["What does the AMC cost?", /15–21%/],
  ["What percentage of project value is the yearly AMC?", /15–21%/],
  ["Is hosting included, who pays for the server and storage?", /server is included in the AMC/],
  ["How long does a custom ERP take to go live?", /days or weeks/],
  ["How long until a new system is usable day to day?", /days or weeks|in use early/],
  // Tally
  ["Will it work with Tally?", /Tally can stay as your books/],
  ["Can my existing Tally setup stay in place alongside your system?", /Tally can stay as your books/],
  // Industries
  ["Can your system produce IBR forms for boilers?", /certificate/i],
  ["How long does it take to make a boiler's IBR folder?", /a few minutes/],
  ["Do you build systems for electronics component traders?", /component/i],
  // Services (/services/*): buyers' own words, including Hinglish
  ["Can you do daily wage payroll for contract labour?", /minus advances/],
  ["We pay our karigar daily wages, can your system calculate it?", /minus advances/],
  ["mazdoor ki hajri aur pagar ka hisaab ho sakta hai?", /days present times the daily rate/],
  ["Do suppliers have to sign up to quote?", /private link per request/],
  ["Can suppliers see each other's rates?", /only their own link/],
  ["Can customers see other customers' orders?", /Other customers' orders/],
  ["Can our customers track their order status online?", /track their order status online/],
  ["Can the AI assistant get a number wrong?", /never writes the numbers/],
  ["Can the AI assistant change our data?", /only reads data/],
  ["Do operators weigh every cut piece?", /dimensions and density/],
  ["Can we reuse plate offcuts instead of buying new plate?", /least waste first/],
  // IBR 2026 (/ibr): old and new form names, formal and blunt
  ["When did IBR 2026 replace IBR 1950?", /1 October 2026/],
  ["What changed in the Indian Boiler Regulations 2026?", /renumbered/i],
  ["What is Form III A called now under IBR 2026?", /Form III[- ]A[^.]{0,120}?Form IV Part B|Form IV Part B[^.]{0,60}?Form III-A/],
  ["What is IBR Form IV Part A?", /Constructor's certificate of manufacture and test/i],
  ["Is Form II still the inspection certificate?", /Form I Part B/],
  ["What replaced Form IV-A in the IBR folder?", /Form V Part B/],
  ["Which documents are needed to register a boiler?", /regulation 8/i],
  ["Can IBR certificates be submitted with a digital signature?", /digital signature/i],
  ["How long must a boiler manufacturer keep records under IBR?", /at least five years/],
  ["How long does the owner keep boiler certificates?", /entire life/],
  ["What is a small industrial boiler under IBR 2026?", /500 litres/],
  ["Which form certifies a small industrial boiler?", /Form XXII/],
  ["What is the provisional order form for a new boiler?", /Form X\b/],
  ["What is the Memorandum of Inspection Book form?", /Form XI\b/],
];

// --wait (used by `npm run deploy`): first wait for the sync the deploy just
// started, or this would test the old index. Gives up after 15 minutes.
if (process.argv.includes("--wait")) {
  const wrangler = (...args) =>
    JSON.parse(execFileSync("npx", ["wrangler", "ai-search", ...args, "ahromlabs-search", "--json"], { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }));
  const deadline = Date.now() + 15 * 60 * 1000;
  for (;;) {
    try {
      const jobRunning = wrangler("jobs", "list").some((job) => !job.ended_at);
      const { queued, running } = wrangler("stats");
      if (!jobRunning && !queued && !running) break;
    } catch {}
    if (Date.now() > deadline) { console.log("Sync still running after 15 minutes; checking anyway."); break; }
    await new Promise((r) => setTimeout(r, 20000));
  }
}

let failed = 0;
for (const [query, expect] of CHECKS) {
  let chunks = [];
  try {
    const r = await fetch(`${AI_SEARCH_URL}/search`, {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://ahromlabs.com" },
      body: JSON.stringify({ query }),
    });
    chunks = (await r.json()).result?.chunks ?? [];
  } catch (e) {
    console.log(`ERROR ${query} (${e.message})`);
    failed++;
    continue;
  }
  const rank = chunks.findIndex((c) => expect.test(c.text));
  const ok = rank !== -1;
  if (!ok) failed++;
  const where = ok ? `#${rank + 1} of ${chunks.length}, score ${chunks[rank].score.toFixed(2)}` : `${chunks.length} results`;
  console.log(`${ok ? "pass" : "MISS"}  ${query}  (${where})`);
}
console.log(`\n${CHECKS.length - failed}/${CHECKS.length} found the right passage`);

// Official sources the IBR pages link: a dead government link is a page that no
// longer proves what it says.
const data = JSON.parse(fs.readFileSync(new URL("../src/lib/content-data.generated.json", import.meta.url), "utf-8"));
const urls = new Set([IBR_2026_URL, ...data.flatMap((e) => (e.sources ?? []).map((src) => src.url))]);
for (const url of urls) {
  let status = 0;
  try {
    // curl, not fetch: egazette.gov.in never answers HEAD and omits its intermediate
    // certificate, which macOS curl fetches and Node does not. One byte is enough.
    status = Number(execFileSync("curl", ["-s", "-L", "-m", "60", "-r", "0-0", "-o", "/dev/null", "-w", "%{http_code}", url], { encoding: "utf-8" }));
    if (status === 206) status = 200;
  } catch {}
  if (status !== 200) failed++;
  console.log(`${status === 200 ? "ok  " : "DEAD"}  ${url} (${status || "no answer"})`);
}
process.exit(failed ? 1 : 0);
