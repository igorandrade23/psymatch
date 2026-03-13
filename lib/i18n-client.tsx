"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  getCurrentLocale,
  resolveLocalizedValue,
  setCurrentLocale,
  type AppLocale,
  type LocalizedValue,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  resetLocale: () => void;
  t: <T>(value: LocalizedValue<T>) => T;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(getCurrentLocale());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        setCurrentLocale(nextLocale);
        setLocaleState(nextLocale);
      },
      resetLocale: () => {
        setLocaleState(DEFAULT_LOCALE);
      },
      t: <T,>(localizedValue: LocalizedValue<T>) =>
        resolveLocalizedValue(localizedValue, locale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within I18nProvider");
  }

  return context;
}
