import type { MetadataRoute } from "next";
import { getContent, termHasPage } from "@/lib/content";
import pageDates from "@/lib/page-dates.generated.json";
import { ibrFormPages, IBR_FORMS_CHECKED } from "@/lib/ibr-forms";
import { trades, BOQ_CHECKED } from "@/lib/boq";
import { ERP_CHECKED } from "@/lib/erp";
import { AI_CHECKED } from "@/lib/ai-assistant";
import { families, services } from "@/lib/services";

const siteUrl = "https://ahromlabs.com";

// Newest `updated` across a content kind — the real last-changed date for the
// index page that lists it.
function newestUpdate(kind: Parameters<typeof getContent>[0]): Date {
  return new Date(
    getContent(kind)
      .map((entry) => entry.updated)
      .sort()
      .at(-1)!,
  );
}

function pageDate(route: string): Date | undefined {
  const date = (pageDates as Record<string, string>)[route];
  return date ? new Date(date) : undefined;
}

// The later of a page's `updated` day and the exact time its sources were last
// committed (scripts/build-content.mjs): same-day edits must still move lastmod.
function changed(route: string, updated: string): Date {
  const committed = pageDate(route);
  const day = new Date(updated);
  return committed && committed > day ? committed : day;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Hand-written pages take lastmod from the last commit touching their source
  // (scripts/build-content.mjs), not build time — a deploy that leaves a page
  // alone leaves its date alone. AI Search re-reads only pages whose lastmod
  // moved, so without it edited wording never reached the chatbot.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: pageDate(""), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified: pageDate("services"), changeFrequency: "monthly", priority: 0.9 },
    ...[...families, ...services].map((x) => ({
      url: `${siteUrl}/services/${x.slug}`,
      lastModified: pageDate("services"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/industries`,
      lastModified: changed("industries", newestUpdate("industry").toISOString()),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${siteUrl}/work`, lastModified: pageDate("work"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/engagement`, lastModified: pageDate("engagement"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, lastModified: pageDate("privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/approach`, lastModified: pageDate("approach"), changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${siteUrl}/about`,
      lastModified: pageDate("about"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: ["about-improvised-wiring", "about-structured-wiring", "about-theodolite-survey"].map(
        (name) => `${siteUrl}/what-we-build/${name}.webp`,
      ),
    },
    { url: `${siteUrl}/about/pujan-motiwala`, lastModified: pageDate("about/pujan-motiwala"), changeFrequency: "yearly", priority: 0.5, images: [`${siteUrl}/people/pujan-motiwala.webp`] },
    {
      url: `${siteUrl}/systems`,
      lastModified: changed("systems", newestUpdate("term").toISOString()),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/notes`,
      lastModified: changed("notes", newestUpdate("note").toISOString()),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/patterns`,
      lastModified: changed("patterns", newestUpdate("pattern").toISOString()),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const contentRoutes: MetadataRoute.Sitemap = [
    ...getContent("industry").map((industry) => ({
      url: `${siteUrl}/industries/${industry.slug}`,
      lastModified: changed(`industries/${industry.slug}`, industry.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getContent("note").map((note) => ({
      url: `${siteUrl}/notes/${note.slug}`,
      lastModified: changed(`notes/${note.slug}`, note.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getContent("pattern").map((pattern) => ({
      url: `${siteUrl}/patterns/${pattern.slug}`,
      lastModified: changed(`patterns/${pattern.slug}`, pattern.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Empty until a term has body content — see termHasPage.
    ...getContent("term")
      .filter(termHasPage)
      .map((term) => ({
        url: `${siteUrl}/systems/${term.slug}`,
        lastModified: changed(`systems/${term.slug}`, term.updated),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ];

  // IBR pages: guides date from their `updated`, form pages from when the
  // forms data was last checked against the Gazette — or later, when their
  // sources were committed after that.
  const guides = getContent("guide");
  const ibrUpdated = new Date([IBR_FORMS_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!);
  const ibrRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/ibr`, lastModified: changed("ibr", ibrUpdated.toISOString()), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/ibr/forms`, lastModified: changed("ibr/forms", IBR_FORMS_CHECKED), changeFrequency: "monthly", priority: 0.8 },
    ...guides.map((g) => ({
      url: `${siteUrl}/ibr/${g.slug}`,
      lastModified: changed(`ibr/${g.slug}`, g.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ibrFormPages().map((f) => ({
      url: `${siteUrl}/ibr/forms/${f.slug}`,
      lastModified: changed("ibr/forms/*", IBR_FORMS_CHECKED),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // BOQ pages: guides from their `updated`, the library and checker from when
  // the item data was last checked, or later when their sources were committed.
  const boqGuides = getContent("boq");
  const boqUpdated = [BOQ_CHECKED, ...boqGuides.map((g) => g.updated)].sort().at(-1)!;
  const boqRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/boq`, lastModified: changed("boq", boqUpdated), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/boq/interior-boq-measuring.webp`] },
    { url: `${siteUrl}/boq/check`, lastModified: changed("boq/check", BOQ_CHECKED), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/boq/interior-boq-checker.webp`] },
    { url: `${siteUrl}/boq/items`, lastModified: changed("boq/items", BOQ_CHECKED), changeFrequency: "monthly", priority: 0.7, images: [`${siteUrl}/boq/wardrobe-front-elevation-measured.webp`] },
    { url: `${siteUrl}/boq/template`, lastModified: changed("boq/template", BOQ_CHECKED), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/boq/interior-boq-template-clipboard.webp`] },
    ...boqGuides.map((g) => ({
      url: `${siteUrl}/boq/${g.slug}`,
      lastModified: changed(`boq/${g.slug}`, g.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(g.image && { images: [`${siteUrl}${g.image.src}`] }),
    })),
    ...trades.map((t) => ({
      url: `${siteUrl}/boq/items/${t.slug}`,
      lastModified: changed("boq/items/*", BOQ_CHECKED),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // ERP requirements pages: guides from their `updated`, the tools from when the library was checked.
  const erpGuides = getContent("erp");
  const erpUpdated = [ERP_CHECKED, ...erpGuides.map((g) => g.updated)].sort().at(-1)!;
  const erpRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/erp`, lastModified: changed("erp", erpUpdated), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/erp/erp-requirements-binder.webp`] },
    { url: `${siteUrl}/erp/requirements`, lastModified: changed("erp/requirements", ERP_CHECKED), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/erp/erp-requirements-checklist.webp`] },
    { url: `${siteUrl}/erp/check`, lastModified: changed("erp/check", ERP_CHECKED), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/erp/erp-requirements-builder.webp`] },
    { url: `${siteUrl}/erp/template`, lastModified: changed("erp/template", ERP_CHECKED), changeFrequency: "monthly", priority: 0.7, images: [`${siteUrl}/erp/erp-requirements-template.webp`] },
    ...erpGuides.map((g) => ({
      url: `${siteUrl}/erp/${g.slug}`,
      lastModified: changed(`erp/${g.slug}`, g.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(g.image && { images: [`${siteUrl}${g.image.src}`] }),
    })),
  ];

  // AI assistant pages: the same shape as the ERP ones.
  const aiGuides = getContent("ai-assistant");
  const aiUpdated = [AI_CHECKED, ...aiGuides.map((g) => g.updated)].sort().at(-1)!;
  const aiRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/ai-assistant`, lastModified: changed("ai-assistant", aiUpdated), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/ai/ai-assistants-hub.webp`] },
    { url: `${siteUrl}/ai-assistant/number-check`, lastModified: changed("ai-assistant/number-check", AI_CHECKED), changeFrequency: "monthly", priority: 0.8, images: [`${siteUrl}/ai/ai-number-check.webp`] },
    { url: `${siteUrl}/ai-assistant/questions`, lastModified: changed("ai-assistant/questions", AI_CHECKED), changeFrequency: "monthly", priority: 0.7, images: [`${siteUrl}/ai/ai-question-library.webp`] },
    { url: `${siteUrl}/ai-assistant/vendor-test`, lastModified: changed("ai-assistant/vendor-test", AI_CHECKED), changeFrequency: "monthly", priority: 0.7, images: [`${siteUrl}/ai/ai-vendor-test.webp`] },
    ...aiGuides.map((g) => ({
      url: `${siteUrl}/ai-assistant/${g.slug}`,
      lastModified: changed(`ai-assistant/${g.slug}`, g.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(g.image && { images: [`${siteUrl}${g.image.src}`] }),
    })),
  ];

  return [...staticRoutes, ...contentRoutes, ...ibrRoutes, ...boqRoutes, ...erpRoutes, ...aiRoutes];
}
