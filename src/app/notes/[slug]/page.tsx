import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { getContent, formatDate } from "@/lib/content";
import { articleGraph, jsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return getContent("note").map((note) => ({ slug: note.slug }));
}

export async function generateMetadata(props: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const note = getContent("note").find((n) => n.slug === slug)!;
  const url = `https://ahromlabs.com/notes/${note.slug}`;

  return {
    title: note.title,
    description: note.answer,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: "Ahrom Labs",
      title: note.title,
      description: note.answer,
      publishedTime: note.published,
      modifiedTime: note.updated,
      authors: ["Pujan Motiwala"],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.answer,
    },
  };
}

const markdownComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-12 text-3xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-4xl" {...props} />
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

export default async function NotePage(props: PageProps<"/notes/[slug]">) {
  const { slug } = await props.params;
  const note = getContent("note").find((n) => n.slug === slug)!;
  const allPatterns = getContent("pattern");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleGraph(note, `/notes/${note.slug}`)) }}
      />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">{note.title}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {note.answer}
          </p>
          <p className="mt-6 text-sm text-foreground-secondary">
            Pujan Motiwala
            {" · "}
            <time dateTime={note.published}>{formatDate(note.published)}</time>
            {note.updated !== note.published && (
              <>
                {" · Updated "}
                <time dateTime={note.updated}>{formatDate(note.updated)}</time>
              </>
            )}
          </p>
        </section>

        <section className="section border-t border-line">
          <div className="rail prose-measure">
            <Markdown components={markdownComponents}>{note.body}</Markdown>

            {note.evidence && note.evidence.length > 0 && (
              <dl className="mt-12 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                {note.evidence.map((item) => (
                  <div key={item.metric}>
                    <dt className="text-sm font-medium text-foreground-secondary">{item.metric}</dt>
                    <dd className="mt-1 text-base text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {note.patterns && note.patterns.length > 0 && (
              <div className="mt-12 border-t border-line pt-8">
                <p className="text-sm font-medium text-foreground-secondary">Related patterns</p>
                <ul className="mt-3 space-y-2">
                  {note.patterns.map((patternSlug) => {
                    const pattern = allPatterns.find((p) => p.slug === patternSlug);
                    return (
                      <li key={patternSlug}>
                        <Link href={`/patterns/${patternSlug}`} className="text-link focus-ring">
                          {pattern?.title ?? patternSlug}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
