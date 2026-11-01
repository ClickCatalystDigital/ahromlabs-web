import { getContent, type ContentEntry } from "./content";

// The ASME hub (/asme): guides in content/asme/*.md, grouped below, plus the three tools whose maths lives here
// so the pages, the check (scripts/asme.check.ts) and any later API use one implementation.
//
// The Code is copyrighted and sold by ASME, so guides cite paragraph numbers and explain in our own words; the
// only quoted texts are free official ones (ASME's certification handbook, the IBR 2026 Gazette), checked by
// scripts/check-asme-quotes.mjs. No guide has been reviewed by an Authorized Inspector yet, and every page says so.

export const ASME_PUBLISHED = "2026-11-01";
export const ASME_CHECKED = "2026-11-01";
/** The edition every page is written to. ASME publishes every two years; the next is due in 2027. */
export const ASME_EDITION = { name: "2025 Edition", published: "2025-07-01", mandatory: "2026-01-01" };

export type AsmeGroup = NonNullable<ContentEntry["group"]>;
export const ASME_GROUPS: { slug: AsmeGroup; name: string; intro: string; order: string[] }[] = [
  {
    slug: "code",
    name: "The Code and its sections",
    intro: "What each section of the Boiler and Pressure Vessel Code covers, and how the editions work.",
    order: ["bpvc-sections", "section-viii", "section-ix", "section-i-vs-iv", "section-ii", "section-v", "section-xiii", "editions"],
  },
  {
    slug: "certification",
    name: "Stamps, inspectors and paperwork",
    intro: "Getting and keeping an ASME certificate, who inspects, and the reports that go with every stamped item.",
    order: ["stamps", "u-stamp", "quality-control-manual", "authorized-inspector", "data-reports", "national-board-registration"],
  },
  {
    slug: "welding",
    name: "Welding qualifications (Section IX)",
    intro: "Procedures, welders and the records that prove both, in the order a shop builds them.",
    order: ["wps-pqr-wpq", "essential-variables", "welder-qualification", "welder-continuity", "p-numbers"],
  },
  {
    slug: "design",
    name: "Design basics, with calculators",
    intro: "The pressures, thicknesses, joints and tests every Division 1 vessel is designed around.",
    order: ["mawp", "shell-thickness", "heads", "joint-efficiency", "hydrostatic-test", "impact-testing", "pwht"],
  },
  {
    slug: "materials",
    name: "Materials and traceability",
    intro: "Proving every pressure part is the material the drawing calls for.",
    order: ["mtr"],
  },
  {
    slug: "bridge",
    name: "India, the US and related codes",
    intro: "Where ASME meets the Indian Boiler Regulations, US and Canadian law, and the piping codes.",
    order: ["asme-vs-ibr", "buying-from-india", "state-boiler-laws", "b31-1-vs-b31-3"],
  },
];

/** Every guide, in hub order (group, then the group's own order). */
export function asmeGuides(): ContentEntry[] {
  const rank = (g: ContentEntry) => {
    const gi = ASME_GROUPS.findIndex((x) => x.slug === g.group);
    const oi = ASME_GROUPS[gi]?.order.indexOf(g.slug) ?? -1;
    return gi * 100 + (oi === -1 ? 99 : oi);
  };
  return [...getContent("asme")].sort((a, b) => rank(a) - rank(b));
}
export const asmeGuide = (slug: string) => getContent("asme").find((g) => g.slug === slug);

export * from "./asme-calc";
