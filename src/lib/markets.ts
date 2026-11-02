// Markets: groups of countries sold to the same way (docs/markets-plan.md). Codes and country groups are
// copied from the CRM (ahrom-crm/src/lib/markets.ts) so a lead's country means the same market in both;
// keep the two in step. One site, same URLs: the proxy picks the market per request (src/proxy.ts).
//
// Bucket A (words and formats) is DICT below. Bucket B (shown or hidden) is IN_ONLY: paths kept out of the
// menu, footer and cards in other markets. Their URLs still work everywhere.

export type MarketCode = "IN" | "NA" | "UK" | "EU";
export type Market = { code: MarketCode; label: string; countries: string[]; timeZone: string; currency: string; hoursText: string; active: boolean };

export const MARKETS: Record<MarketCode, Market> = {
  IN: { code: "IN", label: "India", countries: ["IN"], timeZone: "Asia/Kolkata", currency: "INR", hoursText: "Mon–Fri 10:00–17:00, Sat 10:00–13:00 IST", active: true },
  NA: { code: "NA", label: "North America", countries: ["US", "CA"], timeZone: "America/New_York", currency: "USD", hoursText: "Mon–Fri 9:00–17:00 US Eastern", active: true },
  UK: { code: "UK", label: "UK & Ireland", countries: ["GB", "IE"], timeZone: "Europe/London", currency: "GBP", hoursText: "Mon–Fri 9:00–17:00 UK time", active: false },
  EU: { code: "EU", label: "Europe", countries: ["DE", "NL", "FR", "BE", "SE", "DK", "NO", "FI", "AT", "CH", "ES", "IT", "PL", "PT"], timeZone: "Europe/Berlin", currency: "EUR", hoursText: "Mon–Fri 9:00–17:00 Central European time", active: false },
};

/** The market a country belongs to; unknown countries and markets that are off get today's (India) site. */
export function marketOf(country: string | null | undefined): MarketCode {
  const m = Object.values(MARKETS).find((x) => x.countries.includes((country ?? "").toUpperCase()));
  return m?.active ? m.code : "IN";
}

/** `?market=` values people type or links carry: in, us, ca, na. Anything else is ignored. */
export function marketFromParam(v: string | null | undefined): MarketCode | null {
  const s = (v ?? "").toLowerCase();
  if (s === "in") return "IN";
  if (s === "us" || s === "ca" || s === "na") return "NA";
  return null;
}

// "market": the visitor's own choice (switcher or ?market=), a year. "mkt": the market this visit is shown,
// readable by the inline script in layout.tsx that hides other markets' links (session cookie).
export const CHOICE_COOKIE = "market";
export const SHOWN_COOKIE = "mkt";

/** The lead's country for the CRM: Cloudflare's country, unless the visitor chose a market it isn't in. */
export function leadCountry(cfCountry: string | null | undefined, chosen: MarketCode | null): string | null {
  const cf = /^[A-Z]{2}$/.test(cfCountry ?? "") && cfCountry !== "XX" ? cfCountry! : null;
  if (!chosen || (cf && MARKETS[chosen].countries.includes(cf))) return cf;
  return MARKETS[chosen].countries[0];
}

// Pages that have their own version in a market, prerendered at /<market>/<path> (src/app/na/) and served
// at the same URL by a rewrite in the proxy. Add a path here and a page under src/app/na/ together.
export const ADAPTIVE: Partial<Record<MarketCode, string[]>> = {
  NA: ["/", "/services", "/services/inventory-and-reservations"],
};
// Each version has its own public URL (/us/…): visitors get theirs at the shared URL (src/proxy.ts), search engines see
// both, joined by hreflang (languages() below), so each country's searchers are shown their own.
const PREFIX: Partial<Record<MarketCode, string>> = { NA: "/us" };
export const adaptedPath = (market: MarketCode, path: string) =>
  ADAPTIVE[market]?.includes(path) ? `${PREFIX[market]}${path === "/" ? "" : path}` : null;
/** hreflang alternates for a page with a US version (metadata `alternates.languages`); undefined otherwise. */
export const languages = (path: string) => {
  const us = adaptedPath("NA", path);
  return us ? { "en-IN": path, "en-US": us, "x-default": path } : undefined;
};

// Bucket B: market-only pages. India-only pages (statutory, Tally and India-specific industries). Hidden from the menu, footer and
// cards elsewhere; the sitemap keeps them, because Google crawls from the US and must still index them.
const IN_ONLY = [
  "/ibr", "/boq", "/erp", "/engagement",
  "/industries/boiler-pressure-vessel-manufacturing", "/industries/interior-design-and-furniture",
  "/services/compliance-accounting", "/services/tally-integration", "/services/receivables-from-tally", "/services/daily-wage-payroll",
  "/asme/asme-vs-ibr",
  // The construction hub's India group (src/lib/construction.ts CON_GROUPS; scripts/construction.check.ts keeps these in step).
  "/construction/ra-bills", "/construction/measurement-book", "/construction/tds-on-contractor-payments", "/construction/gst-on-works-contracts",
];
// North America only: US and Canadian law.
const NA_ONLY = [
  "/asme/state-boiler-laws", "/manufacturing", "/sales-tax",
  // The construction hub's US group.
  "/construction/pay-applications", "/construction/retainage", "/construction/lien-waivers", "/construction/change-orders", "/construction/wip-schedule",
];
const under = (list: string[], href: string) => list.some((p) => href === p || href.startsWith(`${p}/`) || href.startsWith(`${p}#`));
export const marketsFor = (href: string): MarketCode[] | undefined =>
  under(IN_ONLY, href) ? ["IN"] : under(NA_ONLY, href) ? ["NA"] : undefined;
export const shownIn = (market: MarketCode, href: string) => marketsFor(href)?.includes(market) ?? true;

/** Spread on an element that only some markets should see; CSS in globals.css hides it elsewhere. */
export const only = (markets: MarketCode[] | undefined) => (markets ? { "data-only": markets.join(" ") } : {});

// Bucket A: the same page said the way each market says it.
export type Dict = {
  locale: string;
  /** Footer line under the email address. */
  where: string;
  /** Accounting software the system keeps (the hero's "Tally can stay"). */
  books: string;
  /** Offer WhatsApp on the contact form. */
  whatsapp: boolean;
  /** Booking page and the hours shown beside it. */
  booking?: { href: string; hours: string };
  /** Generic words only; never product names in client claims (a Tally client stays a Tally client). */
  words: [RegExp | string, string][];
  /** Fixed prices shown on the market's home and service pages; India's live on /engagement. */
  pricing?: { prototype: number; prototypeWeeks: number; buildFrom: number; buildTo: number; buildWeeks: string; care: number; foundingOff: number; foundingCount: number; pay: string };
};

export const DICT: Record<MarketCode, Dict> = {
  IN: { locale: "en-IN", where: "Ahmedabad, Gujarat · clients across India", books: "Tally", whatsapp: true, words: [] },
  NA: {
    locale: "en-US",
    where: `Ahmedabad, India · calls ${MARKETS.NA.hoursText}`,
    books: "QuickBooks",
    whatsapp: false,
    booking: { href: "https://calendar.app.google/CuiiSRtJbheEV2U4A", hours: MARKETS.NA.hoursText },
    words: [
      // Headings on shared pages that name India's tax and tools; the services under them are India-only.
      ["Accounting, GST, TallyPrime and payroll", "Accounting and multi-company finance"],
      ["Keep the books, GST and wages right the first time", "Keep the books right across every company you run"],
      ["The accounting and compliance layer under every system we build: GST and TDS from the work already entered, TallyPrime connected so nothing is typed twice, receivables and payables always current, group companies on one set of books, and daily-wage attendance turned into payroll.",
        "The accounting layer under every system we build: group companies on one set of books, each person seeing only the money their role needs, and your accounting software connected so nothing is typed twice."],
      ["One accounting and compliance layer shared across the systems we build: GST, TDS and tax rates from a single human-verified registry, GST returns, e-way bills, and TallyPrime connected four ways — or made optional.",
        "One accounting layer shared across the systems we build: tax rates from a single human-verified registry, and your accounting software connected, or made optional."],
      ["GST invoices, customs paperwork and bank statements into Tally", "supplier invoices, customs paperwork and bank statements into their accounting software"],
      ["as WhatsApp photos and PDFs", "as emailed photos and PDFs"],
      ["in English or Hinglish", "in plain English"],
      [/\bquotations\b/g, "estimates"], [/\bQuotations\b/g, "Estimates"], [/\bquotation\b/g, "estimate"], [/\bQuotation\b/g, "Estimate"],
      [/\bBOQs\b/g, "estimates"], [/\bBOQ\b/g, "estimate"],
      [/\benquiries\b/g, "inquiries"], [/\benquiry\b/g, "inquiry"], [/\bEnquiry\b/g, "Inquiry"],
      [/\bjob cards\b/g, "work orders"], [/\bjob card\b/g, "work order"],
      [/\btest certificates\b/g, "mill test reports"], [/\btest certificate\b/g, "mill test report"],
      [/\bdispatch\b/g, "shipping"], // Spelling: a list, not an -ise rule ("promise", "enterprise" and "otherwise" must stay).
      [/\b(summar|categor|optim|organ|recogn|priorit|minim|standard|custom|central|author|final|digit)is(e|ed|es|ing|ation)\b/g, "$1iz$2"],
      [/\banalys(e|ed|es|ing)\b/g, "analyz$1"], [/\bcolour/g, "color"], [/\bbehaviour/g, "behavior"], [/\bcentre\b/g, "center"],
    ],
    pricing: { prototype: 1500, prototypeWeeks: 2, buildFrom: 7500, buildTo: 15000, buildWeeks: "4–6", care: 350, foundingOff: 30, foundingCount: 3, pay: "Paid by card or ACH, invoiced in USD." },
  },
  UK: { locale: "en-GB", where: "Ahmedabad, India", books: "Xero", whatsapp: false, words: [] },
  EU: { locale: "en-GB", where: "Ahmedabad, India", books: "your accounting software", whatsapp: false, words: [] },
};

/** Text in the market's words. India's text is returned as written. */
export const say = (market: MarketCode, text: string) => DICT[market].words.reduce((s, [from, to]) => s.replaceAll(from, to), text);

/** Whole-unit money in the market's currency: $7,500, ₹3,00,000. */
export const money = (market: MarketCode, n: number) =>
  new Intl.NumberFormat(DICT[market].locale, { style: "currency", currency: MARKETS[market].currency, maximumFractionDigits: 0 }).format(n);

/** A demo link for this market: North America gets the demo's US build when it has one, else the shared demo with
 *  ?market=us (US number and date style). */
export const demoHref = (market: MarketCode, url: string, usUrl?: string) => (market === "NA" ? usUrl ?? `${url}?market=us` : url);
