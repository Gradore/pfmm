import { Mail, Phone, Smartphone } from "lucide-react";
import { KontaktFormular } from "@/components/site/KontaktFormular";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";
import { KontaktOrganisation } from "@/components/site/KontaktOrganisation";

/** Abschluss-CTA: Formular links, Ansprechpartner rechts. */
export function KontaktSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section className="section-y bg-ink-100" id="kontakt" aria-labelledby="kontakt-title">
      <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div>
            <p className="eyebrow text-bordeaux-600">Erstgespräch</p>
            <Heading id="kontakt-title" className="h2-display mt-3">
              Sie überlegen, ob das passt?
            </Heading>
            <p className="lead-text mt-5 max-w-[68ch] text-ink-700">
              Dreißig Minuten Gespräch, kostenlos und unverbindlich. Danach wissen wir beide, ob wir
              zusammenarbeiten sollten.
            </p>
            <div className="mt-8 rounded-lg border border-ink-200 bg-card p-6 shadow-soft sm:p-8">
              <KontaktFormular />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-5"><aside className="rounded-lg bg-bordeaux-900 p-8 text-paper/85">
            <img
              src="https://www.pfmm.de/home/eg_110.jpg"
              alt="Porträt von Erich Grikscheit, Trainer und Berater aus Karben"
              width={110}
              height={110}
              loading="lazy"
              className="size-24 rounded-full object-cover"
            />
            <p className="mt-5 font-serif text-[22px] font-semibold text-paper">{CONTACT.person}</p>
            <p className="mt-3">
              Sie erreichen mich direkt — kein Sekretariat, keine Warteschleife.
            </p>
            <ul className="mt-6 space-y-3 text-[17px]">
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
            <p className="mt-6 text-[15px] text-paper/70">
              {CONTACT.company}
              <br />
              {CONTACT.street}, {CONTACT.zip} {CONTACT.city}
            </p>
          </aside><KontaktOrganisation /></div>
        </Reveal>
      </div>
    </section>
  );
}
