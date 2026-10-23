import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { FamilyPicker } from "@/components/FamilyPicker";
import { ServiceDetail } from "@/components/ServiceDetail";
import { families, services, servicesIn, serviceUrl, familyUrl, type Family, type Service } from "@/lib/services";
import { servicePageGraph, serviceFaqGraph, jsonLd } from "@/lib/schema";
import { getContent } from "@/lib/content";
import { seoTitle, metaDescription } from "@/lib/seo";

// Families and services share this route; services.ts guarantees the slugs
// don't collide. Unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...families, ...services].map((x) => ({ slug: x.slug }));
}

type Found = { kind: "family"; family: Family } | { kind: "service"; service: Service; family: Family | null };

function find(slug: string): Found {
  const family = families.find((f) => f.slug === slug);
  if (family) return { kind: "family", family };
  const service = services.find((s) => s.slug === slug)!;
  return { kind: "service", service, family: families.find((f) => f.slug === service.family) ?? null };
}

// Each service's art lives at /what-we-build/<slug>.webp; a page without one
// yet simply shows none. Read at build time: these pages are all prerendered.
const artFor = (slug: string) => {
  const src = `/what-we-build/${slug}.webp`;
  return existsSync(join(process.cwd(), "public", src)) ? src : null;
};

// The first sentence of an answer, for the meta description.
const lead = (text: string) => text.match(/^.*?\.(\s|$)/)?.[0].trim() ?? text;

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const found = find(slug);
  const title = found.kind === "family" ? found.family.name : found.service.name;
  const description = metaDescription(found.kind === "family" ? lead(found.family.summary) : lead(found.service.answer));
  const path = `/services/${slug}`;
  return {
    title: seoTitle(title),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: `https://ahromlabs.com${path}`, siteName: "Ahrom Labs", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServiceOrFamilyPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const found = find(slug);
  const family = found.family;
  const art = found.kind === "family" ? found.family.image : artFor(found.service.slug);
  // For a service page: its industries, and the next service in its family.
  const industries =
    found.kind === "service" ? getContent("industry").filter((i) => i.services?.includes(found.service.slug)) : [];
  const siblings = family ? servicesIn(family) : [];
  const next = found.kind === "service" ? siblings[siblings.indexOf(found.service) + 1] : undefined;
  const crumbs = [
    { name: "Services", path: "/services" },
    ...(family ? [{ name: family.name, path: familyUrl(family) }] : []),
    ...(found.kind === "service" ? [{ name: found.service.name, path: serviceUrl(found.service) }] : []),
  ];
  const graph =
    found.kind === "family"
      ? servicePageGraph(familyUrl(family!), family!.name, family!.summary, servicesIn(family!), crumbs, {
          src: family!.image,
          caption: `${family!.plainName}: ${family!.name}`,
        })
      : servicePageGraph(serviceUrl(found.service), found.service.name, found.service.answer, [found.service], crumbs, art ? {
          src: art,
          caption: `${found.service.plainName}: ${found.service.name}`,
        } : undefined);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      {found.kind === "service" && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceFaqGraph(found.service)) }} />
      )}
      <SiteNav />
      <main className="flex-1">
        {/* Text left, art right on wide screens (same hero as the industry pages);
            on phones the art follows the text. */}
        <section className="rail grid grid-cols-1 items-center gap-10 pt-16 pb-8 md:pt-24 md:pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
          <p className="text-sm font-medium text-foreground-secondary">
            <Link href="/services" className="focus-ring hover:underline">Services</Link>
            {found.kind === "service" && family && (
              <>
                {" · "}
                <Link href={familyUrl(family)} className="focus-ring hover:underline">{family.plainName}</Link>
              </>
            )}
          </p>
          {found.kind === "family" ? (
            <>
              <h1 className="display mt-3 text-5xl text-foreground sm:text-6xl">{family!.plainName}</h1>
              <p className="mt-3 text-lg text-foreground-secondary">{family!.name}</p>
              <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground sm:text-xl">{family!.summary}</p>
            </>
          ) : (
            <>
              <h1 className="display mt-3 text-5xl text-foreground sm:text-6xl">{found.service.name}</h1>
              <p className="prose-measure mt-6 text-xl leading-relaxed text-foreground-secondary">{found.service.plainName}</p>
            </>
          )}
          </div>
          {art && (
            // Decorative; the page background colour is baked into the files. Each
            // object sits mid-canvas, so a 16:9 crop frames it without cutting it.
            <Image
              src={art}
              alt=""
              width={1086}
              height={362}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="aspect-video w-full object-cover lg:col-span-5"
            />
          )}
        </section>

        {family && <FamilyPicker family={family} active={slug} />}

        {found.kind === "family" ? (
          // Every service is summarised here in the HTML, not behind a tab; its
          // full detail lives on its own page.
          servicesIn(family!).map((s) => (
            <section key={s.slug} className="section border-t border-line">
              <div className="rail grid grid-cols-1 items-start gap-8 md:grid-cols-12">
                <Link href={serviceUrl(s)} className="focus-ring block md:col-span-4" tabIndex={-1} aria-hidden="true">
                  {/* Decorative; the heading beside it names the service. */}
                  <Image
                    src={`/what-we-build/${s.slug}.webp`}
                    alt=""
                    width={1086}
                    height={362}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="aspect-video w-full object-cover"
                  />
                </Link>
                <div className="prose-measure md:col-span-8">
                  <h2 className="display text-3xl text-foreground sm:text-4xl">
                    <Link href={serviceUrl(s)} className="focus-ring hover:underline">{s.plainName}</Link>
                  </h2>
                  <p className="mt-3 text-foreground-secondary">{s.name}</p>
                  <p className="mt-6 leading-relaxed text-foreground">{s.forWhom}</p>
                  <p className="mt-6">
                    <Link href={serviceUrl(s)} className="text-link focus-ring">
                      How it works, the numbers and buyer questions
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          ))
        ) : (
          <section className="section border-t border-line">
            <div className="rail">
              <div className="prose-measure">
                <ServiceDetail service={found.service} />

                {/* Keep reading: the next page in the family, the industries it's
                    built for, and (for the whole system) its parts. */}
                <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2">
                  {industries.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-foreground-secondary">Industries</p>
                      <ul className="mt-3 space-y-2">
                        {industries.map((i) => (
                          <li key={i.slug}>
                            <Link href={`/industries/${i.slug}`} className="text-link focus-ring">{i.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {family ? (
                    <div>
                      <p className="text-sm font-medium text-foreground-secondary">Next in {family.plainName.toLowerCase()}</p>
                      <p className="mt-3">
                        <Link href={next ? serviceUrl(next) : familyUrl(family)} className="text-link focus-ring">
                          {next ? next.plainName : "Back to the overview"}
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-foreground-secondary">The parts of the system</p>
                      <ul className="mt-3 space-y-2">
                        {families.map((f) => (
                          <li key={f.slug}>
                            <Link href={familyUrl(f)} className="text-link focus-ring">{f.plainName}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
