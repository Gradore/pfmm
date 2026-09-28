import { createFileRoute, Link } from "@tanstack/react-router";
import { QuoteBand } from "@/components/home/Blocks";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";
import { KontaktOrganisation } from "@/components/site/KontaktOrganisation";

const title = "Über mich — Erich Grikscheit, Trainer und Berater";
const description =
  "30 Jahre Vertrieb und Marketing, ein langjähriges philosophisches Studium und eine Ausbildung in Individualpsychologie — der Werdegang hinter der Praxis in Karben.";

export const Route = createFileRoute("/ueber-mich")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/ueber-mich" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/ueber-mich" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: CONTACT.person,
          jobTitle: "Trainer und Berater",
          telephone: "+49 6039 45458",
          email: CONTACT.email,
          sameAs: [CONTACT.linkedin],
          worksFor: { "@type": "Organization", name: CONTACT.company },
          address: {
            "@type": "PostalAddress",
            streetAddress: CONTACT.street,
            postalCode: CONTACT.zip,
            addressLocality: CONTACT.city,
            addressCountry: "DE",
          },
          knowsAbout: [
            "Führungstraining",
            "Philosophische Beratung",
            "Individualpsychologie",
            "Rhetorik und Präsentation",
          ],
        }),
      },
    ],
  }),
  component: Page,
});

const STATIONEN = [
  {
    title: "Ausbildung zum Einzelhandelskaufmann",
    text: "Der Anfang: Verkaufen lernt man am Kunden, nicht im Seminarraum.",
  },
  {
    title: "Akademie für Marketing und Kommunikation, Frankfurt",
    text: "Besuch und Abschluss — die systematische Seite des Faches.",
  },
  {
    title: "30 Jahre Vertrieb und Marketing",
    text: "Verschiedene Vertriebs- und Marketingpositionen in unterschiedlichen Branchen.",
  },
  {
    title: "Selbstständigkeit als Trainer und Berater",
    text: "Seither begleite ich Führungskräfte und Unternehmen bei ihren eigenen Aufgaben.",
  },
  {
    title: "Philosophisches Studium und Individualpsychologie",
    text: "Ein langjähriges philosophisches Studium sowie eine Ausbildung in Individualpsychologie mit angrenzenden Gebieten der Psychologie.",
  },
];

const ARBEIT = [
  "Durchführung von Trainingsmaßnahmen",
  "Entwickeln von Marktkonzepten",
  "Textentwicklungen",
  "persönliche Einzelberatung",
];

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Über mich" }]}
        eyebrow="Erich Grikscheit"
        title="Erst die Praxis. Dann die Frage, warum sie funktioniert."
      />

      <div className="container-page section-y">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="rounded-2xl bg-ink-100 p-6">
              {/* TODO: durch lokal optimiertes WebP ersetzen */}
              <img
                src="https://www.pfmm.de/home/grikscheit_frei_ausschnitt.png"
                alt="Porträt von Erich Grikscheit, Trainer und Berater der Praxis für Marketing und Motivation"
                width={520}
                height={620}
                className="mx-auto w-full max-w-sm rounded-xl object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
              <p>
                Ausbildung zum Einzelhandelskaufmann. Besuch und Abschluss an der Akademie für
                Marketing und Kommunikation in Frankfurt.
              </p>
              <p className="mt-6">
                30 Jahre war ich in verschiedenen Vertriebs- und Marketingpositionen tätig. Danach
                Selbstständigkeit als Trainer und Berater.
              </p>
              <p className="mt-6">
                Seither bin ich mit ganz vielfältigen Aufgaben in den unterschiedlichsten Branchen
                vertraut. Die praktische Arbeit verlangt einen komplexen geistigen Unterbau, den ich
                durch verschiedene Studien ständig erweitert habe. Hinzu kommen ein langjähriges
                philosophisches Studium sowie eine Ausbildung in Individualpsychologie mit
                angrenzenden Gebieten der Psychologie.
              </p>
            </div>
          </Reveal>
        </div>

        <section className="mt-20" aria-labelledby="stationen-title">
          <Reveal>
            <h2 id="stationen-title" className="h2-display">
              Stationen
            </h2>
          </Reveal>
          <ol role="list" className="relative mt-10 space-y-8 pl-9">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[7px] w-px bg-bordeaux-600/40"
            />
            {STATIONEN.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-9 block size-4 rounded-full border-2 border-paper bg-bordeaux-600"
                />
                <h3 className="font-sans text-[19px] font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 max-w-[68ch] text-ink-700">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <Reveal>
            <section
              aria-labelledby="arbeit-title"
              className="h-full rounded-lg border border-ink-200 bg-card p-8 shadow-soft"
            >
              <h2 id="arbeit-title" className="h3-display font-sans">
                Womit ich arbeite
              </h2>
              <ul role="list" className="mt-5 space-y-3">
                {ARBEIT.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-ink-700">
                    <span
                      aria-hidden="true"
                      className="mt-2 block size-1.5 shrink-0 rounded-full bg-brass-600"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal delay={100}>
            <section
              aria-labelledby="publikationen-title"
              className="h-full rounded-lg border border-ink-200 bg-card p-8 shadow-soft"
            >
              <h2 id="publikationen-title" className="h3-display font-sans">
                Publikationen
              </h2>
              <ul role="list" className="mt-5 space-y-3 text-ink-700">
                <li>Vortragsreihe im Lecturio-Verlag (2013)</li>
                <li>
                  Acht Praxisbriefe seit 2025 —{" "}
                  <Link
                    to="/praxisbriefe"
                    className="font-semibold text-brass-700 underline underline-offset-4"
                  >
                    zur Übersicht
                  </Link>
                </li>
                <li>
                  Leitfäden und Begleithefte —{" "}
                  <Link
                    to="/leitfaeden"
                    className="font-semibold text-brass-700 underline underline-offset-4"
                  >
                    zu den Leitfäden
                  </Link>
                </li>
                <li>
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brass-700 underline underline-offset-4"
                  >
                    Erich Grikscheit auf LinkedIn
                  </a>
                </li>
              </ul>
            </section>
          </Reveal>
        </div>

        <section className="mt-20" aria-labelledby="team-title">
          <Reveal>
            <h2 id="team-title" className="h2-display">
              Mit wem ich arbeite
            </h2>
            <p className="mt-4 max-w-[68ch] text-ink-700">
              Für einzelne Themen und für die Organisation arbeite ich mit einem kleinen festen
              Kreis zusammen.
            </p>
          </Reveal>
          <ul role="list" className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { name: "Ellisa Gül", rolle: "Trainerin, Mitarbeiterführung" },
              { name: "Nina Lufen", rolle: "Trainerin, Kommunikation" },
            ].map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 80}>
                <div className="flex h-full flex-col rounded-lg border border-ink-200 bg-card p-6">
                  <span
                    aria-hidden="true"
                    className="flex size-12 items-center justify-center rounded-full bg-bordeaux-700 font-serif text-[20px] font-semibold text-paper"
                  >
                    {m.name.charAt(0)}
                  </span>
                  <h3 className="mt-4 font-serif text-[21px] font-semibold text-bordeaux-900">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[16px] text-ink-500">{m.rolle}</p>
                </div>
              </Reveal>
            ))}
            <li><KontaktOrganisation /></li>
          </ul>
        </section>

        <CtaBand text="Sie möchten wissen, ob das zu Ihrer Aufgabe passt? Dreißig Minuten Gespräch, kostenlos und unverbindlich." />
      </div>

      <QuoteBand />
    </>
  );
}
