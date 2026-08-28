import Link from "next/link";

export function ClosingCta() {
  return (
    <section className="section border-t border-line">
      <div className="rail">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Talk to us about your systems.
        </h2>
        <p className="prose-measure mt-4 text-base leading-relaxed text-foreground-secondary">
          Tell us what&apos;s held together with workarounds right now. We reply to every
          message ourselves.
        </p>
        <Link href="/#contact" className="subscribe-submit focus-ring mt-8 inline-block">
          Start a conversation
        </Link>
      </div>
    </section>
  );
}
