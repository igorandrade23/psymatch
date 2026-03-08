"use client";

import { useLocale } from "@/lib/i18n-client";
import type { AppLocale } from "@/lib/i18n";

const LANGUAGE_OPTIONS: Array<{
  locale: AppLocale;
  flag: string;
  label: string;
}> = [
  { locale: "pt-BR", flag: "🇧🇷", label: "Português" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="fixed right-3 top-3 z-[100] flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-2 py-2 shadow-xl backdrop-blur-md">
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = locale === option.locale;

        return (
          <button
            key={option.locale}
            type="button"
            onClick={() => setLocale(option.locale)}
            aria-label={option.label}
            aria-pressed={isActive}
            className={`grid h-10 w-10 place-items-center rounded-full text-xl transition ${
              isActive
                ? "bg-white/18 ring-1 ring-white/25"
                : "bg-transparent opacity-75 hover:bg-white/10 hover:opacity-100"
            }`}
          >
            <span aria-hidden>{option.flag}</span>
          </button>
        );
      })}
    </div>
  );
}
