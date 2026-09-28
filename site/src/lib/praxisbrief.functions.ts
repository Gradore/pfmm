import { edge } from "@/lib/edge";

export function praxisbriefAnmelden({ data }: { data: { email: string; consent: true } }) {
  return edge<{ ok: boolean }>("praxisbrief", { aktion: "anmelden", ...data });
}

export function praxisbriefBestaetigen({ data }: { data: { token: string } }) {
  return edge<{ ok: boolean }>("praxisbrief", { aktion: "bestaetigen", ...data });
}

export function praxisbriefAbmelden({ data }: { data: { email: string } }) {
  return edge<{ ok: boolean }>("praxisbrief", { aktion: "abmelden", ...data });
}
