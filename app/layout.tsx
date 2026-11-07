import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { BRAND } from "@/lib/content/product";
import { isIndexingEnabled, SITE_URL } from "@/lib/seo";
import "./globals.css";

// next/font stáhne fonty při buildu a servíruje je z vlastní domény, Google CDN se za běhu nevolá.
// latin-ext obsahuje české znaky (ě š č ř ž ů ď ť ň).
// Výkon: nadpisy používají jen řez 600, takže stačí statický soubor místo celého variabilního fontu.
// Přednačítá se jen font hlavního nadpisu (LCP). Inter dorazí bez preload a výpadek pokryje upravený záložní font.
// display: swap, ne optional: optional zlepšil LCP jen o 0,1 s a zákazník by mohl při první návštěvě přijít o značkové písmo.
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], weight: "600", variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Online přání se svíčkou a talismanem štěstí | ${BRAND.name}`,
  description: "Vytvoř za 2 minuty online přání. Příjemce sfoukne svíčku a dostane talisman štěstí. Od 49 Kč, bez registrace a bez instalace.",
  alternates: { canonical: "/" },
  robots: isIndexingEnabled() ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: BRAND.name,
    title: "Sfoukni svíčku. Získej štěstí na celý rok.",
    description: BRAND.promise,
    url: "/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
