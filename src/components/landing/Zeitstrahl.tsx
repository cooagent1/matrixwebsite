"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Vertikaler Zeitstrahl, der sich beim Scrollen aufbaut: Die Linie wächst mit dem Scrollweg,
// jede Station erscheint, sobald die Linie sie erreicht. Ohne JS und bei reduzierter Bewegung steht alles sofort da.
export function Zeitstrahl({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-js");
    const items = Array.from(el.children) as HTMLElement[];
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const reach = Math.max(0, Math.min(r.height, window.innerHeight * 0.72 - r.top));
      el.style.setProperty("--zs", `${reach}px`);
      for (const li of items) li.classList.toggle("is-on", li.offsetTop + 8 <= reach);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <ol className="b-zeit" ref={ref}>{children}</ol>;
}
