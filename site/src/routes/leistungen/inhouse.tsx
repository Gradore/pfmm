import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { ProzessTimeline } from "@/components/site/ProzessTimeline";
import { Reveal } from "@/components/site/Reveal";
import { TrainingsangeboteOrbit } from "@/components/site/TrainingsangeboteOrbit";

const title = "Inhouse-Trainings — maßgeschneidert | Erich Grikscheit";
const description =
  "Maßgeschneiderte Inhouse-Trainings zu Führung, Konflikten, Gesprächsführung und Zeitmanagement — entwickelt nach Vorgespräch und Einzelinterviews, nicht von der Stange.";

export const Route = createFileRoute("/leistungen/inhouse")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/inhouse" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/inhouse" }],
  }),
  component: Page,
});

const THEMEN = [
  {
    title: "Führungstraining",
    items: [
      "Motivationstraining",
      "Strategisches Denken",
      "Philosophie als Weg im Umgang mit Mitarbeitern",
      "Ethik und Werte in der Führungsarbeit",
    ],
  },
  {
    title: "Konflikttraining",
    items: ["Schuld oder Ermutigung", "Macht und Kontrolle", "Widerstände überwinden"],
  },
  {
    title: "Gesprächsführung",
    items: ["Philosophie eines Gespräches", "Sprache und Verstehen", "Ethik des Gesprächs"],
  },
  {
    title: "Zeitmanagement",
    items: ["Zeit und Sinn", "Zeit und Effektivität", "Zeit und Gewohnheiten", "Zeit und Vorsätze"],
  },
];

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Leistungen", to: "/leistungen" }, { label: "Inhouse-Trainings" }]}
        eyebrow="Inhouse"
        title="Inhouse-Trainings — maßgeschneidert statt von der Stange"
        lead="Nach Absprache mit dem Auftraggeber entwickle ich maßgeschneiderte Trainings. Die einzelnen Schrittfolgen werden gezielt zu einem Gesamtkonzept zusammengefügt."
      />

      <div className="container-page section-y">
        <section aria-labelledby="orbit-title">
          <Reveal>
            <h2 id="orbit-title" className="h2-display">
              Wie wir zusammenarbeiten können
            </h2>
            <p className="lead-text mt-3 max-w-[68ch] text-ink-700">
              Sieben Formate — ein Ausgangspunkt: Ihre Aufgabe.
            </p>
          </Reveal>
          <div className="mt-12">
            <TrainingsangeboteOrbit />
          </div>
        </section>

        <section className="mt-20" aria-labelledby="themen-title">
          <Reveal>
            <h2 id="themen-title" className="h2-display">
              Themenbereiche aus der Praxis
            </h2>
          </Reveal>
          <ul role="list" className="mt-10 grid gap-6 md:grid-cols-2">
            {THEMEN.map((t, i) => (
              <Reveal as="li" key={t.title} delay={(i % 2) * 90}>
                <article className="h-full rounded-lg border border-ink-200 bg-card p-7 shadow-soft">
                  <h3 className="font-serif text-[23px] font-semibold text-bordeaux-900">
                    {t.title}
                  </h3>
                  <ul role="list" className="mt-4 space-y-2">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-ink-700">
                        <span
                          aria-hidden="true"
                          className="mt-2 block size-1.5 shrink-0 rounded-full bg-brass-600"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <p className="mt-8 max-w-[68ch] text-[16px] text-ink-500">
              Die Beispiele sind nur einige Themenbereiche, wie sie in den letzten Jahren nach
              Wünschen der Kunden als Trainingseinheiten zusammengestellt worden sind. Dabei werden
              die einzelnen Themenbereiche gegliedert und als Trainingskonzept zu einem Ganzen
              zusammengefügt.
            </p>
          </Reveal>
        </section>

        <section className="mt-20" aria-labelledby="ablauf-title">
          <Reveal>
            <h2 id="ablauf-title" className="h2-display">
              In fünf Schritten zum Training
            </h2>
            <p className="mt-4 max-w-[68ch] text-ink-700">
              Ein Inhouse-Training beginnt nicht mit einem Termin, sondern mit dem Zuhören.
            </p>
          </Reveal>
          <ProzessTimeline />
        </section>

        <CtaBand text="Sie haben eine konkrete Aufgabe im Haus? Dreißig Minuten Gespräch, kostenlos und unverbindlich." />
      </div>
    </>
  );
}
