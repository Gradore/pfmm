import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { RechtsHinweis } from "@/components/site/RechtsHinweis";
import { CONTACT } from "@/lib/site";

const DESC =
  "Impressum der Praxis für Marketing & Motivation, Erich Grikscheit, Max-Planck-Str. 27, 61184 Karben — Angaben gemäß § 5 DDG.";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | Praxis für Marketing & Motivation" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Impressum | Praxis für Marketing & Motivation" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/impressum" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: Page,
});

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mt-12 font-serif text-[26px] font-semibold text-bordeaux-900">
      {children}
    </h2>
  );
}

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Impressum" }]}
        eyebrow="Rechtliches"
        title="Impressum"
        lead="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
      />

      <div className="container-page">
        <Reveal>
          <div className="max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
            <H2 id="anbieter">Angaben gemäß § 5 DDG</H2>
            <address className="mt-4 space-y-1 not-italic">
              <span className="block font-semibold text-ink-900">Erich Grikscheit</span>
              <span className="block">Praxis für Marketing &amp; Motivation</span>
              <span className="block">Max-Planck-Str. 27</span>
              <span className="block">61184 Karben</span>
              <span className="mt-3 block">
                Telefon:{" "}
                <a
                  href={CONTACT.phoneHref}
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  0 60 39 / 45 45 8
                </a>
              </span>
              <span className="block">
                Mobil:{" "}
                <a
                  href={CONTACT.mobileHref}
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  0170 46 33 088
                </a>
              </span>
              <span className="block">
                E-Mail:{" "}
                <a
                  href="mailto:info@pfmm.de"
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  info@pfmm.de
                </a>
              </span>
            </address>

            <H2 id="umsatzsteuer">Umsatzsteuer</H2>
            <p className="mt-4">
              Finanzamt Friedberg/Hessen
              <br />
              Steuernummer 16 822 602 68
              <br />
              Umsatzsteuer-Identifikationsnummer: DE112221468
            </p>

            <H2 id="verantwortlich">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H2>
            <p className="mt-4">Erich Grikscheit, Max-Planck-Str. 27, 61184 Karben</p>

            <H2 id="haftung-inhalte">Haftung für eigene Inhalte</H2>
            <p className="mt-4">
              Die Inhalte dieser Website wurden sorgfältig und nach bestem Gewissen erstellt.
              Gleichwohl kann für die Aktualität, Vollständigkeit und Richtigkeit sämtlicher Seiten
              keine Gewähr übernommen werden. Gemäß § 7 Abs. 1 DDG bin ich als Diensteanbieter für
              eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
              den §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen. Ab dem Zeitpunkt
              der Kenntnis einer konkreten Rechtsverletzung entferne ich diese Inhalte umgehend.
              Eine Haftung ist erst ab dem Zeitpunkt der Kenntniserlangung möglich.
            </p>

            <H2 id="haftung-links">Haftung für Links</H2>
            <p className="mt-4">
              Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
              Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
              Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren zu
              diesem Zeitpunkt nicht erkennbar. Eine dauerhafte inhaltliche Kontrolle der verlinkten
              Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Werde
              ich auf Rechtsverletzungen aufmerksam, entferne ich die betreffenden Links umgehend.
            </p>

            <H2 id="urheberrecht">Urheberrecht</H2>
            <p className="mt-4">
              Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen
              Urheberrecht. Jede Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner vorherigen
              schriftlichen Zustimmung.
            </p>

            <H2 id="streitbeilegung">Streitbeilegung</H2>
            <p className="mt-4">
              Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <RechtsHinweis />
          </div>
        </Reveal>
      </div>
    </>
  );
}
