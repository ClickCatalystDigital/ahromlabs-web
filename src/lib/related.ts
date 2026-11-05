import { getContent, termHasPage, type ContentKind } from "./content";
import { services, families, serviceUrl, familyUrl } from "./services";
import { engagements } from "./work";

// A guide's `related:` front matter (paths on this site, at least two outside its own section) resolved to titled
// links. Every path must be a page that exists: an unknown one throws, so a typo or a removed page fails the build
// instead of shipping a dead link.

const ROUTE: Partial<Record<ContentKind, string>> = {
  note: "notes", pattern: "patterns", industry: "industries", guide: "ibr", boq: "boq", erp: "erp",
  "ai-assistant": "ai-assistant", asme: "asme", manufacturing: "manufacturing", "sales-tax": "sales-tax", construction: "construction",
};
const HUBS: Record<string, string> = {
  "/asme": "ASME guides", "/manufacturing": "Production software for job shops", "/construction": "Construction billing guides",
  "/sales-tax": "US sales tax guide", "/erp": "ERP requirements guides", "/boq": "Interior BOQ guide", "/ibr": "IBR 2026 guide",
  "/ai-assistant": "AI assistant guides", "/services": "What we build", "/industries": "Industries", "/work": "Work",
  "/notes": "Engineering notes", "/patterns": "Patterns", "/systems": "Systems glossary", "/engagement": "Pricing and how an engagement works",
};

let titles: Map<string, string> | undefined;
function titleMap() {
  if (titles) return titles;
  titles = new Map(Object.entries(HUBS));
  for (const [kind, route] of Object.entries(ROUTE)) {
    for (const e of getContent(kind as ContentKind)) titles.set(`/${route}/${e.slug}`, e.metaTitle ?? e.title);
  }
  for (const t of getContent("term").filter(termHasPage)) titles.set(`/systems/${t.slug}`, t.title);
  for (const s of services) titles.set(serviceUrl(s), s.name);
  for (const f of families) titles.set(familyUrl(f), f.name);
  for (const e of engagements) titles.set(`/work#${e.slug}`, e.client);
  return titles;
}

export function relatedLinks(paths: string[] | undefined, from: string) {
  return (paths ?? []).map((href) => {
    const title = titleMap().get(href);
    if (!title) throw new Error(`${from}: related path "${href}" is not a page on this site`);
    return { href, title };
  });
}
