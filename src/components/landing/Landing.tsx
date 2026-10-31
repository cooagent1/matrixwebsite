/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { NAV, SUPPORT_PORTAL } from "@/lib/nav";
import { BranchenTabs } from "./BranchenTabs";

// Branchen-Laufband im Hero (Wunsch Robert 31.10.: Domänen statt Kassen-Feed), Ziele = Branchenseiten.
const FEED: [string, string, string][] = [
  ["Restaurant", "Gänge, Splitten, Tischplan", "/branchen/restaurant"],
  ["Hotel", "Rechnung aufs Zimmer", "/branchen/hotel"],
  ["Bar & Café", "Favoriten vorne, Schlange kurz", "/branchen/bar-cafe"],
  ["Biergarten & Terrasse", "Mobil kassieren am Tisch", "/branchen/aussengastronomie"],
  ["Freizeitpark", "Hunderte Kassen, ein Office", "/branchen/freizeitpark"],
  ["Food Court", "Mehrere Stationen, ein Bon", "/branchen/foodcourt"],
  ["Systemgastronomie", "Ein Standard für jede Filiale", "/branchen/systemgastronomie"],
];

const LOGOS = [
  ["atlantic-hotels", "Atlantic Hotels", ""],
  ["25hours-hotels", "25hours Hotels", ""],
  ["europa-park", "Europa-Park", ""],
  ["hofbraeuhaus", "Hofbräuhaus München", "tall"],
  ["dinzler", "Dinzler", "mid"],
  ["estrel", "Estrel Berlin", ""],
  ["gop", "GOP Varieté", "mid"],
];

const CARDS: { n: string; t: string; d: string; acc?: boolean }[] = [
  { n: "01", t: "Tischplan mit Gängen", d: "Mehrere Räume, offene Beträge, Tischwechsel beim Schichtwechsel, Tisch retten." },
  { n: "02", t: "Bezahlen, wie der Gast will", d: "Bar, Karte, Gutschein, Kundenkonto, Zimmerrechnung, Tap to Pay. Rechnung splitten in Sekunden." },
  { n: "03", t: "Cloud-TSE ohne Stick", d: "Jeder Vorgang signiert über Fiskaly. Fällt die TSE aus, läuft die Kasse weiter. DSFinV-K, RKSV für Österreich.", acc: true },
  { n: "04", t: "Drucken, wo es hingehört", d: "Bons automatisch je Warengruppe an Küche oder Bar, eigenes Layout mit Logo und QR, Warnung bei Druckerausfall." },
  { n: "05", t: "Mein Layout, mein Modus", d: "Favoritenleiste, mehrere Layouts in einer Kasse, heller und dunkler Modus für Mittagssonne und Kneipenlicht." },
  { n: "06", t: "Hotel kommt dazu", d: "Zimmerbuchung aus der Kasse über protel und ASA Hotel, Start im 4. Quartal 2026 – eine Abrechnung mit Matrix PAY." },
  { n: "07", t: "Gerät rein, Code rein, läuft", d: "Neues Tablet oder Handgerät per Einrichtungscode anmelden. Updates kommen zentral und automatisch." },
  { n: "08", t: "Umstieg von Matrix Classic", d: "Artikel und Personal übernehmen wir. Update für Update wächst NXT in Richtung Classic-Umfang." },
];

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Menu() {
  return (
    <details className="b-pill-menu">
      <summary className="b-burger" aria-label="Menü öffnen">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </summary>
      <nav className="b-menu" aria-label="Hauptnavigation">
        {NAV.map((g) => (
          <div key={g.label}>
            <h4 className="b-m">{g.label}</h4>
            {g.href && !g.children && <Link href={g.href}>{g.label}</Link>}
            {g.children?.map((c) => (
              <Link key={c.href} href={c.href}>{c.label}</Link>
            ))}
          </div>
        ))}
        <div>
          <h4 className="b-m">Direkt</h4>
          <Link href="/demo">Demo buchen</Link>
          <a href={SUPPORT_PORTAL} target="_blank" rel="noopener noreferrer">Supportportal</a>
          <Link href="/partner">Partner werden</Link>
        </div>
      </nav>
    </details>
  );
}

export function Landing() {
  const feed = [...FEED, ...FEED];
  const logos = [...LOGOS, ...LOGOS];
  return (
    <>
      <section className="b-hero" id="top">
        <video autoPlay muted loop playsInline preload="auto" poster="/lp/hero-poster.jpg" aria-hidden="true" className="b-hero-video">
          <source src="/lp/hero.mp4" type="video/mp4" />
        </video>
        <div className="b-hero-shade" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-d b-word" aria-hidden="true">NXT</div>

        <header className="b-hdr">
          <div className="b-wrap b-hdr-in">
            <div className="b-pill">
              <Menu />
              <Link href="/" aria-label="Matrix POS Startseite"><img src="/lp/logo-matrixpos.png" alt="Matrix POS" className="b-logo" /></Link>
            </div>
            <div className="b-m b-hdr-tag">Hannover · Kassensysteme seit 30+ Jahren</div>
            <Link href="/demo" className="b-btn b-btn-acc b-hdr-cta">Demo buchen</Link>
          </div>
        </header>

        <div className="b-wrap b-hero-body">
          <div className="b-rise b-m b-kicker" style={{ animationDelay: ".1s" }}>Matrix NXT — Cloud-Kasse für die Gastronomie</div>
          <h1 className="b-d b-h1 b-rise" style={{ animationDelay: ".2s" }}>
            Weniger Kasse im Kopf.<br /><span className="b-grad">Mehr Gastgeber.</span>
          </h1>
          <div className="b-rise b-hero-row" style={{ animationDelay: ".35s" }}>
            <p className="b-hero-p">Läuft im Browser und auf dem Handgerät. TSE aus der Cloud, null Server im Betrieb, Updates über Nacht. Damit Ihr Team beim Gast ist – nicht an der Kasse.</p>
            <div className="b-hero-btns">
              <Link href="/demo" className="b-btn b-btn-acc">Demo buchen<Arrow /></Link>
              <a href="#szenen" className="b-btn b-btn-ghost">In 30 Sekunden erklärt</a>
            </div>
          </div>
          <div className="b-feedbar">
            <div className="b-marq">
              {feed.map(([a, b, href], k) => (
                <Link key={k} href={href} className="b-feed" aria-hidden={k >= FEED.length} tabIndex={k >= FEED.length ? -1 : undefined}><i /><b>{a}</b> {b}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Unsere Kunden" className="b-logos">
        <div className="b-marq b-marq-slow">
          {logos.map(([file, name, cls], k) => (
            <img key={k} src={`/lp/logos/${file}.png`} alt={k < LOGOS.length ? name : ""} aria-hidden={k >= LOGOS.length} className={cls} />
          ))}
          <span className="gap" />
        </div>
      </section>

      <section id="szenen" className="b-scenes">
        <div className="b-aurora" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap b-story">
          <div className="b-sticky">
            <span className="b-m b-kicker">Drei Szenen, eine Kasse</span>
            <h2 className="b-d b-h2">Der Service läuft. Die Kasse auch.</h2>
            <p className="b-lead">Am Tisch, an der Theke, im Büro: Matrix NXT ist dieselbe Kasse auf jedem Gerät – im Browser, als Android-App, mit Cloud-TSE. Kein Server, kein Techniker, kein Stillstand.</p>
            <div className="b-nums">
              <div className="b-num"><b className="b-d">0</b><span>Server im Betrieb</span></div>
              <div className="b-num"><b className="b-d">7</b><span>Tage Support</span></div>
              <div className="b-num"><b className="b-d">30<em>+</em></b><span>Jahre Gastro-Kassen</span></div>
            </div>
          </div>
          <div className="b-scene-col">
            <div className="b-scene s1">
              <div className="b-stage" style={{ height: 300 }}>
                <div className="b-device" style={{ left: 0, right: 0, top: 0, height: 300, perspective: 1200 }}>
                  <div className="tab-screen">
                    <div className="tab-side"><span className="brand">matrix NXT</span><span className="on">Restaurant</span><span>Terrasse</span><span>Bar</span></div>
                    <div className="tab-main">
                      <div className="t busy" style={{ left: 18, top: 16 }}>T1<span>48,20 €</span></div>
                      <div className="t free" style={{ left: 96, top: 16 }}>T2 frei</div>
                      <div className="t hot" style={{ left: 174, top: 16 }}>T3<span>112,90 €</span></div>
                      <div className="t round" style={{ left: 252, top: 12 }}>T4</div>
                      <div className="t busy" style={{ left: 18, top: 84, width: 104 }}>T6 · 6 Gäste<span>96,40 € · Gang 3</span></div>
                      <div className="t free" style={{ left: 136, top: 84 }}>T7 frei</div>
                      <div className="t res" style={{ left: 214, top: 84 }}>Stammtisch 19:30</div>
                      <div className="t busy" style={{ left: 18, top: 152 }}>T11<span>18,50 €</span></div>
                      <div className="t busy" style={{ left: 96, top: 152 }}>T12<span>18,00 €</span></div>
                      <div className="tab-sum">8 Tische offen · 412,50 €</div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="b-m b-kicker">01 · Am Tisch</span>
              <h3 className="b-d">Tischplan, der den Laden kennt</h3>
              <p>Räume frei gestalten, offene Beträge auf einen Blick, Gänge getrennt an Küche und Bar. Mehrere Kassen am selben Tisch – Bons landen automatisch richtig.</p>
            </div>
            <div className="b-scene s2">
              <div className="b-stage" style={{ height: 400 }}>
                <div className="b-device" style={{ right: 20, top: 0, width: 200, height: 400, perspective: 1200 }}>
                  <div className="phone">
                    <div className="phone-head">Tisch 6 · 6 Gäste<br /><b>140,70 €</b></div>
                    <div className="phone-list">
                      <span>2× Kürbissuppe <b>15,80</b></span><span>3× Schnitzel <b>56,70</b></span><span>1× Risotto <b>17,90</b></span><span>4× Wasser 0,75 <b>22,00</b></span><span>2× Riesling 0,2 <b>13,80</b></span>
                    </div>
                    <div className="phone-btns"><span style={{ background: "#00ABE5" }}>Runde senden</span><span style={{ background: "#fff" }}>Tap to Pay</span></div>
                  </div>
                </div>
              </div>
              <span className="b-m b-kicker">02 · Mobil</span>
              <h3 className="b-d">Handgerät mit Tap to Pay</h3>
              <p>Bestellen, splitten, kassieren direkt am Tisch. Karte ans Gerät, Trinkgeld inklusive, Bon aus dem Gürteldrucker – synchron mit allen Kassen im Betrieb.</p>
            </div>
            <div className="b-scene s3">
              <div className="b-stage" style={{ height: 230 }}>
                <div className="b-device" style={{ left: 0, right: 0, top: 0, height: 230 }}>
                  <div className="office">
                    <div className="office-head"><span>Matrix Office · Tagesumsatz</span><span className="ok">● Z-Bon 23:45 automatisch</span></div>
                    <div className="bars"><span style={{ height: "30%" }} /><span style={{ height: "48%" }} /><span style={{ height: "40%" }} /><span className="hi" style={{ height: "78%" }} /><span style={{ height: "62%" }} /><span className="hi" style={{ height: "100%" }} /><span style={{ height: "55%" }} /><span style={{ height: "70%" }} /></div>
                    <div className="office-foot"><span>Nach Artikel</span><span>Nach Kellner</span><span>Storno</span><span>Rabatt</span><span className="r">DSFinV-K-Export</span></div>
                  </div>
                </div>
              </div>
              <span className="b-m b-kicker">03 · Im Büro, oder auf dem Sofa</span>
              <h3 className="b-d">Office überall</h3>
              <p>Z-Bon von Hand oder automatisch, Berichte nach Tag, Artikel und Kellner, Rechte pro Gruppe – im Browser, TSE-signiert, DSFinV-K-ready.</p>
            </div>
          </div>
        </div>
      </section>

      <BranchenTabs />

      <section className="b-railsec" aria-label="Funktionen">
        <div className="b-wrap b-railhead">
          <h2 className="b-d">Alles, was der Service braucht. <span>Nichts, was ihn bremst.</span></h2>
          <span className="b-m b-railhint">← scrollen →</span>
        </div>
        <div className="b-rail">
          {CARDS.map((c) => (
            <div key={c.n} className={`b-card ${c.acc ? "acc" : ""}`}>
              <span className="n b-d">{c.n}</span>
              <div><h3 className="b-d">{c.t}</h3><p>{c.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="b-hand" aria-label="Alles aus einer Hand">
        <div className="b-aurora b-aurora-wide" aria-hidden="true" />
        <div className="b-wrap b-hand-in">
          <span className="b-m b-kicker">Kasse. Payment. Personal.</span>
          <h2 className="b-d b-big"><span className="b-grad">Eine Hand.</span></h2>
          <p>Kasse, Payment und Personalmanagement von einem Anbieter. Ein Ansprechpartner, eine Abrechnung, ein Support an sieben Tagen – aus Hannover, von Leuten aus der Gastronomie.</p>
        </div>
      </section>

      <section id="familie" className="b-famsec" aria-label="Produkte">
        <div className="b-wrap">
          <div className="b-fam">
            <Link href="/nxt" className="f-nxt"><span className="b-m k">Cloud-Kasse</span><span className="b-d name">matrix <em>NXT</em></span><span className="sub">Browser · Android · Cloud-TSE</span><span className="fam-more">Browser und Android-App, Cloud-TSE, Updates automatisch. Für neue Betriebe und den Umstieg von Matrix Classic.</span></Link>
            <Link href="/pos" className="f-pos"><span className="b-m k">Stationär &amp; integriert</span><span className="b-d name">matrix <em>POS</em></span><span className="sub">Stationär · NEO · CONGA · 30+ Schnittstellen</span><span className="fam-more">Das bewährte System mit NEO fürs Mobile und CONGA fürs Personal. Über 30 Schnittstellen im Einsatz – PMS, Warenwirtschaft, DATEV, Schank.</span></Link>
            <Link href="/pay" className="f-pay"><span className="b-m k">Alle Zahlarten</span><span className="b-d name">matrix <em>PAY</em></span><span className="sub">Terminals · Tap to Pay · eine Abrechnung</span><span className="fam-more">Eine Abrechnung für alles – Terminals von Adyen, Tap to Pay am Handgerät, Trinkgeld inklusive. Mit NXT, mit POS oder eigenständig.</span></Link>
          </div>
        </div>
      </section>

      <section className="b-quote" aria-label="Referenz">
        <div className="b-wrap b-quote-in">
          <span className="b-d b-qmark" aria-hidden="true">„</span>
          <figure>
            <blockquote className="b-d">Matrix Payment läuft reibungslos mit unserer Hotelsoftware. Ein großer Vorteil: Es gibt nur noch eine Payment-Abrechnung.</blockquote>
            <figcaption><span className="b-avatar">[Foto]</span><div><b>Florian Sbrizzai</b><small>Stellv. Direktor, Parkhotel Laim, München</small></div></figcaption>
          </figure>
        </div>
      </section>

      <section id="demo" className="b-demo">
        <img src="/lp/hero-poster.jpg" alt="" aria-hidden="true" className="b-demo-img" />
        <div className="b-demo-tint" aria-hidden="true" />
        <div className="b-demo-shade" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap b-demo-in">
          <h2 className="b-d">Sehen Sie NXT mit Ihren Tischen.</h2>
          <p>30 Minuten, online oder vor Ort. Wir bringen Ihre Artikel und Ihren Raumplan mit – dann spielen wir Ihren Abend einmal durch.</p>
          <div className="b-demo-btns"><Link href="/demo" className="b-btn b-btn-white">Demo buchen</Link><Link href="/demo#rueckruf" className="b-btn b-btn-ghost">Rückruf vereinbaren</Link></div>
        </div>
      </section>

      <footer className="b-foot">
        <div className="b-wrap b-foot-in">
          <span>© {new Date().getFullYear()} Matrix POS GmbH · Eckenerstraße 2 · 30179 Hannover · <a href="mailto:sales@matrixpos.de">sales@matrixpos.de</a></span>
          <div className="b-foot-links">
            <a href={SUPPORT_PORTAL} target="_blank" rel="noopener noreferrer">Supportportal</a>
            <Link href="/partner">Partner werden</Link>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/agb">AGB</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
