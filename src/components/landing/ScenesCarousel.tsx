import { T } from "../T";

// Statisch seit 06.11. (Robert: Seite zu lang): Kopf oben, drei Szenen nebeneinander, kein Scroll-Karussell.
export function ScenesCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cls = (_k: number) => "";
  return (
    <section id="szenen" className="b-scenes">
      <div className="b-scenes-in">
        <div className="b-aurora" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap b-story">
          <div className="b-sticky">
            <span className="b-m b-kicker"><T k="start.szenen.kicker" /></span>
            <h2 className="b-d b-h2"><T k="start.szenen.h2" /></h2>
            <p className="b-lead"><T k="start.szenen.lead" /></p>
          </div>
          <div className="b-scene-col">
                  <div className={`b-scene s1 ${cls(0)}`}>
                <div className="b-stage" style={{ height: 300 }}>
                  <div className="b-device" style={{ left: 0, right: 0, top: 0, height: 300, perspective: 1200 }}>
                    <div className="tab-screen">
                      <div className="tab-side"><span className="brand">matrix NXT</span><span className="on">Restaurant</span><span>Terrasse</span><span>Bar</span></div>
                      <div className="tab-main">
                        <div className="t busy" style={{ left: 18, top: 16 }}>T1<span>48,20 €</span></div>
                        <div className="t free" style={{ left: 96, top: 16 }}>T2 frei</div>
                        <div className="t hot" style={{ left: 174, top: 16 }}>T3<span>112,90 €</span></div>
                        <div className="t round" style={{ left: 252, top: 12 }}>T4</div>
                        <div className="t busy" style={{ left: 18, top: 84, width: 104 }}>T6 · 6 Gäste<span>96,40 € · Gang 3</span></div>
                        <div className="t free" style={{ left: 136, top: 84 }}>T7 frei</div>
                        <div className="t res" style={{ left: 214, top: 84 }}>Stammtisch 19:30</div>
                        <div className="t busy" style={{ left: 18, top: 152 }}>T11<span>18,50 €</span></div>
                        <div className="t busy" style={{ left: 96, top: 152 }}>T12<span>18,00 €</span></div>
                        <div className="tab-sum">8 Tische offen · 412,50 €</div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="b-m b-kicker"><T k="start.szene1.kicker" /></span>
                <h3 className="b-d"><T k="start.szene1.titel" /></h3>
                <p><T k="start.szene1.text" /></p>
              </div>
              <div className={`b-scene s2 ${cls(1)}`}>
                <div className="b-stage" style={{ height: 400 }}>
                  <div className="b-device" style={{ right: 20, top: 0, width: 200, height: 400, perspective: 1200 }}>
                    <div className="phone">
                      <div className="phone-head">Tisch 6 · 6 Gäste<br /><b>140,70 €</b></div>
                      <div className="phone-list">
                        <span>2× Kürbissuppe <b>15,80</b></span><span>3× Schnitzel <b>56,70</b></span><span>1× Risotto <b>17,90</b></span><span>4× Wasser 0,75 <b>22,00</b></span><span>2× Riesling 0,2 <b>13,80</b></span>
                      </div>
                      <div className="phone-btns"><span style={{ background: "#BDBDBD" }}>Runde senden</span><span style={{ background: "#fff" }}>Tap to Pay</span></div>
                    </div>
                  </div>
                </div>
                <span className="b-m b-kicker"><T k="start.szene2.kicker" /></span>
                <h3 className="b-d"><T k="start.szene2.titel" /></h3>
                <p><T k="start.szene2.text" /></p>
              </div>
              <div className={`b-scene s3 ${cls(2)}`}>
                <div className="b-stage" style={{ height: 230 }}>
                  <div className="b-device" style={{ left: 0, right: 0, top: 0, height: 230 }}>
                    <div className="office">
                      <div className="office-head"><span>Matrix Office · Tagesumsatz</span><span className="ok">● Z-Bon 23:45 automatisch</span></div>
                      <div className="bars"><span style={{ height: "30%" }} /><span style={{ height: "48%" }} /><span style={{ height: "40%" }} /><span className="hi" style={{ height: "78%" }} /><span style={{ height: "62%" }} /><span className="hi" style={{ height: "100%" }} /><span style={{ height: "55%" }} /><span style={{ height: "70%" }} /></div>
                      <div className="office-foot"><span>Nach Artikel</span><span>Nach Kellner</span><span>Storno</span><span>Rabatt</span><span className="r">DSFinV-K-Export</span></div>
                    </div>
                  </div>
                </div>
                <span className="b-m b-kicker"><T k="start.szene3.kicker" /></span>
                <h3 className="b-d"><T k="start.szene3.titel" /></h3>
                <p><T k="start.szene3.text" /></p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
