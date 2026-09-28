import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/home/Hero";
import { SituationCards, TrustBar } from "@/components/home/Sections";
import {
  NaechsterTermin,
  OffeneSeminareBand,
  PraxisbriefeTeaser,
  QuoteBand,
  StimmenPlaceholder,
  ThemenGrid,
  UeberMichTeaser,
} from "@/components/home/Blocks";
import { TrainingsangeboteOrbit } from "@/components/site/TrainingsangeboteOrbit";
import { NewsletterSection } from "@/components/site/NewsletterSection";
import { KontaktSection } from "@/components/site/KontaktSection";
import { Reveal } from "@/components/site/Reveal";
import { ladeOeffentlicheTermine } from "@/hooks/useTermine";
import type { Termin } from "@/lib/buchung";
import { TALK_TERMINE, kommendeEintraege, aktuellesDatum } from "@/data/aktuelles";

const title = "Führungstraining, das beim Denken anfängt | Grikscheit";
const description =
  "Erich Grikscheit, Karben bei Frankfurt: Seminare, Inhouse-Trainings und philosophische Beratung für Führungskräfte im Mittelstand. Seit 30 Jahren Praxis.";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const termine = await ladeOeffentlicheTermine();
      return { termin: termine.find((t) => t.status !== "abgesagt") ?? null };
    } catch (err) {
      console.error(err);
      return { termin: null as Termin | null };
    }
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Erich Grikscheit",
          jobTitle: "Trainer und Berater für Führung und Kommunikation",
          worksFor: { "@type": "Organization", name: "Praxis für Marketing & Motivation" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Max-Planck-Str. 27",
            postalCode: "61184",
            addressLocality: "Karben",
            addressCountry: "DE",
          },
          telephone: "+49 6039 45458",
          sameAs: ["https://www.linkedin.com/in/erich-grikscheit-pfmm"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { termin } = Route.useLoaderData() as { termin: Termin | null };
  return (
    <>
      <Hero />
      <TrustBar />
      <SituationCards />

      <section className="section-y bg-ink-100" aria-labelledby="orbit-title">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-bordeaux-600">Trainingsangebote</p>
            <h2 id="orbit-title" className="h2-display mt-3">
              Wie wir zusammenarbeiten können
            </h2>
            <p className="lead-text mt-4 max-w-[68ch] text-ink-700">
              Sieben Formate — ein Ausgangspunkt: Ihre Aufgabe.
            </p>
          </Reveal>
          <div className="mt-12">
            <TrainingsangeboteOrbit />
          </div>
        </div>
      </section>

      <ThemenGrid />
      <OffeneSeminareBand />
      <NaechsterTermin termin={termin} />
      <PraxisbriefeTeaser />
      <QuoteBand />
      <UeberMichTeaser />
      <TalkBand />
      <StimmenPlaceholder />
      <NewsletterSection />
      <KontaktSection />
    </>
  );
}

/** Schmales Band für das offene Videoformat. */
function TalkBand() {
  return (
    <section className="bg-bordeaux-700 py-12" aria-labelledby="talk-title">
      <div className="container-page flex flex-wrap items-center gap-6">
        <div className="min-w-[280px] flex-1">
          <p className="eyebrow text-brass-400">Offenes Format · 90 Minuten Talk</p>
          <h2 id="talk-title" className="h2-display mt-2 text-paper">
            90 Minuten Talk
          </h2>
          <p className="mt-3 max-w-[62ch] text-[17px] text-paper/85">
            Kostenlose Teilnahme an regelmäßig stattfindenden Video-Gesprächen zu unterschiedlichen
            Themen aus der Welt des Managements. Die nächsten Termine werden hier veröffentlicht.
          </p>
          <ul className="mt-4 space-y-2 text-[16px] text-paper/85">{kommendeEintraege(TALK_TERMINE).map((t) => <li key={t.datum}>{aktuellesDatum(t)} · „{t.label}“</li>)}</ul>
        </div>
        <Button asChild variant="brass" size="lg">
          <Link to="/leistungen/talk">Zum Talk anmelden</Link>
        </Button>
      </div>
    </section>
  );
}
