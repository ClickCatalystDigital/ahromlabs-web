import type { Metadata } from "next";
import Markdown from "react-markdown";
import { InteriorsPage, IntQuotes } from "@/components/InteriorsPage";
import { guideMarkdown, remarkGfm } from "@/components/GuidePage";
import { markdownHeadings, markdownQuestions } from "@/lib/headings";
import { intGuide, intGuides } from "@/lib/interiors";
import { intArt } from "@/lib/interiors-images";
import { mfgPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";
import { linkTerms } from "@/lib/glossary-links";
import { relatedLinks } from "@/lib/related";

// Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return intGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/interiors/[slug]">): Promise<Metadata> {
  const g = intGuide((await props.params).slug)!;
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.metaTitle ?? g.title),
    description,
    alternates: { canonical: `/interiors/${g.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/interiors/${g.slug}`, siteName: "Ahrom Labs", title: g.title, description, publishedTime: g.published, modifiedTime: g.updated, authors: ["Pujan Motiwala"] },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function InteriorsGuidePage(props: PageProps<"/interiors/[slug]">) {
  const g = intGuide((await props.params).slug)!;
  const path = `/interiors/${g.slug}`;
  const trail = [{ name: "Interior design firms", path: "/interiors" }, { name: g.title, path }];
  const art = intArt(g.slug);
  return (
    <InteriorsPage
      group={g.group}
      graph={mfgPageGraph({ path, title: g.title, description: g.answer, question: g.question, questions: markdownQuestions(g.body).filter((x) => x.q !== g.question), published: g.published, updated: g.updated, trail, image: art, sources: g.sources })}
      trail={trail}
      title={g.title}
      lead={g.answer}
      checked={g.checked!}
      updated={g.updated}
      sources={g.sources}
      related={relatedLinks(g.related, path)}
      headings={markdownHeadings(g.body)}
      art={art?.src}
      artAlt={art?.alt}
    >
      <Markdown components={guideMarkdown} remarkPlugins={[remarkGfm]}>{linkTerms(g.body)}</Markdown>
      {g.checks && g.checks.length > 0 && <IntQuotes quotes={g.checks} />}
    </InteriorsPage>
  );
}
