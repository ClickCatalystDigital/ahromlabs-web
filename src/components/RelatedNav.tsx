import Link from "next/link";
import { marketsFor, only, type MarketCode } from "@/lib/markets";

// The "Related" list under a page. A link to one market's page is hidden from the other market's visitors, and the
// whole list when none of its links would show.
export function RelatedNav({ links, title = "Related", className = "mt-14 border-t border-line pt-8" }: {
  links: { href: string; title: string }[];
  title?: string;
  className?: string;
}) {
  if (links.length === 0) return null;
  const sets = links.map((l) => marketsFor(l.href));
  const shown = sets.some((m) => !m) ? undefined : ([...new Set(sets.flat())] as MarketCode[]);
  return (
    <nav aria-label={title} className={className} {...only(shown)}>
      <h2 className="text-sm font-medium text-foreground-secondary">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href} {...only(marketsFor(l.href))}>
            <Link href={l.href} className="text-link focus-ring">{l.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
