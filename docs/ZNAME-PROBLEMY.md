# Známé problémy a nejistoty

## Prostředí

- **Disk D: je plný (0 GB volných).** Je na něm dočasná složka Claude Code i datový adresář lokálního Postgresu (služba `postgresql-x64-17` je zastavená; umístění dat zatím neověřené). Výstupy příkazů se můžou oříznout a zápisy selhat. Instalace běží s `npm_config_cache` a `TMP` na C:.
- **Lokálně není Docker.** Docker Compose se proto zatím nedá vyzkoušet na tomto počítači.

## Rozpory a nejasnosti v zadání k ověření

- **Příloha C, ověření platbou 1 Kč:** Stripe má pro každou měnu minimální částku a 1 Kč pod ní pravděpodobně bude. Ověřit v aktuální dokumentaci. Náhrada je platba vlastní kartou v plné ceně a následné vrácení, kterou zadání také připouští.
- **Příloha A, „Udělá jí to radost“:** text předpokládá rod odesílatele, jehož oslovení neznáme (`recipient_gender` se týká příjemce). V UI se použije neutrální znění.

- **Dárkové přání a sada 5:** zadání je prodává v ceníku (kap. 11), ale konfigurátor v kap. 4 popisuje jen platbu 49 Kč a hudba ani kredity nemají specifikaci. Pokud nebudou do spuštění hotové, musí z ceníku zmizet. Ceník je jednoduché upravit v `lib/content/product.ts`.

## Technická omezení

- **Rozpočet JS je skoro vyčerpaný:** úvodní stránka má 178 kB gzip z limitu 200 kB (měřeno 7. 11. 2026 přes `next start`), a to ještě bez 3D. Živá ukázka se proto musí načítat až po interakci.
- **`NEXT_PUBLIC_SITE_URL` a `INDEXING_ENABLED` se u statických stránek zapékají při buildu.** Canonical, JSON-LD a meta robots se u nich za běhu nezmění, proto se musí nastavit při sestavení Docker image a pro ostrou doménu udělat nový build. Výchozí stav bez proměnných je bezpečný (`noindex`).
- **CSP je zatím jen report-only** a povoluje `unsafe-inline` pro skripty. Před spuštěním se musí zpřísnit (app-dlr.9).

## Omezení, která ještě nejsou ověřená na zařízení

- Mikrofon v aplikačních prohlížečích, personalizace USDZ na iPhonu a AR spuštěné z ikonky na ploše (kap. 8 a 9). Vyžaduje reálný iPhone a Android.
