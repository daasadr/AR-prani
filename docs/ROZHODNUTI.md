# Rozhodnutí a odchylky od zadání

Formát: datum, rozhodnutí, důvod. Kdo rozhodl: **majitelka**, nebo **vývoj** (může majitelka změnit).

## 2026-11-07

1. **Přepojení domény až při spuštění (majitelka).** `appdilna.cz` zatím dál obsluhuje starý web, nový běží na `test.appdilna.cz`. Doména tak nezůstane prázdná a HTTPS je k dispozici pro testy mikrofonu a AR.
2. **Archivaci starého projektu dělá majitelka sama (majitelka).** Vývoj se serveru nedotýká, dokud nedostane přístup. Přepojení je blokované potvrzením zálohy.
3. **Hosting na stávajícím serveru (majitelka).** Odchylka od zadání (kap. 6): reverzní proxy zůstává nginx, Caddy se nepoužije. Aplikace a Postgres poběží v Dockeru. Důvod: nulové dodatečné náklady a případné další weby na serveru zůstanou běžet. Kapacitu serveru je třeba ještě ověřit.
4. **Pošta zůstává na Thinline (vývoj).** Při přepojení se mění jen záznamy A pro `appdilna.cz` a `www`, MX se nemění. SPF, DKIM a DMARC na doméně zatím nejsou a musí se přidat tak, aby pokrývaly Thinline i Resend.
5. **Cloudflare je zatím otevřené (vývoj).** Zadání ho počítá před webem, ale DNS je na Thinline. Přesun nameserverů je třeba připravit včetně MX, proto se nedělá současně s fází 0.
6. **Drizzle místo Prisma (vývoj).** Zadání připouští obojí. Drizzle nepotřebuje samostatný engine, což se hodí pro menší Docker image a jednoduché SQL migrace.
7. **Přidané trvalé požadavky: security by design a SEO/GEO/AEO by design (majitelka).** Jsou nad rámec zadání a jsou závazné pro všechny fáze. Viz `openspec/specs/`.
8. **OpenSpec a beads (majitelka, rozdělení vývoj).** OpenSpec drží požadavky a návrhy změn, beads pořadí a stav práce. `tasks.md` v OpenSpecu odkazuje na beads, stav se nevede dvakrát.
9. **Roboti smí na `/p/` a `/hotovo/`, indexaci brání `X-Robots-Tag: noindex` (vývoj).** Upřesnění kap. 10. Zákaz v `robots.txt` by robotovi zabránil hlavičku přečíst a URL by se přesto mohla dostat do indexu. `robots.txt` navíc veřejně vypisuje cesty.
10. **`/hotovo/[id]` používá náhodný neuhodnutelný token, ne ID objednávky (vývoj).** Upřesnění kap. 4. Stránka ukazuje odkaz na přání, takže se k ní přistupuje stejně opatrně jako k přání samotnému.
11. **Projekt je na disku C: (vývoj).** Disk D: je plný (0 GB volných), viz `ZNAME-PROBLEMY.md`.
12. **Výkon by design (majitelka).** Třetí trvalý požadavek vedle security a SEO/GEO/AEO. Vlastní rozpočet JS je 140 kB gzip, přísnější než 200 kB v zadání, aby se rychlost nezhoršovala postupně.
13. **S databází se pracuje až na serveru (majitelka).** Úkol s DB schématem a tím i Stripe webhook čekají na přístup k serveru.
14. **Práce běží ve větvi `foundation` (vývoj).** Do `main` se dostane přes GitHub repo, které založí majitelka.
