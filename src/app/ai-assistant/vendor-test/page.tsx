import type { Metadata } from "next";
import Link from "next/link";
import { AiAssistantPage } from "@/components/AiAssistantPage";
import { GuideH2 } from "@/components/GuidePage";
import { vendorTests, AI_CHECKED, AI_PUBLISHED } from "@/lib/ai-assistant";
import { aiAssistantPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "How to test an AI assistant before you buy it";
const lead = `${vendorTests.length} tests to run in any vendor's demo, on your own data: does a figure match the report, does it invent numbers, does it say when the data doesn't have the answer, does it respect who may see what, and can it change anything on its own. A yes you didn't see demonstrated is a no.`;

const image = { src: "/ai/ai-vendor-test.webp", alt: "A brass balance scale with two empty pans, level.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "How to evaluate an AI assistant for your ERP or business data: 12 tests to run in a vendor demo, with pass and fail for each and a test sheet for Excel.",
  alternates: { canonical: "/ai-assistant/vendor-test" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ai-assistant/vendor-test", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function VendorTestPage() {
  const trail = [
    { name: "AI assistants", path: "/ai-assistant" },
    { name: "Vendor test", path: "/ai-assistant/vendor-test" },
  ];
  return (
    <AiAssistantPage
      graph={aiAssistantPageGraph({ path: "/ai-assistant/vendor-test", title, description: lead, published: AI_PUBLISHED, updated: AI_CHECKED, trail, image })}
      trail={trail}
      title={title}
      lead={lead}
      art={image.src}
      checked={AI_CHECKED}
      updated={AI_CHECKED}
      headings={["Before the demo", "The tests", "After the demo"]}
    >
      <GuideH2>Before the demo</GuideH2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground-secondary">
        <li>Ask for the demo on a copy of your own data, not the vendor&apos;s sample company. Sample data is chosen to work.</li>
        <li>Print the report each figure question should match: a month&apos;s sales, the unpaid invoices, stock of one item.</li>
        <li>
          Pick your questions from the <Link href="/ai-assistant/questions" className="text-link focus-ring">question library</Link>,
          or download the <a href="/ai-assistant/vendor-test.csv" className="text-link focus-ring" data-track="ai_test_sheet_download" download>test sheet</a>{" "}
          with every test and question and a pass/fail column for three vendors.
        </li>
        <li>Bring two logins: an owner and a junior staff member.</li>
      </ul>

      <GuideH2>The tests</GuideH2>
      <ol className="mt-6 space-y-8">
        {vendorTests.map((t, i) => (
          <li key={t.id} id={t.id} className="scroll-mt-24 border-t border-line pt-5">
            <h3 className="text-lg font-medium text-foreground">{i + 1}. {t.title}</h3>
            <dl className="mt-3 space-y-2 text-sm leading-relaxed">
              <div>
                <dt className="font-medium text-foreground">Do this</dt>
                <dd className="text-foreground-secondary">{t.ask}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Pass</dt>
                <dd className="text-foreground-secondary">{t.pass}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Fail</dt>
                <dd className="text-foreground-secondary">{t.fail}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <GuideH2>After the demo</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Paste the written answers you collected, with the report each should match, into the{" "}
        <Link href="/ai-assistant/number-check" className="text-link focus-ring">number check</Link>. Ask for the answer to
        test 11 in writing, and put it in the contract: what is sent, to whom, on whose key, with what daily limit. The{" "}
        <Link href="/ai-assistant/data-safety" className="text-link focus-ring">data safety guide</Link> explains what a good
        answer looks like; the same tests sit in the{" "}
        <Link href="/erp/requirements#reporting-and-ai" className="text-link focus-ring">ERP requirements checklist</Link>{" "}
        if the assistant comes with a new system.
      </p>
    </AiAssistantPage>
  );
}
