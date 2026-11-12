import Link from "next/link";

// Produktfamilie (Vorlage: Canvas „Startseite monochrom 2“, Sektion 02 Produkte).
// NXT als große dunkle Karte, PAY und POS daneben (Reihenfolge nach Positionierung 12.11.). Foto wird bei Hover farbig.
// Nur die drei Karten, z. B. im Hero von /kassensysteme.
export function ProduktKarten() {
  return (
    <div className="pf-grid">
      <Link className="pf-nxt" href="/kassensysteme/nxt">
        <img src="/lp/fotos/nxt-bistro.jpg" alt="" aria-hidden="true" loading="lazy" />
        <span className="pf-arr" aria-hidden="true">→</span>
        <span className="b-kicker">Cloud-Kasse</span>
        <span className="b-d pf-nm"><span>matrix</span> NXT</span>
        <span className="pf-p">Für die Gastronomie. Browser und Android, ohne Server im Betrieb.</span>
      </Link>
      <div className="pf-side">
        <Link className="pf-card" href="/pay">
          <span className="pf-top"><span className="b-kicker">Zahlung</span><span className="pf-arr" aria-hidden="true">→</span></span>
          <span>
            <span className="b-d pf-nm"><span>matrix</span> PAY</span>
            <span className="pf-p">Kartenzahlung, auch mit anderen Kassen.</span>
          </span>
        </Link>
        <Link className="pf-card" href="/kassensysteme/pos">
          <span className="pf-top"><span className="b-kicker">Für Sonderfälle</span><span className="pf-arr" aria-hidden="true">→</span></span>
          <span>
            <span className="b-d pf-nm"><span>matrix</span> POS</span>
            <span className="pf-p">Individuell angepasst, für eigene IT-Vorgaben.</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export function ProduktFamilie({ id }: { id?: string }) {
  return (
    <section id={id} className="sub-sec pf" aria-labelledby="pf-h">
      <div className="b-wrap">
        <div className="pf-head">
          <span className="b-kicker">Produkte</span>
          <h2 className="b-d sub-h2" id="pf-h">Eine Familie. Drei Systeme.</h2>
          <p className="pf-lead">NXT für die Gastronomie, PAY für jede Kasse, POS für Sonderfälle.</p>
        </div>
        <ProduktKarten />
      </div>
    </section>
  );
}
