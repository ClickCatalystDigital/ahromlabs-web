import type { MetadataRoute } from "next";

const siteUrl = "https://ahromlabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/approach`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/systems`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
