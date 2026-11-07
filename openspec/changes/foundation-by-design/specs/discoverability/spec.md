## ADDED Requirements

### Requirement: Obsah je čitelný bez JavaScriptu
Veřejné stránky MUST vracet hlavní obsah přímo v HTML ze serveru. 3D prvky SHALL pouze doplňovat obsah a nesmí být jeho jediným nositelem.

#### Scenario: Robot bez JavaScriptu
- **WHEN** robot načte `/`, `/cenik` nebo `/faq` bez spuštění JavaScriptu
- **THEN** v HTML najde nadpis, popis produktu, ceny a odpovědi

### Requirement: Základní SEO každé veřejné stránky
Každá veřejná stránka MUST mít vlastní český titulek a popis, kanonickou URL, jeden `h1`, Open Graph údaje a záznam v `sitemap.xml`.

#### Scenario: Kontrola veřejných stránek
- **WHEN** automatický test projde mapu veřejných stránek
- **THEN** každá stránka požadované údaje má a žádné dvě nemají stejný titulek

### Requirement: Soukromé stránky se neindexují
Soukromá zóna MUST vracet `X-Robots-Tag: noindex` a nesmí být v `sitemap.xml`. Open Graph přání SHALL být neutrální a nesmí prozradit jména, text ani talisman.

#### Scenario: Robot najde odkaz na přání
- **WHEN** robot načte `/p/[slug]`
- **THEN** dostane hlavičku `noindex` a žádná osobní data v metadatech

#### Scenario: Náhled odkazu v Messengeru
- **WHEN** aplikace vytvoří náhled odkazu na přání
- **THEN** ukáže jen obálku a text „Máš tu přání 🎁“

### Requirement: Strukturovaná data odpovídají skutečnosti
Veřejné stránky MUST obsahovat platné JSON-LD (`Organization`, `WebSite`, `Product`, `Offer`, `FAQPage`) vytvořené ze stejných dat jako viditelný text. Systém nesmí uvádět hodnocení, recenze ani jiné údaje, které nejsou skutečné.

#### Scenario: Změna ceny
- **WHEN** se v jednom zdroji změní cena
- **THEN** změní se ve viditelném textu, v `Offer` i v `llms.txt`

#### Scenario: Zatím bez recenzí
- **WHEN** neexistují skutečné recenze
- **THEN** výstup neobsahuje `aggregateRating` ani `review`

### Requirement: AEO, přímé odpovědi na otázky
Stránky odpovídající na dotaz MUST uvést přímou odpověď hned pod nadpisem. FAQ SHALL být psané otázkami, jak je lidé skutečně kladou, s odpovědí srozumitelnou i bez okolního kontextu.

#### Scenario: Strojové převzetí odpovědi
- **WHEN** odpovědní služba převezme jeden odstavec z `/faq`
- **THEN** odstavec sám uvádí, o čem mluví, včetně názvu produktu a konkrétních údajů

### Requirement: GEO, dohledatelnost v generativních službách
Web MUST uvádět ověřitelná fakta o produktu a provozovateli (co to je, cena, platnost, kdo za tím stojí, datum aktualizace) a jednotně pojmenovávat značku. `robots.txt` SHALL povolit vyhledávacím a AI robotům veřejnou zónu a web SHALL generovat `llms.txt` s přehledem veřejných stránek.

#### Scenario: Přístup AI robota
- **WHEN** do `robots.txt` nahlédne GPTBot, OAI-SearchBot, ClaudeBot nebo PerplexityBot
- **THEN** pravidla mu nebrání načíst veřejné stránky

#### Scenario: Obsah llms.txt
- **WHEN** se vygeneruje `llms.txt`
- **THEN** obsahuje jen veřejné stránky a žádnou soukromou cestu

### Requirement: Výkon je součástí dohledatelnosti
Úvodní stránka MUST splnit rozpočty z kap. 14 zadání a 3D se SHALL načítat až po interakci nebo mimo hlavní vykreslení.

#### Scenario: Kontrola v CI
- **WHEN** CI změří úvodní stránku
- **THEN** počáteční JS je do 200 kB gzip a skóre Lighthouse pro mobil je alespoň 90
