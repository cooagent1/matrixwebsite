/* eslint-disable @next/next/no-img-element */
import { HeroVideo } from "./HeroVideo";
import Link from "next/link";
import { LpFooter, LpHeader } from "./Chrome";
import { BranchenTabs } from "./BranchenTabs";
import { ScenesCarousel } from "./ScenesCarousel";
import { Zahlen } from "./Zahlen";
import { QuoteCarousel } from "./QuoteCarousel";
import { FAQ, LAW } from "./startseite-data";
import { T } from "../T";

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
          <h1 className="b-d b-h1"><T k="start.hero.h1" /></h1>
          <div className="b-rise b-hero-btns" style={{ animationDelay: ".1s" }}>
            <Link href="/demo" className="b-btn b-btn-acc"><T k="start.hero.cta1" /><Arrow /></Link>
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

      <Zahlen />

      <ScenesCarousel />

      <BranchenTabs />

      <section id="familie" className="b-famsec" aria-label="Produkte">
        {/* Startseite 07.11.: NXT ist der Star (offen breiter), POS wird passiv verkauft. Funktionen-Leiste und PAY-Block gestrichen. */}
        <div className="b-wrap">
          <div className="b-fam">
            <Link href="/kassensysteme/nxt" className="f-nxt"><span className="b-m k"><T k="start.familie.nxt.kicker" /></span><span className="b-d name">matrix <em>NXT</em></span><span className="sub"><T k="start.familie.nxt.sub" /></span><span className="fam-more"><T k="start.familie.nxt.text" /></span></Link>
            <Link href="/kassensysteme/pos" className="f-pos"><span className="b-m k"><T k="start.familie.pos.kicker" /></span><span className="b-d name">matrix <em>POS</em></span><span className="sub"><T k="start.familie.pos.sub" /></span><span className="fam-more"><T k="start.familie.pos.text" /></span></Link>
            <Link href="/pay" className="f-pay"><span className="b-m k"><T k="start.familie.pay.kicker" /></span><span className="b-d name">matrix <em>PAY</em></span><span className="sub"><T k="start.familie.pay.sub" /></span><span className="fam-more"><T k="start.familie.pay.text" /></span></Link>
          </div>
        </div>
      </section>

      <QuoteCarousel />

      <section className="sub-sec b-law" aria-label="Kasse und Gesetz">
        <div className="b-wrap">
          <span className="b-m b-kicker"><T k="start.gesetz.kicker" /></span>
          <h2 className="b-d sub-h2"><T k="start.gesetz.h2" /></h2>
          <ul className="sub-grid b-law-grid">
            {LAW.map((c) => (
              <li key={c.n} className="sub-card"><span className="n b-d">{c.n}</span><h3 className="b-d"><T k={c.t} /></h3><p><T k={c.d} /></p></li>
            ))}
          </ul>
          <p className="sub-p"><T k="start.gesetz.at" /> <Link href="/faq#gesetz" className="link">Fragen zu Kasse und Gesetz</Link></p>
        </div>
      </section>

      <section id="faq" className="sub-sec" aria-label="Häufige Fragen">
        <div className="b-wrap">
          <span className="b-m b-kicker">Häufige Fragen</span>
          <h2 className="b-d sub-h2"><T k="start.faq.h2" /></h2>
          <div className="sub-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary className="b-d"><T k={f.q} /><svg className="sub-faq-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
                <div>
                  <p><T k={f.a} /></p>
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
          <h2 className="b-d"><T k="start.demo.h2" /></h2>
          <p><T k="start.demo.text" /></p>
          <div className="b-demo-btns"><Link href="/demo" className="b-btn b-btn-white">Demo buchen</Link><Link href="/demo#rueckruf" className="b-btn b-btn-ghost">Rückruf vereinbaren</Link></div>
        </div>
      </section>
      </main>

      <LpFooter />
    </>
  );
}
