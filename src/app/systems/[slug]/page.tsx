import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { getContent, formatDate, termHasPage } from "@/lib/content";
import { jsonLd, termGraph } from "@/lib/schema";

// Only terms with real body content get a page — see termHasPage. Terms without
// one stay as definitions on /systems, which is all their content supports.
function pagedTerms() {
  return getContent("term").filter(termHasPage);
}

export function generateStaticParams() {
  return pagedTerms().map((term) => ({ slug: term.slug }));
}

export async function generateMetadata(props: PageProps<"/systems/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const term = pagedTerms().find((t) => t.slug === slug)!;
  const url = `https://ahromlabs.com/systems/${term.slug}`;

  return {
    title: term.title,
    description: term.answer,
    alternates: { canonical: `/systems/${term.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: "Ahrom Labs",
      title: term.title,
      description: term.answer,
      publishedTime: term.published,
      modifiedTime: term.updated,
      authors: ["Pujan Motiwala"],
    },
    twitter: {
      card: "summary_large_image",
      title: term.title,
      description: term.answer,
    },
  };
}

const markdownComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="display mt-12 text-3xl text-foreground first:mt-0 sm:text-4xl" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-8 border-l-2 border-line pl-6 italic text-foreground" {...props} />
  ),
};

export default async function TermPage(props: PageProps<"/systems/[slug]">) {
  const { slug } = await props.params;
  const term = pagedTerms().find((t) => t.slug === slug)!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(termGraph(term)) }}
      />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="display text-5xl text-foreground sm:text-6xl">{term.title}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {term.answer}
          </p>
          <p className="mt-6 text-sm text-foreground-secondary">
            Pujan Motiwala
            {" · "}
            <time dateTime={term.published}>{formatDate(term.published)}</time>
            {term.updated !== term.published && (
              <>
                {" · Updated "}
                <time dateTime={term.updated}>{formatDate(term.updated)}</time>
              </>
            )}
          </p>
        </section>

        <section className="section border-t border-line">
          <div className="rail prose-measure">
            <Markdown components={markdownComponents}>{term.body}</Markdown>

            <div className="mt-12 border-t border-line pt-8">
              <Link href="/systems" className="text-link focus-ring">
                All systems vocabulary
              </Link>
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
