import type { Metadata } from "next";
import Link from "next/link";
import { getTeam } from "@/lib/cms";
import { TeamGrid } from "@/components/cms/TeamGrid";

export const metadata: Metadata = {
  title: { absolute: "Über Matrix POS: 30 Jahre Gastro-Kassen aus Hannover | Matrix POS" },
  description:
    "Matrix POS GmbH, Hannover: seit über 30 Jahren Kassen für Gastronomie und Hotellerie. Über 60 Mitarbeitende entwickeln und betreuen Matrix NXT, POS, PAY und CONGA.",
};

const LOGOS: [string, string, string][] = [
  ["atlantic-hotels", "Atlantic Hotels", ""],
  ["25hours-hotels", "25hours Hotels", ""],
  ["europa-park", "Europa-Park", ""],
  ["hofbraeuhaus", "Hofbräuhaus München", "tall"],
  ["dinzler", "Dinzler", "mid"],
  ["estrel", "Estrel Berlin", ""],
  ["gop", "GOP Varieté", "mid"],
];

const VALUES = [
  { n: "01", t: "Konfiguration", d: "Artikel, Warengruppen, Artikelzwänge und Schnittstellen richtet unser Professional Services auf Ihren Betrieb ein." },
  { n: "02", t: "Nähe", d: "Telefonsupport an 7 Tagen die Woche aus Hannover, Fernwartung per TeamViewer QuickSupport." },
  { n: "03", t: "Offenheit", d: "Über 40 Schnittstellen laufen im Betrieb, darunter protel, Oracle Opera und DATEV." },
  { n: "04", t: "Ehrlichkeit", d: "Was in Arbeit ist, steht bei uns als in Arbeit da, zum Beispiel der Offline-Betrieb von Matrix NXT." },
];

const TEAM = [
  { t: "Support", d: "Fachleute aus Service und Küche.", k: "7 Tage die Woche" },
  { t: "Professional Services", d: "Richtet die Kasse ein und schult Ihr Personal, vor Ort oder per Fernwartung.", k: "Einführung und Schulung" },
  { t: "Entwicklung", d: "Matrix NXT, POS, PAY und CONGA entstehen in Hannover.", k: "Vier Produkte" },
  { t: "Vertrieb", d: "Demo und Angebot für Gastronomie und Hotellerie.", k: "Beratung" },
];

// Design: Unterseite ohne Hero-Video, Stil wie /partner (6.11.2026). Leitungsteam aus Supabase (team_members), alle 5 Minuten neu.
export const revalidate = 300;

export default async function UeberUnsPage() {
  const logos = [...LOGOS, ...LOGOS];
  // ANNAHME (Nachtpaket 07.11.): Management erst zeigen, wenn das CMS Einträge mit Namen liefert, keine „Name folgt“-Karten.
  const team = (await getTeam()).filter((m) => m.name);
  return (
    <>
      <section className="sub-hero" id="top">
        <div className="b-aurora" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-hero-in">
          <span className="b-m b-kicker">Über uns</span>
          <h1 className="b-d sub-h1">Wer wir sind.</h1>
          <p className="sub-lead" style={{ maxWidth: 720 }}>Seit über 30 Jahren Kassen für Gastronomie und Hotellerie aus Hannover. Im Support arbeiten Fachleute aus Service und Küche.</p>
          <div className="sub-btns"><Link href="/demo" className="b-btn b-btn-acc">Demo buchen</Link><Link href="/jobs" className="b-btn b-btn-ghost">Jobs</Link></div>
          <ul className="b-nums sub-nums ue-nums">
            <li className="b-num"><b className="b-d">30<em>+</em></b><span>Jahre Kassen für die Gastronomie</span></li>
            <li className="b-num"><b className="b-d">10.000<em>+</em></b><span>Installationen in Gastronomie und Hotellerie</span></li>
            <li className="b-num"><b className="b-d">60<em>+</em></b><span>Gastro-Profis im Team</span></li>
            <li className="b-num"><b className="b-d">7</b><span>Tage die Woche Support</span></li>
          </ul>
        </div>
      </section>


      <section id="geschichte" className="sub-sec">
        <div className="b-wrap ue-two">
          <div className="pt-col">
            <span className="b-m b-kicker">Geschichte</span>
            <h2 className="b-d sub-h2">Seit über 30 Jahren die Matrix.</h2>
            <p className="sub-p">Aus der stationären Kasse Matrix POS sind Matrix PAY für das Bezahlen, CONGA für Dienstplan und Zeiterfassung und die Cloud-Kasse Matrix NXT entstanden.</p>
            <p className="sub-p">Im Januar 2025 hat Everfield den Gastronomiekassenbereich der 42 GmbH übernommen. Seitdem arbeiten wir als Matrix POS GmbH, weiter in Hannover.</p>
          </div>
          <ol className="ue-line">
            <li><span className="b-m">Kasse</span><b className="b-d">POS</b><p>Die stationäre Kasse mit Server im Haus. Kassiert auch ohne Internet.</p></li>
            <li><span className="b-m">Bezahlen</span><b className="b-d">PAY</b><p>Terminals und Tap to Pay, abgewickelt über Adyen. Mit POS geht der Betrag direkt ans Terminal.</p></li>
            <li><span className="b-m">Personal</span><b className="b-d">CONGA</b><p>Dienstplan und Zeiterfassung für Matrix POS.</p></li>
            <li className="on"><span className="b-m">Cloud</span><b className="b-d">NXT</b><p>Die Cloud-Kasse ohne Server im Haus. Läuft im Browser und auf Android, die Cloud-TSE ist enthalten.</p></li>
          </ol>
        </div>
      </section>

      <section id="werte" className="sub-sec alt">
        <div className="b-wrap">
          <span className="b-m b-kicker">Wofür wir stehen</span>
          <h2 className="b-d sub-h2">Wie wir arbeiten.</h2>
          <ul className="sub-grid ue-grid4">
            {VALUES.map((v) => (
              <li key={v.n} className="sub-card"><span className="n b-d">{v.n}</span><h3>{v.t}</h3><p>{v.d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="team" className="sub-sec">
        <div className="b-wrap">
          <span className="b-m b-kicker">Das Team</span>
          <h2 className="b-d sub-h2">Über 60 Leute in Hannover.</h2>
          <p className="sub-p">Entwicklung, Support, Professional Services, Vertrieb und Verwaltung arbeiten am selben Standort in Hannover.</p>
          <div className="ue-team">
            {TEAM.map((t) => (
              <div key={t.t} className="ue-area">
                <span className="b-m pt-lbl">{t.k}</span>
                <h3 className="b-d">{t.t}</h3>
                <p>{t.d}</p>
              </div>
            ))}
          </div>
          <p className="pt-note">Offene Stellen: <Link href="/jobs" className="link">Jobs bei Matrix</Link>.</p>
        </div>
      </section>

      {team.length > 0 && (
        <section id="management" className="sub-sec alt">
          <div className="b-wrap">
            <span className="b-m b-kicker">Management</span>
            <h2 className="b-d sub-h2">Wer Matrix führt.</h2>
            <p className="sub-p">Geschäftsführung und Bereichsleitungen.</p>
            <TeamGrid team={team} />
          </div>
        </section>
      )}

      <section id="partner" className="sub-sec">
        <div className="b-wrap ue-two">
          <div className="pt-col">
            <span className="b-m b-kicker">Partner</span>
            <h2 className="b-d sub-h2">Mit wem wir arbeiten.</h2>
            <p className="sub-p">Zwei Partner laufen fest in Matrix: Adyen für das Bezahlen, Fiskaly für die Cloud-TSE. Dazu kommen über 40 Schnittstellen, etwa zu protel und DATEV, und Vertriebspartner in den Regionen.</p>
            <div className="sub-btns"><Link href="/partner" className="b-btn b-btn-ghost">Mehr zu Partnern</Link></div>
          </div>
          <div className="pt-int ue-int">
            <div className="pt-node int"><span>Adyen</span><small>Zahlung, Terminals, Tap to Pay</small></div>
            <div className="pt-node int"><span>Fiskaly</span><small>Cloud-TSE, KassenSichV</small></div>
            <div className="pt-node int"><span>Orderman</span><small>Handgeräte, zertifiziert</small></div>
          </div>
        </div>
        {/* ANNAHME (Nachtpaket 07.11.): Logo-Leiste nur hier bei „Mit wem wir arbeiten“, nicht mehr unter dem Hero. */}
        <div role="region" aria-label="Betriebe, die mit Matrix arbeiten" className="b-logos ue-logos">
          <div className="b-marq b-marq-slow">
            {logos.map(([file, name, cls], k) => (
              <img key={k} src={`/lp/logos/${file}.png`} alt={k < LOGOS.length ? name : ""} aria-hidden={k >= LOGOS.length} className={cls} />
            ))}
            <span className="gap" />
          </div>
        </div>
      </section>

      <section id="standort" className="sub-sec alt">
        <div className="b-wrap ue-two">
          <div className="pt-col">
            <span className="b-m b-kicker">Standort</span>
            <h2 className="b-d sub-h2">Hannover, Eckenerstraße 2.</h2>
            <p className="sub-p">Demos zeigen wir hier in Hannover oder bei Ihnen im Betrieb.</p>
          </div>
          <div className="ue-addr">
            <span className="b-d">Matrix POS GmbH</span>
            <p>Eckenerstraße 2<br />30179 Hannover</p>
            <p><a href="tel:+495115929380">+49 511 592938-0</a><br /><a href="mailto:info@matrixpos.de">info@matrixpos.de</a></p>
            <a href="https://www.google.com/maps/search/?api=1&query=Eckenerstra%C3%9Fe+2%2C+30179+Hannover" target="_blank" rel="noopener noreferrer" className="link">Anfahrt in Google Maps</a>
          </div>
        </div>
      </section>

      <section className="sub-close">
        <div className="b-aurora b-aurora-wide" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-close-in">
          <h2 className="b-d sub-h1">Lernen Sie uns kennen.</h2>
          <p className="sub-p">Demo in Hannover, bei Ihnen im Betrieb oder per Video.</p>
          <div className="sub-btns"><Link href="/demo" className="b-btn b-btn-white">Demo buchen</Link><Link href="/jobs" className="b-btn b-btn-ghost">Jobs</Link></div>
        </div>
      </section>
    </>
  );
}
