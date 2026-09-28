import { Link } from "@tanstack/react-router";
import {
  ArrowUp,
  CalendarDays,
  Clock,
  Download,
  Euro,
  FileText,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { ProgrammAccordion } from "@/components/seminar/ProgrammAccordion";
import { SeminarMotiv } from "@/components/seminar/SeminarMotiv";
import { SeminarAnmeldung } from "@/components/buchung/SeminarAnmeldung";
import {
  MWST_SUFFIX,
  preisLabel,
  relatedSeminare,
  zeitenLabel,
  type Seminar,
} from "@/data/seminare";
import { CONTACT } from "@/lib/site";
import { zeitraumLang, type Termin } from "@/lib/buchung";
import { cn } from "@/lib/utils";
import { KontaktOrganisation } from "@/components/site/KontaktOrganisation";

/** Vollständige Seminardetailseite — einheitliches Layout für alle Seminare. */
export function SeminarDetail({
  seminar,
  termine = [],
}: {
  seminar: Seminar;
  termine?: Termin[];
}) {
  const verwandte = relatedSeminare(seminar);
  const preis = preisLabel(seminar);
  const hatProgramm = seminar.programme.length > 0;
  const zeiten = zeitenLabel(seminar);
  const buchbar = termine.filter((t) => t.status !== "abgesagt");
  const hatTermin = buchbar.length > 0;
  const terminLabel = hatTermin
    ? zeitraumLang(buchbar[0]!.start_datum, buchbar[0]!.end_datum)
    : seminar.dateLabel;
  const ctaZiel = "#termine";
  const ctaText = hatTermin ? "Platz verbindlich buchen" : "Termin anfragen";

  const fakten = [
    { icon: CalendarDays, label: terminLabel },
    { icon: Clock, label: seminar.durationLabel },
    { icon: Users, label: seminar.groupLabel },
    { icon: MapPin, label: seminar.locationLabel },
    {
      icon: Euro,
      label: seminar.priceEur === null ? seminar.priceNote : `${preis} ${MWST_SUFFIX}`,
    },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Leistungen", to: "/leistungen" },
          { label: "Offene Seminare", to: "/leistungen/seminare" },
          { label: seminar.title },
        ]}
      />

      {/* Hero */}
      <header className="container-page grid gap-10 pt-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <Reveal className="min-w-0">
          <p className="eyebrow text-bordeaux-600">{seminar.eyebrow}</p>
          <h1
            className="h1-display mt-3 max-w-[24ch] hyphens-auto break-words text-ink-900"
            lang="de"
          >
            {seminar.h1}
          </h1>
          <p className="mt-3 font-serif text-[21px] text-bordeaux-700">{seminar.subtitle}</p>
          <p className="lead-text mt-6 max-w-[68ch] text-ink-700">{seminar.lead}</p>

          <ul role="list" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {fakten.map((f) => (
              <li key={f.label} className="flex items-center gap-2 text-[16px] text-ink-700">
                <f.icon className="size-5 text-brass-700" strokeWidth={1.5} aria-hidden="true" />
                {f.label}
              </li>
            ))}
          </ul>

          {seminar.honorarModell && (
            <p className="mt-4 text-[16px] text-ink-700">
              <Link
                to="/honorare"
                className="font-semibold text-brass-700 underline underline-offset-4"
              >
                Honorar nach Format, siehe Honorarübersicht
              </Link>
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="brass" size="lg">
              <a href={ctaZiel}>{ctaText} →</a>
            </Button>
            {hatProgramm && (
              <Button asChild variant="ghostBrand" size="lg">
                <a href="#programm">Programm ansehen</a>
              </Button>
            )}
          </div>
        </Reveal>

        <SeminarMotiv seminar={seminar.slug} />
      </header>

      {/* Inhalt + klebende Buchungsspalte */}
      <div className="container-page grid gap-12 pt-16 pb-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          {/* Darum geht es */}
          {seminar.intro.length > 0 && (
            <Reveal as="section" className="scroll-mt-24">
              <h2 className="h2-display">Darum geht es</h2>
              <div className="mt-5 max-w-[68ch] space-y-4 text-[18px] leading-[1.65] text-ink-700">
                {seminar.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {seminar.quote && (
                <figure className="mt-8 max-w-[62ch] border-l-4 border-brass-600 pl-6">
                  <blockquote className="font-serif text-[24px] leading-[1.45] text-bordeaux-900 italic">
                    „{seminar.quote.text}“
                  </blockquote>
                  {seminar.quote.source && (
                    <figcaption className="mt-3 text-[15px] text-ink-500">
                      — {seminar.quote.source}
                    </figcaption>
                  )}
                </figure>
              )}
            </Reveal>
          )}

          {/* Programm */}
          {hatProgramm && (
            <section id="programm" className="mt-16 scroll-mt-24">
              <Reveal>
                <h2 className="h2-display">Das Programm</h2>
                <p className="mt-4 max-w-[68ch] text-ink-700">
                  {seminar.durationFilter
                    ? "Wählen Sie den Umfang — das Programm passt sich an."
                    : "Alle Bausteine im Überblick. Klicken Sie einen Block an, um die Inhalte zu lesen."}
                </p>
              </Reveal>
              <ProgrammAccordion seminar={seminar} />
            </section>
          )}

          {/* Zentrale Inhalte */}
          {seminar.zentraleInhalte && seminar.zentraleInhalte.length > 0 && (
            <Reveal as="section" className="mt-16">
              <h2 className="h2-display">Zentrale Inhalte</h2>
              <ul role="list" className="mt-6 grid max-w-[80ch] gap-3 sm:grid-cols-2">
                {seminar.zentraleInhalte.map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 rounded-lg border border-ink-200 bg-card p-4 text-[17px] leading-[1.55] text-ink-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brass-600"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Fließtextabschnitte (Seminare ohne Tagesprogramm) */}
          {seminar.sections?.map((sec) => (
            <Reveal as="section" key={sec.heading} className="mt-16">
              <h2 className="h2-display">{sec.heading}</h2>
              {sec.ordered ? (
                <ol
                  role="list"
                  className="mt-5 max-w-[68ch] list-decimal space-y-3 pl-6 text-[18px] leading-[1.65] text-ink-700 marker:font-serif marker:font-semibold marker:text-bordeaux-700"
                >
                  {sec.body.map((t) => (
                    <li key={t.slice(0, 40)}>{t}</li>
                  ))}
                </ol>
              ) : (
                <div className="mt-5 max-w-[68ch] space-y-4 text-[18px] leading-[1.65] text-ink-700">
                  {sec.body.map((t) => (
                    <p key={t.slice(0, 40)}>{t}</p>
                  ))}
                </div>
              )}
            </Reveal>
          ))}

          {/* Hintergrund */}
          {seminar.background && (
            <Reveal as="section" className="mt-16">
              <h2 className="h2-display">{seminar.background.heading}</h2>
              {seminar.background.ordered ? (
                <ol
                  role="list"
                  className="mt-5 max-w-[68ch] list-decimal space-y-3 pl-6 text-[18px] leading-[1.65] text-ink-700 marker:font-serif marker:font-semibold marker:text-bordeaux-700"
                >
                  {seminar.background.body.map((p) => (
                    <li key={p.slice(0, 40)}>{p}</li>
                  ))}
                </ol>
              ) : (
                <div className="mt-5 max-w-[68ch] space-y-4 text-[18px] leading-[1.65] text-ink-700">
                  {seminar.background.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              )}
            </Reveal>
          )}

          {seminar.background2 && (
            <Reveal as="section" className="mt-16">
              <h2 className="h2-display">{seminar.background2.heading}</h2>
              <div className="mt-5 max-w-[68ch] space-y-4 text-[18px] leading-[1.65] text-ink-700">
                {seminar.background2.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
          )}

          {/* Outcomes */}
          {seminar.outcomes.length > 0 && (
            <Reveal as="section" className="mt-16">
              <h2 className="h2-display">Das nehmen Sie mit</h2>
              <ul role="list" className="mt-6 grid max-w-[80ch] gap-3 sm:grid-cols-2">
                {seminar.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex gap-3 rounded-lg border border-ink-200 bg-card p-4 text-[17px] leading-[1.55] text-ink-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brass-600"
                    />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Zielgruppe */}
          {seminar.audience.length > 0 && (
            <Reveal as="section" className="mt-16">
              <h2 className="h2-display">Für wen das Seminar gedacht ist</h2>
              <ul role="list" className="mt-5 max-w-[68ch] space-y-2.5">
                {seminar.audience.map((a) => (
                  <li key={a} className="flex gap-3 text-[18px] leading-[1.65] text-ink-700">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-bordeaux-600"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Organisatorisches */}
          <Reveal as="section" className="mt-16">
            <h2 className="h2-display">Organisatorisches</h2>
            <dl className="mt-6 max-w-[68ch] divide-y divide-ink-200 border-y border-ink-200">
              {seminar.organisation.map((row) => (
                <div key={row.dt} className="grid gap-1 py-3 sm:grid-cols-[200px_1fr]">
                  <dt className="text-[16px] font-semibold text-ink-900">{row.dt}</dt>
                  <dd className="text-[17px] text-ink-700">{row.dd}</dd>
                </div>
              ))}
            </dl>
            {seminar.included.length > 0 && (
              <>
                <h3 className="h3-display mt-10">
                  {seminar.honorarModell ? "Im Honorar enthalten" : "Im Preis enthalten"}
                </h3>
                <ul role="list" className="mt-4 max-w-[68ch] space-y-2.5">
                  {seminar.included.map((inc) => (
                    <li key={inc} className="flex gap-3 text-[17px] text-ink-700">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass-600"
                      />
                      {inc}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-6 text-[15px] text-ink-500">
              {seminar.priceEur !== null ? `Alle Preise netto, ${MWST_SUFFIX} ` : ""}Seminarzeiten:{" "}
              {zeiten}
            </p>
          </Reveal>

          {/* FAQ */}
          {seminar.faq.length > 0 && (
            <Reveal as="section" className="mt-16">
              <h2 className="h2-display">Häufige Fragen</h2>
              <div className="mt-6 max-w-[80ch] space-y-3">
                {seminar.faq.map((f) => (
                  <details key={f.q} className="group rounded-lg border border-ink-200 bg-card p-5">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className="text-brass-700 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.65] text-ink-700">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          )}

          {/* PDF */}
          {seminar.pdfUrl && (
            <Reveal className="mt-12">
              <a
                href={seminar.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-lg border border-ink-200 bg-ink-100 px-5 py-4 text-[17px] font-semibold text-brass-700 transition-colors hover:border-brass-600"
              >
                <FileText className="size-5" strokeWidth={1.5} aria-hidden="true" />
                Seminarbeschreibung als PDF
                {seminar.pdfSize && (
                  <span className="font-normal text-ink-500">({seminar.pdfSize})</span>
                )}
                <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </Reveal>
          )}
        </div>

        {/* Buchungsspalte */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-lg border border-ink-200 bg-card p-6 shadow-soft">
            <p className="eyebrow text-bordeaux-600">Auf einen Blick</p>
            <p className="mt-3 font-serif text-[30px] leading-none font-semibold text-bordeaux-900">
              {preis}
            </p>
            {seminar.priceEur !== null && (
              <>
                <p className="mt-1 text-[14px] text-ink-500">Alle Preise netto, {MWST_SUFFIX}</p>
                <p className="mt-2 text-[13px] text-ink-500">Im Preis enthalten: Seminarleitfaden · Digitale Dokumentation · Seminargetränke.</p>
              </>
            )}
            {seminar.honorarModell && (
              <p className="mt-2 text-[14px] text-ink-500">
                Nach Format und Dauer.{" "}
                <Link
                  to="/honorare"
                  className="font-semibold text-brass-700 underline underline-offset-4"
                >
                  Honorarübersicht
                </Link>
              </p>
            )}

            <dl className="mt-5 space-y-3 border-t border-ink-200 pt-5 text-[15px]">
              {[
                { dt: "Termin", dd: terminLabel },
                { dt: "Dauer", dd: seminar.durationLabel },
                { dt: "Zeiten", dd: zeiten },
                { dt: "Gruppe", dd: seminar.groupLabel },
                { dt: "Ort", dd: seminar.locationLabel },
              ].map((row) => (
                <div key={row.dt} className="flex justify-between gap-4">
                  <dt className="text-ink-500">{row.dt}</dt>
                  <dd className="text-right font-semibold text-ink-900">{row.dd}</dd>
                </div>
              ))}
            </dl>

            <Button asChild variant="brass" size="lg" className="mt-6 w-full">
              <a href={ctaZiel}>{ctaText}</a>
            </Button>

            <div className="mt-6 border-t border-ink-200 pt-5 text-[15px] text-ink-700">
              <p className="font-semibold text-ink-900">Fragen vorab?</p>
              <p className="mt-1">Rufen Sie mich an — Sie sprechen direkt mit mir.</p>
              <a
                href={CONTACT.phoneHref}
                className="mt-3 inline-flex items-center gap-2 font-semibold text-brass-700 hover:text-brass-600"
              >
                <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <div className="mt-5"><KontaktOrganisation /></div>
          </div>
        </aside>
      </div>

      {seminar.voices && seminar.voices.length > 0 && (
        <section className="section-y bg-ink-900" aria-labelledby="stimmen-title">
          <div className="container-page">
            <Reveal>
              <h2 id="stimmen-title" className="h2-display text-paper">
                Stimmen von Teilnehmern
              </h2>
            </Reveal>
            <ul role="list" className="mt-10 grid gap-6 md:grid-cols-3">
              {seminar.voices.map((v, i) => (
                <Reveal as="li" key={v.name} delay={i * 90}>
                  <figure className="flex h-full flex-col rounded-lg border border-paper/15 bg-paper/5 p-6">
                    <div className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((n) => (
                        <Star key={n} className="size-4 fill-brass-400 text-brass-400" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 font-serif text-[18px] leading-[1.55] text-paper/90">
                      „{v.quote}“
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-paper/15 pt-4">
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brass-600 font-serif text-[17px] font-semibold text-paper"
                      >
                        {v.name.charAt(0)}
                      </span>
                      <span className="text-[15px] text-paper/80">
                        <span className="block font-semibold text-paper">{v.name}</span>
                        {v.role}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-paper/60">
              Rückmeldungen aus der Seminardokumentation. Nachnamen auf Wunsch der Teilnehmer
              abgekürzt.
            </p>
          </div>
        </section>
      )}

      <SeminarAnmeldung
        seminarSlug={seminar.slug}
        seminarTitel={seminar.title}
        initialTermine={termine}
      />
      <section className="container-page pb-12" aria-label="Inhouse-Training">
        <div className="border-l-4 border-brass-600 bg-ink-100 p-6 sm:p-8">
          <h2 className="h3-display">Auch als Inhouse-Training buchbar – bei Ihnen im Haus, auf Ihre Aufgabe zugeschnitten</h2>
          <Button asChild variant="brass" size="lg" className="mt-5"><a href="#termine" onClick={() => window.dispatchEvent(new CustomEvent("pfmm:inhouse-anfragen"))}>Inhouse anfragen</a></Button>
        </div>
      </section>

      {/* Verwandte Seminare */}
      {verwandte.length > 0 && (
        <section className="section-y bg-bordeaux-900" aria-labelledby="verwandt-title">
          <div className="container-page">
            <Reveal>
              <h2 id="verwandt-title" className="h2-display text-paper">
                Das könnte ebenfalls passen
              </h2>
            </Reveal>
            <ul role="list" className="mt-10 grid gap-6 md:grid-cols-3">
              {verwandte.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 80}>
                  <article className="flex h-full flex-col rounded-lg border border-paper/15 bg-paper/5 p-6 transition-colors hover:border-brass-400">
                    <p className="text-[14px] text-brass-400">{r.dateLabel}</p>
                    <h3 className="mt-2 font-serif text-[21px] leading-snug font-semibold text-paper">
                      <Link to="/leistungen/seminare/$slug" params={{ slug: r.slug }}>
                        {r.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-paper/75">
                      {r.subtitle}
                    </p>
                    <p className="mt-4 text-[15px] font-semibold text-brass-400">
                      {preisLabel(r)} · {r.durationLabel}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="container-page py-10">
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-[16px] font-semibold text-brass-700 underline underline-offset-4"
        >
          <ArrowUp className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Nach oben
        </a>
      </div>

      {/* Mobile Aktionsleiste — seminarspezifisch */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 grid border-t border-ink-200 bg-background shadow-lift lg:hidden",
          seminar.priceEur !== null ? "grid-cols-[1fr_1.2fr]" : "grid-cols-1",
        )}
      >
        {seminar.priceEur !== null && (
          <div className="flex min-h-14 flex-col justify-center px-4">
            <span className="text-[15px] font-semibold text-ink-900">{preis}</span>
            <span className="text-[12px] text-ink-500">{MWST_SUFFIX}</span>
          </div>
        )}
        <a
          href={ctaZiel}
          className="flex min-h-14 items-center justify-center gap-2 bg-brass-600 text-[17px] font-semibold text-paper"
        >
          {ctaText}
        </a>
      </div>
    </>
  );
}
