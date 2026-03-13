"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n-client";
import { saveChats, saveState } from "@/lib/storage";
import { homeCopy } from "@/app/home-copy";

export function IntroForm() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim() || t(homeCopy.defaultName);

    saveState({
      userName: trimmedName,
      currentIndex: 0,
      likedSlugs: [],
    });
    saveChats([]);

    router.push("/discover");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full rounded-[1.75rem] border border-fuchsia-400/20 bg-black/45 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur"
    >
      <label htmlFor="userName" className="text-sm uppercase tracking-[0.28em] text-fuchsia-200">
        {t(homeCopy.nameLabel)}
      </label>
      <input
        id="userName"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={t(homeCopy.namePlaceholder)}
        aria-label={t(homeCopy.nameAria)}
        className="mt-6 w-full rounded-full border border-white/20 bg-black/35 px-5 py-4 text-lg text-white outline-none transition focus:border-fuchsia-300 placeholder:text-white/40"
      />

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-red-500 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-fuchsia-500/40 transition hover:from-fuchsia-400 hover:to-rose-400"
      >
        {t(homeCopy.continueButton)}
      </button>
    </form>
  );
}
