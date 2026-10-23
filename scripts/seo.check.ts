// Self-check for src/lib/seo.ts:  npx jiti scripts/seo.check.ts
import assert from "node:assert/strict";
import { seoTitle, metaDescription } from "../src/lib/seo";

assert.equal(seoTitle("Interior BOQ item library"), "Interior BOQ item library");
assert.deepEqual(seoTitle("Software for interior design firms and furniture workshops"), { absolute: "Software for interior design firms and furniture workshops" });
assert.equal(metaDescription("Short and fine."), "Short and fine.");
const long = "First sentence is here and it is reasonably long, about the system. Second sentence adds a detail that matters to buyers. Third sentence would push it well past the limit of what Google shows.";
const d = metaDescription(long);
assert.ok(d.length <= 158 && d.endsWith("."), d);
assert.equal(d, "First sentence is here and it is reasonably long, about the system. Second sentence adds a detail that matters to buyers.");
const one = "A".repeat(10) + " " + "word ".repeat(60);
assert.ok(metaDescription(one).length <= 158 && metaDescription(one).endsWith("…"));
const shortFirst = "Incoming billed amounts can't all be manually audited line by line. So each charge is compared against the agreed rate card for its route and vendor, and only the deviations reach a person for review.";
const sf = metaDescription(shortFirst);
assert.ok(sf.length >= 110 && sf.length <= 158 && sf.endsWith("…"), sf);
console.log("seo: ok");
