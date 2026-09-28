import { Link } from "@tanstack/react-router";
import { AKTUELLE_SEMINARE, TALK_TERMINE, DIGITALE_THEMEN, aktuellesDatum, kommendeEintraege } from "@/data/aktuelles";
import { AUTOR_BILD } from "@/data/praxisbriefe";

export function AktuellesPanel() {
  const seminare = kommendeEintraege(AKTUELLE_SEMINARE);
  const talks = kommendeEintraege(TALK_TERMINE);
  const digital = kommendeEintraege(DIGITALE_THEMEN);
  return (
    <aside className="rounded-lg border border-ink-200 bg-card p-5 shadow-soft sm:p-7" aria-labelledby="aktuelles-title">
      <div className="flex items-center gap-4 border-b border-ink-200 pb-4">
        <img src={AUTOR_BILD} alt="Erich Grikscheit" width={60} height={60} className="size-14 rounded-full object-cover" />
        <h2 id="aktuelles-title" className="font-serif text-[25px] text-bordeaux-900">Aktuelles</h2>
      </div>
      {seminare.length > 0 && <div className="mt-5"><h3 className="font-semibold text-ink-900">Aktuelle Seminare</h3><ul className="mt-2 space-y-3 text-[15px]">{seminare.map((e) => <li key={e.datum}><span className="block text-ink-500">{aktuellesDatum(e)} · {e.dauer}</span><a href={`/leistungen/seminare/${e.slug}`} className="font-semibold text-brass-700 underline underline-offset-4">{e.label}</a></li>)}</ul></div>}
      {talks.length > 0 && <div className="mt-5"><h3 className="font-semibold text-ink-900">90 Minuten Talk <span className="font-normal text-ink-500">(kostenlos, digital)</span></h3><ul className="mt-2 space-y-3 text-[15px]">{talks.map((e) => <li key={e.datum}><span className="block text-ink-500">{aktuellesDatum(e)}</span><Link to="/leistungen/talk" className="font-semibold text-brass-700 underline underline-offset-4">„{e.label}“</Link></li>)}</ul></div>}
      {digital.length > 0 && <div className="mt-5"><h3 className="font-semibold text-ink-900">Neue Themen digital</h3><ul className="mt-2 space-y-2 text-[15px]">{digital.map((e) => <li key={e.datum}>{aktuellesDatum(e)} · „{e.label}“</li>)}</ul></div>}
    </aside>
  );
}
