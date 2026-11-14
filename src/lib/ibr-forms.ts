// Every form in the Indian Boiler Regulations, 2026 (Gazette of India No. 596,
// 1 October 2026) and the IBR 1950 form it replaced. The one place this mapping
// lives: /ibr, /ibr/forms, each /ibr/forms/<slug> page, llms.txt and
// knowledge.json all render from it, so a correction lands everywhere at once.
//
// Nothing here is from memory. `quote` is the form's own title as printed in the
// 2026 Gazette and `oldQuote` its title in the IBR 1950 forms index (Maharashtra
// Boiler Directorate); `facts[].quote` are verbatim lines from the regulations.
// scripts/check-ibr-quotes.mjs fails the build if any of them isn't in the
// source text, and prints the Gazette page for each — the claim sheet.
//
// Mapping old → new is by matching titles across the two documents; regulation
// 8 of IBR 2026 against regulations 3–8 of IBR 1950 confirms the folder forms.

export type IbrFact = { reg: string; quote: string };

export type IbrForm = {
  slug: string;
  form: string; // "Form IV"
  part?: string; // "Part A"
  title: string; // display title, from the Gazette
  quote: string; // verbatim title from the 2026 Gazette
  regulation: string; // regulation the form is prescribed under
  group: IbrGroup;
  old?: { form: string; title: string; quote: string }; // IBR 1950 equivalent
  summary: string; // one plain sentence: what it is
  // Only folder forms carry these, and get their own page.
  page?: {
    issuedBy: string;
    filedWith: string;
    records: string[];
    changed: string;
    facts: IbrFact[];
  };
};

export type IbrGroup =
  | "inspection"
  | "manufacture"
  | "materials"
  | "registration"
  | "economisers"
  | "welders"
  | "recognition"
  | "in-service";

export const ibrGroups: { id: IbrGroup; name: string }[] = [
  { id: "inspection", name: "Inspecting Authority certificates" },
  { id: "manufacture", name: "Certificates of manufacture and test" },
  { id: "materials", name: "Material certificates" },
  { id: "registration", name: "Registration and use" },
  { id: "economisers", name: "Economisers" },
  { id: "welders", name: "Welders" },
  { id: "recognition", name: "Recognition by the Central Boilers Board" },
  { id: "in-service", name: "Repairs and in-service inspection" },
];

// When the form pages were last checked against the Gazette, and first published.
export const IBR_FORMS_CHECKED = "2026-11-14";
export const IBR_FORMS_PUBLISHED = "2026-10-17";

// The official copy on eGazette (ID CG-DL-E-06102026-276813), checked to match
// the 997-page Gazette the quotes are verified against.
export const IBR_2026_URL = "https://egazette.gov.in/WriteReadData/2026/276813.pdf";

export const IBR_2026 = {
  name: "Indian Boiler Regulations, 2026",
  gazette: "Gazette of India, Extraordinary, Part III—Section 4, No. 596",
  published: "2026-10-01",
  madeOn: "2026-08-07",
};

export const ibrForms: IbrForm[] = [
  {
    slug: "form-i-part-a",
    form: "Form I",
    part: "Part A",
    title: "Inspecting Authority's certificate of inspection during construction, boiler made to a foreign code for export",
    quote: "INSPECTING AUTHORITIES CERTIFICATE OF INSPECTION DURING CONSTRUCTION IN RESPECT OF A BOILER MADE TO FOREIGN CODE FOR EXPORT",
    regulation: "4",
    group: "inspection",
    old: {
      form: "Form II-A",
      title: "Inspecting Authority certificate of inspection during construction in respect of the boiler made to foreign code",
      quote: "Inspecting Authority Certificate of Inspection during",
    },
    summary: "The Inspecting Authority's certificate of inspection during construction for a boiler made to a foreign code for export.",
    page: {
      issuedBy: "The Inspecting Authority that supervised construction of a boiler built in India to a foreign code for export.",
      filedWith: "Sent with the boiler and the maker's certificate required by the foreign code, which the Inspecting Authority countersigns.",
      records: [
        "Type, length, diameter and design pressure of the boiler, the maker and shop number",
        "That it was built under the Inspecting Authority's supervision and inspected at stages by the Competent Person",
        "How the boiler is stamped",
        "The test pressure and date, with details of tests and inspections attached",
        "That the design matches the maker's drawing approved and signed by the Inspecting Authority"
      ],
      changed: "New in IBR 2026: a certificate for boilers made in India to a foreign code (ASME, for example) for export. See ASME vs IBR 2026.",
      facts: [
        {
          reg: "4",
          quote: "INSPECTING AUTHORITIES CERTIFICATE OF INSPECTION DURING CONSTRUCTION IN RESPECT OF A BOILER MADE TO FOREIGN CODE FOR EXPORT"
        },
        {
          reg: "Form I Part A",
          quote: "was constructed under our supervision and inspected at various stages at construction by the Competent Person"
        }
      ]
    },
  },
  {
    slug: "form-i-part-b",
    form: "Form I",
    part: "Part B",
    title: "Certificate of inspection for shop assembled boilers",
    quote: "CERTIFICATE OF INSPECTION FOR SHOP ASSEMBLED BOILERS",
    regulation: "8(a)",
    group: "inspection",
    old: {
      form: "Form II(1)",
      title: "Certificate of inspection for shop assembled boilers",
      quote: "Certificate of Inspection for Shop Assembled Boilers",
    },
    summary:
      "The Inspecting Authority's certificate that a shop-assembled boiler was built under its supervision, inspected at each stage and hydrostatically tested.",
    page: {
      issuedBy: "The Inspecting Authority, signed by its Competent Person and the Inspecting Authority, with date and seal.",
      filedWith:
        "Goes to the Chief Inspector with the registration application, alongside Form IV Part A, the drawings and the material certificates (regulation 8).",
      records: [
        "The boiler type, maker and maker's number",
        "That it was built under supervision and inspected at stages by the Competent Person",
        "The stamp on the shell plate: maker's name and number, year of make, test pressure and date, design pressure in kg/cm² (g)",
        "The hydrostatic test pressure and the date it was witnessed",
        "That welded seams passed destructive and non-destructive examination where applicable",
        "The maker's drawing number, and that Form IV Part A was countersigned",
      ],
      changed:
        "Under IBR 1950 this was Form II(1). The wording is nearly the same; the stamp now shows the design pressure where the 1950 form showed the working pressure (W.P.), and the form refers to the Boilers Act, 2025 and to Form IV Part A instead of Form III.",
      facts: [
        {
          reg: "8(a)(i)",
          quote:
            "A certificate in Form-I(Part-B) or Form-I(Part-C), as the case may be, from an Inspecting Authority, certifying that the material was tested and the boiler was built under their supervision",
        },
        { reg: "Form I Part B", quote: "was constructed under our supervision and inspected at various stages of construction by the Competent Person" },
        { reg: "Form I Part B", quote: "All welded seams were subjected to destructive and Non-Destructive examination wherever applicable and found satisfactory." },
      ],
    },
  },
  {
    slug: "form-i-part-c",
    form: "Form I",
    part: "Part C",
    title: "Certificate of inspection for site assembled boilers at maker's works",
    quote: "CERTIFICATE OF INSPECTION FOR SITE ASSEMBLED BOILERS AT MAKER’S WORKS",
    regulation: "8(a)",
    group: "inspection",
    old: {
      form: "Form II(2)",
      title: "Certificate of inspection for site assembled boilers",
      quote: "Certificate of Inspection for Site Assembled Boilers",
    },
    summary:
      "The Inspecting Authority's certificate for the parts of a site-assembled boiler made and inspected at the maker's works.",
    page: {
      issuedBy: "The Inspecting Authority, signed by its Competent Person and the Inspecting Authority.",
      filedWith:
        "Goes with the registration application in place of Form I Part B when the boiler is assembled at site (regulation 8). Form I Part E follows once erection is complete.",
      records: [
        "The boiler, maker and maker's number, and that it was built under supervision and inspected at stages by the Competent Person",
        "Each component's name, drawing number and stamping details",
        "Test pressure and design pressure in kg/cm² (g)",
        "That material samples were tested in the Competent Person's presence, and welded seams passed destructive and non-destructive examination",
        "The maker's drawing number, and that Form IV Part A was countersigned",
      ],
      changed: "Under IBR 1950 this was Form II(2).",
      facts: [
        {
          reg: "8(a)(ii)",
          quote:
            "In case of a boiler which is to be assembled only at site, requirement of the hydraulic test on a completely assembled boiler by the Inspecting Authority shall not apply provided that the individual parts of such boiler have been hydraulically tested and certified by the Inspecting Authority separately",
        },
        { reg: "Form I Part C", quote: "The Boiler components are stamped as per details below, wherever applicable." },
        {
          reg: "Form I Part C",
          quote: "Samples of materials used in the constructions of the boiler were tested in the presence of the Competent Person and found to comply with the regulations.",
        },
      ],
    },
  },
  {
    slug: "form-i-part-d",
    form: "Form I",
    part: "Part D",
    title: "Inspecting Authority's certificate of inspection during construction of boilers with permitted variations from standard conditions",
    quote: "INSPECTING AUTHORITY CERTIFICATE OF INSPECTION DURING CONSTRUCTION OF BOILERS FOR WHICH VARIATIONS FROM STANDARD CONDITI",
    regulation: "8(a)(iv)",
    group: "inspection",
    old: {
      form: "Form II-B",
      title: "Inspecting Authority certificate of inspection for boilers for which variation from standard conditions has been permitted",
      quote: "Inspection of boilers for which variation from standard",
    },
    summary:
      "Replaces Form I Part B or C for a boiler built with variations from the standard conditions that the Board or the Inspecting Authority permitted.",
    page: {
      issuedBy: "The Inspecting Authority.",
      filedWith: "Filed in place of Form I Part B or Part C (regulation 8(a)(iv)).",
      records: [
        "The boiler type, length, diameter, design pressure, maker and shop number",
        "That it was built under supervision, in accordance with the permitted variations from the standard conditions",
        "The stamp on the front end plate",
        "The water pressure test of the drum and header",
        "Material and weld tests, struck out where a Well-known steel maker's Form V Part A is furnished instead",
        "The maker's drawing number, and that Form IV Part A was countersigned",
      ],
      changed: "Under IBR 1950 this was Form II-B.",
      facts: [
        {
          reg: "8(a)(iv)",
          quote:
            "The Inspecting Authority may grant a certificate in Form-I(Part-D) in lieu of Form-I(Part-B) or Form- I(Part-C), for boilers for which variations from the standard conditions in respect of material, design and construction features permitted by the Board or the Inspecting Authority.",
        },
        {
          reg: "Form I Part D",
          quote: "Strike off this paragraph where no such tests have been carried out and the certificate in Form-V(Part-A) by a Well- Known steel Maker is intended to be furnished.",
        },
      ],
    },
  },
  {
    slug: "form-i-part-e",
    form: "Form I",
    part: "Part E",
    title: "Inspecting Authority's certificate of inspection after completion of boiler erection at assembly site",
    quote: "INSPECTING AUTHORITIES CERTIFICATE OF INSPECTION AFTER COMPLETION OF BOILER ERECTION AT ASSEMBLY SITE",
    regulation: "8(a)(v)",
    group: "inspection",
    old: {
      form: "Form II-C",
      title: "Inspecting Authority certificate of inspection during erection",
      quote: "Inspecting Authority Certificate of Inspection during Erection",
    },
    summary: "The Inspecting Authority's certificate once a boiler is erected at site and passes its hydrostatic test there.",
    page: {
      issuedBy: "The Inspecting Authority, signed by its Competent Person and the Inspecting Authority.",
      filedWith: "Issued after erection and the site hydrostatic test, for boilers assembled at site (regulation 8(a)(v)).",
      records: [
        "The boiler type, design pressure, maker and maker's number",
        "That it was erected under supervision and inspected at stages of erection by the Competent Person",
        "That welded seams had post-weld heat treatment and non-destructive examination where applicable",
        "The water pressure test after erection, its pressure and date",
      ],
      changed: "Under IBR 1950 this was Form II-C.",
      facts: [
        {
          reg: "8(a)(v)",
          quote:
            "The Inspecting Authority shall issue certificate in Form-I(Part-E) after completion of boiler erection and satisfactory hydrostatic test at the assembly site.",
        },
        {
          reg: "Form I Part E",
          quote: "All welded seams were subjected to post weld Heat treatment and Non-destructive examination wherever applicable and found satisfactory.",
        },
      ],
    },
  },
  {
    slug: "form-ii",
    form: "Form II",
    title: "Qualified boiler welder's certificate",
    quote: "QUALIFIED BOILER WELDER’S CERTIFICATE NO:",
    regulation: "7(1)(b)(iii) and 541",
    group: "welders",
    old: { form: "Form XIII", title: "Qualified boiler welder's certificate", quote: "Qualified Boiler Welder's Certificate" },
    summary:
      "The certificate a welder must hold to weld boilers, boiler components, economisers, feed pipes, steam pipes and superheaters (regulation 7(1)(b)(iii)).",
    page: {
      issuedBy: "The Competent Authority, after the welder passes the qualification test under regulation 541.",
      filedWith: "Held by the welder; the employer keeps a copy, and the Inspecting Authority checks it before welding on IBR work.",
      records: [
        "Certificate number, the welder's photo, name, date of birth, identification marks, signature and address",
        "Employment particulars",
        "Qualification details: date of test, type and position, material type and grouping (M and group number), process, backing, electrode grouping (U number) or filler wire, whether the test piece was X-rayed",
        "Period of validity and the basis of each renewal (continuous engagement or fresh tests)"
      ],
      changed: "Under IBR 1950 the welder's certificate was Form XIII; it is now Form II. Continuity is proved on Form XX, and the test itself is recorded on Form XXI.",
      facts: [
        {
          reg: "7(1)(b)(iii)",
          quote: "shall possess certificate in Form-II"
        },
        {
          reg: "Form II",
          quote: "has been examined and tested in the prescribed manner"
        }
      ]
    },
  },
  {
    slug: "form-iii",
    form: "Form III",
    title: "Questionnaire for manufacturers of boilers and boiler components",
    quote: "QUESTIONNAIRE FORM FOR MANUFACTURER OF BOILERS/BOILER COMPONENTS UNDER THE INDIAN",
    regulation: "7(1)(b)(v)",
    group: "recognition",
    summary:
      "The questionnaire a firm answers to be recognised as a manufacturer of boilers or boiler components. New in 2026; recognition lasts three years.",
    page: {
      issuedBy: "The firm applying for recognition as a boiler or boiler component manufacturer.",
      filedWith: "An Inspecting Authority operating in the State where recognition is sought, with the fee for the class applied for.",
      records: [
        "Registered name, permanent and works addresses, year of establishment",
        "Class applied for: Special Class, Class I to Class IV, or components manufacturer",
        "Covered area; design, manufacturing, testing and R&D facilities",
        "Numbers of qualified NDT personnel and welders, technical manpower",
        "Internal quality control systems"
      ],
      changed: "New in IBR 2026: manufacturers are recognised by class. Recognition lasts three years; apply for renewal at least three months before it expires.",
      facts: [
        {
          reg: "7(1)(b)(v)",
          quote: "any firm seeking recognition shall apply to an Inspecting Authority operating in the State in which"
        },
        {
          reg: "Form III, note 1",
          quote: "The recognition of the firm as a manufacturer shall be for a period of three years"
        },
        {
          reg: "Form III",
          quote: "A higher class boiler manufacturer shall be eligible to manufacture lower class boilers."
        }
      ]
    },
  },
  {
    slug: "form-iv-part-a",
    form: "Form IV",
    part: "Part A",
    title: "Constructor's certificate of manufacture and test",
    quote: "CONSTRUCTOR’S CERTIFICATE OF MANUFACTURE AND TEST",
    regulation: "8(b)",
    group: "manufacture",
    old: { form: "Form III", title: "Constructor's certificate of manufacture and test", quote: "Constructor's Certificate of Manufacture and Test" },
    summary:
      "The boiler maker's own certificate describing the boiler, its parts, materials, construction, mountings and tests.",
    page: {
      issuedBy: "The maker of the boiler or its representative; the Inspecting Authority countersigns it.",
      filedWith:
        "Goes with the registration application, with Form I Part B or C, the drawings, and Form V Part B listing every material certificate used (regulation 8).",
      records: [
        "Description: constructor, contract, type of boiler, length and diameter, design pressure, maker's number and year of make, heating surface, evaporation capacity, steam temperatures",
        "Parts made at the constructor's works, and parts made outside it, with drawing numbers and makers",
        "Construction: the chapter it complies with, numbers of longitudinal and circumferential seams, weld repairs, heat treatment, radiography",
        "Drums and shells; headers and boxes",
        "Mountings: main and auxiliary stop valves, safety valves, blow-down valves, feed check valves",
        "Safety valve details and test results",
        "The maker's certification that the listed parts were used, backed by the makers' certificates",
      ],
      changed:
        "Under IBR 1950 this was Form III. Under IBR 2026 the extract of all material test certificates (Form V Part B) is filed with it.",
      facts: [
        {
          reg: "8(b)",
          quote: "A certificate in Form-IV(Part-A) of manufacture and test signed by the maker of the boiler or its representative",
        },
        {
          reg: "8(b)",
          quote: "the intended working pressure, the area of heating surface, the maximum continuous evaporative capacity, the year and place of manufacture, and the works number of the boiler.",
        },
        {
          reg: "8(d)(iv)",
          quote: "The extract of all test certificates of materials used in boiler and boiler components in Form-V(Part-B) along with Form-IV(Part-A).",
        },
        { reg: "Form IV Part A", quote: "Number of longitudinal seams in shell/drum in each belt" },
        {
          reg: "Form IV Part A",
          quote: "The particulars shown against the various parts used are in accordance with the enclosed certificates from the respective Makers.",
        },
      ],
    },
  },
  {
    slug: "form-iv-part-b",
    form: "Form IV",
    part: "Part B",
    title: "Certificate of manufacture and test for pipes",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST FOR PIPES",
    regulation: "10",
    group: "manufacture",
    old: { form: "Form III-A", title: "Certificate of manufacture and test for pipes", quote: "Certificate of Manufacture and Test for Pipes" },
    summary: "The certificate of manufacture and test for steam and feed pipes.",
    page: {
      issuedBy: "The pipe maker and the Inspecting Authority. Well-known pipe makers may issue it online with a digital signature.",
      filedWith: "Kept with the boiler's records by the Inspecting Authority, the owner and the manufacturer (regulation 308).",
      records: [
        "The part and quantity, drawing number, maker and customer",
        "The steel: process of manufacture, fully killed or rimmed, chemical composition, heat number, size, test certificate number and date, steel maker",
        "The pipe: process of manufacture, main dimensions, tolerances, specification",
        "Tests: bend test on pipe or weld, flattening, tensile strength, chemical composition, heat treatment, hydraulic test in kg/cm² (g)",
        "The identification mark of the Inspecting Authority or well-known pipe maker",
      ],
      changed: "Under IBR 1950 this was Form III-A, which is the name many folders still use.",
      facts: [
        {
          reg: "10",
          quote:
            "A certificate of manufacture and test in Form-IV(Part-B) signed by the maker and the Inspecting Authority shall be furnished and well-known pipe makers may also furnish digitally signed",
        },
        { reg: "Form IV Part B", quote: "Identification mark of Inspecting Authority/Well known pipe maker" },
      ],
    },
  },
  {
    slug: "form-iv-part-c",
    form: "Form IV",
    part: "Part C",
    title: "Certificate of manufacture and test for tubes",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST FOR TUBES",
    regulation: "11",
    group: "manufacture",
    old: { form: "Form III-B", title: "Certificate of manufacture and test for tubes", quote: "Certificate of Manufacture and Test for tubes" },
    summary: "The certificate of manufacture and test for boiler tubes.",
    page: {
      issuedBy: "The tube maker and the Inspecting Authority. Well-known tube makers may issue it electronically with a digital signature.",
      filedWith: "Kept with the boiler's records by the Inspecting Authority, the owner and the manufacturer (regulation 308).",
      records: [
        "The part and quantity, drawing number, maker and customer",
        "The steel: process of manufacture, fully killed or rimmed, chemical composition, heat number, size, test certificate number and date, steel maker",
        "The tube: process of manufacture, main dimensions, tolerances, specification",
        "Tests: tensile strength, elongation, bend, flattening, crushing, flare and flange tests, heat treatment, hydraulic test in kg/cm² (g)",
      ],
      changed: "Under IBR 1950 this was Form III-B.",
      facts: [
        {
          reg: "11",
          quote: "A certificate of manufacture and test in Form-IV(Part-C), signed by the maker and the Inspecting Authority shall be furnished",
        },
        { reg: "Form IV Part C", quote: "Crushing test" },
      ],
    },
  },
  {
    slug: "form-iv-part-d",
    form: "Form IV",
    part: "Part D",
    title: "Certificate of manufacture and test of boiler mountings and fittings",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST OF BOILER MOUNTINGS AND FITTINGS",
    regulation: "12",
    group: "manufacture",
    old: { form: "Form III-C", title: "Certificate of manufacture and test of boiler mountings and fittings", quote: "Certificate of Manufacture and Test of Boiler mounting" },
    summary: "The certificate for boiler mountings and fittings such as valves.",
    page: {
      issuedBy: "The maker of the mounting or fitting and the Inspecting Authority. Valve chests from well-known foundries or forges recognised by the Central Boilers Board carry the material particulars from their own certificates.",
      filedWith: "Supplied with the mountings and fittings to the boiler maker or owner, and kept with the boiler's records (regulation 308).",
      records: [
        "Name of part, quantity, serial numbers, drawing number, maker and customer",
        "Maximum allowable working pressure in kg/cm² (g), design temperature and hydraulic test pressure",
        "Main dimensions, specification and the Inspecting Authority's identification marks",
        "Chemical composition and physical tests: tensile strength, transverse bend test, elongation, other tests",
        "Raw material: process of manufacture, fully killed or rimmed, specification, heat number, size, test certificate number and date, maker",
        "The maker's certificate of the hydraulic test, and the Inspecting Authority's countersignature with the Competent Person who witnessed it",
        "For safety valves, the details and test results of item 8 of Form IV Part A"
      ],
      changed: "Under IBR 1950 this was Form III-C, the name many valve makers and folders still use. For stock and sale, one form now covers at most fifty mountings and fittings.",
      facts: [
        {
          reg: "12",
          quote: "A certificate of manufacture and test in Form-IV(Part-D), signed by the maker and the Inspecting Authority in respect of boiler mountings and steam-pipe fittings during manufacture, shall be furnished."
        },
        {
          reg: "12, note",
          quote: "A Photocopy of certificate in Form-IV(Part-D) shall be accepted provided it is endorsed by the manufacturer or the Inspecting Authority who has signed the original certificate."
        },
        {
          reg: "Form IV Part D, note 3",
          quote: "For Stock and sale purpose, one Form shall be issued for not more than fifty mountings and fittings."
        }
      ]
    },
  },
  {
    slug: "form-iv-part-e",
    form: "Form IV",
    part: "Part E",
    title: "Certificate of manufacture and test of castings",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST OF CASTINGS",
    regulation: "13 and 50 to 57",
    group: "manufacture",
    old: { form: "Form III-F", title: "Certificate of manufacture and test of castings", quote: "Certificate of Manufacture and Test of castings" },
    summary: "The certificate for castings used in a boiler.",
    page: {
      issuedBy: "The foundry and the Inspecting Authority. Castings from well-known foundries recognised by the Central Boilers Board need no Inspecting Authority signature.",
      filedWith: "Supplied with the castings to the buyer and kept with the boiler's records (regulation 308).",
      records: [
        "Certificate number and date, heat number and date of pouring",
        "Maker and customer, drawing numbers, description, quantity and serial numbers",
        "Foundry identification",
        "Chemical composition and heat treatment",
        "Physical tests: tensile strength, transverse bend test, elongation, other tests",
        "Signatures of the maker, the Competent Person, and the Inspecting Authority or well-known foundry"
      ],
      changed: "Under IBR 1950 this was Form III-F. Castings larger than 100 mm must carry the heat number as cast, except investment castings.",
      facts: [
        {
          reg: "13",
          quote: "A certificate of manufacture and test in Form-IV(Part-E), signed by the maker and the Inspecting Authority shall be furnished."
        },
        {
          reg: "13",
          quote: "in the case of castings manufactured by well known foundries recognised by the Central Boilers Board, signature of Inspecting Authority shall not be required."
        },
        {
          reg: "Form IV Part E",
          quote: "for castings of size more than 100mm Heat number must be as Cast except for Investment castings."
        }
      ]
    },
  },
  {
    slug: "form-iv-part-f",
    form: "Form IV",
    part: "Part F",
    title: "Certificate of manufacture and test of forgings",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST OF FORGINGS",
    regulation: "14 and 58 to 62",
    group: "manufacture",
    old: { form: "Form III-G", title: "Certificate of manufacture and test of forgings", quote: "Certificate of Manufacture and Test of Forgings" },
    summary: "The certificate for forgings used in a boiler.",
    page: {
      issuedBy: "The forge and the Inspecting Authority. Forgings from well-known forges recognised by the Central Boilers Board need no Inspecting Authority signature.",
      filedWith: "Supplied with the forgings to the buyer and kept with the boiler's records (regulation 308).",
      records: [
        "Certificate number and date, heat number and details of the raw material",
        "Maker and customer, drawing numbers, description, quantity and serial numbers",
        "Forge shop identification",
        "Chemical composition and heat treatment",
        "Physical tests: tensile strength, transverse bend test, elongation, other tests",
        "Signatures of the maker, the Competent Person, and the Inspecting Authority or well-known forge"
      ],
      changed: "Under IBR 1950 this was Form III-G.",
      facts: [
        {
          reg: "14",
          quote: "A certificate of manufacture and test in Form-IV(Part-F), signed by the maker and the Inspecting Authority shall be furnished."
        },
        {
          reg: "14",
          quote: "in the case of forgings manufactured by well known forges recognised by the Central Boilers Board, signature of Inspecting Authority shall not be required."
        }
      ]
    },
  },
  {
    slug: "form-iv-part-g",
    form: "Form IV",
    part: "Part G",
    title: "Certificate of manufacture and test for headers, desuperheaters/attemperators, blowdown tanks, feed water tanks, accumulators and deaerators",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST FOR (HEADERS,",
    regulation: "15",
    group: "manufacture",
    old: {
      form: "Form III-H",
      title: "Certificate of manufacture and test for headers, desuperheaters/attemperator, blowdown tank, feed water tanks, accumulator, deaerator",
      quote: "Certificate of Manufacture and Test for Headers, Desuperheaters/",
    },
    summary: "The certificate for headers and similar standalone pressure parts, such as a steam header.",
    page: {
      issuedBy: "The maker of the part and the Inspecting Authority.",
      filedWith: "Supplied with the part to the boiler maker or owner, and kept with the boiler's records (regulation 308).",
      records: [
        "Name of the part, maker, customer and drawing number",
        "Maximum allowable working pressure, design temperature, heat treatment, hydraulic test pressure and non-destructive testing",
        "Raw material: refers to the enclosed material test certificates, or Form V Part B in lieu",
        "A table of items (pipe, end cover, stubs, branch pipes) with material, size, quantity and melt number",
        "The maker's certificate of the water test, the final inspection date, and the Competent Person's and Inspecting Authority's signatures"
      ],
      changed: "New as a separate certificate in IBR 2026: headers, desuperheaters or attemperators, blowdown tanks, feedwater tanks, accumulators and deaerators each have one form.",
      facts: [
        {
          reg: "15",
          quote: "Certificate of inspection during manufacture of Headers, Desuperheaters or Attemperators, Blowdown Tanks, Feedwater Tanks, Accumulators and Dearators."
        },
        {
          reg: "15",
          quote: "signed by the maker and the Inspecting Authority, shall be furnished."
        }
      ]
    },
  },
  {
    slug: "form-iv-part-h",
    form: "Form IV",
    part: "Part H",
    title: "Certificate of manufacture and test for dished ends and end covers",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST FOR DISHED ENDS / END COVERS",
    regulation: "16",
    group: "manufacture",
    old: { form: "Form III-I", title: "Certificate of manufacture and test for dished ends/end covers", quote: "Certificate of Manufacture and Test for Dished Ends/End Covers" },
    summary: "The certificate for dished ends and end covers.",
    page: {
      issuedBy: "The maker of the dished end or end cover and the Inspecting Authority.",
      filedWith: "Supplied with the dished ends to the boiler maker, and kept with the boiler's records (regulation 308).",
      records: [
        "Name of the part, maker, customer and drawing number",
        "Maximum allowable working pressure, design temperature, heat treatment, hydraulic test pressure and non-destructive testing",
        "Raw material test certificates enclosed, or Form V Part B in lieu",
        "For each plate or forging: material specification, size, quantity, melt number or plate number, and test certificate number and date",
        "The final inspection date and the Competent Person's and Inspecting Authority's signatures"
      ],
      changed: "Under IBR 1950 this was Form III-I. Dished ends bought from a pressing shop come with this form and the plate's own certificate.",
      facts: [
        {
          reg: "16",
          quote: "Certificate of inspection during manufacture of dished ends or end covers."
        },
        {
          reg: "16",
          quote: "and test in Form-IV(Part-H), signed by the maker and the Inspecting Authority shall be furnished."
        }
      ]
    },
  },
  {
    slug: "form-v-part-a",
    form: "Form V",
    part: "Part A",
    title: "Steel maker's certificate of manufacture and results of tests",
    quote: "STEEL MAKER’S CERTIFICATE OF MANUFACTURE AND RESULTS OF TESTS",
    regulation: "8(d)",
    group: "materials",
    old: { form: "Form IV", title: "Steel maker's certificate of manufacture and results of test", quote: "Steel Marker's Certificate of Manufacture and results of Test" },
    summary: "The steel maker's certificate for plates and bars: charge numbers, chemical analysis and mechanical test results.",
    page: {
      issuedBy:
        "The steel maker. A Well-known steel maker recognised by the Central Boilers Board can issue it in place of an Inspecting Authority certificate.",
      filedWith:
        "Goes with the registration application (regulation 8(d)); the owner keeps it for the boiler's life (regulation 308). Where the original certificate also covers plates used elsewhere, an extract signed by the boiler maker and countersigned by the Inspecting Authority is accepted instead.",
      records: [
        "Charge numbers, plate or bar numbers, and the number and dimensions of plates tested",
        "Chemical analysis",
        "Ultimate tensile strength in kg/mm², percentage elongation and gauge length",
        "Bend and other tests, their results and dates",
      ],
      changed:
        "Under IBR 1950 this was Form IV, which gave tensile breaking strength in tons; IBR 2026 asks for ultimate tensile strength in kilograms per square millimetre.",
      facts: [
        {
          reg: "8(d)(i)",
          quote: "shall show the charge numbers, the plate or bar numbers and the number and dimensions of the various plates tested, their chemical analysis, their ultimate tensile strength in kilograms per square millimetre of section",
        },
        {
          reg: "8(d)(ii)",
          quote: "a certificate of Well-known steel maker in Form-V(Part-A) shall be accepted in lieu of a certificate from an Inspection Authority.",
        },
        {
          reg: "8(d)(iii)",
          quote: "an extract from the original certificate duly signed by the makers of the boiler and countersigned by the Inspecting Authority shall be accepted in lieu of the certificate in Form-V(Part-A)",
        },
      ],
    },
  },
  {
    slug: "form-v-part-b",
    form: "Form V",
    part: "Part B",
    title: "Certificate of manufacture and results of tests in lieu of original test certificates",
    quote: "CERTIFICATE OF MANUFACTURE AND RESULTS OF TESTS IN LIEU OF ORIGINAL TEST CERTIFICATES",
    regulation: "8(d)",
    group: "materials",
    old: {
      form: "Form IV-A",
      title: "Certificate of manufacture and results of tests in lieu of original test certificates",
      quote: "Certificate of Manufacture and Results of Tests in lieu of original",
    },
    summary:
      "The extract that lists every material test certificate used in a boiler and its components, filed with the maker's Form IV Part A.",
    page: {
      issuedBy:
        "The boiler maker and its representative, from the original material test certificates, with the Competent Person and the Inspecting Authority also signing.",
      filedWith: "Filed with Form IV Part A in the registration application (regulation 8(d)(iv)). The manufacturer keeps it for at least five years (regulation 308(4)).",
      records: [
        "The boiler's maker's number and drawing number",
        "For each component: quantity, size, cast or heat number and plate number, steel-making process, specification",
        "The steel or part maker, certificate number and date, heat treatment",
        "Chemical analysis (C, Mn, P, S, Si and alloying elements), yield strength and UTS in kg/mm², elongation, bend test",
        "The name of the inspecting authority",
      ],
      changed:
        "Under IBR 1950 this was Form IV-A. IBR 2026 makes it an explicit part of the registration documents, filed with Form IV Part A.",
      facts: [
        {
          reg: "8(d)(iv)",
          quote: "The extract of all test certificates of materials used in boiler and boiler components in Form-V(Part-B) along with Form-IV(Part-A).",
        },
        { reg: "Form V Part B", quote: "Name and signature of Competent Person" },
      ],
    },
  },
  {
    slug: "form-vi",
    form: "Form VI",
    title: "Questionnaires for recognition by the Central Boilers Board (Parts A to G)",
    quote: "QUESTIONNAIRE TO BE ANSWERED BY FIRMS/COMPANIES SEEKING RECOGNITION BY THE CENTRAL BOILERS BOARD",
    regulation: "17(2)",
    group: "recognition",
    old: { form: "Form XV-A to XV-G", title: "Questionnaires for Inspecting Authority, Competent Authority and well-known makers", quote: "Questionnaire Inspecting Authority" },
    summary:
      "Questionnaires for firms seeking recognition as an Inspecting Authority, Competent Authority, well-known steel maker, foundry or forge, tube or pipe maker, material testing laboratory or remnant life assessment organisation.",
    page: {
      issuedBy: "A firm seeking recognition by the Central Boilers Board: Part A for an Inspecting Authority, the other parts for the other recognised categories.",
      filedWith: "The Secretary, Central Boilers Board, with the fee (regulation 17).",
      records: [
        "Name, addresses, year of establishment and branch offices",
        "Proposed countries or areas of operation",
        "Experience as an inspecting body under Indian or international codes",
        "For renewal, inspections done in the last five years",
        "Other commercial activity, and the types, sizes and pressures of boilers already inspected"
      ],
      changed: "Under IBR 1950 these were Forms XV-A to XV-G.",
      facts: [
        {
          reg: "17(2)",
          quote: "QUESTIONNAIRE TO BE ANSWERED BY FIRMS/COMPANIES SEEKING RECOGNITION BY THE CENTRAL BOILERS BOARD"
        }
      ]
    },
  },
  {
    slug: "form-vii",
    form: "Form VII",
    title: "Certificates of approval (Parts A to I)",
    quote: "CERTIFICATE OF APPROVAL FOR WELL-KNOWN STEEL MAKER",
    regulation: "19",
    group: "recognition",
    old: { form: "Form XVI-A to XVI-I", title: "Certificates of approval", quote: "Certificate of Approval for Well Known Steel Maker" },
    summary: "The Central Boilers Board's certificates of approval for the bodies and makers recognised under Form VI.",
    page: {
      issuedBy: "The Central Boilers Board, signed by its Secretary.",
      filedWith: "Held by the recognised firm; recognised bodies are listed by the Board.",
      records: [
        "The firm, and the category it is recognised in (Part A for an Inspecting Authority)",
        "The area of operation",
        "Validity: five years for an Inspecting Authority",
        "The condition that it adheres to the quality control prescribed under the regulations"
      ],
      changed: "Under IBR 1950 these were Forms XVI-A to XVI-I.",
      facts: [
        {
          reg: "19",
          quote: "CERTIFICATE OF APPROVAL FOR INSPECTING AUTHORITY"
        },
        {
          reg: "Form VII Part A",
          quote: "This certificate is valid for five years"
        }
      ]
    },
  },
  {
    slug: "form-viii",
    form: "Form VIII",
    title: "Final inspection report for boiler components",
    quote: "FINAL INSPECTION REPORT FOR BOILER COMPONENTS",
    regulation: "293",
    group: "inspection",
    summary:
      "The maker's final inspection report for boiler components, approved by the Competent Person; components are erected at site on its strength. New in 2026.",
    page: {
      issuedBy: "The maker of the boiler components, approved by the Competent Person.",
      filedWith: "Goes to site with the components; erection is based on it.",
      records: [
        "Report number and date, the maker and the boiler number",
        "For each item: product identification number, drawing number, description, quantity and the Competent Person's identification mark",
        "Signatures of the maker's representative and the Competent Person"
      ],
      changed: "New in IBR 2026. Components erected on the basis of an approved Form VIII need no further ground inspection, manufacturing drawings or design calculations at site.",
      facts: [
        {
          reg: "293(2)",
          quote: "The boiler components shall be erected at site based on the final inspection report as per Form-VIII approved by Competent Person"
        },
        {
          reg: "293(2)",
          quote: "there is no need for any ground inspection or submission of any other document like manufacturing drawings, design calculations."
        }
      ]
    },
  },
  {
    slug: "form-ix",
    form: "Form IX",
    title: "Details to be furnished with an application for inspection of a boiler after twelve or thirty-six months of certification",
    quote: "TWELVE/THIRTY SIX MONTHS OF THE CERTIFICATION UNDER REGULATION 311",
    regulation: "295(7) and 295(8)",
    group: "in-service",
    old: {
      form: "Form XIX",
      title: "Details to be furnished with an application for inspection of a boiler after twelve/twenty-four months of certification",
      quote: "Boiler after twelve/ Twenty four months of certification",
    },
    summary:
      "The details furnished with an application to inspect a boiler used for electric power generation (Appendix H) or a waste heat boiler in a continuous process plant (Appendix I), twelve or thirty-six months after certification.",
    page: {
      issuedBy: "The boiler owner.",
      filedWith: "The Chief Inspector, with the application for inspection after twelve or thirty-six months of certification (regulation 295).",
      records: [
        "Owner, registry number, pressure and temperature, steam generation, heating surface, year of make and construction",
        "Past exemptions, last annual inspection, expiry of the current certificate and its pressure",
        "Past repairs year by year and remarks on the last certificate",
        "Feed water quality, feed pumps, safety valves, soot blowers, water level alarms, stop, check and blowdown valves",
        "Calibration dates of the master pressure gauge and temperature instruments; protection device tests",
        "Stoppages in the last twelve months, leaks, present operating pressure, water testing and cleaning intervals"
      ],
      changed: "New in IBR 2026, with the longer inspection intervals of regulations 295 and 311.",
      facts: [
        {
          reg: "295",
          quote: "DETAILS TO BE FURNISHED ALONGWITH APPLICATION FOR INSPECTION OF BOILER AFTER TWELVE/THIRTY SIX MONTHS OF THE CERTIFICATION UNDER REGULATION 311"
        },
        {
          reg: "Form IX",
          quote: "Details of past repairs (year-wise)"
        }
      ]
    },
  },
  {
    slug: "form-x",
    form: "Form X",
    title: "Provisional order under section 14 of the Boilers Act, 2025",
    quote: "PROVISIONAL ORDER UNDER SECTION 14 OF THE BOILERS ACT 2025",
    regulation: "300(2)",
    group: "registration",
    old: { form: "Form V", title: "Provisional order under section 9 of the Boilers Act, 1923", quote: "Provisional Order under section 9 of the Boilers Act, 1923" },
    summary: "The order that lets a newly inspected boiler be used before its registration and certificate are complete.",
    page: {
      issuedBy: "The Inspector, after inspecting the boiler and conducting the hydraulic test.",
      filedWith:
        "Issued during registration. If its requirements aren't met, fresh orders can be issued for up to six months more, and not beyond twelve months from the first (regulation 300(3)).",
      records: [
        "Who may use the boiler, its registry number and rating, maker and maker's number",
        "The design pressure in kg/cm² (g) at which it may be used",
        "That it lapses six months from its date, pending the issue or refusal of a certificate",
      ],
      changed: "Under IBR 1950 and the Boilers Act, 1923 this was Form V, under section 9 of that Act.",
      facts: [
        { reg: "300(2)", quote: "a provisional order under section 14 in Form-X shall be issued after the hydraulic test." },
        { reg: "Form X", quote: "pending the issue of or refusal of a certificate within six months from the date thereof after which period this order will become void." },
        {
          reg: "300(3)",
          quote: "fresh provisional orders shall be issued for a maximum of another six months but not exceeding twelve months from the date of issue of first provisional order",
        },
      ],
    },
  },
  {
    slug: "form-xi",
    form: "Form XI",
    title: "Memorandum of Inspection Book or Registration Book",
    quote: "MEMORANDUM OF INSPECTION BOOK",
    regulation: "306",
    group: "registration",
    old: { form: "Form I", title: "Memorandum of Inspection or Registration Book", quote: "Memorandum of Inspection or Registration Book" },
    summary: "The boiler's lifelong inspection record: its particulars, dimensions, hydraulic and steam tests, inspections, repairs and accidents.",
    page: {
      issuedBy: "Prepared by the Inspector at registration; later entries by the Competent Person; kept in the Chief Inspector's office.",
      filedWith:
        "Submitted to the Chief Inspector with the maker's papers after the Inspector's report; a copy is kept as the registration book (regulations 300(4), 306, 307).",
      records: [
        "The boiler's particulars and dimensions",
        "Hydraulic and steam tests",
        "Inspection notes, general condition and repairs",
        "Reports of casual visits, main steam pipe inspections and accidents",
        "The design pressure approved by the Chief Inspector",
      ],
      changed: "Under IBR 1950 this was Form I, which is why older folders call the registration book 'Form I'.",
      facts: [
        { reg: "306(1)", quote: "A Memorandum of Inspection Book shall be prepared for each boiler in Form-XI" },
        { reg: "306(4)(c)", quote: "A pressure once approved for the boiler shall not be altered without the written authority of the Chief Inspector." },
      ],
    },
  },
  {
    slug: "form-xii",
    form: "Form XII",
    title: "Certificate for use of a boiler",
    quote: "CERTIFICATE FOR USE OF A BOILER",
    regulation: "310",
    group: "registration",
    old: { form: "Form VI", title: "Certificate for use of a boiler", quote: "Certificate for use of a Boiler" },
    summary: "The certificate that authorises a registered boiler's use, at the design pressure it states.",
    page: {
      issuedBy: "Granted under regulation 310 once the boiler is registered.",
      filedWith: "Granted under regulation 310; regulation 305 sets the inspection fee for renewing it.",
      records: [
        "Registry number, type of boiler and boiler rating",
        "Place and year of manufacture",
        "The design pressure at which the boiler may be worked",
        "The load on the safety valves, or the washers or ferrules that guard against overloading",
        "The date and pressure of the last hydraulic test",
      ],
      changed: "Under IBR 1950 this was Form VI.",
      facts: [
        { reg: "310(1)", quote: "A certificate for the use of a boiler shall be granted in Form-XII." },
        {
          reg: "310(2)",
          quote: "In the certificate, the design pressure at which the boiler shall be worked, the load to be placed on the safety valves or the thickness of the washers or ferrules required as safeguard against overloading and the date and pressure of the last hydraulic test of the boiler shall be entered.",
        },
      ],
    },
  },
  {
    slug: "form-xiii",
    form: "Form XIII",
    title: "Questionnaire for repairers of boilers, economisers, steam lines and feed water lines",
    quote: "QUESTIONNAIRE FORM FOR REPAIRER OF BOILERS/ECONOMISER/STEAM LINE/FEED WATER LINES",
    regulation: "316(2)",
    group: "in-service",
    old: { form: "Form XVIII", title: "Questionnaire form for repairer of boilers/economizer/steam line/feed water lines", quote: "Questionnaire form for repairer of boilers/ economizer/ steam line/" },
    summary: "The questionnaire a firm sends to the state's Chief Inspector of Boilers to be recognised as a boiler repairer (regulation 316(2)).",
    page: {
      issuedBy: "The firm applying for recognition as a repairer of boilers, economisers, steam lines and feed water lines.",
      filedWith: "The Chief Inspector of Boilers of the State where the firm wants recognition.",
      records: [
        "Name, workshop address and year of establishment",
        "Class applied for: Special Class (any pressure), Class I (up to 125 kg/cm²), Class II (up to 40 kg/cm²), Class III (up to 17.5 kg/cm²)",
        "Jobs done before, with pressures, temperatures and materials",
        "Tools: rectifier or generator, grinder, dye penetrant kit, expander and measuring instruments",
        "Technical staff, welders with current IBR certificates, and the internal quality control system"
      ],
      changed: "Under IBR 1950 this was Form XVIII. Recognition lasts two years; a repairer found violating the Act or Regulations is blacklisted and not renewed.",
      facts: [
        {
          reg: "316(2)",
          quote: "Any firm seeking recognition shall apply in 'Form-XIII' to the Chief Inspector of Boilers of the State"
        },
        {
          reg: "Form XIII",
          quote: "Class I (For Boiler Pressure upto 125 kg/cm2)"
        },
        {
          reg: "Form XIII, note 1",
          quote: "The recognition of the firm as a repairer shall be for a period of two years"
        }
      ]
    },
  },
  {
    slug: "form-xiv",
    form: "Form XIV",
    title: "Steam pipes and connected fittings: Memorandum of Inspection Book",
    quote: "Steam Pipes and Connected Fittings",
    regulation: "322(3)",
    group: "registration",
    old: { form: "Form XIV", title: "Steam pipes and connecting fittings", quote: "Steam Pipes and Connecting Fittings" },
    summary: "The inspection record of a steam pipeline and its fittings: particulars, dimensions, calculations, hydraulic tests and inspection notes.",
    page: {
      issuedBy: "Prepared by the Inspector; later entries by the Competent Person at each inspection.",
      filedWith: "Submitted to the Chief Inspector, who checks the particulars and calculations and approves the pressure and temperature for the pipeline (regulation 322(3)(e)).",
      records: [
        "District, owner, address and the registration numbers of the boilers the pipes are connected to",
        "The plan of the steam pipes and fittings: drawing number, total length, connected vessels, fee and approval",
        "Particulars and dimensions: pipe material, outside diameter, thickness, make, flanges, elbows and tees, supports, flexibility and drainage",
        "Calculations for the steam pipes, and the approved pressure and temperature",
        "Dates and notes of each inspection and hydraulic test, repairs, alterations and accidents"
      ],
      changed: "The number is unchanged from IBR 1950: Form XIV was, and is, the steam pipe form. The 2026 heading reads \"Steam Pipes and Connected Fittings\".",
      facts: [
        {
          reg: "322(3)(a)",
          quote: "A memorandum of Inspection Book shall be prepared in respect of steam pipe and fittings in Form-XIV."
        },
        {
          reg: "322(3)(a)",
          quote: "the Inspector shall enter in ink, all particulars and dimensions of the steam pipe and fitting with calculations for the various parts in detail, particulars of hydraulic test and his inspection notes"
        },
        {
          reg: "322(3)(e)",
          quote: "The pressure and temperature once approved for the particular steam pipe line shall not be altered except on a written authority from the Chief Inspector."
        },
        {
          reg: "Form XIV",
          quote: "PLAN OF STEAM PIPES & THEIR CONNECTED FITTINGS"
        }
      ]
    },
  },
  {
    slug: "form-xv",
    form: "Form XV",
    title: "Inspecting Authority's certificate of inspection under construction (economisers)",
    quote: "INSPECTING AUTHORITY’S CERTIFICATE OF INSPECTION UNDER CONSTRUCTION",
    regulation: "358(3)",
    group: "economisers",
    old: { form: "Form VII", title: "Inspecting Authority's certificate of inspection under construction", quote: "Inspecting Authority's Certificate of Inspection under" },
    summary: "The Inspecting Authority's construction certificate for an economiser.",
    page: {
      issuedBy: "The Inspecting Authority that supervised the economiser's construction.",
      filedWith: "Goes with the economiser's registration papers to the Chief Inspector, and is kept with its records (regulation 308).",
      records: [
        "Type of economiser, number of sections and tubes per section, design pressure and maker",
        "That it was built under supervision and inspected at stages by the Competent Person, to Chapter 11",
        "Identification mark on each section, branch pipes and their position",
        "The water pressure test of the sections for ten minutes, witnessed by the Competent Person",
        "Material tests witnessed, and the maker's drawing signed by the Inspecting Authority"
      ],
      changed: "Under IBR 1950 this was Form VII.",
      facts: [
        {
          reg: "358(3)",
          quote: "INSPECTING AUTHORITY'S CERTIFICATE OF INSPECTION UNDER CONSTRUCTION"
        },
        {
          reg: "Form XV",
          quote: "were subjected to a water pressure of"
        }
      ]
    },
  },
  {
    slug: "form-xvi",
    form: "Form XVI",
    title: "Constructor's certificate of manufacture and test (economisers)",
    quote: "Constructor’s Certificate of Manufacture and Test",
    regulation: "358(4)",
    group: "economisers",
    old: { form: "Form VIII", title: "Constructor's certificate of manufacture and test", quote: "Constructor's Certificate of Manufacture and Test" },
    summary: "The economiser maker's certificate of manufacture and test.",
    page: {
      issuedBy: "The economiser's constructor (maker).",
      filedWith: "With the Inspecting Authority's Form XV, for registration of the economiser.",
      records: [
        "Type, number of tubes and sections, intended working pressure, heating surface, year of manufacture",
        "The Inspecting Authority, and the hydraulic test of the sections",
        "Construction and workmanship statements on castings, threads and interchangeable parts",
        "Materials of headers, tubes or pipes, valve chests and bolts, with makers",
        "Thickness and tensile test limits for headers, tubes and bolts"
      ],
      changed: "Under IBR 1950 this was Form VIII.",
      facts: [
        {
          reg: "358(4)",
          quote: "Constructor's Certificate of Manufacture and Test"
        }
      ]
    },
  },
  {
    slug: "form-xvii",
    form: "Form XVII",
    title: "Provisional order under the Boilers Act, 2025 (economisers)",
    quote: "Provisional Order under the Boilers Act, 2025",
    regulation: "381(5)",
    group: "economisers",
    old: { form: "Form X", title: "Provisional order under the Boilers Act, 1923", quote: "Provisional Order under the Boilers Act,1923" },
    summary:
      "The provisional order for an economiser. Not the small industrial boiler certificate, which was Form XVII under IBR 1950 and is now Form XXII.",
    page: {
      issuedBy: "The Inspector, after inspecting an economiser for registration.",
      filedWith: "Given to the owner; the counterfoil stays with the Inspector.",
      records: [
        "The person or firm permitted to use the economiser, its registry number, maker and maker's number",
        "Description and rating",
        "The design pressure and maximum temperature permitted",
        "Validity: void after six months from its date, pending the certificate"
      ],
      changed: "Under IBR 1950 this was Form X. It now refers to the Boilers Act, 2025.",
      facts: [
        {
          reg: "381(5)",
          quote: "Provisional Order under the Boilers Act, 2025"
        },
        {
          reg: "Form XVII",
          quote: "within six months from the date thereof after which period this order"
        }
      ]
    },
  },
  {
    slug: "form-xviii",
    form: "Form XVIII",
    title: "Memorandum of inspection or registration book (economisers)",
    quote: "ECONOMISERS REGISTRY NUMBER",
    regulation: "385",
    group: "economisers",
    old: { form: "Form IX", title: "Memorandum of inspections of registration book (economisers)", quote: "Memorandum of Inspections of Registration Book(Economisers)" },
    summary: "The economiser's inspection and registration book.",
    page: {
      issuedBy: "The boilers inspection department of the State.",
      filedWith: "Kept by the department, with a copy as the economiser's registration book.",
      records: [
        "District, owner, factory address, registry number and design pressure",
        "The record of provisional orders and certificates: fees, inspection dates, periods and remarks",
        "Description: type, maker, tubes, headers, branch pipes and cap openings",
        "Mountings: relief valve, stop valve, blow down, thermometers, pressure gauge",
        "The maker's certificate: hydraulic test pressure, drawing number, Inspecting Authority and material maker"
      ],
      changed: "Under IBR 1950 this was Form IX.",
      facts: [
        {
          reg: "385",
          quote: "MEMORANDUM OF INSPECTION"
        }
      ]
    },
  },
  {
    slug: "form-xix",
    form: "Form XIX",
    title: "Certificate for use of an economiser",
    quote: "CERTIFICATE FOR USE OF AN ECONOMISER",
    regulation: "387",
    group: "economisers",
    old: { form: "Form XI", title: "Certificate for the use of an economiser", quote: "Certificate for the use of an Economiser" },
    summary: "The certificate that authorises an economiser's use.",
    page: {
      issuedBy: "The Competent Person or Chief Inspector, under the Boilers Act, 2025.",
      filedWith: "Held by the owner; the economiser may only be worked within it.",
      records: [
        "Registry number, type, tubes, headers, rating, place and year of manufacture",
        "Owner, situation of the economiser, repairs and remarks",
        "Hydraulic test date and pressure",
        "The maximum pressure and temperature permitted, the period, and the safety relief valve loading",
        "Conditions on the reverse: no structural alteration without the Chief Inspector's written permission, and when the certificate ceases to be in force"
      ],
      changed: "Under IBR 1950 this was Form XI.",
      facts: [
        {
          reg: "387",
          quote: "A certificate for the use of an economiser shall be granted in Form-XIX."
        },
        {
          reg: "Form XIX",
          quote: "No structural alteration, addition or renewal shall be made to the Economiser without a written permission"
        }
      ]
    },
  },
  {
    slug: "form-xx",
    form: "Form XX",
    title: "Qualified boiler welder's certification continuity form",
    quote: "Qualified Boiler Welder’s Certification Continuity Form",
    regulation: "517 and 527(3)",
    group: "welders",
    summary: "The continuity form submitted with a qualified boiler welder's request to renew their certificate. New in 2026.",
    page: {
      issuedBy: "The welder's employer, approved by the Competent Authority.",
      filedWith: "The Competent Authority, with the request to renew the welder's Form II certificate.",
      records: [
        "The welder's name, date of birth and employer",
        "IBR certificate number and validity, materials and M-number grouping, process, consumable U number",
        "A welded part and date at 6, 12, 18 and 24 months",
        "The employer's signature and the Competent Authority's extension"
      ],
      changed: "New in IBR 2026: continuity is proved by work done every six months, much like ASME QW-322. See welder continuity under ASME.",
      facts: [
        {
          reg: "517, 527(3)",
          quote: "Qualified Boiler Welder's Certification Continuity Form"
        },
        {
          reg: "Form XX",
          quote: "to be submitted along with renewal request"
        }
      ]
    },
  },
  {
    slug: "form-xxi",
    form: "Form XXI",
    title: "Record of welder's qualification and requalification tests",
    quote: "Record of Welder’s Qualifications/Requalification Tests",
    regulation: "540",
    group: "welders",
    old: { form: "Form XII", title: "Record of welder's qualification/requalification tests", quote: "Record of Welder's Qualification/Requalification Tests" },
    summary: "The record of a welder's qualification or requalification test.",
    page: {
      issuedBy: "The Competent Authority that conducts the welder's qualification or requalification test.",
      filedWith: "Kept by the Competent Authority; the result leads to the welder's Form II certificate.",
      records: [
        "Place and date, the welder's particulars, experience and training",
        "What was tested: plate, pipe or tube; gas or electric arc; groove, fillet or branch; position; thicknesses and diameters; base and filler material",
        "Marks out of 100: procedure, visual inspection, face and root bend tests, etch test, fractured surface",
        "Radiographic observations if done, oral or written examination, remarks, type and class qualified, validity"
      ],
      changed: "Under IBR 1950 this was Form XII.",
      facts: [
        {
          reg: "540",
          quote: "Record of Welder's Qualifications/Requalification Tests"
        },
        {
          reg: "Form XXI",
          quote: "TYPE AND CLASS OF WELDING QUALIFIED"
        }
      ]
    },
  },
  {
    slug: "form-xxii",
    form: "Form XXII",
    title: "Certificate of manufacture and test for small industrial boilers",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST FOR SMALL INDUSTRIAL BOILERS",
    regulation: "555(2)",
    group: "manufacture",
    old: {
      form: "Form XVII",
      title: "Certificate of manufacture and test for small industrial boilers including small industrial solar boilers",
      quote: "Certificate of Manufacture and Test for Small Industrial",
    },
    summary: "The certificate of manufacture and test for a small industrial boiler.",
    page: {
      issuedBy:
        "Signed by the manufacturer, with the Competent Person and the Inspecting Authority certifying that the boiler was built under their supervision and inspected at stages.",
      filedWith: "Issued under regulation 555(2). Where the plate is too small to stamp everything, the certificate carries the details (regulation 553(2)).",
      records: [
        "Maker's name and year of make; who it was manufactured for; location of installation",
        "Boiler identification and the Competent Person's stamp; drawing and alteration numbers",
        "Design pressure in kg/cm² (g), size, material specification, volumetric capacity, heating surface, nozzle connections",
        "The shop hydro test pressure and date",
      ],
      changed:
        "Under IBR 1950 this was Form XVII, which also covered small solar boilers. In 2026 small solar boilers have their own Form XXIII, and Form XVII is now an economiser's provisional order.",
      facts: [
        { reg: "555(2)", quote: "The certificate of manufacture and test for small industrial boilers shall be issued in Form-XXII." },
        {
          reg: "550",
          quote: "The small industrial boilers shall be subjected to inspection during construction by an Inspecting Authority",
        },
        { reg: "Form XXII", quote: "Shop Hydro Test Pressure" },
      ],
    },
  },
  {
    slug: "form-xxiii",
    form: "Form XXIII",
    title: "Certificate of manufacture and test for small solar boilers",
    quote: "CERTIFICATE OF MANUFACTURE AND TEST FOR SMALL SOLAR BOILERS",
    regulation: "596(3)",
    group: "manufacture",
    old: {
      form: "Form XVII",
      title: "Certificate of manufacture and test for small industrial boilers including small industrial solar boilers",
      quote: "Boilers including Small Industrial Solar Boilers",
    },
    summary: "The certificate of manufacture and test for a small solar boiler. Split out of the old Form XVII in 2026.",
    page: {
      issuedBy: "The manufacturer, with the Competent Person and the Inspecting Authority.",
      filedWith: "Kept with the small solar boiler's records.",
      records: [
        "Maker, year of make, purchaser and location of installation",
        "Boiler identification and the Competent Person's stamp, drawing and alteration numbers",
        "Design pressure, heating surface, material specification, volumetric capacity in litres",
        "Safety valves, hydro test pressure and date",
        "Certification that it was inspected at the stages in chapter 17"
      ],
      changed: "New in IBR 2026, for small solar boilers under chapter 17.",
      facts: [
        {
          reg: "596(3)",
          quote: "CERTIFICATE OF MANUFACTURE AND TEST FOR SMALL SOLAR BOILERS"
        },
        {
          reg: "Form XXIII",
          quote: "inspected at various stages of construction as specified in chapter-17 by the Competent Person"
        }
      ]
    },
  },
];

export function formName(f: Pick<IbrForm, "form" | "part">): string {
  return f.part ? `${f.form} ${f.part}` : f.form;
}

export function ibrFormPages(): IbrForm[] {
  return ibrForms.filter((f) => f.page);
}

// IBR 1950 forms with no 2026 counterpart found by title: listed on /ibr/forms so
// nobody assumes we forgot them.
export const unmatched1950 = [
  { form: "Form III-D, III-E", title: "Already deleted under IBR 1950" },
];
