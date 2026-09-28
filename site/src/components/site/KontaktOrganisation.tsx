import { Mail, Phone } from "lucide-react";

export function KontaktOrganisation() {
  return (
    <aside className="rounded-lg border border-ink-200 bg-card p-6 text-ink-700 shadow-soft" aria-label="Kontakt und Organisation">
      <h3 className="font-serif text-[20px] font-semibold text-bordeaux-900">Barbara Grikscheit</h3>
      <p className="mt-1 text-[15px]">Kontakt und Organisation</p>
      <a href="tel:+49603945458" className="mt-4 flex min-h-11 items-center gap-2 font-semibold text-brass-700"><Phone className="size-4" aria-hidden="true" />06039 45458</a>
      <a href="mailto:B.Grikscheit@t-online.de" className="flex min-h-11 items-center gap-2 break-all font-semibold text-brass-700"><Mail className="size-4 shrink-0" aria-hidden="true" />B.Grikscheit@t-online.de</a>
    </aside>
  );
}
