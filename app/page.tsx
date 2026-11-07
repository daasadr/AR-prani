import { BRAND, FAQ, OFFERS, VALIDITY_MONTHS } from "@/lib/content/product";
import { buildJsonLd, serializeJsonLd, SITE_URL } from "@/lib/seo";

const STEPS = [
  { title: "Vyber a napiš", text: "Zvol příležitost a talisman a napiš pár vět. Zabere to dvě minuty." },
  { title: "Pošli odkaz", text: "Po zaplacení dostaneš odkaz, který pošleš přes WhatsApp, Messenger nebo SMS." },
  { title: "Oslavenec sfoukne svíčku", text: "Fouknutím do telefonu zhasne svíčku a objeví se talisman štěstí." },
];

// Kočka se přidá, až bude hotový model (zadání, kap. 5). Nabízí se jen to, co existuje.
const TALISMANS = [
  { name: "Zářící hvězda štěstí", text: "Zlatá hvězda s jiskrami, která se jemně vznáší." },
  { name: "Čtyřlístek", text: "Lesklý zlatozelený čtyřlístek na podstavci." },
];

const OCCASIONS = [
  { name: "Narozeniny", text: "Dort se svíčkou v tmavé místnosti plné girland." },
  { name: "Vánoce", text: "Svíčka u okna, za kterým padá sníh." },
  { name: "PF 2027", text: "Lucerna v zimní noci a po sfouknutí „2027“ z jisker." },
];

const TRUST = [
  "Bez registrace",
  "Funguje na iPhonu i Androidu bez instalace",
  `Přání platí ${VALIDITY_MONTHS / 12} roky`,
  "Zvuk z mikrofonu se neukládá",
  "Dělá ji jedna malá česká dílna",
];

const heading = "font-display text-3xl sm:text-4xl font-semibold";
const section = "mx-auto max-w-5xl px-4 py-16";
const card = "rounded-2xl p-6";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd(SITE_URL)) }} />

      <header className="mx-auto flex max-w-5xl items-center px-4 py-5">
        <span className="font-display text-xl font-semibold lowercase">
          <span aria-hidden="true" className="text-gold">✦ </span>
          appdílna
        </span>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-4 pb-20 pt-10 text-center">
          <div aria-hidden="true" className="flex flex-col items-center pb-10">
            <div className="flame h-16 w-9" />
            <div className="h-24 w-6 rounded-sm bg-cream/90" />
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">Sfoukni svíčku. Získej štěstí na celý rok.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream/85">
            Přání, které si nejen přečteš. Sfoukneš svíčku a dostaneš talisman štěstí, který si uložíš do telefonu.
          </p>
          {/* Obyčejný odkaz: úvodní stránka nemá kvůli jednomu tlačítku přednačítat další trasu. */}
          <a href="/vytvorit" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 text-lg font-semibold text-night hover:bg-amber">
            Vytvořit přání · {OFFERS[0].priceCzk} Kč
          </a>
        </section>

        <section id="jak-to-funguje" className="bg-violet">
          <div className={section}>
            <h2 className={heading}>Jak to funguje</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true" className="font-display text-4xl text-gold">{index + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-cream/85">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={section}>
          <h2 className={heading}>Talismany</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {TALISMANS.map((talisman) => (
              <li key={talisman.name} className={`${card} bg-violet`}>
                <h3 className="text-lg font-semibold text-gold">{talisman.name}</h3>
                <p className="mt-1 text-cream/85">{talisman.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={section}>
          <h2 className={heading}>Pro koho a kdy</h2>
          <p className="mt-3 text-cream/85">I na poslední chvíli, hotovo za 2 minuty.</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {OCCASIONS.map((occasion) => (
              <li key={occasion.name}>
                <h3 className="text-lg font-semibold text-gold">{occasion.name}</h3>
                <p className="mt-1 text-cream/85">{occasion.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-cream text-night">
          <section id="cenik" className={section}>
            <h2 className={heading}>Ceník</h2>
            <p className="mt-3">Ceny jsou konečné.</p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {OFFERS.map((offer) => (
                <li key={offer.id} className={`${card} bg-white shadow-sm`}>
                  <h3 className="text-lg font-semibold">{offer.name}</h3>
                  <p className="font-display mt-2 text-4xl font-semibold">{offer.priceCzk} Kč</p>
                  <ul className="mt-4 list-disc space-y-1 pl-5">
                    {offer.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className={section}>
            <h2 className={heading}>Na čem si dáváme záležet</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {TRUST.map((item) => <li key={item}><span aria-hidden="true" className="text-amber">✦ </span>{item}</li>)}
            </ul>
          </section>

          <section id="faq" className={section}>
            <h2 className={heading}>Časté dotazy</h2>
            <dl className="mt-8 space-y-6">
              {FAQ.map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-lg font-semibold">{q}</dt>
                  <dd className="mt-1">{a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>

      <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-cream/80">
        <p className="font-semibold">{BRAND.name}</p>
        <p className="mt-1">
          Kontakt: <a className="underline" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </p>
        {BRAND.operator ? (
          <p className="mt-1">{BRAND.operator.name}, IČO {BRAND.operator.ico}, {BRAND.operator.address}</p>
        ) : (
          <p className="mt-1">Údaje o provozovateli doplníme před spuštěním prodeje.</p>
        )}
      </footer>
    </>
  );
}
