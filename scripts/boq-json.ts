// Prints the BOQ item library as JSON for scripts/build-boq-template.py.
import { boqItems, trades, UNIT_LABEL } from "../src/lib/boq";
console.log(JSON.stringify({ trades, items: boqItems.map((i) => ({ ...i, unitLabel: UNIT_LABEL[i.unit] })) }));
