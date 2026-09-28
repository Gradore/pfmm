import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Anmeldung — Verwaltung | Praxis für Marketing & Motivation" },
      {
        name: "description",
        content: "Interner Zugang zur Seminarverwaltung der Praxis für Marketing & Motivation.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Anmeldung — Verwaltung" },
      { property: "og:description", content: "Interner Zugang zur Seminarverwaltung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminEinstieg,
});

function AdminEinstieg() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState<string | null>(null);
  const [laeuft, setLaeuft] = useState(false);
  const [pruefe, setPruefe] = useState(true);

  useEffect(() => {
    let aktiv = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!aktiv) return;
      if (data.session) void navigate({ to: "/verwaltung", replace: true });
      else setPruefe(false);
    });
    return () => {
      aktiv = false;
    };
  }, [navigate]);

  async function anmelden(e: React.FormEvent) {
    e.preventDefault();
    setFehler(null);
    setLaeuft(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: passwort });
    setLaeuft(false);
    if (error) {
      setFehler("Anmeldung nicht möglich. Bitte prüfen Sie E-Mail-Adresse und Passwort.");
      return;
    }
    void navigate({ to: "/verwaltung", replace: true });
  }

  if (pruefe) {
    return (
      <div className="section-y bg-ink-100">
        <div className="container-page max-w-[520px]">
          <p className="text-[17px] text-ink-700">Zugang wird geprüft …</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-y bg-ink-100">
      <div className="container-page max-w-[520px]">
        <h1 className="h2-display">Verwaltung</h1>
        <p className="mt-4 text-[17px] leading-[1.65] text-ink-700">
          Zugang nur für die Praxis für Marketing &amp; Motivation.
        </p>
        <form
          onSubmit={anmelden}
          className="mt-8 grid gap-4 rounded-lg border border-ink-200 bg-card p-6 shadow-soft sm:p-8"
        >
          <div>
            <Label htmlFor="ad-email">E-Mail</Label>
            <Input
              id="ad-email"
              type="email"
              autoComplete="username"
              required
              className="mt-1 min-h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ad-passwort">Passwort</Label>
            <Input
              id="ad-passwort"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 min-h-11"
              value={passwort}
              onChange={(e) => setPasswort(e.target.value)}
            />
          </div>
          {fehler && (
            <p role="alert" className="text-[16px] font-semibold text-bordeaux-700">
              {fehler}
            </p>
          )}
          <Button type="submit" variant="brass" disabled={laeuft}>
            {laeuft ? "Wird geprüft …" : "Anmelden"}
          </Button>
        </form>
        <p className="mt-6 text-[15px] text-ink-500">
          Bei Fragen zum Zugang: 0 60 39 / 45 45 8.
        </p>
      </div>
    </div>
  );
}
