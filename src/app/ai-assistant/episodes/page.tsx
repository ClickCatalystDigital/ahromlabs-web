import type { Metadata } from "next";
import Link from "next/link";
import { AiAssistantPage } from "@/components/AiAssistantPage";
import { GuideH2 } from "@/components/GuidePage";
import { EpisodeList } from "@/components/EpisodeList";
import { AssistantMark } from "@/components/AssistantMark";
import { ASSISTANT, AI_CHECKED, AI_PUBLISHED, type System } from "@/lib/ai-assistant";
import { episodes, EPISODE_PAGE } from "@/lib/episodes";
import { aiAssistantPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "AI assistant episodes: one business question each";
const lead = `${episodes.length} short episodes, ten per assistant, each one question a business owner or manager asks every week, answered on a public demo from a made-up company's records. Every question is in the library, and you can ask it yourself on the demo.`;
const ORDER: System[] = ["boiler-manufacturer", "ls-technologies", "savistar-saag", "construction-company"];
const image = { src: "/ai/ai-episodes.webp", alt: "Four film canisters, one open, beside a phone on a small stand: the assistants' episode series.", width: 1086, height: 362 };
const updated = [AI_CHECKED, ...episodes.map((x) => x.published ?? "")].sort().at(-1)!;

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "Short episodes of Ember AI, Ohm AI, Atelier AI and Datum AI answering real business questions on public demos: stock, dues, delays, margins and refusals.",
  alternates: { canonical: "/ai-assistant/episodes" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ai-assistant/episodes", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function EpisodesPage() {
  const trail = [
    { name: "AI assistants", path: "/ai-assistant" },
    { name: "Episodes", path: "/ai-assistant/episodes" },
  ];
  return (
    <AiAssistantPage
      graph={aiAssistantPageGraph({ path: "/ai-assistant/episodes", title, description: lead, published: AI_PUBLISHED, updated, trail, image })}
      trail={trail}
      title={title}
      lead={lead}
      art={image.src}
      artAlt={image.alt}
      checked={AI_CHECKED}
      updated={updated}
      headings={ORDER.map((s) => ASSISTANT[s].name)}
    >
      {ORDER.map((s) => (
        <section key={s}>
          <GuideH2>
            {ASSISTANT[s].name} <AssistantMark system={s} className="ml-1 size-9 align-[-0.15em]" />
          </GuideH2>
          <p className="mt-4 leading-relaxed text-foreground-secondary">
            {ASSISTANT[s].system}.{" "}
            <Link href={`/ai-assistant/${EPISODE_PAGE[s]}`} className="text-link focus-ring">
              What {ASSISTANT[s].name} answers, changes and refuses
            </Link>
            .
          </p>
          <EpisodeList system={s} />
        </section>
      ))}
    </AiAssistantPage>
  );
}
