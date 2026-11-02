import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";
import { metaDescription } from "@/lib/seo";
import { languages } from "@/lib/markets";

const description = metaDescription("Custom ERP and CRM, TallyPrime integration, multi-company finance, AI document extraction and document search for Indian manufacturers and traders.");

export const metadata: Metadata = {
  title: "Services: custom ERP, CRM, analytics and AI",
  description,
  alternates: { canonical: "/services", languages: languages("/services") },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/services",
    siteName: "Ahrom Labs",
    title: "Services | Ahrom Labs",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Ahrom Labs",
    description,
  },
};

// India's /services. North America's is src/app/na/services/page.tsx, served here by src/proxy.ts.
export default function Services() {
  return <ServicesPage market="IN" />;
}
