"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

// /schnittstellen (12.11.): Verzeichnis in fünf Bereichen statt zwölf Karten, mit Suche und NXT-Stand je Anbindung.
// Die Anbindungen stehen hier. Der catgrid-Block in pages.json wird auf dieser Seite nicht mehr gerendert.

// Produkte je Anbindung: ohne Angabe Matrix POS. "nxt" = auf Matrix NXT (12.11.: „in Arbeit“ gibt es nicht als Stufe, gilt als vorhanden), "pay" = arbeitet mit Matrix PAY.
type Tag = "pos" | "nxt" | "pay";
type Item = [name: string, tags?: Tag[]];
type Group = { title: string; items: Item[] };
type Cluster = { id: string; nr: string; name: string; groups: Group[] };

const CLUSTERS: Cluster[] = [
  {
    id: "gast", nr: "01", name: "Gast",
    groups: [
      { title: "Reservierung und Self-Ordering", items: [["RESERViSiON", ["pos", "nxt"]], ["Flixorder"], ["servier.bar"]] },
      { title: "Lieferplattformen", items: [["DeliverBee"], ["Lieferando"], ["Wolt"]] },
      { title: "Golf und Freizeitpark", items: [["PC Caddie"], ["Convious"]] },
    ],
  },
  {
    id: "service", nr: "02", name: "Service",
    groups: [
      { title: "Hardware", items: [["Orderman"], ["Epson (Drucker)"], ["Star (Drucker)"], ["Mettler Toledo (Waagen)"]] },
      { title: "Küche", items: [["Küchendisplay", ["nxt"]]] },
      { title: "Schank und Kaffee", items: [["Schankanlagen"], ["Kaffeemaschinen"]] },
      { title: "Bankett", items: [["Bp Event (ehemals BANKETTprofi)"]] },
    ],
  },
  {
    id: "bezahlen", nr: "03", name: "Bezahlen",
    groups: [
      { title: "Payment", items: [["Adyen (Matrix PAY)", ["pos", "nxt", "pay"]], ["OPI"], ["Nexo"]] },
      { title: "Kassen", items: [["Matrix POS", ["pay"]], ["Matrix NXT", ["pay"]], ["Fremdkassen", ["pay"]]] },
      { title: "Gutscheine und Karten", items: [["Matrix Gutscheinverwaltung"], ["Matrix Wallet"]] },
      { title: "Bargeld", items: [["Cashlogy (Cash-Management)"]] },
    ],
  },
  {
    id: "hotel", nr: "04", name: "Hotel",
    groups: [
      {
        title: "Hotelsoftware",
        items: [["Oracle Opera (OHIP)"], ["protel SPE/MPE", ["pos", "nxt"]], ["protel AIR", ["pos", "nxt"]], ["ASA Hotel", ["pos", "nxt"]], ["Guestline"], ["Generische Hotelschnittstelle"]],
      },
      { title: "Zahlung im Hotel", items: [["Hotelsoftware über die Kasse", ["pay"]], ["Front Office und Online-Buchungen über Channelmanager oder Website", ["pay"]]] },
    ],
  },
  {
    id: "buero", nr: "05", name: "Büro",
    groups: [
      { title: "Buchhaltung", items: [["DATEV"], ["Addison"], ["CONGA Kassenbuch mit DATEV-Modul"]] },
      { title: "Fiskal", items: [["Fiskaly (Cloud-TSE)", ["pos", "nxt"]], ["ELSTER-Kassenmeldung"]] },
      { title: "Warenwirtschaft", items: [["KOST"], ["FutureLog"], ["Generische Schnittstelle"]] },
      { title: "Personal", items: [["Matrix CONGA"], ["Gastromatic"]] },
      { title: "Datenübernahme", items: [["Datenübernahme aus Matrix Classic", ["nxt"]]] },
    ],
  },
];

const PRODUKTE = [
  { id: "alle", name: "Alle", href: "", more: "" },
  { id: "pos", name: "POS", href: "/kassensysteme", more: "Mehr zu Matrix POS" },
  { id: "nxt", name: "NXT", href: "/kassensysteme/nxt", more: "Mehr zu Matrix NXT" },
  { id: "pay", name: "PAY", href: "/pay", more: "Mehr zu Matrix PAY" },
];
const TAG_LABEL: Record<Tag, string> = { pos: "Matrix POS", nxt: "Matrix NXT", pay: "Matrix PAY" };
const tagsOf = (it: Item): Tag[] => it[1] ?? ["pos"];
const hasProdukt = (it: Item, p: string) => p === "alle" || tagsOf(it).includes(p as Tag);

export function Schnittstellen({ heading, lead, texts }: { heading: ReactNode; lead: ReactNode; texts: Record<string, ReactNode> }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState("alle");
  const [prod, setProd] = useState("alle");
  const needle = q.trim().toLowerCase();

  const shown = useMemo(
    () =>
      CLUSTERS.filter((c) => sel === "alle" || c.id === sel)
        .map((c) => ({
          ...c,
          groups: c.groups
            .map((g) => ({
              ...g,
              items: g.items.filter((it) => hasProdukt(it, prod) && (!needle || it[0].toLowerCase().includes(needle) || g.title.toLowerCase().includes(needle))),
            }))
            .filter((g) => g.items.length),
        }))
        .filter((c) => c.groups.length),
    [needle, sel, prod],
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
              <div className="ss-pills ss-prod" role="group" aria-label="Produkt">
                {PRODUKTE.map((p) => (
                  <button key={p.id} type="button" className={`ss-pill ${prod === p.id ? "on" : ""}`} aria-pressed={prod === p.id} onClick={() => setProd(p.id)}>{p.id !== "alle" && <i className={`ss-dot ${p.id}`} aria-hidden="true" />}{p.name}</button>
                ))}
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
                      {g.items.map((it) => (
                        <li key={it[0]} className="ss-chip">
                          <span>{it[0]}</span>
                          <span className="ss-dots">{tagsOf(it).map((t) => (<i key={t} className={`ss-dot ${t}`} role="img" aria-label={TAG_LABEL[t]} title={TAG_LABEL[t]} />))}</span>
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
          {prod !== "alle" && shown.length > 0 && (
            <div className="ss-prod-more">
              <Link href={PRODUKTE.find((p) => p.id === prod)!.href}>{PRODUKTE.find((p) => p.id === prod)!.more}</Link>
            </div>
          )}
          <div className="ss-end" />
        </div>
      </section>
    </>
  );
}
