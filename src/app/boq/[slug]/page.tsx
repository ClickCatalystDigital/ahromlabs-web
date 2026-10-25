import type { Metadata } from "next";
import Markdown from "react-markdown";
import { BoqPage, BoqQuotes } from "@/components/BoqPage";
import { guideMarkdown, remarkGfm } from "@/components/GuidePage";
import { markdownHeadings } from "@/lib/headings";
import { getContent } from "@/lib/content";
import { boqPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown slugs 404. /boq/items, /boq/check and /boq/template are their own routes;
// build-content.mjs keeps a guide from taking those slugs.
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("boq").map((g) => ({ slug: g.slug }));
}

const get = (slug: string) => getContent("boq").find((g) => g.slug === slug)!;

export async function generateMetadata(props: PageProps<"/boq/[slug]">): Promise<Metadata> {
  const g = get((await props.params).slug);
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.title),
    description,
    alternates: { canonical: `/boq/${g.slug}` },
    openGraph: {
      type: "article",
      url: `https://ahromlabs.com/boq/${g.slug}`,
      siteName: "Ahrom Labs",
      title: g.title,
      description,
      publishedTime: g.published,
      modifiedTime: g.updated,
      authors: ["Pujan Motiwala"],
      // The guide's own image, or the BOQ hub's: a page's openGraph replaces the parent's, so without one it would share no image.
      images: g.image
        ? [{ url: g.image.src, width: g.image.width, height: g.image.height, alt: g.image.alt }]
        : [{ url: "/boq/interior-boq-measuring.webp", width: 1086, height: 362, alt: "A tape measure with its blade drawn out across a ruled sheet, a pencil beside it." }],
    },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function BoqGuidePage(props: PageProps<"/boq/[slug]">) {
  const g = get((await props.params).slug);
  const path = `/boq/${g.slug}`;
  const trail = [
    { name: "Interior BOQ", path: "/boq" },
    { name: g.title, path },
  ];

  return (
    <BoqPage
      graph={boqPageGraph({ path, title: g.title, description: g.answer, published: g.published, updated: g.updated, trail, image: g.image })}
      trail={trail}
      title={g.title}
      lead={g.answer}
      checked={g.checked!}
      updated={g.updated}
      sources={g.sources}
      headings={markdownHeadings(g.body)}
      art={g.image?.src}
    >
      <Markdown components={guideMarkdown} remarkPlugins={[remarkGfm]}>{g.body}</Markdown>
      {g.checks && g.checks.length > 0 && <BoqQuotes quotes={g.checks} />}
    </BoqPage>
  );
}
