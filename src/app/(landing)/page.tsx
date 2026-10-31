import type { Metadata } from "next";
import { Landing } from "@/components/landing/Landing";

export const metadata: Metadata = {
  title: { absolute: "Kassensysteme für die Gastronomie aus Hannover | Matrix POS" },
  description:
    "Matrix NXT, die Cloud-Kasse für Restaurant, Hotel und Freizeitpark. Seit über 30 Jahren Gastro-Kassen, Support von Gastro-Profis an 7 Tagen. Demo buchen.",
};

export default function Home() {
  return <Landing />;
}
