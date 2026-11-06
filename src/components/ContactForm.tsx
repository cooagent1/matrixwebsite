"use client";

import Link from "next/link";
import { useState } from "react";

type State = "idle" | "sending" | "ok" | "error" | "unavailable";

export function ContactForm() {
  // ANNAHME (Nachtpaket 07.11.): Kein Interessent/Partner-Umschalter mehr, Partner haben ihr Formular auf /partner.
  const role = "Interessent";
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, role, path: window.location.pathname + window.location.search }),
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
      <div className="card" role="status">
        <p className="text-lg font-semibold">Vielen Dank.</p>
        <p className="mt-2 text-slate-700">Wir haben Ihre Nachricht erhalten und melden uns innerhalb eines Werktags.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 md:grid-cols-2" noValidate={false}>
      <label className="field">
        <span>Name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label className="field">
        <span>Betrieb</span>
        <input name="company" required autoComplete="organization" />
      </label>
      <label className="field">
        <span>E-Mail</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="field">
        <span>Telefon</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label className="field md:col-span-2">
        <span>Nachricht</span>
        <textarea name="message" rows={4} />
      </label>
      {/* Honeypot: für Menschen unsichtbar */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="md:col-span-2 flex items-start gap-2 form-consent">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          Mit dem Absenden stimme ich der <Link href="/datenschutz" className="link">Datenschutzerklärung</Link> zu.
        </span>
      </label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
          {state === "sending" ? "Wird gesendet …" : "Nachricht senden"}
        </button>
        {state === "error" && <p className="text-sm text-amber-700" role="alert">Das hat nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an: +49 511 592938-0.</p>}
        {state === "unavailable" && <p className="text-sm text-amber-700" role="alert">Das Formular ist in dieser Vorschau noch nicht aktiv. Bitte rufen Sie uns an: +49 511 592938-0.</p>}
      </div>
    </form>
  );
}
