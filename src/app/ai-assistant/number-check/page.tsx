import type { Metadata } from "next";
import Link from "next/link";
import { AiAssistantPage } from "@/components/AiAssistantPage";
import { GuideH2 } from "@/components/GuidePage";
import { NumberCheck } from "@/components/NumberCheck";
import { AI_CHECKED, AI_PUBLISHED, ASSISTANT } from "@/lib/ai-assistant";
import { aiAssistantPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "Check an AI answer for made-up numbers";
const lead = "Paste what an AI assistant said and the report or table it should have answered from. Every number in the answer that isn't in the data is marked: a total it added up, a share it worked out, a figure it rounded or invented. It runs in your browser; nothing is sent anywhere.";

const image = { src: "/ai/ai-number-check.webp", alt: "A magnifying glass resting on a ruled ledger sheet.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "Free check for AI hallucinated numbers: paste an answer and its source data; every figure not in the data is marked. Understands ₹, lakh and crore.",
  alternates: { canonical: "/ai-assistant/number-check" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ai-assistant/number-check", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function NumberCheckPage() {
  const trail = [
    { name: "AI assistants", path: "/ai-assistant" },
    { name: "Number check", path: "/ai-assistant/number-check" },
  ];
  return (
    <AiAssistantPage
      graph={aiAssistantPageGraph({ path: "/ai-assistant/number-check", title, description: lead, published: AI_PUBLISHED, updated: AI_CHECKED, trail, image, app: true })}
      trail={trail}
      title={title}
      lead={lead}
      art={image.src}
      checked={AI_CHECKED}
      updated={AI_CHECKED}
    >
      <NumberCheck />

      <GuideH2>How the check works</GuideH2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground-secondary">
        <li>
          <strong className="font-medium text-foreground">Any format.</strong> ₹8,72,020, 872020 and 8.7202 lakh are the
          same number; so are 1.2 crore and 1,20,00,000. Commas, the rupee sign and spaces are ignored.
        </li>
        <li>
          <strong className="font-medium text-foreground">No rounding.</strong> &ldquo;About ₹12.4 lakh&rdquo; against
          ₹12,43,500 is marked. A rounded figure is one the assistant made (a mild{" "}
          <Link href="/systems/ai-hallucination" className="text-link focus-ring">hallucination</Link>), and the owner should see the real one.
        </li>
        <li>
          <strong className="font-medium text-foreground">Whole numbers only.</strong> 25 doesn&apos;t count as found
          because 1,250 is in the data.
        </li>
        <li>
          <strong className="font-medium text-foreground">Single digits are skipped</strong> (&ldquo;3 invoices&rdquo;,
          &ldquo;on 2 Oct&rdquo;): too common to tell anything.
        </li>
      </ul>

      <GuideH2>Where the rule comes from</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        It is a <Link href="/systems/grounding-check" className="text-link focus-ring">grounding check</Link>, the one{" "}
        {ASSISTANT["savistar-saag"].name}, the assistant in {ASSISTANT["savistar-saag"].system}, runs
        before it shows a written line: if the sentence contains a number that isn&apos;t in the table, the sentence is
        dropped and only the table is shown. The figures themselves come from fixed look-ups in code, never from the model.
        How that works is in{" "}
        <Link href="/notes/assistant-that-answers-from-your-ledger" className="text-link focus-ring">
          an assistant that only answers from your own records
        </Link>
        . To use the check on a vendor, run it on the answers you collect with the{" "}
        <Link href="/ai-assistant/vendor-test" className="text-link focus-ring">vendor test</Link>.
      </p>
    </AiAssistantPage>
  );
}
