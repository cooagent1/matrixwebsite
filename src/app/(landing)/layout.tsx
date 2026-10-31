import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "@/components/landing/landing.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--font-bricolage" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

// Startseite nach Design "LP 2027 A2 – Benchmark": eigener Header und Footer, dunkler Hintergrund.
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`lp ${bricolage.variable} ${jetbrains.variable} ${inter.variable}`}>{children}</div>;
}
