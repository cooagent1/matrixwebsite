import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalText";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen | Matrix POS" };

export default function Page() {
  return <LegalPage title="Allgemeine Geschäftsbedingungen" file="agb.md" />;
}
