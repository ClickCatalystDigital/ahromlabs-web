import type { Metadata } from "next";
import Link from "next/link";
import { ErpPage, erpGuides } from "@/components/ErpPage";
import { GuideH2 } from "@/components/GuidePage";
import { requirements, departments, deptItems, ERP_CHECKED, ERP_PUBLISHED } from "@/lib/erp";
import { erpPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";
import { headingId } from "@/lib/headings";

const title = "ERP requirements for Indian manufacturers and traders";
const lead = `What to ask for before you buy or build an ERP in India: ${requirements.length} requirements in ${departments.length} departments, each with a test you can make any vendor pass, the GST and company-law rules quoted from the official text, and figures from systems running today. Free checklist, Excel template and a builder that picks the lines that apply to you.`;

const image = { src: "/erp/erp-requirements-binder.webp", alt: "An open ring binder of ruled sheets with coloured index tabs.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "ERP requirements for Indian manufacturers and traders: free checklist, Excel template and builder, with vendor tests and quoted e-invoice and audit-trail rules.",
  alternates: { canonical: "/erp" },
  openGraph: { type: "website", url: "https://ahromlabs.com/erp", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function ErpHub() {
  const guides = erpGuides();
  const updated = [ERP_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "ERP requirements", path: "/erp" }];
  const tools = [
    { href: "/erp/check", title: "Build your requirements list", text: "Five answers about your business: what it does, its turnover, whether Tally stays, whether it is a company, and which departments to cover. Out comes the list that applies, to print or open in Excel. Nothing leaves your browser." },
    { href: "/erp/requirements", title: "ERP requirements checklist", text: `All ${requirements.length} requirements, each with why it matters, what to make a vendor show, what good looks like in a live system, and the law where one applies. Free under CC BY 4.0, also as JSON.` },
    { href: "/erp/template", title: "ERP requirements template in Excel", text: "The checklist as an RFP and a vendor scorecard: set priorities, collect each vendor's answers, and the sheet scores them." },
  ];

  return (
    <ErpPage
      graph={erpPageGraph({ path: "/erp", title, description: lead, published: ERP_PUBLISHED, updated, trail, image })}
      trail={trail}
      title={title}
      lead={lead}
      art={image.src}
      checked={ERP_CHECKED}
      updated={updated}
    >
      <GuideH2>Tools</GuideH2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {tools.map((t) => (
          <li key={t.href} className="py-6">
            <Link href={t.href} className="text-link focus-ring text-xl font-medium">{t.title}</Link>
            <p className="mt-2 leading-relaxed text-foreground-secondary">{t.text}</p>
          </li>
        ))}
      </ul>

      <GuideH2>What makes this list different</GuideH2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground-secondary">
        <li><strong className="font-medium text-foreground">Every line has a test.</strong> The same test serves as the vendor demo script and as the acceptance test before go-live.</li>
        <li><strong className="font-medium text-foreground">Indian law, quoted.</strong> The audit trail, e-invoicing, the 30-day reporting limit, e-way bills, MSME payment terms and data protection, each quoted from the official text and checked by script.</li>
        <li><strong className="font-medium text-foreground">Figures from live systems.</strong> Where a line says what good looks like, the number comes from a system Ahrom Labs runs, and is published on its service page.</li>
        <li><strong className="font-medium text-foreground">Honest about gaps.</strong> Where Ahrom Labs hasn&apos;t built something yet (an e-invoice portal connection, for one), the line says so.</li>
      </ul>

      {guides.length > 0 && (
        <>
          <GuideH2>Guides</GuideH2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {guides.map((g) => (
              <li key={g.slug} className="py-6">
                <Link href={`/erp/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <GuideH2>Requirements by department</GuideH2>
      <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 text-foreground-secondary sm:grid-cols-2">
        {departments.map((d) => (
          <li key={d.slug}>
            <Link href={`/erp/requirements#${headingId(d.name)}`} className="text-link focus-ring font-medium">{d.name}</Link>{" "}
            <span className="block text-sm">{deptItems(d.slug).length} requirements. {d.question}</span>
          </li>
        ))}
      </ul>
    </ErpPage>
  );
}
