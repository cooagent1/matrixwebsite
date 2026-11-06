import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PartnerForm } from "@/components/partner/PartnerForm";
import { PartnerDirectory } from "@/components/cms/PartnerDirectory";

// Partnerliste kommt aus Supabase; alle 5 Minuten neu.
export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: "Partner werden: Vertrieb, Integration, Schnittstelle | Matrix POS",
  description:
    "Zwei Wege, Partner von Matrix zu werden: als Vertriebspartner verkaufen und betreuen Sie Matrix. Als Technologiepartner läuft Ihr Produkt in Matrix oder spricht mit Matrix.",
  path: "/partner",
});

// Design: Canvas "Partnerprogramm Matrix" (6.11.2026). Zwei Blöcke: Verkaufen (Vertriebspartner), Verbinden (Technologiepartner mit Integration und Schnittstelle).
export default function PartnerPage() {
  return (
    <>
      <section className="sub-hero" id="top">
        <div className="b-aurora" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-hero-in">
          <span className="b-m b-kicker">Partner</span>
          <h1 className="b-d sub-h1">Verkaufen oder verbinden.</h1>
          <p className="sub-lead" style={{ maxWidth: 720 }}>Zwei Wege, Partner von Matrix zu werden: als Vertriebspartner verkaufen und betreuen Sie Matrix. Als Technologiepartner läuft Ihr Produkt in Matrix oder spricht mit Matrix.</p>
          <div className="sub-btns"><a href="#vertrieb" className="b-btn b-btn-acc">Vertriebspartner</a><a href="#technologie" className="b-btn b-btn-ghost">Technologiepartner</a></div>
        </div>
      </section>

      <section id="vertrieb" className="pt-sec">
        <div className="b-wrap">
          <div className="pt-block pt-vert">
            <div className="pt-two">
              <div className="pt-col">
                <span className="b-m pt-lbl c-vert">Weg 1 · Verkaufen</span>
                <h2 className="b-d pt-h2">Vertriebspartner</h2>
                <p className="pt-lead">Sie verkaufen Matrix NXT und Matrix PAY in Ihrer Region, installieren vor Ort und betreuen Ihre Kunden selbst. Matrix steht dahinter.</p>
                <div className="b-devs"><span className="b-m b-dev">Kassenhändler</span><span className="b-m b-dev">IT-Dienstleister Gastronomie</span><span className="b-m b-dev">Payment-Vermittler</span></div>
                <a href="#anfrage" className="b-btn b-btn-acc pt-cta">Vertriebspartner werden</a>
              </div>
              <dl className="pt-dl">
                <div><dt>Das bringen Sie</dt><dd>Kundenzugang in der Gastronomie, Installation vor Ort, First-Level-Support, Beratung zu Hardware und Payment.</dd></div>
                <div><dt>Das bringen wir</dt><dd>Produkt, Schulung, Demo-Zugang, Second-Level-Support aus Hannover, Partnerkonditionen auf Anfrage.</dd></div>
                <div><dt>So läuft es</dt><dd>Jede verkaufte Kasse kann ein Payment-Vertrag werden. Terminals installieren Sie, den Payment-Support übernimmt Matrix.</dd></div>
                <div><dt>Nennung</dt><dd>Eintrag im <a href="#haendler" className="link">Partnerverzeichnis</a> auf matrixpos.de.</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <PartnerDirectory />

      <section id="technologie" className="pt-sec" style={{ paddingBottom: 96 }}>
        <div className="b-wrap">
          <div className="pt-block pt-tech">
            <div className="pt-col" style={{ maxWidth: 820 }}>
              <span className="b-m pt-lbl c-int">Weg 2 · Verbinden</span>
              <h2 className="b-d pt-h2">Technologiepartner</h2>
              <p className="pt-lead">Ihr Produkt und Matrix arbeiten zusammen. Entweder läuft es im Matrix-Produkt, oder es spricht von außen damit. Der Unterschied entscheidet, was wir gemeinsam bauen.</p>
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
                <p className="pt-note">Der Kunde kauft es mit der Kasse. Für ihn ist es Matrix.</p>
              </div>
            </div>

            <div className="pt-two">
              <div className="pt-sub">
                <span className="b-m pt-lbl c-int">Integration</span>
                <h3 className="b-d">Ihr Produkt läuft in Matrix.</h3>
                <p>Zahlung, TSE, Hardware: Matrix baut Ihr Produkt fest ein und verkauft es mit. Sie liefern das Produkt und den Support dafür, wir zertifizieren, nennen Sie auf den Produktseiten und bringen Sie über alle Vertriebspartner in den Markt.</p>
                <p className="pt-today">Heute: Adyen, Fiskaly, Orderman.</p>
                <a href="#anfrage" className="b-btn b-btn-ghost pt-cta">Integration anfragen</a>
              </div>
              <div className="pt-sub">
                <span className="b-m pt-lbl c-schn">Schnittstelle</span>
                <h3 className="b-d">Ihr System spricht mit Matrix.</h3>
                <p>Hotelsoftware, Warenwirtschaft, Buchhaltung, Reservierung: Ihr System bleibt Ihr System, Matrix tauscht Daten damit aus. Sie bauen die Anbindung auf Ihrer Seite, wir liefern Dokumentation, Testumgebung und den Eintrag in der Schnittstellenliste.</p>
                <p className="pt-today">Heute: über 40 Anbindungen im Betrieb.</p>
                <a href="#anfrage" className="b-btn b-btn-ghost pt-cta">Schnittstelle anfragen</a>
              </div>
            </div>

            <div className="pt-rows">
              <div className="pt-row head"><b /><span className="b-m pt-lbl c-int">Integration</span><span className="b-m pt-lbl c-schn">Schnittstelle</span></div>
              <div className="pt-row"><b>Wo läuft es</b><span>im Matrix-Produkt</span><span>in Ihrem System</span></div>
              <div className="pt-row"><b>Wer verkauft es</b><span>Matrix und die Vertriebspartner</span><span>Sie, an gemeinsame Kunden</span></div>
              <div className="pt-row"><b>Technik auf Ihrer Seite</b><span>Produkt nach Matrix-Vorgabe</span><span>Anbindung an Ihrem System</span></div>
              <div className="pt-row"><b>Matrix liefert</b><span>Zertifizierung, Einbau, Vertrieb</span><span>Dokumentation, Testumgebung</span></div>
              <div className="pt-row"><b>Nennung</b><span>auf den Produktseiten</span><span>in der Schnittstellenliste</span></div>
              <div className="pt-row"><b>Konditionen</b><span>auf Anfrage</span><span>auf Anfrage</span></div>
            </div>

            <div className="pt-list">
              <span className="b-m pt-lbl" style={{ color: "#BDBDBD" }}>Schnittstellen heute</span>
              <div className="b-devs">
                {["protel", "ASA Hotel", "Oracle Opera", "Guestline", "Mews", "SIHOT", "DATEV", "KOST", "RESERViSiON", "Flixorder"].map((n) => (
                  <span key={n} className="b-m b-dev">{n}</span>
                ))}
                <span className="b-m b-dev pt-more">über 40 insgesamt</span>
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
            <div className="pt-step"><span className="n b-d">01</span><h3 className="b-d">Anfrage</h3><p>Sie sagen uns, ob Sie verkaufen oder verbinden wollen, und was Sie heute tun. Zwei Minuten im Formular.</p></div>
            <div className="pt-step"><span className="n b-d">02</span><h3 className="b-d">Gespräch</h3><p>30 Minuten mit dem Partnermanagement: Markt, Produkt, Konditionen. Online oder in Hannover.</p></div>
            <div className="pt-step"><span className="n b-d">03</span><h3 className="b-d">Start</h3><p>Vertrieb: Schulung und Demo-Zugang. Integration: Zertifizierung. Schnittstelle: Dokumentation und Testumgebung.</p></div>
          </div>
        </div>
      </section>

      <section id="anfrage" className="sub-sec">
        <div className="b-wrap pt-formgrid">
          <div className="pt-col">
            <span className="b-m b-kicker">Partneranfrage</span>
            <h2 className="b-d sub-h2">Verkaufen oder verbinden?</h2>
            <p className="sub-p">Wir melden uns innerhalb eines Werktags. Sie sind Kunde und brauchen Hilfe? Dann bitte über das <a href="https://support.matrixpos.de/help" target="_blank" rel="noopener noreferrer" className="link">Supportportal</a>.</p>
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
          <p className="sub-p">30 Jahre im Markt, zwei Kassen, ein Payment. Jeder Kassenverkauf kann ein Payment-Vertrag werden.</p>
          <div className="sub-btns"><a href="#anfrage" className="b-btn b-btn-white">Partneranfrage</a><Link href="/demo#rueckruf" className="b-btn b-btn-ghost">Rückruf vereinbaren</Link></div>
        </div>
      </section>
    </>
  );
}
