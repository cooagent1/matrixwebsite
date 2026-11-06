"use client";
import Image from "next/image";

import { useState } from "react";
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

export function BranchenTabs() {
  const [i, setI] = useState(0);
  const seg = SEGMENTS[i];
  return (
    <section id="branchen" className="b-branchen" aria-label="Branchen">
      <div className="b-wrap b-branchen-body">
        <div className="b-tabs" role="tablist" aria-label="Betriebsart wählen">
          {SEGMENTS.map((s, j) => (
            <button key={s.slug} type="button" role="tab" aria-selected={j === i} className={`b-d b-tab ${j === i ? "on" : ""}`} onClick={() => setI(j)}>
              <T k={k(s.slug, "tab")} />
            </button>
          ))}
        </div>
        <div className="b-seg" role="tabpanel">
          <div className="b-seg-l">
          {SEGMENTS.map((s, j) => (
            // Alle Bilder im DOM, damit der Wechsel ohne Nachladen passiert.
            <Image key={s.slug} src={s.img} alt={j === i ? txt(k(s.slug, "tab")) : ""} aria-hidden={j !== i} fill sizes="(max-width: 1100px) 100vw, 60vw" quality={70} className="b-branchen-img" style={{ opacity: j === i ? 1 : 0, transition: "opacity .5s" }} loading={j === 0 ? "eager" : "lazy"} />
          ))}
          <div className="b-branchen-shade" aria-hidden="true" />
            <span className="b-m b-kicker"><T k={k(seg.slug, "kicker")} /></span>
            <h2 className="b-d b-seg-h"><T k={k(seg.slug, "titel")} /></h2>
          </div>
          <div className="b-feats">
            {Array.from({ length: seg.feats }, (_, n) => (
              <div key={n} className="b-feat">
                <span className="b-m n">{String(n + 1).padStart(2, "0")}</span>
                <span className="t"><b><T k={k(seg.slug, `f${n + 1}`)} /></b><small><T k={k(seg.slug, `f${n + 1}.text`)} /></small></span>
              </div>
            ))}
            <div className="b-devs">
              {seg.devices.map((d) => (
                <span key={d} className="b-m b-dev">{d}</span>
              ))}
            </div>
            <Link href={`/demo?branche=${seg.slug}`} className="b-btn b-btn-acc">Demo buchen</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
