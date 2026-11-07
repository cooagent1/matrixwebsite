"use client";

import Link from "next/link";
import { useEffect, useState, type KeyboardEvent } from "react";

// Rad „Acht Dinge, die NXT ausmachen“ (Vorlage: Canvas Signature-Grafiken, Grafik 6).
const DATA: [string, string, string, string][] = [
  ["TISCHPLAN", "Tischplan", "Der Tischplan ist die Startseite.", "Jeder Tisch ein Feld, jeder Gast ein Platz. Offene Tische, Gänge und Beträge auf einen Blick, auf dem Terminal und auf dem Handgerät."],
  ["GÄNGE", "Gänge", "Gang 1, Gang 2, Dessert.", "Bestellungen gehen gangweise an Küche und Bar. Abrufen mit einem Tipp, Nachbestellungen hängen sich an den offenen Tisch."],
  ["HANDGERÄT", "Handgerät", "Die Kasse geht mit an den Tisch.", "Bestellen, splitten, kassieren direkt beim Gast. Tap to Pay auf dem Android-Gerät, kein Extra-Terminal."],
  ["KÜCHE & BAR", "Küche und Bar", "Bons kommen da an, wo sie hingehören.", "Bondrucker oder Küchenmonitor, sortiert nach Tisch und Gang. Sonderwünsche stehen auf dem Bon, nicht auf dem Block."],
  ["MATRIX PAY", "Matrix PAY", "Zahlung aus einer Hand.", "Karte, kontaktlos, Trinkgeld, Bewirtungsbeleg. Eine Abrechnung für Kasse und Zahlung, kein zweiter Anbieter."],
  ["BÜRO", "Büro", "Auswertung im Browser.", "Umsätze, Tagesabschluss, Kassenbuch und DSFinV-K-Export. Von jedem Rechner, auch von zu Hause."],
  ["SCHNITTSTELLEN", "Schnittstellen", "Redet mit dem Rest des Betriebs.", "Hotelsoftware wie protel und Oracle, Buchhaltung mit DATEV, Zahlung mit Adyen, TSE mit Fiskaly. Über 40 Anbindungen."],
  ["TSE & GESETZ", "TSE und Gesetz", "Finanzamt-fertig ohne Checkliste.", "Cloud-TSE, KassenSichV, DSFinV-K, Meldepflicht. Steckt im System und läuft mit, ohne dass jemand daran denken muss."],
];
const N = DATA.length;
const STEP = 360 / N;

// Keilform: Außenradius 296, Innenradius 118, Lücke 1,4 Grad je Seite; Punkte in Prozent der 600er-Box, skaliert also mit.
const CLIP = (() => {
  const c = 300, R = 296, r = 118, a0 = -(STEP / 2) + 1.4, a1 = STEP / 2 - 1.4, k = Math.PI / 180;
  const pt = (rad: number, i: number) => {
    const a = (a0 + ((a1 - a0) * i) / 10) * k;
    return `${((c + rad * Math.sin(a)) / 6).toFixed(2)}% ${((c - rad * Math.cos(a)) / 6).toFixed(2)}%`;
  };
  const pts: string[] = [];
  for (let i = 0; i <= 10; i++) pts.push(pt(R, i));
  for (let i = 10; i >= 0; i--) pts.push(pt(r, i));
  return `polygon(${pts.join(",")})`;
})();

export function NxtRad({ id }: { id?: string }) {
  const [at, setAt] = useState(0);
  // Drehwinkel läuft fortlaufend mit, damit das Rad immer den kurzen Weg nimmt (08 → 01 ein Schritt, keine Rückwärtsrunde).
  const [rot, setRot] = useState(90);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setStill(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const pick = (i: number) => {
    const n = ((i % N) + N) % N;
    setAt(n);
    setRot((r) => {
      let d = (90 - n * STEP - r) % 360;
      if (d > 180) d -= 360;
      if (d <= -180) d += 360;
      return r + d;
    });
  };

  // Ohne Bewegung steht das Rad fest, nur die Farbe wechselt.
  const ring = still ? 90 : rot;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (at + d + N) % N;
    pick(n);
    (e.currentTarget.querySelectorAll<HTMLButtonElement>(".nxt-rad-seg")[n])?.focus();
  };

  return (
    <section id={id} className="nxt-rad">
      <div className="nxt-rad-glow" aria-hidden="true" />
      <div className="b-wrap nxt-rad-grid">
        <div className={`nxt-rad-wheel${still ? " still" : ""}`} role="group" aria-label="Acht Elemente von Matrix NXT als Rad" onKeyDown={onKey}>
          <div className="nxt-rad-halo" aria-hidden="true" />
          <div className="nxt-rad-ring" style={{ transform: `rotate(${ring}deg)` }}>
            {DATA.map((d, i) => (
              <button
                key={d[0]}
                type="button"
                className={`nxt-rad-seg${i === at ? " on" : ""}`}
                style={{ transform: `rotate(${i * STEP}deg)`, clipPath: CLIP }}
                onClick={() => pick(i)}
                aria-pressed={i === at}
                aria-label={d[1]}
              >
                <span className="nxt-rad-lab b-m" style={{ transform: `rotate(${-(i * STEP + ring)}deg)` }}>{d[0]}</span>
              </button>
            ))}
          </div>
          <div className="nxt-rad-hub" aria-hidden="true"><b className="b-d">NXT</b><span>MATRIX</span><i /></div>
          <div className="nxt-rad-pin" aria-hidden="true" />
        </div>

        <div className="nxt-rad-txt">
          <span className="nxt-rad-kicker">Matrix NXT</span>
          <h2 className="b-d nxt-rad-h2">Acht Dinge, die NXT ausmachen.</h2>
          <div className="nxt-rad-card" aria-live="polite">
            <span className="nxt-rad-num">{String(at + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
            <h3 className="b-d">{DATA[at][2]}</h3>
            <p>{DATA[at][3]}</p>
          </div>
          <div className="nxt-rad-ctl">
            <button type="button" className="nxt-rad-nav" onClick={() => pick(at - 1)} aria-label="Vorheriges Element">←</button>
            <button type="button" className="nxt-rad-nav" onClick={() => pick(at + 1)} aria-label="Nächstes Element">→</button>
            <Link href="/demo" className="nxt-rad-btn">Demo buchen</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
