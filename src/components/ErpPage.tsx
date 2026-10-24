import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, GuideQuotes, type Hub } from "@/components/GuidePage";
import { formatDate, getContent } from "@/lib/content";
import { ERP_DOCS, ERP_CHECKED } from "@/lib/erp";

// The /erp hub: its official sources, byline, the checker and the demos, and its
// boundary, on the shared frame in GuidePage (as BoqPage does for /boq).

// Guides in reading order; any guide not listed still shows, after these.
const GUIDE_ORDER = [
  "compliance",
  "vendor-demo-script",
  "tally-migration",
  "contract-checklist",
  "readiness",
  "selection-matrix",
  "implementation-plan",
  "small-manufacturers",
  "trading-distribution",
  "interior-design-firms",
];
export function erpGuides() {
  const rank = (s: string) => GUIDE_ORDER.indexOf(s) + 1 || GUIDE_ORDER.length + 1;
  return [...getContent("erp")].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const ERP_HUB: Hub = {
  path: "/erp",
  linksTitle: "ERP requirements guides and tools",
  links: () => [
    { href: "/erp/requirements", title: "ERP requirements checklist" },
    { href: "/erp/check", title: "Build your own ERP requirements list" },
    { href: "/erp/template", title: "ERP requirements template in Excel" },
    ...erpGuides().map((g) => ({ href: `/erp/${g.slug}`, title: g.title })),
  ],
  byline: (checked) => (
    <>
      Statutory rules checked against the official texts on <time dateTime={checked}>{formatDate(checked)}</time>
    </>
  ),
  sources: Object.values(ERP_DOCS).map((d) => ({ title: d.title, publisher: d.publisher, url: d.url, date: ERP_CHECKED })),
  cta: (
    <>
      <p className="text-lg text-foreground">
        Answer five questions about your business and get the requirements that apply to it, ready to send to vendors.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href="/erp/check" className="subscribe-submit focus-ring inline-block">
          Build your requirements list
        </Link>{" "}
        <span className="text-sm text-foreground-secondary">Free. Runs in your browser; nothing is sent anywhere.</span>
      </div>
      <p className="mt-4 text-sm text-foreground-secondary">
        Most lines here can be tried today on a live system:{" "}
        <a href="https://boiler-erp.ahromlabs.com/demo" className="text-link focus-ring">manufacturing</a>
        {" · "}
        <a href="https://electronics-erp.ahromlabs.com/demo" className="text-link focus-ring">trading</a>
        {" · "}
        <a href="https://interiors-erp.ahromlabs.com/demo" className="text-link focus-ring">interiors</a>
        {" · "}
        <Link href="/services/custom-erp-crm" className="text-link focus-ring">how Ahrom Labs builds them</Link>
      </p>
    </>
  ),
  boundary: (updated) => (
    <>
      A guide written by Ahrom Labs from the systems it runs; not legal or tax advice. Statutory lines quote the
      official text, and the text governs wherever this page differs from it; how a rule applies to your business is
      a question for your CA. Last updated <time dateTime={updated}>{formatDate(updated)}</time>.
    </>
  ),
  quotesLabel: "Quoted from the official text",
};

export const ErpQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label={ERP_HUB.quotesLabel} />;
export const ErpPage = (props: Omit<ComponentProps<typeof GuidePage>, "hub">) => <GuidePage hub={ERP_HUB} {...props} />;
