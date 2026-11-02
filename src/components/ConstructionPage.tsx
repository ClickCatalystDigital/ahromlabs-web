import type { ComponentProps } from "react";
import Link from "next/link";
import { DemoLink, GuidePage, GuideQuotes, type Hub } from "@/components/GuidePage";
import { formatDate } from "@/lib/content";
import { CON_GROUPS, conGuides } from "@/lib/construction";
import { engagements } from "@/lib/work";

// The /construction hub on the shared guide frame (GuidePage). A guide's footer links are its own group (one
// market) plus the hub. The demo link switches to the US build for North America (DemoLink).

const LABEL = "Quoted from the official texts";
const demo = engagements.find((w) => w.demo?.url.includes("construction-erp"))?.demo;

function conHub(group?: string): Hub {
  return {
    path: "/construction",
    linksTitle: group ? CON_GROUPS.find((g) => g.slug === group)!.name : "Construction guides",
    links: () => [
      ...conGuides()
        .filter((g) => !group || g.group === group)
        .map((g) => ({ href: `/construction/${g.slug}`, title: g.title })),
      { href: "/construction", title: "All construction guides" },
    ],
    byline: (checked) => (
      <>
        Written for contractors and subcontractors · Checked against the statutes and official manuals cited on{" "}
        <time dateTime={checked}>{formatDate(checked)}</time>
      </>
    ),
    sources: [],
    cta: (
      <>
        <p className="text-lg text-foreground">
          Bills, measurements, retention, change orders and job cost in one system, from site to accounts. Start with
          a working prototype of your main workflow, on your own data, credited to the build if you continue.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/#contact" className="subscribe-submit focus-ring inline-block">
            Talk to us about your projects
          </Link>
        </div>
        {demo && (
          <p className="mt-4 text-sm text-foreground-secondary">
            Daily reports, bills and stores for a sample contractor, with sample logins:{" "}
            <DemoLink href={demo.url}>try the construction demo</DemoLink>. Its assistant,{" "}
            <Link href="/ai-assistant/construction-contractors" className="text-link focus-ring">Datum AI</Link>, answers
            from the project records.
          </p>
        )}
      </>
    ),
    boundary: (updated) => (
      <>
        A guide written by Ahrom Labs, a software company that builds operations systems for contractors. Laws,
        contract forms and manuals are explained from the texts cited, on the date shown; your contract and your
        state&apos;s or the department&apos;s current rules govern. Not legal, tax or accounting advice. AIA is a
        trademark of The American Institute of Architects; Ahrom Labs is not affiliated with it. Last updated{" "}
        <time dateTime={updated}>{formatDate(updated)}</time>.
      </>
    ),
    quotesLabel: LABEL,
  };
}

export const ConQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label={LABEL} />;
export const ConstructionPage = ({ group, ...props }: Omit<ComponentProps<typeof GuidePage>, "hub"> & { group?: string }) => (
  <GuidePage hub={conHub(group)} {...props} />
);
