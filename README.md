# pfmm.de — Relaunch

Neubau der Website **Praxis für Marketing & Motivation** (Erich Grikscheit, Karben bei Frankfurt).

Der Aufbau erfolgt in **Lovable** — dieses Repository hält die Quellinhalte, das
Konzept und die eingesetzten Build-Anweisungen fest.

## Lovable-Projekt

| | |
|---|---|
| Projekt | PFMM.de |
| Projekt-ID | `8ce6f97e-6acd-4673-a4d8-6c0f2c5fd132` |
| Editor | https://lovable.dev/projects/8ce6f97e-6acd-4673-a4d8-6c0f2c5fd132 |
| Vorschau | https://id-preview--8ce6f97e-6acd-4673-a4d8-6c0f2c5fd132.lovable.app |
| Stack | React · TypeScript · Tailwind · shadcn/ui |

## Positionierung

> Führungstraining, das beim Denken anfängt.

25 Jahre Vertriebs- und Marketingpraxis, langjähriges philosophisches Studium und
eine Ausbildung in Individualpsychologie — das ist das Unterscheidungsmerkmal
gegenüber austauschbaren Trainingsanbietern im Raum Frankfurt.

## Verzeichnisse

```
docs/     Vollständige Inhaltserfassung des Bestands + Redesign-Konzept
lovable/  Die an den Lovable-Agenten gesendeten Build-Anweisungen (chronologisch)
```

## Design-System (Kurzfassung)

| Rolle | HEX | Einsatz |
|---|---|---|
| Bordeaux 600 | `#A81F39` | Marke (unverändert übernommen) |
| Bordeaux 900 | `#5E0A28` | Überschriften auf hellem Grund, Fußzeile |
| Bordeaux 700 | `#8A0F3A` | Vollflächige Sektionen |
| Messing 600 | `#8A6624` | **alle** Handlungsaufforderungen |
| Messing 700 | `#6E5019` | CTA-Hover, Textlinks |
| Umbra 900 | `#3D2510` | drittes Segment |
| Tinte 700 | `#3D3936` | Fließtext |
| Tinte 100 | `#F2EFEB` | alternierende Sektionen |

Reinrot `#FF0000` entfällt ersatzlos. Schriften: **Lora** (Überschriften, Zitate)
und **Inter** (Fließtext), lokal gehostet — kein Google-Fonts-CDN.

## Kernentscheidungen

- **Mobile first.** Feste Aktionsleiste unten (Anrufen · Erstgespräch) und ein
  Off-Canvas-Menü mit Fokusfalle — der Bestand hat auf dem Smartphone gar keine
  Navigation.
- **Trainingsangebote als Animation.** Das statische Diagramm der alten Seite
  wird zur animierten Komponente `TrainingsangeboteOrbit`: sieben Formate um den
  Mittelpunkt „Kundenaufgaben", auf Mobilgeräten als vertikale Spine.
- **Messing statt Rot für Buttons.** Dadurch ist auf jeder Seite eindeutig, was
  anklickbar ist.
- **Praxisbriefe als HTML.** Acht Fachaufsätze, bisher nur als PDF versteckt,
  werden indexierbare Artikel — das PDF bleibt als Download erhalten.
- **Keine erfundenen Belege.** Teilnehmerstimmen erscheinen als klar markierte
  Platzhalter, bis echte Zitate vorliegen.

## Offene Punkte vor dem Livegang

- Bilder liegen derzeit als Verweise auf `www.pfmm.de` — vor dem Launch durch
  lokale, optimierte WebP-Dateien ersetzen
- Kontaktformular und Praxisbrief-Anmeldung brauchen ein Backend
  (Double-Opt-in, Spamschutz, Bestätigungsmail)
- Consent-Banner, Matomo-Umzug, Security-Header
- Rechtstexte (Impressum, Datenschutz) anwaltlich prüfen lassen — TMG-Verweise
  sind seit Mai 2024 durch das DDG abgelöst
- 301-Weiterleitungen der alten `.php`-URLs, PDF-Pfade müssen erreichbar bleiben
