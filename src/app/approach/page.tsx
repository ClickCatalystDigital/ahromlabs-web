import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Ahrom Labs models your business before automating it, and why architecture, not features, is the unit of value.",
  alternates: { canonical: "/approach" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/approach",
    siteName: "Ahrom Labs",
    title: "Approach | Ahrom Labs",
    description:
      "How Ahrom Labs models your business before automating it, and why architecture, not features, is the unit of value.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Approach | Ahrom Labs",
    description:
      "How Ahrom Labs models your business before automating it, and why architecture, not features, is the unit of value.",
  },
};

const sections = [
  {
    heading: "We model your business before automating it",
    // The one sentence that introduces four glossary terms at once — the only
    // place on this page worth linking out of. Later uses stay plain text.
    body: (
      <>
        Automation applied to an unmodeled business speeds up whatever is already
        happening, including the parts that are broken. Before we automate anything, we
        map the <Link href="/systems#entity" className="text-link focus-ring">entities</Link> involved in your business, the 
        <Link href="/systems#relationship" className="text-link focus-ring">relationships</Link> between them, and the 
        <Link href="/systems#workflow" className="text-link focus-ring">workflows</Link> and <Link href="/systems#dependency" className="text-link focus-ring">dependencies</Link> that move work
        forward. That map becomes the thing your software is built on, not documentation
        kept alongside it.
      </>
    ),
  },
  {
    heading: "Architecture is the unit of value, not the feature",
    body: "A feature solves a task in isolation. It does not know what happens to its output once another team picks it up. The systems we build for you are structured so that permissions, data, and business rules are defined once and referenced everywhere, rather than redefined per application. A change to how an entity behaves propagates through every workflow that touches it, instead of requiring a separate fix in each tool.",
  },
  {
    heading: "Decisions need evidence, not just outputs",
    body: "Most systems record what happened but not why. We treat decisions and the evidence behind them as first-class parts of your model, alongside entities and workflows. A state transition, an approval, an exception, each one is connected to the data that justified it, so the reasoning stays attached to the record instead of living in someone's memory or a Slack thread.",
  },
  {
    heading: "Cross-department processes are the real workload",
    body: "The hardest problems in a business rarely live inside one department. They live at the handoffs: sales to fulfillment, support to engineering, finance to everyone. We model your cross-department processes directly, as first-class workflows with their own state, rather than as email threads that connect otherwise disconnected tools.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Approach
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Most software treats a business as a set of separate functions. We treat it as
            one system, and build from that model outward.
          </p>
        </section>

        {sections.map((s) => (
          <Reveal key={s.heading}>
            <section className="section border-t border-line">
              <div className="rail">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {s.heading}
                </h2>
                <p className="prose-measure mt-4 leading-relaxed text-foreground-secondary">{s.body}</p>
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
