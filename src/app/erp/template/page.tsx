import type { Metadata } from "next";
import Link from "next/link";
import { ErpPage } from "@/components/ErpPage";
import { GuideH2 } from "@/components/GuidePage";
import { requirements, departments, ERP_CHECKED, ERP_PUBLISHED, PRIORITY_LABEL } from "@/lib/erp";
import { erpPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

// The template as a page, not just a file: "erp requirements template excel" is what people search,
// and Google ranks a page that shows the format. The file is generated from src/lib/erp.ts by
// scripts/build-erp-template.py, so it can't drift from the checklist.

const title = "ERP requirements template in Excel: free RFP and scorecard";
const lead = `A free ERP requirements template in Excel with ${requirements.length} requirements in ${departments.length} departments, each with the test a vendor must pass. Set your priorities, send it to vendors, fill in their answers, and the sheet scores them for you.`;

export const metadata: Metadata = {
  title: seoTitle(title),
  description: `Free ERP requirements template (Excel) for Indian manufacturers and traders: ${requirements.length} testable requirements, priority and vendor-answer dropdowns, automatic vendor scoring.`,
  alternates: { canonical: "/erp/template" },
  openGraph: { type: "website", url: "https://ahromlabs.com/erp/template", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

const COLUMNS: [string, string][] = [
  ["Department", "Which part of the business the line belongs to, so each head can review their own section."],
  ["Requirement", "One sentence you could paste into a contract. Written to be tested, not admired."],
  ["Priority", "Must, Should or Could, as a dropdown. Set it before vendors see the sheet, so their answers can't shape it."],
  ["What the vendor must show", "The demo test. A vendor who says yes should be able to do this in front of you."],
  ["Law", "For statutory lines, the provision that requires it. The quoted text is on the checklist page."],
  ["Vendor answer", "Yes, Partly or No, as a dropdown. A yes you haven't seen demonstrated counts as partly."],
  ["Vendor evidence", "Where they showed it: the demo, a screenshot, a reference customer."],
  ["Score", "Priority weight (Must 3, Should 2, Could 1) times the answer (Yes 1, Partly 0.5, No 0). The total and the percentage are at the foot."],
  ["Requirement id", "Matches the line on ahromlabs.com/erp/requirements, so you can look up why it is there."],
];

export default function ErpTemplatePage() {
  const trail = [
    { name: "ERP requirements", path: "/erp" },
    { name: "Excel template", path: "/erp/template" },
  ];
  const preview = departments.map((d) => requirements.find((r) => r.dept === d.slug)!);
  return (
    <ErpPage
      graph={erpPageGraph({ path: "/erp/template", title, description: lead, published: ERP_PUBLISHED, updated: ERP_CHECKED, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={ERP_CHECKED}
      updated={ERP_CHECKED}
      headings={["Download", "The columns, and why each is there", "What it looks like", "How to run a vendor evaluation with it"]}
    >
      <GuideH2>Download</GuideH2>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a href="/erp/erp-requirements-template.xlsx" className="subscribe-submit focus-ring inline-block" download>
          Download the Excel template
        </a>{" "}
        <a href="/erp/erp-requirements-template.csv" className="text-link focus-ring" download>CSV version</a>{" "}
        <span className="text-sm text-foreground-secondary">
          Free under{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" className="text-link focus-ring" rel="license">CC BY 4.0</a>, with credit to Ahrom Labs.
        </span>
      </div>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        All {requirements.length} lines are in the file. To start from only the lines that apply to your business (by
        industry, turnover and whether Tally stays), use the <Link href="/erp/check" className="text-link focus-ring">requirements builder</Link>.
      </p>

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
        The first line of each department, as it appears in the file. Every line, with why it matters and what goes wrong
        without it, is on the <Link href="/erp/requirements" className="text-link focus-ring">checklist</Link>.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-foreground-secondary">
            <tr>
              <th className="py-2 pr-4 font-medium">Requirement</th>
              <th className="py-2 pr-4 font-medium">Priority</th>
              <th className="py-2 font-medium">What the vendor must show</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            {preview.map((r) => (
              <tr key={r.id}>
                <td className="py-3 pr-4">
                  <Link href={`/erp/requirements#${r.id.replace(/\./g, "-")}`} className="text-link focus-ring mb-1 block text-xs font-medium uppercase tracking-wide">
                    {departments.find((d) => d.slug === r.dept)!.name}
                  </Link>{" "}
                  <span className="text-foreground">{r.text}</span>
                </td>
                <td className="py-3 pr-4 text-foreground-secondary">{PRIORITY_LABEL[r.priority]}</td>
                <td className="py-3 text-foreground-secondary">{r.test}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GuideH2>How to run a vendor evaluation with it</GuideH2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-foreground-secondary">
        <li>Delete what doesn&apos;t apply and set every priority before any vendor sees the sheet.</li>
        <li>Send the same sheet to every vendor and ask for Yes, Partly or No on each line, with evidence.</li>
        <li>
          In the demo, pick the Must lines and ask the vendor to do each test in front of you. The{" "}
          <Link href="/erp/requirements" className="text-link focus-ring">checklist</Link> lists them line by line.
        </li>
        <li>Mark any yes you didn&apos;t see as partly, then compare the scores.</li>
        <li>Keep the sheet: the same tests are the acceptance tests before you sign off go-live.</li>
      </ol>
    </ErpPage>
  );
}
