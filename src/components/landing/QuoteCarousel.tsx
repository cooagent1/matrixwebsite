"use client";
import { useRef } from "react";
import { QUOTES } from "./startseite-data";
import { T } from "../T";

function Chevron({ dir }: { dir: "l" | "r" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "l" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

// Kundenstimmen als horizontales Karussell (Scroll-Snap, Pfeile blättern eine Karte weiter).
export function QuoteCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const go = (d: number) => {
    const el = track.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>(".b-qcard")];
    if (!cards.length) return;
    const pad = cards[0].offsetLeft;
    const pos = (c: HTMLElement) => c.offsetLeft - pad;
    const cur = cards.reduce((best, c, i) => (Math.abs(pos(c) - el.scrollLeft) < Math.abs(pos(cards[best]) - el.scrollLeft) ? i : best), 0);
    const next = Math.max(0, Math.min(cards.length - 1, cur + d));
    const left = pos(cards[next]);
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const before = el.scrollLeft;
    el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    // Manche Browser ignorieren smooth bei Scroll-Snap; dann direkt springen.
    if (smooth) setTimeout(() => { if (Math.abs(el.scrollLeft - left) > 4 && el.scrollLeft === before) el.scrollTo({ left }); }, 450);
  };
  return (
    <section className="b-qsec" aria-label="Kundenstimmen">
      <div className="b-wrap b-railhead">
        <h2 className="b-d"><T k="start.stimmen.h2" /></h2>
        <div className="b-qnav">
          <button type="button" onClick={() => go(-1)} aria-label="Vorherige Kundenstimme"><Chevron dir="l" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Nächste Kundenstimme"><Chevron dir="r" /></button>
        </div>
      </div>
      <div className="b-rail b-qrail" ref={track} tabIndex={0} aria-label="Kundenstimmen, horizontal scrollbar">
        {QUOTES.map((q) => (
          <figure key={q.name} className="b-qcard">
            <svg className="b-qmark-s" width="36" height="28" viewBox="0 0 36 28" aria-hidden="true"><path fill="currentColor" d="M0 28V17C0 7.6 4.6 1.9 13.2 0l1.6 4.2C10 5.8 7.7 9 7.4 13H14v15H0zm21 0V17c0-9.4 4.6-15.1 13.2-17l1.6 4.2C31 5.8 28.7 9 28.4 13H35v15H21z"/></svg>
            <blockquote>{q.text}</blockquote>
            <figcaption>
              <div><b>{q.name}</b><small>{q.role}</small></div>
              {q.tag && <span className="b-m b-qtag">{q.tag}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
