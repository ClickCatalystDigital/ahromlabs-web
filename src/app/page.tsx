import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { metaDescription } from "@/lib/seo";

const description = metaDescription("Custom ERP for Indian manufacturers and trading groups: BOMs, shop floor, IBR, GST and TDS compliance and TallyPrime in one system. Built in Ahmedabad.");

export const metadata: Metadata = {
  // The homepage <title> is the single strongest signal of what this site is
  // about. "Ahrom Labs" alone told Google and every model nothing.
  title: { absolute: "Ahrom Labs: custom ERP for manufacturers and traders" },
  description,
  alternates: {
    canonical: "/",
    types: { "application/json": "/knowledge.json" },
  },
};

// India's home page. North America's is src/app/na/page.tsx, served at / by src/proxy.ts.
export default function Home() {
  return <HomePage market="IN" />;
}
