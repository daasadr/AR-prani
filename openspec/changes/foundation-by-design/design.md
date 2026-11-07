## Context

Přání se otevírá bez přihlášení, takže kdo má odkaz, vidí jména a osobní text. Veřejný web musí být naopak co nejlépe čitelný pro roboty. Základní rozhodnutí je proto rozdělit aplikaci na dvě zóny.

## Goals / Non-Goals

**Goals:** Pravidla, která se dají ověřit automaticky a platí pro každou další změnu.

**Non-Goals:** Formální audit, certifikace nebo právní posouzení. Texty a podmínky dál potvrzuje účetní nebo právník (kap. 11).

## Decisions

### Dvě zóny s centrálním pravidlem
- **Veřejná zóna** (`/`, `/cenik`, `/faq` a další): vykreslená na serveru, indexovatelná, se strukturovanými daty.
- **Soukromá zóna** (`/p/*`, `/hotovo/*`, `/admin`, `/api/*`): `noindex`, `Referrer-Policy: no-referrer`, bez sledovacích identifikátorů v URL.

Zóna se určuje na jednom místě podle cesty a test ověřuje každou cestu z mapy stránek. Nová stránka tak nemůže omylem skončit bez pravidla.

### Roboti: hlavička místo zákazu v robots.txt
Soukromé cesty se v `robots.txt` nevypisují, aby se robot dostal k hlavičce `noindex`. Viz `docs/ROZHODNUTI.md`, bod 9.

### AI roboti jsou na veřejné zóně povolení
Bez přístupu robotů nelze GEO ani AEO dělat. Soukromou zónu chrání neuhodnutelná adresa a `noindex`, ne přání roboty, aby se chovali slušně.

### Fakta na jednom místě
Ceny, platnost, podmínky a odpovědi na časté dotazy žijí v `lib/content/`. Z toho se skládá text stránek, JSON-LD i `llms.txt`, takže si nemůžou odporovat.

### Rate limiting v Postgresu
Na jednom serveru by stačila i paměť, ta se ale při nasazení vynuluje. Redis by přidal další službu kvůli malému provozu.

## Risks / Trade-offs

- **CSP a 3D knihovny:** `three` a `model-viewer` můžou potřebovat `blob:` workery a WASM. Politika se proto nejdřív zapne v režimu report-only a zpřísní se po ověření na zařízeních.
- **`llms.txt`:** není potvrzené, že ho velké AI služby čtou. Generuje se automaticky ze stejných dat, takže nic nestojí, ale nepočítáme s ním jako s hlavní cestou.
- **Označení FAQ a HowTo:** Google tyto bohaté výsledky výrazně omezil, takže nemusí být vidět ve výsledcích. Data zůstávají, protože zadání FAQPage vyžaduje a pomáhají strojovému porozumění.
- **Tajný odkaz se dá přeposlat:** to je záměr produktu. Riziko snižuje minimalizace údajů, možnost přání vypnout a omezená doba platnosti.
