import type { ContentEntry } from "./content";
import { services } from "./services";
import { engagements } from "./work";

export const siteUrl = "https://ahromlabs.com";

const contactEmail = "mailto:hello@ahromlabs.com";

// City + region only, deliberately no streetAddress: enough to establish a real
// place for entity resolution without publishing a working address. Shared by
// Organization, ProfessionalService and Person so they can't drift apart.
const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: "Ahmedabad",
  addressRegion: "Gujarat",
  addressCountry: "IN",
} as const;

const areaServed = { "@type": "Country", name: "India" } as const;

// Built from the same array /services renders, so the catalog can't list a
// service the page doesn't show. Each Service's @id is its /services anchor.
const offerCatalog = {
  "@type": "OfferCatalog",
  name: "Ahrom Labs services",
  url: `${siteUrl}/services`,
  itemListElement: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      "@id": `${siteUrl}/services#${s.slug}`,
      name: s.name,
      description: s.answer,
      url: `${siteUrl}/services#${s.slug}`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed,
    },
  })),
};

export const orgGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Ahrom Labs",
      url: siteUrl,
      description:
        "Ahrom Labs builds custom operational infrastructure for businesses, modeling entities, relationships, workflows, and decisions as one coherent system.",
      founder: { "@id": `${siteUrl}/#founder` },
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo/a12.png`,
        width: 2722,
        height: 2722,
      },
      image: `${siteUrl}/logo/a12.png`,
      email: contactEmail,
      address: postalAddress,
      areaServed: areaServed,
      // The organization's topic vector — what an engine should associate the
      // name with. Every item is something /services or a note demonstrates.
      knowsAbout: [
        "Custom ERP development",
        "CRM development",
        "TallyPrime integration",
        "Tally XML voucher posting",
        "AI document extraction",
        "GST invoice processing",
        "Bill of entry processing",
        "Bank statement extraction",
        "Human-in-the-loop automation",
        "Role-based access control",
        "Multi-company accounting",
        "Inventory management systems",
        "Manufacturing operations software",
        "Operational intelligence",
        "Business analytics",
        "Anomaly detection",
        "Retrieval-augmented generation",
        "Knowledge graphs",
        "Business process modeling",
      ],
      sameAs: [
        "https://www.linkedin.com/company/ahromlabs",
        "https://github.com/ahromlabs",
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Pujan Motiwala",
      jobTitle: "Principal",
      worksFor: { "@id": `${siteUrl}/#organization` },
      knowsAbout: [
        "ERP systems",
        "TallyPrime integration",
        "document extraction",
        "manufacturing operations",
        "data engineering",
        "churn analysis",
      ],
      sameAs: [
        "https://www.linkedin.com/in/pujanmotiwala/",
        "https://github.com/PujanMotiwala",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Stevens Institute of Technology",
      },
      url: `${siteUrl}/about`,
      email: contactEmail,
      address: postalAddress,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Ahrom Labs",
      url: siteUrl,
      description:
        "Custom operational infrastructure engineering: modeling a business's entities, workflows, and decisions, then building the systems on top of that model.",
      serviceType: "Custom business systems and infrastructure engineering",
      provider: { "@id": `${siteUrl}/#organization` },
      hasOfferCatalog: offerCatalog,
      address: postalAddress,
      areaServed: areaServed,
      email: contactEmail,
      image: `${siteUrl}/logo/a12.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ahrom Labs",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

// Escapes `</` so a string in the data can't close the <script> tag it's
// embedded in. Every JSON-LD emitter on the site goes through here — hand-copying
// the regex to each new call site is how one of them eventually loses it.
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// author/publisher/isPartOf are @id references, not inline copies: orgGraph is on
// every page via the root layout, so they resolve there. That linkage is the whole
// reason the site-wide graph carries stable @ids.
//
// about/mentions are the graph edges: the services this entry is evidence for
// and the client businesses it was built for, both derived from the `proof`
// lists in services.ts/work.ts — the same edges the page's "Part of" links
// render, so the schema can't claim a relationship the page doesn't show.
// Service @ids resolve against the offer catalog in orgGraph on the same page.
export function articleGraph(entry: ContentEntry, path: string) {
  const url = `${siteUrl}${path}`;
  const cites = (p: { kind: string; slug: string }) => p.kind === entry.kind && p.slug === entry.slug;
  const about = services.filter((s) => s.proof.some(cites)).map((s) => ({ "@id": `${siteUrl}/services#${s.slug}` }));
  const mentions = engagements
    .filter((e) => e.proof.some(cites))
    .map((e) => ({
      "@type": "Organization",
      "@id": `${siteUrl}/work#${e.slug}`,
      name: e.client,
      url: `${siteUrl}/work#${e.slug}`,
    }));
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    url,
    headline: entry.title,
    description: entry.answer,
    datePublished: entry.published,
    dateModified: entry.updated,
    keywords: entry.domain?.join(", "),
    author: { "@id": `${siteUrl}/#founder` },
    publisher: { "@id": `${siteUrl}/#organization` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntityOfPage: url,
    ...(about.length > 0 ? { about } : {}),
    ...(mentions.length > 0 ? { mentions } : {}),
  };
}

// An industry page is a WebPage *about* the services it describes, for a named
// business audience, mentioning the clients it was built for. Service @ids
// resolve against the offer catalog in orgGraph on the same page; the notes
// are listed as `hasPart` so the page's evidence is machine-visible too.
export function industryGraph(
  entry: ContentEntry,
  edges: { services: { slug: string }[]; clients: { slug: string; client: string }[]; notes: ContentEntry[] },
) {
  const url = `${siteUrl}/industries/${entry.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: entry.title,
    description: entry.answer,
    datePublished: entry.published,
    dateModified: entry.updated,
    audience: { "@type": "BusinessAudience", audienceType: entry.audience },
    about: edges.services.map((s) => ({ "@id": `${siteUrl}/services#${s.slug}` })),
    mentions: edges.clients.map((c) => ({
      "@type": "Organization",
      "@id": `${siteUrl}/work#${c.slug}`,
      name: c.client,
      url: `${siteUrl}/work#${c.slug}`,
    })),
    hasPart: edges.notes.map((n) => ({
      "@type": "TechArticle",
      "@id": `${siteUrl}/notes/${n.slug}#article`,
      headline: n.title,
      url: `${siteUrl}/notes/${n.slug}`,
    })),
    author: { "@id": `${siteUrl}/#founder` },
    publisher: { "@id": `${siteUrl}/#organization` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };
}

// Takes the already-rendered term list rather than calling getContent("term")
// again. /systems drops any term whose domain doesn't match a known group, so
// re-querying here would let the schema claim terms the page never shows.
export function termSetGraph(
  terms: {
    term: string;
    definition: string;
    slug: string;
    published: string;
    updated: string;
    hasPage: boolean;
  }[],
) {
  const setId = `${siteUrl}/systems#glossary`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": setId,
    name: "Ahrom Labs systems vocabulary",
    url: `${siteUrl}/systems`,
    publisher: { "@id": `${siteUrl}/#organization` },
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      // @id stays the on-page anchor, which is stable and already published.
      // `url` points at the dedicated page only when one actually exists.
      "@id": `${siteUrl}/systems#${t.slug}`,
      name: t.term,
      description: t.definition,
      datePublished: t.published,
      dateModified: t.updated,
      ...(t.hasPage ? { url: `${siteUrl}/systems/${t.slug}` } : {}),
      inDefinedTermSet: { "@id": setId },
    })),
  };
}

// Standalone DefinedTerm for a term's own page, pointing back at the set on
// /systems rather than redefining it.
export function termGraph(entry: ContentEntry) {
  const url = `${siteUrl}/systems/${entry.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${url}#term`,
    url,
    name: entry.title,
    description: entry.answer,
    datePublished: entry.published,
    dateModified: entry.updated,
    inDefinedTermSet: { "@id": `${siteUrl}/systems#glossary` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}
