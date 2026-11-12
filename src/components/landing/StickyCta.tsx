"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Handy: fester „Demo buchen“-Button am unteren Rand. Erscheint, sobald der Hero-Button aus dem Bild ist,
// und verschwindet, sobald „Fragen und Demo“ (#fragen) erreicht ist (Konzept 12.11.).
export function StickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const end = document.getElementById("fragen");
    if (!hero || !end || !("IntersectionObserver" in window)) return;
    const a = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const b = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting || e.boundingClientRect.top < 0));
    a.observe(hero);
    b.observe(end);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);

  const show = heroGone && !atEnd;
  return (
    <div className={`b-sticky-cta ${show ? "on" : ""}`} aria-hidden={!show}>
      <Link href="/demo" className="b-btn b-btn-acc" tabIndex={show ? 0 : -1}>Demo buchen</Link>
    </div>
  );
}
