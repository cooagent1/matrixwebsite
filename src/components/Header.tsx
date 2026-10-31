import Link from "next/link";
import { NAV, SUPPORT_PORTAL } from "@/lib/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-xl font-semibold tracking-tight" aria-label="Matrix POS Startseite">
          matrix<span className="text-accent-ink">POS</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {NAV.map((g) => (
            <div key={g.label} className="group relative">
              {g.href ? (
                <Link href={g.href} className={`nav-link ${g.label === "Matrix NXT" ? "font-semibold text-ink" : ""}`}>
                  {g.label}
                </Link>
              ) : (
                <button type="button" className="nav-link" aria-haspopup="true">
                  {g.label}
                </button>
              )}
              {g.children && (
                <div className="invisible absolute left-0 top-full min-w-64 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-xl border border-line bg-white p-2 shadow-lg">
                    {g.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block rounded-lg px-3 py-2 hover:bg-surface">
                          <span className="block text-sm font-medium">{c.label}</span>
                          {c.hint && <span className="block text-xs text-slate-500">{c.hint}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={SUPPORT_PORTAL} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-ink">
            Supportportal
          </a>
          <Link href="/demo" className="btn btn-primary">
            Demo buchen
          </Link>
        </div>

        {/* Mobil */}
        <details className="mobile-menu lg:hidden">
          <summary className="btn btn-ghost cursor-pointer list-none" aria-label="Menü">
            Menü
          </summary>
          <div className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white p-4 pb-24 shadow-lg">
            <ul className="space-y-1">
              {NAV.map((g) => (
                <li key={g.label}>
                  {g.children ? (
                    <details>
                      <summary className="cursor-pointer list-none rounded-lg px-3 py-3 font-medium hover:bg-surface">
                        {g.label}
                      </summary>
                      <ul className="mb-2 ml-3 border-l border-line pl-3">
                        {g.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-surface">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={g.href!} className="block rounded-lg px-3 py-3 font-medium hover:bg-surface">
                      {g.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a href={SUPPORT_PORTAL} target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-3 text-slate-600">
                  Supportportal
                </a>
              </li>
            </ul>
            <div className="fixed inset-x-0 bottom-0 border-t border-line bg-white p-4">
              <Link href="/demo" className="btn btn-primary w-full">
                Demo buchen
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
