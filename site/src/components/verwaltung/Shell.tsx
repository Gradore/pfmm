import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { to: "/verwaltung", label: "Übersicht" },
  { to: "/verwaltung/termine", label: "Termine" },
  { to: "/verwaltung/anmeldungen", label: "Anmeldungen" },
  { to: "/verwaltung/anfragen", label: "Terminanfragen" },
] as const;

/** Rahmen aller Verwaltungsseiten: Navigation, Titel, Abmeldung. */
export function VerwaltungShell({ titel, children }: { titel: string; children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function abmelden() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-ink-100 pb-24 pt-10 print:bg-paper print:pt-0">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <p className="eyebrow text-bordeaux-600">Verwaltung</p>
          <Button variant="ghostBrand" onClick={abmelden}>
            Abmelden
          </Button>
        </div>
        <h1 className="h2-display mt-3">{titel}</h1>

        <nav aria-label="Verwaltung" className="mt-6 print:hidden">
          <ul role="list" className="flex flex-wrap gap-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/verwaltung" }}
                  className="inline-flex min-h-11 items-center rounded-lg border border-ink-200 bg-card px-4 text-[16px] font-semibold text-ink-700 hover:text-brass-700 [&.active]:border-bordeaux-600 [&.active]:text-bordeaux-900"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}

export const VERWALTUNG_HEAD = (titel: string) => ({
  meta: [
    { title: `${titel} — Verwaltung | Praxis für Marketing & Motivation` },
    {
      name: "description",
      content: "Interne Seminarverwaltung der Praxis für Marketing & Motivation.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: `${titel} — Verwaltung` },
    { property: "og:description", content: "Interne Seminarverwaltung." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});
