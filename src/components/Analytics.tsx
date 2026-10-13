"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { GA_ID, track } from "@/lib/analytics";

// Consent lives in a cookie on .ahromlabs.com so the demo (boiler-erp.ahromlabs.com)
// reads the same answer and doesn't ask again. gtag.js isn't fetched at all until
// the visitor accepts, so nothing reaches Google before then.
const COOKIE = "ga_consent";

function readConsent(): string | null {
  return document.cookie.match(/(?:^|; )ga_consent=([^;]*)/)?.[1] ?? null;
}

function saveConsent(value: "granted" | "denied") {
  const domain = location.hostname.endsWith("ahromlabs.com") ? "; domain=ahromlabs.com" : "";
  document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax${domain}`;
}

const noSubscribe = () => () => {};

function loadGa() {
  if (document.getElementById("ga-js")) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  // gtag.js expects the arguments object itself, not an array.
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.id = "ga-js";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function Analytics() {
  // "pending" on the server, so the bar never flashes into prerendered HTML.
  const consent = useSyncExternalStore(noSubscribe, readConsent, () => "pending");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (readConsent() === "granted") loadGa();

    // Funnel step 2: any link into a live demo, wherever it sits on the site.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a && /\.ahromlabs\.com$/.test(a.hostname) && a.hostname !== "ahromlabs.com") {
        track("demo_click", { demo: a.hostname, from: location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (consent !== null || answered) return null;

  const choose = (value: "granted" | "denied") => {
    saveConsent(value);
    if (value === "granted") loadGa();
    setAnswered(true);
  };

  return (
    <div role="region" aria-label="Analytics consent" className="consent-bar">
      <p>We use Google Analytics to see which pages help. No ads, nothing sold.</p>
      <div className="consent-actions">
        <button type="button" className="consent-secondary focus-ring" onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className="consent-primary focus-ring" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
