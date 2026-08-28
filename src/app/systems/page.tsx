import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "The vocabulary Ahrom Labs uses to model a business: entities, relationships, workflows, evidence, and the terms that connect them.",
  alternates: { canonical: "/systems" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/systems",
    siteName: "Ahrom Labs",
    title: "Systems | Ahrom Labs",
    description:
      "The vocabulary Ahrom Labs uses to model a business: entities, relationships, workflows, evidence, and the terms that connect them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Systems | Ahrom Labs",
    description:
      "The vocabulary Ahrom Labs uses to model a business: entities, relationships, workflows, evidence, and the terms that connect them.",
  },
};

function slugify(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const groups = [
  {
    label: "Structure",
    terms: [
      {
        term: "Entity",
        definition:
          "A distinct thing the business tracks: a customer, an order, an employee, an asset. Entities are the nouns the rest of the system refers to.",
      },
      {
        term: "Relationship",
        definition:
          "A defined connection between two entities, such as which customer placed which order. Relationships are modeled directly, not inferred from matching IDs across separate tables.",
      },
      {
        term: "Workflow",
        definition:
          "A sequence of steps that moves an entity from one state to another, with a defined owner at each step.",
      },
      {
        term: "Dependency",
        definition:
          "A requirement that one step, entity, or workflow places on another before it can proceed.",
      },
    ],
  },
  {
    label: "Governance",
    terms: [
      {
        term: "Permission",
        definition:
          "A rule defining who can view, change, or act on a given entity or workflow step, defined once and enforced everywhere that entity appears.",
      },
      {
        term: "Business rule",
        definition:
          "A constraint the business enforces regardless of which application is being used, such as an approval threshold or an eligibility condition.",
      },
      {
        term: "State transition",
        definition:
          "A recorded change in an entity's status, such as an order moving from placed to fulfilled, along with what caused the change.",
      },
    ],
  },
  {
    label: "Truth",
    terms: [
      {
        term: "Data",
        definition:
          "The recorded facts a business has about its entities and events, structured according to the model rather than scattered across tools.",
      },
      {
        term: "Decision",
        definition:
          "A choice made by a person or a system that changes what happens next, tracked as its own record rather than only its downstream effect.",
      },
      {
        term: "Evidence",
        definition:
          "The data and events that justified a decision, kept attached to that decision so the reasoning can be reviewed later.",
      },
      {
        term: "Cross-department process",
        definition:
          "A workflow that spans more than one team, such as sales handing off to fulfillment, modeled as one continuous process rather than as separate steps in separate tools.",
      },
    ],
  },
];

export default function SystemsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Systems
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            The vocabulary Ahrom uses to model a business. These are the terms the
            architecture is built from.
          </p>
        </section>

        {groups.map((group) => (
          <Reveal key={group.label}>
            <section className="section border-t border-line">
              <div className="rail">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {group.label}
                </h2>
                <dl className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
                  {group.terms.map((item) => (
                    <div key={item.term} id={slugify(item.term)} className="scroll-mt-24">
                      <dt className="text-lg font-medium text-foreground">{item.term}</dt>
                      <dd className="mt-2 max-w-[45ch] leading-relaxed text-foreground-secondary">
                        {item.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          </Reveal>
        ))}

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
