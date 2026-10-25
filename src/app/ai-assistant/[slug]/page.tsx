import type { Metadata } from "next";
import Markdown from "react-markdown";
import { AiAssistantPage } from "@/components/AiAssistantPage";
import { guideMarkdown, remarkGfm, GuideQuotes, GuideH2 } from "@/components/GuidePage";
import { QuestionList } from "@/components/QuestionList";
import { AssistantMark } from "@/components/AssistantMark";
import { ASSISTANT, SYSTEM_OF } from "@/lib/ai-assistant";
import type { Industry } from "@/lib/erp";
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

// The industry guides list that industry's questions from the library under their text.
const INDUSTRY_OF_GUIDE: Record<string, Industry> = { "interior-design-firms": "projects", manufacturers: "manufacturing", "trading-distribution": "trading" };

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
      // The guide's own image, or the hub's: a page's openGraph replaces the parent's, so without one it would share no image.
      images: g.image
        ? [{ url: g.image.src, width: g.image.width, height: g.image.height, alt: g.image.alt }]
        : [{ url: "/ai/ai-assistants-hub.webp", width: 1086, height: 362, alt: "A polished brass service bell." }],
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
      headings={[...markdownHeadings(g.body), ...(INDUSTRY_OF_GUIDE[g.slug] ? [`What ${ASSISTANT[SYSTEM_OF[INDUSTRY_OF_GUIDE[g.slug]]].name} answers`] : [])]}
      art={g.image?.src}
    >
      <Markdown components={guideMarkdown} remarkPlugins={[remarkGfm]}>{g.body}</Markdown>
      {INDUSTRY_OF_GUIDE[g.slug] && (
        <section>
          <GuideH2>
            {`What ${ASSISTANT[SYSTEM_OF[INDUSTRY_OF_GUIDE[g.slug]]].name} answers`}{" "}
            <AssistantMark system={SYSTEM_OF[INDUSTRY_OF_GUIDE[g.slug]]} className="ml-1 size-9 align-[-0.15em]" />
          </GuideH2>
          <QuestionList industry={INDUSTRY_OF_GUIDE[g.slug]} />
        </section>
      )}
      {g.checks && g.checks.length > 0 && <GuideQuotes quotes={g.checks} label="Quoted from the official text" />}
    </AiAssistantPage>
  );
}
