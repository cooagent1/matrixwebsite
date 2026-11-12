"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

// /schnittstellen (12.11.): Verzeichnis in fünf Bereichen statt zwölf Karten, mit Suche und NXT-Stand je Anbindung.
// Die Anbindungen stehen hier. Der catgrid-Block in pages.json wird auf dieser Seite nicht mehr gerendert.

type Nxt = "live" | "wip" | undefined;
type Item = [name: string, nxt?: Nxt];
type Group = { title: string; items: Item[] };
type Cluster = { id: string; nr: string; name: string; groups: Group[] };

const CLUSTERS: Cluster[] = [
  {
    id: "gast", nr: "01", name: "Gast",
    groups: [
      { title: "Reservierung und Self-Ordering", items: [["RESERViSiON", "wip"], ["Flixorder"], ["servier.bar"]] },
      { title: "Lieferplattformen", items: [["DeliverBee"], ["Lieferando"], ["Wolt"]] },
      { title: "Golf und Freizeitpark", items: [["PC Caddie"], ["Convious"]] },
    ],
  },
  {
    id: "service", nr: "02", name: "Service",
    groups: [
      { title: "Hardware", items: [["Orderman"], ["Epson (Drucker)"], ["Star (Drucker)"], ["Mettler Toledo (Waagen)"]] },
      { title: "Schank und Kaffee", items: [["Schankanlagen"], ["Kaffeemaschinen"]] },
      { title: "Bankett", items: [["Bp Event (ehemals BANKETTprofi)"]] },
    ],
  },
  {
    id: "bezahlen", nr: "03", name: "Bezahlen",
    groups: [
      { title: "Payment", items: [["Adyen (Matrix PAY)", "live"], ["OPI"], ["Nexo"]] },
      { title: "Gutscheine und Karten", items: [["Matrix Gutscheinverwaltung"], ["Matrix Wallet"]] },
      { title: "Bargeld", items: [["Cashlogy (Cash-Management)"]] },
    ],
  },
  {
    id: "hotel", nr: "04", name: "Hotel",
    groups: [
      {
        title: "Hotelsoftware",
        items: [["Oracle Opera (OHIP)"], ["protel SPE/MPE", "wip"], ["protel AIR", "wip"], ["ASA Hotel", "wip"], ["Guestline"], ["Generische Hotelschnittstelle"]],
      },
    ],
  },
  {
    id: "buero", nr: "05", name: "Büro",
    groups: [
      { title: "Buchhaltung", items: [["DATEV"], ["Addison"], ["CONGA Kassenbuch mit DATEV-Modul"]] },
      { title: "Fiskal", items: [["Fiskaly (Cloud-TSE)", "live"], ["ELSTER-Kassenmeldung"]] },
      { title: "Warenwirtschaft", items: [["KOST"], ["FutureLog"], ["Generische Schnittstelle"]] },
      { title: "Personal", items: [["Matrix CONGA"], ["Gastromatic"]] },
    ],
  },
];

const NXT_HEUTE = ["Adyen (Matrix PAY)", "Fiskaly (Cloud-TSE)", "Datenübernahme aus Matrix Classic"];
const NXT_ARBEIT = ["protel", "ASA Hotel", "Online-Tischreservierung (eigene Lösung, RESERViSiON)", "Küchendisplay"];
const PAY = ["Matrix POS", "Matrix NXT", "Fremdkassen", "Hotelsoftware über die Kasse", "Front Office und Online-Buchungen über Channelmanager oder Website"];

export function Schnittstellen({ heading, lead, texts }: { heading: ReactNode; lead: ReactNode; texts: Record<string, ReactNode> }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState("alle");
  const needle = q.trim().toLowerCase();

  const shown = useMemo(
    () =>
      CLUSTERS.filter((c) => sel === "alle" || c.id === sel)
        .map((c) => ({
          ...c,
          groups: c.groups
            .map((g) => ({
              ...g,
              items: g.items.filter(([n]) => !needle || n.toLowerCase().includes(needle) || g.title.toLowerCase().includes(needle)),
            }))
            .filter((g) => g.items.length),
        }))
        .filter((c) => c.groups.length),
    [needle, sel],
  );
  const count = shown.reduce((n, c) => n + c.groups.reduce((m, g) => m + g.items.length, 0), 0);

  return (
    <>
      <section id="hero" className="ss-hero">
        <div className="b-wrap">
          <div className="ss-hero-top">
            <div className="ss-hero-in">
              <span className="b-m b-kicker">Schnittstellen</span>
              <h1 className="b-d sub-h1">{heading}</h1>
              <p className="ss-lead">{lead}</p>
            </div>
            <dl className="ss-nums">
              <div><dt className="b-d">40+</dt><dd>Anbindungen im Betrieb</dd></div>
              <div><dt className="b-d">5</dt><dd>Bereiche, vom Gast bis zum Büro</dd></div>
            </dl>
          </div>
          <div className="ss-tools">
            <div className="ss-search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" /></svg>
              <label htmlFor="ss-q" className="ss-sr">System suchen</label>
              <input id="ss-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Welches System nutzen Sie? Zum Beispiel protel, DATEV, Lieferando" autoComplete="off" />
              <span className="ss-count" aria-live="polite">{count} Treffer</span>
            </div>
            <div className="ss-filter">
              <div className="ss-pills" role="group" aria-label="Bereich">
                {[{ id: "alle", name: "Alle" }, ...CLUSTERS].map((c) => (
                  <button key={c.id} type="button" className={`ss-pill ${sel === c.id ? "on" : ""}`} aria-pressed={sel === c.id} onClick={() => setSel(c.id)}>{c.name}</button>
                ))}
              </div>
              <div className="ss-legend">
                <span><i className="ss-tag live">NXT</i>auch auf Matrix NXT</span>
                <span><i className="ss-tag wip">NXT</i>für NXT in Arbeit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="anbindungen" className="ss-list">
        <div className="b-wrap">
          {shown.map((c) => (
            <div key={c.id} className="ss-cluster">
              <div className="ss-cluster-h">
                <span className="b-m ss-nr">{c.nr}</span>
                <h2 className="b-d">{c.name}</h2>
                <p>{texts[c.id]}</p>
              </div>
              <div className="ss-groups">
                {c.groups.map((g) => (
                  <div key={g.title} className="ss-group">
                    <h3 className="b-m">{g.title}</h3>
                    <ul>
                      {g.items.map(([n, nxt]) => (
                        <li key={n} className="ss-chip">
                          {n}
                          {nxt && <i className={`ss-tag ${nxt}`} title={nxt === "live" ? "auch auf Matrix NXT" : "für Matrix NXT in Arbeit"}>NXT</i>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {shown.length === 0 && (
            <div className="ss-empty">
              <p className="b-d">Kein Treffer für „{q.trim()}“.</p>
              <Link href="/demo?thema=schnittstelle" className="ss-empty-btn">Schnittstelle anfragen</Link>
            </div>
          )}
          <div className="ss-end" />
        </div>
      </section>

      <section id="stand" className="ss-stand">
        <div className="b-wrap">
          <div className="ss-stand-h">
            <h2 className="b-d sub-h2">Stand je Produkt.</h2>
            <p>Die Liste oben gilt für Matrix POS. Für NXT und PAY steht hier, was heute läuft.</p>
          </div>
          <div className="ss-cards">
            <div className="ss-card dark">
              <h3 className="b-d">Matrix NXT</h3>
              <div className="ss-row"><span className="b-m">Heute</span><ul>{NXT_HEUTE.map((t) => (<li key={t}>{t}</li>))}</ul></div>
              <div className="ss-row wip"><span className="b-m">In Arbeit</span><ul>{NXT_ARBEIT.map((t) => (<li key={t}>{t}</li>))}</ul></div>
              <Link href="/kassensysteme/nxt" className="ss-more">Mehr zu NXT</Link>
            </div>
            <div className="ss-card">
              <h3 className="b-d">Matrix PAY</h3>
              <div className="ss-row"><span className="b-m">Arbeitet mit</span><ul>{PAY.map((t) => (<li key={t}>{t}</li>))}</ul></div>
              <Link href="/pay" className="ss-more">Mehr zu PAY</Link>
            </div>
            <div className="ss-card">
              <h3 className="b-d">Generische Schnittstelle</h3>
              <p>Für Hotelsoftware und Warenwirtschaft gibt es je eine generische Schnittstelle. Schankanlagen und Kaffeemaschinen binden wir darüber ebenfalls an.</p>
              <Link href="#formular" className="ss-more">System nennen</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
