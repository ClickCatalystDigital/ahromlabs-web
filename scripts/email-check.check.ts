// Checks src/lib/email-check.ts against the fake and real emails seen in demo leads (Oct-Nov 2026).
// Uses the network (DNS lookups), so it is run by hand, not in content:build: npx jiti scripts/email-check.check.ts
import assert from "node:assert/strict";
import { emailProblem } from "../src/lib/email-check";

const fake = ["demo-owner@plantmind.demo", "sunil@abpl.com", "admin@gmail.com", "test@email.com", "test@email2.com", "abc@abc.com",
  "gawiv83962@moblha.com", "someone@nosuchdomain-ahrom-xyz.com", "x@example.com"];
const real = ["lab@castech.in", "himanshu@indboilers.com", "hello@omkarengg.com", "rohansawant65421@gmail.com", "jenish.du.26@gmail.com",
  "admin@castech.in", "pujan@ahromlabs.com"];

for (const e of fake) assert.ok(await emailProblem(e), `should refuse ${e}`);
for (const e of real) assert.equal(await emailProblem(e), null, `should allow ${e}`);
console.log(`email-check: ${fake.length} refused, ${real.length} allowed`);
