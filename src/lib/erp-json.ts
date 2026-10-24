// The ERP requirements library as plain data with typed edges: what /erp/requirements.json serves,
// what knowledge.json embeds, and what scripts/build-erp-template.py reads. One shape for all three.
import { requirements, departments, ERP_DOCS, ERP_VERSION, ERP_CHECKED, DEMO_URL, INDUSTRY_LABEL, ROLE_LABEL, PRIORITY_LABEL } from "./erp";
import { services } from "./services";

const site = "https://ahromlabs.com";
const anchor = (id: string) => id.replace(/\./g, "-");

export function erpRequirementNodes() {
  return requirements.map((r) => {
    const svc = r.service ? services.find((s) => s.slug === r.service) : undefined;
    return {
      kind: "erp-requirement",
      id: r.id,
      department: departments.find((d) => d.slug === r.dept)!.name,
      question: r.question,
      requirement: r.text,
      why: r.why,
      test: r.test,
      priority: PRIORITY_LABEL[r.priority],
      appliesTo: r.appliesTo.map((i) => INDUSTRY_LABEL[i]),
      signedOffBy: r.roles.map((x) => ROLE_LABEL[x]),
      ...(r.when && { appliesWhen: r.when }),
      ...(r.benchmark && { benchmark: r.benchmark }),
      ...(r.failure && { failureMode: r.failure }),
      ...(r.built && { ahromLabsStatus: r.built }),
      // Typed edges: what delivers it, proves it, explains it, implements it, governs it, defines it.
      ...(svc && { satisfiedBy: { name: svc.name, url: `${site}/services/${svc.slug}` } }),
      ...(r.demo && { provenBy: { url: DEMO_URL[r.demo.client], signInAs: r.demo.as } }),
      ...(r.note && { explainedBy: `${site}/notes/${r.note}` }),
      ...(r.pattern && { implementedAs: `${site}/patterns/${r.pattern}` }),
      ...(r.term && { defines: `${site}/systems/${r.term}` }),
      ...(r.statutory && {
        governedBy: {
          law: r.statutory.law,
          ...(r.statutory.quote ? { quote: r.statutory.quote } : { cited: r.statutory.cited }),
          inForce: r.statutory.effective,
          appliesTo: r.statutory.appliesWhen,
          source: ERP_DOCS[r.statutory.doc].url,
        },
      }),
      url: `${site}/erp/requirements#${anchor(r.id)}`,
    };
  });
}

export function erpRequirementsJson() {
  return {
    name: "ERP requirements checklist for Indian manufacturers and traders",
    version: ERP_VERSION,
    checked: ERP_CHECKED,
    publisher: "Ahrom Labs",
    url: `${site}/erp/requirements`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    citation: `Ahrom Labs, "ERP requirements checklist for Indian manufacturers and traders", version ${ERP_VERSION}, ${site}/erp/requirements`,
    departments: departments.map((d) => ({ name: d.name, question: d.question, answer: d.answer })),
    requirements: erpRequirementNodes(),
  };
}
