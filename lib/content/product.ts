// Jediný zdroj faktů o produktu. Skládá se z něj text stránek, JSON-LD i llms.txt, aby si nemohly odporovat.
export const BRAND = {
  name: "Appdílna",
  product: "Přání s talismanem",
  promise: "Přání, které si nejen přečteš. Sfoukneš svíčku a dostaneš talisman štěstí na celý rok.",
  email: "ahoj@appdilna.cz",
  // Doplní majitelka před spuštěním (app-ipp.2). Údaje se nesmí odhadovat.
  operator: null as null | { name: string; ico: string; address: string },
};

export const VALIDITY_MONTHS = 24;

export const OFFERS = [
  {
    id: "basic",
    name: "Základní přání",
    priceCzk: 49,
    features: ["1 motiv a 1 talisman", "Text do 280 znaků", "Jméno a rok na talismanu", `Platnost ${VALIDITY_MONTHS} měsíců`],
  },
  {
    id: "gift",
    name: "Dárkové přání",
    priceCzk: 89,
    features: ["Vše ze základního přání", "Výběr hudby", "Vlastní název talismanu", "Oznámení o otevření a poděkování"],
  },
  {
    id: "pack",
    name: "Sada 5 přání",
    priceCzk: 199,
    features: ["5 kreditů na libovolná přání", "Platnost kreditů 12 měsíců"],
  },
] as const;

export const FAQ = [
  {
    q: "Kolik stojí Přání s talismanem?",
    a: `Základní Přání s talismanem stojí ${OFFERS[0].priceCzk} Kč, dárkové ${OFFERS[1].priceCzk} Kč a sada pěti přání ${OFFERS[2].priceCzk} Kč. Uvedené ceny jsou konečné.`,
  },
  {
    q: "Musí si příjemce něco instalovat?",
    a: "Ne. Příjemce Přání s talismanem otevře odkazem v prohlížeči telefonu, nic neinstaluje a nic nevyplňuje.",
  },
  {
    q: "Jak dlouho přání vydrží?",
    a: `Přání s talismanem je dostupné minimálně ${VALIDITY_MONTHS} měsíců od zaplacení.`,
  },
  {
    q: "Ukládá se zvuk z mikrofonu?",
    a: "Ne. Foukání do mikrofonu se u Přání s talismanem vyhodnocuje přímo v telefonu a zvuk se nikam neposílá ani neukládá. Svíčku lze sfouknout i klepnutím, bez mikrofonu.",
  },
  {
    q: "Potřebuju k vytvoření přání účet?",
    a: "Ne. Přání s talismanem vytvoříš bez registrace. E-mail je potřeba jen kvůli odkazu a dokladu.",
  },
] as const;
