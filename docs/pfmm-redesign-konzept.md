# pfmm.de — Redesign-Konzept

**Praxis für Marketing und Motivation · Erich Grikscheit, Karben**
Stand: 10. August 2026 (Fassung 2) · Gradore UG

> **Fassung 2:** Nach Sichtung von [best-akademie.de](https://www.best-akademie.de/) als Qualitätsreferenz überarbeitet.
> Neu: fragebasierte Zielgruppenführung, Themen-Direkteinstieg, Vertrauensleiste, benannte Ansprechperson am Formular.
> Ein **klickbarer Prototyp der Startseite** liegt als `pfmm-prototyp.html` bei — alle hier beschriebenen Entscheidungen sind darin umgesetzt.
> Die Detailanalyse der Referenz steht in `best-akademie-designanalyse.md`.

---

## 1. Ausgangslage in drei Sätzen

Die inhaltliche Substanz ist überdurchschnittlich: acht ernsthafte Fachaufsätze aus 2025/2026, eine Vortragsreihe beim Lecturio-Verlag, zwei Podcast-Auftritte, 25 Jahre Vertriebs- und Marketingpraxis plus philosophisches Studium und Individualpsychologie-Ausbildung.

Die Umsetzung macht diese Substanz unsichtbar: Auf dem Smartphone fehlt die Navigation vollständig, kein Seitentitel unterscheidet sich vom anderen, die besten Texte stecken in PDFs, und es gibt auf 11 Seiten keinen einzigen Handlungs-Button.

Das Redesign muss deshalb kaum Inhalte erfinden — es muss vorhandene Inhalte freilegen und in einen Entscheidungsweg übersetzen.

---

## 2. Positionierung

### 2.1 Das Differenzierungsmerkmal

Der Markt für Führungskräftetraining im Raum Frankfurt ist dicht besetzt — Haufe Akademie, Semigator, Stärkentrainer, Schuppan und ein Dutzend Einzeltrainer. Alle versprechen dasselbe: Kommunikation, Führung, Konflikte.

Erich Grikscheit hat etwas, das keiner von ihnen hat: **ein langjähriges philosophisches Studium und eine Ausbildung in Individualpsychologie**, kombiniert mit 25 Jahren Vertriebspraxis. Er trainiert nicht Techniken, er arbeitet am Denken dahinter. Genau das belegen die Praxisbriefe zu Ordnung, Vertrauen, Verantwortung und Arbeit — das ist kein Marketing-Content, das sind Aufsätze.

**Positionierungssatz:**
> Führungstraining, das beim Denken anfängt — nicht bei der Technik.

Diese Position ist verteidigbar, weil sie nicht kopierbar ist. Ein Trainer ohne philosophischen Hintergrund kann sie nicht behaupten.

### 2.2 Zielgruppen

| Segment | Situation | Sucht nach | Einstiegsseite |
|---|---|---|---|
| **Geschäftsführung Mittelstand** (30–250 MA, Rhein-Main/Wetterau) | Führungsteam funktioniert operativ, aber nicht kulturell | Inhouse-Format mit Substanz, kein Standardseminar | Individuelle Seminare |
| **Personalentwicklung** | Budget für Weiterbildung, muss intern begründen | Anbieter mit Profil, Referenzen, Terminen | Seminarkalender |
| **Führungskraft persönlich** (45+) | Bereits erfahren, sucht Tiefe statt Werkzeugkasten | Einzelgespräch, Denkanstoß | Philosophische Beratung |
| **Fachlich Interessierte** | Liest, denkt mit, entscheidet später | Substanzielle Texte | Praxisbriefe |

Das letzte Segment ist heute unbedient und gleichzeitig der günstigste Trichtereinstieg — die Praxisbriefe sind bereits geschrieben.

### 2.3 Was von der Referenz übernommen wird

best-akademie.de dient als Qualitätslatte, nicht als Vorlage. Drei Muster sind so gut, dass sie in jedes ernsthafte Weiterbildungsangebot gehören — der Rest wird bewusst eigenständig gelöst.

| Übernommen | Warum |
|---|---|
| **Fragebasierte Segmentkarten** statt Produktkategorien | „Wollen Sie Ihre Führungsarbeit grundsätzlicher verstehen?" trifft den Besucher dort, wo er steht. Er muss nicht übersetzen, welche Kategorie zu seiner Lage passt — er erkennt sich wieder. Selbstselektion statt Navigation. |
| **Themen-Direkteinstieg** — zwölf Felder mit Chevron | Erledigt zwei Dinge gleichzeitig: Der Besucher ist in einem Klick bei seinem Thema, und Google bekommt zwölf klar benannte interne Links. |
| **Benannte Ansprechperson am Formular** | Ein Formular ohne Gesicht ist ein Briefkasten ins Nichts. Bei einer Ein-Personen-Praxis ist das sogar stärker: „Sie erreichen mich direkt — kein Sekretariat, keine Warteschleife." |
| **Vertrauensband früh auf der Seite** | Die Referenz zeigt Portalbewertungen. pfmm hat die noch nicht — also stehen dort zunächst die belegbaren Autoritätssignale: 25+ Jahre, Lecturio-Verlag, Philosophie und Individualpsychologie, Standort. Sobald Bewertungen vorliegen, ersetzen sie diese Inhalte. |
| **Newsletter mit eigener Bühne** statt Fußnote im Footer | Der Lead-Magnet existiert bereits — acht Praxisbriefe. Ihm fehlte nur der Trichter. |

Bewusst **anders** als die Referenz:

| Referenz | pfmm | Begründung |
|---|---|---|
| Vier Farbfamilien (Petrol, Orange, Grün, Lila) | Zwei plus Neutrale | Segmente bleiben unterscheidbar, wirken aber als eine Marke |
| Sans-Serif durchgehend | Serife (Lora) für Überschriften und Zitate | Das eigentliche Unterscheidungsmerkmal: philosophische Tiefe braucht eine andere Anmutung als eine Full-Service-Akademie |
| 14 px Fließtext | 18 px, Zeilenhöhe 1,65 | Zielgruppe 45+ |
| Startseite 15.932 px hoch | 7.732 px | Halb so lang bei gleicher Inhaltsdichte |
| Keine `Course`-Auszeichnung | `Course` + `CourseInstance` je Seminar | Genau die Lücke der Referenz wird geschlossen |
| Schriften vom Google-CDN | eingebettet, kein externer Aufruf | DSGVO |

### 2.4 Der Trichter, der heute fehlt

```
Praxisbrief lesen (HTML, indexierbar)
        ↓
Praxisbrief abonnieren (Double-Opt-in)
        ↓
Alle 6–8 Wochen ein Denkanstoß im Postfach
        ↓
Erstgespräch (30 Min., kostenlos)
        ↓
Seminar / Inhouse / Einzelberatung
```

Stufe 1 und 2 existieren heute nicht — obwohl die Datenschutzerklärung sie unter Punkt 4 bereits ausführlich beschreibt.

---

## 3. Neue Seitenstruktur

### 3.1 Von 11 auf ~26 Seiten

```
/                                    Startseite
/leistungen/
  ├── /seminare/                     Seminarkalender mit Terminen
  │     └── /seminare/[slug]/        je Seminar eine Detailseite
  ├── /inhouse/                      Individuelle Seminare (Inhouse)
  ├── /beratung/                     Philosophische Beratung / Einzelgespräch
  └── /konzepte/                     Konzeptentwicklung + Referenzen
/praxisbriefe/                       Übersicht
  └── /praxisbriefe/[slug]/          8 Artikel als HTML  ← neu, SEO-Kern
/leitfaeden/                         Praxis Medien (Downloads)
/ueber-mich/                         Persönliches — ausgebaut
/kontakt/                            Kontakt + Terminanfrage
/anfahrt/                            Anfahrt (oder in /kontakt/ integriert)
/impressum/  /datenschutz/
```

**Was sich strukturell ändert:**

| Heute | Neu | Warum |
|---|---|---|
| „Persönliches" nur als Ankersprung auf der Startseite | eigene Seite `/ueber-mich/` | Diese Seite entscheidet den Kauf — sie braucht Platz und muss ranken |
| „Das Angebot" als leerer Dropdown-Auslöser | `/leistungen/` als echte Übersichtsseite | Einstiegspunkt für Suchanfragen und interne Verlinkung |
| Aktuelle + Individuelle Seminare mit identischer H2 | `/seminare/` (offene Termine) und `/inhouse/` (Auftragsformat) | Zwei verschiedene Kaufprozesse, zwei verschiedene Seiten |
| 8 Seminare ohne Detailseite | je eine Detailseite mit `Event`-Auszeichnung | Termine können in den Suchergebnissen erscheinen |
| 8 Praxisbriefe nur als PDF | 8 HTML-Artikel + PDF-Download | mehrere tausend Wörter Fachtext werden indexierbar |

### 3.2 Navigation

**Desktop:** Leistungen ▾ · Praxisbriefe · Über mich · Kontakt · **[Erstgespräch vereinbaren]** (Button, Messing)

**Mobil (< 1024 px):** Burger → Off-Canvas-Panel, volle Höhe, Fokusfalle, `aria-expanded`.
Zusätzlich eine feste Leiste am unteren Rand: **[Anrufen]** · **[Erstgespräch]**

Die feste Leiste ist der wichtigste Einzelbaustein — sie ersetzt die heute fehlende mobile Handlungsmöglichkeit vollständig.

---

## 4. Startseite — Aufbau

### 4.1 Wireframe

*Umgesetzt im beiliegenden Prototyp `pfmm-prototyp.html`.*

```
┌──────────────────────────────────────────────────────────────────┐
│ ◤ Grikscheit    Leistungen▾ Praxisbriefe Über mich Kontakt ▐CTA▌ │ sticky
├──────────────────────────────────────────────────────────────────┤
│  SEIT 25 JAHREN · KARBEN BEI FRANKFURT                           │
│                                                    ┌───────────┐ │
│  Führungstraining, das                             │           │ │
│  beim Denken anfängt.                              │  Porträt  │ │
│                                                    │  Erich    │ │
│  Ich begleite Führungskräfte in Wirtschaft und     │ Grikscheit│ │
│  Verwaltung — mit den Werkzeugen der Vertriebs-    │           │ │
│  praxis und dem Fundament der Philosophie.         │           │ │
│                                                    │           │ │
│  ▐ Erstgespräch vereinbaren → ▌ ( Seminartermine ) │           │ │
│  ┌────────────────────────────────────┐            │           │ │
│  │ Wobei darf ich Sie unterstützen?   │            │           │ │
│  │ [ Thema wählen … ▾ ]  ▐ Finden ▌   │  ← Direkt- │           │ │
│  └────────────────────────────────────┘   einstieg └───────────┘ │
├──────────────────────────────────────────────────────────────────┤
│ ★ 25+ Jahre Praxis │ ▤ Lecturio-Verlag │ ⚖ Philosophie │ ⌖ Karben│ dunkel
├──────────────────────────────────────────────────────────────────┤
│  WO STEHEN SIE GERADE?          Ob Sie für sich selbst suchen,   │
│  Drei Wege, je nachdem          für Ihr Team oder für die ganze  │
│  wer vor mir sitzt              Organisation …                   │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │ FÜR SIE      │ │ FÜR IHR TEAM │ │ FÜR IHRE     │              │
│  │ PERSÖNLICH   │ │              │ │ ORGANISATION │              │
│  │              │ │              │ │              │              │
│  │ Wollen Sie   │ │ Suchen Sie   │ │ Möchten Sie  │  ← FRAGEN    │
│  │ Ihre Führungs│ │ ein Training,│ │ Ihren Kunden-│    statt     │
│  │ arbeit grund-│ │ das wirklich │ │ dialog neu   │    Produkt-  │
│  │ sätzlicher   │ │ zu Ihrer Lage│ │ aufsetzen?   │    namen     │
│  │ verstehen?   │ │ passt?       │ │              │              │
│  │              │ │              │ │              │              │
│  │ (Seminare)   │ │ (Inhouse)    │ │ (Konzepte)   │              │
│  │ (Gespräch)   │ │ (Konflikt)   │ │ (Referenzen) │              │
│  └──────────────┘ └──────────────┘ └──────────────┘              │
│    Bordeaux         Tinte            Umbra                       │
├──────────────────────────────────────────────────────────────────┤
│  THEMEN                    Zwölf Felder aus 25 Jahren Praxis.    │
│  Woran wir gemeinsam arbeiten                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Führung und Leadership › │ Konflikte ›  │ Rhetorik ›       │  │
│  │ Präsentation           › │ Gespräch  ›  │ Verhandlung ›    │  │  ← Direkt-
│  │ Vertrieb               › │ Zeit      ›  │ Resilienz ›      │  │    einstieg
│  │ Unternehmensethik      › │ Motivation›  │ Besprechungen ›  │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  NÄCHSTER OFFENER TERMIN     Drei Tage zu Resilienz, Angst …     │
│  Zeit — Horizonte                                                │
│  ┌─────────────┬──────────────────────────────────────────────┐  │
│  │  02.–04.    │ Zeit — Horizonte                             │  │
│  │  SEPTEMBER  │ Resilienz · Angst · Konflikte                │  │
│  │  2026       │ Wie gehen wir mit unserer Zeit um, wenn …    │  │
│  │  3 Tage     │ ▐ Platz anfragen ▌  Programm als PDF ↓       │  │
│  └─────────────┴──────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  PRAXISBRIEFE               Kurze Aufsätze zu Begriffen, die …   │
│  Denkanstöße, alle sechs bis acht Wochen                         │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                       │
│  │ AUG 2026  │ │ JUN 2026  │ │ APR 2026  │                       │
│  │ Ordnung   │ │ Arbeit    │ │ Vertrauen │                       │
│  │ 3 Sätze   │ │ 3 Sätze   │ │ 3 Sätze   │                       │
│  │ Lesen →   │ │ Lesen →   │ │ Lesen →   │                       │
│  └───────────┘ └───────────┘ └───────────┘                       │
│  Alle acht Praxisbriefe ansehen →                                │
├──────────────────────────────────────────────────────────────────┤
│ ▐▐▐ BORDEAUX-FLÄCHE ▐▐▐                                          │
│         „Das Gespräch ist der entscheidende Weg                  │
│          zum Dialog und zur Wertschätzung."                      │
│                    ERICH GRIKSCHEIT                              │
├──────────────────────────────────────────────────────────────────┤
│  ┌───────────┐   ÜBER MICH                                       │
│  │  Porträt  │   Erst die Praxis. Dann die Frage,                │
│  │  auf ge-  │   warum sie funktioniert.                         │
│  │  töntem   │   Fünfundzwanzig Jahre in Vertriebs- und …        │
│  │  Grund    │   ✓ Akademie für Marketing und Kommunikation      │
│  │      ▐25+▌│   ✓ Philosophisches Studium, Individualpsychologie│
│  └───────────┘   ✓ Wirtschaft und Verwaltung, viele Branchen     │
│                  PUBLIKATIONEN: (Lecturio) (Podcast) (Leitfäden) │
├──────────────────────────────────────────────────────────────────┤
│  STIMMEN — Was Teilnehmer berichten                              │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                       │
│  │ ★★★★★     │ │ ★★★★★     │ │ ★★★★★     │  ← Platzhalter,      │
│  │ „Zitat"   │ │ „Zitat"   │ │ „Zitat"   │    sichtbar als       │
│  │ Name/Pos. │ │ Name/Pos. │ │ Name/Pos. │    solche markiert    │
│  └───────────┘ └───────────┘ └───────────┘                       │
├──────────────────────────────────────────────────────────────────┤
│ ▐▐ DUNKLE FLÄCHE ▐▐                                              │
│  Den Praxisbrief erhalten    [ E-Mail-Adresse ] ▐ Erhalten ▌     │
│  Alle 6–8 Wochen ein …       ☐ Datenschutz  · Double-Opt-in      │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────┬─────────────────────────┐  │
│  │ ERSTGESPRÄCH                     │      (Porträt rund)     │  │
│  │ Sie überlegen, ob das passt?     │   Erich Grikscheit      │  │
│  │ Name*        │ Unternehmen       │   Sie erreichen mich    │  │
│  │ E-Mail*      │ Telefon           │   direkt — kein Sekre-  │  │
│  │ Worum geht es?*                  │   tariat.               │  │
│  │ ☐ Datenschutz                    │   ☎ 06039 45458         │  │
│  │ ▐ Anfrage senden → ▌             │   ✉ info@pfmm.de        │  │
│  └──────────────────────────────────┴─────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER dunkel · 4 Spalten: Marke+NAP · Leistungen · Wissen ·    │
│  Kontakt   —   Impressum · Datenschutz · Cookie-Einstellungen    │
└──────────────────────────────────────────────────────────────────┘

MOBIL zusätzlich: Burger → Off-Canvas mit Fokusfalle
                  feste Leiste unten: ▐ Anrufen ▌ ▐ Erstgespräch ▌
```

### 4.2 Die psychologische Logik dahinter

| Abschnitt | Prinzip | Wirkung |
|---|---|---|
| Startbereich | **Klarheit vor Kreativität** | In fünf Sekunden ist beantwortet: was, für wen, von wem, wo, was jetzt |
| Themenauswahl im Hero | **Handlungsangebot statt Aussage** | Wer schon weiß, was er sucht, wird sofort abgeholt statt zum Scrollen gezwungen |
| Vertrauensband | **Autorität** (Cialdini) | Belege stehen früh, bevor Zweifel entstehen |
| Frage-Segmentkarten | **Selbstselektion** | Der Besucher muss nicht übersetzen, welche Produktkategorie zu seiner Lage gehört — er erkennt sich in einer Frage wieder |
| Themengitter | **Reduktion der Suchkosten** | Ein Klick statt drei; nebenbei zwölf interne Links für die Suchmaschine |
| Vier Kacheln | **Auswahlarchitektur** | Vier Optionen — mehr überfordert, weniger wirkt dünn |
| Nächster Termin | **Verknappung, aber ehrlich** | Ein echtes Datum wirkt stärker als acht „auf Anfrage" |
| Praxisbriefe | **Reziprozität** | Erst geben, dann fragen — das Material ist bereits vorhanden |
| Zitat auf Farbfläche | **Kontrastprinzip** | Setzt einen Ruhepunkt, macht die Haltung greifbar |
| Teilnehmerstimmen | **Sozialer Beweis** | Fremdurteil schlägt Selbstbeschreibung |
| Anmeldung | **Kleines Ja vor großem Ja** | Micro-Conversion für alle, die noch nicht buchen |
| Abschluss-CTA | **Risikoumkehr** | „30 Minuten, kostenlos, unverbindlich" senkt die Hemmschwelle |

**Bewusst weggelassen:** künstliche Countdowns, „Nur noch 2 Plätze!", Pop-ups. Bei einer Zielgruppe von Geschäftsführern und Personalentwicklern beschädigen solche Mittel die Glaubwürdigkeit mehr, als sie an Konversion bringen. Verknappung wirkt hier nur, wenn sie stimmt.

---

## 5. Textkonzept

### 5.1 Was am Bestandstext geändert werden muss

| Heute | Problem | Neu |
|---|---|---|
| „Herzlich willkommen!" | keine Information | „Führungstraining, das beim Denken anfängt." |
| „Mit Anderen Beziehungen gestalten sind die wesentlichen Voraussetzungen…" | grammatikalisch schief, abstrakt | „Seit 25 Jahren begleite ich Führungskräfte…" |
| Wechsel zwischen „ich", „wir", „kleines Kreativteam" | Identitätsverwirrung | durchgehend **erste Person Singular** — die Person ist das Produkt |
| „Mehr Details >>" | schwacher Textlink | Button mit konkretem Ziel: „Seminarprogramm ansehen" |
| „Seminartermin: auf Anfrage" (7×) | wirkt inaktiv | „Inhouse-Format — Termin nach Absprache" |
| „>>> Bitte hier klicken >>>" | Stil der 2000er | regulärer Button |
| Meta-Description mit „muß" | alte Rechtschreibung | neu geschrieben, je Seite individuell |

### 5.2 Beispieltexte für die Startseite

**Überschrift (H1):**
> Führungstraining, das beim Denken anfängt.

**Vorspann:**
> Seit 25 Jahren begleite ich Führungskräfte in Wirtschaft und Verwaltung — mit den Werkzeugen der Vertriebspraxis und dem Fundament der Philosophie. Nicht Technik über Technik, sondern die Frage, was hinter einer Entscheidung steht.

**Kachel Seminare:**
> **Offene Seminare**
> Drei Tage zu Resilienz, Konflikten, Rhetorik oder Unternehmensethik — in kleiner Runde, mit Zeit zum Denken.

**Kachel Inhouse:**
> **Inhouse-Trainings**
> Vorgespräch, Einzelinterviews, maßgeschneidertes Konzept. Kein Programm von der Stange.

**Kachel Beratung:**
> **Philosophische Beratung**
> Einzelgespräche für Führungskräfte, die keine Antwort suchen, sondern eine bessere Frage.

**Kachel Konzepte:**
> **Konzeptentwicklung**
> Kundendialog, der trägt — von der Idee über den Text bis zur Umsetzung.

**Anmeldung Praxisbrief:**
> **Alle sechs bis acht Wochen ein Denkanstoß**
> Der Praxisbrief bringt philosophische und psychologische Impulse für die Führungsarbeit — zu Themen wie Ordnung, Vertrauen, Verantwortung und Arbeit. Kostenlos, jederzeit kündbar, kein Verkauf.

**Abschluss:**
> **Sie überlegen, ob das passt?**
> Dreißig Minuten Gespräch, kostenlos und unverbindlich. Danach wissen wir beide, ob wir zusammenarbeiten sollten.

---

## 6. Visuelles System

### 6.1 Farben

Vollständige Palette mit Kontrastwerten siehe `pfmm-inhalte-komplett.md`, Abschnitt 2.2, und das Dashboard.

**Kurzfassung:**

| Rolle | HEX | Einsatz |
|---|---|---|
| Bordeaux 600 | `#A81F39` | Marke — **unverändert übernommen** |
| Bordeaux 900 | `#5E0A28` | Überschriften auf hellem Grund, Fußzeile |
| Bordeaux 700 | `#8A0F3A` | Vollflächige Sektionen |
| **Messing 600** | `#8A6624` | **alle Handlungsaufforderungen** — ersetzt Reinrot (5,24:1 auf Weiß) |
| Messing 700 | `#6E5019` | CTA-Hover, Textlinks (7,43:1) |
| Messing 400 | `#C9A85E` | Akzente auf dunklen Flächen |
| **Umbra 900** | `#3D2510` | drittes Segment (Organisation) |
| Tinte 700 | `#3D3936` | Fließtext (10,7:1 — AAA) |
| Tinte 100 | `#F2EFEB` | alternierende Sektionen |

Kernentscheidung: Das Weinrot bleibt Markenfarbe, wird aber **nicht mehr für Buttons verwendet**. Handlungsaufforderungen bekommen mit Messing eine eigene, komplementäre Farbe — dadurch ist auf jeder Seite eindeutig, was anklickbar ist. Reinrot `#FF0000` entfällt ersatzlos.

> **Korrektur gegenüber Fassung 1:** Das ursprünglich vorgesehene Messing `#A67C2E` erreicht mit weißem Text nur 3,79:1 und verfehlt damit WCAG AA. Die gesamte Messing-Skala wurde um eine Stufe abgedunkelt — `#8A6624` erreicht 5,24:1. Im Prototyp sind **alle 34 geprüften Farbkombinationen** konform.

**Segmentfarben** — drei Töne einer warmen Familie, statt der vier konkurrierenden Farbfamilien der Referenz:

| Segment | Fläche | Akzent | Kontrast Text |
|---|---|---|---|
| Für Sie persönlich | Bordeaux 900 `#5E0A28` | `#EFC9D2` | 9,36:1 |
| Für Ihr Team | Tinte 900 `#1C1A19` | `#C9A85E` | 12,33:1 |
| Für Ihre Organisation | Umbra 900 `#3D2510` | `#E8D9B4` | 10,19:1 |

### 6.2 Typografie

| Element | Schrift | Desktop / Mobil | Gewicht | Zeilenhöhe |
|---|---|---|---|---|
| H1 | **Lora** | 56 / 34 px | 600 | 1,15 |
| H2 | Lora | 40 / 28 px | 600 | 1,2 |
| H3 | **Inter** | 24 / 20 px | 600 | 1,3 |
| Fließtext | Inter | **18 / 17 px** | 400 | **1,65** |
| Vorspann | Inter | 21 / 19 px | 400 | 1,55 |
| Zitat | Lora kursiv | 24 / 20 px | 400 | 1,45 |
| Button | Inter | 17 px | 600 | 1 |

Lora transportiert die philosophische Tiefe, Inter sorgt für Lesbarkeit. Beide frei lizenziert, beide lokal gehostet — kein Google-Fonts-CDN.

### 6.3 Symbole

Ein durchgängiges Strichsymbol-Set (Lucide, 1,5 px, `currentColor`) ersetzt die vier Logo-Dubletten:

| Bereich | Symbol |
|---|---|
| Seminare | Kalender mit Häkchen |
| Inhouse | Puzzleteil |
| Beratung | zwei Sprechblasen im Dialog |
| Konzepte | Glühbirne über Blatt |
| Leitfäden | aufgeschlagenes Buch |
| Praxisbriefe | Briefumschlag mit Feder |

Das Segel-Logo erscheint ausschließlich als Absender im Kopfbereich — als **eine** konsolidierte Wortbildmarke mit zwei Untermarken-Zeilen statt zwei konkurrierender Logos.

### 6.4 Bildsprache

| Heute | Neu |
|---|---|
| Graustufen-Stockfotos aus den frühen 2010ern | echte Fotos: Erich Grikscheit im Seminar, Seminarraum, Detailaufnahmen |
| Porträt als harter Freisteller vor Rotfläche | warmes, natürliches Porträt in Umgebung |
| PDF-Titelseiten als unleserliche Vorschaubilder | eigene Titelbilder für Seminare und Praxisbriefe |
| Referenzgalerie ohne Beschriftung | Referenzen mit Kunde, Aufgabe, Ergebnis |
| 5,1 MB JPEG/PNG | WebP mit `srcset`, Lazy Loading, `width`/`height` gesetzt |

Wenn kein Budget für ein Fotoshooting da ist: Lieber wenige gute Bilder als viele schlechte. Ein starkes Porträt und drei Seminarfotos reichen für die gesamte Seite.

### 6.5 Raster & Abstände

- 12-Spalten-Raster, max. Inhaltsbreite 1180 px, Textspalten max. 72 Zeichen
- Abstandsskala in 8er-Schritten: 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128
- Sektionsabstände: 96 px Desktop, 64 px Mobil
- Eckenradius durchgehend 14 px, Schatten dezent
- Haltepunkte: 480 · 768 · 1024 · 1280 px

---

## 7. Technische Vorgaben

### 7.1 Pflicht

- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` **statisch im `<head>`, ohne Skalierungssperre**
- [ ] Genau ein `<h1>` pro Seite, saubere H2/H3-Hierarchie
- [ ] Individueller `<title>` (50–60 Z.) und `<meta description>` (140–160 Z.) je Seite
- [ ] `rel="canonical"` auf jeder Seite
- [ ] Open Graph + Twitter Cards inkl. Vorschaubild (LinkedIn ist der Hauptkanal)
- [ ] JSON-LD: `LocalBusiness`, `Person`, `Event` je Seminar, `Article` je Praxisbrief, `BreadcrumbList`
- [ ] `robots.txt` mit Sitemap-Verweis, automatisch erzeugte `sitemap.xml`
- [ ] Alle Bilder WebP + `srcset` + `loading="lazy"` + `width`/`height`
- [ ] Beschreibende `alt`-Texte; dekorative Bilder `alt=""` + `role="presentation"`
- [ ] Telefonnummer überall als `tel:`-Link — **`format-detection: telephone=no` entfällt**
- [ ] Kompression (brotli/gzip) und Cache-Control-Header aktivieren
- [ ] Security-Header: HSTS, X-Content-Type-Options, Referrer-Policy, CSP
- [ ] Schriften lokal (wie bisher — das war richtig gelöst)
- [ ] Matomo übernehmen (selbst gehostet, AnonymizeIP, Opt-out — war ebenfalls richtig)
- [ ] Consent-Banner für alle einwilligungspflichtigen Dienste
- [ ] Karte: OpenStreetMap/Leaflet **oder** Google Maps hinter Zwei-Klick-Lösung
- [ ] Kontaktformular: Pflichtfelder, `type="email"`, Datenschutz-Checkbox, Spamschutz, Bestätigungsseite
- [ ] Praxisbrief-Anmeldung mit Double-Opt-in und Abmeldelink
- [ ] WCAG 2.1 AA: Kontraste, sichtbarer Fokusring, Tastaturbedienung, Sprungmarke zum Inhalt

### 7.2 Weiterleitungen (alte auf neue URLs, 301)

| Alt | Neu |
|---|---|
| `/index.php` | `/` |
| `/das_angebot-aktuelle_seminare.php` | `/leistungen/seminare/` |
| `/das_angebot-individuelle_seminare.php` | `/leistungen/inhouse/` |
| `/das_angebot-philosophische_beratung.php` | `/leistungen/beratung/` |
| `/das_angebot-konzeptentwicklungen.php` | `/leistungen/konzepte/` |
| `/das_angebot-praxis_medien.php` | `/leitfaeden/` |
| `/das_angebot-praxisbriefe.php` | `/praxisbriefe/` |
| `/anfahrt.php` | `/anfahrt/` |
| `/kontakt.php` | `/kontakt/` |
| `/impressum.php` | `/impressum/` |
| `/datenschutz.php` | `/datenschutz/` |

**Wichtig:** Alle PDF-Pfade unter `/das_angebot/…` müssen erreichbar bleiben oder sauber weitergeleitet werden — sie sind teilweise von außen verlinkt (LinkedIn) und werden über Matomo als Downloads gemessen.

### 7.3 Zielwerte

| Kennzahl | Heute | Ziel | Prototyp erreicht |
|---|---|---|---|
| Seitenhöhe Startseite | 3.212 px (dünn) | inhaltsreich, aber kompakt | **7.732 px** (Referenz: 15.932) |
| Fließtextgröße | 14 px | 18 px | **18 px** ✓ |
| H1 pro Seite | 0 | 1 | **1** ✓ |
| Bilder ohne Alt-Text | 63 von 73 | 0 | **0** ✓ |
| Kontraste unter WCAG AA | 7 von 12 | 0 | **0 von 34** ✓ |
| Mobile Navigation | fehlt | vorhanden | **Off-Canvas mit Fokusfalle** ✓ |
| Externe Schriftaufrufe | keine | keine | **keine, eingebettet** ✓ |
| Strukturierte Daten | keine | LocalBusiness, Person, Course, Article | **LocalBusiness, Person, Course** ✓ |
| Seitengewicht Startseite | > 1,5 MB | < 500 KB | 336 KB (inkl. eingebetteter Schriften) |
| Largest Contentful Paint | ~2,5 s | < 1,8 s |
| Cumulative Layout Shift | hoch (keine Bildmaße) | < 0,05 |
| Lighthouse Barrierefreiheit | ~55 | > 95 |
| Lighthouse SEO | ~65 | 100 |
| Wörter Fachinhalt | ca. 1.600 | > 15.000 |
| Indexierbare Seiten | 11 | ~26 |

---

## 8. SEO-Konzept

### 8.1 Seiten-Zuordnung

| Seite | Hauptbegriff | Nebenbegriffe |
|---|---|---|
| `/` | Führungskräftetraining Frankfurt | Seminare Karben, Trainer Wetterau |
| `/leistungen/seminare/` | Führungsseminar Frankfurt | Rhetorikseminar, Konfliktseminar Hessen |
| `/leistungen/inhouse/` | Inhouse-Training Führungskräfte | maßgeschneidertes Führungstraining |
| `/leistungen/beratung/` | Philosophische Beratung | Einzelcoaching Führungskraft, Sokratisches Gespräch |
| `/leistungen/konzepte/` | Marketingkonzept Mittelstand | Kundendialog, Verkaufsförderung |
| `/praxisbriefe/[slug]/` | je Thema | „Was bedeutet Ordnung", „Vertrauen in Organisationen" … |
| `/ueber-mich/` | Erich Grikscheit | Trainer Individualpsychologie |

### 8.2 Titel-Beispiele

```
/                    Führungstraining, das beim Denken anfängt | Erich Grikscheit, Karben
/leistungen/seminare/ Führungsseminare bei Frankfurt — Termine 2026 | Praxis für Marketing & Motivation
/praxisbriefe/       Praxisbriefe: Philosophische Impulse für Führungskräfte
/praxisbriefe/ordnung/ Ordnung — warum wir den Begriff selten hinterfragen | Praxisbrief
/ueber-mich/         Erich Grikscheit — Trainer, Berater, Philosoph | Karben bei Frankfurt
/kontakt/            Kontakt & Erstgespräch | Praxis für Marketing & Motivation, Karben
```

### 8.3 Lokales SEO

1. Google-Unternehmensprofil einrichten/beanspruchen, Kategorie „Unternehmensberater" + „Bildungseinrichtung"
2. Adressdaten in Verzeichnissen vereinheitlichen — die alte Dieselstraße 22 kursiert noch
3. `LocalBusiness`-JSON-LD mit Öffnungszeiten und Geokoordinaten (50.222643 / 8.765120)
4. Teilnehmerbewertungen systematisch einholen
5. Regionalbezug im Text: Karben, Wetteraukreis, Frankfurt, Bad Vilbel, Friedberg

---

## 9. Umsetzung

### Phase 0 — Sofortmaßnahmen am Bestand (1 Tag)

Diese Punkte lohnen sich auch dann, wenn der Relaunch erst in Monaten kommt:

1. Google Maps entschärfen, API-Schlüssel auf Domain beschränken, Budgetlimit setzen
2. `user-scalable=0` entfernen, Viewport statisch in den `<head>`
3. Einfaches Burger-Menü nachrüsten
4. 11 individuelle Titel + Beschreibungen, je ein H1
5. `robots.txt` und `sitemap.xml` anlegen
6. Defekten LinkedIn-Link und den Zeilenumbruch im Bildpfad reparieren
7. Verwaisten „Wochenkalender"-Block aus Impressum und Datenschutz entfernen
8. `[Deutschland]` und den Verweis auf „§ 3" in der Datenschutzerklärung korrigieren

### Phase 1 — Grundgerüst

Design-System, Komponenten, Startseite, Navigation inkl. Mobil, Footer, Rechtsseiten neu.

### Phase 2 — Inhalte

Leistungsseiten mit ausgebautem Text, `/ueber-mich/`, Seminarkalender mit Detailseiten, acht Praxisbriefe als HTML.

### Phase 3 — Konversion

Praxisbrief-Anmeldung mit Double-Opt-in, Kontakt- und Terminanfrage, Teilnehmerstimmen einholen und einbauen, Referenzen beschriften.

### Phase 4 — Technik & Livegang

Bildoptimierung, strukturierte Daten, Weiterleitungen, Consent, Security-Header, Matomo-Umzug, Lighthouse-Prüfung, anwaltliche Prüfung der Rechtstexte.

### Phase 5 — Danach

Google-Unternehmensprofil, Verzeichnisdaten, Bewertungen, Praxisbriefe weiterhin auf LinkedIn ausspielen — diesmal mit Verlinkung auf die HTML-Version statt auf das PDF.

---

## 10. Was mitgenommen wird

Nicht alles muss neu. Diese Entscheidungen waren richtig und bleiben:

- **Matomo** statt Google Analytics — selbst gehostet, anonymisiert, mit Opt-out
- **Lokal gehostete Schriften** — genau der Fehler, der 2022 zur Abmahnwelle führte, wurde hier vermieden
- **HTTPS und saubere 301-Weiterleitungen** aller vier Domainvarianten
- **Das Weinrot** als Markenfarbe
- **Der komplette Textbestand** als Rohmaterial — die Fachsubstanz stimmt, nur die Verpackung nicht
- **Die acht Praxisbriefe** — das wertvollste Gut des ganzen Auftritts

---

*Erstellt am 10.08.2026 · Gradore UG · Rechtliche Hinweise ohne Gewähr, keine Rechtsberatung.*
