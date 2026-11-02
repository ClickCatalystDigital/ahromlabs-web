// npx jiti scripts/attribution.check.ts (runs inside `npm run content:build`) — the lead attribution read from the visitor's cookies (src/lib/analytics.ts).
import assert from "node:assert";
import { attributionFrom, cookieIn } from "../src/lib/analytics";

const src = encodeURIComponent("gclid=Cj0abc&utm_source=google&utm_medium=cpc&landing=/ibr&at=2026-11-02&evil=x");
const header = `market=NA; ga_consent=granted; ahrom_src=${src}; _ga=GA1.1.123456789.1730500000`;
assert.deepEqual(JSON.parse(attributionFrom(cookieIn(header))!),
  { gclid: "Cj0abc", utm_source: "google", utm_medium: "cpc", landing: "/ibr", at: "2026-11-02", ga_client_id: "123456789.1730500000" });
assert.equal(attributionFrom(cookieIn(header.replace("granted", "denied"))), null, "no consent, nothing kept");
assert.equal(attributionFrom(cookieIn("ga_consent=granted")), null, "consent but no cookies");
assert.equal(attributionFrom(cookieIn(null)), null);
assert.deepEqual(JSON.parse(attributionFrom(cookieIn("ga_consent=granted; _ga=GA1.1.1.2"))!), { ga_client_id: "1.2" });
assert.equal(attributionFrom(cookieIn("ga_consent=granted; _ga=junk")), null, "odd _ga ignored");
console.log("ok");
