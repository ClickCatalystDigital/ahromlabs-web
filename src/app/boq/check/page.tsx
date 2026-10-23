import type { Metadata } from "next";
import { BoqPage } from "@/components/BoqPage";
import { GuideH2 } from "@/components/GuidePage";
import { BoqCheck } from "@/components/BoqCheck";
import { boqItems, trades, BOQ_CHECKED, BOQ_PUBLISHED } from "@/lib/boq";
import { boqPageGraph } from "@/lib/schema";

const title = "Interior BOQ checker and quotation maker";
const lead = `Paste a BOQ from Excel. Each line is matched against ${boqItems.length} interior items in ${trades.length} trades and flagged where it leaves the board grade, thickness, finish, hardware, unit or measurement basis open, the gaps that let two contractors price the same line differently. Then add rates and GST and print it as a quotation. It runs in your browser; nothing is uploaded.`;

const image = { src: "/boq/interior-boq-checker.webp", alt: "A magnifying glass over a ruled list, with two of its rows marked by small flags.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title,
  description: "Free interior BOQ checker: paste from Excel, see missing specs and wrong units per line, then print a GST quotation. Runs in your browser.",
  alternates: { canonical: "/boq/check" },
  openGraph: { type: "website", url: "https://ahromlabs.com/boq/check", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function BoqCheckPage() {
  const trail = [
    { name: "Interior BOQ", path: "/boq" },
    { name: "Checker", path: "/boq/check" },
  ];
  return (
    <BoqPage
      graph={boqPageGraph({ path: "/boq/check", title, description: lead, published: BOQ_PUBLISHED, updated: BOQ_CHECKED, trail, image, app: true })}
      trail={trail}
      title={title}
      lead={lead}
      checked={BOQ_CHECKED}
      art={image.src}
      updated={BOQ_CHECKED}
    >
      <BoqCheck />

      <div className="print:hidden">
        <GuideH2>What it checks, and what it doesn&apos;t</GuideH2>
        <p className="mt-4 leading-relaxed text-foreground-secondary">
          Each line is matched to an item by the words that name it, then checked against that item&apos;s entry in the
          item library: the specifications the line must name, the units it is priced in, and, for modular work with no
          measurement standard, whether the line says how it was measured. The checks are fixed rules, not AI, so the
          same BOQ always gets the same result.
        </p>
        <p className="mt-4 leading-relaxed text-foreground-secondary">
          It does not judge rates, quantities or whether a specification is a good one, and a line it can&apos;t match
          gets only the basic checks. GST is arithmetic on the rate you enter; whether interior work is a works
          contract or a supply of goods is a question for your CA.
        </p>
      </div>
    </BoqPage>
  );
}
