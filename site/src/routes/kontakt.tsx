import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Smartphone } from "lucide-react";
import { KontaktFormular } from "@/components/site/KontaktFormular";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";
import { KontaktOrganisation } from "@/components/site/KontaktOrganisation";

const title = "Kontakt und Erstgespräch — Erich Grikscheit, Karben";
const description =
  "Dreißig Minuten Erstgespräch, kostenlos und unverbindlich. Erich Grikscheit erreichen Sie direkt in Karben bei Frankfurt: 0 60 39 / 45 45 8 oder info@pfmm.de.";

export const Route = createFileRoute("/kontakt")({
  validateSearch: (search: Record<string, unknown>): { thema?: string } =>
    typeof search["thema"] === "string" ? { thema: search["thema"] } : {},
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kontakt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: CONTACT.company,
          telephone: "+49 6039 45458",
          email: CONTACT.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: CONTACT.street,
            postalCode: CONTACT.zip,
            addressLocality: CONTACT.city,
            addressCountry: "DE",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: CONTACT.geo.lat,
            longitude: CONTACT.geo.lng,
          },
        }),
      },
    ],
  }),
  component: KontaktPage,
});

const DANACH = [
  "Rückmeldung in der Regel innerhalb eines Werktages",
  "30 Minuten Gespräch, kostenlos und unverbindlich",
  "danach ein konkreter Vorschlag oder eine ehrliche Absage",
];

function KontaktPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Kontakt" }]}
        eyebrow="Erstgespräch"
        title="Kontakt und Erstgespräch"
        lead="Schreiben Sie mir kurz, worum es geht — oder rufen Sie einfach an. Sie erreichen mich direkt."
      />

      <div className="container-page section-y grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="rounded-lg border border-ink-200 bg-card p-6 shadow-soft sm:p-8">
            <h2 className="h3-display font-sans">Ihre Nachricht</h2>
            <div className="mt-6">
              <KontaktFormular thema={Route.useSearch().thema} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-6">
            <aside className="rounded-lg bg-bordeaux-900 p-8 text-paper/85">
              <h2 className="font-serif text-[24px] font-semibold text-paper">{CONTACT.person}</h2>
              <p className="mt-1">{CONTACT.company}</p>
              <p className="mt-4">
                Sie erreichen mich direkt — kein Sekretariat, keine Warteschleife.
              </p>
              <ul role="list" className="mt-6 space-y-3 text-[17px]">
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="flex items-center gap-3 hover:text-brass-400"
                  >
                    <Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.mobileHref}
                    className="flex items-center gap-3 hover:text-brass-400"
                  >
                    <Smartphone className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    {CONTACT.mobileDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 hover:text-brass-400"
                  >
                    <Mail className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
              <address className="mt-6 text-[15px] not-italic text-paper/70">
                {CONTACT.street}
                <br />
                {CONTACT.zip} {CONTACT.city}
              </address>
            </aside>
            <KontaktOrganisation />

            <section
              aria-labelledby="danach-title"
              className="rounded-lg border border-ink-200 bg-ink-100 p-7"
            >
              <h2 id="danach-title" className="font-sans text-[19px] font-semibold text-ink-900">
                Was danach passiert
              </h2>
              <ol role="list" className="mt-4 space-y-3 text-ink-700">
                {DANACH.map((d, i) => (
                  <li key={d} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brass-600 text-[13px] font-semibold text-paper"
                    >
                      {i + 1}
                    </span>
                    {d}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Reveal>
      </div>
    </>
  );
}
