import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { ReferenzGalerie } from "@/components/site/ReferenzGalerie";
import { Reveal } from "@/components/site/Reveal";

const title = "Konzeptentwicklung — Kundendialog, der trägt | Grikscheit";
const description =
  "Prospekte, Internetauftritte, Verkaufsförderung: Ich entwickle, texte, gestalte und setze Konzepte für einen Kundendialog um, der langfristige Kundenbindung schafft.";

export const Route = createFileRoute("/leistungen/konzepte")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/konzepte" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/konzepte" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Leistungen", to: "/leistungen" }, { label: "Konzeptentwicklung" }]}
        eyebrow="Konzepte"
        title="Konzeptentwicklung — Kundendialog, der trägt"
      />

      <div className="container-page section-y">
        <Reveal>
          <p className="max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
            Kreative Wege zu Kunden und Interessenten zu finden sind Aufgaben, die ich für meine
            Auftraggeber entwickle, texte, gestalte und umsetze. Dazu gehören zum Beispiel
            Prospektfolder, Internetauftritte, Prospekte für Verkaufsaktionen sowie Mittel und
            Maßnahmen für Verkaufsförderungsaktionen. Auf diese Weise sorge ich für einen
            erfolgreichen Kundendialog, um langfristige Kundenbindungen zu erzielen. Dazu definiere
            ich mit meinen Auftraggebern die gewünschten Ziele.
          </p>
        </Reveal>

        <section className="mt-16" aria-labelledby="referenzen-title">
          <Reveal>
            <h2 id="referenzen-title" className="h2-display">
              Referenzen aus der Arbeit
            </h2>
            <p className="mt-4 max-w-[68ch] text-ink-700">
              Ein Auszug aus Arbeiten der vergangenen Jahre. Klicken Sie ein Beispiel an, um es
              vergrößert zu betrachten.
            </p>
          </Reveal>
          <ReferenzGalerie />
          <Reveal delay={120}>
            <p className="mt-8 max-w-[68ch] text-[16px] text-ink-500">
              Die Referenzen werden derzeit mit Kunde, Aufgabe und Ergebnis beschriftet.
            </p>
          </Reveal>
        </section>

        <CtaBand text="Sie planen einen neuen Kundendialog? Dreißig Minuten Gespräch, kostenlos und unverbindlich." />
      </div>
    </>
  );
}
