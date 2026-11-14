import type { ComponentProps } from "react";
import Link from "next/link";
import { GuidePage, type Hub } from "@/components/GuidePage";
import { formatDate, getContent } from "@/lib/content";
import { ASSISTANT, DEMO_URL } from "@/lib/ai-assistant";

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
  // No hub-wide source: these pages serve India and North America alike. India's DPDP Act is cited where it applies (data-safety).
  sources: [],
  cta: (
    <>
      <p className="text-lg text-foreground">
        Ask an assistant about a sample company&apos;s stock, dues, delays and margins, then ask us to put one on your own
        records, usable from ChatGPT and Claude too.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href="/ai-assistant/episodes" className="subscribe-submit focus-ring inline-block">
          Watch and try the assistants
        </Link>{" "}
        <a href="https://calendar.app.google/CuiiSRtJbheEV2U4A" className="text-link focus-ring" rel="noopener">
          Book a 30-minute call
        </a>
      </div>
      <p className="mt-4 text-sm text-foreground-secondary">
        Try one now:{" "}
        <a href={DEMO_URL["boiler-manufacturer"]} className="text-link focus-ring">{ASSISTANT["boiler-manufacturer"].name}</a>
        {" · "}
        <a href={DEMO_URL["ls-technologies"]} className="text-link focus-ring">{ASSISTANT["ls-technologies"].name}</a>
        {" · "}
        <a href={DEMO_URL["savistar-saag"]} className="text-link focus-ring">{ASSISTANT["savistar-saag"].name}</a>
        {" · "}
        <a href={DEMO_URL["construction-company"]} className="text-link focus-ring">{ASSISTANT["construction-company"].name}</a>
        {" · "}
        <Link href="/ai-assistant/number-check" className="text-link focus-ring">check any assistant&apos;s answer for made-up numbers</Link>
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
