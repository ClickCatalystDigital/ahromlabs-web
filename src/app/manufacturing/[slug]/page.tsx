import type { Metadata } from "next";
import Markdown from "react-markdown";
import { ManufacturingPage, MfgQuotes } from "@/components/ManufacturingPage";
import { JobCostCalculator, ScheduleDemo } from "@/components/ManufacturingTools";
import { guideMarkdown, remarkGfm } from "@/components/GuidePage";
import { markdownHeadings } from "@/lib/headings";
import { mfgGuide, mfgGuides } from "@/lib/manufacturing";
import { mfgArt } from "@/lib/manufacturing-images";
import { mfgPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return mfgGuides().map((g) => ({ slug: g.slug }));
}

const TOOLS = {
  jobcost: { Tool: JobCostCalculator, name: "Job cost calculator: estimated vs actual" },
  schedule: { Tool: ScheduleDemo, name: "Finite-capacity schedule demo" },
};

export async function generateMetadata(props: PageProps<"/manufacturing/[slug]">): Promise<Metadata> {
  const g = mfgGuide((await props.params).slug)!;
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.title),
    description,
    alternates: { canonical: `/manufacturing/${g.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/manufacturing/${g.slug}`, siteName: "Ahrom Labs", title: g.title, description, publishedTime: g.published, modifiedTime: g.updated, authors: ["Pujan Motiwala"] },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function ManufacturingGuidePage(props: PageProps<"/manufacturing/[slug]">) {
  const g = mfgGuide((await props.params).slug)!;
  const path = `/manufacturing/${g.slug}`;
  const trail = [{ name: "Manufacturing", path: "/manufacturing" }, { name: g.title, path }];
  const tool = g.tool === "jobcost" || g.tool === "schedule" ? TOOLS[g.tool] : null;
  const art = mfgArt(g.slug);
  return (
    <ManufacturingPage
      group={g.group}
      graph={mfgPageGraph({ path, title: g.title, description: g.answer, question: g.question, published: g.published, updated: g.updated, trail, app: tool?.name, image: art })}
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
      {g.checks && g.checks.length > 0 && <MfgQuotes quotes={g.checks} />}
    </ManufacturingPage>
  );
}
