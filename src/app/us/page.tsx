import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { metaDescription } from "@/lib/seo";
import { languages } from "@/lib/markets";
import { jsonLd, webPageGraph } from "@/lib/schema";

// North America's home page at /us, also served at / to North American visitors (src/proxy.ts).
export const metadata: Metadata = {
  title: { absolute: "Ahrom Labs: custom software for US manufacturers" },
  description: metaDescription("Custom operations software for manufacturers and distributors: inventory, orders, purchasing and the books on one system, built around how the business already works. Fixed-price builds."),
  alternates: { canonical: "/us", languages: languages("/"), types: { "application/json": "/knowledge.json" } },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageGraph("/us", "Ahrom Labs: custom operations software for manufacturers and distributors", String(metadata.description), "us")) }} />
      <HomePage market="NA" />
    </>
  );
}
