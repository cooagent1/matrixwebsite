"use client";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";

type Seg = {
  name: string;
  slug: string;
  kicker: string;
  img: string;
  title: string;
  feats: { n: string; t: string; d: string }[];
  devices: string[];
};

// Fakten: docs/copy/branchen/*.md und Launchdeck 10/2026 (Offline, PMS und Kiosk nicht als "heute" behaupten).
const SEGMENTS: Seg[] = [
  { name: "Restaurant", slug: "restaurant", kicker: "À la carte & Fine Dining", img: "/lp/branchen/restaurant.jpg", title: "Tischplan, Gänge, Rechnung splitten.",
    feats: [ { n: "01", t: "Tischplan mit Gängen", d: "mehrere Räume, offene Beträge auf einen Blick" }, { n: "02", t: "Splitten & Bewirtungsbeleg", d: "je Position oder je Gast" }, { n: "03", t: "Bons an Küche und Bar", d: "automatisch je Warengruppe" } ],
    devices: ["Touch-PC", "Android-Handgerät", "Bondrucker"] },
  { name: "Hotel", slug: "hotel", kicker: "Bar, Restaurant, Frühstück", img: "/lp/branchen/hotel.jpg", title: "Zimmerbuchung direkt aus der Kasse.",
    feats: [ { n: "01", t: "PMS-Anbindung", d: "protel und ASA Hotel, Umsätze aufs Zimmer. In Arbeit." }, { n: "02", t: "Eine Payment-Abrechnung", d: "Kasse und Hotel mit Matrix PAY" }, { n: "03", t: "Mehrere Outlets", d: "Bar, Restaurant, Spa in einem System" } ],
    devices: ["POS-Terminal", "Handgerät", "Kartenterminal"] },
  { name: "Biergarten", slug: "aussengastronomie", kicker: "Außengastronomie", img: "/lp/branchen/biergarten.jpg", title: "Handgerät statt Weg zur Theke.",
    feats: [ { n: "01", t: "Handgerät mit Tap to Pay", d: "Karte ans Gerät, Trinkgeld inklusive" }, { n: "02", t: "Bestellen, splitten, kassieren", d: "Karte ans Gerät, Abwicklung über Adyen" }, { n: "03", t: "Handgerät mit Drucker", d: "Bon direkt am Tisch" } ],
    devices: ["Android-Handgerät", "Mobiler Drucker", "Tap to Pay"] },
  { name: "Café & Bar", slug: "bar-cafe", kicker: "Theke & Schnellservice", img: "/lp/branchen/cafe-bar.jpg", title: "Schnellwahl an Theke und Terrasse.",
    feats: [ { n: "01", t: "Favoritenleiste", d: "die Top-Artikel immer im Daumenbereich" }, { n: "02", t: "Heller und dunkler Modus", d: "lesbar bei Mittagssonne und Kneipenlicht" }, { n: "03", t: "Kellnerschloss oder PIN", d: "Anmeldung in einer Sekunde" } ],
    devices: ["Touch-PC", "Kundendisplay", "Kartenterminal"] },
  { name: "Freizeitpark", slug: "freizeitpark", kicker: "Viele Kassen, ein System", img: "/lp/branchen/freizeitpark.jpg", title: "Viele Outlets. Ein Backoffice.",
    feats: [ { n: "01", t: "Artikel und Preise zentral", d: "ein Office für alle Standorte" }, { n: "02", t: "Neues Gerät per Einrichtungscode", d: "Saisonstart in Minuten" }, { n: "03", t: "Berichte je Standort", d: "live im Browser" } ],
    devices: ["POS-Terminal", "Tablet", "Handgerät"] },
  { name: "Systemgastro", slug: "systemgastronomie", kicker: "Filialen & Franchise", img: "/lp/branchen/systemgastro.jpg", title: "Zentrale Stammdaten für alle Filialen.",
    feats: [ { n: "01", t: "Layouts zentral ausrollen", d: "eine Oberfläche für alle Filialen" }, { n: "02", t: "Updates automatisch", d: "über Nacht, ohne Techniker" }, { n: "03", t: "Rechte pro Gruppe", d: "Filialleitung, Service, Aushilfe" } ],
    devices: ["Touch-PC", "Tablet", "Office"] },
];

export function BranchenTabs() {
  const [i, setI] = useState(0);
  const seg = SEGMENTS[i];
  return (
    <section id="branchen" className="b-branchen" aria-label="Branchen">
      <div className="b-wrap b-branchen-body">
        <div className="b-tabs" role="tablist" aria-label="Betriebsart wählen">
          {SEGMENTS.map((s, k) => (
            <button key={s.slug} type="button" role="tab" aria-selected={k === i} className={`b-d b-tab ${k === i ? "on" : ""}`} onClick={() => setI(k)}>
              {s.name}
            </button>
          ))}
        </div>
        <div className="b-seg" role="tabpanel">
          <div className="b-seg-l">
          {SEGMENTS.map((s, k) => (
            // Alle Bilder im DOM, damit der Wechsel ohne Nachladen passiert.
            <Image key={s.slug} src={s.img} alt={k === i ? `${s.name}: ${s.title}` : ""} aria-hidden={k !== i} fill sizes="(max-width: 1100px) 100vw, 60vw" quality={70} className="b-branchen-img" style={{ opacity: k === i ? 1 : 0, transition: "opacity .5s" }} loading={k === 0 ? "eager" : "lazy"} />
          ))}
          <div className="b-branchen-shade" aria-hidden="true" />
            <span className="b-m b-kicker">{seg.kicker}</span>
            <h2 className="b-d b-seg-h">{seg.title}</h2>
          </div>
          <div className="b-feats">
            {seg.feats.map((f) => (
              <div key={f.n} className="b-feat">
                <span className="b-m n">{f.n}</span>
                <span className="t"><b>{f.t}</b><small>{f.d}</small></span>
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
