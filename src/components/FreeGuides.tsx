import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ibrForms } from "@/lib/ibr-forms";
import { boqItems, trades } from "@/lib/boq";
import { requirements } from "@/lib/erp";
import { questions } from "@/lib/ai-assistant";

// The four free reference hubs, as one section for the homepage, /about and /services: they bring most of
// the search traffic, and a footer link alone carries little weight. Counts come from the data files.
const GUIDES = [
  { href: "/ibr", title: "IBR 2026 guide", text: `All ${ibrForms.length} forms of the Indian Boiler Regulations, 2026 with their IBR 1950 numbers, what changed, registration documents and record keeping, quoted from the Gazette.` },
  { href: "/boq", title: "Interior BOQ guide", text: `How to write a bill of quantities contractors price the same way: ${boqItems.length} items in ${trades.length} trades, a free checker and an Excel template.` },
  { href: "/erp", title: "ERP requirements", text: `${requirements.length} testable requirements for Indian manufacturers and traders, a builder, an Excel scorecard and the GST and company-law rules quoted.` },
  { href: "/ai-assistant", title: "AI assistants guide", text: `How an assistant on your records should answer, a check for made-up numbers, ${questions.length} questions to ask it and a vendor test.` },
];

export function FreeGuides({ heading = "Free guides and tools" }: { heading?: string }) {
  return (
    <Reveal>
      <section className="section border-t border-line">
        <div className="rail">
          <h2 className="display text-3xl text-foreground sm:text-4xl">{heading}</h2>
          <p className="prose-measure mt-6 leading-relaxed text-foreground-secondary">
            Written from the systems we run, checked against the official texts, and free to use without talking to us.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.href} className="border-t border-line pt-5">
                <Link href={g.href} className="text-link focus-ring text-lg font-medium">{g.title}</Link>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-foreground-secondary">{g.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
