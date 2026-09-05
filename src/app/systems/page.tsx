import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import { getContent } from "@/lib/content";
import { jsonLd, termSetGraph } from "@/lib/schema";

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

const DOMAIN_LABELS: Record<string, string> = {
  structure: "Structure",
  governance: "Governance",
  truth: "Truth",
};
const DOMAIN_ORDER = ["structure", "governance", "truth"];

function getGroups() {
  const terms = getContent("term");
  return DOMAIN_ORDER.map((domain) => ({
    label: DOMAIN_LABELS[domain],
    terms: terms
      .filter((t) => t.domain?.[0] === domain)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((t) => ({ term: t.title, definition: t.answer, slug: t.slug })),
  }));
}

export default function SystemsPage() {
  const groups = getGroups();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(termSetGraph(groups.flatMap((g) => g.terms))),
        }}
      />
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
                    <div key={item.term} id={item.slug} className="scroll-mt-24">
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
