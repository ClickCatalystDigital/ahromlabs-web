import type { Metadata } from "next";
import Link from "next/link";
import { ConstructionPage } from "@/components/ConstructionPage";
import { DemoLink, GuideH2 } from "@/components/GuidePage";
import { CON_CHECKED, CON_GROUPS, CON_PUBLISHED, conGuides } from "@/lib/construction";
import { only } from "@/lib/markets";
import { mfgPageGraph } from "@/lib/schema";
import { conArt } from "@/lib/construction-images";

const title = "Construction billing and job cost: guides for contractors";
const lead =
  "A contractor is paid in stages against work measured or certified, with part of each payment held back until the job is done. How that works depends on the country: in the US, pay applications, retainage, lien waivers and change orders; in India, running account bills, the measurement book, TDS and GST on works contracts. These guides explain each, quoted from the laws and official manuals, and what your system has to record.";

export const metadata: Metadata = {
  title: { absolute: "Construction billing guides: pay apps, retainage, RA bills" },
  description: "Construction billing for contractors: pay applications, retainage, lien waivers, change orders and WIP in the US; RA bills, measurement book, TDS and GST in India.",
  alternates: { canonical: "/construction" },
  openGraph: { type: "website", url: "https://ahromlabs.com/construction", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function ConstructionHub() {
  const guides = conGuides();
  const updated = [CON_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "Construction", path: "/construction" }];
  const art = conArt("construction-hub");
  const demo = "https://construction-erp.ahromlabs.com/demo";
  return (
    <ConstructionPage
      graph={mfgPageGraph({ path: "/construction", title, description: lead, published: CON_PUBLISHED, updated, trail, image: art })}
      trail={trail}
      title={title}
      lead={lead}
      checked={CON_CHECKED}
      updated={updated}
      art={art?.src}
      artAlt={art?.alt}
    >
      {CON_GROUPS.map((group) => {
        const list = guides.filter((g) => g.group === group.slug);
        return list.length === 0 ? null : (
          <section key={group.slug} {...only([group.market])}>
            <GuideH2>{group.name}</GuideH2>
            <p className="mt-4 leading-relaxed text-foreground-secondary">{group.intro}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {list.map((g) => (
                <li key={g.slug} className="py-6">
                  <Link href={`/construction/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <GuideH2>See it in a working system</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        The <DemoLink href={demo}>construction demo</DemoLink> is a sample contractor&apos;s system with daily reports
        from site, bills, stores, site cash and payroll, with a login per role. Its assistant,{" "}
        <Link href="/ai-assistant/construction-contractors" className="text-link focus-ring">Datum AI</Link>, answers
        questions from the project records and shows where each answer came from.
      </p>
    </ConstructionPage>
  );
}
