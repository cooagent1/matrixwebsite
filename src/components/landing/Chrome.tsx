import { ConsentLink } from "@/components/Consent";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FOOTER } from "@/lib/nav";
import { Menu, PillScroll } from "./Menu";
import { Reveal } from "./Reveal";
import { PHONE, SOCIAL } from "@/lib/seo";
import "./footer.css";

// Gemeinsamer Rahmen aller Seiten im A2-Design: Menü-Pille oben links, Footer als dunkle Fläche.
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

const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <path d="M5.9 23H1.4V8.3h4.5V23ZM3.6 6.3a2.6 2.6 0 1 1 0-5.3 2.6 2.6 0 0 1 0 5.3ZM23 23h-4.6v-7.2c0-1.7 0-3.9-2.4-3.9s-2.7 1.9-2.7 3.8V23H8.8V8.3h4.4v2h.1c.6-1.2 2.1-2.4 4.3-2.4 4.6 0 5.5 3 5.5 7V23Z" />,
  Instagram: <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.1 8.2c-.1-1.5-.4-2.8-1.5-3.9S17.3 2.9 15.8 2.8c-1.5-.1-6.1-.1-7.6 0-1.5.1-2.8.4-3.9 1.5S2.9 6.7 2.8 8.2c-.1 1.5-.1 6.1 0 7.6.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 6.1.1 7.6 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-6.1 0-7.6ZM19.2 17.4a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.5.4s-4.3.1-5.5-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.4s-.1-4.3.4-5.5a3 3 0 0 1 1.7-1.7c1.2-.5 4-.4 5.5-.4s4.3-.1 5.5.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.5s.1 4.2-.4 5.4Z" />,
  Facebook: <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.27 10.44 22v-7.02H7.9v-2.9h2.54V9.86c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22C18.34 21.27 22 17.1 22 12.07Z" />,
};

export function LpFooter() {
  return (
    <footer className="b-ftr">
      <Reveal />
      <div className="b-wrap">
        <div className="b-ftr-top">
          <div className="b-ftr-brand">
            <p className="b-ftr-slogan">Gastro-Kassen aus Hannover. Seit 30 Jahren.</p>
            <p>Kassensysteme, Handgeräte und Kartenzahlung für Restaurants, Hotels und Freizeitparks. Entwickelt und betreut in Hannover.</p>
            <div className="b-ftr-cta">
              <Link href="/demo" className="b-btn b-btn-white">Demo buchen</Link>
              <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="b-btn b-btn-ghost">{PHONE}</a>
            </div>
          </div>
          <div className="b-ftr-cols">
            {FOOTER.map((c) => (
              <nav key={c.title} className="b-ftr-col" aria-label={c.title}>
                <h2 className="b-ftr-h">{c.title}</h2>
                <ul>
                  {c.items.map((i) => (
                    <li key={i.href}>
                      {i.external ? (
                        <a href={i.href} target="_blank" rel="noopener noreferrer">{i.label}<sup aria-hidden="true">↗</sup></a>
                      ) : (
                        <Link href={i.href}>{i.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="b-ftr-col">
              <h2 className="b-ftr-h">Kontakt</h2>
              <address className="b-ftr-adr">
                <span>Matrix POS GmbH<br />Eckenerstraße 2<br />30179 Hannover</span>
                <span><a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}>{PHONE}</a><br /><a href="mailto:sales@matrixpos.de">sales@matrixpos.de</a></span>
                <span className="b-ftr-social">
                  {SOCIAL.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Matrix POS auf ${s.name}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{ICONS[s.name]}</svg>
                    </a>
                  ))}
                </span>
              </address>
            </div>
          </div>
        </div>
        <div className="b-ftr-bot">
          <Link href="/" aria-label="Matrix POS Startseite"><img src="/lp/logo-matrixpos.png" alt="Matrix POS" className="b-logo" /></Link>
          <small>© {new Date().getFullYear()} Matrix POS GmbH</small>
          <ul className="b-ftr-legal">
            <li><Link href="/impressum">Impressum</Link></li>
            <li><Link href="/datenschutz">Datenschutz</Link></li>
            <li><Link href="/agb">AGB</Link></li>
            <li><ConsentLink /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
