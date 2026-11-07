import { ConsentLink } from "@/components/Consent";
import Link from "next/link";
import { FOOTER } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <p className="text-xl font-semibold text-white">
              matrix<span className="text-accent">POS</span>
            </p>
            <p className="mt-3 text-sm">
              Matrix POS GmbH
              <br />
              Eckenerstraße 2
              <br />
              30179 Hannover
            </p>
            <p className="mt-3 text-sm">
              <a href="tel:+495115929380" className="hover:text-white">+49 (0)511 592938-0</a>
              <br />
              <a href="mailto:sales@matrixpos.de" className="hover:text-white">sales@matrixpos.de</a>
            </p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {col.items.map((it) =>
                  it.external ? (
                    <li key={it.href}>
                      <a href={it.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        {it.label}
                      </a>
                    </li>
                  ) : (
                    <li key={it.href}>
                      <Link href={it.href} className="hover:text-white">
                        {it.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm">
          <Link href="/impressum" className="hover:text-white">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
          <Link href="/agb" className="hover:text-white">AGB</Link>
          <ConsentLink />
          <span className="ml-auto">© Matrix POS GmbH</span>
        </div>
      </div>
    </footer>
  );
}
