import type { Metadata } from "next";
import ServiceOrFamilyPage, { generateMetadata as metadataFor } from "../../../services/[slug]/page";
import { ADAPTIVE, languages } from "@/lib/markets";
import { services } from "@/lib/services";
import { seoTitle } from "@/lib/seo";

// North America's version of the service pages listed in ADAPTIVE.NA (src/lib/markets.ts), at /us/services/<slug>,
// also served at /services/<slug> to North American visitors (src/proxy.ts). Same page, US words, US prices before the closing call to action.
export const dynamicParams = false;

export function generateStaticParams() {
  return (ADAPTIVE.NA ?? []).filter((p) => p.startsWith("/services/")).map((p) => ({ slug: p.slice("/services/".length) }));
}

// Same params shape as /services/[slug], whose metadata (canonical included) this reuses.
type Props = PageProps<"/services/[slug]">;
export async function generateMetadata(props: Props): Promise<Metadata> {
  const meta = await metadataFor(props);
  const { slug } = await props.params;
  const na = services.find((s) => s.slug === slug)?.na;
  const own = { canonical: `/us/services/${slug}`, languages: languages(`/services/${slug}`) };
  if (!na) return { ...meta, alternates: own, openGraph: { ...meta.openGraph, url: `https://ahromlabs.com${own.canonical}` } };
  return { ...meta, alternates: own, title: seoTitle(na.name), description: na.description, openGraph: { ...meta.openGraph, url: `https://ahromlabs.com${own.canonical}`, title: na.name, description: na.description }, twitter: { ...meta.twitter, title: na.name, description: na.description } };
}

export default function Page(props: Props) {
  return <ServiceOrFamilyPage {...props} market="NA" />;
}
