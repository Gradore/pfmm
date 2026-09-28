# Kundenfeedback 24.09.2026 – Teil 1: seitenübergreifende Korrekturen

Der Kunde (Erich Grikscheit) hat die Seite durchgesehen. Bitte die folgenden Korrekturen **wörtlich** umsetzen. Konzept, Design-System (Bordeaux/Messing, Lora/Inter), Struktur und Routen bleiben unverändert. Nichts erfinden – wo ein Text unten steht, genau diesen verwenden (offensichtliche Tippfehler wie „Adrresse", „Zeitmanagemen.t", „JANAUR" korrigieren).

## 1. Global
- **Überall „25 Jahre" → „30 Jahre"** (Hero-Eyebrow „SEIT 30 JAHREN – KARBEN BEI FRANKFURT", „30 Jahre Praxis" statt „25+ Jahre Praxis", Über-mich-Checkliste „30 Jahre Vertrieb und Marketing, danach Trainer und Berater", Praxisbrief-Autorbox „Ich verbinde 30 Jahre Vertriebs- und Marketingpraxis mit Philosophie und Individualpsychologie — und schreibe die Praxisbriefe aus dem Training heraus.", Stationen „30 Jahre Vertrieb und Marketing", Fließtext „fünfundzwanzig" → „dreißig", Meta-Descriptions/JSON-LD).
- **Footer-Markenblock** ersetzen durch:
  „Praxis für Management – Training
  Praxis für philosophische und Individualpsychologische Beratung
  Max-Planck-Straße 27, 61184 Karben"
- **Neuer Kontaktblock „Barbara Grikscheit"** (kleine Karte, wiederverwendbare Komponente `KontaktOrganisation`): „Barbara Grikscheit · Kontakt und Organisation · 06039 45458 · B.Grikscheit@t-online.de" (tel:+49603945458, mailto). Einsetzen: auf der Startseite im Kontakt-/Über-mich-Bereich, Seite Über mich, Kontaktseite (neben Erich Grikscheit), Leistungen-Übersicht, Offene Seminare und auf jeder Seminar-Detailseite in der Seitenleiste unter „Anmeldung / Fragen".
- **Layoutfehler Kopfzeile (Folie 27):** Die obere Menüleiste erscheint mitten auf der Seite und nicht über die volle Breite. Bitte Header prüfen: sticky Header soll immer volle Breite (`inset-x-0`, `w-full`) haben, darf nicht innerhalb eines Containers mit transform/overflow liegen, und darf keinen Inhalt verdecken (Scroll-Offset `scroll-margin-top` für Anker). Auf Mobil und Desktop testen, auch bei langen Seiten.

## 2. Startseite
- **Hero: neues Panel „Aktuelles"** (rechts neben/unter der Headline, mobil unter dem Hero-Text, als Karte mit kleinem runden Porträtbild von Erich Grikscheit). Drei Gruppen:
  **Aktuelle Seminare**
  - 3.–4. November 2026 · Moderation von Workshops · 2 Tage
  - 12.–13. November 2026 · Zeit und Effizienztraining · 2 Tage
  - 18.–19. November 2026 · Führen mit Zielen · 2 Tage
  - 24.–25. November 2026 · Kraft der Wertschätzung · 2 Tage
  **90 Minuten Talk** (kostenlos, digital)
  - 5. November 2026 · „Führen, wenn die KI mit entscheidet"
  - 26. November 2026 · „Warum sollten mir meine Mitarbeiter:innen noch glauben?"
  - 3. Dezember 2026 · „Vertrauen – die neue Führungswährung"
  **Neue Themen digital**
  - November 2026 · „Macht und Führung" – Teil 1
  - Januar 2027 · „Macht und Führung" – Teil 2
  Seminar-Einträge verlinken auf die jeweilige Seminarseite (Slugs folgen in Teil 2: moderation-workshops, zeit-effektivitaet, fuehren-mit-zielen, kraft-der-wertschaetzung), Talk-Einträge auf /leistungen/talk. Daten zentral in `src/data/aktuelles.ts` ablegen, vergangene Termine automatisch ausblenden. Die Headline „Führungstraining, das beim Denken anfängt" bleibt.
- Abschnitt **„Wo stehen Sie gerade?" → „Was beschäftigt Sie gerade?"** mit den drei Karten-Fragen:
  1. „Möchten Sie Klarheit darüber gewinnen, wie Sie führen, entscheiden und auf andere wirken?"
  2. „Möchten Sie Zusammenarbeit, Kommunikation und Verantwortung in Ihrem Team neu beleben?"
  3. „Suchen Sie neue Wege, um Führung und Management weiterzuentwickeln?"
- **Trainingsangebote-Orbit:** Mitte „Kundenaufgaben" → **„Trainingskonzept"**. Format „Coaching" → **„Beratungsgespräche"**. Reihenfolge: Individuelle Seminare · Seminare aus dem Praxisangebot · Kreative Workshops · Beratungsgespräche · Event-Training · Intervall-Training · Bedarfsorientierte Trainings. **Der wandernde Punkt soll wie im Original ununterbrochen im Kreis durch alle Formate laufen** (endlos, gleichmäßig; das jeweils erreichte Format kurz hervorheben; bei prefers-reduced-motion statisch). Gilt auch für die Orbit-Instanz auf /leistungen/inhouse.
- Zitat im Über-mich-Teaser: „Das Gespräch ist der entscheidende Weg zum Dialog und zur Wertschätzung." — Erich Grikscheit
- Über-mich-Teaser: Link-Chip „Lecturio-Vortragsreihe" → **„Vorträge"**.
- 90-Minuten-Talk-Teaser: „Offenes Format · 90 Minuten Talk · Kostenlose Teilnahme an regelmäßig stattfindenden Video-Gesprächen zu unterschiedlichen Themen aus der Welt des Managements. Die nächsten Termine werden hier veröffentlicht." – und darunter die drei Talk-Termine aus `aktuelles.ts`.
- Praxisbrief-Teaser: „Alle sechs Wochen ein Denkanstoß".

## 3. Seminarlisten (Startseite, Offene Seminare, Footer-/Mega-Menü, Seitenleisten)
Die Liste „Offene Seminare" (bisher „Die Kunst der Präsentation … Kontroversen, Kritik …") ersetzen durch die Seminare mit Dauer:
Zeit-Horizonte · 3 Tage / Individuelle Rhetorik · 2 Tage / Neue Rolle als Führungskraft · 2 Tage / Moderation · 1 Tag / Kraft der Wertschätzung · 1 Tag / Führung ohne Vorgesetztenfunktion · 2 Tage / Verhandlungsführung · 2 Tage / Macht und Konflikte · 2 Tage
(Die Dauerangaben kommen aus den Seminardaten in Teil 2 – dort ist die verbindliche Dauer je Seminar hinterlegt; bitte die Liste aus den Daten generieren, nicht hart codieren.)

## 4. Leistungen / Offene Seminare / Inhouse
- Karte „Vertriebstraining" → **„Verhandlungstraining"**, Text: „Themen: Unter anderem Führung, Moderation, Gesprächsführung, Rhetorik oder Kundenkommunikation. Sowie individuelle Trainings nach Aufgabenstellung."
- Offene Seminare: H1 **„Offene Seminare in Karben bei Frankfurt"**. Intro: „Die Praxis für Management – Training bietet offene Seminare zu aktuellen Themen an. Das Angebot umfasst die Bereiche Strategie, Führung, Kommunikation, Vertrieb sowie Zeitmanagement."
- „Die drei Themenbereiche" → **„Die vier Themenbereiche"** (überall, auch /seminare, /leistungen, Honorare):
  - **Strategie-Seminare:** Verhandlungstraining, Dialektik, Rhetorik, Motivation, Zeitmanagement, Erfolgsmanagement, Resilienz
  - **Führungs-Seminare:** Grundlagen, Teamführung, Führen mit Zielen, Mitarbeiterführung, Vom Kollegen zur Führungskraft
  - **Kommunikations-Seminare:** Kommunikation verstehen, Dialog und Verstehen, Kommunikation im Change, Business Knigge, Präsentation, Gesprächsführung
  - **Persönlichkeits-Seminare:** Meistern von Rückschlägen, Wege zum Menschenkenner, Train the Trainer, Schlagfertigkeit, Zwischen Ton und Inhalt
  Wo ein Stichwort einem vorhandenen Seminar entspricht, verlinken; sonst reiner Text.
- Hinweis-Satz ersetzen: statt „Ein Termin ist derzeit fest ausgeschrieben …" → **„Eine Reihe von Seminaren sind für 2027 fest ausgeschrieben. Alle weiteren Seminare führe ich als Inhouse-Format durch – den Termin stimmen wir gemeinsam ab."** und darunter Link **„Siehe offene Seminare 2027 Jan. – Mai →"** auf eine neue Übersicht `/seminare/termine` (chronologische Terminliste aller öffentlichen `seminar_termine` aus der DB mit Seminar, Datum, Dauer, Preis, freie Plätze, Link „Anmelden"; SSR, indexierbar, im Seminare-Menü als „Termine & Anmeldung"). Solange für 2027 erst wenige Termine eingetragen sind, oben der Satz „Die Übersicht für 2027 wird laufend ergänzt."
- **Preise / Leistungen im Preis (Honorare-Seite und Seminarseiten):** offene Seminare **598 € für 1 Tag, 985 € für 2 Tage** pro Teilnehmer. „Im Preis enthalten: Seminarleitfaden · Digitale Dokumentation · Seminargetränke. Alle Preise netto, zzgl. MwSt." (Die konkreten Preise je Seminar kommen in Teil 2 und haben Vorrang.)
- **Inhouse stärken:** Auf jeder Seminar-Detailseite ein deutlich sichtbarer Kasten „Auch als Inhouse-Training buchbar – bei Ihnen im Haus, auf Ihre Aufgabe zugeschnitten" mit CTA „Inhouse anfragen" (öffnet das Terminanfrage-Formular mit vorausgewähltem Format „Inhouse"). Auf Seminarkarten ein kleines Badge „auch Inhouse". Auf der Startseite im Leistungen-Block Inhouse als erste/hervorgehobene Karte.
- Leistungen-Übersicht: bleibt „vier Wege" (Offene Seminare, Inhouse-Trainings, Philosophische Beratung, Konzeptentwicklung) – Konzeptentwicklung **inhaltlich unverändert lassen** (wird noch mit dem Kunden besprochen).

## 5. Praxisbrief
- Überall „alle sechs bis acht Wochen" → **„alle sechs Wochen"**. Übersichts-Intro: „Alle sechs Wochen ein interessanter Aufsatz zu einem Begriff, den wir im Alltag benutzen, ohne ihn hinlänglich zu befragen – Ordnung, Vertrauen, Verantwortung, Arbeit u. s. w. Philosophische und psychologische Impulse, aus der Trainingspraxis heraus geschrieben."
- Anmeldeformular: Eyebrow „PRAXISBRIEF", Titel „Alle sechs Wochen ein Denkanstoß", Feldlabel „E-Mail-Adresse", Einwilligung: „Ich stimme dem Versand des elektronischen Praxisbriefs zu und habe die Datenschutzerklärung gelesen." Darunter „Double-Opt-in – Sie erhalten zuerst eine Bestätigungsmail." und ein kleiner Link **„Praxisbrief abbestellen"** (führt zu einem einfachen Abmeldeformular /praxisbrief/abmelden: E-Mail eingeben → Eintrag wird als abgemeldet markiert).
- Die Eyebrow der aktuellen Ausgabe NICHT auf ein Zukunftsdatum setzen – belassen wie ist (Kunde schreibt „Januar 2027", das klären wir).
- Die bisherigen Praxisbrief-Bilder bleiben vorerst; neue einheitliche Illustrationen im Stil der Seminar-Linienzeichnungen folgen (bitte die Bild-Slots so anlegen, dass pro Brief ein Bild über `src/data/praxisbriefe.ts` austauschbar ist, Seitenverhältnis 3:2).

## 6. Über mich / Kontakt
- „Womit ich arbeite": Durchführung von Trainingsmaßnahmen · Entwickeln von Marktkonzepten · Textentwicklungen · persönliche Einzelberatung.
- Kontaktseite unverändert plus Barbara-Grikscheit-Block (s. o.).

Bitte am Ende kurz auflisten, welche Dateien geändert wurden. Teil 2 (neue Seminardaten) folgt direkt danach – bitte noch keine Seminarinhalte umbauen.
