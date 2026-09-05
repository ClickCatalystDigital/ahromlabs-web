import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="rail flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <a href="https://ahromlabs.com" className="footer-domain focus-ring">
            ahromlabs.com
          </a>
          {/* The contact form is a client component, so this is the only way to
              reach us with JS off — and the only one on pages that aren't /. */}
          <a href="mailto:hello@ahromlabs.com" className="footer-copyright focus-ring">
            hello@ahromlabs.com
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <Link href="/approach" className="nav-link focus-ring">
            Approach
          </Link>
          <Link href="/systems" className="nav-link focus-ring">
            Systems
          </Link>
          <Link href="/about" className="nav-link focus-ring">
            About
          </Link>
          <Link href="/notes" className="nav-link focus-ring">
            Notes
          </Link>
          <Link href="/patterns" className="nav-link focus-ring">
            Patterns
          </Link>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Ahrom Labs · Ahmedabad, India</p>
      </div>
    </footer>
  );
}
