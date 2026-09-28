import { findSeminar } from "@/data/seminare";

/** Titel eines Seminars zum Slug — mit Rückfallwert für gelöschte Einträge. */
export function seminarTitel(slug: string): string {
  return findSeminar(slug)?.title ?? slug;
}
