// Checks the construction hub (src/lib/construction.ts, content/construction/): every guide is in a group, every
// internal link resolves, each guide links at least two others in its own group, page art has alt text, each
// guide is listed only in its group's market (markets.ts), and no guide reproduces an AIA form.
// Runs inside `npm run content:build`.
import fs from "node:fs";
import path from "node:path";
import { CON_GROUPS, CON_IN, CON_US, conGuides } from "../src/lib/construction";
import { getContent } from "../src/lib/content";
import { conArt } from "../src/lib/construction-images";
import { marketsFor } from "../src/lib/markets";
import { services } from "../src/lib/services";

const fail: string[] = [];
const guides = conGuides();
const slugs = new Set(guides.map((g) => g.slug));
for (const group of CON_GROUPS) for (const s of group.order) if (!slugs.has(s)) fail.push(`construction.ts lists "${s}" in ${group.slug}, but content/construction/${s}.md doesn't exist`);
for (const g of guides) if (!CON_GROUPS.find((x) => x.slug === g.group)?.order.includes(g.slug)) fail.push(`${g.slug}: not in its group's order in construction.ts`);
for (const p of CON_US) if (marketsFor(p)?.join() !== "NA") fail.push(`${p}: add it to NA_ONLY in markets.ts`);
for (const p of CON_IN) if (marketsFor(p)?.join() !== "IN") fail.push(`${p}: add it to IN_ONLY in markets.ts`);

const appRoute = (p: string) => fs.existsSync(path.join("src/app", p, "page.tsx"));
const kinds: Record<string, Parameters<typeof getContent>[0]> = { notes: "note", patterns: "pattern", ibr: "guide", industries: "industry", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant", asme: "asme", manufacturing: "manufacturing", "sales-tax": "sales-tax", construction: "construction", systems: "term" };
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
  const own = new Set(CON_GROUPS.find((x) => x.slug === g.group)!.order);
  const others = new Set([...g.body.matchAll(/\]\(\/construction\/([^)#?\s]+)/g)].map((m) => m[1]).filter((s) => s !== g.slug && own.has(s)));
  if (others.size < 2) fail.push(`${g.slug}: links to ${others.size} other guide(s) in its group; link at least 2`);
  // AIA documents are paid: name them, never reproduce them.
  if (/\b(G702|G703|A201)\b[^\n]{0,20}"[^"]{80,}"/.test(g.body)) fail.push(`${g.slug}: looks like it quotes an AIA document`);
}
for (const name of ["construction-hub", ...guides.map((g) => g.slug)]) {
  const a = conArt(name);
  if (a && !a.alt) fail.push(`${a.src} has no alt text in construction-images.ts`);
}
if (fail.length) {
  console.error(`construction: ${fail.length} problem(s):\n${fail.join("\n")}`);
  process.exit(1);
}
console.log(`construction: ${guides.length} guides ok`);
