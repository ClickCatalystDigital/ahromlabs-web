// Checks the manufacturing hub (src/lib/manufacturing.ts, content/manufacturing/): every guide is in a hub group,
// every internal link resolves, each guide links at least two other manufacturing guides, page art has alt text,
// the QuickBooks connector is never described as live, and the tools give the worked answers the pages quote.
// Runs inside `npm run content:build`.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { MFG_GROUPS, SCHEDULE_DEMO, mfgGuides, jobVariance, schedule } from "../src/lib/manufacturing";
import { getContent } from "../src/lib/content";
import { mfgArt } from "../src/lib/manufacturing-images";
import { services } from "../src/lib/services";

const fail: string[] = [];
const guides = mfgGuides();
const slugs = new Set(guides.map((g) => g.slug));

for (const group of MFG_GROUPS) for (const s of group.order) if (!slugs.has(s)) fail.push(`manufacturing.ts lists "${s}" in ${group.slug}, but content/manufacturing/${s}.md doesn't exist`);
for (const g of guides) if (!MFG_GROUPS.find((x) => x.slug === g.group)?.order.includes(g.slug)) fail.push(`${g.slug}: not in its group's order in manufacturing.ts`);

const appRoute = (p: string) => fs.existsSync(path.join("src/app", p, "page.tsx"));
const exists = (href: string) => {
  const [p] = href.split(/[#?]/);
  if (/\.[a-z0-9]+$/i.test(p)) return fs.existsSync(path.join("public", p));
  const [, seg, slug, sub] = p.split("/");
  if (seg === "manufacturing") return !slug || slugs.has(slug);
  if (seg === "services" && slug) return services.some((s) => s.slug === slug) || appRoute(p);
  const kinds: Record<string, Parameters<typeof getContent>[0]> = { notes: "note", patterns: "pattern", ibr: "guide", industries: "industry", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant", asme: "asme", systems: "term" };
  if (kinds[seg] && slug && !sub) return getContent(kinds[seg]).some((e) => e.slug === slug && (seg !== "systems" || e.body.trim().length > 0));
  return appRoute(p);
};
const terms = new Set(getContent("term").map((t) => t.slug));
const checkLinks = (where: string, body: string) => {
  for (const [, l] of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    if (!exists(l)) fail.push(`${where}: link to ${l}, which doesn't exist (a term without a body is /systems#slug)`);
    const anchor = l.match(/^\/systems#(.+)$/);
    if (anchor && !terms.has(anchor[1])) fail.push(`${where}: link to /systems#${anchor[1]}, but there's no such term`);
  }
};
for (const g of guides) {
  checkLinks(g.slug, g.body);
  const others = new Set([...g.body.matchAll(/\]\((\/manufacturing\/[^)#?\s]+)/g)].map((m) => m[1]).filter((l) => l !== `/manufacturing/${g.slug}` && !/\.[a-z]+$/.test(l)));
  if (others.size < 2) fail.push(`${g.slug}: links to ${others.size} other manufacturing guide(s); link at least 2`);
  // The QuickBooks connector isn't built: any mention must say so, and nothing may call it live.
  const text = `${g.answer}\n${g.body}`;
  if (/quickbooks[^.\n]{0,60}connector/i.test(text) && !/connector is being built|isn't live yet/i.test(text)) fail.push(`${g.slug}: mentions a QuickBooks connector without saying it isn't built yet`);
  if (/(live|deployed|in production)[^.\n]{0,40}quickbooks (online )?(connector|integration)|quickbooks (online )?(connector|integration)[^.\n]{0,20}\b(is live|is deployed)/i.test(text)) fail.push(`${g.slug}: describes the QuickBooks connector as live`);
}
for (const t of getContent("term").filter((t) => t.domain?.[0] === "manufacturing")) checkLinks(`terms/${t.slug}`, t.body);

for (const name of ["manufacturing-hub", ...guides.map((g) => g.slug)]) {
  const a = mfgArt(name);
  if (a && !a.alt) fail.push(`${a.src} has no alt text in manufacturing-images.ts`);
}

// The worked job-cost example quoted on /manufacturing/quickbooks-job-costing and in the Excel workbook.
const close = (a: number, b: number, d = 0.005) => Math.abs(a - b) < d;
const v = jobVariance(
  { materialPerPart: 4.2, setupHours: 2, runMinutesPerPart: 6, outside: 300, scrapParts: 0, reworkHours: 0 },
  { materialPerPart: 4.55, setupHours: 3.5, runMinutesPerPart: 7.5, outside: 300, scrapParts: 8, reworkHours: 1.5 },
  { qty: 200, pricePerPart: 18.5, laborRate: 32, shopRate: 65 },
);
assert.ok(close(v.estimate.total, 3274), `estimate ${v.estimate.total}`);
assert.ok(close(v.actual.total, 4253.4), `actual ${v.actual.total}`);
assert.ok(close(v.actual.lines.find((l) => l.key === "scrap")!.cost, 133.4));
assert.ok(close(v.estimate.marginPct, 0.11514, 1e-4) && close(v.actual.marginPct, -0.14957, 1e-4));
assert.ok(close(v.hoursFactor, 31 / 22, 1e-9));
const page = fs.readFileSync("content/manufacturing/quickbooks-job-costing.md", "utf-8");
for (const s of ["$3,274.00", "$4,253.40", "11.5%", "−15.0%", "1.41 hours", "$979.40", "$485.00", "$133.40"]) if (!page.includes(s)) fail.push(`quickbooks-job-costing: the worked example no longer says "${s}"`);

// The schedule demo's story on /manufacturing/production-scheduling-software (same jobs as ManufacturingTools.tsx).
const BASE = SCHEDULE_DEMO.jobs;
const RUSH = SCHEDULE_DEMO.rush;
const late = (jobs: typeof BASE, h: number) => schedule(jobs, h).jobs.filter((j) => j.late > 0).map((j) => `${j.id}:${j.late}`);
assert.deepEqual(late(BASE, 8), []);
assert.deepEqual(late([...BASE, RUSH], 8), ["J-103 frames:1"]);
assert.deepEqual(late([...BASE, RUSH], 16), []);

if (fail.length) {
  console.error(`manufacturing: ${fail.length} problem(s):\n${fail.join("\n")}`);
  process.exit(1);
}
console.log(`manufacturing: ${guides.length} guides ok, tools ok`);
