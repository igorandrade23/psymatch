"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveState } from "@/lib/storage";

export function IntroForm() {
  const [name, setName] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    saveState({
      userName: trimmedName,
      currentIndex: 0,
      likedSlugs: [],
    });

    router.push("/discover");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-[2rem] border border-ink/10 bg-white/75 p-8 shadow-card backdrop-blur"
    >
      <p className="text-sm uppercase tracking-[0.35em] text-ember">PsyMatch</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight">
        Historia da psicologia comportamental com clima de app de encontro.
      </h1>
      <p className="mt-4 text-base leading-7 text-ink/75">
        Digite seu nome e percorra os perfis em ordem cronologica. Se curtir o
        autor, de like e receba um match com resposta pronta.
      </p>

      <label className="mt-8 block text-sm font-semibold uppercase tracking-[0.2em] text-ink/70">
        Seu nome
      </label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ex.: Igor"
        className="mt-3 w-full rounded-full border border-ink/15 bg-cream px-5 py-4 text-lg outline-none transition focus:border-ember"
      />

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-ink px-6 py-4 text-lg font-semibold text-cream transition hover:bg-ember"
      >
        Comecar jornada
      </button>
    </form>
  );
}

