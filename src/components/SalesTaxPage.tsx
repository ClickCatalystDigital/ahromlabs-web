import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, GuideQuotes, type Hub } from "@/components/GuidePage";
import { formatDate } from "@/lib/content";
import { ST_GROUPS, stGuides } from "@/lib/sales-tax";
import { DICT, money } from "@/lib/markets";
import { engagements } from "@/lib/work";

// The /sales-tax hub on the shared guide frame (GuidePage). A guide's footer links are its own group plus the hub.
// Prices come from DICT.NA (src/lib/markets.ts), the same figures as the North American home page.

const price = DICT.NA.pricing!;
const LABEL = "Quoted from the state and Streamlined pages";
// The four US demos, each a sample US company with US sales tax.
const usDemos = engagements.flatMap((w) => (w.demo?.usUrl ? [{ url: w.demo.usUrl, name: w.demo.name }] : []));

function stHub(group?: string): Hub {
  return {
    path: "/sales-tax",
    linksTitle: group ? ST_GROUPS.find((g) => g.slug === group)!.name : "Sales tax guides",
    links: () => [
      ...stGuides()
        .filter((g) => !group || g.group === group)
        .map((g) => ({ href: `/sales-tax/${g.slug}`, title: g.title })),
      { href: "/sales-tax", title: "All sales tax guides" },
    ],
    byline: (checked) => (
      <>
        Written for US manufacturers, distributors and contractors · Checked against the Streamlined Sales Tax
        Governing Board&apos;s and state revenue departments&apos; pages on <time dateTime={checked}>{formatDate(checked)}</time>
      </>
    ),
    sources: [],
    cta: (
      <>
        <p className="text-lg text-foreground">
          Orders, ship-to addresses, customer certificates and sales by state in one system, so the return and the
          nexus check come out of it. Start with a working prototype of your main workflow, on your own data, in{" "}
          {price.prototypeWeeks} weeks for {money("NA", price.prototype)}, credited to the build if you continue.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/#contact" className="subscribe-submit focus-ring inline-block">
            Talk to us about your system
          </Link>{" "}
          <Link href="/us#pricing" className="text-link focus-ring">
            See the prices
          </Link>
        </div>
        {usDemos.length > 0 && (
          <p className="mt-4 text-sm text-foreground-secondary">
            Live systems for sample US companies, with sample logins:{" "}
            {usDemos.map((d, i) => (
              <span key={d.url}>
                {i > 0 && (i === usDemos.length - 1 ? " and " : ", ")}
                <a href={d.url} className="text-link focus-ring">{d.name.replace(/ demo$/, "")}</a>
              </span>
            ))}
            .
          </p>
        )}
      </>
    ),
    boundary: (updated) => (
      <>
        A guide written by Ahrom Labs, a software company that builds operations systems. The facts come from the
        Streamlined Sales Tax Governing Board and state revenue departments on the date shown; states change their
        rules, and the Board&apos;s chart says it does not override any state&apos;s law. Not tax or legal advice: for
        your own case, ask the state or a tax adviser. Last updated <time dateTime={updated}>{formatDate(updated)}</time>.
      </>
    ),
    quotesLabel: LABEL,
  };
}

export const StQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label={LABEL} />;
export const SalesTaxPage = ({ group, ...props }: Omit<ComponentProps<typeof GuidePage>, "hub"> & { group?: string }) => (
  <GuidePage hub={stHub(group)} {...props} />
);
