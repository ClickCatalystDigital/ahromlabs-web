import type { Metadata } from "next";
import Link from "next/link";
import { AiAssistantPage } from "@/components/AiAssistantPage";
import { GuideH2 } from "@/components/GuidePage";
import { QuestionList } from "@/components/QuestionList";
import { questions, AI_CHECKED, AI_PUBLISHED, AI_VERSION, INDUSTRY_LABEL } from "@/lib/ai-assistant";
import type { Industry } from "@/lib/erp";
import { aiAssistantPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "Questions to ask an AI assistant over your business data";
const lead = `${questions.length} questions owners and staff ask an assistant built on their own records, by industry and role. For each: what should answer it, what to compare the answer with, and whether Ahrom Labs' assistants answer it today. Some should be refused, and a good assistant refuses them.`;

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "Questions to ask an AI assistant over your ERP or business data, by industry and role, with what should answer each one and how to check the answer.",
  alternates: { canonical: "/ai-assistant/questions" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ai-assistant/questions", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

const ORDER: Industry[] = ["projects", "trading", "manufacturing"];

export default function AiQuestionsPage() {
  const trail = [
    { name: "AI assistants", path: "/ai-assistant" },
    { name: "Questions", path: "/ai-assistant/questions" },
  ];
  return (
    <AiAssistantPage
      graph={aiAssistantPageGraph({ path: "/ai-assistant/questions", title, description: lead, published: AI_PUBLISHED, updated: AI_CHECKED, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={AI_CHECKED}
      updated={AI_CHECKED}
      headings={ORDER.map((i) => INDUSTRY_LABEL[i])}
    >
      <p className="leading-relaxed text-foreground-secondary">
        Ask these in a vendor&apos;s demo with your own data, and compare each answer with the screen or report named
        under it; the <Link href="/ai-assistant/number-check" className="text-link focus-ring">number check</Link> does
        the comparison for written answers. The same questions with a pass and fail column per vendor are in the{" "}
        <a href="/ai-assistant/vendor-test.csv" className="text-link focus-ring" data-track="ai_test_sheet_download" download>test sheet for Excel</a>.
      </p>
      <p className="mt-4 text-sm text-foreground-secondary">
        Version {AI_VERSION}. Free to reuse under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/" className="text-link focus-ring" rel="license">CC BY 4.0</a>, with credit to
        Ahrom Labs. As data: <a href="/ai-assistant/questions.json" className="text-link focus-ring">JSON</a> ·{" "}
        <a href="/ai-assistant/questions.csv" className="text-link focus-ring" data-track="ai_questions_download" download>CSV</a>. Cite as: Ahrom Labs,
        &ldquo;AI assistant question library for business systems&rdquo;, version {AI_VERSION}, ahromlabs.com/ai-assistant/questions.
      </p>
      {ORDER.map((i) => (
        <section key={i}>
          <GuideH2>{INDUSTRY_LABEL[i]}</GuideH2>
          <QuestionList industry={i} />
        </section>
      ))}
    </AiAssistantPage>
  );
}
