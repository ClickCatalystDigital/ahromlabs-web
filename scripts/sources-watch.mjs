#!/usr/bin/env node
// Watches the official sources the guides rely on (every `sources` URL in content/, via the generated content JSON):
// fetches each, hashes its text, and reports which changed since the last run. Replaces the monthly by-hand look at the
// Gazette, CBIC, ASME, Intuit and state pages (docs/knowledge-base-roadmap.md, item 7).
//
//   node scripts/sources-watch.mjs            report changes against scripts/sources-hashes.json
//   node scripts/sources-watch.mjs --update   also save the new hashes (after you've checked the changed pages)
//
// A changed hash means "read it again", not "the law changed": pages with dates or counters on them change often.
// Fetched with curl, not Node fetch: egazette.gov.in omits an intermediate certificate that only curl fetches. It
// identifies itself honestly; sites that refuse scripts (Intuit's help pages, some forums) are listed to check by hand.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const FILE = "scripts/sources-hashes.json";
const entries = JSON.parse(readFileSync("src/lib/content-data.generated.json", "utf-8"));
const urls = new Map(); // url -> pages that cite it
for (const e of entries) for (const s of e.sources ?? []) urls.set(s.url, [...(urls.get(s.url) ?? []), `${e.kind}/${e.slug}`]);

const old = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : {};
const now = {}, changed = [], failed = [];
for (const [url, pages] of urls) {
  let body;
  try {
    body = execFileSync("curl", ["-sL", "--max-time", "40", "-A", "ahromlabs.com-source-check/1.0 (+https://ahromlabs.com)", url], { maxBuffer: 64 << 20 });
  } catch {
    failed.push(`${url} (cited by ${pages.join(", ")})`);
    continue;
  }
  // HTML: compare the visible text only, so scripts, ads and tracking ids don't count as changes. PDFs: the bytes.
  const isPdf = body.subarray(0, 5).toString() === "%PDF-";
  const text = isPdf ? body : body.toString("utf-8").replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!isPdf && text.length < 200) { failed.push(`${url}: almost empty response (cited by ${pages.join(", ")})`); continue; }
  const hash = createHash("sha256").update(text).digest("hex").slice(0, 16);
  now[url] = hash;
  if (old[url] && old[url] !== hash) changed.push(`${url}\n    cited by ${pages.join(", ")}`);
}
console.log(`sources-watch: ${urls.size} sources, ${changed.length} changed, ${failed.length} unreachable${old && Object.keys(old).length ? "" : " (first run: hashes recorded)"}`);
if (changed.length) console.log(`Changed since last run (re-read, then bump the pages' "checked" date):\n  ${changed.join("\n  ")}`);
if (failed.length) console.log(`Unreachable (the site refuses scripts or timed out): check these by hand:\n  ${failed.join("\n  ")}`);
if (process.argv.includes("--update") || !Object.keys(old).length) writeFileSync(FILE, JSON.stringify({ ...old, ...now }, null, 1) + "\n");
