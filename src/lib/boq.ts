// The interior BOQ item library. The one place it lives: /boq, /boq/items,
// each /boq/items/<trade> page, the BOQ checker (src/lib/boq-check.ts), the
// downloadable template (scripts/build-boq-template.py), llms.txt and
// knowledge.json all render from it, so a correction lands everywhere at once.
//
// What each item states, and where it comes from:
// - `unit` and `units`: the unit an interior BOQ usually prices the item in, and
//   the others it is also quoted in. Modular work (kitchens, wardrobes) has no
//   national measurement standard, so those items set `basis: true`: the line
//   itself has to say how it was measured.
// - `is`: Indian Standards that govern how the work is measured (IS 1200 parts)
//   or what the material is (board standards). Cited by number and title only,
//   checked against the BIS catalogue; never quoted, since BIS texts are paid.
// - `spec`: what a line must name so a cheaper material can't be substituted.
//   The checker tests each with a pattern (SPEC below).
// - `omits`: what quotes for the item commonly leave out.
// No rates: they move with city and month. The guides explain building a rate.

export const BOQ_CHECKED = "2026-10-23";
export const BOQ_PUBLISHED = "2026-10-23";

export type Unit = "sqft" | "sqm" | "rft" | "rm" | "nos" | "set" | "point" | "ls" | "cum";

export const UNIT_LABEL: Record<Unit, string> = {
  sqft: "sq ft",
  sqm: "sq m",
  rft: "running ft",
  rm: "running m",
  nos: "nos",
  set: "set",
  point: "point",
  ls: "lump sum",
  cum: "cu m",
};

// Spellings seen in real BOQs, mapped to one unit. Lower-cased, dots and spaces dropped.
const UNIT_ALIASES: Record<string, Unit> = {
  sqft: "sqft", sft: "sqft", sqf: "sqft", ft2: "sqft", squarefeet: "sqft", squarefoot: "sqft", sf: "sqft",
  sqm: "sqm", sqmt: "sqm", m2: "sqm", squaremetre: "sqm", squaremeter: "sqm", smt: "sqm",
  rft: "rft", rf: "rft", runningft: "rft", runningfeet: "rft", runningfoot: "rft", lft: "rft", ft: "rft",
  rm: "rm", rmt: "rm", runningm: "rm", runningmetre: "rm", runningmeter: "rm", mtr: "rm", m: "rm",
  nos: "nos", no: "nos", nr: "nos", each: "nos", ea: "nos", pcs: "nos", pc: "nos", unit: "nos", units: "nos",
  set: "set", sets: "set", pair: "set",
  point: "point", points: "point", pt: "point", pts: "point",
  ls: "ls", lumpsum: "ls", lot: "ls", job: "ls", item: "ls",
  cum: "cum", m3: "cum", cumt: "cum",
};

export function normalizeUnit(raw: string): Unit | undefined {
  const key = raw.toLowerCase().replace(/[.\s]/g, "");
  return UNIT_ALIASES[key];
}

// What a line must name. Each pattern is deliberately loose: it asks "did the
// line say anything about this?", not "is the answer right?".
export const SPEC = {
  board: {
    label: "Board and its grade",
    hint: "for example IS 303 BWP plywood, IS 710 marine plywood, HDHMR",
    test: /IS ?(303|710|1659|3087|12823)\b|\b(MR|BWR|BWP)\b|marine|HDHMR|\bMDF\b|\bWPC\b|particle ?board|block ?board/i,
  },
  thickness: { label: "Thickness", hint: "in mm, for example 18 mm carcass", test: /\b\d{1,3}(\.\d+)? ?mm\b/i },
  finish: {
    label: "Finish",
    hint: "laminate and its thickness, veneer, PU, acrylic, lacquer",
    test: /laminate|\blam\b|veneer|lacquer|acrylic|\bPU\b|duco|membrane|polish|\bglass\b|paint/i,
  },
  edge: { label: "Edge band", hint: "for example 2 mm PVC edge band", test: /edge ?band|edging|\bABS\b|PVC edge/i },
  hardware: {
    label: "Hardware make",
    hint: "hinges, channels and fittings by make, or 'or equal'",
    test: /hettich|h[aä]fele|blum|ebco|godrej|dorset|grass\b|soft[- ]?close|tandem|hinge|channel|hydraulic|hardware|\bmake\b|or equal|equivalent/i,
  },
  ceilingBoard: {
    label: "Ceiling board",
    hint: "gypsum, calcium silicate, mineral fibre, POP",
    test: /gypsum|calcium silicate|cement board|\bPOP\b|plaster of paris|mineral fib|metal|\bPVC\b|wooden/i,
  },
  framing: {
    label: "Framing",
    hint: "GI or galvanised steel sections, grid",
    test: /frame|framing|\bGI\b|galvani[sz]ed|section|grid|suspension|channel/i,
  },
  tile: { label: "Tile or stone size", hint: "for example 600 × 1200 mm", test: /\d{2,4} ?(mm)? ?[x×*] ?\d{2,4}/i },
  make: {
    label: "Make and model",
    hint: "the brand and product, or 'or equal' with a named reference",
    test: /\bmake\b|\bbrand\b|\bmodel\b|or equal|equivalent|approved|asian paints|berger|nerolac|dulux|jaquar|kohler|grohe|hindware|cera\b|parryware|legrand|schneider|havells|anchor|polycab|finolex|philips|wipro|astral|supreme|ashirvad|fosroc|sika|dr\.? ?fixit/i,
  },
  coats: { label: "Number of coats", hint: "putty, primer and finish coats", test: /\bcoats?\b|\b(one|two|three|[123]) ?(coat|layer)s?\b/i },
  wire: { label: "Wire or cable", hint: "for example 1.5 sq mm FRLS copper, CAT6", test: /\d(\.\d+)? ?sq\.? ?mm|FRLS|\bFR\b|HFFR|wire|cable|\bcat ?[5-7]a?\b|coaxial|\bRG ?6\b/i },
  material: {
    label: "Material",
    hint: "named, for example granite, quartz, AAC block, sal wood",
    test: /granite|quartz|marble|corian|solid surface|stainless|\btile|stone|acrylic|glass|ceramic|teak|\bsal\b|hardwood|aluminium|steel|engineered|brick|block|\bAAC\b|gypsum|PVC|WPC/i,
  },
  size: { label: "Size", hint: "a dimension in mm, ft or inches", test: /\d+(\.\d+)? ?(mm|cm|ft|feet|inch|in\b|"|')/i },
  pipe: { label: "Pipe material and size", hint: "CPVC, PPR, UPVC, with size", test: /CPVC|\bPPR\b|UPVC|\bGI\b|\bPVC\b|HDPE|composite/i },
} as const;

export type SpecKey = keyof typeof SPEC;

// Words that show a line says how it was measured.
export const BASIS_TEST = /\b(incl|including|inclusive|excl|excluding|exclusive|measured|basis|shutter area|carcass|elevation|running|r\.?ft|overall)\b/i;

export type IsRef = { code: string; title: string };

// Titles as the BIS catalogue gives them. Numbers only, no edition years:
// several parts have newer editions than the public copies.
export const IS: Record<string, IsRef> = {
  "1200-3": { code: "IS 1200 (Part 3)", title: "Method of measurement of building and civil engineering works: brickwork" },
  "1200-10": { code: "IS 1200 (Part 10)", title: "Method of measurement of building and civil engineering works: ceiling and linings" },
  "1200-11": { code: "IS 1200 (Part 11)", title: "Method of measurement of building and civil engineering works: paving, floor finishes, dado and skirting" },
  "1200-12": { code: "IS 1200 (Part 12)", title: "Method of measurement of building and civil engineering works: plastering and pointing" },
  "1200-13": { code: "IS 1200 (Part 13)", title: "Method of measurement of building and civil engineering works: whitewashing, colour washing, distempering and painting of building surfaces" },
  "1200-15": { code: "IS 1200 (Part 15)", title: "Method of measurement of building and civil engineering works: painting, polishing, varnishing etc." },
  "1200-18": { code: "IS 1200 (Part 18)", title: "Method of measurement of building and civil engineering works: demolition and dismantling" },
  "1200-19": { code: "IS 1200 (Part 19)", title: "Method of measurement of building and civil engineering works: water supply, plumbing and drains" },
  "1200-21": { code: "IS 1200 (Part 21)", title: "Method of measurement of building and civil engineering works: wood-work and joinery" },
  "303": { code: "IS 303", title: "Plywood for general purposes" },
  "710": { code: "IS 710", title: "Marine plywood" },
  "1659": { code: "IS 1659", title: "Block boards" },
  "3087": { code: "IS 3087", title: "Particle boards of wood and other lignocellulosic materials (medium density) for general purposes" },
  "12823": { code: "IS 12823", title: "Prelaminated particle boards" },
  "2202-1": { code: "IS 2202 (Part 1)", title: "Wooden flush door shutters (solid core type): plywood face panels" },
};

export type Trade = { slug: string; name: string; summary: string };

export const trades: Trade[] = [
  { slug: "civil", name: "Civil and demolition", summary: "Breaking out, new partitions and plaster before the interior work starts." },
  { slug: "false-ceiling", name: "False ceiling", summary: "Gypsum, grid and POP ceilings, with the coves and bands priced apart from the flat field." },
  { slug: "flooring", name: "Flooring and wall tiling", summary: "Tile, stone and wood floors, skirting and dado." },
  { slug: "carpentry", name: "Carpentry and joinery", summary: "Panelling, storage units, beds, vanities, doors and frames made on site or in a workshop." },
  { slug: "modular-kitchen", name: "Modular kitchen", summary: "Base, wall and tall units, the countertop and the fittings, each its own line." },
  { slug: "wardrobes", name: "Wardrobes", summary: "Hinged and sliding wardrobes, lofts and internal drawers." },
  { slug: "painting", name: "Painting and polishing", summary: "Wall and ceiling paint, textures, wood polish and enamel." },
  { slug: "electrical", name: "Electrical", summary: "Wiring points, distribution boards, light fittings and data points." },
  { slug: "plumbing", name: "Plumbing and bathrooms", summary: "Concealed piping, waterproofing, sanitaryware and CP fittings." },
];

export type BoqItem = {
  id: string; // stable: `<trade>.<name>`, used in URLs (#anchors) and knowledge.json
  trade: string;
  name: string;
  unit: Unit;
  units?: Unit[]; // also quoted in
  basis?: boolean; // no standard; the line must say how it was measured
  measure: string;
  is?: (keyof typeof IS)[];
  spec: SpecKey[];
  omits: string[];
  description: string; // a ready-to-paste line; [brackets] are the values to fill
  // Words that name the item in someone else's BOQ, lower case. Nouns, never a
  // material alone: "granite" would claim "Granite skirting" for stone flooring.
  match: string[];
};

const CABINET: SpecKey[] = ["board", "thickness", "finish", "edge", "hardware"];

export const boqItems: BoqItem[] = [
  // Civil and demolition
  {
    id: "civil.demolition",
    trade: "civil",
    name: "Demolition and debris removal",
    unit: "ls",
    units: ["sqft", "sqm", "cum"],
    measure: "Priced as a lump sum for a defined scope, or by the area or volume broken out. Name what is removed and where the debris goes.",
    is: ["1200-18"],
    spec: [],
    omits: ["Carting debris off site and the dumping charge", "Protecting lifts, lobbies and floors that stay", "Society or building permissions"],
    description: "Dismantling existing [flooring / partitions / fixtures] in [rooms], including stacking reusable material and carting debris to an approved dump.",
    match: ["demolition", "dismantl", "breaking", "debris", "removal of existing"],
  },
  {
    id: "civil.block-partition",
    trade: "civil",
    name: "Brick or block partition wall",
    unit: "sqft",
    units: ["sqm", "cum"],
    measure: "By face area of wall built, openings deducted; thick walls are sometimes priced by volume.",
    is: ["1200-3"],
    spec: ["material", "thickness"],
    omits: ["Lintels over openings", "Plaster on both faces", "Curing"],
    description: "Providing and building [100] mm thick [AAC block / brick] partition in [cement mortar 1:4], including lintels over openings.",
    match: ["partition", "block work", "blockwork", "brick work", "brickwork", "masonry"],
  },
  {
    id: "civil.drywall",
    trade: "civil",
    name: "Gypsum board partition (drywall)",
    unit: "sqft",
    units: ["sqm"],
    measure: "By face area of partition, openings deducted.",
    spec: ["ceilingBoard", "framing", "thickness"],
    omits: ["Insulation inside the cavity", "Jointing tape and finishing for paint", "Openings and their framing"],
    description: "Providing and fixing [12.5] mm gypsum board partition on both faces of [GI] stud framing at [600] mm centres, joints taped and finished ready for paint.",
    match: ["drywall", "dry wall", "gypsum partition", "board partition", "stud partition"],
  },
  {
    id: "civil.plaster",
    trade: "civil",
    name: "Wall plaster",
    unit: "sqft",
    units: ["sqm"],
    measure: "By area plastered, openings over a set size deducted.",
    is: ["1200-12"],
    spec: ["thickness"],
    omits: ["Chicken mesh at joints between block and concrete", "Corner beads"],
    description: "Providing [12] mm thick cement plaster in [1:4] mortar on walls, including chicken mesh at block-concrete joints.",
    match: ["plaster", "plastering", "gypsum plaster", "punning"],
  },

  // False ceiling
  {
    id: "false-ceiling.gypsum",
    trade: "false-ceiling",
    name: "Gypsum board false ceiling (flat field)",
    unit: "sqft",
    units: ["sqm"],
    basis: true,
    measure: "The flat field by plan area. Coves, drops and bands are usually a separate running-ft line; say whether cut-outs are deducted.",
    is: ["1200-10"],
    spec: ["ceilingBoard", "framing", "thickness"],
    omits: ["Coves and bands (a separate line)", "Cut-outs for lights and grilles", "Access panels", "Paint on the ceiling"],
    description: "Providing and fixing false ceiling of [12.5] mm gypsum board on [GI] suspension framing, joints taped and finished; measured by plan area of the flat field, excluding coves and bands.",
    match: ["false ceiling", "ceiling"],
  },
  {
    id: "false-ceiling.cove",
    trade: "false-ceiling",
    name: "Ceiling cove, drop or band",
    unit: "rft",
    units: ["rm", "sqft"],
    basis: true,
    measure: "By running length along the cove or band; state its girth (height plus width).",
    is: ["1200-10"],
    spec: ["ceilingBoard", "framing", "size"],
    omits: ["LED strip and its profile", "Driver and wiring"],
    description: "Providing and making ceiling cove [300] mm wide × [150] mm drop in [12.5] mm gypsum board on [GI] framing; measured by running length.",
    match: ["ceiling cove", "ceiling band", "ceiling drop", "cove", "band", "drop", "bulkhead", "pelmet"],
  },
  {
    id: "false-ceiling.grid",
    trade: "false-ceiling",
    name: "Grid ceiling (mineral fibre tiles)",
    unit: "sqft",
    units: ["sqm"],
    measure: "By plan area.",
    is: ["1200-10"],
    spec: ["tile", "framing", "make"],
    omits: ["Trimming at walls", "Light fittings in the grid"],
    description: "Providing and fixing [600 × 600] mm mineral fibre ceiling tiles of [make] on exposed [GI] grid, including wall angle.",
    match: ["grid ceiling", "mineral fibre", "mineral fiber", "armstrong", "tile ceiling"],
  },
  {
    id: "false-ceiling.access-panel",
    trade: "false-ceiling",
    name: "Ceiling access panel",
    unit: "nos",
    measure: "By number, size stated.",
    spec: ["size"],
    omits: [],
    description: "Providing and fixing [600 × 600] mm concealed access panel in the false ceiling.",
    match: ["access panel", "inspection panel", "trap door"],
  },

  // Flooring and wall tiling
  {
    id: "flooring.vitrified",
    trade: "flooring",
    name: "Vitrified tile flooring",
    unit: "sqft",
    units: ["sqm"],
    measure: "By finished floor area laid; skirting is a separate line.",
    is: ["1200-11"],
    spec: ["tile", "make"],
    omits: ["Removing the old floor", "Levelling screed", "Skirting (a separate line)", "Wastage allowance on large tiles"],
    description: "Providing and laying [600 × 1200] mm vitrified tile flooring of [make, series] on [tile adhesive / cement mortar] bed, joints filled with [epoxy / cementitious] grout.",
    match: ["vitrified tile flooring", "vitrified flooring", "vitrified floor", "floor tile", "flooring tile", "tile flooring", "gvt", "pgvt"],
  },
  {
    id: "flooring.stone",
    trade: "flooring",
    name: "Marble or granite flooring",
    unit: "sqft",
    units: ["sqm"],
    measure: "By finished area laid.",
    is: ["1200-11"],
    spec: ["material", "thickness"],
    omits: ["Polishing after laying", "Removing the old floor"],
    description: "Providing and laying [18] mm [marble / granite] flooring, [mirror polished], on [cement mortar] bed, including machine polishing after laying.",
    match: ["marble flooring", "granite flooring", "stone flooring", "marble floor", "granite floor", "kota", "italian marble"],
  },
  {
    id: "flooring.wood",
    trade: "flooring",
    name: "Laminate or engineered wood flooring",
    unit: "sqft",
    units: ["sqm"],
    measure: "By finished area laid.",
    spec: ["thickness", "make"],
    omits: ["Underlay", "Skirting and end trims", "Levelling the sub-floor"],
    description: "Providing and laying [8] mm [laminate / engineered] wood flooring of [make, series] on [underlay], including end trims.",
    match: ["wooden floor", "wood floor", "laminate floor", "engineered wood", "vinyl", "spc"],
  },
  {
    id: "flooring.skirting",
    trade: "flooring",
    name: "Skirting",
    unit: "rft",
    units: ["rm"],
    measure: "By running length; state the height.",
    is: ["1200-11"],
    spec: ["material", "size"],
    omits: [],
    description: "Providing and fixing [100] mm high skirting in [vitrified tile / granite] to match the floor.",
    match: ["skirting"],
  },
  {
    id: "flooring.dado",
    trade: "flooring",
    name: "Wall dado tiling",
    unit: "sqft",
    units: ["sqm"],
    measure: "By wall area tiled; state the height.",
    is: ["1200-11"],
    spec: ["tile", "make", "size"],
    omits: ["Edge trims and corner profiles", "Cut-outs for fittings"],
    description: "Providing and fixing [300 × 600] mm wall tiles of [make, series] up to [2100] mm height on tile adhesive.",
    match: ["dado", "wall tile", "wall tiling", "cladding tile"],
  },

  // Carpentry and joinery
  {
    id: "carpentry.panelling",
    trade: "carpentry",
    name: "Wall panelling",
    unit: "sqft",
    units: ["sqm"],
    basis: true,
    measure: "By face area of panelling; say whether framing and grooves are included.",
    is: ["1200-21", "303"],
    spec: ["board", "thickness", "finish"],
    omits: ["Backing frame", "Lighting in grooves", "Cut-outs for switches"],
    description: "Providing and fixing wall panelling in [12] mm [IS 303 BWP] plywood on [batten] frame, finished in [1] mm laminate; measured by face area including frame.",
    match: ["panelling", "paneling", "wall panel", "backdrop", "fluted"],
  },
  {
    id: "carpentry.storage-unit",
    trade: "carpentry",
    name: "Storage unit (TV, crockery, shoe, study)",
    unit: "sqft",
    units: ["rft", "nos", "ls"],
    basis: true,
    measure: "Usually by front elevation area (height × width); some quote per unit. State which.",
    is: ["1200-21", "303"],
    spec: CABINET,
    omits: ["Glass and its frame", "Lights inside", "Handles", "Back panel"],
    description: "Providing and making [TV] unit in [18] mm [IS 303 BWP] plywood carcass, [1] mm laminate outside, [0.8] mm laminate inside, [2] mm PVC edge band, [make] soft-close hinges and channels; measured by front elevation area.",
    match: ["tv unit", "crockery", "shoe rack", "storage unit", "console", "study unit", "book shelf", "bookshelf", "cabinet"],
  },
  {
    id: "carpentry.bed",
    trade: "carpentry",
    name: "Bed with storage",
    unit: "nos",
    measure: "By number, size stated (for example 6 ft × 6.5 ft).",
    is: ["1200-21", "303"],
    spec: ["board", "thickness", "finish", "hardware", "size"],
    omits: ["Mattress", "Headboard upholstery", "Side tables"],
    description: "Providing and making [6 × 6.5] ft bed in [18] mm [IS 303 BWP] plywood with [hydraulic lift / drawer] storage of [make], finished in [1] mm laminate.",
    match: ["bed ", "bed with", "storage bed", "cot ", "headboard"],
  },
  {
    id: "carpentry.vanity",
    trade: "carpentry",
    name: "Bathroom vanity unit",
    unit: "rft",
    units: ["nos"],
    basis: true,
    measure: "By running length or per unit; state which.",
    is: ["303", "710"],
    spec: CABINET,
    omits: ["Counter and basin", "Mirror", "Plumbing connections"],
    description: "Providing and making vanity unit in [18] mm [IS 710 marine / IS 303 BWP] plywood, finished in [1] mm laminate, [2] mm PVC edge band, [make] hinges; measured by running length.",
    match: ["vanity"],
  },
  {
    id: "carpentry.flush-door",
    trade: "carpentry",
    name: "Flush door shutter",
    unit: "nos",
    units: ["sqft"],
    measure: "By number with size stated, or by shutter area.",
    is: ["2202-1", "1200-21"],
    spec: ["thickness", "finish", "hardware"],
    omits: ["Lock and handle", "Door closer and stopper", "Frame (a separate line)"],
    description: "Providing and fixing [35] mm flush door shutter to [IS 2202 (Part 1)], finished in [1] mm laminate both sides, with [3] stainless steel hinges of [make].",
    match: ["door shutter", "flush door", "door", "shutter"],
  },
  {
    id: "carpentry.door-frame",
    trade: "carpentry",
    name: "Door frame",
    unit: "rft",
    units: ["rm", "nos"],
    measure: "By running length of frame, or per door with size stated.",
    is: ["1200-21"],
    spec: ["material", "size"],
    omits: ["Architrave", "Fixing to masonry (hold-fasts)"],
    description: "Providing and fixing door frame of [sal wood / WPC] [100 × 60] mm section, including hold-fasts and architrave on [one / both] sides.",
    match: ["door frame", "chowkhat", "architrave"],
  },

  // Modular kitchen
  {
    id: "modular-kitchen.base",
    trade: "modular-kitchen",
    name: "Kitchen base cabinets",
    unit: "rft",
    units: ["sqft"],
    basis: true,
    measure: "Usually by running length along the wall at counter height; corners counted once. State whether the plinth and back panels are included.",
    is: ["303"],
    spec: CABINET,
    omits: ["Countertop (a separate line)", "Sink and tap", "Hob and chimney", "Baskets and corner units", "Plinth / skirting"],
    description: "Providing and making kitchen base cabinets [600] mm deep in [18] mm [IS 303 BWP] plywood carcass, shutters in [acrylic / laminate], [2] mm PVC edge band, [make] soft-close hinges and channels; measured by running length along the wall, excluding countertop and accessories.",
    match: ["base cabinet", "base unit", "kitchen base", "lower cabinet", "kitchen cabinet", "modular kitchen"],
  },
  {
    id: "modular-kitchen.wall",
    trade: "modular-kitchen",
    name: "Kitchen wall cabinets",
    unit: "rft",
    units: ["sqft"],
    basis: true,
    measure: "By running length along the wall; state the height.",
    is: ["303"],
    spec: CABINET,
    omits: ["Lift-up fittings", "Under-cabinet lights", "Glass shutters"],
    description: "Providing and making kitchen wall cabinets [700] mm high × [350] mm deep in [18] mm [IS 303 BWP] plywood, shutters in [laminate / acrylic], [2] mm PVC edge band, [make] hinges; measured by running length.",
    match: ["wall cabinet", "wall unit", "overhead", "upper cabinet", "kitchen wall"],
  },
  {
    id: "modular-kitchen.tall",
    trade: "modular-kitchen",
    name: "Kitchen tall unit",
    unit: "nos",
    units: ["sqft"],
    basis: true,
    measure: "Per unit with size stated, or by elevation area.",
    is: ["303"],
    spec: CABINET,
    omits: ["Pull-out larder fittings", "Appliance housing cut-outs"],
    description: "Providing and making [2100] mm tall unit [600] mm wide in [18] mm [IS 303 BWP] plywood, shutters in [laminate / acrylic], [2] mm PVC edge band, [make] tall pull-out; measured per unit.",
    match: ["tall unit", "larder", "pantry unit", "tandem tall"],
  },
  {
    id: "modular-kitchen.countertop",
    trade: "modular-kitchen",
    name: "Kitchen countertop",
    unit: "rft",
    units: ["sqft"],
    measure: "By running length or area; state the depth and edge profile.",
    spec: ["material", "thickness"],
    omits: ["Sink and hob cut-outs", "Backsplash", "Edge moulding"],
    description: "Providing and fixing [20] mm [granite / quartz] countertop [625] mm deep with [edge profile], including sink and hob cut-outs.",
    match: ["countertop", "counter top", "kitchen platform", "platform"],
  },
  {
    id: "modular-kitchen.accessories",
    trade: "modular-kitchen",
    name: "Kitchen baskets and corner fittings",
    unit: "nos",
    units: ["set"],
    measure: "By number, each fitting named.",
    spec: ["make", "size"],
    omits: [],
    description: "Providing and fixing [make, model] [cutlery / plate / corner] fitting for [600] mm cabinet.",
    match: ["basket", "tandem", "corner unit", "magic corner", "carousel", "cutlery", "accessor"],
  },
  {
    id: "modular-kitchen.backsplash",
    trade: "modular-kitchen",
    name: "Kitchen backsplash",
    unit: "sqft",
    units: ["sqm"],
    measure: "By wall area between counter and wall cabinets.",
    spec: ["material"],
    omits: ["Edge trims", "Cut-outs for sockets"],
    description: "Providing and fixing [quartz / glass / tile] backsplash between counter and wall cabinets.",
    match: ["backsplash", "back splash"],
  },

  // Wardrobes
  {
    id: "wardrobes.hinged",
    trade: "wardrobes",
    name: "Hinged-door wardrobe",
    unit: "sqft",
    units: ["rft"],
    basis: true,
    measure: "Usually by front elevation area (height × width). State whether the loft, side panels and internal drawers are included.",
    is: ["303"],
    spec: CABINET,
    omits: ["Loft (often a separate line)", "Internal drawers", "Mirror", "Lights", "Handles"],
    description: "Providing and making hinged wardrobe in [18] mm [IS 303 BWP] plywood carcass, [1] mm laminate outside, [0.8] mm laminate inside, [2] mm PVC edge band, [make] soft-close hinges; measured by front elevation area, excluding loft and drawers.",
    match: ["wardrobe", "almirah", "closet"],
  },
  {
    id: "wardrobes.sliding",
    trade: "wardrobes",
    name: "Sliding-door wardrobe",
    unit: "sqft",
    units: ["rft"],
    basis: true,
    measure: "By front elevation area; state what's included.",
    is: ["303"],
    spec: CABINET,
    omits: ["Sliding track system (often priced apart)", "Loft", "Mirror shutters"],
    description: "Providing and making sliding wardrobe in [18] mm [IS 303 BWP] plywood, shutters in [laminate / acrylic], [2] mm PVC edge band, [make, model] sliding system; measured by front elevation area, excluding loft.",
    match: ["sliding wardrobe", "sliding door", "sliding shutter"],
  },
  {
    id: "wardrobes.loft",
    trade: "wardrobes",
    name: "Loft",
    unit: "sqft",
    units: ["rft"],
    basis: true,
    measure: "By front elevation area or running length; state the depth.",
    is: ["303"],
    spec: ["board", "thickness", "finish", "hardware"],
    omits: [],
    description: "Providing and making loft [600] mm high in [18] mm [IS 303 BWP] plywood, shutters in [1] mm laminate, [make] hinges; measured by front elevation area.",
    match: ["loft"],
  },
  {
    id: "wardrobes.drawer",
    trade: "wardrobes",
    name: "Internal drawer",
    unit: "nos",
    measure: "By number, width stated.",
    spec: ["hardware", "size"],
    omits: ["Locks"],
    description: "Providing and making internal drawer [600] mm wide with [make] soft-close telescopic channels.",
    match: ["drawer"],
  },

  // Painting and polishing
  {
    id: "painting.emulsion",
    trade: "painting",
    name: "Interior emulsion on walls and ceilings",
    unit: "sqft",
    units: ["sqm"],
    measure: "By area painted; walls and ceilings are measured separately.",
    is: ["1200-13"],
    spec: ["make", "coats"],
    omits: ["Wall putty", "Repairs to cracks", "Primer", "Ceiling (a separate line)"],
    description: "Applying [make, product] interior emulsion in [two] coats over [two] coats of wall putty and [one] coat of primer.",
    match: ["emulsion", "paint", "painting", "putty"],
  },
  {
    id: "painting.texture",
    trade: "painting",
    name: "Texture or designer finish",
    unit: "sqft",
    units: ["sqm"],
    measure: "By area finished.",
    is: ["1200-13"],
    spec: ["make"],
    omits: ["Base coat preparation", "Sample panel"],
    description: "Applying [make, product] texture finish over prepared surface, as per approved sample.",
    match: ["texture", "designer finish", "stucco", "royale play", "metallic"],
  },
  {
    id: "painting.wood-polish",
    trade: "painting",
    name: "Wood polish",
    unit: "sqft",
    units: ["sqm"],
    measure: "By surface area polished.",
    is: ["1200-15"],
    spec: ["finish", "coats"],
    omits: ["Staining", "Sanding sealer"],
    description: "Applying [PU / melamine] polish in [matt / gloss] finish, [three] coats over sanding sealer, on wood surfaces.",
    match: ["polish", "melamine", "pu finish", "lacquer"],
  },
  {
    id: "painting.enamel",
    trade: "painting",
    name: "Enamel on metal",
    unit: "sqft",
    units: ["sqm"],
    measure: "By surface area painted.",
    is: ["1200-15"],
    spec: ["make", "coats"],
    omits: ["Rust removal", "Primer"],
    description: "Applying [make] synthetic enamel in [two] coats over [one] coat of primer on steel surfaces.",
    match: ["enamel", "oil paint", "grill", "railing paint"],
  },

  // Electrical
  {
    id: "electrical.point",
    trade: "electrical",
    name: "Wiring point (light, fan, socket)",
    unit: "point",
    units: ["nos"],
    basis: true,
    measure: "By point. State what one point includes: conduit, wire to the board, switch and plate.",
    spec: ["wire", "make"],
    omits: ["Distribution board and MCBs", "Earthing", "Chasing walls and making good", "Light fittings"],
    description: "Wiring [light / 6 A socket / 16 A power] point with [1.5] sq mm FRLS copper wire in concealed PVC conduit, including [make] modular switch and plate; one point measured from the board to the outlet.",
    match: ["point", "wiring", "socket", "switch", "light point", "power point"],
  },
  {
    id: "electrical.db",
    trade: "electrical",
    name: "Distribution board and MCBs",
    unit: "nos",
    measure: "By number, ways and protection stated.",
    spec: ["make"],
    omits: ["RCCB / ELCB", "Incoming cable"],
    description: "Providing and fixing distribution board, [8]-way, of [make] with [MCBs and RCCB as per schedule].",
    match: ["distribution board", "db ", "mcb", "rccb", "elcb"],
  },
  {
    id: "electrical.fittings",
    trade: "electrical",
    name: "Light fittings",
    unit: "nos",
    measure: "By number, each fitting named.",
    spec: ["make"],
    omits: ["Drivers for LED strips", "Profiles"],
    description: "Supplying and fixing [make, model] [10] W LED downlight, [3000] K.",
    match: ["light fitting", "downlight", "led", "luminaire", "chandelier", "profile light", "strip"],
  },
  {
    id: "electrical.data",
    trade: "electrical",
    name: "Data or TV point",
    unit: "point",
    units: ["nos"],
    measure: "By point, cable type stated.",
    spec: ["wire", "make"],
    omits: ["Router or switch", "Termination and testing"],
    description: "Providing [CAT6] data point in concealed conduit with [make] modular socket.",
    match: ["data point", "cat6", "lan", "tv point", "telephone point"],
  },

  // Plumbing and bathrooms
  {
    id: "plumbing.piping",
    trade: "plumbing",
    name: "Concealed water supply piping",
    unit: "point",
    units: ["rft", "rm", "ls"],
    basis: true,
    measure: "By point or by running length; state which, and what a point includes.",
    is: ["1200-19"],
    spec: ["pipe", "make"],
    omits: ["Pressure test", "Chasing and making good", "Concealed diverter bodies"],
    description: "Providing concealed water supply piping in [CPVC / PPR] of [make], [20] mm, including fittings and pressure test; measured by point.",
    match: ["piping", "plumbing", "cpvc", "ppr", "water supply", "pipe"],
  },
  {
    id: "plumbing.waterproofing",
    trade: "plumbing",
    name: "Bathroom waterproofing",
    unit: "sqft",
    units: ["sqm"],
    measure: "By area treated, wall upturn included; state the upturn height.",
    spec: ["make", "coats"],
    omits: ["Ponding test", "Protective screed over the membrane"],
    description: "Waterproofing bathroom floor and walls up to [300] mm with [make, system] in [two] coats, including ponding test.",
    match: ["waterproof", "water proof", "membrane"],
  },
  {
    id: "plumbing.sanitary",
    trade: "plumbing",
    name: "Sanitaryware",
    unit: "nos",
    measure: "By number, each piece named.",
    spec: ["make"],
    omits: ["Concealed cistern", "Seat cover", "Fixing accessories"],
    description: "Supplying and fixing [make, model] [wall-hung WC / counter-top basin], including fixing accessories.",
    match: ["wc", "basin", "sanitary", "commode", "urinal", "wash basin"],
  },
  {
    id: "plumbing.cp-fittings",
    trade: "plumbing",
    name: "CP fittings (taps, mixers, showers)",
    unit: "nos",
    units: ["set", "ls"],
    measure: "By number, each fitting named; a lump sum per bathroom hides what's inside.",
    is: ["1200-19"],
    spec: ["make"],
    omits: ["Concealed bodies for diverters", "Angle valves", "Health faucet"],
    description: "Supplying and fixing [make, model] [single-lever diverter / basin mixer / overhead shower].",
    match: ["cp fitting", "tap", "mixer", "shower", "diverter", "faucet", "cock"],
  },
];

export const tradeItems = (slug: string) => boqItems.filter((i) => i.trade === slug);
export const tradeBySlug = (slug: string) => trades.find((t) => t.slug === slug);
