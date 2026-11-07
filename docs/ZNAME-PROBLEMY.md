# Známé problémy a nejistoty

## Prostředí

- **Disk D: je plný (0 GB volných).** Je na něm dočasná složka Claude Code i datový adresář lokálního Postgresu (služba `postgresql-x64-17` je zastavená; umístění dat zatím neověřené). Výstupy příkazů se můžou oříznout a zápisy selhat. Instalace běží s `npm_config_cache` a `TMP` na C:.
- **Lokálně není Docker.** Docker Compose se proto zatím nedá vyzkoušet na tomto počítači.

## Rozpory a nejasnosti v zadání k ověření

- **Příloha C, ověření platbou 1 Kč:** Stripe má pro každou měnu minimální částku a 1 Kč pod ní pravděpodobně bude. Ověřit v aktuální dokumentaci. Náhrada je platba vlastní kartou v plné ceně a následné vrácení, kterou zadání také připouští.
- **Příloha A, „Udělá jí to radost“:** text předpokládá rod odesílatele, jehož oslovení neznáme (`recipient_gender` se týká příjemce). V UI se použije neutrální znění.

- **Dárkové přání a sada 5:** zadání je prodává v ceníku (kap. 11), ale konfigurátor v kap. 4 popisuje jen platbu 49 Kč a hudba ani kredity nemají specifikaci. Pokud nebudou do spuštění hotové, musí z ceníku zmizet. Ceník je jednoduché upravit v `lib/content/product.ts`.

## Technická omezení

- **Většinu JS tvoří samotný framework:** úvodní stránka má okolo 135 kB gzip i bez vlastní interaktivity, takže kód 3D ukázky se musí načítat až po interakci. Aktuální hodnoty vypisuje `npm run check`.
- **Lighthouse v CI zatím neblokuje změny, což je dočasná odchylka od `specs/performance`.** Lokální měření úvodní stránky (Windows, localhost, 7. 11. 2026) se podle metody rozchází. Simulace: výkon 94–96, LCP 2,6–2,9 s, TBT 100 ms. Skutečné zpomalení: výkon 87–90, LCP 1,5–1,6 s, TBT 380–490 ms. Limity LCP 2,5 s a TBT 200 ms proto zatím nejsou spolehlivě splněné a rozhodne měření na testovací doméně a reálném Androidu. Závazné jsou zatím rozpočty v `npm run check`.
- **`NEXT_PUBLIC_SITE_URL` a `INDEXING_ENABLED` musí být nastavené při buildu i za běhu.** Canonical, JSON-LD a meta robots se u statických stránek zapékají při buildu, `robots.txt`, sitemap a `llms.txt` je čtou za běhu. Pro ostrou doménu je potřeba nový build. Výchozí stav bez proměnných je bezpečný (`noindex`).
- **`experimental.inlineCss`** je v Next.js experimentální volba. Přidává asi 5 kB do HTML a odstraňuje blokující CSS. Při problémech ji lze bez dopadu na funkce vypnout.
- **CSP je zatím jen report-only** a povoluje `unsafe-inline` pro skripty. Před spuštěním se musí zpřísnit (app-dlr.9).

## Omezení, která ještě nejsou ověřená na zařízení

- Mikrofon v aplikačních prohlížečích, personalizace USDZ na iPhonu a AR spuštěné z ikonky na ploše (kap. 8 a 9). Vyžaduje reálný iPhone a Android.
