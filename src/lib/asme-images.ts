import { existsSync } from "node:fs";
import { join } from "node:path";

// Page art for the ASME hub: public/asme/<name>.webp (1086 x 362) and its share-card crop
// src/assets/og-art/asme/<name>.jpg, both made by scripts/asme-images.py from the prompts in
// docs/asme-image-prompts.md. A page shows its image once the file exists; until then it has none.
// Server-only (reads the filesystem at build time; every ASME page is prerendered).
//
// Alt text describes what is in the picture and what it stands for, for image search and screen readers.
// Re-check it against each delivered image: generated pictures don't always follow the prompt.
const ALT: Record<string, string> = {
  "asme-hub": "A horizontal steel pressure vessel on two saddle supports, with elliptical heads, flanged nozzles and a blank nameplate: the kind of equipment the ASME Boiler and Pressure Vessel Code governs.",
  "hydrostatic-test": "A pressure gauge on a flanged pipe stub with a small valve and drops of water: a hydrostatic pressure test.",
  "shell-thickness": "A cut section of a thick steel cylinder with an ultrasonic thickness gauge probe on its edge: pressure vessel shell wall thickness.",
  "welder-continuity": "A welding helmet beside a desk calendar with a stick electrode across it: tracking a welder's six-month continuity.",
  questions: "A closed technical code book with coloured tab markers and reading glasses on the cover.",
  "bpvc-sections": "A row of thick hardbound volumes on a shelf, one pulled half out: the sections of the ASME Boiler and Pressure Vessel Code.",
  "section-viii": "Three pressure vessels side by side with increasing wall thickness: Section VIII Divisions 1, 2 and 3.",
  "section-ix": "A welded steel test plate with two bend-test strips bent into a U beside it: welding qualification tests under Section IX.",
  "wps-pqr-wpq": "Three document sheets on a clipboard with a welding electrode and a welded test coupon on top: the WPS, PQR and WPQ.",
  stamps: "A blank stainless steel equipment nameplate beside a case of steel letter punches: stamping a certified boiler or pressure vessel.",
  "u-stamp": "A ring binder with a pressure gauge and a blank nameplate beside it: the quality system and records behind an ASME certificate.",
  "data-reports": "An open document folder of blank forms with a pen and a metal nameplate: a pressure vessel's Manufacturer's Data Report.",
  "asme-vs-ibr": "Two identical small shell boilers, one navy and one cream, joined by a steam pipe: the ASME Code and the Indian Boiler Regulations.",
  "section-i-vs-iv": "A large industrial firetube steam boiler beside a small wall-hung heating boiler: power boilers and heating boilers.",
  "section-ii": "Steel plates of different thicknesses with heat markings, a pipe offcut and a forged flange: pressure vessel materials.",
  "section-v": "An ultrasonic flaw detector and its probe beside a welded steel plate: nondestructive examination.",
  "section-xiii": "A spring-loaded safety relief valve with a lifting lever, standing on its inlet flange: overpressure protection.",
  editions: "A new hardbound code book in front of an older worn copy: successive editions of the Code.",
  "quality-control-manual": "An open ring binder with index tabs and a set of calipers: a shop's quality control manual.",
  "authorized-inspector": "A hard hat, flashlight and magnifying glass on a clipboard: the Authorized Inspector's tools.",
  "national-board-registration": "An open card-index drawer with one card raised: the National Board's register of built boilers and vessels.",
  "essential-variables": "A welding machine control panel with rotary dials and a switch: the variables of a welding procedure.",
  "welder-qualification": "A steel pipe held at 45 degrees with a circumferential weld: a 6G welder qualification test.",
  "p-numbers": "A tray of metal sample coupons in carbon steel, stainless steel, copper and aluminum: base metals grouped by P-number.",
  mawp: "A pressure gauge with a red marker line on top of a vessel head: maximum allowable working pressure.",
  heads: "A hemispherical, a 2:1 elliptical and a shallow dished pressure vessel head standing side by side.",
  "joint-efficiency": "A cylindrical shell course with a long seam and a circumferential weld, and a radiography film cassette on the seam.",
  "impact-testing": "A Charpy pendulum impact tester with its hammer raised and a frosted notched test bar on the anvil.",
  pwht: "A welded steel ring wrapped in ceramic heating pads and insulation with thermocouple wires: post-weld heat treatment.",
  mtr: "A steel plate with a heat-marking patch, a material test certificate clipped to it and a paint marker: material traceability.",
  "buying-from-india": "A horizontal pressure vessel strapped to a flatbed trailer bed on transport cradles, ready to ship.",
  "state-boiler-laws": "A framed certificate on a wall board beside a boiler gauge glass and valve: a boiler's operating certificate.",
  "b31-1-vs-b31-3": "Two pipe spools meeting at a flanged tee, one insulated, one bare stainless with a valve: power and process piping.",
};

export type AsmeArt = { src: string; alt: string; width: number; height: number };

/** The page art for a guide slug, or "asme-hub" / "questions", once its file exists. */
export function asmeArt(name: string): AsmeArt | null {
  const src = `/asme/${name}.webp`;
  if (!existsSync(join(process.cwd(), "public", src))) return null;
  return { src, alt: ALT[name] ?? "", width: 1086, height: 362 };
}

/** The share-card crop as a data URI for renderOgImage (it can't read WebP). */
export async function asmeOgArt(name: string): Promise<string | undefined> {
  const { readFile } = await import("node:fs/promises");
  const jpg = await readFile(join(process.cwd(), "src/assets/og-art/asme", `${name}.jpg`)).catch(() => null);
  return jpg ? `data:image/jpeg;base64,${jpg.toString("base64")}` : undefined;
}
