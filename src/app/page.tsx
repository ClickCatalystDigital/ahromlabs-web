import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SystemDiagram } from "@/components/SystemDiagram";
import { ContactForm } from "@/components/ContactForm";
import heroImage from "../../public/hero.webp";

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

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative flex items-center overflow-hidden py-12 lg:py-0">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0">
            <div className="rail relative z-10 col-span-1 row-start-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:translate-x-8">
              <h1 className="display max-w-[14ch] text-5xl text-foreground sm:text-6xl lg:text-6xl">
                We build the systems your business runs on.
              </h1>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-foreground-secondary sm:text-xl">
                Ahrom Labs designs and builds custom operational infrastructure. We model
                your entities, workflows, and decisions as one connected system, not another
                disconnected app.
              </p>
              <a href="#contact" className="subscribe-submit focus-ring mt-8 inline-block">
                Start a conversation
              </a>
            </div>
            {/* Oversized and pulled left so it passes behind the headline rather
                than sitting in its own column.. pointer-events-none keeps it from
                intercepting the CTA where they overlap; the text column carries
                z-10 so it stays on top. */}
            <div className="pointer-events-none hidden lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:flex lg:items-center lg:justify-end">
              <Image
                src={heroImage}
                alt=""
                priority
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
                    surface you use reads from and writes to that same structure.
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
