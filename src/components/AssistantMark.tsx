import type { System } from "@/lib/ai-assistant";

// Each assistant's own mark: Atelier AI's inked butterfly (savistar-ops components/assistant/butterfly.jsx), Ohm's
// microchip (ls-inventory ChipMark.tsx), Datum's hard hat (structonova-ops components/assistant/hard-hat.jsx) and Ember's flame (drawn here first, 25 Oct 2026; not yet in SB Ops).
// Animated in globals.css (.ai-butterfly, .ai-chip, .ai-hardhat, .ai-ember); all rest when motion is reduced.
// ponytail: copies of the apps' SVGs; if a mark changes in its app, copy it again here.

const WINGS = (
  <>
    <path d="M12.5 10.9C13.4 7.6 16.2 4.4 20.4 4.1c1-.1 1.4.7 1.1 1.6-.8 2.5-2.7 5-5.4 6.3-1.2.6-2.4.9-3.6.9" />
    <path d="M12.5 13.2c2.1.1 4.1.9 4.9 2.5.7 1.4.3 2.9-.9 3.2-.7.2-1.2 0-1.5.6-.4.9-1 1-1.5.3-.7-1-1-3.4-1-5" />
    <path d="M13.1 11.6c1.9-1.7 4-3.9 6.3-6.2" fill="none" strokeWidth=".7" strokeOpacity=".55" />
    <circle cx="19.3" cy="6.4" r=".55" fill="currentColor" stroke="none" fillOpacity=".6" />
  </>
);

export function AssistantMark({ system, className = "size-8" }: { system: System; className?: string }) {
  if (system === "savistar-saag")
    return (
      <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={`ai-butterfly inline-block shrink-0 overflow-visible ${className}`}>
        <g className="wing">{WINGS}</g>
        <g className="wing"><g transform="matrix(-1 0 0 1 24 0)">{WINGS}</g></g>
        <path d="M12 9c.5 0 .75 1 .75 4.2s-.3 5.6-.75 5.6-.75-2.4-.75-5.6.25-4.2.75-4.2z" fillOpacity=".75" />
        <circle cx="12" cy="8.1" r=".8" fillOpacity=".75" />
        <path d="M11.7 7.5C11.3 5.7 10.3 4.4 9.1 3.9M12.3 7.5c.4-1.8 1.4-3.1 2.6-3.6" fill="none" strokeWidth="1" />
      </svg>
    );
  if (system === "ls-technologies")
    return (
      <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`ai-chip inline-block shrink-0 ${className}`}>
        <rect x="6" y="6" width="12" height="12" rx="2.5" />
        <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
        <path d="M12 9.3l.95 1.75 1.75.95-1.75.95-.95 1.75-.95-1.75-1.75-.95 1.75-.95z" fill="currentColor" stroke="none" />
      </svg>
    );
  // Datum: a hard hat with a surveyor's datum triangle on the badge; tips forward now and then, nods on hover.
  if (system === "construction-company")
    return (
      <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={`ai-hardhat inline-block shrink-0 overflow-visible ${className}`}>
        <g className="hat">
          <path d="M4.8 15.3c0-5.3 3.2-9.4 7.2-9.4s7.2 4.1 7.2 9.4" />
          <path d="M2.1 15.4h18.6c.8 0 1.4.4 1.4.85s-.6.85-1.4.85H3.5c-.9 0-1.7-.35-1.85-.85-.12-.45.15-.85.45-.85z" fillOpacity=".25" />
          <path d="M10.8 6.1c-.35 3-.35 6.2 0 9.2M13.2 6.1c.35 3 .35 6.2 0 9.2" fill="none" strokeWidth="1" />
          <path d="M7.6 8.4c-.8 2-1.2 4.4-1.2 6.9M16.4 8.4c.8 2 1.2 4.4 1.2 6.9" fill="none" strokeWidth=".7" strokeOpacity=".55" />
          <path d="M7.95 12.6l.95-1.65.95 1.65z" fillOpacity=".75" strokeWidth=".6" />
          <path d="M7.55 13.4h2.7" fill="none" strokeWidth=".6" />
          <circle cx="4.4" cy="16.25" r=".38" stroke="none" fillOpacity=".6" />
          <circle cx="19.6" cy="16.25" r=".38" stroke="none" fillOpacity=".6" />
          <path className="glint" d="M15 8c.9.8 1.5 1.8 1.8 3" fill="none" strokeWidth=".9" strokeOpacity=".7" />
        </g>
      </svg>
    );
  // Ember: a flame over a grate line, its core breathing, and now and then a spark rising off the tip.
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={`ai-ember inline-block shrink-0 overflow-visible ${className}`}>
      <path className="flame" d="M12 3c.7 2.8 3.4 4.9 4.5 7.9.6 1.7.6 3.5-.1 5A4.9 4.9 0 0 1 12 19.4a4.9 4.9 0 0 1-4.5-3.3c-.8-2.3 0-4.6 1.5-6.3.2 1.4.9 2.5 1.9 3C10.5 10 10.9 6.3 12 3z" />
      <path className="core" d="M12 12.6c1 1.1 1.9 2.2 1.9 3.4a1.9 1.9 0 0 1-3.8 0c0-1.2.9-2.3 1.9-3.4z" fillOpacity=".75" />
      <path d="M7.5 21.2h9" fill="none" />
      <circle className="spark" cx="15.6" cy="7.2" r=".7" fillOpacity=".9" stroke="none" />
    </svg>
  );
}
