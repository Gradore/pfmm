import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

const title = "Philosophische Beratung für Führungskräfte | Grikscheit";
const description =
  "Individuelle Einzelgespräche für Führungskräfte: philosophische Beratung, die auf Verstehen aufbaut — vertraulich, ruhig und grundsätzlich, in Karben bei Frankfurt.";

export const Route = createFileRoute("/leistungen/beratung")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/beratung" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/beratung" }],
  }),
  component: Page,
});

const FUER_WEN = [
  "Führungskräfte, die an einem Punkt stehen, an dem Technik nicht weiterhilft",
  "Menschen, die eine Entscheidung von Grund auf durchdenken wollen",
  "Wer eine bessere Frage sucht statt einer schnellen Antwort",
];

const ABLAUF = [
  {
    heading: "Ort",
    text: "In meiner Praxis in Karben bei Frankfurt, bei Ihnen im Haus oder an einem neutralen Ort. Auf Wunsch auch im Gehen.",
  },
  {
    heading: "Dauer",
    text: "Ein Gespräch dauert in der Regel neunzig Minuten. Ob es bei einem bleibt oder eine Reihe daraus wird, entscheiden Sie nach dem ersten Termin.",
  },
  {
    heading: "Vertraulichkeit",
    text: "Alles, was besprochen wird, bleibt zwischen uns — auch dann, wenn ein Unternehmen das Gespräch veranlasst hat. Ich berichte an niemanden.",
  },
];

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Leistungen", to: "/leistungen" }, { label: "Philosophische Beratung" }]}
        eyebrow="Beratung"
        title="Philosophische Beratung — individuelle Einzelgespräche"
      />

      <div className="container-page section-y">
        <Reveal>
          <div className="max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
            <p>
              Bei einem individuellen Gespräch kommt es in erster Linie darauf an, dass eine
              intensive Wechselbeziehung entsteht.
            </p>
            <p className="mt-6">
              Für mich als Gesprächspartner ist es wichtig, die Äußerungen meines Gesprächspartners
              in einen inneren Zusammenhang zu bringen. Deshalb baut meine philosophische Beratung
              auf Verstehen auf. Das bedeutet, die Motive und Gedanken meiner Klienten näher
              kennenzulernen. Oder wie lassen sich Geschichten, Argumente und Vergleiche, die mein
              Gesprächspartner vorträgt, durch andere Gesichtspunkte hinterfragen oder neu bewerten.
            </p>
            <p className="mt-6">
              Und: Wie lassen sich Gedanken aus möglichen Widersprüchen ableiten.
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <blockquote className="mt-12 max-w-[60ch] border-l-2 border-brass-600 pl-7">
            <p className="quote-text text-[26px] text-bordeaux-900 italic">
              „Neue Gedanken sollen ermutigen und neue Perspektiven eröffnen.“
            </p>
          </blockquote>
        </Reveal>

        <section className="mt-20" aria-labelledby="fuer-wen-title">
          <Reveal>
            <h2 id="fuer-wen-title" className="h2-display">
              Für wen
            </h2>
            <ul role="list" className="mt-6 max-w-[68ch] space-y-4">
              {FUER_WEN.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[18px] text-ink-700">
                  <span aria-hidden="true" className="mt-1 font-semibold text-brass-700">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-20" aria-labelledby="ablauf-title">
          <Reveal>
            <h2 id="ablauf-title" className="h2-display">
              Wie ein Gespräch abläuft
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ABLAUF.map((a, i) => (
              <Reveal key={a.heading} delay={i * 90}>
                <article className="h-full rounded-lg border border-ink-200 bg-card p-7 shadow-soft">
                  <h3 className="font-sans text-[19px] font-semibold text-ink-900">{a.heading}</h3>
                  <p className="mt-3 text-ink-700">{a.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand text="Sie möchten ein Gespräch führen? Dreißig Minuten zum Kennenlernen, kostenlos und unverbindlich." />
      </div>
    </>
  );
}
