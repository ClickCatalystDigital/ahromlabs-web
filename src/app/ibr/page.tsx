import type { Metadata } from "next";
import Link from "next/link";
import { IbrPage, IbrH2, ibrGuides } from "@/components/IbrPage";
import { ibrFormPages, formName, IBR_FORMS_CHECKED, IBR_FORMS_PUBLISHED } from "@/lib/ibr-forms";
import { ibrPageGraph } from "@/lib/schema";

const title = "IBR 2026 for boiler manufacturers";
const lead =
  "What a boiler maker files under the Indian Boiler Regulations, 2026, which replaced IBR 1950 on 1 October 2026: the renumbered forms, the documents for registration, how long records are kept, and the rules for small industrial boilers. Each page quotes the Gazette and links the official text.";

export const metadata: Metadata = {
  title,
  description: "IBR 2026 for boiler makers: what changed from IBR 1950, every form and its old name, registration documents, record keeping and small industrial boilers.",
  alternates: { canonical: "/ibr" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/ibr",
    siteName: "Ahrom Labs",
    title,
    description: lead,
    images: [{ url: "/ibr/ibr-forms-1950-to-2026.webp", width: 2752, height: 1536, alt: "IBR forms renumbered on 1 October 2026, IBR 1950 to IBR 2026" }],
  },
  twitter: { card: "summary_large_image", title, description: lead },
};


const FORMS_LIST = {
  href: "/ibr/forms",
  title: "IBR 2026 forms list, and their IBR 1950 names",
  text: "Every form from Form I to Form XXIII, the regulation it falls under, and the IBR 1950 form it replaced.",
};

export default function IbrHub() {
  const guides = ibrGuides();
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
      <IbrH2>Guides</IbrH2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {[...guides.map((g) => ({ href: `/ibr/${g.slug}`, title: g.title, text: g.answer })), FORMS_LIST].map((g) => (
          <li key={g.href} className="py-6">
            <Link href={g.href} className="text-link focus-ring text-xl font-medium">
              {g.title}
            </Link>
            <p className="mt-2 leading-relaxed text-foreground-secondary">{g.text}</p>
          </li>
        ))}
      </ul>

      <IbrH2>The forms in a boiler&apos;s folder</IbrH2>
      <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-foreground-secondary sm:grid-cols-2">
        {ibrFormPages().map((f) => (
          <li key={f.slug}>
            <Link href={`/ibr/forms/${f.slug}`} className="text-link focus-ring font-medium">
              {formName(f)}
            </Link>{" "}
            <span className="block text-sm">
              {f.title}
              {f.old && ` · was ${f.old.form}`}
            </span>
          </li>
        ))}
      </ul>
    </IbrPage>
  );
}
