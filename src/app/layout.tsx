import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://matrixpos.de"),
  title: { default: "Matrix POS – Kassensysteme für die Gastronomie", template: "%s" },
  description: "Matrix NXT, Matrix POS und Matrix PAY: Kassensysteme für Restaurant, Hotel und Freizeitpark aus Hannover.",
  // Bis zum Go-live nicht indexieren. Umschalten: NEXT_PUBLIC_INDEXABLE=true
  robots: process.env.NEXT_PUBLIC_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
