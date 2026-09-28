# Praxisbriefe – Bildkonzept und Prompt

Anlass: Kundenhinweis Folie 55 – „Bilder möglicherweise in einem Look wie die Zeichnungen und Symbole bei den
Seminaren" und To-do „Bilder neu / einheitliches Konzept / minimalistischer".

## Konzept: „Ein Gedanke – eine Linie"

Jeder Praxisbrief bekommt **ein Symbol, gezeichnet aus einer einzigen durchgehenden Linie**. Das Bild illustriert
nicht das Thema als Szene, sondern den **Kerngedanken des Aufsatzes** – das, worauf der Brief hinauswill.
So passen die Bilder zu den animierten Linien-Motiven der Seminarseiten und bilden eine erkennbare Serie.

| Regel | Festlegung |
|---|---|
| Stil | Eine durchgehende Linie (One-Line-Drawing), ruhig, von Hand wirkend, keine Schraffur, keine Verläufe |
| Farben | Linie Bordeaux `#A81F39` auf warmem Papierweiß `#F2EFEB`; **ein** kleiner Akzent in Messing `#8A6624` genau dort, wo der Gedanke „ankommt" |
| Fläche | 60–70 % Leerraum, Motiv leicht aus der Mitte versetzt (rechts), links Platz für Überschriften |
| Format | 3:2 (z. B. 1800 × 1200 px), WebP |
| Verboten | Text, Buchstaben, Logos, Gesichter, Fotos, Stockfoto-Anmutung, 3D, Schatten |
| Wiedererkennung | Linie beginnt immer am linken unteren Bildrand und endet im Messing-Punkt |

## Motive je Praxisbrief

| Praxisbrief | Kerngedanke | Motiv |
|---|---|---|
| **Ordnung** | Ordnung entsteht von innen, nicht durch Zwang | Eine Linie, die links als lose Schleifen beginnt und sich nach rechts zu einem ruhigen, gleichmäßigen Muster ordnet; Messing-Punkt im ersten „geordneten" Feld |
| **Arbeit** | Arbeit als Ausdruck des Bewusstseins | Eine Hand, deren Umrisslinie in eine Gefäßform (Schale) übergeht – das Werk entsteht aus der Hand; Messing-Punkt im Inneren der Schale |
| **Vertrauen** | Vertrauen ist eine Brücke, die beide Seiten tragen | Zwei Linien wachsen von links und rechts zu einem Brückenbogen zusammen; Schlussstein in Messing |
| **Verantwortung – Erfahrung – Urteil** | Urteil wächst aus Erfahrung und führt zur Verantwortung | Ein Pfad aus drei Trittsteinen, der in eine ausbalancierte Waage mündet; Messing-Punkt am Drehpunkt der Waage |
| **Den Blick neu überdenken – Sehen als Lebenspraxis** | Sehen ist ein Akt des Erkennens | Umriss eines Auges, dessen Iris ein Horizont mit aufgehender Sonne ist; Sonne in Messing |
| **Das Wesentliche – Die Geschichte des Ichs** | Vom äußeren Rahmen zum selbstbestimmten Ich | Eine Spirale, die außen eckig (Rahmen) beginnt und nach innen rund wird, im Zentrum ein Profil-Umriss; Messing-Punkt im Zentrum |
| **Wertschätzung und Tradition / Unternehmen + Marke** | Tradition prägt das Bild im Kopf des Kunden | Jahresringe eines Baumstamms, deren äußerer Ring in ein Siegel/Markenzeichen ohne Schrift übergeht; Messing im Siegel |
| **Wertschätzung** | Wertschätzung heißt, den anderen wirklich wahrzunehmen | Zwei offene Hände, die sich einander zuwenden, ohne sich zu berühren; zwischen ihnen ein Messing-Punkt |

## Prompt für eine Bild-KI

Getestet formuliert für Midjourney / Ideogram / Firefly / DALL·E; für jedes Bild einzeln ausführen und nur die
Zeile „Motiv" austauschen. Bei Midjourney `--ar 3:2 --style raw --no text, letters, face, photo, shadow` anhängen.

```
Minimalist editorial illustration for a German philosophy-and-leadership essay series called "Praxisbrief".
Style: a single continuous hand-drawn line (one-line drawing), fine even stroke, deep bordeaux red #A81F39
on warm off-white paper #F2EFEB, generous negative space (60–70 % empty), motif placed slightly right of centre,
the line starts at the lower left edge and ends in one small solid dot in muted brass gold #8A6624.
No text, no letters, no logos, no faces, no photo, no 3D, no shading, no gradients, no background texture
except subtle paper grain. Calm, intellectual, timeless, consistent series look. Aspect ratio 3:2.

Series – create one image per essay, same style for all:
1. "Ordnung" – loose loops on the left gradually become a calm, regular pattern on the right; brass dot in the first ordered cell.
2. "Arbeit" – the outline of a working hand flowing into the shape of a bowl; brass dot inside the bowl.
3. "Vertrauen" – two lines growing from left and right into one bridge arch; the keystone is the brass dot.
4. "Verantwortung – Erfahrung – Urteil" – a path of three stepping stones leading into a balanced scale; brass dot at the pivot.
5. "Den Blick neu überdenken – Sehen als Lebenspraxis" – outline of an eye whose iris is a horizon with a rising sun; the sun is the brass dot.
6. "Das Wesentliche – Die Geschichte des Ichs" – a spiral that starts angular on the outside and becomes round towards the centre, ending in a small human profile; brass dot at the centre.
7. "Wertschätzung und Tradition / Unternehmen + Marke" – tree rings whose outermost ring turns into a simple seal without lettering; brass dot in the seal.
8. "Wertschätzung" – two open hands turning towards each other without touching; a brass dot floating between them.
```

## Umsetzung auf der Website

- Bilder als `/images/praxisbriefe/<slug>.webp` (Slugs: ordnung, arbeit, vertrauen, verantwortung-erfahrung-urteil,
  sehen-als-lebenspraxis, die-geschichte-des-ichs, wertschaetzung-und-tradition, wertschaetzung).
- Austausch über `src/data/praxisbriefe.ts` (Bild-Slot ist vorbereitet, 3:2).
- Alternativ ohne Bild-KI: dieselben Motive als SVG-Linienanimation wie bei den Seminaren (die Linie zeichnet sich
  beim Scrollen) – dann ist die Serie garantiert einheitlich und gestochen scharf.
