import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { jsonLd, orgGraph, siteUrl } from "@/lib/schema";
import "./globals.css";

// Body/heading typeface for the whole site. Only the weights actually used
// (font-normal/medium/semibold) are loaded.
const pilcrowRounded = localFont({
  src: [
    { path: "../fonts/pilcrow-rounded/PilcrowRounded-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/pilcrow-rounded/PilcrowRounded-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/pilcrow-rounded/PilcrowRounded-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-pilcrow-rounded",
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
      className={`${pilcrowRounded.variable} ${geistMono.variable} h-full antialiased`}
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
