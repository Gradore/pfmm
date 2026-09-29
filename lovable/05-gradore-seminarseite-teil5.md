# Teil 5: Gradore-Seminarseite `/kooperation/ki-fuehrung` zum Hauptangebot ausbauen

Stand 29.09.2026. Prompt für das Lovable-Projekt 8ce6f97e-6acd-4673-a4d8-6c0f2c5fd132.

## Entscheidungen des Betreibers (gelten vor allem anderen, bitte nicht nachfragen)
- **Preise:** Regulärer Preis **1.490 € netto** pro Person; **Einführungspreis 1.190 € netto** pro Person für die ersten vier verbindlich gebuchten Plätze je Standort; **Inhouse ab 8.900 € netto** für bis zu 12 Personen. Der bisherige Einzelpreis 1.290 € entfällt komplett (auch aus `src/data/ki-fuehrung.ts`, JSON-LD, `llms.txt`/`llms-full.txt`, Formularen). Preise zentral als Konstanten definieren, nirgends hartkodieren. Alle Preise sind **netto, zzgl. gesetzlicher Umsatzsteuer** (Betreiber hat „netto“ bestätigt). Der Zusatz `preisHinweis` wird entsprechend befüllt.
- **Sichtbarkeit:** Die Seite wird jetzt **öffentlich**: `noindex,nofollow` entfernen, selbstreferenzieller Canonical `https://pfmm.de/kooperation/ki-fuehrung`, absolute og:url/og:image auf pfmm.de, in `sitemap.xml` aufnehmen (nie `ppfm.gradore.de`), in `llms.txt` und `llms-full.txt` aufnehmen, verlinken von Seminarübersicht, Leistungsübersicht und vom 90-Minuten-Talk (und Talk-Seite verlinkt zurück auf das Seminarangebot). Das bisherige Verbot, die Seite zu verlinken, gilt nicht mehr.
- **Impressum:** Es gilt das PFMM-Impressum (Seite verlinkt darauf). Keine Gradore-Firmendaten erfinden.
- **Bilder:** Auf dieser Seite das vorhandene Porträtfoto von Erich Grikscheit und das Logo der aktuellen Website (PFMM) verwenden (bestehende Projekt-Assets). Dazu ein sichtbarer Link zu Gradore: **https://gradore.de** (`rel="noopener"`, mit Linktext „Gradore“). Kein erfundenes Gradore-Logo, keine erfundenen Trainerfotos oder Trainernamen.
- Matomo-Thema bitte ignorieren, nichts daran ändern.

## Auftrag
Optimiere die bestehende Seite „https://pfmm.de/kooperation/ki-fuehrung“ im vorhandenen Lovable-Projekt. Setze die Änderungen im Code um. Prüfe zuerst die vorhandenen Komponenten, Formulare, Routen und Projektanweisungen. Erhalte das bestehende Designsystem und die funktionierenden Formularanbindungen.

### Ziel
Aus den derzeit vier gleichrangigen KI-Seminaren soll ein klar kaufbares Hauptangebot werden, mit Karben und Rostock als Seminarstandorten. Die Kooperation zwischen PFMM und Gradore soll erkennbar sein: Erich Grikscheit vermittelt Führung, Urteilskraft und Gesprächsführung; Gradore vermittelt praktische KI-Anwendung und die Umsetzung in Arbeitsprozessen.

Die Seite soll Geschäftsführung, Personalentwicklung und Führungskräfte im Mittelstand ansprechen. Schreibe konkret, verständlich und ohne allgemeine KI-Werbesprache.

### Hauptangebot und Seiteninhalt
Titel (H1): „KI im Führungsalltag: klare Entscheidungen, sichere Teamregeln und wirksame Prozesse“

Untertitel: „Das zweitägige Praxisseminar für Führungskräfte. Arbeiten Sie an eigenen Anwendungsfällen und entwickeln Sie einen umsetzbaren Plan für Ihr Team – gemeinsam mit PFMM und Gradore.“

Zeige gleich im ersten Bildschirm:
- 2 Tage, in Präsenz in Karben oder Rostock
- höchstens 12 Teilnehmende pro Termin
- zwei Perspektiven: erfahrenes Führungstraining und praktische KI-Anwendung
- regulärer Preis: 1.490 € netto pro Person
- Einführungspreis für die ersten vier verbindlich gebuchten Plätze je Standort: 1.190 € netto pro Person
- Haupt-CTA: „Seminarplatz anfragen“

Gestalte zwei gleichwertige Standortkarten „Karben“ und „Rostock“. Ein Klick übernimmt den Standort in das bestehende Anfrageformular. Termine sind noch nicht bestätigt: Erfinde keine Daten, zeige keine künstliche Verknappung und behaupte keine verfügbaren Plätze ohne echte Buchungsdaten. Der Einführungspreis wird erst bei einer bestätigten Buchung verbindlich zugeteilt.

### Das versprochene Ergebnis
Stelle über dem Tagesprogramm drei greifbare Ergebnisse dar:
1. Ein Prüfraster: Welche KI-Ergebnisse können genutzt werden, und wer trifft die endgültige Entscheidung?
2. Teamregeln für den sicheren und transparenten KI-Einsatz.
3. Priorisierte Anwendungsfälle und ein 90-Tage-Plan für einen Pilotversuch mit Verantwortlichen und Messgrößen.

Tag 1 – Verstehen und entscheiden: KI an typischen Führungsaufgaben praktisch ausprobieren; Qualität und Grenzen von Ergebnissen prüfen; sensible Informationen und Datenschutz im Alltag behandeln; menschliche Verantwortung, Vier-Augen-Prinzip und Kommunikation im Team klären.

Tag 2 – Im eigenen Bereich umsetzen: Anwendungsfälle der Teilnehmenden bewerten; geeignete Pilotprojekte auswählen; Rollen und Teamregeln festlegen; den 90-Tage-Plan erarbeiten und vorstellen.

Enthalten sind Arbeitsvorlagen und ein gemeinsamer Online-Nachtermin etwa 30 Tage später. Formuliere keine Garantie für Einsparungen, Rechtssicherheit oder einen bestimmten Projekterfolg.

Die bisherigen Themen „Vertrauen im KI-gestützten Team“, „KI im Wandel führen“ und „Denken mit Maschinen“ sollen als buchbare Vertiefungen oder Inhouse-Schwerpunkte unter dem Hauptangebot erscheinen. Behalte ihre vorhandenen Inhalte, soweit sie fachlich passen; präsentiere sie nicht mehr als vier konkurrierende Hauptprodukte.

### Preise und Anfrage
Zeige eine übersichtliche Preisbox für offene Termine:
- Einführungspreis: 1.190 € netto pro Person, maximal vier bestätigte Plätze je Standort
- Regulärer Preis: 1.490 € netto pro Person
- Enthalten: zwei Seminartage, Arbeitsmaterial, Verpflegung und Online-Nachtermin

Ergänze eine zweite Box: Inhouse-Seminar ab 8.900 € netto für bis zu zwölf Personen, zwei Tage, mit Anpassung an die Anwendungsfälle des Unternehmens. Reise-, Raum- und Verpflegungskosten sind im Inhouse-Preis nicht enthalten und werden im Angebot gesondert ausgewiesen (so transparent darstellen; der Betreiber prüft die Formulierung). Preise überall als „netto, zzgl. gesetzlicher Umsatzsteuer“ kennzeichnen.

Im Formular sollen Interessierte Karben, Rostock oder Inhouse auswählen können. Der gewählte Standort und das gewählte Format müssen zuverlässig mit der Anfrage übertragen werden (im Verwaltungsbereich sichtbar, Herkunft „Gradore KI-Seminar“ beibehalten). Solange keine verbindliche Online-Buchung mit bestätigten Terminen, verfügbaren Plätzen und Buchungsbedingungen existiert, verwende überall „Anfragen“ statt „Jetzt buchen“. Zeige nach dem Absenden eine klare Bestätigung und verhindere doppelte Übermittlungen.

Binde den bereits angekündigten kostenlosen 90-Minuten-Talk als Einstieg ein und führe von dort sichtbar zum Seminarangebot.

### Vertrauen und fachliche Genauigkeit
Stelle beide Referenten beziehungsweise Organisationen mit überprüfbaren Kompetenzen vor (nur belegte Angaben aus dem Projekt; für Gradore nur, was bereits im Projekt oder in den Konzeptdokumenten steht, sonst neutral „Gradore – praktische KI-Anwendung in Arbeitsprozessen“). Erfinde weder Namen für Gradore-Trainer noch Zertifikate, Kundenstimmen oder Referenzen. Formuliere den Hinweis zur KI-Verordnung vorsichtig und aktuell: Das Seminar unterstützt den Aufbau praktischer KI-Kompetenz, ist aber kein pauschaler Nachweis einer vollständigen Erfüllung des EU AI Act. Entferne veraltete oder unbelegte Pflichtkurs-Behauptungen.

### Auffindbarkeit und Technik
Setze einen selbstreferenziellen Canonical-Link und absolute Open-Graph-URLs auf „https://pfmm.de/kooperation/ki-fuehrung“ (siehe Entscheidungen oben: noindex entfernen, Sitemap, Links). Nutze strukturierte Daten nur für belegte Angaben: `Course` mit `provider` (PFMM und Gradore), `offers` (1.490 € regulär und 1.190 € Einführungspreis, jeweils netto, mit `valueAddedTaxIncluded: false`), `FAQPage` nur bei sichtbaren FAQs, `BreadcrumbList`. Erzeuge keine „Event“-Daten mit erfundenen Terminen. Achte auf mobile Lesbarkeit, Tastaturbedienung, verständliche Formularbeschriftungen und schnelle Ladezeiten.

### Abschluss
Prüfe das Formular mit beiden Standorten und der Inhouse-Auswahl, die Preisdarstellung, alle internen Links, Metadaten und die mobile Ansicht. Führe die vorhandenen Build- und Testbefehle aus. Berichte anschließend knapp, welche Dateien du geändert hast, was getestet wurde und welche Angaben vor Veröffentlichung noch vom Betreiber bestätigt werden müssen. Verändere keine anderen Seminarpreise oder Rechtstexte ohne konkreten Bezug zu diesem Angebot.
