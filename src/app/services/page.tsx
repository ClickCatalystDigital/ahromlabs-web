import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import Image from "next/image";
import { services, layers, families, servicesIn, serviceUrl, familyUrl, type Service } from "@/lib/services";

const description =
  "Custom ERP and CRM, TallyPrime integration, multi-company finance, AI document extraction and document search for Indian manufacturers and traders.";

export const metadata: Metadata = {
  title: "Services: custom ERP, CRM, analytics, RAG and AI systems",
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

const erp = services.find((s) => s.family === null);

// One catalogue entry. The id is the old /services#slug anchor, so a link from
// before service pages existed still lands on this service.
function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  return (
    <div
      id={wide ? undefined : service.slug}
      className={`scroll-mt-16 ${wide ? "grid grid-cols-1 items-center gap-8 md:grid-cols-2" : "border-t border-line pt-6"}`}
    >
      <Link href={serviceUrl(service)} className="focus-ring block" tabIndex={-1} aria-hidden="true">
        {/* Decorative; the heading names the service. */}
        <Image
          src={`/what-we-build/${service.slug}.webp`}
          alt=""
          width={1086}
          height={362}
          sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"}
          className={`aspect-video w-full object-cover ${wide ? "" : "mb-5"}`}
        />
      </Link>
      <div>
        <h3 className={`${wide ? "text-2xl" : "text-lg"} font-medium text-foreground`}>
          <Link href={serviceUrl(service)} className="focus-ring hover:underline">{service.plainName}</Link>{" "}
          <span className="mt-1 block text-sm font-normal text-foreground-secondary">{service.name}</span>
        </h3>
        <p className="mt-3 max-w-[52ch] leading-relaxed text-foreground-secondary">{service.forWhom}</p>
        <p className="mt-4">
          <Link href={serviceUrl(service)} className="text-link focus-ring text-sm">
            How it works, the numbers and buyer questions
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail grid grid-cols-1 items-center gap-10 pt-16 pb-8 md:pt-24 md:pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
          <h1 className="display text-5xl text-foreground sm:text-6xl">What we build</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Ahrom Labs builds operations and accounting systems for Indian manufacturers and
            trading groups. We take a business from basic, compliant record-keeping to
            analytics and AI — ERP and CRM, TallyPrime integration, document extraction, and
            search across drawings, certificates and past quotations — all on one model of how
            the business actually works. The system fits the way your business already works,
            not the other way round. Every client claim below links to the engineering note it
            comes from.
          </p>
          </div>
          {/* Decorative: the whole set on one pegboard. Page colour baked into the file. */}
          <Image
            src="/what-we-build/services.webp"
            alt=""
            width={1086}
            height={362}
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
            className="aspect-video w-full object-cover lg:col-span-5"
          />
        </section>

        {/* The ladder: each rung builds on the model the one below it created. */}
        <section className="section border-t border-line">
          <div className="rail">
            <h2 className="display text-3xl text-foreground sm:text-4xl">
              From compliant records to AI, on one model
            </h2>
            <ol className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
              {layers.map((layer, i) => (
                <li key={layer.slug} className="border-t border-line pt-6">
                  <p className="text-sm font-medium text-foreground-secondary">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-lg font-medium text-foreground">{layer.name}</h3>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{layer.summary}</p>
                  <ul className="mt-4 space-y-1">
                    {services
                      .filter((s) => s.layer === layer.slug)
                      .map((s) => (
                        <li key={s.slug}>
                          <Link href={serviceUrl(s)} className="text-link focus-ring text-sm">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The catalogue: the whole system, then each family with its services.
            Full detail lives on each service's own page; the #slug anchors are
            permanent, because older links and citations point at them. */}
        {erp && (
          <section id={erp.slug} className="section scroll-mt-16 border-t border-line">
            <div className="rail">
              <ServiceCard service={erp} wide />
            </div>
          </section>
        )}
        {families.map((f) => (
          <section key={f.slug} id={f.slug} className="section scroll-mt-16 border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                <Link href={familyUrl(f)} className="focus-ring hover:underline">{f.plainName}</Link>
              </h2>
              <p className="mt-3 text-foreground-secondary">{f.name}</p>
              <p className="prose-measure mt-6 leading-relaxed text-foreground">{f.summary}</p>
              <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {servicesIn(f).map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <Reveal>
          <section id="engagement" className="section scroll-mt-16 border-t border-line">
            <div className="rail prose-measure">
              <h2 className="display text-3xl text-foreground sm:text-4xl">How an engagement runs</h2>
              <p className="mt-6 leading-relaxed text-foreground-secondary">
                Every engagement starts by{" "}
                <Link href="/approach" className="text-link focus-ring">modeling the business</Link>: its{" "}
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
                first message:{" "}
                <Link href="/about" className="text-link focus-ring">Pujan Motiwala, Principal</Link>, based in Ahmedabad and working with
                clients across India.
              </p>
              <p className="mt-4 leading-relaxed text-foreground-secondary">
                Work is priced in fixed phases after the modeling phase, and the licence, the
                server and support run under an annual maintenance contract.{" "}
                <Link href="/engagement" className="text-link focus-ring">
                  Pricing, timelines, licensing and support in full
                </Link>
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
