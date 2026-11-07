"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";
import { T, txt } from "../T";

type Seg = { slug: string; img: string; feats: number; devices: string[] };

// Texte in texte.json (start.branchen.<slug>.*). Fakten: docs/copy/branchen/*.md und Launchdeck 10/2026.
const SEGMENTS: Seg[] = [
  { slug: "restaurant", img: "/lp/branchen/restaurant.jpg", feats: 3, devices: ["Touch-PC", "Android-Handgerät", "Bondrucker"] },
  { slug: "hotel", img: "/lp/branchen/hotel.jpg", feats: 3, devices: ["POS-Terminal", "Handgerät", "Kartenterminal"] },
  { slug: "aussengastronomie", img: "/lp/branchen/biergarten.jpg", feats: 3, devices: ["Android-Handgerät", "Mobiler Drucker", "Tap to Pay"] },
  { slug: "bar-cafe", img: "/lp/branchen/cafe-bar.jpg", feats: 3, devices: ["Touch-PC", "Kundendisplay", "Kartenterminal"] },
  { slug: "freizeitpark", img: "/lp/branchen/freizeitpark.jpg", feats: 3, devices: ["POS-Terminal", "Tablet", "Handgerät"] },
  { slug: "systemgastronomie", img: "/lp/branchen/systemgastro.jpg", feats: 3, devices: ["Touch-PC", "Tablet", "Office"] },
];

const k = (slug: string, f: string) => `start.branchen.${slug}.${f}`;
const AUTO_MS = 5000;

/**
 * Branchen als aufklappende Spalten (Signature-Grafik 4, 07.11.): sechs Fotospalten, die aktive
 * klappt auf und zeigt Kicker, Überschrift, die drei Merkmale als Bon und den Demo-Button.
 * Läuft von allein weiter, bis jemand klickt oder den Mauszeiger darauf hält.
 */
export function BranchenTabs() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % SEGMENTS.length), AUTO_MS);
    return () => window.clearInterval(id);
  }, [auto]);

  const stop = () => setAuto(false);
  const pick = (j: number) => {
    stop();
    setI(j);
  };

  return (
    <section id="branchen" className="b-branchen" aria-label="Branchen">
      <div className="b-wrap b-branchen-body">
        <div className="b-cols" onMouseEnter={stop} onFocus={stop}>
          {SEGMENTS.map((s, j) => {
            const on = j === i;
            const tab = txt(k(s.slug, "tab"));
            return (
              <div key={s.slug} className={`b-col ${on ? "on" : ""}`}>
                <button type="button" className="b-col-hit" aria-expanded={on} aria-controls={`br-${s.slug}`} onClick={() => pick(j)}>
                  <Image src={s.img} alt={tab} fill sizes="(max-width: 720px) 100vw, 70vw" quality={70} className="b-col-img" loading={j === 0 ? "eager" : "lazy"} />
                  <span className="b-col-shade" aria-hidden="true" />
                  <span className="b-d b-col-lab">{tab}</span>
                </button>
                <div id={`br-${s.slug}`} className="b-col-body" aria-hidden={!on}>
                  <div className="b-col-txt">
                    <span className="b-m b-col-k"><T k={k(s.slug, "kicker")} /></span>
                    <h3 className="b-d b-col-h"><T k={k(s.slug, "titel")} /></h3>
                    <Link href={`/demo?branche=${s.slug}`} className="b-btn b-btn-white" tabIndex={on ? 0 : -1}>Demo buchen</Link>
                  </div>
                  <div className="b-bon" aria-label={`Merkmale ${tab}`}>
                    <div className="r"><span>{tab.toUpperCase()}</span><span className="t">MATRIX</span></div>
                    <hr className="s" />
                    {Array.from({ length: s.feats }, (_, n) => (
                      <div key={n} className="r"><span>{String(n + 1).padStart(2, "0")}&nbsp; <T k={k(s.slug, `f${n + 1}`)} /></span></div>
                    ))}
                    <hr className="s" />
                    <div className="r"><span className="m">{s.devices.join(" · ")}</span></div>
                    <hr className="s" />
                    <div className="r"><span className="t">→ DEMO</span><span className="m">kostenlos</span></div>
                    <svg className="tear" viewBox="0 0 240 8" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id={`bz-${s.slug}`} width="12" height="8" patternUnits="userSpaceOnUse"><polygon points="0,0 6,8 12,0" fill="#FBFAF5" /></pattern></defs><rect width="240" height="8" fill={`url(#bz-${s.slug})`} /></svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
