import { getContent, type ContentEntry } from "./content";
import { services, type Service } from "./services";
import { engagements, type Engagement } from "./work";

// Industry nodes live in content/industries/*.md (prose is the point of them),
// but their client and service edges point into work.ts and services.ts, which
// the plain-Node content build can't import. This resolves them at prerender
// and throws on an unknown slug, so a typo fails the build instead of
// silently dropping a link.

export type IndustryEdges = {
  clients: Engagement[];
  services: Service[];
  notes: ContentEntry[];
  patterns: ContentEntry[];
};

function pick<T extends { slug: string }>(pool: T[], slugs: string[] | undefined, what: string, from: string): T[] {
  return (slugs ?? []).map((slug) => {
    const hit = pool.find((x) => x.slug === slug);
    if (!hit) throw new Error(`content/industries/${from}.md references unknown ${what} "${slug}"`);
    return hit;
  });
}

export function resolveIndustryEdges(industry: ContentEntry): IndustryEdges {
  return {
    clients: pick(engagements, industry.clients, "client", industry.slug),
    services: pick(services, industry.services, "service", industry.slug),
    notes: pick(getContent("note"), industry.notes, "note", industry.slug),
    patterns: pick(getContent("pattern"), industry.patterns, "pattern", industry.slug),
  };
}

// The industry a client belongs to — reverse of the industry's `clients` edge,
// so /work and the homepage can send a reader to the richer page.
export function industryForClient(clientSlug: string): ContentEntry | undefined {
  return getContent("industry").find((i) => i.clients?.includes(clientSlug));
}
