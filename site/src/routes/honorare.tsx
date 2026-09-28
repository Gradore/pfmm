import { createFileRoute, Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { HONORARE, HONORAR_INKLUSIVE, STORNO } from "@/data/honorare";

const title = "Honorare — Seminare, Einzel- und Inhouse-Training | Grikscheit";
const description =
  "Honorare nach Format und Dauer: Online-Training ab 395 €, Einzeltraining ab 598 €, Inhouse-Training ab 395 € pro Teilnehmer. Alle Beträge zzgl. gesetzl. MwSt.";

export const Route = createFileRoute("/honorare")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/honorare" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/honorare" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Honorare" }]}
        eyebrow="Übersicht"
        title="Honorare"
        lead="Die Honorare richten sich nach Format und Dauer, nicht nach Thema. Alle Beträge verstehen sich zuzüglich gesetzlicher Mehrwertsteuer."
      />

      <div className="container-page section-y">
        <section aria-labelledby="tabelle-title">
          <div className="mb-12 border-l-4 border-brass-600 bg-ink-100 p-6">
            <h2 className="h3-display">Offene Seminare</h2>
            <p className="mt-3 text-ink-700">598 € für 1 Tag, 985 € für 2 Tage pro Teilnehmer.</p>
            <p className="mt-2 text-ink-700">Im Preis enthalten: Seminarleitfaden · Digitale Dokumentation · Seminargetränke. Alle Preise netto, zzgl. MwSt.</p>
          </div>
          <Reveal>
            <h2 id="tabelle-title" className="h2-display">
              Formate und Honorare
            </h2>
          </Reveal>

          {/* Tabelle ab 768 px */}
          <Reveal delay={80}>
            <div className="mt-8 hidden overflow-hidden rounded-lg border border-ink-200 md:block">
              <table className="w-full border-collapse text-left text-[17px]">
                <caption className="sr-only">
                  Honorare nach Format und Dauer, jeweils zuzüglich gesetzlicher Mehrwertsteuer
                </caption>
                <thead className="bg-ink-100">
                  <tr>
                    <th scope="col" className="p-4 font-semibold text-ink-900">
                      Format
                    </th>
                    <th scope="col" className="p-4 font-semibold text-ink-900">
                      Dauer
                    </th>
                    <th scope="col" className="p-4 text-right font-semibold text-ink-900">
                      Honorar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {HONORARE.map((z) => (
                    <tr key={`${z.format}-${z.dauer}`} className="border-t border-ink-200">
                      <th scope="row" className="p-4 font-normal text-ink-700">
                        {z.format}
                      </th>
                      <td className="p-4 text-ink-700">{z.dauer}</td>
                      <td className="p-4 text-right font-semibold text-bordeaux-900">
                        {z.honorar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Karten unter 768 px */}
          <ul role="list" className="mt-8 grid gap-4 md:hidden">
            {HONORARE.map((z, i) => (
              <Reveal as="li" key={`${z.format}-${z.dauer}`} delay={i * 50}>
                <div className="rounded-lg border border-ink-200 bg-card p-5">
                  <p className="text-[17px] font-semibold text-ink-900">{z.format}</p>
                  <p className="mt-1 text-[16px] text-ink-500">{z.dauer}</p>
                  <p className="mt-3 font-serif text-[22px] font-semibold text-bordeaux-900">
                    {z.honorar}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="mt-6 max-w-[68ch] space-y-3 text-[17px] leading-[1.65] text-ink-700">
              <p>Alle Beträge zzgl. gesetzl. MwSt.</p>
              <p>
                Die individuelle Anpassung eines Trainings wird mit dem Auftraggeber abgestimmt; der
                Zeitaufwand wird berechnet. Die Entwicklung eines individuellen Trainingskonzeptes
                wird nach Stundenaufwand berechnet und mit dem Kunden abgestimmt.
              </p>
              <p>
                Offene Seminare werden regelmäßig auf dieser Website veröffentlicht —{" "}
                <Link
                  to="/leistungen/seminare"
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  zur Seminarübersicht
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-2" aria-labelledby="enthalten-title">
          <Reveal>
            <h2 id="enthalten-title" className="h2-display">
              Im Honorar enthalten
            </h2>
            <ul role="list" className="mt-6 space-y-2.5">
              {HONORAR_INKLUSIVE.map((i) => (
                <li key={i} className="flex gap-3 text-[18px] leading-[1.65] text-ink-700">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass-600"
                  />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex h-full flex-col justify-center rounded-lg border border-ink-200 bg-ink-100 p-8">
              <Users className="size-7 text-brass-700" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="h3-display mt-4">Teilnehmerzahl</h2>
              <p className="mt-2 text-[18px] leading-[1.65] text-ink-700">
                Die Teilnehmerzahl ist begrenzt. Maximal vier Personen.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mt-20" aria-labelledby="storno-title">
          <Reveal>
            <h2 id="storno-title" className="h2-display">
              Stornobedingungen
            </h2>
            <p className="mt-4 max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
              Stornierungen sind bis 30 Tage vor Veranstaltungsbeginn kostenfrei möglich. Bei
              Rücktritt vom 29. bis 10. Tag werden 50 % fällig, vom 10. bis 3. Tag 70 %, vom 3. bis
              1. Tag 90 %. Bei Nichtantritt am Veranstaltungstag wird eine Stornogebühr von 100 %
              des Veranstaltungshonorars fällig.
            </p>
          </Reveal>

          <ul role="list" className="mt-8 grid max-w-[80ch] gap-3">
            {STORNO.map((s, i) => (
              <Reveal as="li" key={s.zeitraum} delay={i * 70}>
                <div className="grid items-center gap-2 rounded-lg border border-ink-200 bg-card p-4 sm:grid-cols-[230px_1fr_70px]">
                  <span className="text-[16px] font-semibold text-ink-900">{s.zeitraum}</span>
                  <span
                    aria-hidden="true"
                    className="h-2 w-full overflow-hidden rounded-full bg-ink-200"
                  >
                    <span
                      className="block h-full rounded-full bg-brass-600"
                      style={{ width: `${Math.max(s.prozent, 3)}%` }}
                    />
                  </span>
                  <span className="text-[16px] font-semibold text-bordeaux-900 sm:text-right">
                    {s.text}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-6 max-w-[68ch] text-[17px] leading-[1.65] text-ink-700">
              Storno ist jeder Rücktritt, auch im Krankheitsfall. Wenn Sie eine Ersatzteilnehmerin
              oder einen Ersatzteilnehmer benennen, entfällt die Stornogebühr.
            </p>
          </Reveal>
        </section>

        <CtaBand text="Sie möchten wissen, welches Format für Ihre Aufgabe das richtige ist? Dreißig Minuten Gespräch, kostenlos und unverbindlich." />
      </div>
    </>
  );
}
