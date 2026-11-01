import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";
import { metaDescription } from "@/lib/seo";

// North America's /services, served there by src/proxy.ts. Google indexes this version (it crawls from the US).
const description = metaDescription("Custom operations software for manufacturers and distributors: inventory and orders, CRM and estimates, purchasing, multi-company finance, analytics and AI assistants on one system.");

export const metadata: Metadata = {
  title: "Services: custom ERP, CRM, analytics and AI",
  description,
  alternates: { canonical: "/services" },
  openGraph: { type: "website", url: "https://ahromlabs.com/services", siteName: "Ahrom Labs", title: "Services | Ahrom Labs", description },
  twitter: { card: "summary_large_image", title: "Services | Ahrom Labs", description },
};

export default function Services() {
  return <ServicesPage market="NA" />;
}
