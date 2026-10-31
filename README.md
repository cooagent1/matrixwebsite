# matrixwebsite

Website matrixpos.de. Next.js (App Router) mit Tailwind, Deployment auf Vercel, Anfragen in Supabase, Mails über Resend. Demo-Buchung über HubSpot.

## Inhalte

Die Texte liegen nicht hier, sondern im Agent-Workspace unter `docs/copy/` (Quelle der Wahrheit, Sie-Form, Entscheidungsprotokoll). `npm run sync` liest sie, entfernt interne Markierungen (PRÜFEN, ENTSCHEIDUNG, Ticketnummern) und schreibt `src/content/pages.json`. Die Seiten werden daraus gerendert. Seiten ohne belastbaren Inhalt stehen in `DRAFTS` in `scripts/sync-content.mjs` und werden nicht ausgeliefert.

```bash
npm run sync   # Texte übernehmen
npm run dev    # lokal auf http://localhost:3000
npm run build
```

## Struktur

- `src/lib/nav.ts`: Navigation, Footer, Linktexte für Querverweise
- `src/components/`: Header, Footer, PageView (rendert die Textblöcke), ContactForm
- `src/app/api/contact/route.ts`: Formular, speichert in Supabase und mailt über Resend
- `supabase/migrations/`: Datenbankschema
- Design-Tokens: `:root` in `src/app/globals.css`

## Konfiguration

Variablen siehe `.env.example`. Werte nur in Vercel und `.env.local`, nie in Git. Ohne Supabase und Resend antwortet das Formular mit 503 und zeigt einen Hinweis.

## Indexierung

Bis zum Go-live steht die Seite auf `noindex`. Umschalten mit `NEXT_PUBLIC_INDEXABLE=true`.

## Hinweis zu Next.js

Diese Version weicht von älteren Next.js-Versionen ab. Vor größeren Änderungen die Doku unter `node_modules/next/dist/docs/` lesen.
