// Every related path resolves to a real page, and every glossary page and industry has its related list.
import { RELATED, relatedLinks } from "../src/lib/related";
import { getContent, termHasPage } from "../src/lib/content";
import { services } from "../src/lib/services";
import { ibrFormPages } from "../src/lib/ibr-forms";
import { existsSync } from "node:fs";

for (const [from, paths] of Object.entries(RELATED)) relatedLinks(paths, from);
for (const s of services) relatedLinks(s.guides, `services.ts ${s.slug}`);
const missing: string[] = [
  ...getContent("term").filter(termHasPage).map((t) => `/systems/${t.slug}`),
  ...getContent("industry").flatMap((i) => [`/industries/${i.slug}`, ...(i.na ? [`/us/industries/${i.slug}`] : [])]),
].filter((p) => !RELATED[p]?.length);
missing.push(...services.filter((s) => !s.guides?.length).map((s) => `/services/${s.slug}`));
if (missing.length) throw new Error(`related.check: no related links for ${missing.join(", ")}`);
// Every guide is linked from at least two other content pages (in the text or under Related), besides its hub page:
// a page only its hub links to is the last one Google crawls.
const BASE: Record<string, string> = { guide: "/ibr", industry: "/industries", "sales-tax": "/sales-tax", "ai-assistant": "/ai-assistant" };
const GUIDE_KINDS = ["asme", "boq", "construction", "erp", "guide", "interiors", "manufacturing", "sales-tax", "ai-assistant"] as const;
const all = (["term", "note", "pattern", "industry", ...GUIDE_KINDS] as const).flatMap((k) => getContent(k).map((e) => ({ ...e, path: `${BASE[k] ?? `/${k}`}/${e.slug}` })));
const inbound = new Map<string, Set<string>>();
for (const e of all) {
  const links = [...e.body.matchAll(/\]\((\/[^)\s#]*)/g)].map((m) => m[1]), rel = (e as { related?: string[] }).related ?? [];
  for (const to of [...links, ...rel]) if (to !== e.path) inbound.set(to, (inbound.get(to) ?? new Set()).add(e.path));
}
const weak = all.filter((e) => (GUIDE_KINDS as readonly string[]).includes(e.kind) && (inbound.get(e.path)?.size ?? 0) < 2).map((e) => e.path);
if (weak.length) throw new Error(`related.check: fewer than two other pages link to ${weak.join(", ")}; add it to their text or their "related" list`);
// Every IBR form page offers its PDF (scripts/build-ibr-form-pdfs.py).
const noPdf = ibrFormPages().filter((f) => !existsSync(`public/ibr/pdf/ibr-2026-${f.slug}.pdf`)).map((f) => f.slug);
if (noPdf.length) throw new Error(`related.check: no PDF in public/ibr/pdf for ${noPdf.join(", ")}; run scripts/build-ibr-form-pdfs.py`);
console.log(`related.check: ${Object.keys(RELATED).length} pages and ${services.length} services resolve`);
