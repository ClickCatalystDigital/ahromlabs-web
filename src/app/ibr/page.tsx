import type { Metadata } from "next";
import Link from "next/link";
import { IbrPage } from "@/components/IbrPage";
import { getContent } from "@/lib/content";
import { ibrFormPages, formName, IBR_FORMS_CHECKED, IBR_FORMS_PUBLISHED } from "@/lib/ibr-forms";
import { ibrPageGraph } from "@/lib/schema";

const title = "IBR 2026 for boiler manufacturers";
const lead =
  "What a boiler maker files under the Indian Boiler Regulations, 2026, which replaced IBR 1950 on 1 October 2026: the renumbered forms, the documents for registration, how long records are kept, and the rules for small industrial boilers. Each page quotes the Gazette and links the official text.";

export const metadata: Metadata = {
  title,
  description: "IBR 2026 for boiler makers: what changed from IBR 1950, every form and its old name, registration documents, record keeping and small industrial boilers.",
  alternates: { canonical: "/ibr" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ibr", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

// Guides in reading order; any guide not listed here still shows, after these.
const ORDER = ["2026-changes", "registration-documents", "record-keeping", "small-industrial-boilers"];

export default function IbrHub() {
  const guides = [...getContent("guide")].sort((a, b) => {
    const rank = (s: string) => (ORDER.indexOf(s) + 1 || ORDER.length + 1);
    return rank(a.slug) - rank(b.slug);
  });
  const updated = [IBR_FORMS_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "IBR", path: "/ibr" }];

  return (
    <IbrPage
      graph={ibrPageGraph({ path: "/ibr", title, description: lead, published: IBR_FORMS_PUBLISHED, updated, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={IBR_FORMS_CHECKED}
      updated={updated}
    >
      <h2 className="display text-3xl text-foreground sm:text-4xl">Guides</h2>
      <ul className="mt-4 space-y-6">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/ibr/${g.slug}`} className="text-link focus-ring text-lg font-medium">
              {g.title}
            </Link>
            <p className="mt-1 leading-relaxed text-foreground-secondary">{g.answer}</p>
          </li>
        ))}
        <li>
          <Link href="/ibr/forms" className="text-link focus-ring text-lg font-medium">
            IBR 2026 forms list, and their IBR 1950 names
          </Link>
          <p className="mt-1 leading-relaxed text-foreground-secondary">
            Every form from Form I to Form XXIII, the regulation it falls under, and the IBR 1950 form it replaced.
          </p>
        </li>
      </ul>

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">The forms in a boiler&apos;s folder</h2>
      <ul className="mt-4 space-y-2 text-foreground-secondary">
        {ibrFormPages().map((f) => (
          <li key={f.slug}>
            <Link href={`/ibr/forms/${f.slug}`} className="text-link focus-ring">
              {formName(f)}
            </Link>
            {`: ${f.title}`}
            {f.old && ` (was ${f.old.form})`}
          </li>
        ))}
      </ul>
    </IbrPage>
  );
}
