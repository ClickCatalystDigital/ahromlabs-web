import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, type Hub } from "@/components/GuidePage";
import { formatDate, getContent } from "@/lib/content";
import { AI_CHECKED, ASSISTANT, DEMO_URL } from "@/lib/ai-assistant";
import { ERP_DOCS } from "@/lib/erp";

// The /ai-assistant hub: its byline, the number check, the demo and its boundary, on the shared frame in
// GuidePage (as ErpPage does for /erp).

// Guides in reading order; any guide not listed still shows, after these.
const GUIDE_ORDER = ["how-it-works", "data-safety", "interior-design-firms", "manufacturers", "trading-distribution"];
export function aiGuides() {
  const rank = (s: string) => GUIDE_ORDER.indexOf(s) + 1 || GUIDE_ORDER.length + 1;
  return [...getContent("ai-assistant")].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const AI_HUB: Hub = {
  path: "/ai-assistant",
  linksTitle: "AI assistant guides and tools",
  links: () => [
    { href: "/ai-assistant/number-check", title: "Check an AI answer for made-up numbers" },
    { href: "/ai-assistant/questions", title: "Questions to ask an AI assistant over your business data" },
    { href: "/ai-assistant/vendor-test", title: "How to test an AI assistant before you buy it" },
    ...aiGuides().map((g) => ({ href: `/ai-assistant/${g.slug}`, title: g.title })),
  ],
  byline: (checked) => (
    <>
      Checked against the assistants&apos; own code on <time dateTime={checked}>{formatDate(checked)}</time>
    </>
  ),
  sources: [{ title: ERP_DOCS["dpdp-act-2023"].title, publisher: ERP_DOCS["dpdp-act-2023"].publisher, url: ERP_DOCS["dpdp-act-2023"].url, date: AI_CHECKED }],
  cta: (
    <>
      <p className="text-lg text-foreground">
        Paste an assistant&apos;s answer and the report it should come from, and see every number that isn&apos;t in the report.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href="/ai-assistant/number-check" className="subscribe-submit focus-ring inline-block">
          Check an answer
        </Link>{" "}
        <span className="text-sm text-foreground-secondary">Free. Runs in your browser; nothing is sent anywhere.</span>
      </div>
      <p className="mt-4 text-sm text-foreground-secondary">
        Ask {ASSISTANT["savistar-saag"].name} two questions on the{" "}
        <a href={DEMO_URL["savistar-saag"]} className="text-link focus-ring">interiors demo</a>
        {" · "}
        <Link href="/services/custom-ai-assistant" className="text-link focus-ring">how Ahrom Labs builds assistants</Link>
      </p>
    </>
  ),
  boundary: (updated) => (
    <>
      A guide written by Ahrom Labs from the assistants it runs. What each assistant answers is stated as it stood on the
      date checked; a vendor&apos;s assistant should be judged by the tests, not by this page. Not legal advice on data
      protection. Last updated <time dateTime={updated}>{formatDate(updated)}</time>.
    </>
  ),
  quotesLabel: "Quoted from the official text",
};

export const AiAssistantPage = (props: Omit<ComponentProps<typeof GuidePage>, "hub">) => <GuidePage hub={AI_HUB} {...props} />;
