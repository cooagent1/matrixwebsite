/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { NAV, SUPPORT_PORTAL } from "@/lib/nav";
import { BranchenTabs } from "./BranchenTabs";
import { ScenesCarousel } from "./ScenesCarousel";

// Branchen-Laufband im Hero (Robert 31.10.: Domänen statt Kassen-Feed, eigenes Design), Ziele = Branchenseiten.
const FEED: { name: string; hint: string; slug: string }[] = [
  { name: "Restaurant", hint: "Gänge, Splitten, Tischplan", slug: "restaurant" },
  { name: "Hotel", hint: "Rechnung aufs Zimmer", slug: "hotel" },
  { name: "Bar & Café", hint: "Favoriten vorne, Schlange kurz", slug: "bar-cafe" },
  { name: "Biergarten & Terrasse", hint: "Mobil kassieren am Tisch", slug: "aussengastronomie" },
  { name: "Freizeitpark", hint: "Hunderte Kassen, ein Office", slug: "freizeitpark" },
  { name: "Food Court", hint: "Mehrere Stationen, ein Bon", slug: "foodcourt" },
  { name: "Systemgastronomie", hint: "Ein Standard für jede Filiale", slug: "systemgastronomie" },
];

const ICONS: Record<string, string> = {"restaurant": "M7 3v8M10 3v8M8.5 11v10M7 3c0 3 0 5 1.5 5S10 6 10 3M16 3c-1.5 2-2 5-2 8h3v10", "hotel": "M3 18V8M3 12h18v6M3 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4M21 18v-6a2 2 0 0 0-2-2h-8", "bar-cafe": "M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8zM16 9h2a2 2 0 0 1 0 4h-2M6 21h8", "aussengastronomie": "M12 3C7 3 3 7 3 12h18c0-5-4-9-9-9zM12 12v9M12 21h3", "freizeitpark": "M12 3v16M4 11h16M6.3 5.3l11.4 11.4M17.7 5.3L6.3 16.7M8 21h8M12 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "foodcourt": "M3 17h18M5 17a7 7 0 0 1 14 0M12 8V6M10 6h4", "systemgastronomie": "M3 21h18M5 21V9l5-3v15M14 21V11h5v10M8 11h1M8 14h1M8 17h1M16 14h1M16 17h1"};

function BranchIcon({ slug }: { slug: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[slug]} />
    </svg>
  );
}

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
              {feed.map((f, k) => (
                <Link key={k} href={`/branchen/${f.slug}`} className="b-feed" aria-hidden={k >= FEED.length} tabIndex={k >= FEED.length ? -1 : undefined}>
                  <b><i><BranchIcon slug={f.slug} /></i>{f.name}</b><em>{f.hint}</em>
                </Link>
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

      <ScenesCarousel />

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
