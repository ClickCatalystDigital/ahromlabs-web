import type { Metadata } from "next";
import Link from "next/link";
import { BoqPage } from "@/components/BoqPage";
import { GuideH2 } from "@/components/GuidePage";
import { boqItems, trades, tradeItems, IS, UNIT_LABEL, BOQ_CHECKED, BOQ_PUBLISHED } from "@/lib/boq";
import { boqPageGraph } from "@/lib/schema";

const title = "Interior BOQ item library";
const lead = `${boqItems.length} interior work items in ${trades.length} trades, each with the unit it is priced in, the Indian Standard that governs how it is measured or what it is made of, and what a BOQ line must name. Open a trade for how each is measured, what quotes leave out, and a line ready to paste.`;

const image = { src: "/boq/wardrobe-front-elevation-measured.webp", alt: "A two-door wardrobe with a loft above it, with dimension lines for its overall height, the loft's height and its width.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title,
  description: "Interior BOQ items with units, IS 1200 measurement parts, board standards and required specs: kitchens, wardrobes, ceilings, flooring and more.",
  alternates: { canonical: "/boq/items" },
  openGraph: { type: "website", url: "https://ahromlabs.com/boq/items", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

const anchor = (id: string) => id.replace(/\./g, "-");

export default function BoqItemsPage() {
  const trail = [
    { name: "Interior BOQ", path: "/boq" },
    { name: "Item library", path: "/boq/items" },
  ];
  return (
    <BoqPage
      graph={boqPageGraph({ path: "/boq/items", title, description: lead, published: BOQ_PUBLISHED, updated: BOQ_CHECKED, trail, image })}
      trail={trail}
      title={title}
      lead={lead}
      checked={BOQ_CHECKED}
      art={image.src}
      updated={BOQ_CHECKED}
      headings={trades.map((t) => t.name)}
    >
      {trades.map((t) => (
        <section key={t.slug}>
          <GuideH2>{t.name}</GuideH2>
          <p className="mt-4 leading-relaxed text-foreground-secondary">{t.summary}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-foreground-secondary">
                <tr>
                  <th className="py-2 pr-4 font-medium">Item</th>
                  <th className="py-2 pr-4 font-medium">Unit</th>
                  <th className="py-2 font-medium">Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {tradeItems(t.slug).map((i) => (
                  <tr key={i.id} className="align-top">
                    <td className="py-3 pr-4">
                      <Link href={`/boq/items/${t.slug}#${anchor(i.id)}`} className="text-link focus-ring">{i.name}</Link>
                    </td>
                    <td className="py-3 pr-4 text-foreground-secondary">
                      {UNIT_LABEL[i.unit]}
                      {i.units?.length ? <span className="block text-xs">or {i.units.map((u) => UNIT_LABEL[u]).join(", ")}</span> : null}
                    </td>
                    <td className="py-3 text-foreground-secondary">{i.is?.map((r) => IS[r].code).join(", ") || "None"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </BoqPage>
  );
}
