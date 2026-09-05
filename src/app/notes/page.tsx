import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { getContent, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description: "Engineering notes from real client work — what we built, why, and what it actually does in production.",
  alternates: { canonical: "/notes" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/notes",
    siteName: "Ahrom Labs",
    title: "Notes | Ahrom Labs",
    description: "Engineering notes from real client work — what we built, why, and what it actually does in production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes | Ahrom Labs",
    description: "Engineering notes from real client work — what we built, why, and what it actually does in production.",
  },
};

export default function NotesPage() {
  const notes = [...getContent("note")].sort((a, b) => b.published.localeCompare(a.published));

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Notes
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Engineering notes from real client work: what we built, why, and what it actually does in production.
          </p>
        </section>

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
                {notes.map((note) => (
                  <Link
                    key={note.slug}
                    href={`/notes/${note.slug}`}
                    className="focus-ring block border-t border-line pt-6"
                  >
                    <h2 className="text-lg font-medium text-foreground">{note.title}</h2>
                    <p className="mt-2 max-w-[45ch] leading-relaxed text-foreground-secondary">{note.answer}</p>
                    <time
                      dateTime={note.published}
                      className="mt-3 block text-sm text-foreground-secondary"
                    >
                      {formatDate(note.published)}
                    </time>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
