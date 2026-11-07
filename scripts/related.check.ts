// Every related path resolves to a real page, and every glossary page and industry has its related list.
import { RELATED, relatedLinks } from "../src/lib/related";
import { getContent, termHasPage } from "../src/lib/content";
import { services } from "../src/lib/services";

for (const [from, paths] of Object.entries(RELATED)) relatedLinks(paths, from);
for (const s of services) relatedLinks(s.guides, `services.ts ${s.slug}`);
const missing: string[] = [
  ...getContent("term").filter(termHasPage).map((t) => `/systems/${t.slug}`),
  ...getContent("industry").flatMap((i) => [`/industries/${i.slug}`, ...(i.na ? [`/us/industries/${i.slug}`] : [])]),
].filter((p) => !RELATED[p]?.length);
missing.push(...services.filter((s) => !s.guides?.length).map((s) => `/services/${s.slug}`));
if (missing.length) throw new Error(`related.check: no related links for ${missing.join(", ")}`);
console.log(`related.check: ${Object.keys(RELATED).length} pages and ${services.length} services resolve`);
