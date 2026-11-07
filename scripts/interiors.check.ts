// Checks the interiors hub (src/lib/interiors.ts, content/interiors/): every guide is in a hub group, every internal
// link resolves, each guide links at least two other interiors guides, page art has alt text, and no guide claims a
// demo feature the demo lacks (docs/batch-plans/us-interiors.md lists them). Runs inside `npm run content:build`.
import fs from "node:fs";
import path from "node:path";
import { INT_GROUPS, intGuides } from "../src/lib/interiors";
import { getContent } from "../src/lib/content";
import { intArt } from "../src/lib/interiors-images";
import { services } from "../src/lib/services";

const fail: string[] = [];
const guides = intGuides();
const slugs = new Set(guides.map((g) => g.slug));

for (const group of INT_GROUPS) for (const s of group.order) if (!slugs.has(s)) fail.push(`interiors.ts lists "${s}" in ${group.slug}, but content/interiors/${s}.md doesn't exist`);
for (const g of guides) if (!INT_GROUPS.find((x) => x.slug === g.group)?.order.includes(g.slug)) fail.push(`${g.slug}: not in its group's order in interiors.ts`);

const appRoute = (p: string) => fs.existsSync(path.join("src/app", p, "page.tsx"));
const kinds: Record<string, Parameters<typeof getContent>[0]> = { notes: "note", patterns: "pattern", ibr: "guide", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant", asme: "asme", manufacturing: "manufacturing", "sales-tax": "sales-tax", construction: "construction", interiors: "interiors", systems: "term" };
const exists = (href: string) => {
  const [p] = href.split(/[#?]/);
  if (/\.[a-z0-9]+$/i.test(p)) return fs.existsSync(path.join("public", p));
  const parts = p.split("/");
  if (parts[1] === "us" && parts[2] === "industries") return getContent("industry").some((e) => e.slug === parts[3] && e.na);
  const [, seg, slug, sub] = parts;
  if (seg === "industries" && slug) return getContent("industry").some((e) => e.slug === slug);
  if (seg === "services" && slug) return services.some((s) => s.slug === slug) || appRoute(p);
  if (kinds[seg] && slug && !sub) return getContent(kinds[seg]).some((e) => e.slug === slug && (seg !== "systems" || e.body.trim().length > 0));
  return appRoute(p);
};
for (const g of guides) {
  for (const [, l] of g.body.matchAll(/\]\((\/[^)\s]*)\)/g)) if (!exists(l)) fail.push(`${g.slug}: link to ${l}, which doesn't exist`);
  const others = new Set([...g.body.matchAll(/\]\((\/interiors\/[^)#?\s]+)/g)].map((m) => m[1]).filter((l) => l !== `/interiors/${g.slug}`));
  if (others.size < 2) fail.push(`${g.slug}: links to ${others.size} other interiors guide(s); link at least 2`);
  // The demo has no markup field, vendor acknowledgements or deposits, receiving warehouse or per-room budget.
  for (const re of [/demo (has|shows|tracks|records) (a )?(markup|acknowledg|vendor deposit|receiving warehouse|room budget)/i]) if (re.test(g.body)) fail.push(`${g.slug}: claims a demo feature the demo lacks (${re})`);
}
for (const name of ["interiors-hub", ...guides.map((g) => g.slug)]) {
  const a = intArt(name);
  if (a && !a.alt) fail.push(`${a.src} has no alt text in interiors-images.ts`);
}

if (fail.length) {
  console.error(`interiors: ${fail.length} problem(s):\n${fail.join("\n")}`);
  process.exit(1);
}
console.log(`interiors: ${guides.length} guides ok`);
