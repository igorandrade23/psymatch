"use client";

import { useState } from "react";
import type { Psychologist } from "@/data/psychologists";

type ProfileCardProps = {
  profile: Psychologist;
  onPass: () => void;
  onLike: () => void;
};

export function ProfileCard({ profile, onPass, onLike }: ProfileCardProps) {
  const [funMode, setFunMode] = useState(false);

  return (
    <article className="w-full max-w-2xl rounded-[2.25rem] border border-ink/10 bg-white p-8 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-ember">
            Ordem {profile.order}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-ink/75">
            {profile.ageLabel} | {profile.role}
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-cream px-4 py-3 text-sm leading-6 text-ink/75">
          <p>{profile.distanceLabel}</p>
          <p>Signo: {profile.sign}</p>
          <p>Escola: {profile.school}</p>
        </div>
      </div>

      <div className="mt-8 rounded-[1.75rem] bg-gradient-to-br from-blush/30 via-white to-gold/20 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">
            {funMode ? "Versao engracadinha" : "Versao informativa"}
          </h2>
          <button
            type="button"
            onClick={() => setFunMode((current) => !current)}
            className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold transition hover:border-ember hover:text-ember"
          >
            {funMode ? "Ver base historica" : "Ver tom divertido"}
          </button>
        </div>

        <p className="mt-4 text-lg leading-8 text-ink/85">
          {funMode ? profile.labPuns[0] : profile.bio}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="rounded-[1.5rem] bg-cream p-5">
          <h3 className="text-sm uppercase tracking-[0.25em] text-ink/60">
            Quem sou eu e o que eu gosto
          </h3>
          <ul className="mt-4 space-y-3 text-base leading-7">
            {profile.likes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-[1.5rem] bg-cream p-5">
          <h3 className="text-sm uppercase tracking-[0.25em] text-ink/60">
            Experimento destaque
          </h3>
          <p className="mt-4 text-lg font-semibold">{profile.experimentTitle}</p>
          <p className="mt-2 leading-7 text-ink/80">{profile.experimentBody}</p>
        </section>
      </div>

      <section className="mt-5 rounded-[1.5rem] bg-[#f8f1de] p-5">
        <h3 className="text-sm uppercase tracking-[0.25em] text-ink/60">
          O que procuro
        </h3>
        <p className="mt-3 leading-7 text-ink/85">{profile.lookingFor}</p>
      </section>

      <section className="mt-5 rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/8">
        <h3 className="text-sm uppercase tracking-[0.25em] text-ink/60">
          Trocadilhos de laboratorio
        </h3>
        <ul className="mt-4 space-y-3 leading-7 text-ink/85">
          {profile.labPuns.map((pun) => (
            <li key={pun}>• {pun}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onPass}
          className="flex-1 rounded-full border border-ink/15 px-6 py-4 text-lg font-semibold transition hover:border-ink hover:bg-cream"
        >
          Passar
        </button>
        <button
          type="button"
          onClick={onLike}
          className="flex-1 rounded-full bg-ember px-6 py-4 text-lg font-semibold text-white transition hover:bg-ink"
        >
          Like
        </button>
      </div>
    </article>
  );
}

