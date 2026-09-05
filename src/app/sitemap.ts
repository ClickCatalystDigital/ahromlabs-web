import type { MetadataRoute } from "next";
import { getContent, termHasPage } from "@/lib/content";

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

export default function sitemap(): MetadataRoute.Sitemap {
  // Hand-written pages carry no lastModified at all. They have no date source,
  // and stamping build time made every deploy claim all six static pages had
  // changed — a signal crawlers learn to ignore. lastmod is optional; omitting
  // it is honest, inventing it is not.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/approach`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${siteUrl}/systems`,
      lastModified: newestUpdate("term"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/notes`,
      lastModified: newestUpdate("note"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/patterns`,
      lastModified: newestUpdate("pattern"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const contentRoutes: MetadataRoute.Sitemap = [
    ...getContent("note").map((note) => ({
      url: `${siteUrl}/notes/${note.slug}`,
      lastModified: new Date(note.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getContent("pattern").map((pattern) => ({
      url: `${siteUrl}/patterns/${pattern.slug}`,
      lastModified: new Date(pattern.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Empty until a term has body content — see termHasPage.
    ...getContent("term")
      .filter(termHasPage)
      .map((term) => ({
        url: `${siteUrl}/systems/${term.slug}`,
        lastModified: new Date(term.updated),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ];

  return [...staticRoutes, ...contentRoutes];
}
