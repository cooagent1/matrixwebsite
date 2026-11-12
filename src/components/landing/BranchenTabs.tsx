"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";
import { T, isPlaceholder, txt } from "../T";

type Seg = { slug: string; img: string };

// Reihenfolge nach Suchvolumen und Zielkunde (Konzept 12.11.). Texte in texte.json (start.branchen.<slug>.*).
// Links auf /branchen#<slug> (schlanke Struktur, Robert 12.11.); Food Court steht auf /branchen unter Freizeitpark.
const SEGMENTS: Seg[] = [
  { slug: "restaurant", img: "/lp/branchen/restaurant.jpg" },
  { slug: "hotel", img: "/lp/branchen/hotel.jpg" },
  { slug: "bar-cafe", img: "/lp/branchen/cafe-bar.jpg" },
  { slug: "aussengastronomie", img: "/lp/branchen/biergarten.jpg" },
  { slug: "systemgastronomie", img: "/lp/branchen/systemgastro.jpg" },
  { slug: "freizeitpark", img: "/lp/branchen/freizeitpark.jpg" },
  { slug: "foodcourt", img: "/lp/fotos/nxt-bistro-getraenke-bon.jpg" },
];
const ANCHOR: Record<string, string> = { foodcourt: "freizeitpark" };

const k = (slug: string, f: string) => `start.branchen.${slug}.${f}`;
const AUTO_MS = 5000;

/**
 * Branchen als aufklappende Fotospalten (Signature-Grafik 4, 07.11.). Die aktive Spalte zeigt Zeile, Beleg,
 * drei Merkmale und Link zur Branche (Kassenzettel raus, Robert 12.11.). Alle sieben Inhalte stehen im HTML (nicht erst nach Klick),
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
                    <ul className="b-col-feats">
                      {[1, 2, 3].map((n) => (<li key={n}><T k={k(s.slug, `f${n}`)} /></li>))}
                    </ul>
                    {!isPlaceholder(k(s.slug, "beleg")) && <p className="b-col-beleg"><T k={k(s.slug, "beleg")} /></p>}
                    <Link href={`/branchen#${ANCHOR[s.slug] ?? s.slug}`} className="link b-col-link" tabIndex={on ? 0 : -1}><T k={k(s.slug, "link")} /> →</Link>
                    <Link href={`/demo?branche=${s.slug}`} className="b-btn b-btn-white" tabIndex={on ? 0 : -1}>Demo für {tab} buchen</Link>
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
