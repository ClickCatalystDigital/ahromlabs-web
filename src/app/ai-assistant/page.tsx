import type { Metadata } from "next";
import Link from "next/link";
import { AiAssistantPage, aiGuides } from "@/components/AiAssistantPage";
import { GuideH2 } from "@/components/GuidePage";
import { questions, vendorTests, ASSISTANT, AI_CHECKED, AI_PUBLISHED } from "@/lib/ai-assistant";
import { aiAssistantPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "AI assistants over your business data";
const lead = "An AI assistant on your ERP or books is only useful if its numbers match the reports. The way to get that is to keep the model away from the numbers: it picks which fixed look-up answers the question, and code does the maths. Here is how to tell whether an assistant works that way, a free check for made-up numbers, the questions to ask it and the tests to run on any vendor.";

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "AI assistants for ERP and business data that never invent a number: a free hallucinated-number check, a question library and a vendor test.",
  alternates: { canonical: "/ai-assistant" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ai-assistant", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function AiAssistantHub() {
  const guides = aiGuides();
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
      <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-foreground-secondary">
        <li><strong className="font-medium text-foreground">The model only chooses.</strong> It reads the question and picks the kind of question, the look-up, the period and the names it refers to. It returns a choice, not text.</li>
        <li><strong className="font-medium text-foreground">Code does the maths.</strong> A fixed, read-only query runs with the same maths as the app&apos;s screens, so the assistant&apos;s figure and the report&apos;s are the same figure.</li>
        <li><strong className="font-medium text-foreground">Words are checked.</strong> If a sentence is written above the table, any number in it that isn&apos;t in the table gets the sentence dropped.</li>
        <li><strong className="font-medium text-foreground">It says what it can&apos;t answer.</strong> Advice, and data the system doesn&apos;t hold, get &ldquo;the data doesn&apos;t have that&rdquo;, and the misses are listed so the next look-up comes from what people asked.</li>
      </ol>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        That is how the assistants Ahrom Labs builds work: {ASSISTANT["savistar-saag"].name} at Savistar &amp; Saag,{" "}
        {ASSISTANT["ls-technologies"].name} at LS Technologies and {ASSISTANT["boiler-manufacturer"].name} at a boiler
        manufacturer, each on its own system&apos;s records and words. The full design is in{" "}
        <Link href="/notes/assistant-that-answers-from-your-ledger" className="text-link focus-ring">
          an assistant that only answers from your own records
        </Link>
        .
      </p>

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
