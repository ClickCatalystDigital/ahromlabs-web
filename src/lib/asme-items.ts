// The free boiler and pressure-part materials list at /asme/items (and /asme/items.csv): the common ASME material
// specifications a boiler or pressure vessel shop buys, with product form, where it goes, the dimension standard,
// the Section IX P-number, and whether IBR 2026's own material table (regulation 30) names it.
//
// Written for the site, not exported from the private item master (~/Developer/items), which holds vendor prices,
// client codes and unapproved entries. The full master, with sizes, ERP codes and the ASME-to-IBR crosswalk, comes
// with the systems Ahrom Labs builds. scripts/asme.check.ts checks every `ibr` value against the Gazette text.

export type Material = {
  spec: string; // as written in ASME Section II, e.g. "SA-516 Grade 70"
  form: "Plate" | "Seamless pipe" | "Boiler tube" | "Forging" | "Butt-weld fitting" | "Casting" | "Bolting";
  material: string;
  use: string;
  dims?: string; // the dimension standard the part is ordered to
  pNo: string; // Section IX P-number ("–" for bolting, which isn't welded)
  ibr: { spec: string; grade?: string } | null; // how IBR 2026's table writes it, or null if the table doesn't name it
};

export const MATERIALS: Material[] = [
  { spec: "SA-516 Grade 70", form: "Plate", material: "Carbon steel, fine grain", use: "Shells, heads and drums of boilers and pressure vessels; the most used pressure plate", pNo: "1", ibr: { spec: "SA 516", grade: "Gr70" } },
  { spec: "SA-516 Grade 60", form: "Plate", material: "Carbon steel, fine grain", use: "Shells and heads where toughness matters more than strength", pNo: "1", ibr: { spec: "SA 516", grade: "Gr60" } },
  { spec: "SA-515 Grade 70", form: "Plate", material: "Carbon steel, coarse grain", use: "Boiler drums and shells at higher temperature", pNo: "1", ibr: { spec: "SA 515", grade: "Gr70" } },
  { spec: "SA-387 Grade 11", form: "Plate", material: "1¼Cr–½Mo alloy steel", use: "Shells and headers in creep service", pNo: "4", ibr: { spec: "SA 387", grade: "Gr11" } },
  { spec: "SA-387 Grade 22", form: "Plate", material: "2¼Cr–1Mo alloy steel", use: "High-temperature shells and headers", pNo: "5A", ibr: { spec: "SA 387", grade: "Gr22" } },
  { spec: "SA-240 Type 304 / 316", form: "Plate", material: "Austenitic stainless steel", use: "Corrosion-resistant vessels and linings", pNo: "8", ibr: { spec: "SA 240" } },
  { spec: "SA-106 Grade B", form: "Seamless pipe", material: "Carbon steel", use: "Steam, feedwater and process piping; boiler external piping", dims: "ASME B36.10M", pNo: "1", ibr: { spec: "SA 106", grade: "Gr B" } },
  { spec: "SA-106 Grade C", form: "Seamless pipe", material: "Carbon steel, higher strength", use: "Headers and higher-pressure piping", dims: "ASME B36.10M", pNo: "1", ibr: { spec: "SA 106", grade: "Gr C" } },
  { spec: "SA-335 P11", form: "Seamless pipe", material: "1¼Cr–½Mo alloy steel", use: "Main steam and superheater piping", dims: "ASME B36.10M", pNo: "4", ibr: { spec: "SA 335", grade: "P11" } },
  { spec: "SA-335 P22", form: "Seamless pipe", material: "2¼Cr–1Mo alloy steel", use: "High-temperature steam piping", dims: "ASME B36.10M", pNo: "5A", ibr: { spec: "SA 335", grade: "P22" } },
  { spec: "SA-335 P91", form: "Seamless pipe", material: "9Cr–1Mo–V creep-strength enhanced steel", use: "Main steam piping in high-pressure plants", dims: "ASME B36.10M", pNo: "15E", ibr: { spec: "SA 335", grade: "P91" } },
  { spec: "SA-333 Grade 6", form: "Seamless pipe", material: "Carbon steel, impact tested", use: "Low-temperature piping", dims: "ASME B36.10M", pNo: "1", ibr: null },
  { spec: "SA-312 TP304 / TP316", form: "Seamless pipe", material: "Austenitic stainless steel", use: "Corrosion-resistant and clean-service piping", dims: "ASME B36.19M", pNo: "8", ibr: null },
  { spec: "SA-178 Grade A", form: "Boiler tube", material: "Carbon steel, electric-resistance welded", use: "Firetube and low-pressure watertube boiler tubes", pNo: "1", ibr: null },
  { spec: "SA-192", form: "Boiler tube", material: "Carbon steel, seamless", use: "High-pressure boiler tubes", pNo: "1", ibr: null },
  { spec: "SA-210 Grade A1", form: "Boiler tube", material: "Medium-carbon steel, seamless", use: "Boiler, waterwall and economizer tubes", pNo: "1", ibr: { spec: "SA 210", grade: "Gr A1" } },
  { spec: "SA-210 Grade C", form: "Boiler tube", material: "Medium-carbon steel, seamless, higher strength", use: "Boiler and superheater tubes", pNo: "1", ibr: { spec: "SA 210", grade: "Gr C" } },
  { spec: "SA-179", form: "Boiler tube", material: "Low-carbon steel, seamless, cold drawn", use: "Heat exchanger and condenser tubes", pNo: "1", ibr: { spec: "SA 179" } },
  { spec: "SA-213 T11", form: "Boiler tube", material: "1¼Cr–½Mo alloy steel", use: "Superheater and reheater tubes", pNo: "4", ibr: { spec: "SA 213", grade: "T11" } },
  { spec: "SA-213 T22", form: "Boiler tube", material: "2¼Cr–1Mo alloy steel", use: "Superheater and reheater tubes at higher temperature", pNo: "5A", ibr: { spec: "SA 213", grade: "T22" } },
  { spec: "SA-213 TP304H", form: "Boiler tube", material: "Austenitic stainless steel, high carbon", use: "Hottest superheater sections", pNo: "8", ibr: { spec: "SA 213", grade: "304H" } },
  { spec: "SA-105", form: "Forging", material: "Carbon steel", use: "Flanges (ASME B16.5), socket-weld and threaded fittings (B16.11), nozzles", dims: "ASME B16.5 / B16.11", pNo: "1", ibr: { spec: "SA 105" } },
  { spec: "SA-182 F11", form: "Forging", material: "1¼Cr–½Mo alloy steel", use: "Flanges and fittings for alloy steam lines", dims: "ASME B16.5 / B16.11", pNo: "4", ibr: { spec: "SA 182", grade: "F11" } },
  { spec: "SA-182 F22", form: "Forging", material: "2¼Cr–1Mo alloy steel", use: "Flanges and fittings for high-temperature alloy lines", dims: "ASME B16.5 / B16.11", pNo: "5A", ibr: { spec: "SA 182", grade: "F22" } },
  { spec: "SA-182 F304 / F316", form: "Forging", material: "Austenitic stainless steel", use: "Stainless flanges and fittings", dims: "ASME B16.5 / B16.11", pNo: "8", ibr: { spec: "SA 182", grade: "F304" } },
  { spec: "SA-266 Grade 2", form: "Forging", material: "Carbon steel", use: "Forged vessel components: tubesheets, nozzles, rings", pNo: "1", ibr: { spec: "SA 266", grade: "Gr2" } },
  { spec: "SA-350 LF2", form: "Forging", material: "Carbon steel, impact tested", use: "Flanges and fittings for low-temperature service", dims: "ASME B16.5 / B16.11", pNo: "1", ibr: { spec: "SA 350", grade: "LF2" } },
  { spec: "SA-234 WPB", form: "Butt-weld fitting", material: "Carbon steel", use: "Elbows, tees and reducers in carbon steel piping", dims: "ASME B16.9", pNo: "1", ibr: null },
  { spec: "SA-234 WP11", form: "Butt-weld fitting", material: "1¼Cr–½Mo alloy steel", use: "Fittings in P11 piping", dims: "ASME B16.9", pNo: "4", ibr: { spec: "SA 234", grade: "WP11" } },
  { spec: "SA-234 WP22", form: "Butt-weld fitting", material: "2¼Cr–1Mo alloy steel", use: "Fittings in P22 piping", dims: "ASME B16.9", pNo: "5A", ibr: { spec: "SA 234", grade: "WP22" } },
  { spec: "SA-216 WCB", form: "Casting", material: "Carbon steel", use: "Valve bodies and pump casings", dims: "ASME B16.34", pNo: "1", ibr: { spec: "SA 216", grade: "WCB" } },
  { spec: "SA-216 WCC", form: "Casting", material: "Carbon steel, higher manganese", use: "Valve bodies needing better toughness", dims: "ASME B16.34", pNo: "1", ibr: { spec: "SA 216", grade: "WCC" } },
  { spec: "SA-217 WC6", form: "Casting", material: "1¼Cr–½Mo alloy steel", use: "Valve bodies for alloy steam lines", dims: "ASME B16.34", pNo: "4", ibr: { spec: "SA 217", grade: "WC6" } },
  { spec: "SA-193 B7", form: "Bolting", material: "Cr–Mo alloy steel studs", use: "Flange studs, with SA-194 2H nuts", dims: "ASME B16.5 bolting", pNo: "–", ibr: null },
  { spec: "SA-194 2H", form: "Bolting", material: "Carbon steel heavy hex nuts", use: "Nuts for SA-193 B7 studs", dims: "ASME B18.2.2", pNo: "–", ibr: null },
];

// Seamless and welded steel pipe dimensions to ASME B36.10M, NPS ½ to 12, schedules 40, 80 and 160: outside
// diameter, and wall thickness in inches and millimetres. Standard published values.
export const PIPE_OD: [string, number, number][] = [
  ["½", 0.84, 21.3], ["¾", 1.05, 26.7], ["1", 1.315, 33.4], ["1½", 1.9, 48.3], ["2", 2.375, 60.3], ["3", 3.5, 88.9],
  ["4", 4.5, 114.3], ["6", 6.625, 168.3], ["8", 8.625, 219.1], ["10", 10.75, 273.1], ["12", 12.75, 323.8],
];
export const PIPE_WALL: Record<"40" | "80" | "160", [number, number][]> = {
  "40": [[0.109, 2.77], [0.113, 2.87], [0.133, 3.38], [0.145, 3.68], [0.154, 3.91], [0.216, 5.49], [0.237, 6.02], [0.28, 7.11], [0.322, 8.18], [0.365, 9.27], [0.406, 10.31]],
  "80": [[0.147, 3.73], [0.154, 3.91], [0.179, 4.55], [0.2, 5.08], [0.218, 5.54], [0.3, 7.62], [0.337, 8.56], [0.432, 10.97], [0.5, 12.7], [0.594, 15.09], [0.688, 17.48]],
  "160": [[0.188, 4.78], [0.219, 5.56], [0.25, 6.35], [0.281, 7.14], [0.344, 8.74], [0.438, 11.13], [0.531, 13.49], [0.719, 18.26], [0.906, 23.01], [1.125, 28.58], [1.312, 33.32]],
};

export const ITEMS_CSV_HEAD = ["Specification", "Product form", "Material", "Typical use", "Dimension standard", "P-number", "Named in IBR 2026 regulation 30 table"];
export const itemsCsvRows = () => MATERIALS.map((m) => [m.spec, m.form, m.material, m.use, m.dims ?? "", m.pNo, m.ibr ? "Yes" : "No"]);
