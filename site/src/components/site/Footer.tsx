import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { CONTACT, LEISTUNGEN } from "@/lib/site";
import { openConsentSettings } from "@/lib/consent";
import { OFFENE_SEMINARE } from "@/data/offene-seminare";

export function Footer() {
  return (
    <footer className="mt-auto bg-bordeaux-900 pb-24 text-paper/80 lg:pb-0">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="font-serif text-[20px] font-semibold text-paper">GRIKSCHEIT</p>
          <address className="mt-4 space-y-1 text-[16px] not-italic">
            <span className="block">Praxis für Management – Training</span>
            <span className="block">Praxis für philosophische und Individualpsychologische Beratung</span>
            <span className="block">Max-Planck-Straße 27, 61184 Karben</span>
            <a
              className="mt-3 flex items-center gap-2 hover:text-brass-400"
              href={CONTACT.phoneHref}
            >
              <Phone className="size-4" strokeWidth={1.5} /> {CONTACT.phoneDisplay}
            </a>
            <a className="flex items-center gap-2 hover:text-brass-400" href={CONTACT.mobileHref}>
              <Smartphone className="size-4" strokeWidth={1.5} /> {CONTACT.mobileDisplay}
            </a>
            <a
              className="flex items-center gap-2 hover:text-brass-400"
              href={`mailto:${CONTACT.email}`}
            >
              <Mail className="size-4" strokeWidth={1.5} /> {CONTACT.email}
            </a>
          </address>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[15px] hover:text-brass-400"
          >
            <Linkedin className="size-4" strokeWidth={1.5} /> LinkedIn
          </a>
        </div>

        <div>
          <h2 className="eyebrow font-sans text-brass-400">Seminare</h2>
          <ul className="mt-4 space-y-2 text-[16px]">
            {OFFENE_SEMINARE.map(({ name, seminar: s }) => {
              return s ? (
                <li key={name}>
                  <Link
                    to="/leistungen/seminare/$slug"
                    params={{ slug: s.slug }}
                    className="hover:text-brass-400"
                  >
                    {name}
                  </Link>
                </li>
              ) : <li key={name}>{name}</li>;
            })}
            <li><Link to="/seminare/termine" className="hover:text-brass-400">Termine &amp; Anmeldung</Link></li>
            <li>
              <Link to="/leistungen/seminare" className="font-semibold hover:text-brass-400">
                Alle Seminare
              </Link>
            </li>
            <li>
              <Link to="/honorare" className="hover:text-brass-400">
                Honorare
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow font-sans text-brass-400">Leistungen</h2>
          <ul className="mt-4 space-y-2 text-[16px]">
            {LEISTUNGEN.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-brass-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow font-sans text-brass-400">Wissen</h2>
          <ul className="mt-4 space-y-2 text-[16px]">
            <li>
              <Link to="/praxisbriefe" className="hover:text-brass-400">
                Praxisbriefe
              </Link>
            </li>
            <li>
              <Link to="/leitfaeden" className="hover:text-brass-400">
                Leitfäden
              </Link>
            </li>
            <li>
              <Link to="/ueber-mich" className="hover:text-brass-400">
                Über mich
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow font-sans text-brass-400">Kontakt &amp; Anfahrt</h2>
          <ul className="mt-4 space-y-2 text-[16px]">
            <li>
              <Link to="/kontakt" className="hover:text-brass-400">
                Erstgespräch vereinbaren
              </Link>
            </li>
            <li>
              <Link to="/anfahrt" className="inline-flex items-center gap-2 hover:text-brass-400">
                <MapPin className="size-4" strokeWidth={1.5} /> Anfahrt nach Karben
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-2 py-5 text-[14px]">
          <Link to="/impressum" className="hover:text-brass-400">
            Impressum
          </Link>
          <Link to="/datenschutz" className="hover:text-brass-400">
            Datenschutz
          </Link>
          <button
            type="button"
            onClick={() => openConsentSettings()}
            className="cursor-pointer hover:text-brass-400"
          >
            Cookie-Einstellungen
          </button>
          <span className="text-paper/60">© 2026 Praxis für Marketing und Motivation</span>
        </div>
      </div>
    </footer>
  );
}
