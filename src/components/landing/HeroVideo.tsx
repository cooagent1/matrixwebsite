"use client";
import { useEffect, useRef } from "react";

// Hero-Film nur auf größeren Bildschirmen und ohne "Bewegung reduzieren" laden.
// Mobil bleibt es beim Standbild (poster): spart rund 3 MB und hält den Text sofort lesbar.
// Der Loop endet vor der Abspanntafel (ab Sekunde 28), damit hinter der Headline kein zweites Logo liegt.
const LOOP_END = 27.5;

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const wide = window.matchMedia("(min-width: 721px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || calm) return;
    const onTime = () => {
      if (v.currentTime >= LOOP_END) v.currentTime = 0;
    };
    v.addEventListener("timeupdate", onTime);
    v.src = "/lp/hero-720.mp4";
    v.play().catch(() => {});
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);
  return (
    <video ref={ref} muted loop playsInline preload="none" poster="/lp/hero-poster.jpg" aria-hidden="true" className="b-hero-video" />
  );
}
