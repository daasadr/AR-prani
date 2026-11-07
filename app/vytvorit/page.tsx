import type { Metadata } from "next";
import Link from "next/link";

// Dočasná stránka, aby CTA nevedlo na 404. Nahradí ji konfigurátor (app-924.7 ve fázi 1).
export const metadata: Metadata = {
  title: "Dílna se teprve otevírá | Appdílna",
  robots: { index: false, follow: false },
};

export default function CreatePlaceholderPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold">Dílna se teprve otevírá</h1>
      <p className="mt-4 text-cream/85">Tvorbu přání právě dokončujeme. Brzy tu bude.</p>
      <Link href="/" className="mt-8 inline-block underline">Zpět na úvod</Link>
    </main>
  );
}
