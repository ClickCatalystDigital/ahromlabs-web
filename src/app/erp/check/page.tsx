import type { Metadata } from "next";
import Link from "next/link";
import { ErpPage } from "@/components/ErpPage";
import { GuideH2 } from "@/components/GuidePage";
import { ErpCheck } from "@/components/ErpCheck";
import { requirements, ERP_CHECKED, ERP_PUBLISHED } from "@/lib/erp";
import { erpPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "ERP requirements builder: your checklist in five answers";
const lead = `Tell it what kind of business you run, your turnover, whether Tally stays, and which departments the system must cover. It picks the requirements that apply from ${requirements.length}, including the GST and company-law rules your turnover brings in, ready to print or open in Excel and send to vendors. It runs in your browser; nothing is sent anywhere.`;

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "Free ERP requirements builder for Indian businesses: answer five questions and get the requirements that apply to you, with e-invoice and audit-trail rules.",
  alternates: { canonical: "/erp/check" },
  openGraph: { type: "website", url: "https://ahromlabs.com/erp/check", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function ErpCheckPage() {
  const trail = [
    { name: "ERP requirements", path: "/erp" },
    { name: "Builder", path: "/erp/check" },
  ];
  return (
    <ErpPage
      graph={erpPageGraph({ path: "/erp/check", title, description: lead, published: ERP_PUBLISHED, updated: ERP_CHECKED, trail, app: true })}
      trail={trail}
      title={title}
      lead={lead}
      checked={ERP_CHECKED}
      updated={ERP_CHECKED}
    >
      <ErpCheck />

      <div className="print:hidden">
        <GuideH2>What the answers change</GuideH2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground-secondary">
          <li>
            <strong className="font-medium text-foreground">Turnover</strong>: above ₹5 crore, B2B invoices need an e-invoice
            (IRN); at ₹10 crore and above, each must reach the portal within 30 days, and TDS on purchase of goods can apply.
          </li>
          <li>
            <strong className="font-medium text-foreground">Company</strong>: a company keeping its books in software needs an
            audit trail that can&apos;t be switched off.
          </li>
          <li>
            <strong className="font-medium text-foreground">Tally</strong>: if Tally stays, the system must post into it and
            check what it posted; if not, it must do the GST returns, period locks and fixed assets itself.
          </li>
          <li>
            <strong className="font-medium text-foreground">Business</strong>: production, BOM and certificate lines apply to
            manufacturers; stock and dispatch lines to anyone who holds goods.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-foreground-secondary">
          Each line links to why it is there and what good looks like. The full list, every line with its law and its
          proof, is the <Link href="/erp/requirements" className="text-link focus-ring">checklist</Link>; the same lines with
          vendor scoring are in the <Link href="/erp/template" className="text-link focus-ring">Excel template</Link>.
        </p>
      </div>
    </ErpPage>
  );
}
