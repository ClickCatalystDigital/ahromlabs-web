import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, GuideQuotes, type Hub } from "@/components/GuidePage";
import { formatDate } from "@/lib/content";
import { ASME_EDITION, ASME_GROUPS, asmeGuides, type AsmeGroup } from "@/lib/asme";
import { marketsFor, only } from "@/lib/markets";

// The /asme hub on the shared guide frame (GuidePage). The links at the foot of a guide are its own group plus
// the hub and the question library, not all 31 guides: closer links, and a list a reader actually scans.

const SOURCES = [
  {
    title: "Boiler and Pressure Vessel Certification",
    publisher: "ASME",
    url: "https://www.asme.org/certification-accreditation/Boiler-and-Pressure-Vessel-Certification",
    date: "2026-11-01",
  },
];

function asmeHub(group?: AsmeGroup): Hub {
  return {
    path: "/asme",
    linksTitle: group ? ASME_GROUPS.find((g) => g.slug === group)!.name : "ASME guides",
    links: () => [
      ...asmeGuides()
        .filter((g) => !group || g.group === group)
        .map((g) => ({ href: `/asme/${g.slug}`, title: g.title })),
      { href: "/asme", title: "All ASME guides" },
      { href: "/asme/questions", title: "ASME questions, answered" },
      { href: "/asme/items", title: "Boiler and pressure vessel materials list" },
    ],
    byline: (checked) => (
      <>
        Written to the ASME BPVC {ASME_EDITION.name} · checked against ASME&apos;s and the National Board&apos;s public pages on{" "}
        <time dateTime={checked}>{formatDate(checked)}</time>
      </>
    ),
    sources: SOURCES,
    cta: (
      <>
        <p className="text-lg text-foreground">
          WPS and PQR registers, welder continuity, heat numbers from receipt to nameplate, and the data report
          package: the records a Code shop keeps, in one system.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/#contact" className="subscribe-submit focus-ring inline-block">
            Talk to us about your shop
          </Link>{" "}
          <Link href="/services/material-traceability" className="text-link focus-ring">
            Material traceability
          </Link>
        </div>
        {/* Each market's boiler demo: India's (IBR) and North America's (ASME, src/lib/work.ts usUrl). */}
        <p className="mt-4 text-sm text-foreground-secondary" {...only(["IN"])}>
          A boiler manufacturer&apos;s system, from enquiry to dispatch and the IBR folder, with sample logins:{" "}
          <a href="https://boiler-erp.ahromlabs.com/demo" className="text-link focus-ring">try the live demo</a>.
        </p>
        <p className="mt-4 text-sm text-foreground-secondary" {...only(["NA"])}>
          A boiler and pressure vessel shop&apos;s system, from inquiry to shipping and the ASME data report package, with
          sample logins: <a href="https://boiler-erp-us.ahromlabs.com/demo" className="text-link focus-ring">try the live demo</a>.
          Fixed price, scope agreed before work starts: <Link href="/us#pricing" className="text-link focus-ring">see the prices</Link>.
        </p>
      </>
    ),
    boundary: (updated) => (
      <>
        A guide written by Ahrom Labs, not engineering advice, and not yet reviewed by an Authorized Inspector. The
        ASME Code is copyrighted and sold by ASME: paragraphs are cited by number and explained in our own words,
        never reproduced. Check every figure against your copy of the {ASME_EDITION.name} and with your Authorized
        Inspector before relying on it. Last updated <time dateTime={updated}>{formatDate(updated)}</time>.
      </>
    ),
    quotesLabel: "Quoted from the official text",
  };
}

export const AsmeQuotes = (props: Omit<ComponentProps<typeof GuideQuotes>, "label">) => <GuideQuotes {...props} label="Quoted from the official text" />;
export const AsmePage = ({ group, ...props }: Omit<ComponentProps<typeof GuidePage>, "hub"> & { group?: AsmeGroup }) => (
  <GuidePage hub={asmeHub(group)} {...props} />
);

/** Props that keep a guide link out of markets it isn't for (src/lib/markets.ts). */
export const asmeOnly = (slug: string) => only(marketsFor(`/asme/${slug}`));
