import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

const siteUrl = "https://ahromlabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/approach`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/systems`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/notes`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/patterns`, lastModified, changeFrequency: "monthly", priority: 0.7 },
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
  ];

  return [...staticRoutes, ...contentRoutes];
}
