import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CONSENT_BOOT, ConsentBanner } from "@/components/Consent";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION, WEBSITE } from "@/lib/seo";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://matrixpos.de"),
  title: { default: "Matrix POS – Kassensysteme für die Gastronomie", template: "%s" },
  description: "Matrix NXT, Matrix POS und Matrix PAY: Kassensysteme für Restaurant, Hotel und Freizeitpark aus Hannover.",
  // Bis zum Go-live nicht indexieren. Umschalten: NEXT_PUBLIC_INDEXABLE=true
  openGraph: { type: "website", locale: "de_DE", siteName: "Matrix POS" },
  twitter: { card: "summary_large_image" },
  robots: process.env.NEXT_PUBLIC_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" suppressHydrationWarning className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOT }} />
        <JsonLd data={[ORGANIZATION, WEBSITE]} />
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
