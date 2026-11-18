// Locales served under /[lang]. English first (international market: UK, DE, US, NL, Scandinavia).
// TODO(andante): add "it" and "de" here once src/i18n/it.ts and de.ts exist (same shape as en.ts).
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
