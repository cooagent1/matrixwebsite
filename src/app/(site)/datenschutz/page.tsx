import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalText";

export const metadata: Metadata = { title: "Datenschutzerklärung | Matrix POS" };

export default function Page() {
  return <LegalPage title="Datenschutzerklärung" file="datenschutz.md" />;
}
