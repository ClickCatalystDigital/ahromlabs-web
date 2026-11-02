// Google Analytics 4, property "Ahrom Labs" (docs/analytics-strategy.md). The ID is public.
export const GA_ID = "G-BC080TXMMZ";

type Gtag = (...args: unknown[]) => void;

// No-op until the visitor accepts analytics (gtag is only defined after consent).
export function track(event: string, params?: Record<string, string>) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", event, params);
}

// Where a visitor came from, for the CRM lead (leads.attribution, CRM migration 0022) and later Google Ads
// conversion uploads. Written only after analytics consent, in a cookie on .ahromlabs.com so the demos see it too.
// The first visit is kept, except that a later visit with campaign tags or an ad click replaces it (the ad click is
// what Google Ads needs back). Nothing personal goes in it, and none of it is sent to GA.
export const SOURCE_COOKIE = "ahrom_src";
const TAGS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function rememberSource() {
  const q = new URLSearchParams(location.search), p = new URLSearchParams();
  for (const k of TAGS) if (q.get(k)) p.set(k, q.get(k)!.slice(0, 200));
  if (!p.size && document.cookie.includes(`${SOURCE_COOKIE}=`)) return;
  const ref = document.referrer && new URL(document.referrer).hostname;
  if (ref && !/(^|\.)ahromlabs\.com$/.test(ref)) p.set("ref", ref);
  p.set("landing", location.hostname === "ahromlabs.com" ? location.pathname : location.hostname + location.pathname);
  p.set("at", new Date().toISOString().slice(0, 10));
  const domain = location.hostname.endsWith("ahromlabs.com") ? "; domain=ahromlabs.com" : "";
  document.cookie = `${SOURCE_COOKIE}=${encodeURIComponent(p.toString())}; path=/; max-age=7776000; SameSite=Lax${domain}`;
}

/** The lead's attribution JSON from the visitor's cookies (name -> raw value), or null without analytics consent. */
export function attributionFrom(cookie: (name: string) => string | undefined): string | null {
  if (cookie("ga_consent") !== "granted") return null;
  const p = new URLSearchParams(decodeURIComponent(cookie(SOURCE_COOKIE) ?? "")), out: Record<string, string> = {};
  for (const k of [...TAGS, "ref", "landing", "at"]) if (p.get(k)) out[k] = p.get(k)!.slice(0, 200);
  // _ga is "GA1.1.<client id>"; the client id is what GA (and the Data Manager API) match a lead on.
  const cid = cookie("_ga")?.match(/^GA\d\.\d\.(\d+\.\d+)$/)?.[1];
  if (cid) out.ga_client_id = cid;
  return Object.keys(out).length ? JSON.stringify(out) : null;
}

/** One cookie's raw value from a Cookie header. */
export const cookieIn = (header: string | null) => (name: string) => header?.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];
