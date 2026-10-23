import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, GuideQuotes, type Hub } from "@/components/GuidePage";
import { formatDate, getContent } from "@/lib/content";

// The /boq hub: its sources, byline, the checker and the Designer Ops demo,
// and its boundary, on the shared frame in GuidePage.

// Guides in reading order; any guide not listed here still shows, after these.
const GUIDE_ORDER = ["what-is-a-boq", "how-to-make-an-interior-boq", "measurement-rules", "material-specifications", "variation-orders", "gst-on-interior-work"];
export function boqGuides() {
  const rank = (s: string) => GUIDE_ORDER.indexOf(s) + 1 || GUIDE_ORDER.length + 1;
  return [...getContent("boq")].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const BOQ_HUB: Hub = {
  path: "/boq",
  linksTitle: "Interior BOQ guides and tools",
  links: () => [
    ...boqGuides().map((g) => ({ href: `/boq/${g.slug}`, title: g.title })),
    { href: "/boq/items", title: "Interior BOQ item library" },
    { href: "/boq/check", title: "Check a BOQ and turn it into a quotation" },
  ],
  byline: (checked) => (
    <>
      Standards checked against the BIS catalogue on <time dateTime={checked}>{formatDate(checked)}</time>
    </>
  ),
  sources: [
    {
      title: "Indian Standards catalogue (Know Your Standards)",
      publisher: "Bureau of Indian Standards",
      url: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/Indian_standards/",
      date: "2026-10-23",
    },
  ],
  cta: (
    <>
      <p className="text-lg text-foreground">Paste a BOQ from Excel and see what each line leaves open, then print it as a quotation.</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href="/boq/check" className="subscribe-submit focus-ring inline-block">
          Check a BOQ
        </Link>
        <span className="text-sm text-foreground-secondary">Free. Runs in your browser; the rows never leave it.</span>
      </div>
      <p className="mt-4 text-sm text-foreground-secondary">
        Designer Ops keeps your own BOQ library and every quote, turns an accepted quote&apos;s payment stages into
        invoices, then runs the project: orders, site visits and the workshop.{" "}
        <a href="https://interiors-erp.ahromlabs.com/demo" className="text-link focus-ring">
          Try the live demo
        </a>
        {" · "}
        <Link href="/industries/interior-design-and-furniture" className="text-link focus-ring">
          system for interior designers
        </Link>
      </p>
    </>
  ),
  boundary: (updated) => (
    <>
      A guide written by Ahrom Labs; not legal, tax or engineering advice. Indian Standards are cited by number and
      title from the BIS catalogue, not quoted; the standard governs wherever this page differs from it. No rates are
      given: they change with city and month. Last updated <time dateTime={updated}>{formatDate(updated)}</time>.
    </>
  ),
  quotesLabel: "Quoted from the official text",
};

export const BoqQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label={BOQ_HUB.quotesLabel} />;
export const BoqPage = (props: Omit<ComponentProps<typeof GuidePage>, "hub">) => <GuidePage hub={BOQ_HUB} {...props} />;
