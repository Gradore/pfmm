import { useEffect, useState } from "react";

export type Consent = {
  /** Web-Analyse mit Matomo */
  analyse: boolean;
  /** Externe Kartendarstellung (OpenStreetMap) */
  karten: boolean;
};

const KEY = "pfmm-consent-v1";
const EVENT = "pfmm-consent-change";

export const CONSENT_ABGELEHNT: Consent = { analyse: false, karten: false };
export const CONSENT_AKZEPTIERT: Consent = { analyse: true, karten: true };

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    return { analyse: !!parsed.analyse, karten: !!parsed.karten };
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function clearConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Öffnet den Einstellungsdialog des Consent-Banners. */
export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("pfmm-consent-open"));
}

/**
 * Aktueller Stand der Einwilligung. `null` = noch keine Entscheidung.
 * Wird erst nach der Hydration gelesen, damit Server und Client übereinstimmen.
 */
export function useConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [geladen, setGeladen] = useState(false);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    setGeladen(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { consent, geladen };
}
