import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";
import { metaDescription } from "@/lib/seo";
import { languages } from "@/lib/markets";

// North America's services page at /us/services, also served at /services to North American visitors (src/proxy.ts).
const description = metaDescription("Custom operations software for manufacturers and distributors: inventory and orders, CRM and estimates, purchasing, multi-company finance, analytics and AI assistants on one system.");

export const metadata: Metadata = {
  title: "Services: custom ERP, CRM, analytics and AI",
  description,
  alternates: { canonical: "/us/services", languages: languages("/services") },
  openGraph: { type: "website", url: "https://ahromlabs.com/us/services", siteName: "Ahrom Labs", title: "Services | Ahrom Labs", description },
  twitter: { card: "summary_large_image", title: "Services | Ahrom Labs", description },
};

export default function Services() {
  return <ServicesPage market="NA" />;
}
