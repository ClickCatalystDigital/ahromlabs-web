import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, GuideQuotes, type Hub } from "@/components/GuidePage";
import { formatDate } from "@/lib/content";
import { INT_GROUPS, intGuides } from "@/lib/interiors";
import { DICT, money } from "@/lib/markets";

// The /interiors hub on the shared guide frame (GuidePage). A guide's footer links are its own group plus the hub.
// Prices come from DICT.NA (src/lib/markets.ts), the same figures as the North American home page.

const price = DICT.NA.pricing!;
const LABEL = "Quoted from ASID, Intuit, the vendors' and the tax agencies' pages";
const DEMO = "https://interiors-erp-us.ahromlabs.com/demo";

function intHub(group?: string): Hub {
  return {
    path: "/interiors",
    linksTitle: group ? INT_GROUPS.find((g) => g.slug === group)!.name : "Interior design firm guides",
    links: () => [
      ...intGuides()
        .filter((g) => !group || g.group === group)
        .map((g) => ({ href: `/interiors/${g.slug}`, title: g.title })),
      { href: "/interiors", title: "All interior design firm guides" },
    ],
    byline: (checked) => (
      <>
        Written for US and Canadian interior design firms that sell product · Checked against the cited pages on{" "}
        <time dateTime={checked}>{formatDate(checked)}</time>
      </>
    ),
    sources: [],
    cta: (
      <>
        <p className="text-lg text-foreground">
          Proposals, purchase orders, deliveries, invoices and deposits in one system beside QuickBooks Online. Start
          with a working prototype of your main workflow, on your own data, in {price.prototypeWeeks} weeks for{" "}
          {money("NA", price.prototype)}, credited to the build if you continue.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/#contact" className="subscribe-submit focus-ring inline-block">
            Talk to us about your firm
          </Link>{" "}
          <a href={DEMO} className="text-link focus-ring">
            Try the design studio demo
          </a>{" "}
          <Link href="/us#pricing" className="text-link focus-ring">
            See the prices
          </Link>
        </div>
      </>
    ),
    boundary: (updated) => (
      <>
        A guide written by Ahrom Labs, a software company that builds operations systems. The facts come from the pages
        cited, read on the date shown; vendors change their products and states their rules. Not tax, legal or
        accounting advice: for your own case, ask the state, your accountant or a lawyer. Last updated{" "}
        <time dateTime={updated}>{formatDate(updated)}</time>.
      </>
    ),
    quotesLabel: LABEL,
  };
}

export const IntQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label={LABEL} />;
export const InteriorsPage = ({ group, ...props }: Omit<ComponentProps<typeof GuidePage>, "hub"> & { group?: string }) => (
  <GuidePage hub={intHub(group)} {...props} />
);
