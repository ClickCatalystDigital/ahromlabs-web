// Checks src/lib/glossary-links.ts: first mention only, never in headings, links or code, acronyms only in capitals.
import assert from "node:assert/strict";
import { linkTerms } from "../src/lib/glossary-links";

const out = linkTerms("## Heat number\n\nThe heat number is on the MTR. Another heat number here. See `heat number` and [heat number](/x).\n\nmrp is not MRP.");
assert.ok(out.startsWith("## Heat number\n"), "heading untouched");
assert.equal((out.match(/\(\/systems\/heat-number\)/g) ?? []).length, 1, "one link per term");
assert.ok(out.includes("The [heat number](/systems/heat-number) is on"), "first mention in the text linked");
assert.ok(out.includes("`heat number`") && out.includes("[heat number](/x)"), "code and existing links untouched");
assert.ok(out.includes("mrp is not [MRP](/systems/mrp)"), "acronym only in capitals");
assert.equal(linkTerms("Uses [the heat number](/systems/heat-number). Heat number again."), "Uses [the heat number](/systems/heat-number). Heat number again.", "already linked: left alone");
console.log("glossary links: ok");
