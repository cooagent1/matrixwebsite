"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";
import { T, isPlaceholder, txt } from "../T";

type Seg = { slug: string; img: string; devices: string[] };

// Reihenfolge nach Suchvolumen und Zielkunde (Konzept 12.11.). Texte in texte.json (start.branchen.<slug>.*).
// Links auf /branchen#<slug> (schlanke Struktur, Robert 12.11.); Food Court steht auf /branchen unter Freizeitpark.
const SEGMENTS: Seg[] = [
  { slug: "restaurant", img: "/lp/branchen/restaurant.jpg", devices: ["Touch-PC", "Android-Handgerät", "Bondrucker"] },
  { slug: "hotel", img: "/lp/branchen/hotel.jpg", devices: ["POS-Terminal", "Handgerät", "Kartenterminal"] },
  { slug: "bar-cafe", img: "/lp/branchen/cafe-bar.jpg", devices: ["Touch-PC", "Kundendisplay", "Kartenterminal"] },
  { slug: "aussengastronomie", img: "/lp/branchen/biergarten.jpg", devices: ["Android-Handgerät", "Mobiler Drucker", "Tap to Pay"] },
  { slug: "systemgastronomie", img: "/lp/branchen/systemgastro.jpg", devices: ["Touch-PC", "Tablet", "Office"] },
  { slug: "freizeitpark", img: "/lp/branchen/freizeitpark.jpg", devices: ["POS-Terminal", "Tablet", "Handgerät"] },
  { slug: "foodcourt", img: "/lp/fotos/nxt-bistro-getraenke-bon.jpg", devices: [] },
];
const ANCHOR: Record<string, string> = { foodcourt: "freizeitpark" };

const k = (slug: string, f: string) => `start.branchen.${slug}.${f}`;
const AUTO_MS = 5000;

/**
 * Branchen als aufklappende Fotospalten (Signature-Grafik 4, 07.11.). Die aktive Spalte zeigt Zeile, Beleg,
 * Link zur Branche und die drei Merkmale als Bon. Alle sieben Inhalte stehen im HTML (nicht erst nach Klick),
 * damit Suchmaschinen jeden Reiter lesen. Läuft von allein weiter, bis jemand klickt oder darauf zeigt.
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
    <section id="branchen" className="b-branchen" aria-labelledby="branchen-h">
      <div className="b-wrap b-branchen-head">
        <h2 className="b-d sub-h2" id="branchen-h"><T k="start.branchen.h2" /></h2>
        <p className="sub-p"><T k="start.branchen.lead" /></p>
      </div>
      <div className="b-wrap b-branchen-body">
        <div className="b-cols" onMouseEnter={stop} onFocus={stop}>
          {SEGMENTS.map((s, j) => {
            const on = j === i;
            const tab = txt(k(s.slug, "tab"));
            return (
              <div key={s.slug} className={`b-col ${on ? "on" : ""}`}>
                <button type="button" className="b-col-hit" aria-expanded={on} aria-controls={`br-${s.slug}`} onClick={() => pick(j)}>
                  <Image src={s.img} alt="" fill sizes="(max-width: 720px) 100vw, 70vw" quality={70} className="b-col-img" loading={j === 0 ? "eager" : "lazy"} />
                  <span className="b-col-shade" aria-hidden="true" />
                  <span className="b-d b-col-lab">{tab}</span>
                </button>
                <div id={`br-${s.slug}`} className="b-col-body" aria-hidden={!on}>
                  <div className="b-col-txt">
                    <h3 className="b-d b-col-h"><T k={k(s.slug, "titel")} /></h3>
                    {!isPlaceholder(k(s.slug, "beleg")) && <p className="b-col-beleg"><T k={k(s.slug, "beleg")} /></p>}
                    <Link href={`/branchen#${ANCHOR[s.slug] ?? s.slug}`} className="link b-col-link" tabIndex={on ? 0 : -1}><T k={k(s.slug, "link")} /> →</Link>
                    <Link href={`/demo?branche=${s.slug}`} className="b-btn b-btn-white" tabIndex={on ? 0 : -1}>Demo für {tab} buchen</Link>
                  </div>
                  <div className="b-bon" aria-label={`Merkmale ${tab}`}>
                    <div className="r"><span>{tab.toUpperCase()}</span><span className="t">MATRIX</span></div>
                    <hr className="s" />
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="r"><span>{String(n).padStart(2, "0")}&nbsp; <T k={k(s.slug, `f${n}`)} /></span></div>
                    ))}
                    {s.devices.length > 0 && (<><hr className="s" /><div className="r"><span className="m">{s.devices.join(" · ")}</span></div></>)}
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
