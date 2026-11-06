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
  title: { absolute: "Production software for job shops: a buyer's guide" },
  description: "How production management software works for job shops and small manufacturers: choosing an ERP, QuickBooks for manufacturing, job costing and scheduling.",
  alternates: { canonical: "/manufacturing" },
  openGraph: { type: "website", url: "https://ahromlabs.com/manufacturing", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

// Each hub section heading is the buyer's question its guides answer (the group names stay as labels elsewhere).
const GROUP_QUESTIONS: Record<string, string> = {
  choosing: "How do you choose a system for a job shop or distributor?",
  quickbooks: "How do you make QuickBooks work for a manufacturer?",
  planning: "How do you plan and track the shop floor?",
  inventory: "How should a distributor control inventory?",
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
      <GuideH2>What does production management software cover?</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Everything that happens to a job between the quote and the invoice, on one record. Most small manufacturers start with QuickBooks and spreadsheets, and that works until the same job lives in
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

      <GuideH2>Which free tools can you use today?</GuideH2>
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

      <GuideH2>Where does AI help in the shop?</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        AI helps around these systems when it answers from your own records and leaves decisions to people: what&apos;s
        late, what&apos;s short, what a job cost. See{" "}
        <Link href="/ai-assistant/ai-in-erp" className="text-link focus-ring">what AI can safely do in an ERP</Link>, and{" "}
        <Link href="/ai-assistant/manufacturers" className="text-link focus-ring">Ember AI</Link>, the assistant in a
        manufacturer&apos;s system, with the questions it answers.
      </p>

      {MFG_GROUPS.map((group) => {
        const list = guides.filter((g) => g.group === group.slug);
        return list.length === 0 ? null : (
          <div key={group.slug}>
            <GuideH2>{GROUP_QUESTIONS[group.slug] ?? group.name}</GuideH2>
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
      <GuideH2>Can you see it working on sample jobs?</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Yes, in two US demos on sample companies, connected to a QuickBooks Online sandbox company. The{" "}
        <Link href="/industries/boiler-pressure-vessel-manufacturing" className="text-link focus-ring">boiler and pressure vessel</Link>{" "}
        demo shows jobs, job cards with logged time, capacity per work center and each job&apos;s cost against its plan; the{" "}
        <Link href="/industries/electronics-component-trading" className="text-link focus-ring">electronic components</Link>{" "}
        demo shows reel-level stock in two stores, reserved per customer order and checked against the PO at dispatch. Both
        are built on our{" "}
        <Link href="/services/inventory-and-reservations" className="text-link focus-ring">inventory and reservations</Link>{" "}
        work, and both leave sales tax to QuickBooks: see{" "}
        <Link href="/sales-tax" className="text-link focus-ring">US sales tax for manufacturers</Link>.
      </p>
    </ManufacturingPage>
  );
}
