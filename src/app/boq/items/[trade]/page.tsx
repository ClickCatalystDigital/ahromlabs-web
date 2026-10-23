import type { Metadata } from "next";
import Link from "next/link";
import { BoqPage } from "@/components/BoqPage";
import { GuideH2 } from "@/components/GuidePage";
import { trades, tradeItems, tradeBySlug, IS, SPEC, UNIT_LABEL, BOQ_CHECKED, BOQ_PUBLISHED } from "@/lib/boq";
import { boqPageGraph } from "@/lib/schema";
import { headingId } from "@/lib/headings";

export const dynamicParams = false;

export function generateStaticParams() {
  return trades.map((t) => ({ trade: t.slug }));
}

const anchor = (id: string) => id.replace(/\./g, "-");

// The guide sections that matter for each trade: the measurement rule for it, and for joinery the board
// standards. Anchors are built from the guides' heading text with headingId; renaming a heading means updating it here.
const rules = (h: string) => `/boq/measurement-rules#${headingId(h)}`;
const BOARDS: [string, string] = ["/boq/material-specifications", "Board standards: IS 303, IS 710 and others"];
const MODULAR: [string, string] = [rules("Modular kitchens, wardrobes and lofts"), "How modular work is measured, and why the line must say it"];
const READ_WITH: Record<string, [string, string][]> = {
  civil: [["/boq/measurement-rules", "How interior work is measured (IS 1200)"]],
  "false-ceiling": [[rules("False ceilings"), "How false ceilings are measured: flat area, openings, coves"]],
  flooring: [[rules("Floors, dado and skirting"), "How floors, dado and skirting are measured"]],
  carpentry: [[rules("Woodwork and panelling"), "How woodwork and panelling are measured"], BOARDS],
  "modular-kitchen": [MODULAR, BOARDS],
  wardrobes: [MODULAR, BOARDS],
  painting: [[rules("Paint"), "How paint is measured: surfaces, coats, openings"]],
  electrical: [["/boq/measurement-rules", "How interior work is measured (IS 1200)"]],
  plumbing: [["/boq/measurement-rules", "How interior work is measured (IS 1200)"]],
};
const pageTitle = (name: string) => `${name} BOQ items: units, measurement and specification`;

export async function generateMetadata(props: PageProps<"/boq/items/[trade]">): Promise<Metadata> {
  const t = tradeBySlug((await props.params).trade)!;
  const title = pageTitle(t.name);
  const description = `${t.name} in an interior BOQ: ${tradeItems(t.slug).map((i) => i.name.toLowerCase()).join(", ")}. Unit, measurement, IS standard, specs.`.slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/boq/items/${t.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/boq/items/${t.slug}`, siteName: "Ahrom Labs", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BoqTradePage(props: PageProps<"/boq/items/[trade]">) {
  const t = tradeBySlug((await props.params).trade)!;
  const items = tradeItems(t.slug);
  const path = `/boq/items/${t.slug}`;
  const title = pageTitle(t.name);
  const lead = `${t.summary} ${items.length} items, each with the unit it is priced in, how it is measured, the standard that applies, what the line must name and what quotes leave out.`;
  const trail = [
    { name: "Interior BOQ", path: "/boq" },
    { name: "Item library", path: "/boq/items" },
    { name: t.name, path },
  ];
  const dt = "text-sm font-medium text-foreground";
  const dd = "mt-1 leading-relaxed text-foreground-secondary";

  return (
    <BoqPage
      graph={boqPageGraph({ path, title, description: lead, published: BOQ_PUBLISHED, updated: BOQ_CHECKED, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={BOQ_CHECKED}
      updated={BOQ_CHECKED}
      headings={items.map((i) => i.name)}
    >
      {items.map((i) => (
        <section key={i.id} id={anchor(i.id)} className="scroll-mt-24">
          <GuideH2>{i.name}</GuideH2>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className={dt}>Unit</dt>
              <dd className={dd}>
                {UNIT_LABEL[i.unit]}
                {i.units?.length ? `; also quoted in ${i.units.map((u) => UNIT_LABEL[u]).join(", ")}` : ""}
              </dd>
            </div>
            <div>
              <dt className={dt}>How it is measured</dt>
              <dd className={dd}>
                {i.measure}
                {i.basis && " No Indian Standard fixes this for modular work, so the line itself must say it."}
              </dd>
            </div>
            {i.is?.length ? (
              <div>
                <dt className={dt}>Indian Standards</dt>
                <dd className={dd}>{i.is.map((r) => `${IS[r].code}, ${IS[r].title}`).join("; ")}.</dd>
              </div>
            ) : null}
            {i.spec.length > 0 && (
              <div>
                <dt className={dt}>The line must name</dt>
                <dd className={dd}>
                  <ul className="list-disc space-y-1 pl-5">
                    {i.spec.map((k) => (
                      <li key={k}>{SPEC[k].label}: {SPEC[k].hint}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {i.omits.length > 0 && (
              <div>
                <dt className={dt}>Often left out of the quote</dt>
                <dd className={dd}>
                  <ul className="list-disc space-y-1 pl-5">
                    {i.omits.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </dd>
              </div>
            )}
            <div>
              <dt className={dt}>A line to start from</dt>
              <dd className="mt-2 border-l-2 border-line pl-4 font-mono text-sm leading-relaxed text-foreground">{i.description}</dd>
              <dd className="mt-1 text-xs text-foreground-secondary">Values in [brackets] are yours to fill. Item id: {i.id}</dd>
            </div>
          </dl>
        </section>
      ))}

      <nav aria-label="Read with this trade" className="mt-14 border-t border-line pt-8">
        <h2 className="text-sm font-medium text-foreground-secondary">Read with these items</h2>
        <ul className="mt-3 space-y-2">
          {READ_WITH[t.slug]?.map(([href, label]) => (
            <li key={href}><Link href={href} className="text-link focus-ring">{label}</Link></li>
          ))}
          <li><Link href="/boq/how-to-make-an-interior-boq" className="text-link focus-ring">How to make an interior BOQ, step by step</Link></li>
          <li><Link href="/boq/template" className="text-link focus-ring">Every item as a blank BOQ: the Excel template</Link></li>
        </ul>
      </nav>

      <nav aria-label="Other trades" className="mt-14 border-t border-line pt-8">
        <h2 className="text-sm font-medium text-foreground-secondary">Other trades</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {trades.filter((o) => o.slug !== t.slug).map((o) => (
            <li key={o.slug}><Link href={`/boq/items/${o.slug}`} className="text-link focus-ring">{o.name}</Link></li>
          ))}
        </ul>
      </nav>
    </BoqPage>
  );
}
