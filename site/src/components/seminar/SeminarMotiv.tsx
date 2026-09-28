import { useInView } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

/**
 * Thematische Szene je Seminar — inline SVG, ausschließlich Designtokens.
 * Animiert beim Sichtbarwerden; bei prefers-reduced-motion sofort im Endzustand.
 */

type Slug =
  | "zeit-horizonte"
  | "praesentation"
  | "praesentation-rhetorik"
  | "rhetorik"
  | "unternehmensethik"
  | "erfahrung-im-management"
  | "freiheit-fuehrung-persoenlichkeit"
  | "konflikte"
  | "einstieg-fuehrungsrolle"
  | "strategisches-denken"
  | "ordnung-denken"
  | "entscheidungskompetenz"
  | "unternehmenskultur"
  | "grundlagen-fuehrung"
  | "moderation";

export const MOTIV_BESCHREIBUNG: Record<string, string> = {
  "zeit-horizonte":
    "Konzentrische Bögen weiten sich von einem tiefen Punkt aus nach außen, eine dünne Linie durchquert sie von links nach rechts — Zeit, die sich zu Horizonten öffnet.",
  praesentation:
    "Drei Rechtecke schieben sich übereinander zu einem Rahmen, darüber öffnet sich ein weicher Lichtkegel wie ein Bühnenscheinwerfer.",
  "praesentation-rhetorik":
    "Derselbe Bühnenrahmen, davor zeichnet sich eine Sprechwelle von links nach rechts und atmet weiter.",
  rhetorik:
    "Eine Wellenlinie verbindet zwei Punkte, ihre Amplitude schwillt an und beruhigt sich; kurze Striche zweigen als Betonungszeichen ab.",
  unternehmensethik:
    "Eine Waage mit zwei Schalen; Gewichte fallen nacheinander hinein, der Balken neigt sich und pendelt sich waagerecht ein.",
  "erfahrung-im-management":
    "Baumringe werden von innen nach außen nacheinander gezeichnet, ein Ring ist in Messing hervorgehoben, ein feiner radialer Schnitt zeigt die Schichten.",
  "freiheit-fuehrung-persoenlichkeit":
    "Ein Gitter senkrechter Stäbe, dessen mittlere Stäbe sich nach außen biegen und eine Öffnung freigeben, durch die Licht breiter wird.",
  konflikte:
    "Vier Pfeile laufen aus den Ecken auf einen Mittelpunkt zu, treffen sich und lösen sich in einen Kreis auf; daneben erscheint eine kleine fünfstufige Eskalationsleiter.",
  "einstieg-fuehrungsrolle":
    "Eine Treppe aus fünf Stufen wird von unten nach oben gezeichnet; ein Punkt steigt auf, oben öffnet sich eine Schwelle in Messing.",
  "strategisches-denken":
    "Aus einem Punkt fächern mehrere Wege auf eine ferne Horizontlinie zu; ein Weg ist in Messing hervorgehoben.",
  "ordnung-denken":
    "Verstreute Punkte finden nacheinander in ein ruhiges Raster; feine Linien verbinden die Reihen.",
  entscheidungskompetenz:
    "Eine Linie läuft auf eine Gabelung zu und teilt sich; der gewählte Ast wird in Messing weitergezogen.",
  unternehmenskultur:
    "Ein Eisberg: über der Wasserlinie eine kleine sichtbare Spitze, darunter zeichnet sich der weitaus größere Körper.",
  "grundlagen-fuehrung":
    "Einzelne Punkte werden nacheinander sichtbar und verbinden sich zu einem Sternbild; eine Linie darin ist in Messing.",
  moderation:
    "Punkte im Kreis werden über Bögen miteinander verbunden; in der Mitte entsteht ein ruhiger Messingpunkt.",
};

const strokeBase = "fill-none stroke-[1.5]";

function Scene({ slug, mini }: { slug: string; mini: boolean }) {
  const d = (ms: number) => (mini ? undefined : { animationDelay: `${ms}ms` });
  const len = (n: number) => ({ ["--m-len" as string]: String(n) });

  switch (slug as Slug) {
    case "zeit-horizonte":
      return (
        <g>
          {[60, 110, 160, 210].map((r, i) => (
            <path
              key={r}
              className={cn(strokeBase, "m-draw stroke-bordeaux-700", i === 2 && "m-widen")}
              style={{ ...len(700), ...d(i * 260) }}
              d={`M ${200 - r} 250 A ${r} ${r} 0 0 1 ${200 + r} 250`}
              opacity={1 - i * 0.18}
            />
          ))}
          <circle className="m-fade fill-brass-600" style={d(300)} cx="200" cy="250" r="5" />
          <path
            className={cn(strokeBase, "m-draw stroke-brass-600")}
            style={{ ...len(400), ...d(1000) }}
            d="M 20 130 H 380"
          />
        </g>
      );

    case "praesentation":
    case "praesentation-rhetorik":
      return (
        <g>
          <path className="m-fade fill-brass-400/25" style={d(900)} d="M 200 20 L 320 210 H 80 Z" />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
              style={{ ...len(760), ...d(i * 240) }}
              x={110 + i * 14}
              y={120 + i * 18}
              width="180"
              height="90"
              rx="6"
            />
          ))}
          <path
            className={cn(strokeBase, "m-draw stroke-ink-500")}
            style={{ ...len(400), ...d(800) }}
            d="M 50 250 H 350"
          />
          {slug === "praesentation-rhetorik" && (
            <path
              className={cn(strokeBase, "m-draw m-breathe stroke-brass-600")}
              style={{ ...len(600), ...d(1200) }}
              d="M 60 275 q 20 -30 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0"
            />
          )}
        </g>
      );

    case "rhetorik":
      return (
        <g>
          <circle className="m-fade fill-bordeaux-700" style={d(0)} cx="40" cy="150" r="8" />
          <circle className="m-fade fill-bordeaux-700" style={d(1200)} cx="360" cy="150" r="8" />
          <path
            className={cn(strokeBase, "m-draw m-breathe stroke-bordeaux-700")}
            style={{ ...len(700), ...d(200) }}
            d="M 56 150 q 22 -55 44 0 t 44 -35 t 44 35 t 44 -55 t 44 55 t 40 0"
          />
          {[120, 180, 240, 300].map((x, i) => (
            <path
              key={x}
              className={cn(strokeBase, "m-draw stroke-brass-600")}
              style={{ ...len(60), ...d(900 + i * 180) }}
              d={`M ${x} 118 V 92`}
            />
          ))}
        </g>
      );

    case "unternehmensethik":
      return (
        <g>
          <path
            className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
            style={{ ...len(200), ...d(0) }}
            d="M 200 90 V 250"
          />
          <path
            className={cn(strokeBase, "m-draw stroke-ink-500")}
            style={{ ...len(120), ...d(200) }}
            d="M 150 250 H 250"
          />
          <g className={cn(!mini && "m-tilt")} style={{ transformOrigin: "200px 90px" }}>
            <path
              className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
              style={{ ...len(260), ...d(200) }}
              d="M 70 90 H 330"
            />
            <path
              className={cn(strokeBase, "m-draw stroke-ink-500")}
              style={{ ...len(180), ...d(500) }}
              d="M 70 90 L 40 140 H 100 Z"
            />
            <path
              className={cn(strokeBase, "m-draw stroke-ink-500")}
              style={{ ...len(180), ...d(650) }}
              d="M 330 90 L 300 140 H 360 Z"
            />
          </g>
          <circle className="m-drop fill-brass-600" style={d(900)} cx="70" cy="122" r="9" />
          <circle className="m-drop fill-brass-400" style={d(1300)} cx="330" cy="122" r="9" />
        </g>
      );

    case "erfahrung-im-management":
      return (
        <g>
          {[26, 52, 78, 104, 130].map((r, i) => (
            <circle
              key={r}
              className={cn(
                strokeBase,
                "m-draw",
                i === 3 ? "stroke-brass-600" : "stroke-bordeaux-700",
              )}
              style={{ ...len(900), ...d(i * 280) }}
              cx="200"
              cy="150"
              r={r}
              opacity={i === 3 ? 1 : 0.8 - i * 0.08}
            />
          ))}
          <path
            className={cn(strokeBase, "m-draw stroke-ink-500")}
            style={{ ...len(160), ...d(1500) }}
            d="M 200 150 L 330 78"
          />
          <circle className="m-fade fill-brass-600" style={d(200)} cx="200" cy="150" r="5" />
        </g>
      );

    case "freiheit-fuehrung-persoenlichkeit":
      return (
        <g>
          <rect
            className="m-fade fill-brass-400/20"
            style={d(1400)}
            x="150"
            y="40"
            width="100"
            height="220"
            rx="50"
          />
          {[40, 75, 110].map((x, i) => (
            <path
              key={x}
              className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
              style={{ ...len(240), ...d(i * 140) }}
              d={`M ${x} 40 V 260`}
            />
          ))}
          <path
            className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
            style={{ ...len(260), ...d(500) }}
            d="M 150 40 C 110 120, 110 180, 150 260"
          />
          <path
            className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
            style={{ ...len(260), ...d(650) }}
            d="M 250 40 C 290 120, 290 180, 250 260"
          />
          {[290, 325, 360].map((x, i) => (
            <path
              key={x}
              className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
              style={{ ...len(240), ...d(i * 140) }}
              d={`M ${x} 40 V 260`}
            />
          ))}
        </g>
      );

    case "einstieg-fuehrungsrolle":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
              style={{ ...len(150), ...d(i * 200) }}
              d={`M ${70 + i * 52} ${250 - i * 38} h 52 v -38`}
            />
          ))}
          <circle
            className={cn("m-fade m-shift fill-brass-600")}
            style={d(1200)}
            cx="120"
            cy="205"
            r="7"
          />
          <path
            className={cn(strokeBase, "m-draw stroke-brass-600")}
            style={{ ...len(120), ...d(1400) }}
            d="M 330 60 v 60"
          />
          <path
            className={cn(strokeBase, "m-draw m-widen stroke-brass-400")}
            style={{ ...len(120), ...d(1600) }}
            d="M 300 62 h 60"
          />
        </g>
      );

    case "strategisches-denken":
      return (
        <g>
          <path
            className={cn(strokeBase, "m-draw stroke-ink-500")}
            style={{ ...len(300), ...d(0) }}
            d="M 40 90 h 320"
          />
          {[
            "M 70 250 C 150 230, 200 170, 340 96",
            "M 70 250 C 160 250, 230 150, 300 92",
            "M 70 250 C 140 210, 160 130, 200 92",
          ].map((path, i) => (
            <path
              key={path}
              className={cn(
                strokeBase,
                "m-draw",
                i === 0 ? "stroke-brass-600" : "stroke-bordeaux-700",
              )}
              style={{ ...len(420), ...d(300 + i * 260) }}
              d={path}
              opacity={i === 0 ? 1 : 0.7}
            />
          ))}
          <circle className="m-fade fill-bordeaux-700" style={d(200)} cx="70" cy="250" r="6" />
          <circle
            className="m-fade m-breathe fill-brass-600"
            style={d(1200)}
            cx="340"
            cy="96"
            r="7"
          />
        </g>
      );

    case "ordnung-denken":
      return (
        <g>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle
                key={`${row}-${col}`}
                className={cn(
                  "m-fade",
                  row === 1 && col === 2 ? "fill-brass-600" : "fill-bordeaux-700",
                )}
                style={d((row * 5 + col) * 80)}
                cx={90 + col * 55}
                cy={80 + row * 50}
                r={row === 1 && col === 2 ? 7 : 5}
                opacity={0.85}
              />
            )),
          )}
          {[0, 1, 2, 3].map((row) => (
            <path
              key={row}
              className={cn(strokeBase, "m-draw stroke-ink-500")}
              style={{ ...len(240), ...d(1400 + row * 160) }}
              d={`M 90 ${80 + row * 50} h 220`}
              opacity={0.45}
            />
          ))}
        </g>
      );

    case "entscheidungskompetenz":
      return (
        <g>
          <path
            className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
            style={{ ...len(180), ...d(0) }}
            d="M 40 150 h 150"
          />
          <path
            className={cn(strokeBase, "m-draw stroke-ink-500")}
            style={{ ...len(220), ...d(500) }}
            d="M 190 150 C 260 150, 280 220, 350 230"
            opacity={0.6}
          />
          <path
            className={cn(strokeBase, "m-draw stroke-brass-600")}
            style={{ ...len(220), ...d(800) }}
            d="M 190 150 C 260 150, 280 80, 350 70"
          />
          <circle className="m-fade fill-bordeaux-700" style={d(400)} cx="190" cy="150" r="7" />
          <circle
            className="m-fade m-breathe fill-brass-600"
            style={d(1300)}
            cx="350"
            cy="70"
            r="8"
          />
        </g>
      );

    case "unternehmenskultur":
      return (
        <g>
          <path
            className={cn(strokeBase, "m-draw stroke-brass-600")}
            style={{ ...len(220), ...d(0) }}
            d="M 165 120 L 200 62 L 240 120 Z"
          />
          <path
            className={cn(strokeBase, "m-draw stroke-ink-500")}
            style={{ ...len(340), ...d(300) }}
            d="M 40 122 h 320"
          />
          <path
            className={cn(strokeBase, "m-draw m-breathe stroke-bordeaux-700")}
            style={{ ...len(700), ...d(600) }}
            d="M 120 124 L 150 210 L 200 262 L 265 205 L 285 124"
          />
          {["M 150 150 h 110", "M 160 180 h 90", "M 175 210 h 60"].map((path, i) => (
            <path
              key={path}
              className={cn(strokeBase, "m-fade stroke-bordeaux-700")}
              style={d(1300 + i * 200)}
              d={path}
              opacity={0.4}
            />
          ))}
        </g>
      );

    case "grundlagen-fuehrung":
      return (
        <g>
          {[
            [70, 210],
            [130, 120],
            [200, 175],
            [265, 80],
            [330, 150],
            [285, 235],
            [180, 255],
          ].map(([x, y], i) => (
            <circle
              key={`${x}-${y}`}
              className={cn("m-fade", i === 3 ? "fill-brass-600" : "fill-bordeaux-700")}
              style={d(i * 170)}
              cx={x}
              cy={y}
              r={i === 3 ? 8 : 5.5}
            />
          ))}
          {[
            { d: "M 70 210 L 130 120", brass: false },
            { d: "M 130 120 L 200 175", brass: false },
            { d: "M 200 175 L 265 80", brass: true },
            { d: "M 265 80 L 330 150", brass: true },
            { d: "M 330 150 L 285 235", brass: false },
            { d: "M 285 235 L 180 255", brass: false },
            { d: "M 180 255 L 70 210", brass: false },
            { d: "M 200 175 L 285 235", brass: false },
          ].map((l, i) => (
            <path
              key={l.d}
              className={cn(
                strokeBase,
                "m-draw",
                l.brass ? "stroke-brass-600" : "stroke-bordeaux-700",
              )}
              style={{ ...len(200), ...d(1000 + i * 150) }}
              d={l.d}
              opacity={l.brass ? 1 : 0.55}
            />
          ))}
        </g>
      );

    case "moderation":
      return (
        <g>
          {[0, 60, 120, 180, 240, 300].map((a, i) => {
            const x = Math.round((200 + 105 * Math.cos((a * Math.PI) / 180)) * 100) / 100;
            const y = Math.round((150 + 90 * Math.sin((a * Math.PI) / 180)) * 100) / 100;
            return (
              <g key={a}>
                <circle
                  className="m-fade fill-bordeaux-700"
                  style={d(i * 160)}
                  cx={x}
                  cy={y}
                  r="8"
                />
                <path
                  className={cn(strokeBase, "m-draw stroke-ink-500")}
                  style={{ ...len(160), ...d(900 + i * 150) }}
                  d={`M ${x} ${y} L 200 150`}
                  opacity={0.45}
                />
              </g>
            );
          })}
          <circle
            className={cn(strokeBase, "m-draw m-breathe stroke-brass-600")}
            style={{ ...len(180), ...d(1600) }}
            cx="200"
            cy="150"
            r="26"
          />
          <circle className="m-fade fill-brass-600" style={d(1800)} cx="200" cy="150" r="6" />
        </g>
      );

    case "konflikte":
    default:
      return (
        <g>
          {[
            "M 40 40 L 140 120",
            "M 260 40 L 160 120",
            "M 40 240 L 140 180",
            "M 260 240 L 160 180",
          ].map((path, i) => (
            <path
              key={path}
              className={cn(strokeBase, "m-draw stroke-bordeaux-700")}
              style={{ ...len(180), ...d(i * 200) }}
              d={path}
            />
          ))}
          <circle
            className={cn(strokeBase, "m-draw m-widen stroke-brass-600")}
            style={{ ...len(220), ...d(1000) }}
            cx="150"
            cy="150"
            r="34"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              className={cn(strokeBase, "m-fade stroke-ink-500")}
              style={d(1300 + i * 160)}
              d={`M ${300 + i * 16} ${250 - i * 34} h 20`}
            />
          ))}
          <path
            className={cn(strokeBase, "m-draw stroke-brass-600")}
            style={{ ...len(220), ...d(1300) }}
            d="M 296 254 L 372 90"
          />
        </g>
      );
  }
}

export function SeminarMotiv({
  seminar,
  mini = false,
  className,
}: {
  seminar: string;
  mini?: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const beschreibung = MOTIV_BESCHREIBUNG[seminar] ?? MOTIV_BESCHREIBUNG["konflikte"];

  if (mini) {
    return (
      <svg
        viewBox="0 0 400 300"
        aria-hidden="true"
        focusable="false"
        className={cn("motiv is-in text-bordeaux-700", className)}
      >
        <Scene slug={seminar} mini />
      </svg>
    );
  }

  return (
    <figure ref={ref} className={cn("m-0", className)}>
      <div
        className={cn(
          "motiv aspect-[4/3] w-full rounded-lg border border-ink-200 bg-ink-100",
          inView && "is-in",
        )}
      >
        <svg viewBox="0 0 400 300" aria-hidden="true" focusable="false" className="size-full">
          <Scene slug={seminar} mini={false} />
        </svg>
      </div>
      <figcaption className="sr-only">{beschreibung}</figcaption>
    </figure>
  );
}
