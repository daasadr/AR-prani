## ADDED Requirements

### Requirement: Přání je chráněno neuhodnutelným odkazem
Systém SHALL vytvářet slug přání a token stránky `/hotovo` kryptograficky bezpečným generátorem s entropií alespoň 64 bitů. Sekvenční ID se nesmí objevit v žádné veřejné URL.

#### Scenario: Pokus o uhodnutí odkazu
- **WHEN** někdo opakovaně zkouší neexistující slugy
- **THEN** dostane stejnou odpověď 404 jako u každého neplatného slugu a rate limit ho omezí

#### Scenario: Nezaplacené nebo vypnuté přání
- **WHEN** někdo otevře slug přání, které není ve stavu `paid`
- **THEN** systém nevrátí jména ani text přání

### Requirement: Tajné odkazy neunikají
Soukromá zóna MUST používat `Referrer-Policy: no-referrer` a analytika, logy ani hlášení chyb nesmí obsahovat skutečný slug, token ani osobní údaje.

#### Scenario: Otevření přání se započítá do analytiky
- **WHEN** příjemce otevře `/p/abc123`
- **THEN** analytika zaznamená cestu jako `/p/[slug]`

#### Scenario: Chyba na stránce přání
- **WHEN** se při zpracování přání stane chyba
- **THEN** hlášení chyby neobsahuje slug, jména, text přání ani e-mail

### Requirement: Platby rozhoduje server
Systém MUST určovat cenu na serveru a stav `paid` SHALL nastavit pouze webhook s ověřeným podpisem. Zpracování webhooku MUST být idempotentní.

#### Scenario: Podvržený webhook
- **WHEN** přijde webhook s neplatným podpisem
- **THEN** systém ho odmítne a nic nezmění

#### Scenario: Opakovaný webhook
- **WHEN** Stripe doručí stejnou událost dvakrát
- **THEN** přání je zaplacené jednou a e-mail odejde jednou

#### Scenario: Podvržená cena
- **WHEN** klient pošle v požadavku vlastní částku
- **THEN** systém ji ignoruje a použije cenu ze serveru

### Requirement: Vstup je nedůvěryhodný
Všechny vstupy MUST projít validací na serveru a text od uživatele SHALL být vždy vykreslen jako prostý text ve webu, e-mailu, manifestu i na plaketě.

#### Scenario: Kód ve věnování
- **WHEN** odesílatel vloží do věnování HTML nebo skript
- **THEN** příjemce ho uvidí jako obyčejný text a nic se nespustí

#### Scenario: Zalomení řádku ve jménu
- **WHEN** jméno obsahuje znaky nového řádku
- **THEN** validace ho odmítne nebo znaky odstraní, takže se nedostanou do hlaviček e-mailu

### Requirement: Bezpečnostní hlavičky
Každá odpověď MUST obsahovat HSTS, CSP, `X-Content-Type-Options`, ochranu proti vložení do rámce a `Permissions-Policy`, která povoluje mikrofon a AR jen vlastnímu původu.

#### Scenario: Kontrola hlaviček
- **WHEN** automatický test načte stránku z každé zóny
- **THEN** všechny požadované hlavičky jsou přítomné

### Requirement: Ochrana proti zneužití
Veřejná API, která zapisují data nebo posílají e-mail, MUST mít rate limit a formuláře SHALL mít ochranu proti robotům. E-mail odesílatele se nesmí příjemci nikdy zobrazit.

#### Scenario: Opakované poděkování
- **WHEN** někdo opakovaně volá poděkování pro jedno přání
- **THEN** odesílateli přijde nejvýše jeden e-mail a další volání jsou omezena

#### Scenario: Data pro příjemce
- **WHEN** klient načte data přání
- **THEN** odpověď neobsahuje e-mail kupujícího ani platební údaje

### Requirement: Zvuk z mikrofonu neopouští zařízení
Detekce sfouknutí MUST běžet pouze v prohlížeči. Zvuk se nesmí odesílat ani ukládat a mikrofon SHALL být po sfouknutí nebo opuštění scény vypnut.

#### Scenario: Konec scény
- **WHEN** je svíčka sfouknuta nebo příjemce scénu opustí
- **THEN** všechny audio stopy jsou zastaveny

### Requirement: Admin je chráněný
`/admin` MUST vyžadovat silné ověření a odmítnout přístup bez něj. Každé vypnutí přání SHALL být zaznamenané.

#### Scenario: Nepřihlášený přístup
- **WHEN** nepřihlášený návštěvník otevře `/admin` nebo jeho API
- **THEN** nedostane žádná data

### Requirement: Automatické kontroly
CI MUST zastavit změnu při nalezení tajného klíče v kódu, zranitelné produkční závislosti vysoké závažnosti nebo selhání bezpečnostních testů. Tajné klíče se SHALL držet pouze v prostředí.

#### Scenario: Klíč v commitu
- **WHEN** změna obsahuje tajný klíč
- **THEN** CI selže
