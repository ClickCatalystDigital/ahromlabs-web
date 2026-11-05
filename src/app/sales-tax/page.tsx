import type { Metadata } from "next";
import Link from "next/link";
import { SalesTaxPage } from "@/components/SalesTaxPage";
import { GuideH2 } from "@/components/GuidePage";
import { ST_CHECKED, ST_GROUPS, ST_PUBLISHED, stGuides } from "@/lib/sales-tax";
import { mfgPageGraph } from "@/lib/schema";
import { stArt } from "@/lib/sales-tax-images";

const title = "US sales tax for manufacturers, distributors and contractors";
const lead =
  "Since South Dakota v. Wayfair (2018), a state can make you collect its sales tax once your sales into it pass a threshold, even with no office or staff there: $100,000 a year in most states, $500,000 in California, Texas and New York. These guides explain when you must register, which sales are exempt with a certificate, the manufacturing exemption, use tax on your own purchases, and what your system has to record. A free checker compares your sales with every state's threshold.";

export const metadata: Metadata = {
  title: { absolute: "US sales tax guide: nexus, exemptions and certificates" },
  description: "When a US business must collect sales tax in another state: every state's economic nexus threshold, resale certificates, the manufacturing exemption, use tax.",
  alternates: { canonical: "/sales-tax" },
  openGraph: { type: "website", url: "https://ahromlabs.com/sales-tax", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function SalesTaxHub() {
  const guides = stGuides();
  const updated = [ST_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "Sales tax", path: "/sales-tax" }];
  const art = stArt("sales-tax-hub");
  return (
    <SalesTaxPage
      graph={mfgPageGraph({ path: "/sales-tax", title, description: lead, published: ST_PUBLISHED, updated, trail, image: art })}
      trail={trail}
      title={title}
      lead={lead}
      checked={ST_CHECKED}
      updated={updated}
      art={art?.src}
      artAlt={art?.alt}
    >
      <GuideH2>Free tool</GuideH2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        <li className="py-6">
          <Link href="/sales-tax/economic-nexus-thresholds" className="text-link focus-ring text-xl font-medium">Economic nexus checker</Link>
          <p className="mt-2 leading-relaxed text-foreground-secondary">
            Your sales and orders into each state against its threshold, with the state&apos;s rule quoted beside each
            answer, and the full table of thresholds for every state.
          </p>
        </li>
      </ul>

      {ST_GROUPS.map((group) => {
        const list = guides.filter((g) => g.group === group.slug);
        return list.length === 0 ? null : (
          <div key={group.slug}>
            <GuideH2>{group.name}</GuideH2>
            <p className="mt-4 leading-relaxed text-foreground-secondary">{group.intro}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {list.map((g) => (
                <li key={g.slug} className="py-6">
                  <Link href={`/sales-tax/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <GuideH2>Related guides</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        For a manufacturer, sales tax sits beside job costing and inventory: see the{" "}
        <Link href="/manufacturing" className="text-link focus-ring">manufacturing software guide</Link>, including{" "}
        <Link href="/manufacturing/quickbooks-for-manufacturing" className="text-link focus-ring">what QuickBooks does for a manufacturer</Link>.
      </p>
    </SalesTaxPage>
  );
}
