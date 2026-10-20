"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AI_SEARCH_URL } from "@/lib/ai-search";

// Cloudflare's AI Search web components are custom elements; React 19 passes
// string attributes straight through, it just needs to know the tags exist.
type SnippetProps = React.HTMLAttributes<HTMLElement> & Record<string, string | undefined>;
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "search-modal-snippet": SnippetProps;
    }
  }
}

// The component library is the npm package @cloudflare/ai-search-snippet,
// pinned in package.json and bundled with the site — not a script tag to a
// versioned path on Cloudflare's host. Importing it registers the custom
// elements; it touches `customElements` at load, so it only ever runs in the
// browser, as its own chunk.
const loadSnippets = () => import("@cloudflare/ai-search-snippet");

// The modal's own empty-state copy replaced with the site's voice. Keys are the
// package's translation keys; anything not listed keeps its default. Set as the
// `translations` *property* once the element is defined.
const MODAL_COPY = {
  modalEmptyStateDescription: "Try “IBR forms”, “Tally integration” or “custom ERP cost”",
};
type WithCopy = HTMLElement & { translations?: Record<string, string> };

// Once per page load: the idle load and a Search click share one promise, so
// the copy is applied (and the element re-rendered) exactly once.
let ready: Promise<void> | null = null;
const loadAndApplyCopy = () => (ready ??= applyCopy());

async function applyCopy() {
  await loadSnippets();
  await customElements.whenDefined("search-modal-snippet");
  const modal = document.querySelector<WithCopy>("search-modal-snippet");
  if (modal) modal.translations = MODAL_COPY;
}

// Site search (Cmd/Ctrl+K, and the "Search" item in the nav). The chat is
// Ahrom AI (AhromChat.tsx). Loaded at browser idle, so it never delays the page; without JS the site is
// unchanged.
export function SiteSearch() {
  useEffect(() => {
    const load = () => void loadAndApplyCopy();
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load);
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(load, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <search-modal-snippet
      api-url={AI_SEARCH_URL}
      placeholder="Search notes, industries, services, pricing…"
      theme="light"
      show-url="true"
      max-render-results="8"
      hide-branding="true"
    />
  );
}

const noopSubscribe = () => () => {};

// Opens the modal from a visible control, for people who don't know the
// shortcut. Renders nothing on the server and without JS (false on the server
// snapshot, true on the client), so it never shows as a dead button. A click
// before the idle load finishes loads the library first, then opens.
export function SearchButton({ className }: { className?: string }) {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!hydrated) return null;

  const open = async () => {
    await loadAndApplyCopy();
    (document.querySelector("search-modal-snippet") as (HTMLElement & { open?: () => void }) | null)?.open?.();
  };

  return (
    <button type="button" className={className} onClick={open}>
      Search
    </button>
  );
}
