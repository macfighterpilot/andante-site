import type { Locale } from "./config";
import en from "./en";

export type Dictionary = typeof en;

// TODO(andante): import it/de dictionaries here; TypeScript enforces the same keys as en.
const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
