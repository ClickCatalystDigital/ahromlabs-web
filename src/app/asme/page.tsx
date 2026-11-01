import type { Metadata } from "next";
import Link from "next/link";
import { AsmePage, asmeOnly } from "@/components/AsmePage";
import { GuideH2 } from "@/components/GuidePage";
import { ASME_CHECKED, ASME_EDITION, ASME_GROUPS, ASME_PUBLISHED, asmeGuides } from "@/lib/asme";
import { asmePageGraph } from "@/lib/schema";
import { asmeArt } from "@/lib/asme-images";

const title = "ASME Boiler and Pressure Vessel Code, in plain English";
const lead = `The ASME Boiler and Pressure Vessel Code (BPVC) sets how boilers and pressure vessels are designed, built, welded, inspected and stamped. These guides explain the sections, the certification stamps, Section IX welding qualifications and the core Section VIII design rules, with free calculators, written to the ${ASME_EDITION.name} for shops in the US, Canada and India.`;

export const metadata: Metadata = {
  // Absolute: with the " | Ahrom Labs" suffix it would run past what results show.
  title: { absolute: "ASME BPVC guide: sections, stamps, welding and calculators" },
  description: "The ASME Boiler and Pressure Vessel Code explained: sections I to XIII, U and S stamps, WPS/PQR, welder continuity, hydrotest and shell calculators.",
  alternates: { canonical: "/asme" },
  openGraph: { type: "website", url: "https://ahromlabs.com/asme", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

const TOOLS = [
  { slug: "hydrostatic-test", title: "Hydrostatic test pressure calculator", text: "Section VIII Division 1 hydrostatic and pneumatic, and Section I: the minimum test pressure with every step cited." },
  { slug: "shell-thickness", title: "Shell thickness and MAWP calculator", text: "UG-27 for cylinders and spheres, with the corrosion allowance and the joint efficiency, both ways round." },
  { slug: "welder-continuity", title: "Welder continuity checker", text: "Paste welders and their last weld dates: who lapses when under QW-322, soonest first. With a free Excel log that does the same." },
];

export default function AsmeHub() {
  const guides = asmeGuides();
  const updated = [ASME_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "ASME", path: "/asme" }];
  const art = asmeArt("asme-hub");
  return (
    <AsmePage
      graph={asmePageGraph({ path: "/asme", title, description: lead, published: ASME_PUBLISHED, updated, trail, image: art })}
      trail={trail}
      title={title}
      lead={lead}
      checked={ASME_CHECKED}
      updated={updated}
      art={art?.src}
      artAlt={art?.alt}
    >
      <GuideH2>Free tools</GuideH2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {TOOLS.map((t) => (
          <li key={t.slug} className="py-6">
            <Link href={`/asme/${t.slug}`} className="text-link focus-ring text-xl font-medium">{t.title}</Link>
            <p className="mt-2 leading-relaxed text-foreground-secondary">{t.text}</p>
          </li>
        ))}
        <li className="py-6">
          <Link href="/asme/items" className="text-link focus-ring text-xl font-medium">Boiler and pressure vessel materials list</Link>
          <p className="mt-2 leading-relaxed text-foreground-secondary">The common ASME plate, pipe, tube, forging, fitting, casting and bolting specifications, with P-numbers, IBR 2026 status and a pipe size chart. Free to download.</p>
        </li>
        <li className="py-6">
          <Link href="/asme/questions" className="text-link focus-ring text-xl font-medium">ASME questions, answered</Link>
          <p className="mt-2 leading-relaxed text-foreground-secondary">{guides.length} questions people ask about the Code, each answered in a few lines, with the guide that explains it.</p>
        </li>
      </ul>

      {ASME_GROUPS.map((group) => {
        const list = guides.filter((g) => g.group === group.slug);
        return list.length === 0 ? null : (
          <div key={group.slug}>
            <GuideH2>{group.name}</GuideH2>
            <p className="mt-4 leading-relaxed text-foreground-secondary">{group.intro}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {list.map((g) => (
                <li key={g.slug} className="py-6" {...asmeOnly(g.slug)}>
                  <Link href={`/asme/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </AsmePage>
  );
}
