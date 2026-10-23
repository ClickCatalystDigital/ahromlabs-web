import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, GuideH2, GuideQuotes, guideMarkdown, type Hub } from "@/components/GuidePage";
import { formatDate, getContent } from "@/lib/content";
import { IBR_2026_URL } from "@/lib/schema";

// The /ibr hub: its sources, byline, demo and boundary, on the shared frame in
// GuidePage. Each page quotes the Gazette; scripts/check-ibr-quotes.mjs checks it.

// Guides in reading order; any guide not listed here still shows, after these.
const GUIDE_ORDER = ["2026-changes", "registration-documents", "record-keeping", "small-industrial-boilers"];
export function ibrGuides() {
  const rank = (s: string) => GUIDE_ORDER.indexOf(s) + 1 || GUIDE_ORDER.length + 1;
  return [...getContent("guide")].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const IBR_HUB: Hub = {
  path: "/ibr",
  linksTitle: "IBR 2026 guides",
  // Every IBR page links every guide and the forms list. Before this, some guides were
  // linked from one other page only, and Google crawls what is linked well first.
  links: () => [
    ...ibrGuides().map((g) => ({ href: `/ibr/${g.slug}`, title: g.title })),
    { href: "/ibr/forms", title: "IBR 2026 forms list, and their IBR 1950 names" },
  ],
  byline: (checked) => (
    <>
      Checked against the Gazette on <time dateTime={checked}>{formatDate(checked)}</time>
      {" · "}IBR 2026, in force from 1 October 2026
    </>
  ),
  sources: [
    {
      title: "Indian Boiler Regulations, 2026 (Gazette of India, Extraordinary, No. 596)",
      publisher: "Central Boilers Board, Department for Promotion of Industry and Internal Trade",
      url: IBR_2026_URL,
      date: "2026-10-01",
    },
  ],
  cta: (
    <>
      <p className="text-lg text-foreground">
        See a boiler&apos;s IBR folder produced from its material certificates, with a sample company.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a href="https://boiler-erp.ahromlabs.com/demo" className="subscribe-submit focus-ring inline-block">
          Try the live demo
        </a>
        <span className="text-sm text-foreground-secondary">Free. Resets every night.</span>
      </div>
      <p className="mt-4 text-sm text-foreground-secondary">
        Built for a boiler manufacturer:{" "}
        <Link href="/industries/boiler-pressure-vessel-manufacturing" className="text-link focus-ring">
          ERP for boiler manufacturers
        </Link>
        {" · "}
        <Link href="/notes/ibr-statutory-folder-from-bom" className="text-link focus-ring">
          how the folder is produced
        </Link>
      </p>
    </>
  ),
  boundary: (updated) => (
    <>
      A guide written by Ahrom Labs from the Gazette text; not legal advice. The Gazette governs wherever this page differs from it, and a state&apos;s Chief Inspector of Boilers may set procedures of their own. Last updated <time dateTime={updated}>{formatDate(updated)}</time>.
    </>
  ),
  quotesLabel: "Quoted from the regulations",
};

export const IbrH2 = GuideH2;
export const ibrMarkdown = guideMarkdown;
export const IbrQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label={IBR_HUB.quotesLabel} />;
export const IbrPage = (props: Omit<ComponentProps<typeof GuidePage>, "hub">) => <GuidePage hub={IBR_HUB} {...props} />;
