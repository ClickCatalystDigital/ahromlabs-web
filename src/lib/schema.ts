import type { ContentEntry } from "./content";
import { services, families, servicesIn, serviceUrl, familyUrl, proofHref, type Service } from "./services";
import { engagements } from "./work";
import { IBR_2026_URL } from "./ibr-forms";

export { IBR_2026_URL };

export const siteUrl = "https://ahromlabs.com";

const contactEmail = "mailto:pujan@ahromlabs.com";

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

// Built from the same arrays /services renders, so the catalog can't list a
// service the page doesn't show: the whole-system ERP at the top, then one
// nested catalog per family. Each Service's @id is its own page.
export const serviceId = (s: Pick<Service, "slug">) => `${siteUrl}${serviceUrl(s)}#service`;

const offer = (s: Service) => ({
  "@type": "Offer",
  itemOffered: {
    "@type": "Service",
    "@id": serviceId(s),
    name: s.name,
    alternateName: s.plainName,
    serviceType: s.name,
    category: families.find((f) => f.slug === s.family)?.name ?? "Custom ERP",
    description: s.answer,
    // The published evidence for this service; each resolves to that page's TechArticle.
    subjectOf: s.proof.map((p) => ({ "@id": `${siteUrl}${proofHref(p)}#article` })),
    url: `${siteUrl}${serviceUrl(s)}`,
    image: `${siteUrl}/what-we-build/${s.slug}.webp`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed,
  },
});

const offerCatalog = {
  "@type": "OfferCatalog",
  name: "Ahrom Labs services",
  url: `${siteUrl}/services`,
  itemListElement: [
    ...services.filter((s) => s.family === null).map(offer),
    ...families.map((f) => ({
      "@type": "OfferCatalog",
      name: f.name,
      url: `${siteUrl}${familyUrl(f)}`,
      itemListElement: servicesIn(f).map(offer),
    })),
  ],
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
      foundingDate: "2024-05",
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
        "Boiler and pressure-vessel manufacturing ERP",
        "Job costing and project profitability",
        "Material heat and lot traceability",
        "Field service and service contract management",
        "Operational intelligence",
        "Business analytics",
        "Anomaly detection",
        "Retrieval-augmented generation",
        "Knowledge graphs",
        "Business process modeling",
      ],
      sameAs: [
        "https://www.linkedin.com/company/ahromlabs",
        "https://github.com/Ahrom-Labs",
        // Google Business Profile (knowledge graph id from its share link, 24 Oct 2026).
        "https://www.google.com/search?kgmid=/g/11p285b1kh",
        "https://clutch.co/profile/ahrom-labs",
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Pujan Motiwala",
      jobTitle: "Founder and Principal",
      description:
        "Founder of Ahrom Labs. Nine years in data science and business process mapping (USAA, Arkose Labs, ABC Fitness, Liberty Mutual; associate faculty at Columbia University) before building operations and AI systems for Indian manufacturers.",
      worksFor: { "@id": `${siteUrl}/#organization` },
      knowsAbout: [
        "ERP systems",
        "TallyPrime integration",
        "Document extraction",
        "Manufacturing operations",
        "Business process modeling",
        "Data science",
        "Machine learning",
        "Predictive maintenance",
        "Anomaly and fraud detection",
        "Churn analysis",
      ],
      sameAs: [
        "https://www.linkedin.com/in/pujanmotiwala/",
        "https://github.com/PujanMotiwala",
        "https://clickcatalyst.digital/author/pujan-motiwala",
        "https://medium.com/@motiwalapujan",
      ],
      image: { "@type": "ImageObject", url: `${siteUrl}/people/pujan-motiwala.webp`, width: 1200, height: 900 },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Stevens Institute of Technology", sameAs: "https://en.wikipedia.org/wiki/Stevens_Institute_of_Technology" },
        { "@type": "CollegeOrUniversity", name: "Gujarat Technological University", sameAs: "https://en.wikipedia.org/wiki/Gujarat_Technological_University" },
      ],
      url: `${siteUrl}/about/pujan-motiwala`,
      email: contactEmail,
      address: postalAddress,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Ahrom Labs",
      url: siteUrl,
      description:
        "Industrial systems engineering for Indian manufacturers and trading groups: mapping how the business actually runs, then building its operations and accounting systems on top of that model.",
      serviceType: "Custom ERP and industrial systems engineering",
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
  const about = services.filter((s) => s.proof.some(cites)).map((s) => ({ "@id": serviceId(s) }));
  // An unnamed client is not an Organization a search engine can resolve.
  const mentions = engagements
    .filter((e) => e.proof.some(cites) && !e.anonymous)
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
  edges: { services: { slug: string }[]; clients: { slug: string; client: string; anonymous?: boolean }[]; notes: ContentEntry[] },
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
    ...(entry.image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${entry.image.src}`, caption: entry.image.alt } }
      : {}),
    about: edges.services.map((s) => ({ "@id": serviceId(s) })),
    ...(entry.demo
      ? {
          // The hands-on demo of the system this page describes.
          significantLink: entry.demo.url,
          mainEntity: {
            "@type": "SoftwareApplication",
            name: "Boiler ERP (live demo)",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: entry.demo.url,
            description: entry.description ?? entry.answer,
            creator: { "@id": `${siteUrl}/#organization` },
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "Free live demo with sample data" },
          },
        }
      : {}),
    mentions: edges.clients.filter((c) => !c.anonymous).map((c) => ({
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

// The regulation every /ibr page restates. Declared once, referenced by @id, so
// engines can tell these pages are based on — not a substitute for — the
// official Gazette text.
const ibrLegislation = {
  "@type": "Legislation",
  "@id": `${siteUrl}/ibr#ibr-2026`,
  name: "Indian Boiler Regulations, 2026",
  legislationIdentifier: "Gazette of India, Extraordinary, Part III—Section 4, No. 596",
  legislationDate: "2026-08-07",
  datePublished: "2026-10-01",
  legislationLegalForce: "https://schema.org/InForce",
  legislationJurisdiction: "IN",
  legislationPassedBy: { "@type": "GovernmentOrganization", name: "Central Boilers Board" },
  url: IBR_2026_URL,
};

// One TechArticle per /ibr page, based on the Legislation above, with a
// breadcrumb trail (Home › IBR › …) so the pages read as one body of work.
export function ibrPageGraph(page: {
  path: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  trail: { name: string; path: string }[];
  image?: { src: string; alt: string };
}) {
  const url = `${siteUrl}${page.path}`;
  const crumbs = [{ name: "Home", path: "" }, ...page.trail];
  return {
    "@context": "https://schema.org",
    "@graph": [
      ibrLegislation,
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        url,
        headline: page.title,
        description: page.description,
        datePublished: page.published,
        dateModified: page.updated,
        isBasedOn: { "@id": ibrLegislation["@id"] },
        author: { "@id": `${siteUrl}/#founder` },
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntityOfPage: url,
        inLanguage: "en-IN",
        ...(page.image && {
          image: { "@type": "ImageObject", url: `${siteUrl}${page.image.src}`, caption: page.image.alt },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${siteUrl}${c.path}`,
        })),
      },
    ],
  };
}

// A family or service page is a WebPage about the Services on it. The Service
// nodes themselves live in orgGraph's offer catalog, on every page.
export function servicePageGraph(
  path: string,
  name: string,
  description: string,
  about: Service[],
  crumbs: { name: string; path: string }[],
  image?: { src: string; caption: string },
) {
  const url = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${siteUrl}${c.path}` })),
    },
    "@id": `${url}#page`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${image.src}`, caption: image.caption } }
      : {}),
    about: about.map((s) => ({ "@id": serviceId(s) })),
    ...(about.length === 1 ? { mainEntity: { "@id": serviceId(about[0]) } } : {}),
  };
}

// The buyer questions on a service page, as an FAQPage: the same text the page
// shows, so an agent quoting it quotes the page.
export function serviceFaqGraph(service: Service) {
  const url = `${siteUrl}${serviceUrl(service)}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    about: { "@id": serviceId(service) },
    mainEntity: service.questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// The BOQ item library as a Dataset: one @id every /boq page points at, with
// the CSV and Excel template as its downloads. Agents and Google Dataset
// Search read it as data rather than prose.
export const boqDataset = {
  "@type": "Dataset",
  "@id": `${siteUrl}/boq/items#dataset`,
  name: "Interior BOQ item library (India)",
  description:
    "Interior fit-out work items with the unit each is priced in, how it is measured, the Indian Standards that apply, what a line must specify, and what quotes commonly leave out. No rates.",
  url: `${siteUrl}/boq/items`,
  keywords: ["bill of quantities", "BOQ", "interior fit-out", "IS 1200", "IS 303", "modular kitchen", "wardrobe", "false ceiling"],
  creator: { "@id": `${siteUrl}/#organization` },
  license: "https://creativecommons.org/licenses/by/4.0/",
  isAccessibleForFree: true,
  inLanguage: "en-IN",
  spatialCoverage: { "@type": "Place", name: "India" }, // Google's Dataset rules want a Place here, not a Country
  distribution: [
    { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${siteUrl}/boq/interior-boq-template.csv` },
    {
      "@type": "DataDownload",
      encodingFormat: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      contentUrl: `${siteUrl}/boq/interior-boq-template.xlsx`,
    },
  ],
};

// One TechArticle per /boq page with its breadcrumb, linked to the Dataset;
// the checker page adds a WebApplication.
export function boqPageGraph(page: {
  path: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  trail: { name: string; path: string }[];
  image?: { src: string; alt: string };
  app?: boolean;
}) {
  const url = `${siteUrl}${page.path}`;
  const crumbs = [{ name: "Home", path: "" }, ...page.trail];
  return {
    "@context": "https://schema.org",
    "@graph": [
      boqDataset,
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        url,
        headline: page.title,
        description: page.description,
        datePublished: page.published,
        dateModified: page.updated,
        isBasedOn: { "@id": boqDataset["@id"] },
        author: { "@id": `${siteUrl}/#founder` },
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntityOfPage: url,
        inLanguage: "en-IN",
        ...(page.image && {
          image: { "@type": "ImageObject", url: `${siteUrl}${page.image.src}`, caption: page.image.alt },
        }),
      },
      ...(page.app
        ? [
            {
              "@type": "WebApplication",
              "@id": `${url}#app`,
              name: "Interior BOQ checker",
              url,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any (runs in the browser)",
              isAccessibleForFree: true,
              offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
              description: page.description,
              provider: { "@id": `${siteUrl}/#organization` },
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${siteUrl}${c.path}`,
        })),
      },
    ],
  };
}
