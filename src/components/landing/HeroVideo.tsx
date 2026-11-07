"use client";
import { useEffect, useRef } from "react";

// Hero-Film v2 (07.11.): 35 s, nahtloser Loop, ohne Ton. Quelle: ~/Desktop/matrixpos-hero-*.
// Nur auf größeren Bildschirmen und ohne "Bewegung reduzieren" laden; mobil bleibt es beim Standbild (poster).
// Ab 1280 px Breite 1080p (WebM/VP9, sonst MP4), darunter 720p.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const wide = window.matchMedia("(min-width: 721px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || calm) return;
    const big = window.matchMedia("(min-width: 1280px)").matches;
    const webm = v.canPlayType('video/webm; codecs="vp9"') === "probably";
    v.src = big ? (webm ? "/lp/hero-v2-1080.webm" : "/lp/hero-v2-1080.mp4") : "/lp/hero-v2-720.mp4";
    v.play().catch(() => {});
  }, []);
  return (
    <video ref={ref} muted loop playsInline preload="none" poster="/lp/hero-v2-poster.jpg" aria-hidden="true" className="b-hero-video" />
  );
}
