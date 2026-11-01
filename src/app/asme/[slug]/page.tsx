import type { Metadata } from "next";
import Markdown from "react-markdown";
import { AsmePage, AsmeQuotes } from "@/components/AsmePage";
import { ContinuityChecker, HydrotestCalculator, ShellCalculator } from "@/components/AsmeTools";
import { guideMarkdown, remarkGfm } from "@/components/GuidePage";
import { markdownHeadings } from "@/lib/headings";
import { asmeGuide, asmeGuides } from "@/lib/asme";
import { asmeArt } from "@/lib/asme-images";
import { asmePageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown slugs 404. /asme/questions is its own route; build-content.mjs keeps a guide from taking it.
export const dynamicParams = false;

export function generateStaticParams() {
  return asmeGuides().map((g) => ({ slug: g.slug }));
}

const TOOLS = {
  hydrotest: { Tool: HydrotestCalculator, name: "ASME hydrostatic test pressure calculator" },
  shell: { Tool: ShellCalculator, name: "ASME shell thickness and MAWP calculator" },
  continuity: { Tool: ContinuityChecker, name: "ASME welder continuity checker" },
};

export async function generateMetadata(props: PageProps<"/asme/[slug]">): Promise<Metadata> {
  const g = asmeGuide((await props.params).slug)!;
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.title),
    description,
    alternates: { canonical: `/asme/${g.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/asme/${g.slug}`, siteName: "Ahrom Labs", title: g.title, description, publishedTime: g.published, modifiedTime: g.updated, authors: ["Pujan Motiwala"] },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function AsmeGuidePage(props: PageProps<"/asme/[slug]">) {
  const g = asmeGuide((await props.params).slug)!;
  const path = `/asme/${g.slug}`;
  const trail = [{ name: "ASME", path: "/asme" }, { name: g.title, path }];
  const tool = g.tool ? TOOLS[g.tool] : null;
  const art = asmeArt(g.slug);
  return (
    <AsmePage
      group={g.group}
      graph={asmePageGraph({ path, title: g.title, description: g.answer, published: g.published, updated: g.updated, trail, app: tool?.name, image: art })}
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
      {tool && <tool.Tool />}
      <Markdown components={guideMarkdown} remarkPlugins={[remarkGfm]}>{g.body}</Markdown>
      {g.checks && g.checks.length > 0 && <AsmeQuotes quotes={g.checks} />}
    </AsmePage>
  );
}
