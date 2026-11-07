import { getContent, termHasPage, type ContentKind } from "./content";
import { services, families, serviceUrl, familyUrl } from "./services";
import { engagements } from "./work";

// A guide's `related:` front matter (paths on this site, at least two outside its own section) resolved to titled
// links. Every path must be a page that exists: an unknown one throws, so a typo or a removed page fails the build
// instead of shipping a dead link.

const ROUTE: Partial<Record<ContentKind, string>> = {
  note: "notes", pattern: "patterns", industry: "industries", guide: "ibr", boq: "boq", erp: "erp",
  "ai-assistant": "ai-assistant", asme: "asme", manufacturing: "manufacturing", "sales-tax": "sales-tax", construction: "construction",
};
const HUBS: Record<string, string> = {
  "/asme": "ASME guides", "/manufacturing": "Production software for job shops", "/construction": "Construction billing guides",
  "/sales-tax": "US sales tax guide", "/erp": "ERP requirements guides", "/boq": "Interior BOQ guide", "/ibr": "IBR 2026 guide",
  "/ai-assistant": "AI assistant guides", "/services": "What we build", "/industries": "Industries", "/work": "Work",
  "/notes": "Engineering notes", "/patterns": "Patterns", "/systems": "Systems glossary", "/engagement": "Pricing and how an engagement works",
};

let titles: Map<string, string> | undefined;
function titleMap() {
  if (titles) return titles;
  titles = new Map(Object.entries(HUBS));
  for (const [kind, route] of Object.entries(ROUTE)) {
    for (const e of getContent(kind as ContentKind)) titles.set(`/${route}/${e.slug}`, e.metaTitle ?? e.title);
  }
  for (const t of getContent("term").filter(termHasPage)) titles.set(`/systems/${t.slug}`, t.title);
  for (const s of services) titles.set(serviceUrl(s), s.name);
  for (const f of families) titles.set(familyUrl(f), f.name);
  for (const e of engagements) titles.set(`/work#${e.slug}`, e.client);
  return titles;
}

export function relatedLinks(paths: string[] | undefined, from: string) {
  return (paths ?? []).map((href) => {
    const title = titleMap().get(href);
    if (!title) throw new Error(`${from}: related path "${href}" is not a page on this site`);
    return { href, title };
  });
}

// Related pages for pages with no front matter of their own: glossary terms and industries (North America's industry
// version under /us/industries/<slug>). Picked by subject and by what the buyer reads next; services keep theirs in
// services.ts `guides`. Links to one market's pages are hidden from the other (RelatedNav).
export const RELATED: Record<string, string[]> = {
  "/industries/boiler-pressure-vessel-manufacturing": ["/ibr/small-industrial-boilers", "/ibr/registration-documents", "/asme/asme-vs-ibr", "/asme/u-stamp", "/systems/material-traceability"],
  "/us/industries/boiler-pressure-vessel-manufacturing": ["/asme/u-stamp", "/asme/state-boiler-laws", "/asme/welder-continuity", "/manufacturing/job-shop-erp", "/manufacturing/quickbooks-job-costing"],
  "/industries/construction-company": ["/construction/ra-bills", "/construction/measurement-book", "/construction/tds-on-contractor-payments", "/construction/gst-on-works-contracts", "/ai-assistant/construction-contractors"],
  "/us/industries/construction-company": ["/construction/pay-applications", "/construction/retainage", "/construction/change-orders", "/construction/lien-waivers", "/construction/wip-schedule", "/ai-assistant/construction-contractors"],
  "/industries/electronics-component-trading": ["/systems/stock-reservation", "/erp/tally-migration", "/systems/e-way-bill", "/systems/three-way-match"],
  "/us/industries/electronics-component-trading": ["/manufacturing/distributor-inventory-control", "/manufacturing/quickbooks-online-inventory", "/sales-tax/resale-certificates", "/sales-tax/economic-nexus-thresholds"],
  "/industries/interior-design-and-furniture": ["/boq/what-is-a-boq", "/boq/how-to-make-an-interior-boq", "/boq/measurement-rules", "/boq/variation-orders"],
  "/us/industries/interior-design-and-furniture": ["/systems/change-order", "/sales-tax/resale-certificates", "/manufacturing/small-business-erp-options", "/systems/job-costing"],

  "/systems/ai-hallucination": ["/systems/grounding-check", "/ai-assistant/how-it-works", "/services/custom-ai-assistant"],
  "/systems/asme-certification-mark": ["/asme/stamps", "/asme/u-stamp", "/asme/national-board-registration", "/systems/authorized-inspector"],
  "/systems/audit-trail": ["/erp/compliance", "/systems/role-based-access", "/services/multi-company-finance"],
  "/systems/authorized-inspector": ["/asme/authorized-inspector", "/asme/hydrostatic-test", "/systems/asme-certification-mark", "/systems/manufacturers-data-report"],
  "/systems/bill-of-quantities": ["/boq/what-is-a-boq", "/boq/how-to-make-an-interior-boq", "/construction/material-consumption-vs-boq", "/systems/measurement-book"],
  "/systems/change-order": ["/construction/change-orders", "/systems/variation-order", "/systems/schedule-of-values", "/construction/lien-waivers"],
  "/systems/data-migration": ["/erp/tally-migration", "/erp/implementation-plan", "/manufacturing/quickbooks-desktop-end-of-support", "/services/tally-integration"],
  "/systems/e-invoice": ["/systems/e-way-bill", "/erp/compliance", "/services/compliance-accounting"],
  "/systems/e-way-bill": ["/systems/e-invoice", "/erp/compliance", "/services/compliance-accounting"],
  "/systems/fixed-asset-register": ["/erp/compliance", "/systems/audit-trail", "/services/compliance-accounting"],
  "/systems/fixed-look-up": ["/ai-assistant/how-it-works", "/systems/text-to-sql", "/systems/grounding-check"],
  "/systems/grounding-check": ["/systems/ai-hallucination", "/ai-assistant/how-it-works", "/systems/fixed-look-up"],
  "/systems/heat-number": ["/systems/material-test-certificate", "/asme/mtr", "/services/material-traceability"],
  "/systems/hydrostatic-test": ["/asme/hydrostatic-test", "/systems/mawp", "/systems/authorized-inspector"],
  "/systems/ibr-statutory-folder": ["/ibr/record-keeping", "/ibr/registration-documents", "/notes/ibr-statutory-folder-from-bom"],
  "/systems/job-costing": ["/manufacturing/quickbooks-job-costing", "/construction/job-cost-per-site", "/systems/work-in-progress", "/systems/over-under-billing"],
  "/systems/joint-efficiency": ["/asme/joint-efficiency", "/asme/shell-thickness", "/systems/mawp"],
  "/systems/lien-waiver": ["/construction/lien-waivers", "/construction/mechanics-lien-deadlines", "/systems/pay-application"],
  "/systems/manufacturers-data-report": ["/asme/data-reports", "/asme/national-board-registration", "/systems/authorized-inspector"],
  "/systems/material-test-certificate": ["/asme/mtr", "/systems/heat-number", "/systems/material-traceability"],
  "/systems/material-traceability": ["/services/material-traceability", "/asme/mtr", "/systems/heat-number"],
  "/systems/mawp": ["/asme/mawp", "/asme/shell-thickness", "/systems/hydrostatic-test", "/systems/mdmt"],
  "/systems/mdmt": ["/asme/impact-testing", "/asme/section-viii", "/systems/mawp"],
  "/systems/measurement-basis": ["/boq/measurement-rules", "/systems/bill-of-quantities", "/systems/measurement-book"],
  "/systems/measurement-book": ["/construction/measurement-book", "/construction/ra-bills", "/systems/ra-bill"],
  "/systems/mrp": ["/manufacturing/production-scheduling-software", "/systems/routing", "/services/bom-from-excel"],
  "/systems/msme-payment-rule": ["/erp/compliance", "/services/receivables-from-tally", "/construction/ra-bills"],
  "/systems/nbic": ["/asme/national-board-registration", "/asme/state-boiler-laws", "/asme/data-reports"],
  "/systems/oee": ["/manufacturing/production-scheduling-software", "/systems/routing", "/services/operational-intelligence"],
  "/systems/over-under-billing": ["/construction/wip-schedule", "/systems/work-in-progress", "/systems/job-costing"],
  "/systems/p-number": ["/asme/p-numbers", "/asme/essential-variables", "/systems/welding-procedure-specification"],
  "/systems/pay-application": ["/construction/pay-applications", "/systems/schedule-of-values", "/systems/retainage", "/systems/lien-waiver"],
  "/systems/procedure-qualification-record": ["/asme/wps-pqr-wpq", "/asme/essential-variables", "/systems/welding-procedure-specification"],
  "/systems/ra-bill": ["/construction/ra-bills", "/systems/measurement-book", "/construction/tds-on-contractor-payments"],
  "/systems/retainage": ["/construction/retainage", "/construction/prompt-payment-acts", "/systems/pay-application"],
  "/systems/reverse-charge": ["/construction/gst-on-works-contracts", "/erp/compliance", "/services/compliance-accounting"],
  "/systems/rfq": ["/services/supplier-portal", "/notes/suppliers-quote-on-a-link", "/systems/three-way-match"],
  "/systems/role-based-access": ["/patterns/role-scoped-finance-views", "/systems/audit-trail", "/services/multi-company-finance"],
  "/systems/routing": ["/manufacturing/production-scheduling-software", "/systems/mrp", "/systems/oee"],
  "/systems/schedule-of-values": ["/construction/pay-applications", "/systems/pay-application", "/systems/change-order"],
  "/systems/stock-reservation": ["/services/inventory-and-reservations", "/manufacturing/distributor-inventory-control", "/notes/reels-boxes-and-two-stores"],
  "/systems/tds-on-purchases": ["/construction/tds-on-contractor-payments", "/erp/compliance", "/services/compliance-accounting"],
  "/systems/text-to-sql": ["/systems/fixed-look-up", "/ai-assistant/how-it-works", "/systems/ai-hallucination"],
  "/systems/three-way-match": ["/systems/rfq", "/services/supplier-portal", "/services/document-extraction"],
  "/systems/variation-order": ["/boq/variation-orders", "/systems/change-order", "/systems/bill-of-quantities"],
  "/systems/welder-continuity": ["/asme/welder-continuity", "/asme/welder-qualification", "/systems/welder-performance-qualification"],
  "/systems/welder-performance-qualification": ["/asme/welder-qualification", "/asme/wps-pqr-wpq", "/systems/welder-continuity"],
  "/systems/welding-procedure-specification": ["/asme/wps-pqr-wpq", "/asme/essential-variables", "/systems/procedure-qualification-record"],
  "/systems/work-in-progress": ["/manufacturing/wip-tracking", "/construction/wip-schedule", "/systems/over-under-billing"],
};

export const relatedFor = (path: string) => relatedLinks(RELATED[path], path);
