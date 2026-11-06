// Checks the ASME hub (src/lib/asme.ts, content/asme/): every guide is in a hub group, every internal link in a
// guide points at a page that exists, each guide links to at least two other ASME guides, and the calculators
// give the textbook answers. Runs inside `npm run content:build`.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ASME_GROUPS, asmeGuides, continuityLapse, shellMawp, shellThickness, testPressure } from "../src/lib/asme";
import { getContent } from "../src/lib/content";
import { asmeArt } from "../src/lib/asme-images";
import { MATERIALS } from "../src/lib/asme-items";
import { services } from "../src/lib/services";

const fail: string[] = [];
const guides = asmeGuides();
const slugs = new Set(guides.map((g) => g.slug));

for (const group of ASME_GROUPS) for (const s of group.order) if (!slugs.has(s)) fail.push(`asme.ts lists "${s}" in ${group.slug}, but content/asme/${s}.md doesn't exist`);
for (const g of guides) if (!ASME_GROUPS.find((x) => x.slug === g.group)?.order.includes(g.slug)) fail.push(`${g.slug}: not in its group's order in asme.ts`);

// Pages a guide may link to: other guides, the hub's own routes, and the rest of the site's content and routes.
const appRoute = (p: string) => fs.existsSync(path.join("src/app", p, "page.tsx"));
const exists = (href: string) => {
  const [p] = href.split(/[#?]/);
  if (/\.[a-z0-9]+$/i.test(p)) return fs.existsSync(path.join("public", p)); // a download, e.g. the continuity log
  const [, seg, slug, sub] = p.split("/");
  if (seg === "asme") return !slug || slug === "questions" || slug === "items" || slugs.has(slug);
  if (seg === "services" && slug) return services.some((s) => s.slug === slug) || appRoute(p);
  const kinds: Record<string, Parameters<typeof getContent>[0]> = { notes: "note", patterns: "pattern", ibr: "guide", industries: "industry", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant", systems: "term", manufacturing: "manufacturing", "sales-tax": "sales-tax", construction: "construction" };
  if (kinds[seg] && slug && !sub) return getContent(kinds[seg]).some((e) => e.slug === slug) || appRoute(p);
  return appRoute(p) || (seg === "ibr" && slug === "forms");
};
for (const g of guides) {
  const urls = (g.sources ?? []).map((x) => x.url);
  if (new Set(urls).size !== urls.length) fail.push(`${g.slug}: the same source URL is listed twice; merge them`);
  const links = [...g.body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);
  for (const l of links) if (!exists(l)) fail.push(`${g.slug}: link to ${l}, which doesn't exist`);
  const others = new Set(links.filter((l) => l.startsWith("/asme/")).map((l) => l.split(/[#?]/)[0]).filter((l) => l !== `/asme/${g.slug}`));
  if (others.size < 2) fail.push(`${g.slug}: links to ${others.size} other ASME guide(s); link at least 2`);
}

// Page art: a delivered image must have alt text (src/lib/asme-images.ts).
for (const name of ["asme-hub", "questions", ...guides.map((g) => g.slug)]) {
  const a = asmeArt(name);
  if (a && !a.alt) fail.push(`public/asme/${name}.webp has no alt text in asme-images.ts`);
}

// The materials list (/asme/items): every "named in IBR 2026" claim against regulation 30's table in the Gazette.
const GAZETTE = path.join(process.env.IBR_SOURCES ?? "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/IBR 2026/sources", "IBR 2026 - Gazette No 596 2026-10-01.txt");
if (fs.existsSync(GAZETTE)) {
  const all = fs.readFileSync(GAZETTE, "utf-8").split("\n");
  const from = all.findIndex((l) => l.includes("30.Plates, Pipes, Tubes"));
  const to = all.findIndex((l, i) => i > from && l.includes("In addition to the above, materials conforming to IS"));
  const table = all.slice(from, to).map((l) => l.replace(/\s+/g, " "));
  if (from < 0 || to < 0) fail.push("regulation 30 table not found in the Gazette text");
  for (const m of MATERIALS) {
    const num = `SA ${m.spec.match(/^SA-(\d+)/)![1]}`;
    const lines = table.filter((l) => new RegExp(`${num}(?!\\d)`).test(l));
    if (m.ibr) {
      if (!lines.some((l) => !m.ibr!.grade || l.includes(m.ibr!.grade))) fail.push(`${m.spec}: marked as named in IBR 2026's table, but "${num} ${m.ibr.grade ?? ""}" isn't there`);
    } else {
      const grade = m.spec.replace(/^SA-\d+\s*(Grade\s*)?/, "").split(/[\s/]/)[0];
      if (lines.some((l) => !grade || l.includes(grade))) fail.push(`${m.spec}: marked as not named in IBR 2026's table, but it is`);
    }
  }
} else console.warn("asme: IBR Gazette text not found; materials list IBR column not checked (set IBR_SOURCES)");

// Calculators against hand-worked answers.
const close = (a: number, b: number) => Math.abs(a - b) < 1e-3;
assert.ok(close(testPressure("viii-1-hydro", 150, 20000, 20000).pressure, 195));
assert.ok(close(testPressure("viii-1-hydro", 100, 20000, 16000).pressure, 162.5));
assert.ok(close(testPressure("viii-1-pneumatic", 100, 20000, 20000).pressure, 110));
assert.ok(close(testPressure("i-hydro", 200).pressure, 300));
// 150 psi, R 24 in + 0.125 CA, S 20,000, E 0.85: t = 150 × 24.125 / (17,000 − 90) = 0.21400.
const shell = shellThickness({ P: 150, R: 24, S: 20000, E: 0.85, CA: 0.125, shape: "cylinder" });
assert.ok(close(shell.circumferential, 0.214), `circumferential ${shell.circumferential}`);
assert.equal(shell.governs, "circumferential");
assert.ok(close(shell.required, 0.339));
assert.ok(close(shellMawp({ t: 0.339, R: 24, S: 20000, E: 0.85, CA: 0.125 }), 150.0) || Math.abs(shellMawp({ t: 0.339, R: 24, S: 20000, E: 0.85, CA: 0.125 }) - 150) < 0.2);
// The shell-thickness and mawp guides' worked numbers: ⅜ in plate → 17,000 × 0.25 / 24.275 = 175.08 psi.
assert.ok(Math.abs(shellMawp({ t: 0.375, R: 24, S: 20000, E: 0.85, CA: 0.125 }) - 175.08) < 0.01);
// Cat A full RT (E 1.0), Cat B spot (0.85): hoop 3,618.75 / 19,910 = 0.18176; longitudinal 3,618.75 / 34,060 = 0.10625.
const twoE = shellThickness({ P: 150, R: 24, S: 20000, E: 1, Ec: 0.85, CA: 0.125, shape: "cylinder" });
assert.ok(close(twoE.circumferential, 0.18176) && close(twoE.longitudinal, 0.10625) && close(twoE.required, 0.30676));
// A weak circumferential joint makes the longitudinal check govern the MAWP: 2 × 20,000 × 0.3 × 0.25 / (24.125 − 0.1) = 124.86 psi.
assert.ok(Math.abs(shellMawp({ t: 0.375, R: 24, S: 20000, E: 1, Ec: 0.3, CA: 0.125 }) - 124.86) < 0.01);
// Sphere thin-shell limits (P ≤ 0.665SE, t ≤ 0.356R): 13,000 psi is within, 14,000 psi is not.
assert.equal(shellThickness({ P: 13000, R: 24, S: 20000, E: 1, CA: 0, shape: "sphere" }).inRange, true);
assert.equal(shellThickness({ P: 14000, R: 24, S: 20000, E: 1, CA: 0, shape: "sphere" }).inRange, false);
assert.equal(continuityLapse("2026-05-02"), "2026-11-02");
assert.equal(continuityLapse("2026-08-31"), "2027-02-28");

if (fail.length) {
  console.error(`asme: ${fail.length} problem(s):\n${fail.join("\n")}`);
  process.exit(1);
}
console.log(`asme: ${guides.length} guides ok, calculators ok`);
