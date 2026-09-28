import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { NewsletterSection } from "@/components/site/NewsletterSection";
import { CtaBand } from "@/components/site/CtaBand";
import { PRAXISBRIEFE, LINKEDIN_URL, type Praxisbrief } from "@/data/praxisbriefe";

const LEAD =
  "Alle sechs Wochen ein interessanter Aufsatz zu einem Begriff, den wir im Alltag benutzen, ohne ihn hinlänglich zu befragen – Ordnung, Vertrauen, Verantwortung, Arbeit u. s. w. Philosophische und psychologische Impulse, aus der Trainingspraxis heraus geschrieben.";

export const Route = createFileRoute("/praxisbriefe/")({
  head: () => ({
    meta: [
      { title: "Praxisbriefe — Denkanstöße für die Führungsarbeit | Grikscheit" },
      { name: "description", content: LEAD.slice(0, 158) },
      { property: "og:title", content: "Praxisbriefe — Denkanstöße für die Führungsarbeit" },
      { property: "og:description", content: LEAD.slice(0, 158) },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/praxisbriefe/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/praxisbriefe/" }],
  }),
  component: Page,
});

function Cover({ brief, className }: { brief: Praxisbrief; className?: string }) {
  return (
    <img
      src={brief.coverUrl}
      alt={`Titelbild des Praxisbriefs „${brief.title}“ vom ${brief.month}`}
      width={800}
      height={533}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

function PdfLink({ brief }: { brief: Praxisbrief }) {
  return (
    <a
      href={brief.pdfUrl}
      target="_blank"
      rel="noopener"
      className="text-[15px] text-ink-500 underline underline-offset-4 hover:text-brass-700"
    >
      PDF <span aria-hidden="true">↓</span>{" "}
      <span className="whitespace-nowrap">({brief.pdfSize})</span>
    </a>
  );
}

function Page() {
  const feature = PRAXISBRIEFE[0]!;

  const rest = PRAXISBRIEFE.slice(1);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Praxisbriefe" }]}
        eyebrow="Praxisbriefe"
        title="Praxisbriefe — Denkanstöße für die Führungsarbeit"
        lead={LEAD}
      />

      <div className="container-page mt-14">
        {/* Aktuelle Ausgabe */}
        <Reveal>
          <article className="grid overflow-hidden rounded-lg border border-ink-200 bg-card shadow-soft lg:grid-cols-2">
            <div className="aspect-[3/2] overflow-hidden bg-ink-100">
              <Cover brief={feature} className="size-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <p className="eyebrow text-brass-700">Aktuelle Ausgabe · {feature.month}</p>
              <h2 className="mt-3 font-serif text-[30px] leading-tight font-semibold text-bordeaux-900">
                {feature.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-[17px] text-ink-700">{feature.teaser}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Link
                  to="/praxisbriefe/$slug"
                  params={{ slug: feature.slug }}
                  className="inline-flex items-center gap-2 text-[17px] font-semibold text-brass-700 underline underline-offset-4"
                >
                  Weiterlesen <span aria-hidden="true">→</span>
                </Link>
                <PdfLink brief={feature} />
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      <div className="mt-16">
        <NewsletterSection />
      </div>

      <div className="container-page mt-16">
        <Reveal>
          <h2 className="h2-display">Alle Ausgaben</h2>
        </Reveal>
        <ul role="list" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((b, i) => (
            <Reveal as="li" key={b.slug} delay={i * 80}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-ink-200 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[3/2] overflow-hidden bg-ink-100">
                  <Cover brief={b} className="size-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-brass-700">{b.month}</p>
                  <h3 className="mt-2 font-serif text-[22px] leading-snug font-semibold text-bordeaux-900">
                    {b.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[16px] text-ink-700">{b.teaser}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    <Link
                      to="/praxisbriefe/$slug"
                      params={{ slug: b.slug }}
                      className="inline-flex items-center gap-2 font-semibold text-brass-700 underline underline-offset-4"
                    >
                      Weiterlesen <span aria-hidden="true">→</span>
                    </Link>
                    <PdfLink brief={b} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-12 max-w-[68ch] text-ink-700">
            Die Praxisbriefe erscheinen zusätzlich auf LinkedIn — folgen Sie{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener"
              className="font-semibold text-brass-700 underline underline-offset-4"
            >
              meinem Profil
            </a>
            , wenn Sie keinen verpassen wollen.
          </p>
        </Reveal>

        <CtaBand />
      </div>
    </>
  );
}
