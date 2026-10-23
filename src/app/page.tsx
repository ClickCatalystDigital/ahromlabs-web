import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SystemDiagram } from "@/components/SystemDiagram";
import { ContactForm } from "@/components/ContactForm";
import heroImage from "../../public/hero.webp";
import { services, families, servicesIn, serviceUrl, familyUrl } from "@/lib/services";
import { engagements } from "@/lib/work";
import { industryForClient } from "@/lib/industries";
import { metaDescription } from "@/lib/seo";

const description = metaDescription("Custom ERP for Indian manufacturers and trading groups: BOMs, shop floor, IBR, GST and TDS compliance and TallyPrime in one system. Built in Ahmedabad.");

export const metadata: Metadata = {
  // The homepage <title> is the single strongest signal of what this site is
  // about. "Ahrom Labs" alone told Google and every model nothing.
  title: { absolute: "Ahrom Labs: custom ERP for manufacturers and traders" },
  description,
  alternates: {
    canonical: "/",
    types: { "application/json": "/knowledge.json" },
  },
};

const principles = [
  {
    title: "Understand before automating.",
    body: "Automation on top of a business no one has modeled just moves the mess faster.",
  },
  {
    title: "Systems over features.",
    body: "A feature solves one task. A system explains how the tasks relate.",
  },
  {
    title: "Evidence over assumptions.",
    body: "Decisions should trace back to the data and events that produced them.",
  },
  {
    title: "One coherent system over disconnected tools.",
    body: "Every additional disconnected tool is another place the truth can diverge.",
  },
];

// The whole-system service leads the section; families follow.
const erp = services.find((s) => s.family === null);

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative flex items-center overflow-hidden py-12 lg:py-0">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0">
            <div className="rail relative z-10 col-span-1 row-start-1 lg:col-span-6 lg:col-start-1 lg:row-start-1">
              <h1 className="display max-w-[14ch] text-5xl text-foreground sm:text-6xl lg:text-6xl">
                We build the systems your business runs on.
              </h1>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-pretty text-foreground-secondary sm:text-xl">
                One system for the whole business, from enquiry to dispatch to the books,
                that also tells you what&apos;s late, what&apos;s owed and what needs a decision
                today. Tally can stay. Already in daily use at manufacturers, traders and design&nbsp;studios.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="#contact" className="subscribe-submit focus-ring inline-block">
                  Start a conversation
                </a>
                <a href="#demos" className="text-link focus-ring">
                  Or try a live demo
                </a>
              </div>
            </div>
            {/* Oversized and pulled left so it passes behind the headline rather
                than sitting in its own column.. pointer-events-none keeps it from
                intercepting the CTA where they overlap; the text column carries
                z-10 so it stays on top. */}
            <div className="pointer-events-none hidden lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:flex lg:items-center lg:justify-end">
              {/* Hidden below lg, so no preload: a preloaded 370 KB image was downloaded on every phone
                  and delayed the headline (mobile LCP 3.8 s). Lazy + high priority: phones skip it,
                  desktops fetch it first. */}
              <Image
                src={heroImage}
                alt=""
                fetchPriority="high"
                className="h-auto w-full max-w-md object-contain lg:max-w-none lg:w-full"
              />
            </div>
          </div>
        </section>

        {/* 2. The problem */}
        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                Your business runs on disconnected systems.
              </h2>
              <p className="prose-measure mt-6 text-base leading-relaxed text-foreground-secondary">
                A typical business runs on a CRM, an ERP, a handful of spreadsheets, and a
                dozen smaller tools, each holding a partial view of how the business works.
                None of them share a model of the{" "}
                <Link href="/systems#entity" className="text-link focus-ring">
                  entities
                </Link>,{" "}
                <Link href="/systems#relationship" className="text-link focus-ring">
                  relationships
                </Link>, or{" "}
                <Link href="/systems#workflow" className="text-link focus-ring">
                  workflows
                </Link>{" "}
                underneath.
              </p>
              <p className="prose-measure mt-4 text-base leading-relaxed text-foreground-secondary">
                Every integration between them is a workaround. Every new tool adds another
                place the truth can diverge from what actually happened.
              </p>
            </div>
          </section>
        </Reveal>

        {/* What we build. The whole system first, then its five parts, each in the
            owner's words with the buyer-search name in the same heading. */}
        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">What we build</h2>
              <p className="prose-measure mt-6 text-base leading-relaxed text-foreground-secondary">
                Start with records that are correct and compliant. Add the workflows your
                people run every day. Then analytics, then AI — each layer built on the same
                model, so nothing has to be rebuilt to climb to the next one.
              </p>

              {erp && (
                <Link
                  href={serviceUrl(erp)}
                  className="focus-ring mt-12 grid grid-cols-1 items-center gap-8 border-t border-line pt-6 md:grid-cols-2"
                >
                  {/* Decorative art; the page background colour is baked into the files. */}
                  <Image
                    src={`/what-we-build/${erp.slug}.webp`}
                    alt=""
                    width={1086}
                    height={362}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                  <div>
                    <h3 className="text-2xl font-medium text-foreground">
                      {erp.plainName}{" "}
                      <span className="mt-1 block text-sm font-normal text-foreground-secondary">{erp.name}</span>
                    </h3>
                    <p className="mt-3 max-w-[52ch] leading-relaxed text-foreground-secondary">{erp.forWhom}</p>
                  </div>
                </Link>
              )}

              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {families.map((f) => (
                  <div key={f.slug} className="border-t border-line pt-6">
                    <Link href={familyUrl(f)} className="focus-ring block">
                      <Image
                        src={f.image}
                        alt=""
                        width={1086}
                        height={362}
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                        className="mb-5 h-auto w-full"
                      />
                      <h3 className="text-lg font-medium text-foreground">
                        {f.plainName}{" "}
                        <span className="mt-1 block text-sm font-normal text-foreground-secondary">{f.name}</span>
                      </h3>
                    </Link>
                    <ul className="mt-4 space-y-2">
                      {servicesIn(f).map((s) => (
                        <li key={s.slug}>
                          <Link href={serviceUrl(s)} className="text-link focus-ring text-sm leading-snug">
                            {s.plainName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-10">
                <Link href="/services" className="text-link focus-ring">
                  How each one works, with the numbers
                </Link>
              </p>
            </div>
          </section>
        </Reveal>

        {/* Live demos: try the real systems with sample companies before talking. */}
        <Reveal>
          <section id="demos" className="section scroll-mt-16 border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">Try it before you talk to us</h2>
              <p className="prose-measure mt-6 text-base leading-relaxed text-foreground-secondary">
                Three of the systems we&apos;ve built, running with sample companies. A short form, then
                pick a sample login. Free, and every demo resets each night.
              </p>
              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
                {engagements
                  .filter((e) => e.demo)
                  .map((e) => (
                    <div key={e.slug} className="border-t border-line pt-6">
                      <h3 className="text-lg font-medium text-foreground">{e.demo!.name}</h3>
                      <p className="mt-1 text-sm text-foreground-secondary">{e.industry}</p>
                      <p className="mt-3 max-w-[48ch] leading-relaxed text-foreground-secondary">{e.demo!.blurb}</p>
                      <a href={e.demo!.url} className="text-link focus-ring mt-4 inline-block">
                        {e.demo!.label}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 3. The Ahrom approach */}
        <Reveal>
          <section className="section border-t border-line">
            <div className="rail grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h2 className="display text-3xl text-foreground sm:text-4xl">
                  The Ahrom approach
                </h2>
                <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-foreground-secondary">
                  We start by modeling how your business actually works, then build the
                  systems on top of that model. The application layer comes second.
                </p>
                <p className="mt-4">
                  <Link href="/approach" className="text-link focus-ring">
                    How we map a business before building
                  </Link>
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border-t border-line pt-4">
                  <p className="text-sm font-medium text-foreground-secondary">Common approach</p>
                  <p className="mt-2 text-base text-foreground">
                    Every department gets its own application. Data is duplicated and
                    synced between them by hand or by fragile integrations.
                  </p>
                </div>
                <div className="border-t border-line pt-4">
                  <p className="text-sm font-medium text-foreground-secondary">Our approach</p>
                  <p className="mt-2 text-base text-foreground">
                    We model your entities, relationships, and workflows once. Every
                    surface you use reads from and writes to that same structure, built
                    around the way your people already work, not the other way round.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 4. System diagram */}
        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                One structure, not a stack of tools.
              </h2>
              <div className="mx-auto mt-16 max-w-xl">
                <SystemDiagram />
              </div>
            </div>
          </section>
        </Reveal>

        {/* 5. Principles */}
        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                What we believe
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
                {principles.map((principle) => (
                  <div key={principle.title} className="principle-block pt-6">
                    <p className="text-lg font-medium text-foreground">{principle.title}</p>
                    <p className="mt-2 max-w-[45ch] text-base leading-relaxed text-foreground-secondary">
                      {principle.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Named clients, one concrete line each, linking into /work and the
            notes — the homepage previously had no path to either. */}
        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                Systems we&apos;ve built
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
                {engagements.map((e) => {
                  // The industry page is the richer destination; fall back to /work.
                  const industry = industryForClient(e.slug);
                  return (
                    <Link
                      key={e.slug}
                      href={industry ? `/industries/${industry.slug}` : `/work#${e.slug}`}
                      className="focus-ring block border-t border-line pt-6"
                    >
                      <h3 className="text-lg font-medium text-foreground">{e.client}</h3>
                      <p className="mt-1 text-sm text-foreground-secondary">{e.industry}</p>
                      <p className="mt-3 leading-relaxed text-foreground-secondary">{e.highlights[0]}</p>
                    </Link>
                  );
                })}
              </div>
              <p className="mt-10">
                <Link href="/industries" className="text-link focus-ring">
                  Browse by industry
                </Link>
                <span className="text-foreground-secondary"> · </span>
                <Link href="/work" className="text-link focus-ring">
                  See all work
                </Link>
                <span className="text-foreground-secondary"> · </span>
                <Link href="/notes" className="text-link focus-ring">
                  Read the engineering notes
                </Link>
              </p>
            </div>
          </section>
        </Reveal>

        {/* 6. Who we're for */}
        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                Who this is for
              </h2>
              <p className="prose-measure mt-6 text-base leading-relaxed text-foreground-secondary">
                You run a business that has outgrown the tools holding it together: a CRM
                here, a spreadsheet there, and a few people who remember how it all actually
                connects. You don&apos;t need another application bolted onto the pile. You
                need the structure your business can finally stand on, modeled properly
                before anyone writes a line of code.
              </p>
              <p className="prose-measure mt-4 text-base leading-relaxed text-foreground-secondary">
                Industry doesn&apos;t decide the fit; the shape of the problem does. So far
                that has meant a boiler manufacturer, a PCB trading company, and an interior
                design firm with a sister furniture workshop — each with its accounts in
                TallyPrime and its operations spread across spreadsheets and chat.
              </p>
            </div>
          </section>
        </Reveal>

        {/* 7. How we work */}
        <Reveal>
          <section id="how-we-work" className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                How we work
              </h2>
              <p className="prose-measure mt-6 text-base leading-relaxed text-foreground-secondary">
                Every engagement starts the same way: we model your business before we
                design anything. That model becomes the specification. What gets built
                after it is not up for negotiation halfway through, because the structure
                was agreed on first.
              </p>
              <p className="prose-measure mt-4 text-base leading-relaxed text-foreground-secondary">
                We work with a small number of businesses at a time, not a pipeline.
                Modeling a business properly takes real attention, and we protect the time
                that takes.
              </p>
              <p className="prose-measure mt-4 text-base leading-relaxed text-foreground-secondary">
                Every project is priced in fixed phases, with the scope written down and
                agreed before any work starts.{" "}
                <Link href="/engagement" className="text-link focus-ring">
                  How pricing, licensing and support work
                </Link>
              </p>
            </div>
          </section>
        </Reveal>

        {/* 8. Contact */}
        <Reveal>
          <section id="contact" className="section border-t border-line">
            <div className="rail">
              <h2 className="display text-3xl text-foreground sm:text-4xl">
                Start a conversation
              </h2>
              <p className="prose-measure mt-4 text-base leading-relaxed text-foreground-secondary">
                Tell us what your business runs on today, and where it&apos;s held together
                with workarounds. We reply to every message ourselves.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
