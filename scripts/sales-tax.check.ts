// Checks the sales tax hub (src/lib/sales-tax.ts, content/sales-tax/): every guide is in a hub group, every internal
// link resolves, each guide links at least two other sales tax guides, page art has alt text, and the nexus checker
// gives the answers the pages describe. Runs inside `npm run content:build`.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { NEXUS_STATES, ST_GROUPS, nexusStatus, stGuides } from "../src/lib/sales-tax";
import { getContent } from "../src/lib/content";
import { stArt } from "../src/lib/sales-tax-images";
import { services } from "../src/lib/services";

const fail: string[] = [];
const guides = stGuides();
const slugs = new Set(guides.map((g) => g.slug));

for (const group of ST_GROUPS) for (const s of group.order) if (!slugs.has(s)) fail.push(`sales-tax.ts lists "${s}" in ${group.slug}, but content/sales-tax/${s}.md doesn't exist`);
for (const g of guides) if (!ST_GROUPS.find((x) => x.slug === g.group)?.order.includes(g.slug)) fail.push(`${g.slug}: not in its group's order in sales-tax.ts`);

const appRoute = (p: string) => fs.existsSync(path.join("src/app", p, "page.tsx"));
const kinds: Record<string, Parameters<typeof getContent>[0]> = { notes: "note", patterns: "pattern", ibr: "guide", industries: "industry", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant", asme: "asme", manufacturing: "manufacturing", "sales-tax": "sales-tax", interiors: "interiors", systems: "term" };
const exists = (href: string) => {
  const [p] = href.split(/[#?]/);
  if (/\.[a-z0-9]+$/i.test(p)) return fs.existsSync(path.join("public", p));
  const [, seg, slug, sub] = p.split("/");
  if (seg === "services" && slug) return services.some((s) => s.slug === slug) || appRoute(p);
  if (kinds[seg] && slug && !sub) return getContent(kinds[seg]).some((e) => e.slug === slug && (seg !== "systems" || e.body.trim().length > 0));
  return appRoute(p);
};
for (const g of guides) {
  for (const [, l] of g.body.matchAll(/\]\((\/[^)\s]*)\)/g)) if (!exists(l)) fail.push(`${g.slug}: link to ${l}, which doesn't exist`);
  const others = new Set([...g.body.matchAll(/\]\((\/sales-tax\/[^)#?\s]+)/g)].map((m) => m[1]).filter((l) => l !== `/sales-tax/${g.slug}`));
  if (others.size < 2) fail.push(`${g.slug}: links to ${others.size} other sales tax guide(s); link at least 2`);
}
for (const name of ["sales-tax-hub", ...guides.map((g) => g.slug)]) {
  const a = stArt(name);
  if (a && !a.alt) fail.push(`${a.src} has no alt text in sales-tax-images.ts`);
}

// The data: every state plus DC once; a threshold's numbers appear in its quoted rule.
assert.equal(NEXUS_STATES.length, 51);
assert.equal(new Set(NEXUS_STATES.map((s) => s.code)).size, 51);
for (const s of NEXUS_STATES) {
  if (s.sales !== null && !s.rule.includes(`$${s.sales.toLocaleString("en-US")}`)) fail.push(`nexus ${s.code}: rule doesn't state $${s.sales}`);
  if (s.orders && !s.rule.includes(String(s.orders))) fail.push(`nexus ${s.code}: rule doesn't state ${s.orders} transactions`);
  if (s.orders && !s.join) fail.push(`nexus ${s.code}: a transaction threshold needs "or" or "and"`);
}
// The checker's first view (NexusCheck.tsx) and the rules the guides describe.
assert.equal(nexusStatus("TX", 540000, 310).status, "over");
assert.equal(nexusStatus("OH", 85000, 180).status, "near");
assert.equal(nexusStatus("NY", 620000, 60).status, "under"); // $500,000 AND more than 100 sales
assert.equal(nexusStatus("NY", 620000, 120).status, "over");
assert.equal(nexusStatus("OH", 20000, 200).status, "over"); // 200 transactions alone
assert.equal(nexusStatus("CT", 150000, 170).status, "near"); // $100,000 AND 200 transactions
assert.equal(nexusStatus("OR", 9e6, 9999).status, "none");
assert.equal(nexusStatus("IL", 50000, 900).status, "under"); // transaction count dropped from 2026
const page = fs.readFileSync("content/sales-tax/economic-nexus-thresholds.md", "utf-8");
for (const s of ["$400,000", "$180,000", "$95,000"]) if (!page.includes(s)) fail.push(`economic-nexus-thresholds: the gross/retail/taxable example no longer says ${s}`);

if (fail.length) {
  console.error(`sales tax: ${fail.length} problem(s):\n${fail.join("\n")}`);
  process.exit(1);
}
console.log(`sales tax: ${guides.length} guides ok, ${NEXUS_STATES.length} states ok`);
