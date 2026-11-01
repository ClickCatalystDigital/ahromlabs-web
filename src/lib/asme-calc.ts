// The ASME hub's calculators (src/components/AsmeTools.tsx, the WebMCP tools, scripts/asme.check.ts), kept
// free of imports so browser code that uses them doesn't pull in the site's content index.

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
