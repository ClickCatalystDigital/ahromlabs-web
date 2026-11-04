import type { Metadata } from "next";
import Markdown from "react-markdown";
import { ConstructionPage, ConQuotes } from "@/components/ConstructionPage";
import { guideMarkdown, remarkGfm } from "@/components/GuidePage";
import { markdownHeadings } from "@/lib/headings";
import { conGuide, conGuides } from "@/lib/construction";
import { conArt } from "@/lib/construction-images";
import { mfgPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return conGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/construction/[slug]">): Promise<Metadata> {
  const g = conGuide((await props.params).slug)!;
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.title),
    description,
    alternates: { canonical: `/construction/${g.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/construction/${g.slug}`, siteName: "Ahrom Labs", title: g.title, description, publishedTime: g.published, modifiedTime: g.updated, authors: ["Pujan Motiwala"] },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function ConstructionGuidePage(props: PageProps<"/construction/[slug]">) {
  const g = conGuide((await props.params).slug)!;
  const path = `/construction/${g.slug}`;
  const trail = [{ name: "Construction", path: "/construction" }, { name: g.title, path }];
  const art = conArt(g.slug);
  return (
    <ConstructionPage
      group={g.group}
      graph={mfgPageGraph({ path, title: g.title, description: g.answer, question: g.question, published: g.published, updated: g.updated, trail, image: art })}
      trail={trail}
      title={g.title}
      lead={g.answer}
      checked={g.checked!}
      updated={g.updated}
      sources={g.sources}
      headings={markdownHeadings(g.body)}
      art={art?.src}
      artAlt={art?.alt}
    >
      <Markdown components={guideMarkdown} remarkPlugins={[remarkGfm]}>{g.body}</Markdown>
      {g.checks && g.checks.length > 0 && <ConQuotes quotes={g.checks} />}
    </ConstructionPage>
  );
}

