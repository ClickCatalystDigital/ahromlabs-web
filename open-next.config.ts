import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered at build time and nothing revalidates, which is
// exactly the case the static-assets cache exists for. Without it there is no
// cache store at all, so each request — Googlebot's included — booted the full
// Next server in the Worker and re-rendered the "static" page from scratch
// (docs/progress.md, 2026-09-05 incident). With it, `deploy`/`preview` copy
// the prerendered pages into the ASSETS binding and the Worker serves them
// from there. Read-only by design: no R2/KV bucket, no new binding, no bill.
//
// enableCacheInterception answers a cache hit before the Next server is even
// loaded — the actual CPU/TTFB win. Safe here: the app uses no PPR.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
