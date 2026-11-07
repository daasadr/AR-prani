## 1. Základ a brána kvality

- [ ] 1.1 Založit aplikaci a `npm run check` (app-2di.1). Ověření: příkaz projde lokálně.
- [ ] 1.2 CI s testy, auditem závislostí a hledáním tajných klíčů (app-2di.8). Ověření: běh CI.

## 2. Security

- [ ] 2.1 Zóny, bezpečnostní hlavičky a CSP v režimu report-only (app-2di.3). Ověření: testy zón a hlaviček.
- [ ] 2.2 Rate limiting, moderace a Turnstile (app-dlr.4). Ověření: integrační testy.
- [ ] 2.3 Analytika bez skutečných slugů (app-dlr.8). Ověření: test převodu cesty.
- [ ] 2.4 Zálohy s testem obnovy a monitoring (app-dlr.10). Ověření: provedená obnova.

## 3. SEO, GEO, AEO

- [ ] 3.1 Fakta v `lib/content`, metadata, JSON-LD, sitemap, robots, llms.txt (app-2di.4). Ověření: testy nad mapou stránek.

## 4. Výkon

- [ ] 4.1 Rozpočty v `npm run check` a Lighthouse v CI (app-2di.8). Ověření: běh CI a záměrné překročení limitu.
- [ ] 4.2 Komprese a cache v nginx (viz beads). Ověření: hlavičky na testovací doméně.
- [ ] 4.3 Výkon se 3D na zařízeních a zpřísnění CSP (app-dlr.9). Ověření: měření na středním Androidu přes 4G.
