import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalText";

export const metadata: Metadata = { title: "Impressum | Matrix POS" };

export default function Page() {
  return <LegalPage title="Impressum" file="impressum.md" />;
}
