// Praxisbrief: Anmeldung (Double-Opt-in), Bestätigung, Abmeldung.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const antwort = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

async function hash(token: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FEHLER = "Die Anmeldung ist derzeit nicht erreichbar. Bitte schreiben Sie an info@pfmm.de.";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return antwort({ error: "Nur POST." }, 405);
  try {
    const d = await req.json();
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
      auth: { persistSession: false },
    });
    const jetzt = new Date().toISOString();

    if (d.aktion === "anmelden") {
      const email = String(d.email ?? "").trim().toLowerCase();
      if (!EMAIL.test(email) || email.length > 255 || d.consent !== true) throw new Error("Bitte prüfen Sie Ihre Angaben.");
      const key = Deno.env.get("RESEND_API_KEY");
      if (!key) throw new Error(FEHLER);
      const bytes = crypto.getRandomValues(new Uint8Array(32));
      const token = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
      const { error } = await db.from("praxisbrief_abos").upsert(
        { email, status: "ausstehend", bestaetigungs_token_hash: await hash(token), updated_at: jetzt },
        { onConflict: "email" },
      );
      if (error) throw new Error(FEHLER);
      const url = `${Deno.env.get("SITE_URL") ?? "https://pfmm.gradore.de"}/praxisbrief/bestaetigen?token=${token}`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: Deno.env.get("RESEND_FROM") ?? "PFMM <onboarding@resend.dev>",
          to: [email],
          subject: "Praxisbrief: Bitte bestätigen Sie Ihre Anmeldung",
          html: `<p>Bitte bestätigen Sie Ihre Anmeldung zum Praxisbrief:</p><p><a href="${url}">Anmeldung bestätigen</a></p><p>Wenn Sie sich nicht angemeldet haben, ignorieren Sie diese Nachricht.</p>`,
        }),
      });
      if (!res.ok) throw new Error("Die Bestätigungsmail konnte nicht versendet werden. Bitte schreiben Sie an info@pfmm.de.");
      return antwort({ ok: true });
    }

    if (d.aktion === "bestaetigen") {
      const token = String(d.token ?? "");
      if (!/^[a-f0-9]{64}$/.test(token)) return antwort({ ok: false });
      const { data: abo } = await db.from("praxisbrief_abos").select("id")
        .eq("bestaetigungs_token_hash", await hash(token)).eq("status", "ausstehend").maybeSingle();
      if (!abo) return antwort({ ok: false });
      const { error } = await db.from("praxisbrief_abos")
        .update({ status: "aktiv", bestaetigungs_token_hash: null, updated_at: jetzt }).eq("id", abo.id);
      return antwort({ ok: !error });
    }

    if (d.aktion === "abmelden") {
      const email = String(d.email ?? "").trim().toLowerCase();
      if (!EMAIL.test(email)) throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse an.");
      await db.from("praxisbrief_abos")
        .update({ status: "abgemeldet", bestaetigungs_token_hash: null, updated_at: jetzt }).eq("email", email);
      return antwort({ ok: true }); // Keine Auskunft darüber, ob die Adresse gespeichert war.
    }

    throw new Error("Unbekannte Aktion.");
  } catch (e) {
    return antwort({ error: e instanceof Error ? e.message : FEHLER }, 400);
  }
});
