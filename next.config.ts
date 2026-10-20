import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { AI_SEARCH_URL } from "./src/lib/ai-search";

const nextConfig: NextConfig = {
  // ponytail: unoptimized rather than wiring a Cloudflare Images binding
  // (a paid product) for a handful of small, already-sized static assets.
  // Revisit if user-uploaded or highly variable imagery is added later.
  images: {
    unoptimized: true,
  },
  // Dev only: the AI Search endpoint answers browsers on ahromlabs.com alone
  // (CORS), so on localhost Ahrom AI goes through this same-origin proxy.
  // The production build has no rewrite and calls the endpoint directly.
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [{ source: "/__ahrom-ai/:path*", destination: `${AI_SEARCH_URL}/:path*` }]
      : [];
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
