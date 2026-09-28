// Öffentliche Seminarbuchung: verbindliche Anmeldung oder unverbindliche Terminanfrage.
// Läuft mit Service-Role-Rechten; die Platzprüfung (Warteliste) erledigt die Datenbank.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const antwort = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const FUSS = `<p>Praxis für Marketing &amp; Motivation · Erich Grikscheit · Max-Planck-Str. 27 · 61184 Karben<br>
Telefon 0 60 39 / 45 45 8 · info@pfmm.de</p>`;

const STORNO_ABSATZ = `<p><strong>Stornobedingungen:</strong> Stornierungen sind bis 30 Tage vor Beginn kostenfrei möglich; vom 29. bis 10. Tag werden 50 %, vom 10. bis 3. Tag 70 %, vom 3. bis 1. Tag 90 % und bei Nichtantritt 100 % des Honorars fällig. Benennen Sie eine Ersatzperson, entfällt die Gebühr.</p>`;

const FORMATE: Record<string, string> = {
  praesenz: "Präsenz in Karben",
  online: "Online",
  inhouse: "Inhouse bei uns im Haus",
};

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function text(v: unknown, max: number, pflicht = false): string | null {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) {
    if (pflicht) throw new Error("Bitte füllen Sie alle Pflichtfelder aus.");
    return null;
  }
  if (s.length > max) throw new Error("Eine Angabe ist zu lang.");
  return s;
}

function referenz(id: string) {
  return `PFMM-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

const LANG = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
function zeitraum(start: string, ende: string) {
  const a = new Date(`${start}T12:00:00Z`);
  const b = new Date(`${ende}T12:00:00Z`);
  if (start === ende) return LANG.format(a);
  return `${a.getUTCDate()}.${a.getUTCMonth() === b.getUTCMonth() ? "" : ` ${new Intl.DateTimeFormat("de-DE", { month: "long", timeZone: "UTC" }).format(a)}`} bis ${LANG.format(b)}`;
}

async function mailsSenden(an: string, betreffA: string, htmlA: string, betreffB: string, htmlB: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  const von = Deno.env.get("RESEND_FROM") ?? "PFMM <onboarding@resend.dev>";
  const intern = Deno.env.get("MAIL_INTERN") ?? "info@pfmm.de";
  if (!key) return { versandt: false, fehler: "Kein Mailversand konfiguriert (RESEND_API_KEY fehlt)." };
  try {
    const senden = (to: string, subject: string, html: string) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: von, to: [to], subject, html }),
      });
    const [a, b] = await Promise.all([senden(an, betreffA, htmlA), senden(intern, betreffB, htmlB)]);
    if (a.ok && b.ok) return { versandt: true, fehler: "" };
    return { versandt: false, fehler: `Mailversand fehlgeschlagen (${a.status}/${b.status})` };
  } catch (e) {
    return { versandt: false, fehler: `Mailversand fehlgeschlagen: ${e instanceof Error ? e.message : "unbekannt"}` };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return antwort({ error: "Nur POST." }, 405);

  try {
    const d = await req.json();
    if (d.website) throw new Error("Ungültige Anfrage.");
    if (d.datenschutz_ok !== true) throw new Error("Bitte bestätigen Sie die Datenschutzerklärung.");

    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
      auth: { persistSession: false },
    });

    const vorname = text(d.vorname, 80, true)!;
    const nachname = text(d.nachname, 80, true)!;
    const email = text(d.email, 255, true)!;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse an.");
    const unternehmen = text(d.unternehmen, 120);
    const funktion = text(d.funktion, 120);
    const telefon = text(d.telefon, 40);
    const nachricht = text(d.nachricht, 2000);
    const seminarSlug = text(d.seminar_slug, 120, true)!;
    const seminarTitel = text(d.seminar_titel, 200, true)!;

    const kopf = `<p><strong>${esc(vorname)} ${esc(nachname)}</strong>${unternehmen ? ` (${esc(unternehmen)})` : ""}<br>${esc(email)}${telefon ? ` · ${esc(telefon)}` : ""}</p>`;

    if (d.art === "anmeldung") {
      if (d.storno_ok !== true) throw new Error("Bitte bestätigen Sie die Stornobedingungen.");
      const plaetze = Number(d.anzahl_plaetze);
      if (!Number.isInteger(plaetze) || plaetze < 1 || plaetze > 10) throw new Error("Bitte 1 bis 10 Plätze angeben.");

      const { data: termin, error: tf } = await db
        .from("seminar_termine")
        .select("id, start_datum, end_datum, ort, status, plaetze_gesamt, plaetze_belegt, oeffentlich")
        .eq("id", String(d.termin_id))
        .maybeSingle();
      if (tf) throw new Error(tf.message);
      if (!termin || !termin.oeffentlich) throw new Error("Dieser Termin existiert nicht mehr.");
      if (termin.status === "abgesagt" || termin.status === "durchgefuehrt") {
        throw new Error("Für diesen Termin sind keine Anmeldungen mehr möglich.");
      }

      const { data: b, error } = await db
        .from("buchungen")
        .insert({
          termin_id: termin.id, seminar_slug: seminarSlug, art: "anmeldung",
          vorname, nachname, unternehmen, funktion, anschrift: text(d.anschrift, 300), telefon, email,
          anzahl_plaetze: plaetze, nachricht, datenschutz_ok: true, storno_ok: true, quelle: "website",
        })
        .select("id, status")
        .single();
      if (error) throw new Error(error.message);

      const ref = referenz(b.id);
      const zr = zeitraum(termin.start_datum, termin.end_datum);
      const warte = b.status === "warteliste"
        ? "<p>Da für diesen Termin aktuell keine freien Plätze mehr vorhanden sind, steht Ihre Anmeldung auf der Warteliste. Sobald ein Platz frei wird, melde ich mich bei Ihnen.</p>"
        : "";
      const mail = await mailsSenden(
        email,
        `Ihre Anmeldung: ${seminarTitel}`,
        `<p>Guten Tag ${esc(vorname)} ${esc(nachname)},</p><p>vielen Dank für Ihre Anmeldung zum Seminar „${esc(seminarTitel)}“.</p><p><strong>Buchungsnummer:</strong> ${ref}<br><strong>Termin:</strong> ${zr}<br><strong>Ort:</strong> ${esc(termin.ort ?? "wird noch mitgeteilt")}<br><strong>Plätze:</strong> ${plaetze}</p>${warte}<p>Ihre Anmeldung ist verbindlich. Die Teilnahme gilt als bestätigt, sobald ich Ihnen den Platz zusage.</p>${STORNO_ABSATZ}${FUSS}`,
        `Neue Anmeldung: ${seminarTitel}`,
        `<p>Neue Anmeldung über die Website.</p>${kopf}<p><strong>Seminar:</strong> ${esc(seminarTitel)}<br><strong>Termin:</strong> ${zr}<br><strong>Plätze:</strong> ${plaetze}<br><strong>Status:</strong> ${b.status}<br><strong>Belegung:</strong> ${termin.plaetze_belegt + plaetze} von ${termin.plaetze_gesamt}<br><strong>Buchungsnummer:</strong> ${ref}</p>${nachricht ? `<p><strong>Nachricht:</strong><br>${esc(nachricht)}</p>` : ""}`,
      );
      if (!mail.versandt) {
        await db.from("buchung_events").insert({ buchung_id: b.id, von_status: b.status, nach_status: b.status, notiz: `E-Mail nicht versendet: ${mail.fehler}` });
      }
      return antwort({ id: b.id, referenz: ref, status: b.status, art: "anmeldung", mailVersandt: mail.versandt });
    }

    if (d.art === "terminanfrage") {
      const personen = Number(d.anzahl_personen);
      if (!Number.isInteger(personen) || personen < 1 || personen > 200) throw new Error("Bitte 1 bis 200 Personen angeben.");
      const format = typeof d.wunsch_format === "string" && FORMATE[d.wunsch_format] ? d.wunsch_format : null;
      const wunsch = text(d.wunsch_zeitraum, 200);

      const { data: b, error } = await db
        .from("buchungen")
        .insert({
          termin_id: null, seminar_slug: seminarSlug, art: "terminanfrage",
          vorname, nachname, unternehmen, funktion, telefon, email,
          anzahl_plaetze: 1, anzahl_personen: personen, wunsch_zeitraum: wunsch, wunsch_format: format,
          nachricht, datenschutz_ok: true, storno_ok: false, quelle: "website",
        })
        .select("id, status")
        .single();
      if (error) throw new Error(error.message);

      const ref = referenz(b.id);
      const formatLabel = format ? FORMATE[format] : "noch offen";
      const mail = await mailsSenden(
        email,
        `Ihre Terminanfrage: ${seminarTitel}`,
        `<p>Guten Tag ${esc(vorname)} ${esc(nachname)},</p><p>vielen Dank für Ihre Terminanfrage zum Seminar „${esc(seminarTitel)}“.</p><p><strong>Vorgangsnummer:</strong> ${ref}<br><strong>Wunschzeitraum:</strong> ${esc(wunsch ?? "noch offen")}<br><strong>Format:</strong> ${formatLabel}<br><strong>Personen:</strong> ${personen}</p><p>Ihre Anfrage ist unverbindlich. Ich melde mich mit einem Terminvorschlag bei Ihnen — erst danach entscheiden Sie.</p>${FUSS}`,
        `Neue Terminanfrage: ${seminarTitel}`,
        `<p>Neue Terminanfrage über die Website.</p>${kopf}<p><strong>Seminar:</strong> ${esc(seminarTitel)}<br><strong>Wunschzeitraum:</strong> ${esc(wunsch ?? "noch offen")}<br><strong>Format:</strong> ${formatLabel}<br><strong>Personen:</strong> ${personen}<br><strong>Vorgangsnummer:</strong> ${ref}</p>${nachricht ? `<p><strong>Nachricht:</strong><br>${esc(nachricht)}</p>` : ""}`,
      );
      if (!mail.versandt) {
        await db.from("buchung_events").insert({ buchung_id: b.id, von_status: b.status, nach_status: b.status, notiz: `E-Mail nicht versendet: ${mail.fehler}` });
      }
      return antwort({ id: b.id, referenz: ref, status: b.status, art: "terminanfrage", mailVersandt: mail.versandt });
    }

    throw new Error("Unbekannte Anfrageart.");
  } catch (e) {
    return antwort({ error: e instanceof Error ? e.message : "Unbekannter Fehler." }, 400);
  }
});
