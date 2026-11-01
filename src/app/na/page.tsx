import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { metaDescription } from "@/lib/seo";

// North America's home page, served at / by src/proxy.ts (this path itself redirects there). Google crawls
// from the US, so this is the version it indexes for /: title and description stay market-neutral.
export const metadata: Metadata = {
  title: { absolute: "Ahrom Labs: custom operations software for manufacturers and distributors" },
  description: metaDescription("Custom operations software for manufacturers and distributors: inventory, orders, purchasing and the books on one system, built around how the business already works. Fixed-price builds."),
  alternates: { canonical: "/", types: { "application/json": "/knowledge.json" } },
};

export default function Home() {
  return <HomePage market="NA" />;
}
