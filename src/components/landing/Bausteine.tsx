"use client";

import { useState } from "react";

/**
 * Signature-Bausteine als Platzhalter auf der Startseite (07.11., Canvas „Signature-Bausteine“).
 * Acht Layouts mit neutralen Texten, damit Inhalt und Reihenfolge am lebenden Objekt entschieden werden.
 * Sobald ein Baustein echten Inhalt bekommt, wird er eigene Komponente mit Texten aus texte.json.
 */

const N = 8;
const STEP = 360 / N;
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

function Tag({ n, name }: { n: number; name: string }) {
  return <span className="bs-tag">Baustein {n} · {name}</span>;
}

function Rad() {
  const [at, setAt] = useState(1);
  const rot = 90 - at * STEP;
  return (
    <section className="bs bs-dark bs-rad" aria-label="Baustein Rad">
      <div className="bs-glow" aria-hidden="true" />
      <div className="b-wrap bs-rad-grid">
        <div className="bs-rad-wheel" aria-label="Acht Elemente als Rad">
          <div className="bs-rad-halo" aria-hidden="true" />
          <div className="bs-rad-ring" style={{ transform: `rotate(${rot}deg)` }}>
            {Array.from({ length: N }, (_, i) => (
              <button key={i} type="button" className={`bs-seg ${i === at ? "on" : ""}`} style={{ transform: `rotate(${i * STEP}deg)`, clipPath: CLIP }} aria-pressed={i === at} onClick={() => setAt(i)}>
                <span className="bs-seg-lab" style={{ transform: `rotate(${-(i * STEP + rot)}deg)` }}>Element 0{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="bs-rad-hub"><b>KERN</b><span>MITTE</span></div>
          <div className="bs-rad-pin" aria-hidden="true" />
        </div>
        <div className="bs-rad-txt">
          <Tag n={1} name="Rad" />
          <span className="b-m b-kicker">Kicker des Abschnitts</span>
          <h2 className="b-d bs-h2">Überschrift mit acht Punkten.</h2>
          <div className="bs-card">
            <span className="bs-mono">0{at + 1} / 08</span>
            <h3 className="b-d">Titel des gewählten Elements</h3>
            <p>Zwei bis drei Sätze zum gewählten Element. Beim Klick auf ein anderes Segment dreht sich das Rad und dieser Text wechselt.</p>
          </div>
          <div className="bs-row">
            <button type="button" className="bs-nav" aria-label="Zurück" onClick={() => setAt((at + N - 1) % N)}>←</button>
            <button type="button" className="bs-nav" aria-label="Weiter" onClick={() => setAt((at + 1) % N)}>→</button>
            <a className="b-btn b-btn-white" href="#demo">Aktion</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Baum() {
  const steps = [
    "Zwei bis drei Sätze zu diesem Schritt. Was passiert hier, wer ist beteiligt, was kommt dabei heraus.",
    "Zwei bis drei Sätze zu diesem Schritt. Der Text steht auf der Seite des Knotens, die Linie führt weiter nach unten.",
    "Zwei bis drei Sätze zu diesem Schritt. Beliebig viele Knoten, die Sektion wächst nach unten mit.",
    "Letzter Schritt, danach folgt die Aktion oder die nächste Sektion.",
  ];
  return (
    <section className="bs bs-dark bs-baum" aria-label="Baustein Flow-Baum">
      <div className="b-wrap">
        <div className="bs-center"><Tag n={2} name="Flow-Baum" /><span className="b-m b-kicker">Kicker des Abschnitts</span><h2 className="b-d bs-h2">Vier Schritte, ein Weg.</h2></div>
        <ol className="bs-baum-list">
          {steps.map((t, i) => (
            <li key={i} className={i % 2 ? "r" : "l"}>
              <span className="bs-baum-line" aria-hidden="true" />
              <span className="b-d bs-baum-node">Schritt {i + 1}</span>
              <p>{t}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Orbit() {
  const inner = [["Eins", 332, 72, ""], ["Zwei", 522, 210, "acc"], ["Drei", 450, 434, ""], ["Vier", 214, 434, ""], ["Fünf", 142, 210, ""]] as const;
  const outer = [["Partner A", 465, 38], ["Partner B", 615, 298], ["Partner C", 465, 558], ["Partner D", 165, 558], ["Partner E", 15, 298], ["und mehr", 165, 38]] as const;
  return (
    <section className="bs bs-light bs-orbit" aria-label="Baustein Orbit">
      <div className="b-wrap bs-orbit-grid">
        <div className="bs-orbit-txt">
          <Tag n={3} name="Orbit" />
          <span className="b-m b-kicker">Kicker des Abschnitts</span>
          <h2 className="b-d bs-h2">Ein Kern. Zwei Ringe drumherum.</h2>
          <p className="bs-lead">Innen die eigenen Bausteine, außen die Partner, Werkzeuge oder Systeme. Beliebig erweiterbar, die Ringe bleiben lesbar.</p>
          <div className="bs-legend"><span><i className="d" />Innerer Ring</span><span><i className="w" />Äußerer Ring</span></div>
        </div>
        <div className="bs-orbit-stage" aria-label="Kern mit zwei Ringen">
          <div className="bs-ring" style={{ left: 80, top: 20, width: 600, height: 600 }} />
          <div className="bs-ring acc" style={{ left: 180, top: 120, width: 400, height: 400 }} />
          <div className="bs-core">Kern</div>
          {inner.map(([n, x, y, c]) => <div key={n} className={`bs-mod ${c}`} style={{ left: x, top: y }}>{n}</div>)}
          {outer.map(([n, x, y]) => <div key={n} className="bs-pill" style={{ left: x, top: y }}>{n}</div>)}
        </div>
      </div>
    </section>
  );
}

function Panel() {
  const [at, setAt] = useState(1);
  const items = ["Erster Punkt", "Zweiter Punkt", "Dritter Punkt", "Vierter Punkt"];
  return (
    <section className="bs bs-dark bs-panel" aria-label="Baustein Liste und Fläche">
      <div className="b-wrap">
        <div className="bs-center"><Tag n={4} name="Liste und Fläche" /><span className="b-m b-kicker">Kicker des Abschnitts</span><h2 className="b-d bs-h2">Vier Punkte, eine Fläche.</h2></div>
        <div className="bs-panel-grid">
          <div className="bs-panel-list">
            {items.map((t, i) => (
              <button key={t} type="button" className={`bs-prow ${i === at ? "on" : ""}`} aria-pressed={i === at} onClick={() => setAt(i)}><small className="bs-mono">0{i + 1}</small><span className="b-d">{t}</span><i>→</i></button>
            ))}
          </div>
          <div className="bs-panel-box">
            <h3 className="b-d">Überschrift zum {items[at].toLowerCase()}.</h3>
            <p>Zwei bis drei Sätze, die den Punkt erklären. Die gewählte Zeile links fließt in diese Fläche hinein, so sieht man ohne Nachdenken, was zusammengehört.</p>
            <a href="#demo">Weiterführender Link →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Staffel() {
  return (
    <section className="bs bs-light bs-staffel" aria-label="Baustein gestaffelte Karten">
      <div className="b-wrap">
        <Tag n={5} name="Gestaffelte Karten" />
        <span className="b-m b-kicker">Kicker des Abschnitts</span>
        <h2 className="b-d bs-h2 bs-h2-wide">Eine Überschrift über zwei Zeilen, die die drei Karten darunter einleitet.</h2>
        <div className="bs-staffel-grid">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`bs-scard ${i === 1 ? "hi" : ""}`}>
              <span className="n b-d">Zahl</span><span className="u">Einheit oder Kennzahl</span><span className="m">Branche · Region</span>
              <hr />
              <p>{i === 1 ? "Eine Zeile zum Ergebnis oder Projekt, hier hervorgehoben." : "Eine Zeile zum Ergebnis oder Projekt."}</p>
              <b className="b-d">Name</b>
              <div className="logo" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spalten() {
  const [at, setAt] = useState(1);
  const names = ["Thema eins", "Thema zwei", "Thema drei", "Thema vier", "Thema fünf"];
  return (
    <section className="bs bs-dark bs-spalten" aria-label="Baustein aufklappende Spalten">
      <div className="b-wrap">
        <div className="bs-head2">
          <div><Tag n={6} name="Aufklappende Spalten" /><span className="b-m b-kicker">Kicker des Abschnitts</span><h2 className="b-d bs-h2">Fünf Themen, eins aufgeklappt.</h2></div>
          <p className="bs-lead">Klick öffnet eine Spalte, die anderen rücken zusammen. Innen Platz für Text plus Foto, Screenshot oder Beispiel.</p>
        </div>
        <div className="bs-cols">
          {names.map((n, i) => (
            <div key={n} className={`bs-col ${i === at ? "on" : ""}`}>
              <button type="button" className="bs-col-hit" aria-expanded={i === at} onClick={() => setAt(i)}><span className="bs-col-lab b-d">{n}</span></button>
              <div className="bs-col-body" aria-hidden={i !== at}>
                <div><h3 className="b-d">{n}, aufgeklappt.</h3><p>Zwei bis drei Sätze zum Thema. Rechts ein Beispiel: Dialog, Screenshot, Foto oder Kennzahl, was zum Inhalt passt.</p></div>
                <div className="bs-chat"><span className="me">Beispielfrage aus dem Alltag.</span><span className="them">Beispielantwort, die den Nutzen zeigt. Kurz, konkret, ohne Fachjargon.</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bento() {
  return (
    <section className="bs bs-light bs-bento" aria-label="Baustein Bento-Raster">
      <div className="b-wrap">
        <Tag n={7} name="Bento-Raster" />
        <span className="b-m b-kicker">Kicker des Abschnitts</span>
        <h2 className="b-d bs-h2">Sechs Kacheln, unterschiedlich groß.</h2>
        <div className="bs-bento-grid">
          <div className="bs-tile dark wide img"><div className="bs-tile-shade" aria-hidden="true" /><div className="bs-tile-in"><span className="k">FOTO ODER SCREENSHOT</span><h3 className="b-d">Große Kachel mit Bild und Überschrift.</h3><p>Ein Satz dazu. Die Kachel trägt das Thema der Sektion.</p></div></div>
          <div className="bs-tile"><span className="num b-d">42<em>+</em></span><p>Kennzahl mit Einheit darunter.</p></div>
          <div className="bs-tile blue"><span className="k">AKTION</span><h3 className="b-d">Kachel mit Aufruf.</h3><p>Ein Satz, dann der Button.</p><a className="b-btn b-btn-white" href="#demo">Aktion</a></div>
          <div className="bs-tile"><span className="k">THEMA</span><h3 className="b-d">Kleine Kachel.</h3><p>Zwei Sätze Inhalt, mehr nicht.</p></div>
          <div className="bs-tile"><span className="k">THEMA</span><h3 className="b-d">Kleine Kachel.</h3><p>Zwei Sätze Inhalt, mehr nicht.</p></div>
          <div className="bs-tile dark wide"><span className="k">ZITAT ODER STATEMENT</span><h3 className="b-d q">„Ein Satz, der hängen bleibt, in Anführungszeichen, mit Name darunter.“</h3><p>Name, Funktion, Betrieb</p></div>
        </div>
      </div>
    </section>
  );
}

function Zahlen() {
  return (
    <section className="bs bs-dark bs-zahlen" aria-label="Baustein große Zahlen">
      <div className="bs-word" aria-hidden="true">WORT</div>
      <div className="b-wrap">
        <Tag n={8} name="Große Zahlen und Statement" />
        <span className="b-m b-kicker">Kicker des Abschnitts</span>
        <h2 className="b-d bs-h2">Vier Zahlen, die für sich sprechen.</h2>
        <div className="bs-nums">
          <div><b className="b-d">30<em>+</em></b><span>Einheit und ein kurzer Satz dazu</span></div>
          <div><b className="b-d">12</b><span>Einheit und ein kurzer Satz dazu</span></div>
          <div><b className="b-d">99<em>%</em></b><span>Einheit und ein kurzer Satz dazu</span></div>
          <div><b className="b-d">7</b><span>Einheit und ein kurzer Satz dazu</span></div>
        </div>
        <p className="bs-statement b-d">Ein Statement über zwei Zeilen, das die Zahlen einordnet und den Abschnitt abschließt. Kräftig, kurz, ohne Fußnote.</p>
      </div>
    </section>
  );
}

function Story() {
  const [at, setAt] = useState(1);
  const steps = [
    ["Erster Schritt in einem Satz.", "Zwei bis drei Sätze dazu. Beim Scrollen wird der nächste Schritt aktiv, der vorherige wird grau."],
    ["Zweiter Schritt, gerade aktiv.", "Zwei bis drei Sätze dazu. Hier kann auch ein Bild oder ein Screenshot stehen, die Spalte wächst mit."],
    ["Dritter Schritt in einem Satz.", "Zwei bis drei Sätze dazu. Beliebig viele Schritte, die Sektion ist so lang wie der Inhalt."],
    ["Vierter Schritt in einem Satz.", "Am Ende eine Aktion oder der Übergang zur nächsten Sektion."],
  ];
  return (
    <section className="bs bs-light bs-story" aria-label="Baustein Sticky-Story">
      <div className="b-wrap bs-story-grid">
        <div className="bs-story-left">
          <Tag n={9} name="Sticky-Story" />
          <span className="b-m b-kicker">Kicker des Abschnitts</span>
          <h2 className="b-d bs-h2">Links bleibt stehen, rechts läuft die Geschichte.</h2>
          <p className="bs-lead">Beim Scrollen bleibt diese Spalte stehen. Die große Zahl zählt mit, welcher Schritt gerade im Bild ist. Hier als Klick.</p>
          <div className="bs-story-big b-d">0{at + 1}</div>
        </div>
        <div className="bs-story-steps">
          <span className="bs-story-rail" aria-hidden="true"><i style={{ height: `${((at + 0.5) / steps.length) * 100}%` }} /></span>
          {steps.map(([h, p], i) => (
            <button key={h} type="button" className={`bs-step ${i === at ? "on" : ""}`} onClick={() => setAt(i)} aria-pressed={i === at}><span className="n">0{i + 1}</span><span><b className="b-d">{h}</b><em>{p}</em></span></button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Band() {
  const a = ["LOGO A", "LOGO B", "LOGO C", "LOGO D", "LOGO E", "LOGO F", "LOGO G"];
  const b = ["LOGO H", "LOGO I", "LOGO J", "LOGO K", "LOGO L", "LOGO M", "LOGO N"];
  const row = (xs: string[], rev?: boolean) => (
    <div className="bs-band" aria-hidden="true"><div className={`bs-track ${rev ? "rev" : ""}`}>{[...xs, ...xs].map((n, i) => <span key={i} className={`bs-lg ${i % 7 === 2 ? "acc" : ""}`}>{n}</span>)}</div></div>
  );
  return (
    <section className="bs bs-dark bs-bandsec" aria-label="Baustein Logo-Band">
      <div className="b-wrap bs-center"><Tag n={10} name="Logo-Band und Statement" /><span className="b-m b-kicker">Kicker des Abschnitts</span><h2 className="b-d bs-h2">Zwei Bänder, gegenläufig.</h2></div>
      {row(a)}
      <div className="b-wrap bs-band-mid"><p className="b-d">Ein Statement zwischen den Bändern, das sagt, was die Logos gemeinsam haben.</p><span>Ein Satz darunter, der einordnet: Kunden, Partner, Schnittstellen oder Auszeichnungen.</span></div>
      {row(b, true)}
    </section>
  );
}

function Vergleich() {
  return (
    <section className="bs bs-light bs-vs" aria-label="Baustein Vergleich">
      <div className="b-wrap">
        <div className="bs-center"><Tag n={11} name="Vergleich" /><span className="b-m b-kicker">Kicker des Abschnitts</span><h2 className="b-d bs-h2">Vorher links, nachher rechts.</h2></div>
        <div className="bs-vs-grid">
          <div className="bs-vs-badge" aria-hidden="true">VS</div>
          <div className="bs-vs-col a"><h3 className="b-m">OHNE</h3><div className="t b-d">Der alte Zustand in einem Satz.</div>{["Punkt, der heute Zeit kostet.", "Punkt, der heute Fehler macht.", "Punkt, der heute niemanden freut.", "Punkt, der heute doppelt passiert."].map((t) => <div key={t} className="li"><i>–</i><span>{t}</span></div>)}</div>
          <div className="bs-vs-col b"><h3 className="b-m">MIT</h3><div className="t b-d">Der neue Zustand in einem Satz.</div>{[1, 2, 3, 4].map((i) => <div key={i} className="li"><i>✓</i><span>Gleicher Punkt, gelöst.</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Zeit() {
  const [at, setAt] = useState(2);
  const pts = ["1994", "2004", "2014", "2019", "2024", "Heute"];
  return (
    <section className="bs bs-dark bs-zeit" aria-label="Baustein Zeitstrahl">
      <div className="b-wrap">
        <div className="bs-head2">
          <div><Tag n={12} name="Zeitstrahl" /><span className="b-m b-kicker">Kicker des Abschnitts</span><h2 className="b-d bs-h2">Sechs Stationen auf einer Linie.</h2></div>
          <p className="bs-lead">Meilensteine, Jahre, Versionen oder Phasen. Die aktive Station hebt sich als Karte ab.</p>
        </div>
        <div className="bs-zeit-grid">
          <span className="bs-zeit-line" aria-hidden="true" />
          {pts.map((y, i) => (
            <button key={y} type="button" className={`bs-pt ${i === at ? "on" : ""}`} onClick={() => setAt(i)} aria-pressed={i === at}><i /><span className="bs-pt-card"><b className="bs-mono">{y}</b><em>{i === at ? "Die aktive Station bekommt zwei bis drei Sätze und mehr Platz." : "Ein Satz zur Station."}</em></span></button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tabs() {
  const [at, setAt] = useState(1);
  const tabs = ["Funktion eins", "Funktion zwei", "Funktion drei", "Funktion vier"];
  const bars = [30, 45, 38, 80, 55, 95, 62, 48];
  return (
    <section className="bs bs-light bs-tabs" aria-label="Baustein Tabs mit Fenster">
      <div className="b-wrap">
        <Tag n={13} name="Tabs mit Fenster" />
        <span className="b-m b-kicker">Kicker des Abschnitts</span>
        <h2 className="b-d bs-h2">Vier Funktionen, ein Fenster.</h2>
        <div className="bs-tabs-grid">
          <div className="bs-tabs-list">
            {tabs.map((t, i) => (
              <button key={t} type="button" className={`bs-tab ${i === at ? "on" : ""}`} onClick={() => setAt(i)} aria-pressed={i === at}><b className="b-d">{t}</b><span>Ein Satz zur Funktion, erscheint nur, wenn der Tab offen ist.</span></button>
            ))}
          </div>
          <div className="bs-win" aria-label="Fenster mit Beispielansicht">
            <div className="bs-win-bar"><i /><i /><i /><span className="bs-mono">app.beispiel.de/{tabs[at].toLowerCase().replace(" ", "-")}</span></div>
            <div className="bs-win-scr">
              <div className="bs-win-side">{[0, 1, 2, 3, 4].map((i) => <span key={i} className={i === at ? "on" : ""} />)}</div>
              <div className="bs-win-main">
                <div className="bs-kpis">{["Kennzahl eins", "Kennzahl zwei", "Kennzahl drei"].map((k) => <div key={k} className="bs-kpi"><b className="b-d">Zahl</b><small>{k}</small></div>)}</div>
                <div className="bs-chart" aria-hidden="true">{bars.map((h, i) => <i key={i} className={(i + at) % 3 === 0 ? "acc" : ""} style={{ height: `${h}%` }} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Zitat() {
  const [at, setAt] = useState(0);
  return (
    <section className="bs bs-grey bs-zitat" aria-label="Baustein Zitat-Spotlight">
      <div className="b-wrap bs-zitat-grid">
        <div className="bs-zitat-mark b-d" aria-hidden="true">„</div>
        <div className="bs-zitat-body">
          <Tag n={14} name="Zitat-Spotlight" />
          <span className="b-m b-kicker">Kicker des Abschnitts</span>
          <p className="bs-zitat-q b-d">Ein Zitat über drei bis vier Zeilen, groß gesetzt, damit es die ganze Sektion trägt. Ein echter Satz von einem echten Menschen, nicht glattgebügelt. Stimme {at + 1}.</p>
          <div className="bs-who"><span className="av" aria-hidden="true" /><span><b>Vorname Nachname</b><small>Funktion, Betrieb, Ort</small></span><span className="logo" aria-hidden="true" /></div>
          <div className="bs-zitat-nav">
            <span className="bs-dots" aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} className={i === at ? "on" : ""} />)}</span>
            <small>{at + 1} von 4</small>
            <span className="bs-zitat-btns"><button type="button" className="bs-nav light" aria-label="Zurück" onClick={() => setAt((at + 3) % 4)}>←</button><button type="button" className="bs-nav light" aria-label="Weiter" onClick={() => setAt((at + 1) % 4)}>→</button></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Bausteine() {
  return (
    <div id="bausteine" className="bs-wrap">
      <Rad />
      <Baum />
      <Orbit />
      <Panel />
      <Staffel />
      <Spalten />
      <Bento />
      <Zahlen />
      <Story />
      <Band />
      <Vergleich />
      <Zeit />
      <Tabs />
      <Zitat />
    </div>
  );
}
