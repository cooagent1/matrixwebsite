import Link from "next/link";

// Produktfamilie (Vorlage: Canvas „Startseite monochrom 2“, Sektion 02 Produkte).
// NXT als große dunkle Karte, POS und PAY daneben. Foto wird bei Hover farbig.
export function ProduktFamilie({ id }: { id?: string }) {
  return (
    <section id={id} className="sub-sec pf" aria-labelledby="pf-h">
      <div className="b-wrap">
        <div className="pf-head">
          <span className="b-kicker">Produkte</span>
          <h2 className="b-d sub-h2" id="pf-h">Eine Familie. Drei Systeme.</h2>
          <p className="pf-lead">NXT für neue Betriebe, POS für gewachsene, PAY für beide.</p>
        </div>
        <div className="pf-grid">
          <Link className="pf-nxt" href="/kassensysteme/nxt">
            <img src="/lp/fotos/nxt-bistro.jpg" alt="" aria-hidden="true" loading="lazy" />
            <span className="pf-arr" aria-hidden="true">→</span>
            <span className="b-kicker">Cloud-Kasse</span>
            <span className="b-d pf-nm"><span>matrix</span> NXT</span>
            <span className="pf-p">Browser und Android, ohne Server im Betrieb.</span>
          </Link>
          <div className="pf-side">
            <Link className="pf-card" href="/kassensysteme/pos">
              <span className="pf-top"><span className="b-kicker">Stationäre Kasse</span><span className="pf-arr" aria-hidden="true">→</span></span>
              <span>
                <span className="b-d pf-nm"><span>matrix</span> POS</span>
                <span className="pf-p">Lokal installiert, kassiert auch ohne Internet.</span>
              </span>
            </Link>
            <Link className="pf-card" href="/pay">
              <span className="pf-top"><span className="b-kicker">Zahlung</span><span className="pf-arr" aria-hidden="true">→</span></span>
              <span>
                <span className="b-d pf-nm"><span>matrix</span> PAY</span>
                <span className="pf-p">Karte, kontaktlos, eine Abrechnung.</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
