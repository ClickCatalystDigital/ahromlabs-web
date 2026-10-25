import type { Metadata } from "next";
import Markdown from "react-markdown";
import { AiAssistantPage } from "@/components/AiAssistantPage";
import { guideMarkdown, GuideQuotes } from "@/components/GuidePage";
import { markdownHeadings } from "@/lib/headings";
import { getContent } from "@/lib/content";
import { aiAssistantPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown slugs 404. /ai-assistant/questions, /number-check and /vendor-test are their own routes;
// build-content.mjs keeps a guide from taking those slugs.
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("ai-assistant").map((g) => ({ slug: g.slug }));
}

const get = (slug: string) => getContent("ai-assistant").find((g) => g.slug === slug)!;

export async function generateMetadata(props: PageProps<"/ai-assistant/[slug]">): Promise<Metadata> {
  const g = get((await props.params).slug);
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.title),
    description,
    alternates: { canonical: `/ai-assistant/${g.slug}` },
    openGraph: {
      type: "article",
      url: `https://ahromlabs.com/ai-assistant/${g.slug}`,
      siteName: "Ahrom Labs",
      title: g.title,
      description,
      publishedTime: g.published,
      modifiedTime: g.updated,
      authors: ["Pujan Motiwala"],
      // Its own image once it has one; until then the route's opengraph-image.tsx renders a card.
      ...(g.image && { images: [{ url: g.image.src, width: g.image.width, height: g.image.height, alt: g.image.alt }] }),
    },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function AiGuidePage(props: PageProps<"/ai-assistant/[slug]">) {
  const g = get((await props.params).slug);
  const path = `/ai-assistant/${g.slug}`;
  const trail = [
    { name: "AI assistants", path: "/ai-assistant" },
    { name: g.title, path },
  ];

  return (
    <AiAssistantPage
      graph={aiAssistantPageGraph({ path, title: g.title, description: g.answer, published: g.published, updated: g.updated, trail, image: g.image })}
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
      {g.checks && g.checks.length > 0 && <GuideQuotes quotes={g.checks} label="Quoted from the official text" />}
    </AiAssistantPage>
  );
}
