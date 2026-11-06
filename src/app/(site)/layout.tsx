import { LpFooter, LpHeader } from "@/components/landing/Chrome";
import "@/components/landing/landing.css";


// Unterseiten im A2-Design: dunkel, gleiche Schriften und Menü-Pille wie die Startseite, aber ohne Hero-Video.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lp lp-sub">
      <a href="#main" className="skip-link">Zum Inhalt springen</a>
      <LpHeader />
      <main id="main" className="flex-1">{children}</main>
      <LpFooter />
    </div>
  );
}
