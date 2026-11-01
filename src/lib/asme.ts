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

// ---------- Tools ----------
// Units are whatever the user types (psi and inches, or MPa and mm): every formula is a ratio, so they only
// have to be consistent.

export type HydroCase = "viii-1-hydro" | "viii-1-pneumatic" | "i-hydro";
export const HYDRO_CASES: Record<HydroCase, { label: string; para: string; factor: number; ratio: boolean }> = {
  "viii-1-hydro": { label: "Section VIII Div. 1, hydrostatic", para: "UG-99(b)", factor: 1.3, ratio: true },
  "viii-1-pneumatic": { label: "Section VIII Div. 1, pneumatic", para: "UG-100", factor: 1.1, ratio: true },
  "i-hydro": { label: "Section I, hydrostatic", para: "PG-99", factor: 1.5, ratio: false },
};

/** Minimum test pressure: factor × MAWP, times the lowest stress ratio (stress at test ÷ stress at design temperature) where the rule uses one. */
export function testPressure(c: HydroCase, mawp: number, sTest?: number, sDesign?: number) {
  const k = HYDRO_CASES[c];
  const ratio = k.ratio && sTest && sDesign ? sTest / sDesign : 1;
  return { ratio, pressure: k.factor * mawp * ratio };
}

/** Required thickness of a cylindrical shell (UG-27(c)) or sphere (UG-27(d)), inside radius in the corroded condition. */
export function shellThickness(p: { P: number; R: number; S: number; E: number; CA: number; shape: "cylinder" | "sphere" }) {
  const R = p.R + p.CA; // the radius once the corrosion allowance has gone
  if (p.shape === "sphere") {
    const t = (p.P * R) / (2 * p.S * p.E - 0.2 * p.P);
    return { R, circumferential: t, longitudinal: t, required: t + p.CA, governs: "sphere" as const, inRange: p.P <= 0.665 * p.S * p.E };
  }
  const circumferential = (p.P * R) / (p.S * p.E - 0.6 * p.P);
  const longitudinal = (p.P * R) / (2 * p.S * p.E + 0.4 * p.P);
  const t = Math.max(circumferential, longitudinal);
  return { R, circumferential, longitudinal, required: t + p.CA, governs: circumferential >= longitudinal ? ("circumferential" as const) : ("longitudinal" as const), inRange: p.P <= 0.385 * p.S * p.E && t <= R / 2 };
}

/** The MAWP a cylinder of thickness t allows (UG-27(c)(1)), after the corrosion allowance. */
export function shellMawp(p: { t: number; R: number; S: number; E: number; CA: number }) {
  const t = p.t - p.CA, R = p.R + p.CA;
  return (p.S * p.E * t) / (R + 0.6 * t);
}

/** QW-322.1(a): a welder's qualification for a process lapses after six months without welding with it. */
export function continuityLapse(lastWeld: string): string {
  const d = new Date(`${lastWeld}T00:00:00Z`);
  const day = d.getUTCDate();
  d.setUTCMonth(d.getUTCMonth() + 6);
  if (d.getUTCDate() !== day) d.setUTCDate(0); // 31 Aug + 6 months = 28/29 Feb, not 3 Mar
  return d.toISOString().slice(0, 10);
}
