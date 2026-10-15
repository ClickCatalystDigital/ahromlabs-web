"use client";

import { useEffect, useRef } from "react";

// A <details> that starts closed (phones) and opens itself on wide screens,
// where it sits in a sticky side column and has room to stay open.
export function OpenOnWide({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const wide = matchMedia("(min-width: 1024px)");
    const sync = () => ref.current && (ref.current.open = wide.matches);
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);
  return (
    <details ref={ref} className={className}>
      {children}
    </details>
  );
}
