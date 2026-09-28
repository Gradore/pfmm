import { freiePlaetze } from "@/lib/buchung";
import type { Termin } from "@/lib/buchung";

/** Schlanker Belegungsbalken plus ehrlicher Satz zu den freien Plätzen. */
export function TerminPlaetze({ termin }: { termin: Termin }) {
  const frei = freiePlaetze(termin);
  const anteil = Math.min(100, Math.round((termin.plaetze_belegt / termin.plaetze_gesamt) * 100));
  const satz =
    termin.status === "abgesagt"
      ? "Dieser Termin entfällt."
      : frei === 0
        ? "Ausgebucht"
        : frei === 1
          ? "Noch 1 Platz frei"
          : `Noch ${frei} von ${termin.plaetze_gesamt} Plätzen frei`;

  return (
    <div>
      <span
        aria-hidden="true"
        className="block h-2 w-full overflow-hidden rounded-full bg-ink-200"
      >
        <span
          className="block h-full rounded-full bg-bordeaux-600 transition-[width] duration-500"
          style={{ width: `${Math.max(anteil, 2)}%` }}
        />
      </span>
      <p className="mt-2 text-[16px] font-semibold text-ink-900">{satz}</p>
    </div>
  );
}
