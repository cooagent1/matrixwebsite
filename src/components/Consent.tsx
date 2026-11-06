"use client";

import { useCallback, useEffect, useState } from "react";

// Einwilligung für Statistik (Google Analytics 4) und Marketing (HubSpot-Tracking).
// Vor der Einwilligung wird kein Skript geladen und kein Cookie gesetzt (§ 25 TDDDG).
// Ablehnen ist so einfach wie Zustimmen. Widerruf jederzeit über „Cookie-Einstellungen" im Footer.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-0YFWZ5CMSP";
const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "148871161";
const HUBSPOT_HOST = process.env.NEXT_PUBLIC_HUBSPOT_SCRIPT_HOST ?? "js-eu1.hs-scripts.com";
// Tracking nur auf der echten Domain, nicht auf Vorschau-URLs. Übersteuern: NEXT_PUBLIC_TRACKING_HOSTS=host1,host2
const TRACKING_HOSTS = (process.env.NEXT_PUBLIC_TRACKING_HOSTS ?? "matrixpos.de,www.matrixpos.de").split(",").map((h) => h.trim());

const KEY = "mp_consent_v1";
type Choice = { statistics: boolean; marketing: boolean; at: string };

function read(): Choice | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Choice) : null;
  } catch {
    return null;
  }
}

function save(c: Choice) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
}

function addScript(id: string, src: string, attrs: Record<string, string> = {}) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

function apply(c: Choice) {
  if (!TRACKING_HOSTS.includes(window.location.hostname)) return;
  type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  const w = window as W;
  if (c.statistics && GA_ID) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
    w.gtag("js", new Date());
    w.gtag("config", GA_ID, { anonymize_ip: true });
    addScript("ga4", `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  }
  if (c.marketing && HUBSPOT_ID) {
    addScript("hs-script-loader", `https://${HUBSPOT_HOST}/${HUBSPOT_ID}.js`, { defer: "" });
  }
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [stat, setStat] = useState(false);
  const [mkt, setMkt] = useState(false);

  useEffect(() => {
    const c = read();
    if (c) apply(c);
    else setOpen(true);
    const reopen = () => {
      const cur = read();
      setStat(!!cur?.statistics);
      setMkt(!!cur?.marketing);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener("mp:consent-open", reopen);
    return () => window.removeEventListener("mp:consent-open", reopen);
  }, []);

  const decide = useCallback((statistics: boolean, marketing: boolean) => {
    const prev = read();
    const c = { statistics, marketing, at: new Date().toISOString() };
    save(c);
    setOpen(false);
    // Widerruf: bereits geladene Skripte lassen sich nicht sauber entladen, daher neu laden.
    if (prev && ((prev.statistics && !statistics) || (prev.marketing && !marketing))) window.location.reload();
    else apply(c);
  }, []);

  if (!open) return null;
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <div className="consent-in">
        <p id="consent-title" className="consent-t">Ihre Privatsphäre</p>
        <p className="consent-p">
          Wir möchten mit Google Analytics verstehen, wie unsere Website genutzt wird, und mit HubSpot unsere Kontakte
          und Anfragen besser betreuen. Dafür brauchen wir Ihre Einwilligung. Sie können sie jederzeit über
          „Cookie-Einstellungen“ im Seitenfuß widerrufen. Mehr in der <a href="/datenschutz" className="link">Datenschutzerklärung</a>.
        </p>
        {details && (
          <div className="consent-opts">
            <label><input type="checkbox" checked disabled /> <span><b>Notwendig</b> Die Website funktioniert ohne Tracking. Ihre Auswahl speichern wir im Browser.</span></label>
            <label><input type="checkbox" checked={stat} onChange={(e) => setStat(e.target.checked)} /> <span><b>Statistik</b> Google Analytics 4 (Google Ireland Ltd.), Reichweitenmessung.</span></label>
            <label><input type="checkbox" checked={mkt} onChange={(e) => setMkt(e.target.checked)} /> <span><b>Marketing</b> HubSpot (HubSpot Ireland Ltd.), Besucher- und Kontaktanalyse.</span></label>
          </div>
        )}
        <div className="consent-btns">
          <button type="button" className="consent-b" onClick={() => decide(false, false)}>Nur notwendige</button>
          {details ? (
            <button type="button" className="consent-b" onClick={() => decide(stat, mkt)}>Auswahl speichern</button>
          ) : (
            <button type="button" className="consent-b" onClick={() => setDetails(true)}>Einstellungen</button>
          )}
          <button type="button" className="consent-b" onClick={() => decide(true, true)}>Alle akzeptieren</button>
        </div>
      </div>
    </div>
  );
}

export function ConsentLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className ?? "consent-link"} onClick={() => window.dispatchEvent(new Event("mp:consent-open"))}>
      Cookie-Einstellungen
    </button>
  );
}
