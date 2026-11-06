import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { LpFooter, LpHeader } from "@/components/landing/Chrome";
import "@/components/landing/landing.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--font-bricolage" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

// Unterseiten im A2-Design: dunkel, gleiche Schriften und Menü-Pille wie die Startseite, aber ohne Hero-Video.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`lp lp-sub ${bricolage.variable} ${jetbrains.variable} ${inter.variable}`}>
      <a href="#main" className="skip-link">Zum Inhalt springen</a>
      <LpHeader />
      <main id="main" className="flex-1">{children}</main>
      <LpFooter />
    </div>
  );
}
