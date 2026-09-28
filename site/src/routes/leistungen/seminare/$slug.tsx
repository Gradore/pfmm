import { createFileRoute, notFound } from "@tanstack/react-router";
import { SeminarDetail } from "@/components/seminar/SeminarDetail";
import { CONTACT } from "@/lib/site";
import type { Seminar } from "@/data/seminare";
import { findSeminar, MWST_SUFFIX, SEMINARE, zeitenLabel } from "@/data/seminare";
import { ladeOeffentlicheTermine } from "@/hooks/useTermine";
import type { Termin } from "@/lib/buchung";

export const Route = createFileRoute("/leistungen/seminare/$slug")({
  loader: async ({ params }) => {
    const seminar = findSeminar(params.slug);
    if (!seminar) throw notFound();
    // Beim Vorrendern laden, damit Termine und Plätze schon im HTML stehen.
    let termine: Termin[] = [];
    try {
      termine = await ladeOeffentlicheTermine(params.slug);
    } catch (err) {
      console.error(err);
    }
    return { seminar, termine };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Seminar nicht gefunden" }, { name: "robots", content: "noindex" }],
      };
    }
    const s = loaderData.seminar;
    const url = `https://www.pfmm.de/leistungen/seminare/${s.slug}/`;
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDescription },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Page,
});

function Page() {
  const { seminar, termine } = Route.useLoaderData() as { seminar: Seminar; termine: Termin[] };
  const url = `https://www.pfmm.de/leistungen/seminare/${seminar.slug}/`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Startseite", item: "https://www.pfmm.de/" },
        { name: "Leistungen", item: "https://www.pfmm.de/leistungen/" },
        { name: "Offene Seminare", item: "https://www.pfmm.de/leistungen/seminare/" },
        { name: seminar.title, item: url },
      ].map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: e.name,
        item: e.item,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: seminar.h1,
      description: seminar.metaDescription,
      url,
      inLanguage: "de",
      provider: {
        "@type": "Organization",
        name: CONTACT.company,
        url: "https://www.pfmm.de/",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "onsite",
        name: seminar.title,
        ...(seminar.isOpenDate ? { startDate: "2026-09-02", endDate: "2026-09-04" } : {}),
        location: {
          "@type": "Place",
          name: CONTACT.company,
          address: {
            "@type": "PostalAddress",
            streetAddress: CONTACT.street,
            postalCode: CONTACT.zip,
            addressLocality: CONTACT.city,
            addressCountry: "DE",
          },
        },
        instructor: { "@type": "Person", name: CONTACT.person },
        courseSchedule: {
          "@type": "Schedule",
          description: `${seminar.durationLabel}, ${zeitenLabel(seminar)}`,
        },
      },
      ...(seminar.priceEur !== null
        ? {
            offers: {
              "@type": "Offer",
              price: seminar.priceEur,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
              description: MWST_SUFFIX,
              url,
            },
          }
        : {}),
    },
  ];

  if (seminar.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seminar.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <div id="top">
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <SeminarDetail seminar={seminar} termine={termine} />
    </div>
  );
}

/** Für die Sitemap-Generierung. */
export const SEMINAR_SLUGS = SEMINARE.map((s) => s.slug);
