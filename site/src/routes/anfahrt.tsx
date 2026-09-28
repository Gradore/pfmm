import { createFileRoute } from "@tanstack/react-router";
import { Bus, Car, MapPin } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { KarteConsent } from "@/components/site/KarteConsent";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";

const title = "Anfahrt nach Karben bei Frankfurt | Erich Grikscheit";
const description =
  "So finden Sie zur Praxis für Marketing & Motivation: Max-Planck-Str. 27, 61184 Karben — mit dem Auto über B3 oder A5, mit der S6 bis Bahnhof Groß-Karben.";

export const Route = createFileRoute("/anfahrt")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/anfahrt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/anfahrt" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Anfahrt" }]}
        eyebrow="Karben bei Frankfurt"
        title="Anfahrt nach Karben"
        lead="Die Praxis liegt rund zwanzig Autominuten nördlich von Frankfurt am Main."
      />

      <div className="container-page section-y">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <section
              aria-labelledby="adresse-title"
              className="h-full rounded-lg border border-ink-200 bg-card p-8 shadow-soft"
            >
              <MapPin className="size-8 text-bordeaux-600" strokeWidth={1.5} aria-hidden="true" />
              <h2 id="adresse-title" className="h3-display mt-4 font-sans">
                Adresse
              </h2>
              <address className="mt-4 text-[18px] leading-[1.65] text-ink-700 not-italic">
                {CONTACT.person}
                <br />
                {CONTACT.company}
                <br />
                {CONTACT.street}
                <br />
                {CONTACT.zip} {CONTACT.city}
              </address>
              <p className="mt-5">
                <a
                  href={CONTACT.phoneHref}
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </p>
            </section>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={90}>
              <section
                aria-labelledby="auto-title"
                className="rounded-lg border border-ink-200 bg-card p-8 shadow-soft"
              >
                <Car className="size-8 text-bordeaux-600" strokeWidth={1.5} aria-hidden="true" />
                <h2 id="auto-title" className="h3-display mt-4 font-sans">
                  Mit dem Auto
                </h2>
                <p className="mt-4 max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
                  Wenn Sie aus Richtung Frankfurt oder Friedberg kommen, gelangen Sie am schnellsten
                  über die B3 zu mir nach Karben. Aus Richtung Gießen kommend, erreichen Sie Karben
                  am besten über die A5.
                </p>
              </section>
            </Reveal>

            <Reveal delay={160}>
              <section
                aria-labelledby="oepnv-title"
                className="rounded-lg border border-ink-200 bg-card p-8 shadow-soft"
              >
                <Bus className="size-8 text-bordeaux-600" strokeWidth={1.5} aria-hidden="true" />
                <h2 id="oepnv-title" className="h3-display mt-4 font-sans">
                  Mit öffentlichen Verkehrsmitteln
                </h2>
                <p className="mt-4 max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
                  Die S-Bahn-Linie S6 in Richtung Groß-Karben/Friedberg bringt Sie direkt zum
                  Bahnhof Groß-Karben. Von dort sind es etwa 15 Minuten Fußweg bis zu meiner Praxis.
                  Von Königstein nach Karben über den Bahnhof Groß-Karben fährt der Schnellbus 260.
                  Von Bad Vilbel nach Karben über den Bahnhof Groß-Karben gelangen Sie mit der
                  Buslinie FB-74.
                </p>
              </section>
            </Reveal>
          </div>
        </div>

        <section className="mt-16" aria-labelledby="karte-title">
          <Reveal>
            <h2 id="karte-title" className="h2-display">
              Karte
            </h2>
            <div className="mt-6">
              <KarteConsent />
            </div>
          </Reveal>
        </section>

        <CtaBand text="Sie möchten vorbeikommen? Vereinbaren wir vorher ein kurzes Gespräch — kostenlos und unverbindlich." />
      </div>
    </>
  );
}
