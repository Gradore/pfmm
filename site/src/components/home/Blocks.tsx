import { Link } from "@tanstack/react-router";
import { ChevronRight, Download } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { PRAXISBRIEFE, SEMINARE, THEMEN } from "@/lib/site";
import { freiePlaetze, zeitraumLang, type Termin } from "@/lib/buchung";
import { KontaktOrganisation } from "@/components/site/KontaktOrganisation";
import { OFFENE_SEMINARE } from "@/data/offene-seminare";

export function ThemenGrid() {
  return (
    <section className="section-y bg-ink-100" aria-labelledby="themen-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-bordeaux-600">Themen</p>
          <h2 id="themen-title" className="h2-display mt-3">
            Woran wir gemeinsam arbeiten
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <Link to="/leistungen/inhouse" className="mt-8 flex min-h-24 flex-wrap items-center justify-between gap-4 rounded-lg border-l-4 border-brass-600 bg-bordeaux-900 p-6 text-paper shadow-soft">
            <span><strong className="block font-serif text-[24px]">Inhouse-Trainings</strong><span className="mt-1 block text-paper/85">Bei Ihnen im Haus, auf Ihre Aufgabe zugeschnitten.</span></span>
            <span className="font-semibold text-brass-400">Inhouse entdecken →</span>
          </Link>
        </Reveal>
        <ul role="list" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEMEN.map((t, i) => (
            <Reveal as="li" key={t.label} delay={(i % 3) * 60}>
              <Link
                to={t.to}
                className="flex min-h-14 items-center justify-between gap-3 rounded-lg border border-ink-200 bg-card px-5 py-3 text-[16px] font-semibold text-ink-900 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brass-600 hover:text-brass-700"
              >
                {t.label}
                <ChevronRight className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function OffeneSeminareBand() {
  return <section className="section-y bg-card" aria-labelledby="offene-seminare-title"><div className="container-page"><h2 id="offene-seminare-title" className="h2-display">Offene Seminare</h2><ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{OFFENE_SEMINARE.map(({ name, seminar, dauer }) => <li key={name}>{seminar ? <Link to="/leistungen/seminare/$slug" params={{ slug: seminar.slug }} className="flex h-full items-center justify-between gap-3 rounded-lg border border-ink-200 p-4 text-ink-900 hover:border-brass-600"><span>{name}</span><span className="shrink-0 text-[13px] text-ink-500">{dauer}</span></Link> : <div className="flex h-full items-center justify-between gap-3 rounded-lg border border-ink-200 p-4 text-ink-700"><span>{name}</span><span className="shrink-0 text-[13px] text-ink-500">{dauer}</span></div>}</li>)}</ul></div></section>;
}

export function NaechsterTermin({ termin }: { termin?: Termin | null }) {
  const s = (termin && SEMINARE.find((x) => x.slug === termin.seminar_slug)) ??
    SEMINARE.find((x) => x.isOpenDate) ??
    SEMINARE[0];
  if (!s) return null;
  const datum = termin ? zeitraumLang(termin.start_datum, termin.end_datum) : s.dateLabel;
  const frei = termin ? freiePlaetze(termin) : null;
  return (
    <section className="section-y" aria-labelledby="termin-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-bordeaux-600">Nächster offener Termin</p>
        </Reveal>
        <Reveal delay={80}>
          <article className="mt-6 grid overflow-hidden rounded-lg border border-ink-200 shadow-soft md:grid-cols-[minmax(220px,300px)_1fr]">
            <div className="flex flex-col justify-center bg-bordeaux-700 p-8 text-paper">
              <p className="font-serif text-[30px] leading-tight font-semibold">{datum}</p>
              <p className="mt-2 text-brass-400">{s.durationLabel}</p>
              {frei !== null && (
                <p className="mt-3 text-[16px] font-semibold text-paper">
                  {frei === 0
                    ? "Ausgebucht — Warteliste möglich"
                    : frei === 1
                      ? "Noch 1 Platz frei"
                      : `Noch ${frei} von ${termin?.plaetze_gesamt ?? 0} Plätzen frei`}
                </p>
              )}
            </div>
            <div className="bg-card p-8">
              <h2 id="termin-title" className="h3-display font-sans">
                {s.title}
              </h2>
              <p className="mt-1 text-ink-500">{s.subtitle}</p>
              <p className="mt-4 max-w-[68ch] text-ink-700">{s.lead}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button asChild variant="brass" size="lg">
                  <Link to="/leistungen/seminare/$slug" params={{ slug: s.slug }}>
                    {termin ? "Platz verbindlich buchen" : "Termin anfragen"}
                  </Link>
                </Button>
                <a
                  href={s.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[16px] font-semibold text-brass-700 underline underline-offset-4"
                >
                  <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  Programm als PDF{s.pdfSize ? ` (${s.pdfSize})` : ""}
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function PraxisbriefeTeaser() {
  return (
    <section className="section-y bg-ink-100" aria-labelledby="briefe-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-bordeaux-600">Praxisbriefe</p>
          <h2 id="briefe-title" className="h2-display mt-3 max-w-[24ch]">
            Alle sechs Wochen ein Denkanstoß
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PRAXISBRIEFE.slice(0, 3).map((b, i) => (
            <Reveal key={b.slug} delay={i * 90}>
              <article className="flex h-full flex-col rounded-lg border border-ink-200 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <p className="eyebrow text-ink-500">{b.month}</p>
                <h3 className="mt-3 font-serif text-[24px] font-semibold text-bordeaux-900">
                  {b.title}
                </h3>
                <p className="mt-3 flex-1 text-[16px] text-ink-700">{b.teaser}</p>
                <Link
                  to="/praxisbriefe/$slug"
                  params={{ slug: b.slug }}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-brass-700"
                >
                  Lesen <span aria-hidden="true">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <Link
            to="/praxisbriefe"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-brass-700 underline underline-offset-4"
          >
            Alle acht Praxisbriefe ansehen <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-bordeaux-700 py-20 text-paper">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-paper/10 to-transparent"
        style={{ animation: "pfmm-sheen 14s ease-in-out infinite alternate" }}
      />
      <blockquote className="container-page relative text-center">
        <p className="quote-text mx-auto max-w-[24ch] text-[26px] md:text-[34px]">
          „Das Gespräch ist der entscheidende Weg zum Dialog und zur Wertschätzung.“
        </p>
        <footer className="eyebrow mt-6 text-brass-400">— Erich Grikscheit</footer>
      </blockquote>
    </section>
  );
}

export function UeberMichTeaser() {
  return (
    <section className="section-y" aria-labelledby="ueber-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative rounded-2xl bg-ink-100 p-6">
            {/* TODO: durch lokal optimiertes WebP ersetzen */}
            <img
              src="https://www.pfmm.de/home/grikscheit_frei_ausschnitt.png"
              alt="Erich Grikscheit, Trainer und Berater der Praxis für Marketing und Motivation"
              width={520}
              height={620}
              loading="lazy"
              className="mx-auto w-full max-w-sm rounded-xl object-cover"
            />
            <span className="absolute right-6 bottom-6 flex size-20 flex-col items-center justify-center rounded-full bg-brass-600 font-serif text-[22px] font-semibold text-paper">
              30
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <p className="eyebrow text-bordeaux-600">Über mich</p>
            <h2 id="ueber-title" className="h2-display mt-3">
              Erst die Praxis. Dann die Frage, warum sie funktioniert.
            </h2>
            <p className="mt-5 max-w-[68ch] text-ink-700">
              Ich habe dreißig Jahre im Vertrieb und Marketing gearbeitet, bevor ich
              angefangen habe, andere auszubilden. Was dabei half, war nicht die nächste Technik,
              sondern die Frage, was hinter einer Entscheidung steht — die Frage der Philosophie.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Akademie für Marketing und Kommunikation, Frankfurt",
                "Langjähriges philosophisches Studium, Ausbildung in Individualpsychologie",
                "30 Jahre Vertrieb und Marketing, danach Trainer und Berater",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-700">
                  <span aria-hidden="true" className="mt-1 font-semibold text-brass-700">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Vorträge", "Podcast", "Leitfäden"].map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-ink-200 px-4 py-1.5 text-[14px] font-semibold text-ink-500"
                >
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-6"><KontaktOrganisation /></div>
            <Button asChild variant="brass" size="lg" className="mt-8">
              <Link to="/ueber-mich">Mehr über mich</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StimmenPlaceholder() {
  return (
    <section className="section-y bg-ink-100" aria-labelledby="stimmen-title">
      <div className="container-page">
        <Reveal>
          <h2 id="stimmen-title" className="h2-display">
            Stimmen
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="h-full rounded-lg border-2 border-dashed border-ink-200 p-7 text-ink-500">
                <p className="quote-text text-ink-500">„ … “</p>
                <p className="mt-6 text-[14px]">
                  Platzhalter — Teilnehmerstimmen werden derzeit eingeholt.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
