import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { NewsletterSection } from "@/components/site/NewsletterSection";
import { Button } from "@/components/ui/button";
import { findPraxisbrief, praxisbriefNachbarn, AUTOR_BILD } from "@/data/praxisbriefe";
import { SITE_URL } from "@/lib/konfig";

const SITE = SITE_URL;

export const Route = createFileRoute("/praxisbriefe/$slug")({
  loader: ({ params }) => {
    const brief = findPraxisbrief(params.slug);
    if (!brief) throw notFound();
    return { brief, ...praxisbriefNachbarn(params.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Praxisbrief nicht gefunden" }, { name: "robots", content: "noindex" }],
      };
    }
    const b = loaderData.brief;
    const title = `${b.title} — Praxisbrief ${b.month} | Erich Grikscheit`;
    const description = b.teaser.length > 158 ? `${b.teaser.slice(0, 155).trimEnd()}…` : b.teaser;
    const url = `/praxisbriefe/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: b.coverUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: b.coverUrl },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: b.title,
            description: b.teaser,
            datePublished: b.date,
            inLanguage: "de",
            image: b.coverUrl,
            mainEntityOfPage: `${SITE}${url}`,
            author: {
              "@type": "Person",
              name: "Erich Grikscheit",
              url: `${SITE}/ueber-mich`,
            },
            publisher: {
              "@type": "Organization",
              name: "Praxis für Marketing & Motivation",
              url: SITE,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: `${SITE}/` },
              {
                "@type": "ListItem",
                position: 2,
                name: "Praxisbriefe",
                item: `${SITE}/praxisbriefe/`,
              },
              { "@type": "ListItem", position: 3, name: b.title, item: `${SITE}${url}` },
            ],
          }),
        },
      ],
    };
  },
  component: BriefDetail,
});

function BriefDetail() {
  const { brief, neuer, aelter } = Route.useLoaderData();

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Praxisbriefe", to: "/praxisbriefe" }, { label: brief.title }]}
      />

      <article className="container-page pt-10">
        <Reveal>
          <p className="eyebrow text-bordeaux-600">Praxisbrief · {brief.month}</p>
          <h1 className="h1-display mt-3 max-w-[24ch] text-ink-900">{brief.title}</h1>
          <p className="mt-4 text-[15px] text-ink-500">
            Lesestoff für die Führungsarbeit · PDF {brief.pdfSize}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <img
            src={brief.coverUrl}
            alt={`Titelbild des Praxisbriefs „${brief.title}“ vom ${brief.month}`}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="mt-10 aspect-[3/2] w-full max-w-[630px] rounded-lg bg-ink-100 object-contain p-4 shadow-soft"
          />
        </Reveal>

        {brief.body ? (
          <Reveal delay={120}>
            <div
              className="prose-praxisbrief mt-12 max-w-[68ch] text-[18px] leading-[1.65] text-ink-700"
              dangerouslySetInnerHTML={{ __html: brief.body }}
            />
          </Reveal>
        ) : (
          <>
            <Reveal delay={120}>
              <p className="drop-cap mt-12 max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
                {brief.teaser}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <aside className="mt-10 max-w-[68ch] rounded-lg border border-ink-200 bg-ink-100 p-7">
                <p className="text-ink-700">
                  Der vollständige Aufsatz steht derzeit als PDF zur Verfügung. Die HTML-Fassung
                  wird nachgereicht.
                </p>
                <Button asChild variant="brass" size="lg" className="mt-5">
                  <a href={brief.pdfUrl} target="_blank" rel="noopener">
                    Praxisbrief als PDF lesen <span aria-hidden="true">↓</span>
                  </a>
                </Button>
                <p className="mt-3 text-[15px] text-ink-500">
                  PDF, {brief.pdfSize} — öffnet in einem neuen Tab.
                </p>
              </aside>
            </Reveal>
          </>
        )}

        <Reveal delay={200}>
          <nav
            aria-label="Weitere Praxisbriefe"
            className="mt-16 grid gap-4 border-t border-ink-200 pt-8 sm:grid-cols-2"
          >
            {aelter ? (
              <Link
                to="/praxisbriefe/$slug"
                params={{ slug: aelter.slug }}
                className="rounded-lg border border-ink-200 bg-card p-5 transition-colors hover:border-brass-600"
              >
                <span className="eyebrow text-ink-500">
                  <span aria-hidden="true">←</span> Älterer Praxisbrief
                </span>
                <span className="mt-2 block font-serif text-[20px] font-semibold text-bordeaux-900">
                  {aelter.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {neuer && (
              <Link
                to="/praxisbriefe/$slug"
                params={{ slug: neuer.slug }}
                className="rounded-lg border border-ink-200 bg-card p-5 text-right transition-colors hover:border-brass-600 sm:col-start-2"
              >
                <span className="eyebrow text-ink-500">
                  Neuerer Praxisbrief <span aria-hidden="true">→</span>
                </span>
                <span className="mt-2 block font-serif text-[20px] font-semibold text-bordeaux-900">
                  {neuer.title}
                </span>
              </Link>
            )}
          </nav>

          <Link
            to="/praxisbriefe"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-brass-700 underline underline-offset-4"
          >
            <span aria-hidden="true">←</span> Alle Praxisbriefe
          </Link>
        </Reveal>
      </article>

      <div className="mt-16">
        <NewsletterSection />
      </div>

      <div className="container-page">
        <Reveal>
          <aside className="mt-16 flex flex-wrap items-center gap-6 rounded-lg border border-ink-200 bg-card p-7">
            <img
              src={AUTOR_BILD}
              alt="Porträt von Erich Grikscheit"
              width={110}
              height={110}
              loading="lazy"
              decoding="async"
              className="size-[88px] rounded-full object-cover"
            />
            <div className="max-w-[52ch]">
              <p className="font-serif text-[20px] font-semibold text-bordeaux-900">
                Erich Grikscheit
              </p>
              <p className="mt-2 text-ink-700">
                Ich verbinde 30 Jahre Vertriebs- und Marketingpraxis mit Philosophie und
                Individualpsychologie — und schreibe die Praxisbriefe aus dem Training heraus.
              </p>
              <Link
                to="/ueber-mich"
                className="mt-3 inline-flex items-center gap-2 font-semibold text-brass-700 underline underline-offset-4"
              >
                Mehr über mich <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </Reveal>
      </div>
    </>
  );
}
