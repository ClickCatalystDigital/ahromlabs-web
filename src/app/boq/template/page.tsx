import type { Metadata } from "next";
import Link from "next/link";
import { BoqPage } from "@/components/BoqPage";
import { GuideH2 } from "@/components/GuidePage";
import { boqItems, trades, tradeItems, UNIT_LABEL, BOQ_CHECKED, BOQ_PUBLISHED } from "@/lib/boq";
import { boqPageGraph } from "@/lib/schema";

// The template as a page, not just a file: "interior boq format excel" is what people search, and
// Google ranks a page that shows the format, not a download link. The preview rows come from the
// same item library the file is generated from (scripts/build-boq-template.py).

const title = "Interior BOQ format in Excel: free template";
const lead = `A free interior BOQ template in Excel with ${boqItems.length} common items in ${trades.length} trades, each line already written with its unit and how it is measured. Fill the values in brackets, add quantities and rates; the amount and total formulas are in place. Why there are no rates, and how to build them, is below.`;
const image = { src: "/boq/interior-boq-template-clipboard.webp", alt: "A clipboard holding a blank ruled table with a header row, and a pencil beside it.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title,
  description: "Free interior BOQ format in Excel: 41 ready lines in 9 trades with units, measurement basis and formulas. Download, fill the brackets, add rates.",
  alternates: { canonical: "/boq/template" },
  openGraph: { type: "website", url: "https://ahromlabs.com/boq/template", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

const COLUMNS: [string, string][] = [
  ["S.No", "Line number, running through the whole BOQ."],
  ["Description", "What the item is, what it is made of, its size and finish. Each line starts from the library wording; replace the values in [brackets]."],
  ["Unit", "What the line is priced in: sq ft, running ft, nos, point or lump sum. Keep one unit per item type across the BOQ, or quotes can't be compared."],
  ["Measurement basis", "How the quantity was measured, e.g. “front elevation, loft excluded”. Modular work has no national measurement standard, so this column is where disputes are prevented."],
  ["Qty", "From the drawings, in the line's unit."],
  ["Rate", "Left empty: filled by whoever prices it."],
  ["Amount", "Qty × rate, already a formula; the total row sums it."],
  ["Item id", "The line's id in the item library (e.g. wardrobes.hinged), so a pasted BOQ can be matched back to it."],
];

export default function BoqTemplatePage() {
  const trail = [
    { name: "Interior BOQ", path: "/boq" },
    { name: "Excel template", path: "/boq/template" },
  ];
  // A few lines from each trade, exactly as the file has them.
  const preview = trades.flatMap((t) => tradeItems(t.slug).slice(0, 2).map((i) => ({ trade: t, item: i })));

  return (
    <BoqPage
      graph={boqPageGraph({ path: "/boq/template", title, description: lead, published: BOQ_PUBLISHED, updated: BOQ_CHECKED, trail, image })}
      trail={trail}
      title={title}
      lead={lead}
      art={image.src}
      checked={BOQ_CHECKED}
      updated={BOQ_CHECKED}
      headings={["Download", "The columns, and why each is there", "What it looks like", "Why there are no rates", "After you fill it"]}
    >
      <GuideH2>Download</GuideH2>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a href="/boq/interior-boq-template.xlsx" className="subscribe-submit focus-ring inline-block" download>
          Download the Excel template
        </a>{" "}
        <a href="/boq/interior-boq-template.csv" className="text-link focus-ring" download>CSV version</a>{" "}
        <span className="text-sm text-foreground-secondary">
          One sheet, grouped by trade. Free under{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" className="text-link focus-ring" rel="license">CC BY 4.0</a>, with credit to Ahrom Labs.
        </span>
      </div>

      <GuideH2>The columns, and why each is there</GuideH2>
      <dl className="mt-6 space-y-4">
        {COLUMNS.map(([name, why]) => (
          <div key={name}>
            <dt className="font-medium text-foreground">{name}</dt>
            <dd className="mt-1 leading-relaxed text-foreground-secondary">{why}</dd>
          </div>
        ))}
      </dl>

      <GuideH2>What it looks like</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Two lines from each trade, as they appear in the file. The full list, with what each line must name and what
        quotes leave out, is in the <Link href="/boq/items" className="text-link focus-ring">item library</Link>.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-foreground-secondary">
            <tr>
              <th className="py-2 pr-4 font-medium">Description</th>
              <th className="py-2 pr-4 font-medium">Unit</th>
              <th className="py-2 font-medium">Measurement basis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            {preview.map(({ trade, item }, i) => (
              <tr key={item.id}>
                <td className="py-3 pr-4">
                  {(i === 0 || preview[i - 1].trade.slug !== trade.slug) && (
                    <Link href={`/boq/items/${trade.slug}`} className="text-link focus-ring mb-1 block text-xs font-medium uppercase tracking-wide">{trade.name}</Link>
                  )}{" "}
                  <span className="font-mono text-xs text-foreground">{item.description}</span>
                </td>
                <td className="py-3 pr-4 text-foreground-secondary">{UNIT_LABEL[item.unit]}</td>
                <td className="py-3 text-foreground-secondary">{item.measure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GuideH2>Why there are no rates</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Rates for the same line differ by city, by month and by the specification in it: 18 mm BWP plywood with acrylic
        shutters and 16 mm MR plywood with laminate are both &ldquo;kitchen base cabinets&rdquo;. A template with rates
        filled in would be wrong for most readers the day they used it. Build a rate from its parts, material, labour,
        wastage, overheads and margin (a <Link href="/boq/what-is-a-boq" className="text-link focus-ring">rate analysis</Link>),
        or have contractors price the same lines so their quotes can be compared.
      </p>

      <GuideH2>After you fill it</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Paste the filled sheet into the <Link href="/boq/check" className="text-link focus-ring">BOQ checker</Link>: it
        flags lines that leave the board grade, thickness, finish, hardware, unit or measurement basis open, then prints
        the BOQ as a GST quotation. How to write the lines in the first place is in{" "}
        <Link href="/boq/how-to-make-an-interior-boq" className="text-link focus-ring">how to make an interior BOQ</Link>, and
        how each trade is measured in <Link href="/boq/measurement-rules" className="text-link focus-ring">measurement rules</Link>.
      </p>
    </BoqPage>
  );
}
