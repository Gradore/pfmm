import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { praxisbriefAbmelden } from "@/lib/praxisbrief.functions";

export const Route = createFileRoute("/praxisbrief/abmelden")({
  head: () => ({ meta: [{ title: "Praxisbrief abbestellen" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: Page,
});

function Page() {
  const [fertig, setFertig] = useState(false);
  const [sendet, setSendet] = useState(false);
  const [fehler, setFehler] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSendet(true); setFehler("");
    try { const form = new FormData(e.currentTarget); await praxisbriefAbmelden({ data: { email: String(form.get("email")) } }); setFertig(true); }
    catch { setFehler("Die Abmeldung ist gerade nicht möglich. Bitte schreiben Sie an info@pfmm.de."); }
    finally { setSendet(false); }
  }
  return <><PageHeader crumbs={[{ label: "Praxisbriefe", to: "/praxisbriefe" }, { label: "Abmelden" }]} eyebrow="Praxisbrief" title="Praxisbrief abbestellen" /><div className="container-page section-y max-w-2xl">{fertig ? <p role="status">Falls Ihre Adresse eingetragen war, wurde sie als abgemeldet markiert. Sie erhalten keinen weiteren Praxisbrief.</p> : <form onSubmit={submit} className="space-y-5"><label htmlFor="abo-email" className="block font-semibold">E-Mail-Adresse</label><input id="abo-email" name="email" type="email" required autoComplete="email" className="h-12 w-full rounded-md border border-ink-200 px-4" /><button disabled={sendet} className="min-h-11 rounded-md bg-brass-600 px-6 font-semibold text-paper disabled:opacity-60">{sendet ? "Wird abgemeldet …" : "Praxisbrief abbestellen"}</button>{fehler && <p role="alert">{fehler}</p>}</form>}</div></>;
}
