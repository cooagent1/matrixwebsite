"use client";

import Link from "next/link";
import { useState } from "react";

type Way = "Verkaufen" | "Verbinden";
type State = "idle" | "sending" | "ok" | "error" | "unavailable";

const WAYS: { key: Way; label: string; hint: string; detail: string }[] = [
  { key: "Verkaufen", label: "Verkaufen: Vertriebspartner werden", hint: "Sie verkaufen und betreuen Matrix in Ihrer Region.", detail: "Region, Kundenkreis, heutige Produkte" },
  { key: "Verbinden", label: "Verbinden: Integration oder Schnittstelle", hint: "Ihr Produkt läuft in Matrix oder spricht mit Matrix.", detail: "Ihr Produkt oder System, gemeinsame Kunden, vorhandene API" },
];

// Partneranfrage: gleiche API wie das Kontaktformular, Rolle "Partner", der gewählte Weg steht vorn in der Nachricht.
export function PartnerForm() {
  const [way, setWay] = useState<Way>("Verkaufen");
  const [state, setState] = useState<State>("idle");
  const w = WAYS.find((x) => x.key === way)!;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, message: `Weg: ${way}\n${data.message ?? ""}`, role: "Partner", path: window.location.pathname }),
      });
      if (res.status === 503) return setState("unavailable");
      if (!res.ok) return setState("error");
      form.reset();
      setState("ok");
    } catch {
      setState("error");
    }
  }

  if (state === "ok")
    return (
      <div className="pt-form" role="status">
        <h3 className="b-d">Vielen Dank.</h3>
        <p>Wir haben Ihre Anfrage erhalten und melden uns innerhalb eines Werktags.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="pt-form">
      <fieldset className="pt-fieldset">
        <legend>Ich möchte</legend>
        <div className="pt-segs">
          {WAYS.map((x) => (
            <button key={x.key} type="button" aria-pressed={way === x.key} className={`pt-seg ${way === x.key ? "on" : ""}`} onClick={() => setWay(x.key)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="pt-hint">{w.hint}</p>
      </fieldset>
      <div className="pt-fields">
        <label className="field"><span>Name</span><input name="name" required autoComplete="name" /></label>
        <label className="field"><span>Firma</span><input name="company" required autoComplete="organization" /></label>
        <label className="field"><span>E-Mail</span><input name="email" type="email" required autoComplete="email" /></label>
        <label className="field"><span>Telefon</span><input name="phone" type="tel" autoComplete="tel" /></label>
      </div>
      <label className="field"><span>{w.detail}</span><textarea name="message" rows={4} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="pt-consent">
        <input type="checkbox" name="consent" required />
        <span>Mit dem Absenden stimme ich der <Link href="/datenschutz" className="link">Datenschutzerklärung</Link> zu.</span>
      </label>
      <div className="pt-actions">
        <button type="submit" className="b-btn b-btn-acc" disabled={state === "sending"}>{state === "sending" ? "Wird gesendet …" : "Anfrage senden"}</button>
        {state === "error" && <span className="pt-msg">Das hat nicht geklappt. Bitte noch einmal versuchen oder an partner@matrixpos.de schreiben.</span>}
        {state === "unavailable" && <span className="pt-msg">Das Formular ist noch nicht freigeschaltet. Schreiben Sie an partner@matrixpos.de.</span>}
      </div>
    </form>
  );
}
