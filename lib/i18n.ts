export const SUPPORTED_LOCALES = ["pt-BR", "en"] as const;
export const LOCALE_STORAGE_KEY = "psymatch-locale";

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "pt-BR";

export type LocalizedValue<T> = {
  "pt-BR": T;
} & Partial<Record<AppLocale, T>>;

export type LocalizedText = LocalizedValue<string>;
export type LocalizedList = LocalizedValue<string[]>;

export function localizedText(
  ptBr: string,
  overrides?: Partial<Record<Exclude<AppLocale, "pt-BR">, string>>,
): LocalizedText {
  return {
    "pt-BR": ptBr,
    ...overrides,
  };
}

export function localizedList(
  ptBr: string[],
  overrides?: Partial<Record<Exclude<AppLocale, "pt-BR">, string[]>>,
): LocalizedList {
  return {
    "pt-BR": ptBr,
    ...overrides,
  };
}

export function resolveLocalizedValue<T>(
  value: LocalizedValue<T>,
  locale: AppLocale = DEFAULT_LOCALE,
): T {
  const localized = value[locale];
  if (localized !== undefined) {
    return localized;
  }

  return value[DEFAULT_LOCALE] as T;
}

export function isAppLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale);
}

export function getCurrentLocale(): AppLocale {
  if (typeof window !== "undefined") {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (storedLocale && isAppLocale(storedLocale)) {
      return storedLocale;
    }
  }

  return DEFAULT_LOCALE;
}

export function setCurrentLocale(locale: AppLocale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
