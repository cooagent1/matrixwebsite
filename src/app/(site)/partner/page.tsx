import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PartnerForm } from "@/components/partner/PartnerForm";
import { PartnerTeaser } from "@/components/cms/PartnerDirectory";
import { T } from "@/components/T";

// Partnerliste kommt aus Supabase; alle 5 Minuten neu.
export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: "Partner werden: Vertrieb, Integration, Schnittstelle | Matrix POS",
  description:
    "Vertriebspartner verkaufen und betreuen Matrix vor Ort. Technologiepartner integrieren ihr Produkt in Matrix oder binden es per Schnittstelle an.",
  path: "/partner",
});

// Design: Canvas "Partnerprogramm Matrix" (6.11.2026). Zwei Blöcke: Verkaufen (Vertriebspartner), Verbinden (Technologiepartner mit Integration und Schnittstelle).
export default function PartnerPage() {
  return (
    <>
      <section className="sub-hero sub-hero-img sub-hero-card" id="top">
        <div className="b-wrap sub-hero-grid">
          <div className="sub-hero-in">
            <span className="b-m b-kicker">Partner</span>
            <h1 className="b-d sub-h1">Verkaufen oder verbinden.</h1>
            <div className="sub-hero-body">
              <p className="sub-p"><T k="seite.partner.1" /></p>
              <div className="sub-btns"><a href="#anfrage" className="b-btn b-btn-acc">Partner werden</a><a href="#ablauf" className="b-btn b-btn-ghost">So läuft es ab</a></div>
            </div>
          </div>
          <div className="sub-hero-box">
            <div className="sub-tiles">
              <a href="#vertrieb" className="sub-tile sub-tile-link"><strong>Vertriebspartner</strong><span><T k="seite.partner.2" /></span></a>
              <a href="#technologie" className="sub-tile sub-tile-link"><strong>Technologiepartner</strong><span><T k="seite.partner.3" /></span></a>
              <Link href="/partner/verzeichnis" className="sub-tile sub-tile-link"><strong>Partnerverzeichnis</strong><span><T k="seite.partner.4" /></span></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="vertrieb" className="pt-sec">
        <div className="b-wrap">
          <div className="pt-block pt-vert">
            <div className="pt-two">
              <div className="pt-col">
                <span className="b-m pt-lbl c-vert">Weg 1 · Verkaufen</span>
                <h2 className="b-d pt-h2">Vertriebspartner</h2>
                <p className="pt-lead"><T k="seite.partner.5" /></p>
                <div className="b-devs"><span className="b-m b-dev">Kassenhändler</span><span className="b-m b-dev">IT-Dienstleister Gastronomie</span><span className="b-m b-dev">Payment-Vermittler</span></div>
                <a href="#anfrage" className="b-btn b-btn-acc pt-cta">Vertriebspartner werden</a>
              </div>
              <dl className="pt-dl">
                <div><dt>Das bringen Sie</dt><dd><T k="seite.partner.6" /></dd></div>
                <div><dt>Das bringen wir</dt><dd><T k="seite.partner.7" /></dd></div>
                <div><dt>So läuft es</dt><dd><T k="seite.partner.8" /></dd></div>
                <div><dt>Nennung</dt><dd>Eintrag im <Link href="/partner/verzeichnis" className="link">Partnerverzeichnis</Link> auf matrixpos.de.</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <PartnerTeaser />

      <section id="technologie" className="pt-sec" style={{ paddingBottom: 96 }}>
        <div className="b-wrap">
          <div className="pt-block pt-tech">
            <div className="pt-col" style={{ maxWidth: 820 }}>
              <span className="b-m pt-lbl c-int">Weg 2 · Verbinden</span>
              <h2 className="b-d pt-h2">Technologiepartner</h2>
              <p className="pt-lead"><T k="seite.partner.10" /></p>
            </div>

            <div className="pt-map">
              <div className="pt-nodes">
                <span className="b-m pt-lbl c-schn">Schnittstelle · spricht mit Matrix</span>
                <div className="pt-node"><span>Hotelsoftware</span><small>protel, ASA Hotel, Oracle Opera, Guestline</small></div>
                <div className="pt-node"><span>Warenwirtschaft</span><small>Bestellung, Lager, Rezepturen</small></div>
                <div className="pt-node"><span>Buchhaltung</span><small>DATEV, Kassenbuch</small></div>
                <div className="pt-node"><span>Reservierung und Self-Ordering</span><small>Tischreservierung, Bestellen vom Gast</small></div>
              </div>
              <div className="pt-conn" aria-hidden="true"><span /><span /><span /><span /></div>
              <div className="pt-product">
                <span className="b-d pt-product-name">matrix <em>NXT</em> · POS · PAY</span>
                <span className="b-m pt-lbl c-int">Integration · läuft in Matrix</span>
                <div className="pt-int">
                  <div className="pt-node int"><span>Adyen</span><small>Zahlung, Terminals, Tap to Pay</small></div>
                  <div className="pt-node int"><span>Fiskaly</span><small>Cloud-TSE</small></div>
                  <div className="pt-node int"><span>Orderman</span><small>Handgeräte, zertifiziert</small></div>
                </div>
                <p className="pt-note"><T k="seite.partner.11" /></p>
              </div>
            </div>

            <div className="pt-two">
              <div className="pt-sub">
                <span className="b-m pt-lbl c-int">Integration</span>
                <h3 className="b-d">Ihr Produkt läuft in Matrix.</h3>
                <p><T k="seite.partner.12" /></p>
                <p className="pt-today">Heute: Adyen, Fiskaly, Orderman.</p>
                <a href="#anfrage" className="b-btn b-btn-ghost pt-cta">Integration anfragen</a>
              </div>
              <div className="pt-sub">
                <span className="b-m pt-lbl c-schn">Schnittstelle</span>
                <h3 className="b-d">Ihr System spricht mit Matrix.</h3>
                <p><T k="seite.partner.13" /></p>
                <p className="pt-today"><T k="seite.partner.14" /></p>
                <a href="#anfrage" className="b-btn b-btn-ghost pt-cta">Schnittstelle anfragen</a>
              </div>
            </div>

            {/* ANNAHME (Nachtpaket 07.11.): Vergleichstabelle Integration/Schnittstelle entfernt, die zwei Karten darüber sagen dasselbe. */}

            <div className="pt-list">
              <span className="b-m pt-lbl">Schnittstellen heute</span>
              <div className="b-devs">
                {["protel", "ASA Hotel", "Oracle Opera", "Guestline", "DATEV", "KOST", "RESERViSiON", "Flixorder"].map((n) => (
                  <span key={n} className="b-m b-dev">{n}</span>
                ))}
                <span className="b-m b-dev pt-more"><T k="seite.partner.15" /></span>
              </div>
              <p className="pt-note">Die vollständige Liste je Produkt steht auf der <Link href="/schnittstellen" className="link">Schnittstellenseite</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ablauf" className="sub-sec alt">
        <div className="b-wrap">
          <span className="b-m b-kicker">So werden Sie Partner</span>
          <h2 className="b-d sub-h2">Drei Schritte bis zum Start.</h2>
          <div className="pt-steps">
            <div className="pt-step"><span className="n b-d">01</span><h3 className="b-d">Anfrage</h3><p><T k="seite.partner.16" /></p></div>
            <div className="pt-step"><span className="n b-d">02</span><h3 className="b-d">Gespräch</h3><p><T k="seite.partner.17" /></p></div>
            <div className="pt-step"><span className="n b-d">03</span><h3 className="b-d">Start</h3><p><T k="seite.partner.18" /></p></div>
          </div>
        </div>
      </section>

      <section id="anfrage" className="sub-sec">
        <div className="b-wrap pt-formgrid">
          <div className="pt-col">
            <span className="b-m b-kicker">Partneranfrage</span>
            <h2 className="b-d sub-h2">Verkaufen oder verbinden?</h2>
            <p className="sub-p"><T k="seite.partner.19" /> Sie sind Kunde und brauchen Hilfe? Dann bitte über das <a href="https://support.matrixpos.de/help" target="_blank" rel="noopener noreferrer" className="link">Supportportal</a>.</p>
            <p className="pt-note">partner@matrixpos.de · Eckenerstraße 2, 30179 Hannover</p>
          </div>
          <PartnerForm />
        </div>
      </section>

      <section className="sub-close">
        <div className="b-aurora b-aurora-wide" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-close-in">
          <h2 className="b-d sub-h1">Sprechen wir.</h2>
          <p className="sub-p"><T k="seite.partner.20" /></p>
          <div className="sub-btns"><a href="#anfrage" className="b-btn b-btn-white">Partneranfrage</a><Link href="/demo#rueckruf" className="b-btn b-btn-ghost">Rückruf vereinbaren</Link></div>
        </div>
      </section>
    </>
  );
}
