import type { Metadata } from "next";
import Markdown from "react-markdown";
import { SalesTaxPage, StQuotes } from "@/components/SalesTaxPage";
import { NexusCheck } from "@/components/NexusCheck";
import { guideMarkdown, remarkGfm } from "@/components/GuidePage";
import { markdownHeadings } from "@/lib/headings";
import { NEXUS_STATES, stGuide, stGuides } from "@/lib/sales-tax";
import { stArt } from "@/lib/sales-tax-images";
import { mfgPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";
import { linkTerms } from "@/lib/glossary-links";
import { relatedLinks } from "@/lib/related";

// Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return stGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/sales-tax/[slug]">): Promise<Metadata> {
  const g = stGuide((await props.params).slug)!;
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.metaTitle ?? g.title),
    description,
    alternates: { canonical: `/sales-tax/${g.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/sales-tax/${g.slug}`, siteName: "Ahrom Labs", title: g.title, description, publishedTime: g.published, modifiedTime: g.updated, authors: ["Pujan Motiwala"] },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function SalesTaxGuidePage(props: PageProps<"/sales-tax/[slug]">) {
  const g = stGuide((await props.params).slug)!;
  const path = `/sales-tax/${g.slug}`;
  const trail = [{ name: "Sales tax", path: "/sales-tax" }, { name: g.title, path }];
  const art = stArt(g.slug);
  return (
    <SalesTaxPage
      group={g.group}
      graph={mfgPageGraph({ path, title: g.title, description: g.answer, question: g.question, published: g.published, updated: g.updated, trail, app: g.tool === "nexus" ? "Economic nexus checker" : undefined, image: art, sources: g.sources })}
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
      {g.tool === "nexus" && <NexusCheck />}
      <Markdown components={guideMarkdown} remarkPlugins={[remarkGfm]}>{linkTerms(g.body)}</Markdown>
      {g.tool === "nexus" && <ThresholdTable />}
      {g.checks && g.checks.length > 0 && <StQuotes quotes={g.checks} />}
    </SalesTaxPage>
  );
}

// Every state's threshold, as the Streamlined Sales Tax Governing Board's chart words it (src/lib/sales-tax-calc.ts).
function ThresholdTable() {
  const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line-strong">
            <th className="py-2 pr-4 font-medium text-foreground">State</th>
            <th className="py-2 pr-4 font-medium text-foreground">Threshold</th>
            <th className="py-2 font-medium text-foreground">The chart&apos;s wording</th>
          </tr>
        </thead>
        <tbody>
          {NEXUS_STATES.map((s) => (
            <tr key={s.code} className="border-b border-line align-top">
              <td className="py-2 pr-4 text-foreground">{s.name}</td>
              <td className="py-2 pr-4 whitespace-nowrap text-foreground-secondary">
                {s.sales === null ? "No statewide sales tax" : `${usd(s.sales)}${s.orders ? ` ${s.join} ${s.orders} transactions` : ""}`}
              </td>
              <td className="py-2 text-foreground-secondary">{s.rule ? (s.source ? `${s.source.label}: "${s.rule}"` : s.rule) : "No threshold listed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
