/* eslint-disable @next/next/no-img-element */
import { HeroVideo } from "./HeroVideo";
import Link from "next/link";
import { LpFooter, LpHeader } from "./Chrome";
import { BranchenTabs } from "./BranchenTabs";
import { ScenesCarousel } from "./ScenesCarousel";
import { QuoteCarousel } from "./QuoteCarousel";
import { FAQ, LAW } from "./startseite-data";

const LOGOS = [
  ["atlantic-hotels", "Atlantic Hotels", ""],
  ["25hours-hotels", "25hours Hotels", ""],
  ["europa-park", "Europa-Park", ""],
  ["hofbraeuhaus", "Hofbräuhaus München", "tall"],
  ["dinzler", "Dinzler", "mid"],
  ["estrel", "Estrel Berlin", ""],
  ["gop", "GOP Varieté", "mid"],
];

const CARDS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Tischplan mit Gängen", d: "Mehrere Räume, offene Beträge, Tische zusammenlegen und umsetzen." },
  { n: "02", t: "Splitten und kassieren", d: "Rechnung nach Person oder Position splitten. Bar, Terminal oder Tap to Pay am Handgerät." },
  { n: "03", t: "Cloud-TSE ohne Stick", d: "Jeder Vorgang signiert über Fiskaly. KassenSichV, DSFinV-K, RKSV für Österreich." },
  { n: "04", t: "Bons an Küche und Bar", d: "Die Bonierung geht je Warengruppe an den Drucker in Küche oder Bar, mit Gangfolge." },
  { n: "05", t: "Layout nach Betrieb", d: "Favoritenleiste, mehrere Layouts in einer Kasse, heller und dunkler Modus." },
  { n: "06", t: "Hotelsoftware in Arbeit", d: "Zimmerbuchung aus der Kasse über protel und ASA Hotel kommt als Update. Dann mit einer Payment-Abrechnung über Matrix PAY." },
  { n: "07", t: "Neues Gerät per Code", d: "Tablet oder Handgerät per Einrichtungscode anmelden. Updates kommen zentral, ohne Techniker." },
  { n: "08", t: "Umstieg von Matrix Classic", d: "Artikel und Personal übernehmen wir aus der bestehenden Matrix-Kasse." },
];

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Landing() {
    const logos = [...LOGOS, ...LOGOS];
  return (
    <>
      <a href="#main" className="skip-link">Zum Inhalt springen</a>
      <main id="main">
      <section className="b-hero" id="top">
        <HeroVideo />
        <div className="b-hero-shade" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />

        <LpHeader />

        <div className="b-wrap b-hero-body">
          <h1 className="b-d b-h1">Gastro-Kassen aus Hannover.</h1>
          <div className="b-rise b-hero-btns" style={{ animationDelay: ".1s" }}>
            <Link href="/demo" className="b-btn b-btn-acc">Demo buchen<Arrow /></Link>
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

      <ScenesCarousel />

      <BranchenTabs />

      <section className="b-railsec" aria-label="Funktionen">
        <div className="b-wrap b-railhead">
          <h2 className="b-d">Was im Service zählt.</h2>
          <span className="b-m b-railhint">← scrollen →</span>
        </div>
        <div className="b-rail">
          {CARDS.map((c) => (
            <div key={c.n} className="b-card">
              <span className="n b-d">{c.n}</span>
              <div><h3 className="b-d">{c.t}</h3><p>{c.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="b-hand" aria-label="Kasse und Terminal von Matrix">
        <div className="b-aurora b-aurora-wide" aria-hidden="true" />
        <div className="b-wrap b-hand-in">
          <div className="b-hand-txt">
            <span className="b-m b-kicker">Matrix NXT mit Matrix PAY</span>
            <h2 className="b-d b-big"><span className="b-grad">Kasse und Terminal von Matrix.</span></h2>
            <p>Kartenzahlungen laufen über Matrix PAY mit Adyen, alle Zahlarten in einer Abrechnung. Streikt am Samstagabend das Terminal, ruft der Betrieb dieselbe Hotline an wie für die Kasse.</p>
          </div>
          <div className="b-hand-img"><img src="/lp/fotos/nxt-terminal.jpg" alt="Matrix NXT auf dem Terminal im Restaurant" loading="lazy" /></div>
        </div>
      </section>

      <section id="familie" className="b-famsec" aria-label="Produkte">
        <div className="b-wrap">
          <div className="b-fam">
            <Link href="/nxt" className="f-nxt"><span className="b-m k">Cloud-Kasse</span><span className="b-d name">matrix <em>NXT</em></span><span className="sub">Browser · Android · Cloud-TSE</span><span className="fam-more">Browser und Android-App, Cloud-TSE, Updates von selbst. Für neue Betriebe und den Umstieg von Matrix Classic.</span></Link>
            <Link href="/pos" className="f-pos"><span className="b-m k">Stationär &amp; integriert</span><span className="b-d name">matrix <em>POS</em></span><span className="sub">Stationär · NEO · CONGA · über 40 Schnittstellen</span><span className="fam-more">Das bewährte System mit NEO fürs Mobile und CONGA fürs Personal. Über 40 Anbindungen laufen heute im Betrieb: Hotelsoftware, Warenwirtschaft, Buchhaltung.</span></Link>
            <Link href="/pay" className="f-pay"><span className="b-m k">Bezahlen</span><span className="b-d name">matrix <em>PAY</em></span><span className="sub">Terminals · Tap to Pay · eine Abrechnung</span><span className="fam-more">Eine Abrechnung für alle Zahlarten. Terminals und Tap to Pay über Adyen. Mit NXT, mit POS oder mit einer anderen Kasse.</span></Link>
          </div>
        </div>
      </section>

      <QuoteCarousel />

      <section className="sub-sec b-law" aria-label="Kasse und Gesetz">
        <div className="b-wrap">
          <span className="b-m b-kicker">Kasse und Gesetz</span>
          <h2 className="b-d sub-h2">Was das Finanzamt verlangt.</h2>
          <ul className="sub-grid b-law-grid">
            {LAW.map((c) => (
              <li key={c.n} className="sub-card"><span className="n b-d">{c.n}</span><h3 className="b-d">{c.t}</h3><p>{c.d}</p></li>
            ))}
          </ul>
          <p className="sub-p">In Österreich signiert Matrix NXT nach RKSV. <Link href="/kasse-und-gesetz" className="link">Mehr zu Kasse und Gesetz</Link></p>
        </div>
      </section>

      <section id="faq" className="sub-sec" aria-label="Häufige Fragen">
        <div className="b-wrap">
          <span className="b-m b-kicker">Häufige Fragen</span>
          <h2 className="b-d sub-h2">Fragen aus dem Betrieb.</h2>
          <div className="sub-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary className="b-d">{f.q}<svg className="sub-faq-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
                <div>
                  <p>{f.a}</p>
                  {f.link && <p><Link href={f.link.href} className="link">{f.link.label}</Link></p>}
                </div>
              </details>
            ))}
          </div>
          <p className="sub-p"><Link href="/faq" className="link">Alle Fragen</Link></p>
        </div>
      </section>

      <section id="demo" className="b-demo">
        <img src="/lp/fotos/nxt-bistro.jpg" alt="" aria-hidden="true" className="b-demo-img" loading="lazy" />
        <div className="b-demo-tint" aria-hidden="true" />
        <div className="b-demo-shade" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap b-demo-in">
          <h2 className="b-d">Sehen Sie NXT mit Ihren Tischen.</h2>
          <p>30 Minuten, online oder vor Ort. Wir richten Ihre Artikel und Ihren Raumplan ein und gehen einen Abend durch.</p>
          <div className="b-demo-btns"><Link href="/demo" className="b-btn b-btn-white">Demo buchen</Link><Link href="/demo#rueckruf" className="b-btn b-btn-ghost">Rückruf vereinbaren</Link></div>
        </div>
      </section>
      </main>

      <LpFooter />
    </>
  );
}
