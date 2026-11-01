import type { Metadata } from "next";
import Link from "next/link";
import { AsmePage } from "@/components/AsmePage";
import { GuideH2 } from "@/components/GuidePage";
import { ASME_CHECKED, ASME_PUBLISHED } from "@/lib/asme";
import { MATERIALS, PIPE_OD, PIPE_WALL, type Material } from "@/lib/asme-items";
import { asmeArt } from "@/lib/asme-images";
import { asmePageGraph } from "@/lib/schema";

const title = "Boiler and pressure vessel materials list (ASME and IBR)";
const lead = `The ${MATERIALS.length} ASME material specifications a boiler or pressure vessel shop buys most: plate, pipe, tubes, forgings, fittings, castings and bolting, with where each goes, the dimension standard, its Section IX P-number and whether IBR 2026's own material table names it. Plus a pipe size chart. Free to use and download.`;
const description = "Common ASME boiler and pressure vessel materials: SA-516, SA-106, SA-213, SA-105 and more, with P-numbers, IBR 2026 status and a pipe schedule chart.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/asme/items" },
  openGraph: { type: "website", url: "https://ahromlabs.com/asme/items", siteName: "Ahrom Labs", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const FORMS: Material["form"][] = ["Plate", "Seamless pipe", "Boiler tube", "Forging", "Butt-weld fitting", "Casting", "Bolting"];
const th = "border-b border-line py-2 pr-4 align-bottom font-medium text-foreground";
const td = "border-b border-line py-2 pr-4 align-top text-foreground-secondary";

export default function AsmeItems() {
  const trail = [{ name: "ASME", path: "/asme" }, { name: "Materials list", path: "/asme/items" }];
  const art = asmeArt("p-numbers");
  return (
    <AsmePage
      group="materials"
      graph={asmePageGraph({ path: "/asme/items", title, description: lead, published: ASME_PUBLISHED, updated: ASME_CHECKED, trail, image: art })}
      trail={trail}
      title={title}
      lead={lead}
      checked={ASME_CHECKED}
      updated={ASME_CHECKED}
      headings={[...FORMS.map((f) => `${f} materials`), "Pipe sizes: ASME B36.10M", "Using this list"]}
      art={art?.src}
      artAlt={art?.alt}
    >
      <p className="leading-relaxed text-foreground-secondary">
        Download it as <a href="/asme/items.csv" className="text-link focus-ring">CSV for Excel</a>. Free under CC BY 4.0: use it, credit Ahrom Labs.
        The &ldquo;IBR 2026&rdquo; column says whether regulation 30&apos;s material table names the specification; materials it doesn&apos;t name can
        still be used in India where IBR 2026 accepts ASME materials (see <Link href="/asme/asme-vs-ibr" className="text-link focus-ring">ASME vs IBR 2026</Link>).
      </p>

      {FORMS.map((form) => (
        <div key={form}>
          <GuideH2>{`${form} materials`}</GuideH2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className={th}>Specification</th>
                  <th className={th}>Material</th>
                  <th className={th}>Typical use</th>
                  <th className={th}>Dimensions</th>
                  <th className={th}>P-No.</th>
                  <th className={th}>In IBR 2026 table</th>
                </tr>
              </thead>
              <tbody>
                {MATERIALS.filter((m) => m.form === form).map((m) => (
                  <tr key={m.spec}>
                    <td className={`${td} font-medium text-foreground`}>{m.spec}</td>
                    <td className={td}>{m.material}</td>
                    <td className={td}>{m.use}</td>
                    <td className={td}>{m.dims ?? "–"}</td>
                    <td className={td}>{m.pNo}</td>
                    <td className={td}>{m.ibr ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <GuideH2>Pipe sizes: ASME B36.10M</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Outside diameter and wall thickness of seamless and welded steel pipe, schedules 40, 80 and 160. The outside diameter stays the same for every
        schedule of a size; a heavier schedule makes the bore smaller. Wall thickness is nominal: mill tolerance allows less (12.5% under, for SA-106), which
        is why a <Link href="/asme/shell-thickness" className="text-link focus-ring">thickness calculation</Link> takes it off.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className={th}>NPS</th>
              <th className={th}>OD (in / mm)</th>
              <th className={th}>SCH 40 wall</th>
              <th className={th}>SCH 80 wall</th>
              <th className={th}>SCH 160 wall</th>
            </tr>
          </thead>
          <tbody>
            {PIPE_OD.map(([nps, inch, mm], i) => (
              <tr key={nps}>
                <td className={`${td} font-medium text-foreground`}>{nps}</td>
                <td className={td}>{inch.toFixed(3)} / {mm.toFixed(1)}</td>
                {(["40", "80", "160"] as const).map((s) => (
                  <td key={s} className={td}>{PIPE_WALL[s][i][0].toFixed(3)} in / {PIPE_WALL[s][i][1].toFixed(2)} mm</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GuideH2>Using this list</GuideH2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary">
        <li>The specification and grade go on the drawing, the purchase order and the <Link href="/asme/mtr" className="text-link focus-ring">MTR</Link>, written the same way each time.</li>
        <li>Pressure parts must be certified to the SA specification; <Link href="/asme/section-ii" className="text-link focus-ring">SA vs A</Link> explains dual-certified material.</li>
        <li>The P-number decides which welding procedures cover it: see <Link href="/asme/p-numbers" className="text-link focus-ring">P-numbers</Link>.</li>
        <li>Allowable stresses come from Section II Part D for your edition and temperature, and aren&apos;t reproduced here.</li>
      </ul>
      <p className="mt-6 leading-relaxed text-foreground-secondary">
        This is the public part of a much larger item master: thousands of sized items, matched to the codes in your own ERP, with the ASME-to-IBR
        crosswalk and bills of materials. That comes with the systems we build.
      </p>
    </AsmePage>
  );
}
