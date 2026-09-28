import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { praxisbriefBestaetigen } from "@/lib/praxisbrief.functions";

export const Route = createFileRoute("/praxisbrief/bestaetigen")({
  head: () => ({ meta: [{ title: "Praxisbrief bestätigen" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: Page,
});

function Page() {
  const [meldung, setMeldung] = useState("Ihre Anmeldung wird geprüft …");
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) { setMeldung("Dieser Bestätigungslink ist ungültig."); return; }
    praxisbriefBestaetigen({ data: { token } }).then(({ ok }) => setMeldung(ok ? "Vielen Dank. Ihre Anmeldung zum Praxisbrief ist bestätigt." : "Dieser Bestätigungslink ist ungültig oder wurde bereits verwendet.")).catch(() => setMeldung("Die Bestätigung ist derzeit nicht möglich. Bitte versuchen Sie es später erneut."));
    window.history.replaceState(null, "", window.location.pathname);
  }, []);
  return <><PageHeader crumbs={[{ label: "Praxisbriefe", to: "/praxisbriefe" }, { label: "Bestätigen" }]} eyebrow="Praxisbrief" title="Anmeldung bestätigen" /><div className="container-page section-y"><p role="status">{meldung}</p></div></>;
}
