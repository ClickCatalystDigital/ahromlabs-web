import type { Metadata } from "next";
import Link from "next/link";
import { IbrPage, IbrH2 } from "@/components/IbrPage";
import { ibrForms, ibrGroups, formName, unmatched1950, IBR_FORMS_CHECKED, IBR_FORMS_PUBLISHED } from "@/lib/ibr-forms";
import { ibrPageGraph } from "@/lib/schema";

const title = "IBR 2026 forms list, and their IBR 1950 names";
const lead =
  "Every form in the Indian Boiler Regulations, 2026, what it is, the regulation it falls under, and the IBR 1950 form it replaced. The forms were renumbered: Form III, the maker's certificate, is now Form IV Part A, and Forms II(1) and II(2), the inspection certificates, are now Form I Part B and Part C.";

export const metadata: Metadata = {
  title,
  description: "Every IBR 2026 form with its regulation and the IBR 1950 form it replaced: Form I to Form XXIII, including Form IV Part A, Form V Part B and Form XXII.",
  alternates: { canonical: "/ibr/forms" },
  openGraph: {
    type: "article",
    url: "https://ahromlabs.com/ibr/forms",
    siteName: "Ahrom Labs",
    title,
    description: lead,
    images: [{ url: "/ibr/ibr-forms-1950-to-2026.webp", width: 2752, height: 1536, alt: "IBR forms renumbered on 1 October 2026, IBR 1950 to IBR 2026" }],
  },
  twitter: { card: "summary_large_image", title, description: lead },
};

// Wraps only at spaces: "Form XVI-A to XVI-I" may break between words, never inside "XVI-A".
const oldName = (name: string) =>
  name.split(" ").map((word, i) => (
    <span key={i} className="whitespace-nowrap">
      {i > 0 && " "}
      {word}
    </span>
  ));

const IMAGE = {
  src: "/ibr/ibr-forms-1950-to-2026.webp",
  alt: "IBR forms renumbered on 1 October 2026, IBR 1950 to IBR 2026: Form II(1) is now Form I Part B; Form II(2), Form I Part C; Form III, Form IV Part A; Form III-A, Form IV Part B; Form IV, Form V Part A; Form IV-A, Form V Part B; Form V, Form X; Form I, Form XI; Form VI, Form XII; Form XVII, Form XXII. Source: Indian Boiler Regulations, 2026, Gazette of India No. 596.",
  width: 2752,
  height: 1536,
  caption: "The IBR 1950 forms in a boiler's folder and their IBR 2026 numbers, from the Gazette of 1 October 2026.",
};

export default function IbrFormsPage() {
  const trail = [
    { name: "IBR", path: "/ibr" },
    { name: "Forms", path: "/ibr/forms" },
  ];
  const renamed = ibrForms.filter((f) => f.old).sort((a, b) => a.old!.form.localeCompare(b.old!.form, "en", { numeric: true }));
  const isNew = ibrForms.filter((f) => !f.old);
  const link = (f: (typeof ibrForms)[number]) =>
    f.page ? (
      <Link href={`/ibr/forms/${f.slug}`} className="text-link focus-ring">
        {formName(f)}
      </Link>
    ) : (
      <span className="text-foreground">{formName(f)}</span>
    );

  const groups = ibrGroups.filter((g) => ibrForms.some((f) => f.group === g.id));
  const OLD_HEADING = "What is my old IBR 1950 form called now?";
  const NEW_HEADING = "Which IBR 2026 forms are new?";

  return (
    <IbrPage
      graph={ibrPageGraph({ path: "/ibr/forms", title, description: lead, published: IBR_FORMS_PUBLISHED, updated: IBR_FORMS_CHECKED, trail, image: { src: IMAGE.src, alt: IMAGE.alt } })}
      trail={trail}
      title={title}
      lead={lead}
      checked={IBR_FORMS_CHECKED}
      updated={IBR_FORMS_CHECKED}
      headings={[OLD_HEADING, ...groups.map((g) => g.name), NEW_HEADING]}
      image={IMAGE}
    >
      {/* The 1950 → 2026 mapping first, as a table: it is the question most readers
          arrive with, and search engines lift tables straight into answers. */}
      <IbrH2>{OLD_HEADING}</IbrH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Folders and drawings will carry IBR 1950 form names for years. Each one below is matched to its IBR 2026 form by
        the title both regulations print.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">IBR 1950 forms and the IBR 2026 forms that replaced them</caption>
          <thead>
            <tr className="border-b border-line text-foreground-secondary">
              <th scope="col" className="py-2 pr-6 font-medium whitespace-nowrap">IBR 1950</th>
              <th scope="col" className="py-2 font-medium">IBR 2026, and what it is</th>
            </tr>
          </thead>
          <tbody className="text-foreground-secondary">
            {renamed.map((f) => (
              <tr key={f.slug} className="border-b border-line align-top">
                <td className="py-3 pr-6">{oldName(f.old!.form)}</td>
                <td className="py-3 [overflow-wrap:anywhere]">
                  <span className="font-medium">{link(f)}</span>{" "}
                  <span className="mt-0.5 block">{f.title}</span>
                </td>
              </tr>
            ))}
            {unmatched1950.map((u) => (
              <tr key={u.form} className="border-b border-line align-top">
                <td className="py-3 pr-6">{oldName(u.form)}</td>
                <td className="py-3 [overflow-wrap:anywhere]">
                  <span className="font-medium text-foreground">No IBR 2026 form with this title</span>{" "}
                  <span className="mt-0.5 block">{u.title}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {groups.map((g) => (
        <div key={g.id}>
          <IbrH2>{g.name}</IbrH2>
          <ul className="mt-4 space-y-5">
            {ibrForms
              .filter((f) => f.group === g.id)
              .map((f) => (
                <li key={f.slug} className="leading-relaxed text-foreground-secondary">
                  <span className="font-medium">{link(f)}</span>
                  {`: ${f.title}. `}
                  {f.summary}
                  <span className="mt-1 block text-sm">
                    Regulation {f.regulation}
                    {f.old ? ` · was ${f.old.form} under IBR 1950` : " · new in IBR 2026"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}

      <IbrH2>{NEW_HEADING}</IbrH2>
      <ul className="mt-4 space-y-3 text-foreground-secondary">
        {isNew.map((f) => (
          <li key={f.slug}>
            <span className="font-medium">{link(f)}</span>: {f.summary}
          </li>
        ))}
      </ul>
    </IbrPage>
  );
}
