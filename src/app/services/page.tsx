import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import { services, resolveProof, proofHref } from "@/lib/services";
import { engagements } from "@/lib/work";

const description =
  "Custom ERP and CRM, TallyPrime integration, AI extraction of GST invoices and customs documents with human review, and multi-company finance with role-scoped access — built for Indian businesses.";

export const metadata: Metadata = {
  title: "Services: ERP, CRM, TallyPrime integration and AI document extraction",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/services",
    siteName: "Ahrom Labs",
    title: "Services | Ahrom Labs",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Ahrom Labs",
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="display text-5xl text-foreground sm:text-6xl">What we build</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Ahrom Labs builds custom operational systems for Indian businesses: ERP and CRM,
            TallyPrime integration, AI document extraction with human review, and
            multi-company finance. Every one of them starts from a model of how your business
            actually works, and every claim below links to the engineering note it comes from.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="text-link focus-ring">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {services.map((service) => {
          const clients = engagements.filter((e) => e.services.includes(service.slug));
          return (
            <Reveal key={service.slug}>
              <section id={service.slug} className="section scroll-mt-16 border-t border-line">
                <div className="rail prose-measure">
                  <h2 className="display text-3xl text-foreground sm:text-4xl">{service.name}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-foreground">{service.answer}</p>
                  <p className="mt-4 leading-relaxed text-foreground-secondary">
                    <span className="font-medium text-foreground">Who it&apos;s for: </span>
                    {service.forWhom}
                  </p>

                  <dl className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                    {service.evidence.map((item) => (
                      <div key={item.metric}>
                        <dt className="text-sm font-medium text-foreground-secondary">{item.metric}</dt>
                        <dd className="mt-1 text-base text-foreground">{item.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-foreground-secondary">How it works, in detail</p>
                      <ul className="mt-3 space-y-2">
                        {service.proof.map((ref) => (
                          <li key={ref.slug}>
                            <Link href={proofHref(ref)} className="text-link focus-ring">
                              {resolveProof(ref).title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {clients.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-foreground-secondary">Built for</p>
                        <ul className="mt-3 space-y-2">
                          {clients.map((c) => (
                            <li key={c.slug}>
                              <Link href={`/work#${c.slug}`} className="text-link focus-ring">
                                {c.client}
                              </Link>
                              <span className="text-foreground-secondary"> — {c.industry}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </Reveal>
          );
        })}

        <Reveal>
          <section id="engagement" className="section scroll-mt-16 border-t border-line">
            <div className="rail prose-measure">
              <h2 className="display text-3xl text-foreground sm:text-4xl">How an engagement runs</h2>
              <p className="mt-6 leading-relaxed text-foreground-secondary">
                Every engagement starts by modeling the business: its{" "}
                <Link href="/systems#entity" className="text-link focus-ring">entities</Link>,
                the{" "}
                <Link href="/systems#workflow" className="text-link focus-ring">workflows</Link>{" "}
                that move work between people, and the{" "}
                <Link href="/systems#decision" className="text-link focus-ring">decisions</Link>{" "}
                that change what happens next. That model becomes the specification, agreed
                before anything is built, so the structure isn&apos;t renegotiated halfway through.
              </p>
              <p className="mt-4 leading-relaxed text-foreground-secondary">
                Ahrom Labs takes on a small number of engagements at a time. The person who
                models your business is the same person who writes the code and answers your
                first message: Pujan Motiwala, Principal, based in Ahmedabad and working with
                clients across India.
              </p>
              <p className="mt-4 leading-relaxed text-foreground-secondary">
                Ahrom Labs is a services practice, not a software product: there is no
                self-serve signup and no published price list. Tell us what your business runs
                on today and we&apos;ll reply ourselves.
              </p>
            </div>
          </section>
        </Reveal>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
