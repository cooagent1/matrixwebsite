"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, QUICK } from "@/lib/nav";

// Burger-Menü in der Pille (07.11.): Overlay mit Abdunkelung, mobil Vollbild mit eigenem Scroll,
// Escape und Außenklick schließen, Fokus geht in die erste Zeile und zurück auf den Burger,
// mobil sind Gruppen mit Unterpunkten einklappbar, Produkte immer offen.
export function Menu() {
  const [open, setOpen] = useState(false);
  const [grp, setGrp] = useState<string | null>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const path = usePathname();
  const [seen, setSeen] = useState(path);
  if (path !== seen) { setSeen(path); setOpen(false); } // Seitenwechsel schließt das Menü

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => { root.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = () => { setOpen(false); btn.current?.focus(); };

  return (
    <>
      <button ref={btn} type="button" className="b-burger" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls="hauptmenue" onClick={() => setOpen((o) => !o)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && <div className="b-menu-bg" onClick={close} aria-hidden="true" />}
      <nav ref={panel} id="hauptmenue" className="b-menu" aria-label="Hauptnavigation" hidden={!open}>
        <div className="b-menu-grid">
          {NAV.map((g) => {
            const main = g.label === "Produkte";
            if (!g.children && g.href) return (
              <div key={g.label} className="b-menu-col b-menu-solo on"><h4 className="b-m">{g.label}</h4><div className="b-menu-list"><Link href={g.href}>Alle {g.label}</Link></div></div>
            );
            const on = main || grp === g.label;
            return (
              <div key={g.label} className={`b-menu-col${main ? " b-menu-main" : ""}${on ? " on" : ""}`}>
                {main ? (
                  <h4 className="b-m">{g.label}</h4>
                ) : (
                  <h4 className="b-m">
                    <button type="button" className="b-menu-tog" aria-expanded={on} onClick={() => setGrp(on ? null : g.label)}>
                      {g.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                  </h4>
                )}
                <div className="b-menu-list">
                  {g.children?.map((c) => (
                    <Link key={c.href} href={c.href}>
                      {c.label}
                      {c.hint && <small>{c.hint}</small>}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="b-menu-foot">
          {QUICK.map((q, k) =>
            q.external ? (
              <a key={q.href} href={q.href} target="_blank" rel="noopener noreferrer">{q.label} ↗</a>
            ) : (
              <Link key={q.href} href={q.href} className={k === 0 ? "b-menu-cta" : ""}>{q.label}</Link>
            ),
          )}
        </div>
      </nav>
    </>
  );
}

// Pille wird beim Scrollen dunkel, damit sie auf weißen Abschnitten sichtbar bleibt.
export function PillScroll() {
  useEffect(() => {
    const on = () => document.documentElement.classList.toggle("mp-scrolled", window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return null;
}
