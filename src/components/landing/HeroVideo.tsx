"use client";
import { useEffect, useRef } from "react";

// Hero-Film nur auf größeren Bildschirmen und ohne "Bewegung reduzieren" laden.
// Mobil bleibt es beim Standbild (poster): spart rund 3 MB und hält den Text sofort lesbar.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const wide = window.matchMedia("(min-width: 721px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || calm) return;
    v.src = "/lp/hero-720.mp4";
    v.play().catch(() => {});
  }, []);
  return (
    <video ref={ref} muted loop playsInline preload="none" poster="/lp/hero-poster.jpg" aria-hidden="true" className="b-hero-video" />
  );
}
