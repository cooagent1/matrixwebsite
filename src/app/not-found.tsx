import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="wrap py-28">
          <p className="eyebrow text-accent-ink">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Diese Seite gibt es nicht.</h1>
          <p className="prose-p mt-4 text-slate-700">Vielleicht hilft Ihnen die Startseite oder ein kurzes Gespräch weiter.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/" className="btn btn-primary">Zur Startseite</Link>
            <Link href="/demo" className="btn btn-ghost">Demo buchen</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
