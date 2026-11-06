import { T, TEXTE } from "../T";

// Kennzahl: „30+“ → 30 mit hochgestelltem Plus. Texte kommen aus texte.json (start.szenen.zahl1–4).
function Zahl({ n }: { n: number }) {
  const z = TEXTE[`start.szenen.zahl${n}`].text;
  const m = z.match(/^(.*?)(\+?)$/);
  return (
    <div className="b-num"><b className="b-d">{m?.[1]}{m?.[2] && <em>+</em>}</b><span><T k={`start.szenen.zahl${n}.label`} /></span></div>
  );
}

// Zahlenleiste unter den Kundenlogos (06.11.): 30+ Jahre, 10.000+ Installationen, 0 Server, 7 Tage Support.
export function Zahlen() {
  return (
    <section aria-label="Matrix in Zahlen" className="b-zahlen">
      <div className="b-wrap">
        <div className="b-nums">
          {[3, 4, 1, 2].map((n) => <Zahl key={n} n={n} />)}
        </div>
      </div>
    </section>
  );
}
