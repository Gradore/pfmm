import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Headphones } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site";

const title = "Leitfäden und Praxismedien | Erich Grikscheit";
const description =
  "Leitfäden, Begleithefte und eine Vortragsreihe aus der eigenen Trainingserfahrung: Kreativität, Wertschätzung, Rituale in Unternehmen und erfolgreich präsentieren.";

export const Route = createFileRoute("/leitfaeden")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leitfaeden" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leitfaeden" }],
  }),
  component: Page,
});

const PDF_BASE = "https://www.pfmm.de/das_angebot/praxis_medien/leitfaeden/";

const HEFTE = [
  {
    title: "Kurzer Leitfaden „Wertschätzung“",
    text: "Wie Sie aus der Kunst der Wertschätzung neue Kraft gewinnen.",
    pdf: `${PDF_BASE}2017_begleitheft_wertschaetzung.pdf`,
  },
  {
    title: "Kurzer Leitfaden „Rituale in Unternehmen“",
    text: "Begleitheft zu der Frage, welche Rituale eine Organisation tragen — und welche sie nur beschäftigen.",
    pdf: `${PDF_BASE}2017_begleitheft_rituale.pdf`,
  },
  {
    title: "Kurzer Leitfaden „Erfolgreich präsentieren“",
    text: "Begleitheft mit Anregungen für Aufbau, Sprache und Wirkung einer Präsentation.",
    pdf: `${PDF_BASE}2017_begleitheft_praesentieren.pdf`,
  },
];

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Leitfäden" }]}
        eyebrow="Praxis Medien"
        title="Leitfäden und Praxismedien"
        lead="Die vorgestellten Praxismedien sind in erster Linie Anregungen für den Praktiker. Sie stammen alle aus der eigenen Trainingserfahrung, die sich im Laufe der Jahre ergeben hat."
      />

      <div className="container-page section-y">
        <Reveal>
          <article className="grid gap-8 overflow-hidden rounded-lg border border-ink-200 shadow-soft md:grid-cols-[minmax(220px,300px)_1fr] md:gap-0">
            <div className="flex flex-col justify-center gap-4 bg-bordeaux-700 p-8 text-paper">
              <Headphones className="size-9 text-brass-400" strokeWidth={1.5} aria-hidden="true" />
              <p className="eyebrow text-brass-400">Vortragsreihe</p>
              <p className="font-serif text-[26px] leading-tight font-semibold">6 Lektionen</p>
              <p className="text-paper/80">Länge 4:04 Stunden</p>
            </div>
            <div className="bg-card p-8">
              <h2 className="h3-display font-sans">
                Vortragsreihe „Zeit erfahren, entdecken und nutzen“
              </h2>
              <p className="mt-4 max-w-[68ch] text-ink-700">
                In 6 Lektionen · Länge 4:04 Stunden · Erschienen im Lecturio-Verlag, 2013.
              </p>
              <Button asChild variant="brass" size="lg" className="mt-6">
                <Link to="/kontakt">Nach der Vortragsreihe fragen</Link>
              </Button>
            </div>
          </article>
        </Reveal>

        <section className="mt-16" aria-labelledby="kreativitaet-title">
          <Reveal>
            <article className="rounded-lg border border-ink-200 bg-ink-100 p-8">
              <p className="eyebrow text-bordeaux-600">Leitfaden</p>
              <h2 id="kreativitaet-title" className="h3-display mt-3 font-sans">
                Leitfaden „Kreativität“
              </h2>
              <p className="mt-4 max-w-[68ch] text-ink-700">
                Erschienen 2017 · 74 Seiten · PDF · Versand per Mail · 3 € plus MwSt. · Bestellung
                über das Kontaktformular oder telefonisch unter{" "}
                <a
                  href={CONTACT.phoneHref}
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  {CONTACT.phoneDisplay}
                </a>
                .
              </p>
              <Button asChild variant="brass" size="lg" className="mt-6">
                <Link to="/kontakt">Leitfaden bestellen</Link>
              </Button>
            </article>
          </Reveal>
        </section>

        <section className="mt-16" aria-labelledby="hefte-title">
          <Reveal>
            <h2 id="hefte-title" className="h2-display">
              Kurze Leitfäden zum Herunterladen
            </h2>
          </Reveal>
          <ul role="list" className="mt-10 grid gap-6 lg:grid-cols-3">
            {HEFTE.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 90}>
                <article className="flex h-full flex-col rounded-lg border border-ink-200 bg-card p-7 shadow-soft">
                  <h3 className="font-serif text-[22px] leading-snug font-semibold text-bordeaux-900">
                    {h.title}
                  </h3>
                  <p className="mt-3 flex-1 text-ink-700">{h.text}</p>
                  <Button asChild variant="brass" className="mt-6">
                    <a href={h.pdf} target="_blank" rel="noopener noreferrer">
                      <Download strokeWidth={1.5} aria-hidden="true" />
                      PDF herunterladen ↓
                    </a>
                  </Button>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        <CtaBand text="Sie möchten ein Thema vertiefen? Dreißig Minuten Gespräch, kostenlos und unverbindlich." />
      </div>
    </>
  );
}
