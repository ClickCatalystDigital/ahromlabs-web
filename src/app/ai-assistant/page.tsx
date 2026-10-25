import type { Metadata } from "next";
import Link from "next/link";
import { AiAssistantPage, aiGuides } from "@/components/AiAssistantPage";
import { GuideH2 } from "@/components/GuidePage";
import { questions, questionsFor, liveCount, vendorTests, ASSISTANT, SYSTEM_OF, INDUSTRY_LABEL, AI_CHECKED, AI_PUBLISHED } from "@/lib/ai-assistant";
import type { Industry } from "@/lib/erp";
import { aiAssistantPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "AI assistants over your business data";
const INDUSTRIES: { slug: string; industry: Industry }[] = [
  { slug: "manufacturers", industry: "manufacturing" },
  { slug: "trading-distribution", industry: "trading" },
  { slug: "interior-design-firms", industry: "projects" },
];
const lead = "An AI assistant on your ERP or books is only useful if its numbers match the reports. The way to get that is to keep the model away from the numbers: it picks which fixed look-up answers the question, and code does the maths. Here is how to tell whether an assistant works that way, a free check for made-up numbers, the questions to ask it and the tests to run on any vendor.";

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "AI assistants for ERP and business data that never invent a number: a free hallucinated-number check, a question library and a vendor test.",
  alternates: { canonical: "/ai-assistant" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ai-assistant", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function AiAssistantHub() {
  const guides = aiGuides().filter((g) => !INDUSTRIES.some((i) => i.slug === g.slug)); // industry guides are under By business
  const updated = [AI_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "AI assistants", path: "/ai-assistant" }];
  const tools = [
    { href: "/ai-assistant/number-check", title: "Check an AI answer for made-up numbers", text: "Paste what the assistant said and the report it should have used. Every number that isn't in the report is marked. Nothing leaves your browser." },
    { href: "/ai-assistant/questions", title: "Questions to ask an AI assistant", text: `${questions.length} questions by industry and role, each with what should answer it and what to check it against, including the ones a good assistant refuses. Free under CC BY 4.0, also as JSON.` },
    { href: "/ai-assistant/vendor-test", title: "How to test an AI assistant before you buy it", text: `${vendorTests.length} tests for any vendor's demo, with pass and fail for each and a test sheet for Excel.` },
  ];

  return (
    <AiAssistantPage
      graph={aiAssistantPageGraph({ path: "/ai-assistant", title, description: lead, published: AI_PUBLISHED, updated, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={AI_CHECKED}
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
      </ul>

      <GuideH2>Why assistants get numbers wrong</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Most assistants on business data do one of two things: the model writes a database query, or it reads rows and
        summarises them. Both let the model produce the figure, and sooner or later it produces one that is nearly right:
        a total that misses a credit note, a share worked out from the wrong base, a figure rounded to look tidy. In a
        business system one wrong number is enough for nobody to trust the assistant again.
      </p>

      <GuideH2>How an assistant should answer</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Keep the model away from the figures. A small model only chooses which question is being asked; code runs a
        fixed, read-only look-up with the same maths as the screens; a written sentence with any number that isn&apos;t
        in the result is dropped; and what the data can&apos;t answer gets &ldquo;the data doesn&apos;t have that&rdquo;.
        The four steps, for buyers, are in{" "}
        <Link href="/ai-assistant/how-it-works" className="text-link focus-ring">how an AI assistant answers from your records</Link>
        ; the engineering note is{" "}
        <Link href="/notes/assistant-that-answers-from-your-ledger" className="text-link focus-ring">
          an assistant that only answers from your own records
        </Link>
        .
      </p>

      <GuideH2>By business</GuideH2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {INDUSTRIES.map(({ slug, industry }) => {
          const a = ASSISTANT[SYSTEM_OF[industry]];
          return (
            <li key={slug} className="py-6">
              <Link href={`/ai-assistant/${slug}`} className="text-link focus-ring text-xl font-medium">{INDUSTRY_LABEL[industry]}</Link>
              <p className="mt-2 leading-relaxed text-foreground-secondary">
                {a.name}, at {a.system}: {liveCount(industry)} of its {questionsFor(industry).length} questions answered today.
              </p>
            </li>
          );
        })}
      </ul>

      {guides.length > 0 && (
        <>
          <GuideH2>Guides</GuideH2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {guides.map((g) => (
              <li key={g.slug} className="py-6">
                <Link href={`/ai-assistant/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </AiAssistantPage>
  );
}
