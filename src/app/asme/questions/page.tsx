import type { Metadata } from "next";
import Link from "next/link";
import { AsmePage, asmeOnly } from "@/components/AsmePage";
import { GuideH2 } from "@/components/GuidePage";
import { ASME_CHECKED, ASME_GROUPS, ASME_PUBLISHED, asmeGuides } from "@/lib/asme";
import { asmePageGraph } from "@/lib/schema";

// One question per guide, in the words people search, with the guide's answer-first lead. The page AI answers
// lift from; each answer links to the full guide.
const title = "ASME questions, answered";

export const metadata: Metadata = {
  title: "ASME BPVC questions, answered",
  description: "Short answers to the questions people ask about the ASME Boiler and Pressure Vessel Code: sections, stamps, welding, design and testing.",
  alternates: { canonical: "/asme/questions" },
  openGraph: { type: "website", url: "https://ahromlabs.com/asme/questions", siteName: "Ahrom Labs", title, description: "Short answers to the questions people ask about the ASME Boiler and Pressure Vessel Code." },
  twitter: { card: "summary_large_image", title, description: "Short answers to the questions people ask about the ASME Boiler and Pressure Vessel Code." },
};

export default function AsmeQuestions() {
  const guides = asmeGuides();
  const lead = `${guides.length} questions about the ASME Boiler and Pressure Vessel Code, each answered in a few lines and linked to the guide that explains it in full.`;
  const trail = [{ name: "ASME", path: "/asme" }, { name: title, path: "/asme/questions" }];
  const updated = [ASME_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  return (
    <AsmePage
      graph={asmePageGraph({ path: "/asme/questions", title, description: lead, published: ASME_PUBLISHED, updated, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={ASME_CHECKED}
      updated={updated}
      headings={ASME_GROUPS.map((g) => g.name)}
    >
      {ASME_GROUPS.map((group) => (
        <div key={group.slug}>
          <GuideH2>{group.name}</GuideH2>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {guides.filter((g) => g.group === group.slug).map((g) => (
              <div key={g.slug} className="py-6" {...asmeOnly(g.slug)}>
                <dt className="text-lg font-medium text-foreground">{g.question}</dt>
                <dd className="mt-2 leading-relaxed text-foreground-secondary">
                  {g.answer}{" "}
                  <Link href={`/asme/${g.slug}`} className="text-link focus-ring">{g.title}</Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </AsmePage>
  );
}
