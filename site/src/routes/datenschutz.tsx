import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { RechtsHinweis } from "@/components/site/RechtsHinweis";
import { Button } from "@/components/ui/button";
import { openConsentSettings } from "@/lib/consent";

const DESC =
  "Informationen gemäß Art. 13 DSGVO zur Verarbeitung personenbezogener Daten auf pfmm.de — Logfiles, Kontaktformular, Praxisbrief, Matomo, Karte und Ihre Rechte.";

const TOC = [
  { id: "verantwortlicher", label: "1. Verantwortlicher" },
  { id: "erhebung", label: "2. Erhebung personenbezogener Daten" },
  { id: "logfiles", label: "3. Server-Logfiles und Hosting" },
  { id: "kontakt", label: "4. Kontaktaufnahme" },
  { id: "seminaranmeldungen", label: "5. Seminaranmeldungen" },
  { id: "praxisbrief", label: "6. Praxisbrief" },
  { id: "matomo", label: "7. Web-Analyse mit Matomo" },
  { id: "karte", label: "8. Kartendarstellung" },
  { id: "rechte", label: "9. Ihre Rechte" },
];

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung | Praxis für Marketing & Motivation" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Datenschutzerklärung | Praxis für Marketing & Motivation" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/datenschutz" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: Page,
});

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-28 font-serif text-[26px] font-semibold text-bordeaux-900"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: string }) {
  return (
    <h3 className="mt-8 font-serif text-[21px] font-semibold text-bordeaux-900">{children}</h3>
  );
}

function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Datenschutz" }]}
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        lead="Informationen gemäß Art. 13 DSGVO: Welche personenbezogenen Daten auf dieser Website verarbeitet werden, zu welchem Zweck, auf welcher Rechtsgrundlage — und welche Rechte Sie haben."
      />

      <div className="container-page">
        <Reveal>
          <nav
            aria-labelledby="toc-title"
            className="mt-12 max-w-[68ch] rounded-lg border border-ink-200 bg-ink-100 p-7"
          >
            <h2 id="toc-title" className="eyebrow text-bordeaux-600">
              Inhalt dieser Seite
            </h2>
            <ul role="list" className="mt-4 space-y-2 text-[17px]">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="font-semibold text-brass-700 underline underline-offset-4"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal delay={80}>
          <div className="max-w-[68ch] text-[18px] leading-[1.65] text-ink-700">
            <H2 id="verantwortlicher">1. Verantwortlicher</H2>
            <p className="mt-4">Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
            <address className="mt-4 space-y-1 not-italic">
              <span className="block font-semibold text-ink-900">Erich Grikscheit</span>
              <span className="block">Praxis für Marketing &amp; Motivation</span>
              <span className="block">Max-Planck-Str. 27, 61184 Karben</span>
              <span className="block">
                Telefon:{" "}
                <a
                  href="tel:+49603945458"
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  06039 45458
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

            <H2 id="erhebung">2. Erhebung personenbezogener Daten</H2>
            <p className="mt-4">
              Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, zum
              Beispiel Name, Anschrift, E-Mail-Adresse oder Nutzungsverhalten. Ich erhebe solche
              Daten nur, soweit es für den jeweiligen Zweck erforderlich ist, und verarbeite sie
              ausschließlich im Rahmen der geltenden Vorschriften.
            </p>

            <H2 id="logfiles">3. Server-Logfiles und Hosting</H2>
            <p className="mt-4">
              Beim Aufruf dieser Website werden automatisch Daten in sogenannten Server-Logfiles
              gespeichert, die Ihr Browser übermittelt:
            </p>
            <ul role="list" className="mt-4 list-disc space-y-1 pl-6">
              <li>IP-Adresse in gekürzter Form</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Seite</li>
              <li>Referrer, also die zuvor besuchte Seite</li>
              <li>verwendeter Browser und Betriebssystem</li>
            </ul>
            <H3>Zweck und Rechtsgrundlage</H3>
            <p className="mt-4">
              Diese Daten dienen dem sicheren und stabilen Betrieb der Website, dem
              Verbindungsaufbau sowie der Aufklärung technischer Störungen und missbräuchlicher
              Zugriffe. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse
              liegt in einem sicheren und funktionsfähigen Internetauftritt.
            </p>
            <H3>Speicherdauer und Auftragsverarbeitung</H3>
            <p className="mt-4">
              Die Logfiles werden für längstens sieben Tage gespeichert und anschließend gelöscht;
              eine Zusammenführung mit anderen Datenquellen findet nicht statt. Das Hosting erfolgt
              durch einen Dienstleister, der die Daten ausschließlich in meinem Auftrag verarbeitet.
              Mit diesem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.
            </p>

            <H2 id="kontakt">4. Kontaktaufnahme</H2>
            <p className="mt-4">
              Bei Ihrer Kontaktaufnahme per E-Mail oder über das Kontaktformular werden die von
              Ihnen mitgeteilten Daten (E-Mail-Adresse, gegebenenfalls Name und Telefonnummer)
              gespeichert, um Ihre Anfrage zu beantworten. Diese Daten lösche ich, sobald die
              Speicherung nicht mehr erforderlich ist.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage der Anbahnung oder
              Durchführung eines Vertrages dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund
              meines berechtigten Interesses an der Beantwortung von Anfragen.
            </p>

            <H2 id="seminaranmeldungen">5. Seminaranmeldungen</H2>
            <p className="mt-4">
              Wenn Sie sich über diese Website für ein Seminar anmelden, verarbeite ich die von
              Ihnen angegebenen Daten: Vor- und Nachname, E-Mail-Adresse, gegebenenfalls
              Unternehmen, Funktion, Anschrift und Telefonnummer, die Zahl der gebuchten Plätze,
              Ihre Nachricht sowie Ihre Bestätigung der Datenschutz- und Stornobedingungen. Diese
              Angaben benötige ich, um Ihren Platz zu vergeben, die Teilnahme zu bestätigen, die
              Veranstaltung zu organisieren und die Teilnahme abzurechnen.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
              Maßnahmen und Erfüllung des Teilnahmevertrages). Ihre Anmeldedaten werden in einer
              Datenbank innerhalb der Europäischen Union gespeichert. Zugriff hat allein die
              Seminarverwaltung der Praxis für Marketing &amp; Motivation über einen mit Passwort
              geschützten, nicht öffentlichen Bereich. Zur Versendung der Anmeldebestätigung setze
              ich einen E-Mail-Versanddienst als Auftragsverarbeiter nach Art. 28 DSGVO ein.
            </p>
            <p className="mt-4">
              Anmeldedaten lösche ich, sobald sie für die Durchführung nicht mehr benötigt werden;
              handels- und steuerrechtliche Aufbewahrungsfristen (in der Regel sechs bzw. zehn
              Jahre nach Art. 6 Abs. 1 lit. c DSGVO) bleiben unberührt. Eine Weitergabe an Dritte
              zu Werbezwecken findet nicht statt.
            </p>
            <p className="mt-4">
              Die Daten der Teilnehmerinnen und Teilnehmer werden gelöscht, sobald das Seminar
              stattgefunden hat und die gesetzlichen Aufbewahrungsfristen abgelaufen sind.
            </p>

            <H2 id="praxisbrief">6. Praxisbrief</H2>
            <p className="mt-4">
              Bei der Anmeldung zum Praxisbrief wird Ihre E-Mail-Adresse gespeichert, bis Sie sich
              vom weiteren Empfang abmelden. Die Abmeldung ist jederzeit über den Abmeldelink in
              jeder Ausgabe möglich. Für den Versand benötige ich eine gültige E-Mail-Adresse sowie
              eine Bestätigung, dass Sie deren Inhaber sind (Double-Opt-in-Verfahren). Dafür speichere ich vorübergehend einen Bestätigungs-Token. Zur Dokumentation des Widerrufs wird die Adresse als abgemeldet markiert. Weitere Daten
              werden nicht erhoben.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können
              diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3
              DSGVO) — durch den Abmeldelink oder formlos an{" "}
              <a
                href="mailto:info@pfmm.de"
                className="font-semibold text-brass-700 underline underline-offset-4"
              >
                info@pfmm.de
              </a>
              . Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
            </p>

            <H2 id="matomo">7. Web-Analyse mit Matomo</H2>
            <p className="mt-4">
              Diese Website nutzt die Open-Source-Software Matomo zur statistischen Auswertung der
              Besuche. Matomo wird selbst gehostet und läuft auf einem Server in Deutschland; die
              erhobenen Daten werden nicht an Dritte weitergegeben. Es kommt die Erweiterung
              „AnonymizeIP“ zum Einsatz, sodass IP-Adressen ausschließlich gekürzt verarbeitet
              werden und ein Rückschluss auf Ihre Person nicht möglich ist.
            </p>
            <H3>Cookies</H3>
            <p className="mt-4">
              Matomo setzt hierfür Cookies, also kleine Textdateien, die auf Ihrem Endgerät
              gespeichert werden und wiederkehrende Besuche unterscheidbar machen. Diese Cookies
              werden erst gesetzt, nachdem Sie im Einwilligungsbanner zugestimmt haben. Ohne Ihre
              Zustimmung findet keine Analyse statt. Rechtsgrundlage der Auswertung ist Art. 6 Abs.
              1 lit. f DSGVO — mein berechtigtes Interesse an einer bedarfsgerechten Gestaltung
              dieser Website.
            </p>
            <H3>Widerspruch (Opt-out)</H3>
            <p className="mt-4">
              Sie können Ihre Entscheidung jederzeit ändern und die Web-Analyse abschalten:
            </p>
            <Button
              variant="brass"
              size="lg"
              className="mt-4"
              onClick={() => openConsentSettings()}
            >
              Cookie-Einstellungen öffnen
            </Button>
            {/* Slot für das Matomo-Opt-out-iframe — wird eingesetzt, sobald die Matomo-Instanz steht. */}
            <div
              id="matomo-optout"
              data-matomo-optout-slot="true"
              className="mt-6 empty:hidden"
              aria-live="polite"
            />

            <H2 id="karte">8. Kartendarstellung</H2>
            <p className="mt-4">
              Auf der Seite „Anfahrt“ kann eine Karte von OpenStreetMap (OpenStreetMap Foundation,
              St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, Vereinigtes Königreich)
              angezeigt werden. Die Karte wird ausschließlich nach Ihrer ausdrücklichen Zustimmung
              geladen (Zwei-Klick-Lösung). Vor Ihrer Zustimmung werden keinerlei Daten an den
              Kartenanbieter übertragen. Erst mit dem Laden der Karte wird Ihre IP-Adresse an
              OpenStreetMap übermittelt. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1
              lit. a DSGVO, widerruflich nach Art. 7 Abs. 3 DSGVO.
            </p>

            <H2 id="rechte">9. Ihre Rechte</H2>
            <p className="mt-4">Sie haben jederzeit das Recht auf</p>
            <ul role="list" className="mt-4 list-disc space-y-1 pl-6">
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Wenden Sie sich dafür formlos an{" "}
              <a
                href="mailto:info@pfmm.de"
                className="font-semibold text-brass-700 underline underline-offset-4"
              >
                info@pfmm.de
              </a>
              .
            </p>
            <H3>Beschwerderecht bei der Aufsichtsbehörde</H3>
            <p className="mt-4">
              Unabhängig davon können Sie sich nach Art. 77 DSGVO bei einer Aufsichtsbehörde
              beschweren. Zuständig ist:
            </p>
            <address className="mt-4 space-y-1 not-italic">
              <span className="block">Der Hessische Beauftragte für Datenschutz</span>
              <span className="block">und Informationsfreiheit</span>
              <span className="block">Postfach 3163</span>
              <span className="block">65021 Wiesbaden</span>
            </address>

            <RechtsHinweis />
          </div>
        </Reveal>
      </div>
    </>
  );
}
