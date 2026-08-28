import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="rail flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <a href="https://ahromlabs.com" className="footer-domain focus-ring">
          ahromlabs.com
        </a>
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
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Ahrom Labs</p>
      </div>
    </footer>
  );
}
