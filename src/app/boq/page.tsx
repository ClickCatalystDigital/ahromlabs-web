import type { Metadata } from "next";
import Link from "next/link";
import { BoqPage, boqGuides } from "@/components/BoqPage";
import { GuideH2 } from "@/components/GuidePage";
import { boqItems, trades, tradeItems, BOQ_CHECKED, BOQ_PUBLISHED } from "@/lib/boq";
import { boqPageGraph } from "@/lib/schema";

const title = "Interior BOQ format, Excel template and free checker";
const lead = `How to write a bill of quantities for interior work in India that two contractors would price the same way: ${boqItems.length} common items across ${trades.length} trades with the unit each is priced in, how it is measured, the Indian Standards that apply and what every line must name, plus a free checker that reads your BOQ straight from Excel.`;

const image = { src: "/boq/interior-boq-measuring.webp", alt: "A tape measure with its blade drawn out across a ruled sheet, a pencil beside it.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title,
  description: "Interior BOQ format in Excel, free: 41 ready lines with units, IS standards and measurement rules, guides, and a checker that flags vague lines.",
  alternates: { canonical: "/boq" },
  openGraph: { type: "website", url: "https://ahromlabs.com/boq", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function BoqHub() {
  const guides = boqGuides();
  const updated = [BOQ_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "Interior BOQ", path: "/boq" }];
  const tools = [
    { href: "/boq/check", title: "Check a BOQ and turn it into a quotation", text: "Paste rows from Excel. Each line is matched to the item library and flagged where it leaves the material, size, finish, unit or measurement open. Then add rates and GST and print it. Nothing leaves your browser." },
    { href: "/boq/items", title: "Interior BOQ item library", text: `${boqItems.length} items in ${trades.length} trades: unit, how it's measured, the Indian Standard that applies, what the line must name, what quotes leave out, and a line you can paste.` },
  ];

  return (
    <BoqPage
      graph={boqPageGraph({ path: "/boq", title, description: lead, published: BOQ_PUBLISHED, updated, trail, image })}
      trail={trail}
      title={title}
      lead={lead}
      checked={BOQ_CHECKED}
      art={image.src}
      updated={updated}
    >
      <GuideH2>Tools</GuideH2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {tools.map((t) => (
          <li key={t.href} className="py-6">
            <Link href={t.href} className="text-link focus-ring text-xl font-medium">{t.title}</Link>
            <p className="mt-2 leading-relaxed text-foreground-secondary">{t.text}</p>
          </li>
        ))}
        <li className="py-6">
          <Link href="/boq/template" className="text-link focus-ring text-xl font-medium">Interior BOQ format in Excel</Link>
          <p className="mt-2 leading-relaxed text-foreground-secondary">
            Every item in the library as a blank BOQ, one sheet, grouped by trade, with a measurement-basis column and
            the amount and total formulas in place. What each column is for, and why there are no rates.
          </p>
        </li>
      </ul>

      {guides.length > 0 && (
        <>
          <GuideH2>Guides</GuideH2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {guides.map((g) => (
              <li key={g.slug} className="py-6">
                <Link href={`/boq/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <GuideH2>Items by trade</GuideH2>
      <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 text-foreground-secondary sm:grid-cols-2">
        {trades.map((t) => (
          <li key={t.slug}>
            <Link href={`/boq/items/${t.slug}`} className="text-link focus-ring font-medium">{t.name}</Link>{" "}
            <span className="block text-sm">{tradeItems(t.slug).length} items. {t.summary}</span>
          </li>
        ))}
      </ul>
    </BoqPage>
  );
}
