import type { ContentEntry } from "./content";

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
export function articleGraph(entry: ContentEntry, path: string) {
  const url = `${siteUrl}${path}`;
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
