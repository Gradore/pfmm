import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarCheck, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";

/** Feste Aktionsleiste — nur mobil. Das wichtigste Element auf dem Telefon. */
export function MobileActionBar() {
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  // Seminardetailseiten bringen ihre eigene Leiste mit (Preis + Anfrage).
  if (/^\/leistungen\/seminare\/.+/.test(pathname)) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink-200 bg-background shadow-lift lg:hidden">
      <a
        href={CONTACT.phoneHref}
        className="flex min-h-14 items-center justify-center gap-2 border-r border-ink-200 text-[17px] font-semibold text-ink-900"
      >
        <Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />
        Anrufen
      </a>
      <Link
        to="/kontakt"
        className="flex min-h-14 items-center justify-center gap-2 bg-brass-600 text-[17px] font-semibold text-paper"
      >
        <CalendarCheck className="size-5" strokeWidth={1.5} aria-hidden="true" />
        Erstgespräch
      </Link>
    </div>
  );
}
