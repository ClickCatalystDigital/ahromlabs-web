import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { jsonLd, orgGraph, siteUrl } from "@/lib/schema";
import "./globals.css";

// Body, UI and technical text: navigation, buttons, labels, cards, prose.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display face: hero headlines and major section headings only. Instrument
// Serif ships a single weight (400) — that is the design, not an omission.
// Do not apply `font-semibold` to it; the browser would synthesise a bold and
// the result is exactly the mushy, over-decorative look this face avoids.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ahrom Labs",
    template: "%s | Ahrom Labs",
  },
  description:
    "Ahrom Labs builds custom operational infrastructure for businesses: modeling entities, relationships, workflows, and decisions as one coherent system instead of another disconnected app.",
  alternates: {
    canonical: "/",
    types: { "application/json": "/knowledge.json" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Ahrom Labs",
    title: "Ahrom Labs",
    description: "We build the systems your business runs on.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahrom Labs",
    description: "We build the systems your business runs on.",
  },
  // Fill these in from Google Search Console / Bing Webmaster Tools after
  // deploy. Left unset rather than filled with a placeholder value.
  // verification: { google: "", other: { "msvalidate.01": "" } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Every section below each page's hero ships at opacity:0, revealed
            by IntersectionObserver in the Reveal component. Without JS that
            observer never runs, so this keeps the content visible. */}
        <noscript>
          <style>{".reveal{opacity:1 !important;transform:none !important;}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(orgGraph) }}
        />
        {children}
      </body>
    </html>
  );
}
