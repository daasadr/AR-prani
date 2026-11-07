## ADDED Requirements

### Requirement: Rozpočty se kontrolují automaticky
`npm run check` MUST selhat při překročení rozpočtu prerenderované veřejné stránky: JS 140 kB gzip, CSS 15 kB gzip, HTML 15 kB gzip, přednačtené fonty 100 kB. Zvýšení limitu SHALL mít důvod v `docs/ROZHODNUTI.md`.

#### Scenario: Těžká závislost na úvodní stránce
- **WHEN** změna zvýší počáteční JS úvodní stránky nad limit
- **THEN** `npm run check` skončí chybou a vypíše překročenou hodnotu

### Requirement: Měření na mobilu
CI MUST na úvodní stránce vyžadovat v Lighthouse (mobil) skóre výkonu alespoň 90, LCP do 2,5 s, CLS do 0,1 a TBT do 200 ms.

#### Scenario: Pomalá stránka
- **WHEN** změna zhorší některou z hodnot pod limit
- **THEN** CI změnu zastaví

### Requirement: Veřejné stránky jsou statické
Veřejné stránky SHALL být prerenderované a nesmí kvůli vykreslení čekat na databázi ani externí službu. Interaktivita MUST být omezena na nejmenší možné klientské komponenty.

#### Scenario: Nová obsahová stránka
- **WHEN** přibude stránka z mapy veřejných stránek
- **THEN** build ji označí jako statickou a neposílá kvůli ní klientský kód navíc

### Requirement: 3D a mikrofon se načítají až podle potřeby
`three`, `@google/model-viewer` a detekce foukání MUST být v samostatných částech načtených až po interakci. Stránka přání SHALL zobrazit obálku bez nich a scéna se MUST po klepnutí připravit do 2 s na středním Androidu přes 4G.

#### Scenario: První zobrazení obálky
- **WHEN** příjemce otevře odkaz a ještě neklepl na „Otevřít“
- **THEN** prohlížeč nestahuje three.js, model-viewer ani GLB

#### Scenario: Rychlé pokračování po klepnutí
- **WHEN** je obálka zobrazená a prohlížeč je v klidu
- **THEN** smí se scéna s nízkou prioritou přednačíst, pokud uživatel nemá zapnuté šetření daty

### Requirement: Soubory se servírují s dlouhou cache a kompresí
Soubory s otiskem v názvu MUST mít `Cache-Control: public, max-age=31536000, immutable` a textové odpovědi SHALL být komprimované. Modely GLB MUST splnit limit 2,5 MB.

#### Scenario: Opakovaná návštěva
- **WHEN** se příjemce vrátí z ikonky na ploše
- **THEN** statické soubory a model se načtou z cache bez síťového přenosu

### Requirement: Animace neblokují telefon
Animace MUST používat `transform` a `opacity` nebo GPU. Scéna SHALL při nízké snímkové frekvenci automaticky snížit počet částic a rozlišení a mimo obrazovku se MUST zastavit.

#### Scenario: Slabší telefon
- **WHEN** snímková frekvence dlouhodobě klesne pod 30 FPS
- **THEN** scéna sníží náročnost a sfouknutí dál funguje

### Requirement: Server odpovídá rychle
Stránka přání a čtecí API SHALL mít serverovou odezvu do 200 ms (p95) měřeno na serveru. Dotazy MUST používat indexy a odesílání e-mailů nesmí blokovat odpověď uživateli ani webhooku.

#### Scenario: Otevření přání
- **WHEN** příjemce otevře přání
- **THEN** server načte přání jedním dotazem přes unikátní index slugu a zápis otevření odpověď nezdrží
