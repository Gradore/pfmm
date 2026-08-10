# pfmm.de — Vollständige Inhaltserfassung

**Praxis für Marketing und Motivation — Erich Grikscheit, Karben**
Erfasst am: 10. August 2026 · Quelle: https://www.pfmm.de/
Umfang: 11 Seiten, 56 Bild-/Asset-Dateien, 5,10 MB Medien

---

## Inhaltsverzeichnis

1. [Stammdaten & Seitenstruktur](#1-stammdaten--seitenstruktur)
2. [Design-System: Farben, Schriften, Symbole](#2-design-system-farben-schriften-symbole)
3. [Seiteninhalte 1:1](#3-seiteninhalte-11)
4. [Impressum](#4-impressum)
5. [Datenschutzerklärung](#5-datenschutzerklärung)
6. [Bildverzeichnis](#6-bildverzeichnis)
7. [PDF-Dokumente](#7-pdf-dokumente)
8. [Technischer Ist-Zustand](#8-technischer-ist-zustand)

---

## 1. Stammdaten & Seitenstruktur

### Unternehmen

| Feld | Wert |
|---|---|
| Firma | Praxis für Marketing & Motivation |
| Inhaber | Erich Grikscheit |
| Anschrift | Max-Planck-Str. 27, 61184 Karben |
| Telefon | 0 60 39 / 45 45 8 |
| Mobil | 0170 46 33 088 |
| E-Mail (Impressum, Kontakt, Anfahrt, Datenschutz-Seitenspalte) | e.grikscheit@t-online.de |
| E-Mail (Datenschutz-Fließtext) | info@pfmm.de |
| Finanzamt | Friedberg/Hessen |
| Steuernummer | 16 822 602 68 |
| USt-IdNr. | DE112221468 |
| Inhaltlich verantwortlich | Erich Grikscheit |
| Gestaltung (alt) | Martin Gomoll Design |
| Autor im Quelltext | Steffen Klemenz |
| LinkedIn | linkedin.com/in/erich-grikscheit-pfmm |
| Geokoordinaten (Google Maps) | 50.222643 / 8.765120 |
| Copyright-Zeile | © 2026 - Praxis für Marketing und Motivation |

> **Hinweis Datenkonsistenz:** Zwei unterschiedliche E-Mail-Adressen im Bestand. Externe Verzeichnisse (z. B. oeffnungszeitenbuch.de) führen zudem noch die alte Anschrift **Dieselstraße 22** in Karben — für lokales SEO relevant.

### Seitenbaum (11 Seiten)

```
pfmm.de
├── index.php ................................... Startseite
│   └── #persoenliches .......................... Ankersprung "Persönliches"
├── Das Angebot (Dropdown, selbst keine eigene Seite)
│   ├── das_angebot-aktuelle_seminare.php ....... Aktuelle Seminare
│   ├── das_angebot-individuelle_seminare.php ... Individuelle Seminare
│   ├── das_angebot-philosophische_beratung.php . Philosophische Beratung
│   ├── das_angebot-konzeptentwicklungen.php .... Konzeptentwicklungen
│   ├── das_angebot-praxis_medien.php ........... Praxis Medien
│   └── das_angebot-praxisbriefe.php ............ Praxisbriefe
├── anfahrt.php ................................. Anfahrt
├── kontakt.php ................................. Kontakt (mit Formular)
├── impressum.php ............................... Impressum
└── datenschutz.php ............................. Datenschutzinformation
```

### Navigation

**Hauptnavigation:** Home · Persönliches · Das Angebot ▾ · Anfahrt · Kontakt
**Footer:** Impressum · Datenschutz

Der Menüpunkt „Das Angebot" verlinkt auf `https://www.pfmm.de/#` — er ist reiner Dropdown-Auslöser ohne Zielseite.

### Meta-Angaben (auf allen 11 Seiten identisch)

```
<title>Praxis für Marketing und Motivation</title>

<meta name="description" content="Wer im Wettbewerb bestehen will, muß auf Veränderungen
des Marktes gezielt reagieren können. Wir von der Praxis für Marketing und Motivation
helfen Ihnen, den Herausforderungen der Zukunft gezielt zu begegnen.">

<meta name="keywords" content="Seminare,Seminar,Motivation,Rethorik,Training,Erich,
Grikscheit,Frankfurt,Verkaufstraining,Seminarprogramm,Karben,Manager,Managertraining
Produktmanager,Projektmanagement,Direkt-Marketing,Neukundengewinnung">

<meta name="author" content="Steffen Klemenz">
<meta name="publisher" content="Praxis für Marketing und Motivation">
<meta name="copyright" content="Praxis für Marketing und Motivation">
<meta name="robots" content="index,follow">
<meta name="language" content="deutsch">
<meta name="format-detection" content="telephone=no">
```

> Im Keywords-Tag steht „**Rethorik**" (Tippfehler, korrekt: Rhetorik). Die Description enthält „**muß**" — alte Rechtschreibung vor 1996.

---

## 2. Design-System: Farben, Schriften, Symbole

### 2.1 Farbcodes — Ist-Zustand

#### Markenfarben (Rot-Familie)

| Farbe | HEX | RGB | Verwendung | Fundort |
|---|---|---|---|---|
| ![](https://placehold.co/16/a81f39/a81f39.png) Weinrot (Primär) | `#A81F39` | `168, 31, 57` | Navigation, Sektionsflächen, Links, Buttons, Icons, Akzente | `custom.css` (12×), inline `rgb(168,31,57)` (10×) |
| ![](https://placehold.co/16/bc334d/bc334d.png) Weinrot Hover | `#BC334D` | `188, 51, 77` | Hover Navigation, Buttons, To-Top | `custom.css` (3×) |
| ![](https://placehold.co/16/aa0e47/aa0e47.png) Logo-Rot | `#AA0E47` | `170, 14, 71` | Segelform im Logo (Füllung) | `logo1.svg`, `logo-pfmm.svg` |
| ![](https://placehold.co/16/ab1148/ab1148.png) Logo-Rot Kontur | `#AB1148` | `171, 17, 72` | Kontur im Logo 2 | `logo2.svg`, `logo-pfmm2.svg` |
| ![](https://placehold.co/16/ff0000/ff0000.png) Reinrot | `#FF0000` | `255, 0, 0` | Rahmen „Aktuelle Informationen", CTA-Links „Mehr Details" | `custom.css` (`border-color: red`, `color: red`) |

> **Kernbefund:** Es sind **drei verschiedene Rottöne** im Einsatz, die nebeneinander sichtbar sind — `#A81F39` (Fläche), `#AA0E47` (Logo) und `#FF0000` (Rahmen/CTA). Reinrot `#FF0000` wirkt neben dem Weinrot wie ein Fehler und ist der einzige Ton, der für die Handlungsaufforderungen verwendet wird.

#### Neutrale Farben

| Farbe | HEX | Verwendung | Fundort |
|---|---|---|---|
| ![](https://placehold.co/16/ffffff/ffffff.png) Weiß | `#FFFFFF` | Seitenhintergrund, Navigationstext | `custom.css`, `style.css` |
| ![](https://placehold.co/16/ededed/ededed.png) Hellgrau | `#EDEDED` | `.bg-primary` — Sektion „Praxis-Angebote", Footer | `style.css` |
| ![](https://placehold.co/16/e5e5e5/e5e5e5.png) Hellgrau 1 | `#E5E5E5` | `.bg-secondary-1` — Galerie Konzeptentwicklungen | `style.css` |
| ![](https://placehold.co/16/dadada/dadada.png) Hellgrau 2 | `#DADADA` | `.bg-secondary-2` | `style.css` |
| ![](https://placehold.co/16/d2d2d2/d2d2d2.png) Grau | `#D2D2D2` | `.bg-secondary` — Sektion „Herzlich willkommen" | `style.css` |
| ![](https://placehold.co/16/cbcccc/cbcccc.png) Silbergrau | `#CBCCCC` | Konturen im Logo 2 (Kelchform) | `logo2.svg` |
| ![](https://placehold.co/16/aaaaaa/aaaaaa.png) Mittelgrau | `#AAAAAA` | Hover-Farbe Hauptnavigation | `custom.css` |
| ![](https://placehold.co/16/8f908f/8f908f.png) Logo-Grau | `#8F908F` | Schriftzug im Logo | alle Logo-SVGs |
| ![](https://placehold.co/16/888888/888888.png) Footer-Grau | `#888888` | Footer-Text | `custom.css` |
| ![](https://placehold.co/16/777777/777777.png) Textgrau | `#777777` | **Standard-Fließtextfarbe** der gesamten Seite | `style.css` (`body`) |
| ![](https://placehold.co/16/656565/656565.png) Dunkelgrau | `#656565` | `.bg-secondary-3` | `style.css` |
| ![](https://placehold.co/16/444444/444444.png) Anthrazit | `#444444` | Footer-Link Hover | `custom.css` |
| ![](https://placehold.co/16/3f3f3f/3f3f3f.png) Überschriftgrau | `#3F3F3F` | **H2 und H3** | `style.css` |
| ![](https://placehold.co/16/333333/333333.png) Fast-Schwarz | `#333333` | Rahmen Seminarbilder (`.seminarbild`) | `custom.css` |
| ![](https://placehold.co/16/000000/000000.png) Schwarz | `#000000` | Text in Sektion 01 und 03, `body`-Background in `style.css` | `custom.css`, `style.css` |
| ![](https://placehold.co/16/ff6600/ff6600.png) Orange | `#FF6600` | `a:active` (Link im Klickmoment) — Fremdkörper aus dem Template | `style.css` |
| ![](https://placehold.co/16/0a66c2/0a66c2.png) LinkedIn-Blau | `#0A66C2` | LinkedIn-Logo | `linkedin-logo.svg` |

#### Kontrastprüfung nach WCAG 2.1 (gemessen)

| Kombination | Ratio | AA | AAA | Bewertung |
|---|---:|:---:|:---:|---|
| Fließtext `#777777` auf Weiß | 4,48:1 | ✗ | ✗ | knapp durchgefallen (nötig 4,5:1) |
| Fließtext `#777777` auf `#EDEDED` | 3,83:1 | ✗ | ✗ | durchgefallen |
| Fließtext `#777777` auf `#D2D2D2` | **2,96:1** | ✗ | ✗ | **deutlich durchgefallen** |
| Footer `#888888` auf `#EDEDED` | **3,03:1** | ✗ | ✗ | **deutlich durchgefallen** |
| Navi-Hover `#AAAAAA` auf `#A81F39` | **3,10:1** | ✗ | ✗ | **deutlich durchgefallen** |
| CTA-Rot `#FF0000` auf `#EDEDED` | **3,42:1** | ✗ | ✗ | **deutlich durchgefallen** |
| Schwarz `#000000` auf `#A81F39` | **2,92:1** | ✗ | ✗ | **deutlich durchgefallen** |
| H2 `#3F3F3F` auf Weiß | 10,53:1 | ✓ | ✓ | bestanden |
| Weiß auf `#A81F39` | 7,19:1 | ✓ | ✓ | bestanden |
| Link `#A81F39` auf Weiß | 7,19:1 | ✓ | ✓ | bestanden |
| Weiß auf `#BC334D` | 5,65:1 | ✓ | ✗ | bestanden (AA) |
| Logo-Rot `#AA0E47` auf Weiß | 7,33:1 | ✓ | ✓ | bestanden |

**7 von 12 geprüften Kombinationen erfüllen WCAG AA nicht.** Betroffen ist ausgerechnet der Standard-Fließtext, also der größte Teil der Seite.

### 2.2 Optimierte Farbpalette (Vorschlag)

Die bestehende Weinrot-Identität bleibt erhalten und wird zu einem konsistenten, barrierefreien System ausgebaut. Basis ist das Logo-Rot, weil es die Marke trägt.

#### Marke

| Rolle | HEX | Kontrast auf Weiß | Einsatz |
|---|---|---:|---|
| **Bordeaux 900** | `#5E0A28` | 12,9:1 | Überschriften auf hellem Grund, Fußzeile |
| **Bordeaux 700** | `#8A0F3A` | 9,0:1 | Sektionsflächen, Header |
| **Bordeaux 600 — Primär** | `#A81F39` | 7,2:1 | Marke, Flächen, Icons *(unverändert)* |
| **Bordeaux 500** | `#C13351` | 5,2:1 | Hover-Zustände |
| **Bordeaux 100** | `#F7E7EB` | — | Zarte Hintergrundflächen, Karten |

#### Akzent (ersetzt Reinrot `#FF0000` für Handlungsaufforderungen)

| Rolle | HEX | Kontrast auf Weiß | Einsatz |
|---|---|---:|---|
| **Messing 600 — CTA** | `#A67C2E` | 4,6:1 | Buttons, Links, Fokus — komplementär zum Bordeaux |
| **Messing 700** | `#8A6624` | 6,0:1 | CTA-Hover |
| **Messing 100** | `#F6EFE0` | — | Hervorhebungen, Zitatkästen |

#### Neutrale (Warmgrau statt Kaltgrau)

| Rolle | HEX | Kontrast auf Weiß | Einsatz |
|---|---|---:|---|
| **Tinte 900** | `#1C1A19` | 17,4:1 | Überschriften |
| **Tinte 700** | `#3D3936` | 10,7:1 | **Fließtext** *(ersetzt `#777777`)* |
| **Tinte 500** | `#6B6560` | 5,3:1 | Sekundärtext, Bildunterschriften |
| **Tinte 200** | `#DCD8D3` | — | Trennlinien, Rahmen |
| **Tinte 100** | `#F2EFEB` | — | Alternierende Sektionen *(ersetzt `#EDEDED`)* |
| **Papier** | `#FFFFFF` | — | Grundfläche |

#### Signalfarben

| Rolle | HEX | Einsatz |
|---|---|---|
| Erfolg | `#1F6B4A` | Bestätigungen im Formular |
| Warnung | `#8A5A00` | Hinweise |
| Fehler | `#A8202A` | Formularfehler *(muss sich vom Marken-Bordeaux unterscheiden)* |

**Alle Textfarben der neuen Palette erfüllen WCAG AA, die Fließtextfarbe sogar AAA.**

### 2.3 Typografie — Ist-Zustand

Eine einzige Schriftfamilie, lokal gehostet (kein Google-Fonts-CDN — datenschutzrechtlich sauber gelöst).

| Element | Familie | Größe | Gewicht | Zeilenhöhe | Farbe | Besonderheit |
|---|---|---|---|---|---|---|
| `body` | Open Sans, sans-serif | 14 px | 400 | 24 px (1,4 via custom.css) | `#777777` | zu klein für die Zielgruppe |
| `h1` | Open Sans | 40 px / 60 px ab 767 px | **900** | 1,2 | — | **auf keiner Seite verwendet** |
| `h2` | Open Sans | 36 / 40 / 48 px | **100** | 1,0 | `#3F3F3F` | zentriert, `letter-spacing: -1px` |
| `h3` | Open Sans | 30 px | 300 | 1,2 | `#3F3F3F` | in Sektionen auf 18–24 px überschrieben |
| `h4` | Open Sans | 24 px | 300 | 1,2 | — | |
| `h5` | Open Sans | 22 px | **700** | 1,2 | — | in `.border-red` auf 16 px reduziert |
| `h6` | Open Sans | 18 px | **900** | 1,2 | — | `text-transform: uppercase` |
| `p` | Open Sans | 14 px | 400 | 1,3 | `#777777` | sehr enge Zeilenhöhe |
| `b` | Open Sans | — | 600 | — | — | |

**Eingebundene Schnitte:** Open Sans 300, 300 italic, 600, 600 italic, 700 (Formate: woff2, woff, ttf, eot, svg). `Source Sans Pro` ist in `fonts.css` deklariert, wird aber nirgends verwendet — toter Ballast.

> Die Kombination `h2` mit Gewicht **100** bei 48 px und `letter-spacing: -1px` erzeugt eine sehr dünne, eng gesetzte Überschrift. Zusammen mit 14 px Fließtext in `#777777` ist die Seite für die Kernzielgruppe (Führungskräfte 45+) schwer lesbar.

### 2.4 Typografie — Vorschlag

| Element | Familie | Größe (Desktop/Mobil) | Gewicht | Zeilenhöhe |
|---|---|---|---|---|
| Display / H1 | **Lora** (Serife) | 56 / 34 px | 600 | 1,15 |
| H2 | Lora | 40 / 28 px | 600 | 1,2 |
| H3 | **Inter** | 24 / 20 px | 600 | 1,3 |
| Fließtext | Inter | **18 / 17 px** | 400 | **1,65** |
| Lead / Vorspann | Inter | 21 / 19 px | 400 | 1,55 |
| Zitat (Wochenkalender) | Lora italic | 24 / 20 px | 400 | 1,45 |
| Kleintext | Inter | 15 px | 400 | 1,5 |
| Button | Inter | 17 px | 600 | 1 |

Begründung: Eine Serife für Überschriften und Zitate transportiert die philosophische Tiefe des Angebots — genau die Differenzierung gegenüber austauschbaren Trainingsanbietern. Inter für Fließtext sorgt für Lesbarkeit auf allen Geräten. Beide Schriften sind frei lizenziert und lokal hostbar.

### 2.5 Symbole & Icons — Ist-Zustand

| Symbol | Typ | Datei / Quelle | Verwendung |
|---|---|---|---|
| Logo 1 — Segel mit Schriftzug „GRIKSCHEIT · PRAXIS FÜR MARKETING UND MOTIVATION" | SVG, 7,7 KB | `grafiken/logos/logo1.svg`, identisch `home/logo-pfmm.svg` (13,4 KB) | Kopfbereich links; 3× als „Icon" in den Angebotskacheln |
| Logo 2 — Segel im Kelch mit Schriftzug „GRIKSCHEIT · PRAXIS FÜR PHILOSOPHISCHE UND INDIVIDUAL-PSYCHOLOGISCHE BERATUNG" | SVG, 16,7 KB | `grafiken/logos/logo2.svg`, identisch `home/logo-pfmm2.svg` (35,4 KB) | Kopfbereich rechts; 1× als „Icon" in der Kachel Philosophische Beratung |
| LinkedIn-Logo | SVG, 2,9 KB, `#0A66C2` | `grafiken/logos/linkedin-logo.svg` | Praxisbriefe-Seite |
| Pfeil rechts | Icon-Font **Font Awesome 4.7.0**, Klasse `fa fa-arrow-right`, eingefärbt `#A81F39` | `fonts/font-awesome-4.7.0/` | Aufzählungen auf Start-, Seminar-, Beratungs- und Konzeptseite |
| Favicon | ICO, 894 Bytes | `grafiken/favicon/favicon.ico` | Browser-Tab |

**Das ist der gesamte Symbolvorrat der Website.** Es gibt genau *ein* funktionales Icon (den Pfeil). Alle vier Kacheln unter „Praxis-Angebote" verwenden das **Logo** als Icon — drei davon exakt dasselbe. Das entwertet die Marke und macht die Angebote optisch ununterscheidbar.

> **Markenkonflikt:** Zwei nahezu gleich aussehende Logos stehen gleichberechtigt nebeneinander im Kopfbereich. Für Besucher ist nicht erkennbar, ob es sich um zwei Unternehmen, zwei Marken oder eine Marke mit zwei Sparten handelt.

### 2.6 Symbol-Set — Vorschlag

Ein durchgängiges Strichsymbol-Set (z. B. Lucide oder Phosphor, 1,5 px Kontur, `currentColor`) für die Angebotsbereiche:

| Bereich | Symbol | Bedeutung |
|---|---|---|
| Aktuelle Seminare | Kalender mit Häkchen | feste Termine, planbar |
| Individuelle Seminare | Puzzleteil / Zahnräder | maßgeschneidert |
| Philosophische Beratung | Zwei Sprechblasen im Dialog | Einzelgespräch |
| Konzeptentwicklungen | Glühbirne über Blatt | Idee wird Konzept |
| Praxis Medien | Aufgeschlagenes Buch | Publikationen |
| Praxisbriefe | Briefumschlag mit Feder | regelmäßiger Denkanstoß |

Das Segel-Logo bleibt ausschließlich Absender im Kopfbereich — als **eine** konsolidierte Wortbildmarke.

---

## 3. Seiteninhalte 1:1

### 3.1 Startseite — `index.php`

**Überschriftenstruktur:** *(kein H1 vorhanden)*
H2 Herzlich willkommen! → H4 Aktuelle Informationen → H5 Nächstes Seminar → H5 Praxisbrief mit dem Thema → H5 Philosophischer Wochenkalender → H2 Persönliches → H2 Praxis-Angebote → H3 Aktuelle Seminare / Philosophische Beratung / Konzeptentwicklungen / Praxis Medien → H2 Geschäftsführung → H6 Erich Grikscheit

#### Sektion: Herzlich willkommen!

> Mit Anderen Beziehungen gestalten sind die wesentlichen Voraussetzungen für die persönliche Entwicklung und den individuellen Erfolg im Leben.
>
> Die folgenden Seiten geben Ihnen einen Überblick über mein Beratungs- und Trainingsangebot. Meine Kernbotschaft ist: Das Gespräch ist der entscheidende Weg zum Dialog und zur Wertschätzung.

#### Kasten: Aktuelle Informationen

> **Nächstes Seminar:**
> **Zeit - Horizonte**
> **Resilienz – Angst – Konflikte**
> Termin: 02. - 04.09.2026
> [Download der Seminarbeschreibung](https://www.pfmm.de/das_angebot/aktuelle_seminare/seminare/2026-09-02_zeit-horizonte.pdf)
> *PDF-Datei, 1,3 MB*
>
> **[Praxisbrief](https://www.pfmm.de/das_angebot-praxisbriefe.php) mit dem Thema:**
> **Ordnung**
> Der Begriff Ordnung begleitet das menschliche Denken seit jeher. Er ist Teil unseres alltäglichen Sprachgebrauchs, taucht scheinbar selbstverständlich in privaten, beruflichen, politischen und gesellschaftlichen Kontexten auf und wird meist ohne weiteres Nachdenken verwendet.
> [Download des Praxisbriefs](https://www.pfmm.de/das_angebot/praxisbriefe/2026-08-05_ordnung.pdf)
> *PDF-Datei, 678,1 kB*
>
> **Philosophischer Wochenkalender:**
> „Es gewährt Freude, den Augen dessen zu begegnen,dem man gegeben hat."
> *- Jean de la Bruyère -*

#### Sektion: Philosophischer Wochenkalender *(eigenständige Sektion)*

> **Philosophischer Wochenkalender:**
> „Es gewährt Freude, den Augen dessen zu begegnen,dem man gegeben hat."
> *- Jean de la Bruyère -*

> ⚠️ **Doppelter Inhalt:** Dieses Zitat steht auf der Startseite **zweimal** — einmal im roten Kasten, einmal als eigene Sektion darunter. Im Zitat fehlt außerdem ein Leerzeichen: „begegnen,dem".

#### Sektion: Persönliches

**Linke Spalte:**
> Ausbildung zum Einzelhandelskaufmann. Besuch und Abschluss an der Akademie für Marketing und Kommunikation in Frankfurt.
>
> 25 Jahre war ich in verschiedenen Vertriebs- und Marketingpositionen tätig. Danach Selbstständigkeit als Trainer und Berater.

**Mitte:** Porträtfreisteller Erich Grikscheit (`home/grikscheit_frei_ausschnitt.png`)

**Rechte Spalte:**
> Seither bin ich mit ganz vielfältigen Aufgaben in den unterschiedlichsten Branchen vertraut.
> Die praktische Arbeit verlangt einen komplexen geistigen Unterbau, den ich durch verschiedene Studien ständig erweitert habe. Hinzu kommen ein langjähriges philosophisches Studium sowie eine Ausbildung in Individualpsychologie mit angrenzenden Gebieten der Psychologie.

#### Sektion: Praxis-Angebote (4 Kacheln)

| Kachel | Aufzählung | Link |
|---|---|---|
| **Aktuelle Seminare** | → Aktuelle Seminare<br>→ Seminare für individuelle Kunden-Anforderungen | Mehr Details |
| **Philosophische Beratung** | → Philosophische Beratungspraxis – Individuelle Einzelgespräche | Mehr Details |
| **Konzeptentwicklungen** | → Beratungen für Individuelle Konzeptentwicklungen | Mehr Details |
| **Praxis Medien** | → Wie Sie aus Kunst der Wertschätzung neue Kraft gewinnen<br>→ Rituale in Unternehmen | Mehr Details |

#### Sektion: Geschäftsführung

> **ERICH GRIKSCHEIT**
> Durchführung von Trainingsmaßnahmen
> Entwickeln von Marktkonzepten
> Textentwicklungen
> persönliche Einzelberatung

#### Footer

Google-Maps-Karte (Zoom 17, Marker „Praxis für Marketing & Motivation") · Impressum · Datenschutz · © 2026 - Praxis für Marketing und Motivation

---

### 3.2 Aktuelle Seminare — `das_angebot-aktuelle_seminare.php`

**H2:** Praxis-Angebote Aktuelle Seminare

**H3:** → Aktuelle Seminare

> Die Praxis für Marketing und Motivation bietet monatlich offene Seminare zu aktuellen Themen an. Das Angebot umfasst die Bereiche Vertrieb, Führung, Kommunikation und Zeitmanagement.

> **1. Vertriebstraining:**
> Neue Wege des Verkaufens, Telefontraining sowie branchenspezifische Workshops, Verkaufs- und Telefontraining, Argumentationstraining, Abschlusstraining, Training für Kundendienstmitarbeiter sowie individuelle Trainings zu bestimmten Aufgabenstellungen

> **2. Führungstraining:**
> Präsentation, Verhandlungstraining (Dialektik für Praktiker), Strategien zur Selbstmotivation oder Train the Trainer Seminare. Führungskräftetraining, individuelle Gesprächsführung, Konflikttraining, Motivationstraining, Zeitmanagement und Verhandlungstraining

> **3. Kommunikation:**
> Digitalisierung und Kommunikation, effektives Besprechungsmanagement, Präsentationstraining, Wege zur Selbstbeauftragung, effektive Projektarbeit

**H3:** → Seminare für individuelle Kunden-Anforderungen
> **>>> Bitte hier klicken >>>** → `das_angebot-individuelle_seminare.php`

#### Seminarübersicht (8 Kacheln)

| # | Titel | Termin | PDF | Vorschaubild |
|---|---|---|---|---|
| 1 | **Zeit - Horizonte** — Resilienz – Angst – Konflikte | **02. - 04.09.2026** | `2026-09-02_zeit-horizonte.pdf` | `.png` |
| 2 | Rhetorik | auf Anfrage | `2019_Rhetorik-mit-Tabelle_oT.pdf` | `.jpg` |
| 3 | Die Bedeutung der „Erfahrungen" im Management | auf Anfrage | `2019_Erfahrung_oT.pdf` | `.jpg` |
| 4 | Seminar zum Thema Freiheit – Führung – Persönlichkeit | auf Anfrage | `2019_Freiheit_oT.pdf` | `.jpg` |
| 5 | „Wie Sie Kontroversen, Kritik, Krisen und Konflikte erfolgreich bewältigen." | auf Anfrage | `2019_Konflikte_oT.pdf` | `.jpg` |
| 6 | Die Kunst der Präsentation und Rhetorik für Interessierte in Wirtschaft und Verwaltung | auf Anfrage | `2019_Praesentation-Rhetorik_oT.pdf` | `.jpg` |
| 7 | Die Kunst der Präsentation für Interessierte in Wirtschaft und Verwaltung | auf Anfrage | `2019_Praesentation_oT.pdf` | `.jpg` ⚠️ |
| 8 | Seminar Praktische Unternehmensethik für Führungskräfte in Wirtschaft und Verwaltung | auf Anfrage | `2019_Unternehmensethik_oT.pdf` | `.jpg` |

> ⚠️ **Fehler bei Kachel 7:** Im `src`-Attribut steht ein Zeilenumbruch hinter dem Dateinamen (`2019_Praesentation_oT.jpg\n`). Je nach Browser kann das Bild dadurch nicht laden.
>
> **7 von 8 Seminaren stammen aus 2019 und haben keinen Termin.** Alle Inhalte liegen ausschließlich als PDF vor — für Suchmaschinen und für Besucher am Telefon praktisch unsichtbar.

---

### 3.3 Individuelle Seminare — `das_angebot-individuelle_seminare.php`

**H2:** Praxis-Angebote Aktuelle Seminare *(identisch zur Seminarseite — Duplikat)*
**H3:** → Seminare für individuelle Kunden-Anforderungen

1. **Führungstraining:** Motivationstraining, Strategisches Denken, Philosophie als Weg im Umgang mit Mitarbeitern, Ethik und Werte in der Führungsarbeit
2. **Konflikttraining:** Schuld oder Ermutigung, Macht und Kontrolle, Widerstände überwinden
3. **Gesprächsführung:** Philosophie eines Gespräches, Sprache und Verstehen, Ethik des Gesprächs
4. **Zeitmanagement:** Zeit und Sinn, Zeit und Effektivität, Zeit und Gewohnheiten, Zeit und Vorsätze

> Die Beispiele sind nur einige Themenbereiche, wie sie in den letzten Jahren nach Wünschen der Kunden als Trainingseinheiten zusammengestellt worden sind. Dabei werden die einzelnen Themenbereiche gegliedert und als Trainingskonzept zu einem Ganzen zusammengestellt.

**Rechte Spalte:**
> Nach Absprache mit dem Auftraggeber entwickeln wir maßgeschneiderte Trainings. Die einzelnen Schrittfolgen werden gezielt zu einem Gesamtkonzept zusammengefügt:

1. Vorgespräche
2. Einzelinterviews mit den Teilnehmern
3. Konzeptentwicklung, Abstimmung und Ablaufplanung
4. Seminardurchführung
5. Dokumentation der Ergebnisse oder Nachbesprechung

Bild: `bild-trainingsangebote.png`

---

### 3.4 Philosophische Beratung — `das_angebot-philosophische_beratung.php`

**H2:** Praxis-Angebot Philosophische Beratung
**H3:** → Philosophische Beratungspraxis – individuelle Einzelgespräche

> Bei einem individuellen Gespräch kommt es in erster Linie darauf an, dass eine intensive Wechselbeziehung entsteht.
>
> Für mich als Gesprächspartner ist es wichtig, die Äußerungen meines Gesprächspartners in einen inneren Zusammenhang zu bringen. Deshalb baut meine philosophische Beratung auf Verstehen auf. Das bedeutet, die Motive und Gedanken meiner Klienten näher kennenzulernen. Oder wie lassen sich Geschichten, Argumente und Vergleiche, die mein Gesprächspartner vorträgt, durch andere Gesichtspunkte hinterfragen oder neu bewerten.
>
> Und: Wie lassen sich Gedanken aus möglichen Widersprüchen ableiten.
> Denn: Neue Gedanken sollen ermutigen und neue Perspektiven eröffnen.

Bild: `phil-beratung.jpg`

---

### 3.5 Konzeptentwicklungen — `das_angebot-konzeptentwicklungen.php`

**H2:** Praxis-Angebot Konzeptentwicklungen
**H3:** → Beratungen für individuelle Konzeptentwicklungen

> Kreative Wege zu Kunden und Interessenten zu finden sind Aufgaben, die wir als kleines Kreativteam für unsere Auftraggeber entwickeln, texten, gestalten und umsetzen.
>
> Dazu gehören zum Beispiel Prospektfolder, Internetauftritte, Prospekte für Verkaufsaktionen sowie Mittel und Maßnahmen für Verkaufsförderungsaktionen. Auf diese Weise sorgen wir für einen erfolgreichen Kundendialog, um langfristige Kundenbindungen zu erzielen. Dazu definieren wir mit unseren Auftraggebern die gewünschten Ziele.

**H2:** Galerie — 8 Referenzbilder (`Bild1.jpg` … `Bild8.jpg`, Großansicht `Bild1-1.jpg` … `Bild8-1.jpg`) in einer Lightbox. Alle ohne Alt-Text, ohne Bildunterschrift, ohne Kundenname.

---

### 3.6 Praxis Medien — `das_angebot-praxis_medien.php`

**H2:** Praxis Medien

> Die vorgestellten Praxismedien sind in erster Linie Anregungen für den Praktiker.
> Sie stammen alle aus der eigenen Trainingserfahrung, die sich im Laufe der Jahre ergeben hat.

| Medium | Details |
|---|---|
| **Vortragsreihe „Zeit erfahren entdecken und nutzen"** — Erich Grikscheit | in 6 Lektionen · Länge 4.04 Stunden · Erschienen im **lecuturio** Verlag 2013 ⚠️ *(Tippfehler, korrekt: Lecturio)* |
| **Leitfaden „Kreativität"** | Erschienen: 2017 · Seitenzahl: 74 · Format: PDF · Versand: per Mail · **Kosten: 3 € plus MwSt.** · Bestellung: über unser [Kontaktformular](https://www.pfmm.de/kontakt.php) oder per Telefon: 06039 / 45 45 8 |
| **Kurzer Leitfaden „Wertschätzung"** | Wie Sie aus der Kunst der Wertschätzung neue Kraft gewinnen. → PDF |
| **Kurzer Leitfaden „Rituale in Unternehmen"** | Begleitheft zum Thema: Rituale in Unternehmen → PDF |
| **Kurzer Leitfaden „Erfolgreich präsentieren"** | Begleitheft zum Thema: Erfolgreich präsentieren → PDF |

> Die 3 € für den Kreativitäts-Leitfaden sind der **einzige Preis auf der gesamten Website**.

---

### 3.7 Praxisbriefe — `das_angebot-praxisbriefe.php`

> Regelmäßig veröffentlichen wir unsere Praxisbriefe auf [LinkedIn]
> Kurz: Folgen Sie einfach unserem [Profil](www.linkedin.com/in/erich-grikscheit-pfmm), damit Sie in Zukunft, keinen Praxisbrief verpassen.

> ⚠️ Der zweite Link ist **defekt** — `www.linkedin.com/...` ohne `https://` wird relativ aufgelöst und endet auf einer 404-Seite von pfmm.de. Zusätzlich: Komma-Fehler „in Zukunft, keinen".

| Ausgabe | Titel | Anriss | PDF |
|---|---|---|---|
| **August 2026** | **Ordnung** | Der Begriff Ordnung begleitet das menschliche Denken seit jeher. Er ist Teil unseres alltäglichen Sprachgebrauchs, taucht scheinbar selbstverständlich in privaten, beruflichen, politischen und gesellschaftlichen Kontexten auf und wird meist ohne weiteres Nachdenken verwendet. | 678,1 kB |
| Juni 2026 | **Arbeit** | Arbeit ist eine der grundlegendsten Ausdrucksformen menschlichen Bewusstseins. Sie ist nicht nur Tätigkeit, nicht bloß ökonomische Notwendigkeit, sondern eine Form, in der sich das Verhältnis des Menschen zu sich selbst, zur Welt und zu anderen Menschen offenbart. | 775,4 kB |
| April 2026 | **Vertrauen** | Es ist ein merkwürdiges Schauspiel unserer Zeit: Diplomaten sitzen an langen Tischen, Kameras laufen, Worte werden mit Bedacht gewählt – und doch spürt jeder, dass etwas fehlt: Vertrauen - zwischen Staaten, Regierungen und Machtblöcken. Im Hintergrund stehen Kriege, gebrochene Zusagen, historische Verletzungen. | 204,3 kB |
| Januar 2026 | **Verantwortung – Erfahrung – Urteil** | Verantwortung erscheint im Alltag häufig als moralische Forderung, als Pflicht oder als Zuschreibung von außen. Man erwartet Verantwortung von Führungskräften, von Eltern, von Institutionen – selten jedoch fragt man nach ihrem inneren Ursprung. Philosophisch und psychologisch betrachtet entsteht Verantwortung nicht plötzlich und nicht isoliert. | 822,2 kB |
| Dezember 2025 | **Den Blick neu überdenken – Sehen als Lebenspraxis** | Sehen ist mehr als ein physiologischer Vorgang. Es ist zugleich ein Akt des Erkennens und ein Spiegel des eigenen Inneren. Der Aufsatz fasst philosophische und psychologische Impulse zusammen, die helfen können, den eigenen Blick bewusst zu erneuern – im Alltag, im Umgang mit sich selbst und anderen. | 188,5 kB |
| November 2025 | **Das Wesentliche – Die Geschichte des Ichs** | Die Geschichte des Ichs ist ein Spiegel der menschlichen Entwicklung – von göttlicher Ordnung zu individueller Selbstbestimmung. Mit der Aufklärung begann das Ich, sich als denkendes, moralisches und freies Wesen zu verstehen. | 493,0 kB |
| Juli 2025 | **Wertschätzung und Tradition / Unternehmen + Marke** | Wie agiert ein Unternehmen, das sich der Tradition verpflichtet fühlt? Wenn es bereits 50, 100 oder mehr Jahre existiert, dann hat sich in den Köpfen der Kunden ein bestimmtes Bild oder Gefühl festgesetzt (Image). | 275,7 kB |
| Mai 2025 | **Wertschätzung** | Häufig tritt die Frage auf, was denn Wertschätzung auf eine kurze Formel gebracht ist. Antwort: Wertschätzung soll Mut machen, damit andere das eigene Denken und Fühlen erkennen und entsprechend auf ein wertschätzendes Verhalten reagieren können. | 187,8 kB |

> **Das ist das wertvollste Asset der Website** — acht substanzielle Fachtexte, alle 2025/2026, alle als PDF versteckt. Kein einziger Absatz davon steht als HTML auf der Seite. Für Google existieren diese Inhalte praktisch nicht. Es gibt außerdem **keine Anmeldemöglichkeit** — obwohl die Datenschutzerklärung unter Punkt 4 eine Praxisbrief-Anmeldung ausdrücklich beschreibt.

---

### 3.8 Anfahrt — `anfahrt.php`

**H2:** Anfahrt

**Adressblock:**
> **Erich Grikscheit**
> **Praxis für Marketing & Motivation**
> Max-Planck-Str. 27
> 61184 Karben
>
> Tel.: 0 60 39 / 45 45 8
> Mobil: 0170 46 33 088
> E-Mail: e.grikscheit@t-online.de

**Mit dem Auto:**
> Wenn Sie aus Richtung Frankfurt oder Friedberg kommen, gelangen Sie am schnellsten über die B3 zu uns nach Karben.
> Aus Richtung Gießen kommend, gelangen sie am besten über die A5 nach Karben.

**Mit öffentlichen Verkehrsmitteln:**
> Die S-Bahn-Linie S6 in Richtung Groß-Karben/ Friedberg bringt Sie direkt zum Bahnhof Groß-Karben.
> Danach sind es ca. 15 Minuten Fußweg bis zu meiner Praxis.
> Von Königstein bis Karben über Bahnhof Groß-Karben bringt Sie ganz bequem der Schnellbus 260.
> Von Bad Vilbel nach Karben über Bahnhof Groß-Karben gelangen Sie mit der Buslinie FB-74.

Google-Maps-Karte im Footer.

---

### 3.9 Kontakt — `kontakt.php`

**H2:** Kontakt

**Linke Spalte:**
> **Erich Grikscheit**
> **Praxis für Marketing & Motivation**
> Max-Planck-Str. 27
> 61184 Karben
>
> Tel.: 0 60 39 / 45 45 8
> Mobil: 0170 46 33 088
>
> **Email: e.grikscheit@t-online.de**

**Rechte Spalte — Formular** (`POST` an `kontakt.php`):

| Feld | Name | Platzhalter | Pflicht |
|---|---|---|---|
| Text | `vorname` | Vorname: | nein |
| Text | `nachname` | Name: | nein |
| Text | `titel` | Titel: | nein |
| Text | `emailadresse` | E-Mailadresse: | nein |
| Textarea | `nachricht` | Nachricht: | nein |
| Button | `submit` | **Absenden** | — |

Fehlermeldungs-Container: `.eingabefehler` (Farbe `#A81F39`)

> **Lücken:** kein Pflichtfeld, kein `type="email"`, keine Datenschutz-Checkbox, kein Spamschutz, kein Hinweis auf die Rechtsgrundlage der Datenerhebung, keine Telefon-Alternative als klickbarer Link, keine Terminbuchung.

---

## 4. Impressum

*Wortlaut vollständig, `impressum.php`*

**H2:** Impressum

> **Erich Grikscheit**
> **Praxis für Marketing & Motivation**
> **Max-Planck-Str. 27**
> **61184 Karben**
> **Tel.: 0 60 39 / 45 45 8**
> **Mobil: 0170 46 33 088**
> **E-Mail: e.grikscheit@t-online.de**

> Finanzamt Friedberg/Hessen
> St. Nr. 16 822 602 68
> USt-IdNr.: DE112221468
>
> Für den Inhalt verantwortlich: Erich Grikscheit
> Gestaltung: Martin Gomoll Design

> **Haftungsbeschränkung für eigene Inhalte**
> Die Inhalte unserer Webseiten wurden sorgfältig und nach bestem Gewissen erstellt. Gleichwohl kann für die Aktualität, Vollständigkeit und Richtigkeit sämtlicher Seiten keine Gewähr übernommen werden. Gemäß § 7 Abs. 1 TMG sind wir als Diensteanbieter für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind als Diensteanbieter nach den §§ 8 bis 10 TMG jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung erfolgt eine umgehende Entfernung dieser Inhalte durch uns. Eine diesbezügliche Haftung kann erst ab dem Zeitpunkt der Kenntniserlangung übernommen werden.

> **Urheberrecht**
> Die auf dieser Webseite veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Jede Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner vorherigen schriftlichen Zustimmung.

### Anmerkungen zum Impressum

| Punkt | Befund |
|---|---|
| Rechtsgrundlage | Zitiert durchgehend **TMG** — das Telemediengesetz wurde im Mai 2024 durch das **Digitale-Dienste-Gesetz (DDG)** abgelöst. § 5 TMG → § 5 DDG, § 7 Abs. 1 TMG → § 7 Abs. 1 DDG, §§ 8–10 TMG → §§ 8–10 DDG. |
| § 18 Abs. 2 MStV | „Für den Inhalt verantwortlich" ist vorhanden ✓ — die Anschrift des Verantwortlichen sollte ergänzt werden. |
| E-Mail | `t-online.de`-Adresse statt Domain-Adresse. Rechtlich zulässig, wirkt aber unprofessionell und weicht von der Datenschutzerklärung ab. |
| Streitschlichtung | Kein Hinweis nach § 36 VSBG. Für Kleinunternehmen mit ≤ 10 Beschäftigten nicht verpflichtend, aber üblich. |
| Layoutfehler | Über dem Banner erscheint ein verwaister Block „Philosophischer Wochenkalender" außerhalb des Rasters (Zeilen 119–123) — ein sichtbarer Darstellungsfehler. |
| Fehlender Abschluss | Der `<main>`-Bereich wird im Quelltext nicht korrekt geschlossen; `</main>` steht innerhalb des `<footer>`. |

*Rechtliche Einordnung ohne Gewähr — ich bin kein Anwalt. Für eine verbindliche Prüfung sollte ein Fachanwalt für IT-Recht drüberschauen.*

---

## 5. Datenschutzerklärung

*Wortlaut vollständig, `datenschutz.php`*

**H2:** Datenschutzinformation
**H3:** Bei der Erhebung von Daten beim Betroffenen gemäß Art. 13 DSGVO

**Verantwortlicher (Seitenspalte):**
> Erich Grikscheit · Praxis für Marketing & Motivation · Max-Planck-Str. 27 · 61184 Karben · Tel.: 0 60 39 / 45 45 8 · Mobil: 0170 46 33 088 · E-Mail: e.grikscheit@t-online.de

### 1. Information über die Erhebung personenbezogener Daten

> Im Folgenden informieren wir Sie über die Erhebung personenbezogener Daten bei Nutzung unserer Website. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind. Z.B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten.
>
> Verantwortlicher gemäß Art 4Abs. 7 EU-Datenschutz -Grundverordnung (DSGVO) ist
> Erich Grikscheit
> Praxis für Marketing und Motivation
> Max Planck Straße 27
> 61184 Karben
> Telefon: 06039/45 45 8
> Email: info@pfmm.de

### 2. Information über den Umfang und Verbreitung personenbezogener Daten bei Ihrer Kontaktaufnahme mit uns per E-Mail oder über unser Kontaktformular, Zweck und Speicherdauer

> Bei Ihrer Kontaktaufnahme mit uns per E-Mail oder über unser Kontaktformular werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihr Name und Ihre Telefonnummer) von uns gespeichert. Dies dient dem Zweck Ihre Fragen zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist.

### 3. Ihre Rechte

> Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
>
> - Recht auf Auskunft (Art. 15 DSGVO),
> - Recht auf Berichtigung (Art. 16 DSGVO),
> - Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
> - Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO),
> - Recht auf Datenübertragbarkeit (Art. 20 DSGVO).
>
> Sie haben außerdem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde für Datenschutz (Art. 77 DSGVO i.V.m. § 19 BDSG)
> Bei Fragen zur Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten sowie Widerruf ggf. erteilter Einwilligung oder Widerspruch gegen eine bestimmte Datenverwendung wenden Sie sich bitte schriftlich an:
> Erich Grikscheit
> Praxis für Marketing und Motivation
> Max Planck Straße 27
> 61184 Karben
> Telefon: 06039/45 45 8
> Email: info@pfmm.de

### 4. Praxisbrief

> Bei Anmeldung zum Praxisbrief wird Ihre E-Mail-Adresse solange gespeichert bis Sie sich vom weiteren Empfang des Praxisbriefes abmelden. Die Abmeldung ist jederzeit möglich. Wenn Sie den auf unserer Webseite angebotenen Praxisbrief empfangen möchten, brauchen wir von Ihnen eine gültige Email-Adresse sowie Informationen, die die Überprüfung gestatten, dass Sie Inhaber der angegebenen E-Mail-Adresse sind. Weitere Daten werden nicht erfasst. Ihre Einwilligung zur Speicherung der Daten, der Email-Adresse sowie deren Nutzung zum Versand des Praxisbriefes können Sie jederzeit widerrufen.

### 5. Web Analytics — Einsatz von Matomo

> Diese Website nutzt den Webanalysedienst Matomo, um die Nutzung unserer Website analysieren und regelmäßig verbessern zu können. Über die gewonnenen Statistiken können wir unser Angebot verbessern und für Sie als Nutzer interessanter ausgestalten. Rechtsgrundlage für die Nutzung von Matomo ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO.
>
> Für diese Auswertung werden Cookies (näheres dazu in § 3) auf Ihrem Computer gespeichert. Die so erhobenen Informationen speichert der Verantwortliche ausschließlich auf seinem Server in [Deutschland]. Die Auswertung können Sie einstellen durch Löschung vorhandener Cookies und die Verhinderung der Speicherung von Cookies. Wenn Sie die Speicherung der Cookies verhindern, weisen wir darauf hin, dass Sie gegebenenfalls diese Website nicht vollumfänglich nutzen können. Die Verhinderung der Speicherung von Cookies ist durch die Einstellung in ihrem Browser möglich. Die Verhinderung des Einsatzes von Matomo ist möglich, indem Sie den folgenden Haken entfernen und so das Opt-out-Plug-in aktivieren:
>
> *[eingebettetes Matomo-Opt-out-iframe]*
>
> Diese Website verwendet Matomo mit der Erweiterung „AnonymizeIP". Dadurch werden IP-Adressen gekürzt weiterverarbeitet, eine direkte Personenbeziehbarkeit kann damit ausgeschlossen werden. Die mittels Matomo von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen von uns erhobenen Daten zusammengeführt.
>
> Das Programm Matomo ist ein Open-Source-Projekt. Informationen des Drittanbieters zum Datenschutz erhalten Sie unter https://matomo.org/privacy-policy/.

### Befunde zur Datenschutzerklärung

| # | Befund | Schwere |
|---|---|---|
| 1 | **Google Maps wird auf Startseite und Anfahrt geladen — ohne Einwilligung und ohne jede Erwähnung in der Datenschutzerklärung.** Beim Seitenaufruf geht die IP-Adresse des Besuchers an Google. Das Wort „Google" kommt im gesamten Datenschutztext nicht ein einziges Mal vor. | **kritisch** |
| 2 | Es existiert **kein Cookie-/Consent-Banner** auf der gesamten Website. | **kritisch** |
| 3 | Der Google-Maps-API-Schlüssel steht im Klartext im Quelltext (`AIzaSy…`) und ist offenbar nicht domainbeschränkt — er kann von Dritten auf Kosten des Inhabers verwendet werden. | hoch |
| 4 | Platzhalter nicht ersetzt: „auf seinem Server in **[Deutschland]**" — die eckigen Klammern stehen noch im Livetext. | mittel |
| 5 | Verweis auf ein nicht existierendes „**§ 3**" („näheres dazu in § 3") — das Dokument hat nur die Punkte 1–5, kein § 3 zu Cookies. | mittel |
| 6 | **Keine Angaben zu Server-Logfiles und Hosting** (Art. 13 DSGVO) — welche Daten der Webserver protokolliert, fehlt vollständig. | mittel |
| 7 | Zwei **verschiedene E-Mail-Adressen** für denselben Verantwortlichen — und beide stehen auf derselben Seite: `e.grikscheit@t-online.de` in der Seitenspalte, `info@pfmm.de` zweimal im Fließtext. | mittel |
| 8 | Punkt 4 beschreibt eine **Praxisbrief-Anmeldung, die es auf der Website gar nicht gibt**. | niedrig |
| 9 | Kein Hinweis auf das **Widerrufsrecht nach Art. 7 Abs. 3** und keine Nennung der konkreten Aufsichtsbehörde (Hessischer Beauftragter für Datenschutz und Informationsfreiheit). | niedrig |
| 10 | Tippfehler: „Art 4Abs. 7" (fehlendes Leerzeichen), „EU-Datenschutz -Grundverordnung". | niedrig |
| 11 | Matomo mit AnonymizeIP, Selbst-Hosting und Opt-out ist **sauber gelöst** und über berechtigtes Interesse belastbar begründet. | ✓ positiv |

*Rechtliche Einordnung ohne Gewähr. Insbesondere Punkt 1 sollte vor dem Relaunch anwaltlich geprüft werden.*

---

## 6. Bildverzeichnis

**Gesamt: 56 Dateien, 5,10 MB.** Alle heruntergeladen und im ZIP-Paket enthalten (Ordnerstruktur wie auf dem Server).

### Marke & Symbole (5 Dateien)

| Datei | Format | Größe | Maße |
|---|---|---|---|
| `grafiken/logos/logo1.svg` | SVG | 7,7 KB | vektor |
| `grafiken/logos/logo2.svg` | SVG | 16,7 KB | vektor |
| `grafiken/logos/linkedin-logo.svg` | SVG | 2,9 KB | vektor |
| `grafiken/favicon/favicon.ico` | ICO | 894 B | — |
| `home/logo-pfmm.svg` / `home/logo-pfmm2.svg` | SVG | 13,4 / 35,4 KB | Dubletten von logo1/logo2 |

### Bannerstreifen (6 Dateien, alle 2000 × 400 px)

| Datei | Größe | Seite |
|---|---|---|
| `home/intro1_sw_2000x400.jpg` | 74,8 KB | Start, Impressum, Datenschutz, Anfahrt |
| `home/seminar_sw_streifen_2000x400.jpg` | 116,4 KB | Start (unten) |
| `das_angebot/aktuelle_seminare/seminar_sw_streifen_2000x400.jpg` | 116,4 KB | Aktuelle Seminare — **Dublette** |
| `das_angebot/individuelle_seminare/bilder/seminar_sw_streifen_2000x400.jpg` | 116,4 KB | Individuelle Seminare — **Dublette** |
| `das_angebot/philosophische_beratung/bilder/phil-beratung_sw_streifen.jpg` | 127,9 KB | Philosophische Beratung |
| `das_angebot/konzeptentwicklungen/bilder/konzeptentwicklung-streifen.jpg` | 103,6 KB | Konzeptentwicklungen |
| `das_angebot/praxis_medien/bilder/medien-streifen_2000x400.jpg` | 99,7 KB | Praxis Medien, Praxisbriefe |
| `kontakt/bilder/kontakt_sw_streifen_2000x400.jpg` | 147,4 KB | Kontakt |

> Dieselbe Datei liegt dreimal unter verschiedenen Pfaden. Alle Banner sind Schwarzweiß-Stockfotografie im Stil der frühen 2010er.

### Personen (2 Dateien)

| Datei | Größe | Maße | Verwendung |
|---|---|---|---|
| `home/grikscheit_frei_ausschnitt.png` | 139,9 KB | 274 × 400 | Freisteller Sektion „Persönliches" |
| `home/eg_110.jpg` | 12,6 KB | — | rundes Porträt Sektion „Geschäftsführung" |

### Seminar-Vorschauen (8 Dateien) — PDF-Titelseiten als Rastergrafik

`2026-09-02_zeit-horizonte.png` (131,6 KB, 275×400) · `2019_Erfahrung_oT.jpg` · `2019_Freiheit_oT.jpg` · `2019_Konflikte_oT.jpg` · `2019_Praesentation-Rhetorik_oT.jpg` · `2019_Praesentation_oT.jpg` · `2019_Rhetorik-mit-Tabelle_oT.jpg` · `2019_Unternehmensethik_oT.jpg` (je 27–36 KB)

### Praxisbrief-Vorschauen (8 Dateien)

`2026-08-05_ordnung.jpg` · `2026-06-19_arbeit.jpg` · `2026-04-23_vertrauen.jpg` · `2026-01-23_verantwortung_erfahrung_urteil.jpg` · `2025-12-22_den-blick-neu-ueberdenken.jpg` · `2025-11-17_die-geschichte-des-ichs.jpg` · `2025-07-04_wertschaetzung-tradition.jpg` · `2025-05-19_wertschaetzung.jpg` (7–47 KB)

### Referenzgalerie Konzeptentwicklungen (16 Dateien)

| Vorschau | Größe | Großansicht | Größe | Maße Großansicht |
|---|---|---|---|---|
| `Bild1.jpg` | 96,6 KB | `Bild1-1.jpg` | 58,5 KB | — |
| `Bild2.jpg` | 68,9 KB | `Bild2-1.jpg` | 268,6 KB | 1351 × 800 |
| `Bild3.jpg` | 69,4 KB | `Bild3-1.jpg` | 105,9 KB | 566 × 800 |
| `Bild4.jpg` | 69,3 KB | `Bild4-1.jpg` | 338,7 KB | 1142 × 800 |
| `Bild5.jpg` | 80,4 KB | **`Bild5-1.jpg`** | **1101,2 KB** | **1968 × 4251** ⚠️ |
| `Bild6.jpg` | 96,9 KB | `Bild6-1.jpg` | 193,4 KB | 1000 × 827 |
| `Bild7.jpg` | 82,5 KB | `Bild7-1.jpg` | 155,3 KB | 968 × 800 |
| `Bild8.jpg` | 76,6 KB | `Bild8-1.jpg` | 162,8 KB | 968 × 800 |

> `Bild5-1.jpg` ist mit **1,1 MB und 1968 × 4251 px** die mit Abstand größte Datei der Website.

### Praxis Medien (7 Dateien)

`00_lecturio.jpg` (7,9 KB) · `logo_lecturio.jpg` (28,3 KB) · `2018-05-17_kreativität.jpg` (39,1 KB — **Umlaut im Dateinamen**) · `wertschaetzung.jpg` (76,8 KB) · `rituale.jpg` (54,1 KB) · `praesentieren.jpg` (55,6 KB) · `bild-trainingsangebote.png` (78,1 KB)

### Befunde zum Bildbestand

- Von **73 `<img>`-Elementen** im gerenderten Dokument haben **33 gar kein `alt`-Attribut** und weitere **30 ein leeres `alt=""`**. Nur **10 Bilder** sind beschrieben — die acht Seminarkacheln und zwei Porträts. Damit haben **63 von 73 Bildern (86 %)** keinen brauchbaren Alt-Text.
- **Kein einziges Bild im WebP- oder AVIF-Format**, kein `srcset`, kein `loading="lazy"`, keine Größenangaben (`width`/`height`) → Layoutsprünge beim Laden.
- Dateiname mit Umlaut (`kreativität.jpg`) kann bei Serverumzügen zu Problemen führen.
- Einsparpotenzial durch WebP-Konvertierung und passgenaue Skalierung: rund **3,5 MB von 5,1 MB (≈ 70 %)**.

---

## 7. PDF-Dokumente

Alle PDFs sind weiterhin online und abrufbar.

### Seminarbeschreibungen — `/das_angebot/aktuelle_seminare/seminare/`

`2026-09-02_zeit-horizonte.pdf` (1,3 MB) · `2019_Erfahrung_oT.pdf` · `2019_Freiheit_oT.pdf` · `2019_Konflikte_oT.pdf` · `2019_Praesentation-Rhetorik_oT.pdf` · `2019_Praesentation_oT.pdf` · `2019_Rhetorik-mit-Tabelle_oT.pdf` · `2019_Unternehmensethik_oT.pdf`

### Praxisbriefe — `/das_angebot/praxisbriefe/`

`2026-08-05_ordnung.pdf` (678,1 kB) · `2026-06-19_arbeit.pdf` (775,4 kB) · `2026-04-23_vertrauen.pdf` (204,3 kB) · `2026-01-23_verantwortung_erfahrung_urteil.pdf` (822,2 kB) · `2025-12-22_den-blick-neu-ueberdenken.pdf` (188,5 kB) · `2025-11-17_die-geschichte-des-ichs.pdf` (493,0 kB) · `2025-07-04_wertschaetzung-tradition.pdf` (275,7 kB) · `2025-05-19_wertschaetzung.pdf` (187,8 kB)

### Leitfäden — `/das_angebot/praxis_medien/leitfaeden/`

`2017_begleitheft_wertschaetzung.pdf` · `2017_begleitheft_rituale.pdf` · `2017_begleitheft_praesentieren.pdf`

> **Empfehlung:** Jeder Praxisbrief sollte im Relaunch zusätzlich als vollständige HTML-Seite erscheinen — das PDF bleibt als Download erhalten. Aus 8 PDFs werden so 8 indexierbare Fachartikel.

---

## 8. Technischer Ist-Zustand

### Server & Auslieferung

| Merkmal | Wert | Bewertung |
|---|---|---|
| Server | Apache/2.4.68 (Unix) | Version wird preisgegeben |
| PHP | 8.4.22 | aktuell ✓ |
| HTTPS | aktiv, HTTP/2 | ✓ |
| Weiterleitungen | `http://pfmm.de`, `http://www.pfmm.de`, `https://pfmm.de` → alle 301 auf `https://www.pfmm.de/` | ✓ sauber |
| TTFB Startseite | ca. 480 ms | mittelmäßig |
| **Kompression (gzip/brotli)** | **nicht aktiv** | `style.css` wird mit vollen 55 KB ausgeliefert |
| **Cache-Control-Header** | **fehlt** | keine Browser-Zwischenspeicherung |
| **Security-Header** | **keine** (kein HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) | |
| `robots.txt` | **404** | fehlt |
| `sitemap.xml` | **404** | fehlt |

### Technologie-Stack

Statisches PHP ohne CMS · jQuery 1.x + jquery-migrate 1.2.1 (aus 2013) · Bootstrap-artiges Eigenraster (`grid.css`) · Font Awesome 4.7.0 (2016) · Camera Slider · Touch-Touch Lightbox · Matomo (selbst gehostet, Site-ID 4) · Google Maps JS API · IE8-Fallback mit `html5shiv` · SASS-Quelle laut Kommentar unter `Q:\Internetseiten\pfmm.de\sass`

### Kritische Code-Befunde

| # | Befund | Auswirkung |
|---|---|---|
| 1 | **Die Hauptnavigation verschwindet unter 768 px Breite komplett.** `@media (max-width: 767px) { .sf-menu { display: none } }` — und es existiert **kein Burger-Menü**: Das Template bringt zwar CSS für `.rd-mobilemenu` mit, das zugehörige HTML und die JS-Initialisierung fehlen auf allen 11 Seiten. | **Auf jedem Smartphone ist die Website ohne Navigation.** Unterseiten sind nur über vereinzelte Fließtextlinks erreichbar. |
| 2 | **Kein `<meta name="viewport">` im `<head>`.** Es wird erst am Seitenende per `document.write()` aus `script.js` in den `<body>` geschrieben. | Ungültige Platzierung, verzögertes Umschalten auf das mobile Layout, sichtbares Nachrücken beim Laden. |
| 3 | Der nachgeschobene Viewport enthält auf Android und Desktop **`user-scalable=0`**; auf iPhone und iPad setzt `scaleFix()` stattdessen `maximum-scale=1.0`. | **Zoomen ist auf Mobilgeräten deaktiviert.** Verstoß gegen WCAG 2.1 Erfolgskriterium 1.4.4 — relevant für eine Zielgruppe 45+. |
| 4 | **Kein `<h1>` auf keiner der 11 Seiten.** Oberste Ebene ist immer `<h2>`. | Fehlende Dokumenthierarchie für Suchmaschinen und Screenreader. |
| 5 | **Title und Meta-Description auf allen 11 Seiten identisch.** | Google schreibt die Titel bereits selbst um — in den Suchergebnissen erscheinen „Kontakt - …", „Impressum - …", obwohl im Quelltext überall nur „Praxis für Marketing und Motivation" steht. |
| 6 | Kein `rel="canonical"`, kein Open Graph, keine Twitter Cards, kein JSON-LD / Schema.org. | Beim Teilen auf LinkedIn erscheint kein Vorschaubild. Keine Chance auf erweiterte Suchergebnisse. |
| 7 | Verwaister Block „Philosophischer Wochenkalender" zwischen `</header>` und `<main>` auf **impressum.php** und **datenschutz.php**, jeweils Zeilen 119–123. | Sichtbarer Layoutfehler außerhalb des Rasters. |
| 8 | Doppeltes Zitat „Philosophischer Wochenkalender" auf der Startseite. | Redundanz. |
| 9 | Defekter Link `www.linkedin.com/in/erich-grikscheit-pfmm` (ohne Protokoll) → 404 auf pfmm.de. | Toter Link. |
| 10 | Zeilenumbruch im `src` von `2019_Praesentation_oT.jpg`. | Bild lädt je nach Browser nicht. |
| 11 | Ungültiges HTML: `<ul>` innerhalb von `<p>`, nicht geschlossene `<div>`, `</main>` innerhalb `<footer>`. | Unvorhersehbares Rendering. |
| 12 | `<script language="JavaScript">` — seit HTML 4.01 überholt; E-Mail-Verschleierung per `document.write` und Zeichenrotation. | Ohne JavaScript ist keine E-Mail-Adresse sichtbar. |
| 13 | Google-Maps-API-Schlüssel im Klartext, offenbar ohne Domainbeschränkung. | Fremdnutzung auf Kosten des Inhabers möglich. |
| 14 | `body { background: #000 }` in `style.css`, überschrieben in `custom.css`. | Kurzer schwarzer Aufblitzer möglich, bevor `custom.css` greift. |
| 15 | `Source Sans Pro` in `fonts.css` deklariert, nirgends verwendet; `camera.css`, `touch-touch.css`, `rd-mailform.css` (43 KB) weitgehend ungenutzt. | Unnötige Ladelast. |

### Inhaltsumfang je Seite

*Sichtbarer Text ohne Navigation und Skripte, auf ±3 % genau — je nach Zählweise weichen die Werte leicht ab.*

| Seite | Wörter |
|---|---:|
| Datenschutz | 618 |
| Praxisbriefe | 407 |
| Startseite | 296 |
| Aktuelle Seminare | 222 |
| Impressum | 219 |
| Individuelle Seminare | 147 |
| Anfahrt | 145 |
| Praxis Medien | 130 |
| Philosophische Beratung | 119 |
| Konzeptentwicklungen | 92 |
| **Kontakt** | **56** |
| **Gesamt** | **≈ 2.451** |

Abzüglich Impressum und Datenschutz bleiben rund **1.614 Wörter** echter Fachinhalt für die gesamte Website. Ein einziger gut gemachter Ratgeberartikel eines Wettbewerbers hat mehr.

---

*Erfasst am 10.08.2026 durch Gradore UG · Alle Texte wortgetreu übernommen, Tipp- und Zeichensetzungsfehler des Originals inklusive und als solche gekennzeichnet.*
