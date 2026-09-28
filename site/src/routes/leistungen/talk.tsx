import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Video } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { TalkFormular } from "@/components/site/TalkFormular";
import { TALK_TERMINE, kommendeEintraege, aktuellesDatum } from "@/data/aktuelles";

const title = "90 Minuten Talk — Video-Gespräche zum Management | Grikscheit";
const description =
  "Kostenlose Teilnahme an regelmäßig stattfindenden Video-Gesprächen zu Themen aus der Welt des Managements. Anmeldung mit Themenwunsch, Termine erscheinen hier.";

export const Route = createFileRoute("/leistungen/talk")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/talk" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/talk" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Leistungen", to: "/leistungen" }, { label: "90 Minuten Talk" }]}
        eyebrow="Offenes Format"
        title="90 Minuten Talk"
        lead="Kostenlose Teilnahme an regelmäßig stattfindenden Video-Gesprächen zu unterschiedlichen Themen aus der Welt des Managements."
      />

      <div className="container-page section-y grid grid-cols-[minmax(0,1fr)] gap-14 [&>*]:min-w-0 lg:grid-cols-[1fr_1fr]">
        <div className="min-w-0">
          <Reveal>
            <h2 className="h2-display">Wie der Talk abläuft</h2>
            <ul
              role="list"
              className="mt-6 max-w-[62ch] space-y-4 text-[18px] break-words text-ink-700 [overflow-wrap:anywhere]"
            >
              <li className="flex gap-4">
                <Video
                  className="mt-1 size-6 shrink-0 text-brass-700"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Neunzig Minuten im Videogespräch, ein Thema, eine kleine Runde. Keine Präsentation,
                sondern ein Gespräch.
              </li>
              <li className="flex gap-4">
                <CalendarClock
                  className="mt-1 size-6 shrink-0 text-brass-700"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Die Teilnahme ist kostenlos. Die nächsten Termine werden hier veröffentlicht.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-10 rounded-lg border border-ink-200 bg-ink-100 p-6">
              <h3 className="h3-display">Nächste Termine</h3>
              {kommendeEintraege(TALK_TERMINE).length ? <ul className="mt-3 space-y-3 text-ink-700">{kommendeEintraege(TALK_TERMINE).map((t) => <li key={t.datum}>{aktuellesDatum(t)} · „{t.label}“</li>)}</ul> : <p className="mt-2 text-ink-700">Die nächsten Termine werden hier veröffentlicht.</p>}
            </div>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="rounded-lg border border-ink-200 bg-card p-7 shadow-soft">
            <h2 className="h2-display">Anmeldung</h2>
            <p className="mt-2 text-[17px] text-ink-700">Alle Felder mit * sind Pflichtangaben.</p>
            <div className="mt-6">
              <TalkFormular />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-page pb-10">
        <CtaBand text="Sie hätten lieber ein Gespräch unter vier Augen? Dreißig Minuten, kostenlos und unverbindlich." />
      </div>
    </>
  );
}
