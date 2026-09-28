import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  CONSENT_ABGELEHNT,
  CONSENT_AKZEPTIERT,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/consent";

/**
 * Minimales Einwilligungs-Banner für Web-Analyse und Kartendarstellung.
 * Ablehnen ist genauso deutlich wie Akzeptieren — keine Dark Patterns.
 */
export function ConsentBanner() {
  const [sichtbar, setSichtbar] = useState(false);
  const [details, setDetails] = useState(false);
  const [wahl, setWahl] = useState<Consent>(CONSENT_ABGELEHNT);

  useEffect(() => {
    const vorhanden = readConsent();
    if (!vorhanden) setSichtbar(true);
    else setWahl(vorhanden);

    const oeffnen = () => {
      setWahl(readConsent() ?? CONSENT_ABGELEHNT);
      setDetails(true);
      setSichtbar(true);
    };
    window.addEventListener("pfmm-consent-open", oeffnen);
    return () => window.removeEventListener("pfmm-consent-open", oeffnen);
  }, []);

  if (!sichtbar) return null;

  const speichern = (value: Consent) => {
    writeConsent(value);
    setSichtbar(false);
    setDetails(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-14 z-50 border-t border-ink-200 bg-background shadow-lift lg:bottom-0"
    >
      <div className="container-page py-6">
        <h2 id="consent-title" className="font-serif text-[20px] font-semibold text-bordeaux-900">
          Ihre Entscheidung über Cookies
        </h2>
        <p className="mt-2 max-w-[68ch] text-[16px] text-ink-700">
          Diese Website funktioniert ohne Einwilligung vollständig. Nur für die anonymisierte
          Web-Analyse (Matomo, selbst gehostet) und für die Kartendarstellung auf der Anfahrtsseite
          bitte ich um Ihre Zustimmung. Näheres in der{" "}
          <Link
            to="/datenschutz"
            className="font-semibold text-brass-700 underline underline-offset-4"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>

        {details && (
          <fieldset className="mt-5 space-y-3 border-0 p-0">
            <legend className="sr-only">Einzelne Zwecke auswählen</legend>
            <label className="flex items-start gap-3 text-[16px] text-ink-700">
              <input
                type="checkbox"
                className="mt-1 size-5 accent-brass-600"
                checked={wahl.analyse}
                onChange={(e) => setWahl((w) => ({ ...w, analyse: e.target.checked }))}
              />
              <span>
                <strong className="text-ink-900">Web-Analyse</strong> — Matomo auf einem Server in
                Deutschland, IP-Adresse gekürzt, keine Weitergabe an Dritte.
              </span>
            </label>
            <label className="flex items-start gap-3 text-[16px] text-ink-700">
              <input
                type="checkbox"
                className="mt-1 size-5 accent-brass-600"
                checked={wahl.karten}
                onChange={(e) => setWahl((w) => ({ ...w, karten: e.target.checked }))}
              />
              <span>
                <strong className="text-ink-900">Kartendarstellung</strong> — lädt die Karte von
                OpenStreetMap; dabei wird Ihre IP-Adresse an den Anbieter übertragen.
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="brass" size="lg" onClick={() => speichern(CONSENT_AKZEPTIERT)}>
            Akzeptieren
          </Button>
          <Button variant="brass" size="lg" onClick={() => speichern(CONSENT_ABGELEHNT)}>
            Ablehnen
          </Button>
          {details ? (
            <Button variant="ghostBrand" size="lg" onClick={() => speichern(wahl)}>
              Auswahl speichern
            </Button>
          ) : (
            <Button variant="ghostBrand" size="lg" onClick={() => setDetails(true)}>
              Einstellungen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
