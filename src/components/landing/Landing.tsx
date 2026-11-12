/* eslint-disable @next/next/no-img-element */
import { HeroVideo } from "./HeroVideo";
import Link from "next/link";
import { LpFooter, LpHeader } from "./Chrome";
import { BranchenTabs } from "./BranchenTabs";
import { ScenesCarousel } from "./ScenesCarousel";
import { StickyCta } from "./StickyCta";
import { Zeitstrahl } from "./Zeitstrahl";
import { Inline } from "../Inline";
import { T, TEXTE, isPlaceholder } from "../T";

// Startseite nach Konzept „Matrix NXT – Landingpage: Story & Konzept“ (Claude Doc, 12.11.2026):
// sieben Sektionen. Versprechen (Hero) → Beweis (Beweisband) → Produkt (Szenen) → Passung (Branchen)
// → Herkunft → Kundenstimme → Fragen und Demo. Texte in texte.json (start.*), Quelle Tab „Copy“.
// Entfallen gegenüber dem 07.11.: Logo-Laufband und Zahlenleiste (→ Beweisband), Produkt-Trio
// (→ Textlinks in Herkunft), Kasse und Gesetz, Kundenstimmen-Karussell (→ ein Zitat), Signature-Bausteine (→ /bausteine).

const LOGOS = [
  ["atlantic-hotels", "Atlantic Hotels", ""],
  ["25hours-hotels", "25hours Hotels", ""],
  ["europa-park", "Europa-Park", ""],
  ["hofbraeuhaus", "Hofbräuhaus München", "tall"],
  ["dinzler", "Dinzler", "mid"],
  ["estrel", "Estrel Berlin", ""],
  ["gop", "GOP Varieté", "mid"],
];

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// „30+“ → 30 mit abgesetztem Plus
function Zahl({ n }: { n: number }) {
  const z = TEXTE[`start.beweis.zahl${n}`].text;
  const m = z.match(/^(.*?)(\+?)$/);
  return (
    <div className="b-num">
      <b className="b-d">{m?.[1]}{m?.[2] && <em>+</em>}</b>
      <span><strong><T k={`start.beweis.zahl${n}.einheit`} /></strong> <T k={`start.beweis.zahl${n}.label`} /></span>
    </div>
  );
}

// Zeitleiste: Punkte mit offenem Jahr (Platzhalter) werden nicht ausgeliefert.
const ZEIT = [1, 2, 3, 4, 5].filter((n) => !isPlaceholder(`start.zeit${n}.jahr`));

export const START_FAQ = [1, 2, 3, 4];

export function Landing() {
  return (
    <>
      <a href="#main" className="skip-link">Zum Inhalt springen</a>
      <main id="main">
        {/* 1 Hero: nackt (Robert 12.11.), H1 ist die Suchbegriff-Zeile, der Claim die große Schrift */}
        <section className="b-hero" id="top">
          <HeroVideo />
          <div className="b-hero-shade" aria-hidden="true" />
          <div className="b-grain" aria-hidden="true" />
          <LpHeader />
          <div className="b-wrap b-hero-body">
            <h1 className="b-rise b-m b-hero-zeile"><T k="start.hero.zeile" /></h1>
            <p className="b-d b-h1"><T k="start.hero.claim" /></p>
            <div className="b-rise b-hero-btns" style={{ animationDelay: ".1s" }}>
              <Link href="/demo" className="b-btn b-btn-acc" id="hero-cta"><T k="start.hero.cta1" /><Arrow /></Link>
            </div>
          </div>
        </section>

        {/* 2 Beweisband: drei Zahlen und Kundenlogos in einem Block */}
        <section className="b-beweis" aria-labelledby="beweis-h">
          <div className="b-wrap">
            <h2 className="b-d b-beweis-h" id="beweis-h"><T k="start.beweis.h2" /></h2>
            <div className="b-zahlen">
              <div className="b-nums">{[1, 2, 3].map((n) => <Zahl key={n} n={n} />)}</div>
            </div>
            <p className="b-m b-beweis-logos-l"><T k="start.beweis.logos" /></p>
            <ul className="b-logos-row">
              {LOGOS.map(([file, name, cls]) => (
                <li key={file}><img src={`/lp/logos/${file}.png`} alt={name} className={cls} loading="lazy" /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 Ein Abend mit Matrix NXT */}
        <ScenesCarousel />

        {/* 4 Branchen */}
        <BranchenTabs />

        {/* 5 Herkunft */}
        <section className="sub-sec b-herkunft" aria-labelledby="herkunft-h">
          <div className="b-wrap">
            <div className="b-herkunft-grid">
              <div className="b-herkunft-kopf">
                <h2 className="b-d sub-h2" id="herkunft-h"><T k="start.herkunft.h2" /></h2>
                <p className="sub-p b-herkunft-p"><T k="start.herkunft.text" /></p>
              </div>
              {ZEIT.length > 0 && (
                <Zeitstrahl>
                  {ZEIT.map((n) => (
                    <li key={n}><b className="b-d"><T k={`start.zeit${n}.jahr`} /></b><span><T k={`start.zeit${n}.text`} /></span></li>
                  ))}
                </Zeitstrahl>
              )}
            </div>
            <div className="b-hand-row">
              <div>
                <h3 className="b-d b-herkunft-h3"><T k="start.herkunft.h3" /></h3>
                <p className="sub-p"><T k="start.herkunft.hand" /></p>
              </div>
              <div className="b-bestand">
                <p className="sub-p"><T k="start.herkunft.bestand" /></p>
                <p className="b-bestand-links">
                  <Link href="/kassensysteme/pos" className="link"><T k="start.herkunft.link.pos" /> →</Link>
                  <Link href="/pay" className="link"><T k="start.herkunft.link.pay" /> →</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Kundenstimme: ein Zitat */}
        <section className="sub-sec b-stimme" aria-label="Kundenstimme">
          <div className="b-wrap">
            <figure className="b-stimme-fig">
              <blockquote className="b-d"><T k="start.stimme.zitat" /></blockquote>
              <figcaption><b><T k="start.stimme.name" /></b>, <T k="start.stimme.rolle" /></figcaption>
            </figure>
            <p className="sub-p"><Link href="/ueber-uns#partner" className="link"><T k="start.stimme.link" /> →</Link></p>
          </div>
        </section>

        {/* 7 Fragen und Demo */}
        <section id="fragen" className="sub-sec" aria-labelledby="fragen-h">
          <div className="b-wrap">
            <h2 className="b-d sub-h2" id="fragen-h"><T k="start.fragen.h2" /></h2>
            <div className="sub-faq">
              {START_FAQ.map((n) => (
                <details key={n}>
                  <summary><h3 className="b-d b-faq-q"><T k={`start.faq${n}.frage`} /></h3><svg className="sub-faq-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
                  <div><p><Inline text={TEXTE[`start.faq${n}.antwort`].text} /></p></div>
                </details>
              ))}
            </div>
            <p className="sub-p"><Link href="/faq" className="link">Alle Fragen</Link></p>
          </div>
        </section>

        <section id="demo" className="b-demo" aria-labelledby="demo-h">
          <img src="/lp/fotos/nxt-bistro.jpg" alt="" aria-hidden="true" className="b-demo-img" loading="lazy" />
          <div className="b-demo-tint" aria-hidden="true" />
          <div className="b-demo-shade" aria-hidden="true" />
          <div className="b-grain" aria-hidden="true" />
          <div className="b-wrap b-demo-in">
            <h2 className="b-d" id="demo-h"><T k="start.demo.h2" /></h2>
            <p><Inline text={TEXTE["start.demo.text"].text} /></p>
            <div className="b-demo-btns">
              <Link href="/demo" className="b-btn b-btn-acc">Demo buchen</Link>
              <Link href="/demo#rueckruf" className="b-btn b-btn-ghost">Rückruf vereinbaren</Link>
            </div>
            <p className="b-demo-alt"><a href="mailto:sales@matrixpos.de">sales@matrixpos.de</a></p>
          </div>
        </section>
      </main>

      <StickyCta />
      <LpFooter />
    </>
  );
}
