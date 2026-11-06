import "@/components/landing/landing.css";


// Startseite nach Design "LP 2027 A2 – Benchmark": eigener Header und Footer, dunkler Hintergrund.
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <div className="lp">{children}</div>;
}
