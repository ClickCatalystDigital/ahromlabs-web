import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import { services, resolveProof, proofHref } from "@/lib/services";
import { engagements } from "@/lib/work";

const description =
  "Systems Ahrom Labs has built for LS Technologies, Savistar & Saag, and Shanti Boilers & Pressure Vessels — ERP, CRM, TallyPrime integration, AI document extraction and manufacturing operations.";

export const metadata: Metadata = {
  title: "Work: clients and the systems we built for them",
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/work",
    siteName: "Ahrom Labs",
    title: "Work | Ahrom Labs",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Ahrom Labs",
    description,
  },
};

const serviceName = (slug: string) => services.find((s) => s.slug === slug)!.name;

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="display text-5xl text-foreground sm:text-6xl">Work</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            The businesses we&apos;ve built systems for, named with their permission, and what
            each system actually does. The detail lives in the linked engineering notes.
          </p>
        </section>

        {engagements.map((e) => (
          <Reveal key={e.slug}>
            <section id={e.slug} className="section scroll-mt-16 border-t border-line">
              <div className="rail prose-measure">
                <p className="text-sm font-medium text-foreground-secondary">{e.industry}</p>
                <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">{e.client}</h2>
                <p className="mt-6 text-lg leading-relaxed text-foreground">{e.built}</p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-foreground-secondary">
                  {e.highlights.map((h) => (
                    <li key={h} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>

                {e.quote && (
                  <blockquote className="mt-8 border-l-2 border-line pl-6 text-foreground">
                    <p className="italic leading-relaxed">&ldquo;{e.quote.text}&rdquo;</p>
                    <footer className="mt-3 text-sm not-italic text-foreground-secondary">
                      — {e.quote.attribution}
                    </footer>
                  </blockquote>
                )}

                <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-foreground-secondary">Read the detail</p>
                    <ul className="mt-3 space-y-2">
                      {e.proof.map((ref) => (
                        <li key={ref.slug}>
                          <Link href={proofHref(ref)} className="text-link focus-ring">
                            {resolveProof(ref).title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground-secondary">Services</p>
                    <ul className="mt-3 space-y-2">
                      {e.services.map((slug) => (
                        <li key={slug}>
                          <Link href={`/services#${slug}`} className="text-link focus-ring">
                            {serviceName(slug)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section id="open-source" className="section scroll-mt-16 border-t border-line">
            <div className="rail prose-measure">
              <p className="text-sm font-medium text-foreground-secondary">Open source</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">tally-voucher-xml</h2>
              <p className="mt-6 leading-relaxed text-foreground-secondary">
                The voucher-XML building, push-to-Tally and error-classification logic from the
                LS Technologies system, extracted into a small, dependency-free library with 32
                tests and stripped of that business&apos;s ledger names and database coupling.{" "}
                <a
                  href="https://github.com/ahromlabs/tally-voucher-xml"
                  className="text-link focus-ring"
                >
                  github.com/ahromlabs/tally-voucher-xml
                </a>
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
