import { ConsentLink } from "@/components/Consent";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SUPPORT_PORTAL } from "@/lib/nav";
import { Menu, PillScroll } from "./Menu";
import { PHONE, SOCIAL } from "@/lib/seo";

// Gemeinsamer Rahmen aller Seiten im A2-Design: Menü-Pille oben links, schlanker Footer.
export function LpHeader() {
  return (
    <header className="b-hdr">
      <PillScroll />
      <div className="b-wrap b-hdr-in">
        <div className="b-pill">
          <Menu />
          <Link href="/" aria-label="Matrix POS Startseite"><img src="/lp/logo-matrixpos.png" alt="Matrix POS" className="b-logo" /></Link>
        </div>
      </div>
    </header>
  );
}

export function LpFooter() {
  return (
    <footer className="b-foot">
      <div className="b-wrap b-foot-in">
        <address className="b-foot-nap">
          <b>Matrix POS GmbH</b>
          <span>Eckenerstraße 2 · 30179 Hannover</span>
          <span><a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}>{PHONE}</a> · <a href="mailto:sales@matrixpos.de">sales@matrixpos.de</a></span>
          <span className="b-foot-social">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
            ))}
          </span>
          <small>© {new Date().getFullYear()} Matrix POS GmbH</small>
        </address>
        <div className="b-foot-links">
          <a href={SUPPORT_PORTAL} target="_blank" rel="noopener noreferrer">Supportportal</a>
          <Link href="/partner">Partner werden</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <ConsentLink />
        </div>
      </div>
    </footer>
  );
}
