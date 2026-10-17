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
import { execFileSync } from "node:child_process";
import { AI_SEARCH_URL } from "../src/lib/ai-search.ts";

const CHECKS = [
  // Ownership and licence
  ["Who owns the code?", /not a copy of the code/],
  ["Who owns the software after I pay?", /software stays ours/],
  ["Is the code ours once we pay for the build?", /not a copy of the code/],
  ["Do we get a licence to the system or the source code?", /software stays ours|not a copy of the code/],
  ["If we stop paying the AMC, can we keep using the system?", /for as long as the annual maintenance contract/],
  ["Can we get a copy of the source code?", /not a copy of the code/],
  // Money, time, hosting
  ["How much does a custom ERP cost in India?", /₹3–15 lakh/],
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
process.exit(failed ? 1 : 0);
