// Checks src/lib/markets.ts: which market a visitor gets, the lead country sent to the CRM, the adapted paths
// and the US wording. Runs inside `npm run content:build`.
import assert from "node:assert/strict";
import { languages, marketOf, marketFromParam, leadCountry, adaptedPath, shownIn, say, money } from "../src/lib/markets";

assert.equal(marketOf("US"), "NA");
assert.equal(marketOf("ca"), "NA");
assert.equal(marketOf("IN"), "IN");
assert.equal(marketOf("GB"), "IN", "UK is off: its visitors get today's site");
assert.equal(marketOf(null), "IN");
assert.equal(marketFromParam("us"), "NA");
assert.equal(marketFromParam("IN"), "IN");
assert.equal(marketFromParam("uk"), null);

assert.equal(leadCountry("US", null), "US");
assert.equal(leadCountry("IN", "NA"), "US", "chose North America from India: the market's country");
assert.equal(leadCountry("CA", "NA"), "CA");
assert.equal(leadCountry("XX", null), null);
assert.equal(leadCountry(null, "IN"), "IN");

assert.equal(adaptedPath("NA", "/"), "/us");
assert.equal(adaptedPath("NA", "/services/inventory-and-reservations"), "/us/services/inventory-and-reservations");
assert.equal(adaptedPath("NA", "/notes"), null);
assert.equal(adaptedPath("IN", "/"), null);

assert.equal(shownIn("NA", "/ibr/forms"), false);
assert.equal(shownIn("NA", "/erp"), false);
assert.equal(shownIn("NA", "/erpx"), true);
assert.equal(shownIn("IN", "/ibr"), true);
assert.equal(shownIn("NA", "/asme/asme-vs-ibr"), false);
assert.equal(shownIn("IN", "/asme/state-boiler-laws"), false);
assert.equal(shownIn("NA", "/asme/state-boiler-laws"), true);
assert.equal(shownIn("NA", "/asme"), true);
assert.equal(shownIn("NA", "/manufacturing/job-shop-erp"), true);
assert.equal(shownIn("IN", "/manufacturing"), false);

assert.equal(say("NA", "every enquiry and quotation, summarised"), "every inquiry and estimate, summarized");
assert.equal(say("NA", "a promise to the enterprise, otherwise"), "a promise to the enterprise, otherwise");
assert.equal(say("IN", "quotation"), "quotation");
assert.equal(money("NA", 7500), "$7,500");
console.log("markets: ok");

assert.deepEqual(languages("/services"), { "en-IN": "/services", "en-US": "/us/services", "x-default": "/services" });
assert.equal(languages("/asme"), undefined);
