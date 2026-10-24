// Prints the ERP requirements library as JSON for scripts/build-erp-template.py.
import { erpRequirementsJson } from "../src/lib/erp-json";
console.log(JSON.stringify(erpRequirementsJson()));
