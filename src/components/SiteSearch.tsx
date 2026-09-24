"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { AI_SEARCH_SNIPPET_SRC, AI_SEARCH_URL } from "@/lib/ai-search";

// Cloudflare's AI Search web components are custom elements; React 19 passes
// string attributes straight through, it just needs to know the tags exist.
type SnippetProps = React.HTMLAttributes<HTMLElement> & Record<string, string | undefined>;
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "search-modal-snippet": SnippetProps;
      "chat-bubble-snippet": SnippetProps;
    }
  }
}

// Site search (Cmd/Ctrl+K, and the "Search" item in the nav) on every page,
// plus an "ask" chat bubble on desktop only — on a phone a floating bubble
// covers the content people came to read. Loaded at browser idle, so it never
// delays the page; without JS the site is unchanged.
export function SiteSearch() {
  return (
    <>
      <Script src={AI_SEARCH_SNIPPET_SRC} type="module" strategy="lazyOnload" />
      <search-modal-snippet
        api-url={AI_SEARCH_URL}
        placeholder="Search notes, industries, services, pricing…"
        theme="light"
        show-url="true"
        max-render-results="8"
      />
      <div className="hidden lg:block">
        <chat-bubble-snippet
          api-url={AI_SEARCH_URL}
          placeholder="Ask about our systems, pricing or process…"
          theme="light"
        />
      </div>
    </>
  );
}

const noopSubscribe = () => () => {};

// Opens the modal from a visible control, for people who don't know the
// shortcut. Renders nothing on the server and without JS (false on the server
// snapshot, true on the client), so it never shows as a dead button.
export function SearchButton({ className }: { className?: string }) {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!hydrated) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => (document.querySelector("search-modal-snippet") as (HTMLElement & { open?: () => void }) | null)?.open?.()}
    >
      Search
    </button>
  );
}
