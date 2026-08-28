export const siteUrl = "https://ahromlabs.com";

export const orgGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Ahrom Labs",
      url: siteUrl,
      description:
        "Ahrom Labs builds custom operational infrastructure for businesses, modeling entities, relationships, workflows, and decisions as one coherent system.",
      founder: { "@id": `${siteUrl}/#founder` },
      sameAs: ["https://www.linkedin.com/company/ahromlabs"],
      // ponytail: GitHub org / Crunchbase still missing from sameAs — add once those exist.
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Pujan Motiwala",
      jobTitle: "Principal",
      worksFor: { "@id": `${siteUrl}/#organization` },
      knowsAbout: [
        "ERP systems",
        "TallyPrime integration",
        "document extraction",
        "manufacturing operations",
        "data engineering",
        "churn analysis",
      ],
      // ponytail: no sameAs (LinkedIn/GitHub) or alumniOf (education) yet —
      // add both here once you're ready to commit to public bio details.
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Ahrom Labs",
      url: siteUrl,
      description:
        "Custom operational infrastructure engineering: modeling a business's entities, workflows, and decisions, then building the systems on top of that model.",
      serviceType: "Custom business systems and infrastructure engineering",
      provider: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ahrom Labs",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
