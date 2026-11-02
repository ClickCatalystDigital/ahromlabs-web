import type { Metadata } from "next";
import Link from "next/link";
import { ManufacturingPage } from "@/components/ManufacturingPage";
import { GuideH2 } from "@/components/GuidePage";
import { MFG_CHECKED, MFG_GROUPS, MFG_PUBLISHED, mfgGuides } from "@/lib/manufacturing";
import { mfgPageGraph } from "@/lib/schema";
import { mfgArt } from "@/lib/manufacturing-images";

const title = "Production management software for job shops and small manufacturers";
const lead =
  "Production management software tracks an order from quote to shipped part: the job, its routing through the machines, the material it uses, the hours it takes and what it really cost. For a job shop or a plant of 10 to 200 people, the best system is the one that fits how your work moves, keeps QuickBooks for the books where it already works, and can be tested on one of your real jobs before you buy. These guides explain each piece, with free tools.";

export const metadata: Metadata = {
  title: { absolute: "Production management software for job shops: a buyer's guide" },
  description: "How production management software works for job shops and small manufacturers: choosing an ERP, QuickBooks for manufacturing, job costing and scheduling.",
  alternates: { canonical: "/manufacturing" },
  openGraph: { type: "website", url: "https://ahromlabs.com/manufacturing", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

const TOOLS = [
  { slug: "quickbooks-job-costing", title: "Job cost calculator: estimated vs actual", text: "Material, setup, run time, outside processing, scrap and rework for one job, side by side with the quote, and the hours factor to correct the next quote." },
  { slug: "production-scheduling-software", title: "Finite schedule demo", text: "Five jobs on three machines: switch to two shifts or drop in a rush order and see which jobs go late, and why." },
];

export default function ManufacturingHub() {
  const guides = mfgGuides();
  const updated = [MFG_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "Manufacturing", path: "/manufacturing" }];
  const art = mfgArt("manufacturing-hub");
  return (
    <ManufacturingPage
      graph={mfgPageGraph({ path: "/manufacturing", title, description: lead, published: MFG_PUBLISHED, updated, trail, image: art })}
      trail={trail}
      title={title}
      lead={lead}
      checked={MFG_CHECKED}
      updated={updated}
      art={art?.src}
      artAlt={art?.alt}
    >
      <GuideH2>What it covers</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Most small manufacturers start with QuickBooks and spreadsheets, and that works until the same job lives in
        four places: the quote in one file, the schedule on a whiteboard, the hours on paper travelers and the cost
        in QuickBooks weeks later. Production management software puts those on one record per job:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary">
        <li><strong className="font-medium text-foreground">Quote to job:</strong> the quoted routing, hours and material become the job, so nothing is typed twice.</li>
        <li><strong className="font-medium text-foreground">Scheduling:</strong> jobs placed on machines with real capacity, so a promised date means something.</li>
        <li><strong className="font-medium text-foreground">Stock:</strong> raw material, work in progress and finished parts, with material set aside for each job.</li>
        <li><strong className="font-medium text-foreground">Shop floor:</strong> who worked on which operation, for how long, and what was scrapped.</li>
        <li><strong className="font-medium text-foreground">Job cost:</strong> actual against estimate while the job is still open, not after month-end.</li>
        <li><strong className="font-medium text-foreground">Accounting:</strong> invoices, bills and inventory value posted to QuickBooks or another ledger.</li>
      </ul>

      <GuideH2>Free tools</GuideH2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {TOOLS.map((t) => (
          <li key={t.slug} className="py-6">
            <Link href={`/manufacturing/${t.slug}`} className="text-link focus-ring text-xl font-medium">{t.title}</Link>
            <p className="mt-2 leading-relaxed text-foreground-secondary">{t.text}</p>
          </li>
        ))}
        <li className="py-6">
          <Link href="/manufacturing/production-schedule-template" className="text-link focus-ring text-xl font-medium">Job shop schedule template for Excel</Link>
          <p className="mt-2 leading-relaxed text-foreground-secondary">Routings by machine with planned days, due-date checks and each machine&apos;s daily load against its shift hours. Free under CC BY 4.0.</p>
        </li>
        <li className="py-6">
          <a href="/manufacturing/job-cost-worked-example.xlsx" className="text-link focus-ring text-xl font-medium">Job cost workbook for Excel</a>
          <p className="mt-2 leading-relaxed text-foreground-secondary">The calculator as a spreadsheet: estimated and actual cost per job, the variance and the hours factor, with the worked example filled in. Free under CC BY 4.0.</p>
        </li>
      </ul>

      {MFG_GROUPS.map((group) => {
        const list = guides.filter((g) => g.group === group.slug);
        return list.length === 0 ? null : (
          <div key={group.slug}>
            <GuideH2>{group.name}</GuideH2>
            <p className="mt-4 leading-relaxed text-foreground-secondary">{group.intro}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {list.map((g) => (
                <li key={g.slug} className="py-6">
                  <Link href={`/manufacturing/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </ManufacturingPage>
  );
}
