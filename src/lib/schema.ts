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
      sameAs: [
        "https://www.linkedin.com/company/ahromlabs",
        "https://github.com/ahromlabs",
      ],
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
      sameAs: [
        "https://www.linkedin.com/in/pujanmotiwala/",
        "https://github.com/PujanMotiwala",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Stevens Institute of Technology",
      },
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
