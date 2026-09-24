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
      "chat-bubble-snippet": SnippetProps;
    }
  }
}

// The component library is the npm package @cloudflare/ai-search-snippet,
// pinned in package.json and bundled with the site — not a script tag to a
// versioned path on Cloudflare's host. Importing it registers the custom
// elements; it touches `customElements` at load, so it only ever runs in the
// browser, as its own chunk.
const loadSnippets = () => import("@cloudflare/ai-search-snippet");

// The components' own copy ("Chat", "Start a Conversation", …) replaced with
// the site's voice. Keys are the package's translation keys; anything not
// listed keeps its default. Set as the `translations` *property* once the
// elements are defined: the bubble only forwards a property override to its
// inner chat view — the JSON attribute alone leaves the empty state generic.
const MODAL_COPY = {
  modalEmptyStateDescription: "Try “IBR forms”, “Tally integration” or “custom ERP cost”",
};
const CHAT_COPY = {
  chatTitle: "Ask Ahrom Labs",
  chatEmptyTitle: "Ask about our work",
  chatEmptyDescription:
    "Answers come from our published notes, industry pages and pricing, with links. Try “Can you generate IBR forms?” or “Who owns the code?”",
  chatPlaceholder: "Ask a question…",
  openChatAriaLabel: "Ask Ahrom Labs",
  assistantAvatar: "A",
  userAvatar: "You",
};

type WithCopy = HTMLElement & { translations?: Record<string, string> };

// Once per page load: the idle load and a Search click share one promise, so
// the copy is applied (and the elements re-rendered) exactly once.
let ready: Promise<void> | null = null;
const loadAndApplyCopy = () => (ready ??= applyCopy());

async function applyCopy() {
  await loadSnippets();
  await Promise.all([
    customElements.whenDefined("search-modal-snippet"),
    customElements.whenDefined("chat-bubble-snippet"),
  ]);
  const modal = document.querySelector<WithCopy>("search-modal-snippet");
  const bubble = document.querySelector<WithCopy>("chat-bubble-snippet");
  if (modal) modal.translations = MODAL_COPY;
  if (bubble) {
    bubble.translations = CHAT_COPY;
    fitChatWindow(bubble);
  }
}

// The chat window lives in the component's shadow DOM with a fixed 500px
// height and a bouncy overshoot animation — on a short phone, or with the
// keyboard open, its header and close button would sit off-screen. Page CSS
// can't reach inside, and the component rebuilds its shadow root on every
// render, so this is an *adopted* stylesheet: attached to the shadow root
// itself, it survives those rebuilds.
const CHAT_WINDOW_CSS = `
  .chat-window {
    height: min(520px, calc(100dvh - 48px));
    transition: opacity 180ms ease, transform 180ms ease;
    transform: translateY(8px);
  }
  .chat-window.expanded { transform: none; }
  @media (max-width: 640px) {
    .chat-window {
      width: calc(100vw - 24px);
      max-width: none;
      height: min(560px, calc(100dvh - 24px));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .chat-window, .bubble-button { transition: none; }
  }
`;

function fitChatWindow(bubble: HTMLElement) {
  const root = bubble.shadowRoot;
  if (!root || !("adoptedStyleSheets" in root)) return;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(CHAT_WINDOW_CSS);
  root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
}

// Site search (Cmd/Ctrl+K, and the "Search" item in the nav) and an "ask"
// chat bubble on every page and every screen size — sized down on phones in
// globals.css, with the chat window fitted to the viewport by fitChatWindow().
// Loaded at browser idle, so it never delays the page; without JS the site is
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
    <>
      <search-modal-snippet
        api-url={AI_SEARCH_URL}
        placeholder="Search notes, industries, services, pricing…"
        theme="light"
        show-url="true"
        max-render-results="8"
        hide-branding="true"
      />
      <chat-bubble-snippet
        api-url={AI_SEARCH_URL}
        placeholder="Ask a question…"
        theme="light"
        hide-branding="true"
      />
    </>
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
