import Link from "next/link";
import Image from "next/image";
import { type Family, servicesIn, serviceUrl, familyUrl } from "@/lib/services";

// The pages of one family as illustrated cards: the overview, then each service.
// Every card is a real link to its own URL, not a client-side switch, so each
// service page is crawlable and citable on its own. Cards wrap; nothing scrolls
// sideways.
export function FamilyPicker({ family, active }: { family: Family; active: string }) {
  const cards = [
    { slug: family.slug, label: "Overview", href: familyUrl(family), image: family.image },
    ...servicesIn(family).map((s) => ({
      slug: s.slug,
      label: s.shortName,
      href: serviceUrl(s),
      image: `/what-we-build/${s.slug}.webp`,
    })),
  ];
  return (
    <nav aria-label={`${family.plainName}: pages`} className="border-t border-line">
      <ul className="rail grid grid-cols-2 gap-3 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => {
          const current = c.slug === active;
          return (
            <li key={c.slug}>
              <Link
                href={c.href}
                aria-current={current ? "page" : undefined}
                className={`focus-ring group block border p-2 transition-colors ${
                  current ? "border-foreground" : "border-line hover:border-foreground-secondary"
                }`}
              >
                {/* Decorative; the label names the page. */}
                <Image
                  src={c.image}
                  alt=""
                  width={1086}
                  height={362}
                  sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                  className="aspect-video w-full object-cover"
                />
                <span
                  className={`mt-2 block px-1 text-sm leading-snug ${
                    current ? "font-medium text-foreground" : "text-foreground-secondary group-hover:text-foreground"
                  }`}
                >
                  {c.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
