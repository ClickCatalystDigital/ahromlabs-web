"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A muted looping clip that sits still in black and white until its card is
 * hovered or focused, then plays in colour. Screens without hover (phones)
 * play it while the card is mostly in view. Reduced motion: poster only.
 * Decorative: the surrounding link carries the meaning. `base` is the path
 * without extension: <base>.webm (smaller), <base>.mp4 (older Safari), <base>.jpg poster.
 */
export function HoverVideo({ base }: { base: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("a");
    if (!video || !card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = () => {
      setPlaying(true);
      video.play().catch(() => setPlaying(false));
    };
    const stop = () => {
      setPlaying(false);
      video.pause();
    };

    if (matchMedia("(hover: hover)").matches) {
      card.addEventListener("mouseenter", play);
      card.addEventListener("mouseleave", stop);
      card.addEventListener("focusin", play);
      card.addEventListener("focusout", stop);
      return () => {
        card.removeEventListener("mouseenter", play);
        card.removeEventListener("mouseleave", stop);
        card.removeEventListener("focusin", play);
        card.removeEventListener("focusout", stop);
      };
    }

    const observer = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : stop()), { threshold: 0.6 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={`${base}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`mb-6 aspect-[4/5] w-full bg-line object-cover transition-[filter] duration-500 ${playing ? "" : "grayscale"}`}
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}
