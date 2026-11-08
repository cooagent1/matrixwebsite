"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Motion-System (Board 1 „Bewegung“, 08.11.): Scroll-Reveal, Linien, Zähler. Ein Observer für die ganze Seite.
// Ohne JS bleibt alles sichtbar: der Ausgangszustand greift erst, wenn html[data-motion] gesetzt ist.

// Einzelne Elemente, die beim Eintritt einblenden (Hero ausgenommen).
const SINGLE = [
  ".b-scenes .b-sticky > *",
  ".b-railhead > *",
  ".sub-sec .b-kicker",
  ".sub-h2",
  ".sub-h3",
  ".bs .b-kicker",
  ".bs-h2",
  ".bs-lead",
  ".bs-statement",
  ".nxt-rad-txt > *",
  ".bs-zitat-body",
  ".b-qrail",
  ".b-demo-in > *",
  ".b-ftr-top",
];

// Container, deren Kinder gestaffelt einblenden (80 ms je Stufe, höchstens 6 Stufen).
const GROUPS = [
  ".b-nums",
  ".b-scene-col",
  ".b-fam",
  ".sub-grid",
  ".sub-feats",
  ".sub-tiles",
  ".sub-quotes",
  ".sub-cols",
  ".sub-half-cards",
  ".bs-staffel-grid",
  ".bs-bento-grid",
  ".bs-nums",
  ".ue-line",
  ".b-ftr-cols",
];

// Leuchtende Linien, die sich zeichnen.
const LINES = [".bs-baum-line", ".bs-zeit-line", ".bs-story-rail"];

// Kennzahlen, die hochzählen.
const COUNTERS = [".b-num b", ".sub-tile b", ".bs-nums b"];

const EXCLUDE = ".b-hero, .sub-hero";
const STEP = 80;
const MAX_STEPS = 6;
const COUNT_MS = 1200;

const PURE = /^\s*(\d{1,3}(?:\.\d{3})+|\d+)\s*([+%])?\s*$/;

function countUp(el: HTMLElement) {
  if (!PURE.test(el.textContent ?? "")) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let node: Text | null = null;
  while (walker.nextNode()) {
    const t = walker.currentNode as Text;
    if (/\d/.test(t.data)) { node = t; break; }
  }
  if (!node) return;
  const m = node.data.match(/^(\D*)(\d{1,3}(?:\.\d{3})+|\d+)([^]*)$/);
  if (!m) return;
  const [, pre, num, post] = m;
  const end = parseInt(num.replace(/\./g, ""), 10);
  if (!end) return;
  const dots = num.includes(".");
  // Tausenderpunkte wie im Original; vorne mit Ziffern-Leerzeichen aufgefüllt, damit Suffixe wie „+“ nicht wandern (kein Layout-Shift).
  const fmt = (v: number) => {
    const s = dots ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".") : String(v);
    return num.slice(0, Math.max(0, num.length - s.length)).replace(/\d/g, "\u2007").replace(/\./g, "\u2008") + s;
  };
  const target = node;
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / COUNT_MS);
    const e = 1 - Math.pow(1 - p, 3);
    target.data = pre + (p < 1 ? fmt(Math.round(end * e)) : num) + post;
    if (p < 1) requestAnimationFrame(tick);
    else el.style.whiteSpace = "";
  };
  el.style.whiteSpace = "nowrap";
  target.data = pre + fmt(0) + post;
  requestAnimationFrame(tick);
}

function inView(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const skip = (el: Element) => !!el.closest(EXCLUDE);

    const io = new IntersectionObserver(
      (entries) => {
        const order = new Map<Element, number>();
        for (const en of entries) {
          const el = en.target as HTMLElement;
          if (!en.isIntersecting) {
            // Beim schnellen Überspringen (Anker, Ende-Taste) oberhalb gelandet: sofort sichtbar, ohne Animation.
            if (en.boundingClientRect.bottom < 0) {
              io.unobserve(el);
              if (el.hasAttribute("data-count")) el.removeAttribute("data-count");
              else el.classList.add("is-in", "is-done");
            }
            continue;
          }
          io.unobserve(el);
          if (el.hasAttribute("data-count")) { el.removeAttribute("data-count"); countUp(el); continue; }
          const group = el.parentElement?.hasAttribute("data-reveal-group") ? el.parentElement : null;
          let i = 0;
          if (group) { i = order.get(group) ?? 0; order.set(group, i + 1); }
          el.style.setProperty("--i", String(Math.min(i, MAX_STEPS - 1)));
          el.classList.add("is-in");
          const done = (el.hasAttribute("data-reveal-line") ? 800 : 600) + Math.min(i, MAX_STEPS - 1) * STEP + 100;
          window.setTimeout(() => el.classList.add("is-done"), done);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );

    // Elemente, die schon beim Start im Bild sind, bleiben unberührt (kein Aufblitzen nach der Hydration).
    const arm = (el: HTMLElement, attr: string) => {
      if (el.hasAttribute(attr) || el.classList.contains("is-in") || skip(el)) return;
      if (inView(el)) { el.classList.add("is-in", "is-done"); return; }
      el.setAttribute(attr, "");
      io.observe(el);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>(GROUPS.join(",")).forEach((g) => {
        if (skip(g) || g.closest("[data-reveal]")) return;
        g.setAttribute("data-reveal-group", "");
        Array.from(g.children).forEach((c) => arm(c as HTMLElement, "data-reveal"));
      });
      document.querySelectorAll<HTMLElement>(SINGLE.join(",")).forEach((el) => {
        if (el.closest("[data-reveal]")) return;
        arm(el, "data-reveal");
      });
      document.querySelectorAll<HTMLElement>(LINES.join(",")).forEach((el) => arm(el, "data-reveal-line"));
      document.querySelectorAll<HTMLElement>(COUNTERS.join(",")).forEach((el) => {
        if (el.dataset.counted) return;
        el.dataset.counted = "1";
        if (!PURE.test(el.textContent ?? "")) return;
        el.setAttribute("data-count", "");
      });
      // Auch Elemente, die vor einem Seitenwechsel scharf geschaltet wurden, wieder beobachten.
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in),[data-reveal-line]:not(.is-in),[data-count]").forEach((el) => io.observe(el));
    };

    root.setAttribute("data-motion", "");
    scan();
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
