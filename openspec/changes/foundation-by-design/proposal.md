## Why

Prodejní verze má vzniknout za 14 dní a důvěra je jediný kapitál značky. Bezpečnost a dohledatelnost (klasické vyhledávače, odpovědní a generativní AI) se dodatečně doplňují draze a odkaz na přání je zároveň jediným klíčem k osobním údajům. Proto platí od první fáze jako závazné požadavky s automatickou kontrolou. Naplňuje kapitoly 6, 10, 11 a 14 zadání a rozšiřuje je podle pokynu majitelky ze 7. 11. 2026.

## What Changes

- Nová capability `security`: přání jako tajný odkaz, zacházení s platbami a osobními údaji, hlavičky, ochrana API a kontroly v CI.
- Nová capability `discoverability`: SEO, GEO a AEO, tedy obsah vykreslený na serveru, strukturovaná data, přímé odpovědi, pravidla pro roboty a ochrana soukromých stránek.
- Nová capability `performance`: co nejrychlejší načítání a fungování, s automaticky hlídanými rozpočty.
- Automatická brána `npm run check` a CI, které to kontrolují lokálně i při každé změně.

## Capabilities

### New Capabilities
- `security`: závazná bezpečnostní pravidla pro všechny části produktu.
- `discoverability`: závazná pravidla pro SEO, GEO a AEO.
- `performance`: závazné rozpočty a pravidla pro rychlost načítání a běhu.

### Modified Capabilities
Žádné.

## Impact

Dotkne se všech stránek a API, konfigurace Next.js a CI.

### Dopad na bezpečnost
Zavádí základní pravidla, viz `specs/security/spec.md`.

### Dopad na SEO/GEO/AEO
Zavádí základní pravidla, viz `specs/discoverability/spec.md`.

### Dopad na výkon
Zavádí rozpočty a měření, viz `specs/performance/spec.md`.
