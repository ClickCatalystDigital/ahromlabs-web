import type { Metadata } from "next";
import Markdown from "react-markdown";
import { ErpPage, ErpQuotes } from "@/components/ErpPage";
import { guideMarkdown } from "@/components/GuidePage";
import { markdownHeadings } from "@/lib/headings";
import { getContent } from "@/lib/content";
import { erpPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown slugs 404. /erp/requirements, /erp/check and /erp/template are their own routes;
// build-content.mjs keeps a guide from taking those slugs.
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("erp").map((g) => ({ slug: g.slug }));
}

const get = (slug: string) => getContent("erp").find((g) => g.slug === slug)!;

export async function generateMetadata(props: PageProps<"/erp/[slug]">): Promise<Metadata> {
  const g = get((await props.params).slug);
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.title),
    description,
    alternates: { canonical: `/erp/${g.slug}` },
    openGraph: {
      type: "article",
      url: `https://ahromlabs.com/erp/${g.slug}`,
      siteName: "Ahrom Labs",
      title: g.title,
      description,
      publishedTime: g.published,
      modifiedTime: g.updated,
      authors: ["Pujan Motiwala"],
      // The guide's own image when it has one; otherwise the generated card from the route's opengraph-image.
      ...(g.image && { images: [{ url: g.image.src, width: g.image.width, height: g.image.height, alt: g.image.alt }] }),
    },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function ErpGuidePage(props: PageProps<"/erp/[slug]">) {
  const g = get((await props.params).slug);
  const path = `/erp/${g.slug}`;
  const trail = [
    { name: "ERP requirements", path: "/erp" },
    { name: g.title, path },
  ];

  return (
    <ErpPage
      graph={erpPageGraph({ path, title: g.title, description: g.answer, published: g.published, updated: g.updated, trail, image: g.image })}
      trail={trail}
      title={g.title}
      lead={g.answer}
      checked={g.checked!}
      updated={g.updated}
      sources={g.sources}
      headings={markdownHeadings(g.body)}
      art={g.image?.src}
    >
      <Markdown components={guideMarkdown}>{g.body}</Markdown>
      {g.checks && g.checks.length > 0 && <ErpQuotes quotes={g.checks} />}
    </ErpPage>
  );
}
