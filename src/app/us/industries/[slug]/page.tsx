import type { Metadata } from "next";
import IndustryPage, { generateMetadata as metadataFor } from "../../../industries/[slug]/page";
import { ADAPTIVE, languages } from "@/lib/markets";
import { getContent } from "@/lib/content";
import { seoTitle, metaDescription } from "@/lib/seo";

// North America's version of the industry pages listed in ADAPTIVE.NA (src/lib/markets.ts), at /us/industries/<slug>,
// also served at /industries/<slug> to North American visitors (src/proxy.ts). Text from content/industries/us/<slug>.md.
export const dynamicParams = false;

export function generateStaticParams() {
  return (ADAPTIVE.NA ?? []).filter((p) => p.startsWith("/industries/")).map((p) => ({ slug: p.slice("/industries/".length) }));
}

type Props = PageProps<"/industries/[slug]">;
export async function generateMetadata(props: Props): Promise<Metadata> {
  const meta = await metadataFor(props);
  const { slug } = await props.params;
  const na = getContent("industry").find((i) => i.slug === slug)!.na!;
  const description = metaDescription(na.description ?? na.answer);
  const url = `https://ahromlabs.com/us/industries/${slug}`;
  return {
    ...meta,
    title: seoTitle(na.metaTitle ?? na.title),
    description,
    alternates: { canonical: `/us/industries/${slug}`, languages: languages(`/industries/${slug}`) },
    openGraph: { ...meta.openGraph, url, title: na.title, description },
    twitter: { ...meta.twitter, title: na.title, description },
  };
}

export default function Page(props: Props) {
  return <IndustryPage {...props} market="NA" />;
}
