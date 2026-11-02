import type { Metadata } from "next";
import ServiceOrFamilyPage, { generateMetadata as metadataFor } from "../../../services/[slug]/page";
import { ADAPTIVE } from "@/lib/markets";
import { services } from "@/lib/services";
import { seoTitle } from "@/lib/seo";

// North America's version of the service pages listed in ADAPTIVE.NA (src/lib/markets.ts), served at
// /services/<slug> by src/proxy.ts. Same page, US words, US prices before the closing call to action.
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
  if (!na) return meta;
  return { ...meta, title: seoTitle(na.name), description: na.description, openGraph: { ...meta.openGraph, title: na.name, description: na.description }, twitter: { ...meta.twitter, title: na.name, description: na.description } };
}

export default function Page(props: Props) {
  return <ServiceOrFamilyPage {...props} market="NA" />;
}
