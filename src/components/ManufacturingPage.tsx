import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, GuideQuotes, type Hub } from "@/components/GuidePage";
import { formatDate } from "@/lib/content";
import { MFG_GROUPS, mfgGuides, type MfgGroup } from "@/lib/manufacturing";
import { DICT, money } from "@/lib/markets";
import { engagements } from "@/lib/work";

// The /manufacturing hub on the shared guide frame (GuidePage). A guide's footer links are its own group plus
// the hub. Prices come from DICT.NA (src/lib/markets.ts), the same figures as the North American home page.

const price = DICT.NA.pricing!;
// The US inventory demo (electronics trading, US build): stock, reservations and approvals.
const usDemo = engagements.find((w) => w.demo?.usUrl?.includes("electronics"))?.demo;

function mfgHub(group?: MfgGroup): Hub {
  return {
    path: "/manufacturing",
    linksTitle: group ? MFG_GROUPS.find((g) => g.slug === group)!.name : "Manufacturing guides",
    links: () => [
      ...mfgGuides()
        .filter((g) => !group || g.group === group)
        .map((g) => ({ href: `/manufacturing/${g.slug}`, title: g.title })),
      { href: "/manufacturing", title: "All manufacturing guides" },
    ],
    byline: (checked) => (
      <>
        Written for US job shops and small manufacturers · QuickBooks facts checked against Intuit&apos;s pages on{" "}
        <time dateTime={checked}>{formatDate(checked)}</time>
      </>
    ),
    sources: [],
    cta: (
      <>
        <p className="text-lg text-foreground">
          Quotes, jobs, routings, stock and shop-floor time in one system, with QuickBooks kept for the books.
          Start with a working prototype of your main workflow, on your own data, in {price.prototypeWeeks} weeks
          for {money("NA", price.prototype)}, credited to the build if you continue.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/#contact" className="subscribe-submit focus-ring inline-block">
            Talk to us about your shop
          </Link>{" "}
          <Link href="/#pricing" className="text-link focus-ring">
            See the prices
          </Link>
        </div>
        {usDemo?.usUrl && (
          <p className="mt-4 text-sm text-foreground-secondary">
            Stock, reservations and approvals in a live system, with sample logins:{" "}
            <a href={usDemo.usUrl} className="text-link focus-ring">try the inventory demo</a>.
          </p>
        )}
      </>
    ),
    boundary: (updated) => (
      <>
        A guide written by Ahrom Labs, a software company that builds operations systems for manufacturers. Where
        it describes QuickBooks, the facts come from Intuit&apos;s own pages on the date shown, and Intuit changes
        its plans often: check your edition before relying on it. QuickBooks is a trademark of Intuit Inc.; Ahrom
        Labs is not affiliated with Intuit. Not accounting or tax advice. Last updated{" "}
        <time dateTime={updated}>{formatDate(updated)}</time>.
      </>
    ),
    quotesLabel: "Quoted from Intuit's pages",
  };
}

export const MfgQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label="Quoted from Intuit's pages" />;
export const ManufacturingPage = ({ group, ...props }: Omit<ComponentProps<typeof GuidePage>, "hub"> & { group?: MfgGroup }) => (
  <GuidePage hub={mfgHub(group)} {...props} />
);
