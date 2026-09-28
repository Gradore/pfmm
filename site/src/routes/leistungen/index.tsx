import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CalendarCheck, Lightbulb, MessagesSquare, Puzzle } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { KontaktOrganisation } from "@/components/site/KontaktOrganisation";

const title = "Leistungen — Seminare, Inhouse, Beratung | Grikscheit";
const description =
  "Vier Wege, mit mir zu arbeiten: offene Seminare, maßgeschneiderte Inhouse-Trainings, philosophische Beratung und Konzeptentwicklung für Ihren Kundendialog.";

export const Route = createFileRoute("/leistungen/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/" }],
  }),
  component: Page,
});

const KARTEN = [
  {
    icon: Puzzle,
    title: "Inhouse-Trainings",
    text: "Vorgespräch, Einzelinterviews, maßgeschneidertes Konzept. Kein Programm von der Stange.",
    to: "/leistungen/inhouse",
  },
  {
    icon: CalendarCheck,
    title: "Offene Seminare",
    text: "Seminare zu Strategie, Führung, Kommunikation und Zeitmanagement — in kleiner Runde, mit Zeit zum Denken.",
    to: "/leistungen/seminare",
  },
  {
    icon: MessagesSquare,
    title: "Philosophische Beratung",
    text: "Einzelgespräche für Führungskräfte, die keine Antwort suchen, sondern eine bessere Frage.",
    to: "/leistungen/beratung",
  },
  {
    icon: Lightbulb,
    title: "Konzeptentwicklung",
    text: "Kundendialog, der trägt — von der Idee über den Text bis zur Umsetzung.",
    to: "/leistungen/konzepte",
  },
] as const;

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Leistungen" }]}
        eyebrow="Überblick"
        title="Leistungen — vier Wege, mit mir zu arbeiten"
        lead="Ob offenes Seminar, maßgeschneidertes Inhouse-Training, ein Einzelgespräch oder ein Konzept für Ihren Kundendialog — der Ausgangspunkt ist immer Ihre Aufgabe, nicht mein Katalog."
      />
      <div className="container-page section-y">
        <ul role="list" className="grid gap-6 md:grid-cols-2">
          {KARTEN.map((k, i) => {
            const Icon = k.icon;
            return (
              <Reveal as="li" key={k.title} delay={(i % 2) * 90}>
                <Link
                  to={k.to}
                  className={`flex h-full flex-col rounded-lg border border-ink-200 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brass-600 hover:shadow-lift ${i === 0 ? "bg-ink-100" : "bg-card"}`}
                >
                  <Icon className="size-9 text-bordeaux-600" strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="h3-display mt-5 font-sans">{k.title}</h2>
                  <p className="mt-3 flex-1 text-ink-700">{k.text}</p>
                  <span className="mt-6 font-semibold text-brass-700">
                    Mehr erfahren <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <Link
            to="/leitfaeden"
            className="mt-6 flex flex-wrap items-center gap-5 rounded-lg border border-ink-200 bg-ink-100 p-7 transition-colors duration-200 hover:border-brass-600"
          >
            <BookOpen className="size-7 text-ink-500" strokeWidth={1.5} aria-hidden="true" />
            <span className="flex-1">
              <span className="block font-sans text-[19px] font-semibold text-ink-900">
                Leitfäden &amp; Praxismedien
              </span>
              <span className="mt-1 block text-ink-700">
                Begleithefte, Leitfäden und eine Vortragsreihe — Anregungen aus der eigenen
                Trainingserfahrung.
              </span>
            </span>
            <span className="font-semibold text-brass-700">
              Ansehen <span aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
        <div className="mt-10 max-w-sm"><KontaktOrganisation /></div>

        <CtaBand />
      </div>
    </>
  );
}
