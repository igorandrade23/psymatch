"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { psychologists } from "@/data/psychologists";
import { loadState } from "@/lib/storage";

export default function MatchesPage() {
  const [userName, setUserName] = useState("");
  const [likedSlugs, setLikedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const state = loadState();
    if (!state) {
      return;
    }

    setUserName(state.userName);
    setLikedSlugs(state.likedSlugs);
  }, []);

  const matches = useMemo(
    () => psychologists.filter((profile) => likedSlugs.includes(profile.slug)),
    [likedSlugs],
  );

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-ember">
            Biblioteca afetiva
          </p>
          <h1 className="mt-2 text-4xl font-semibold">
            Matches de {userName || "quem estuda com criterio"}
          </h1>
        </div>

        <Link
          href="/discover"
          className="rounded-full border border-ink/15 bg-white px-5 py-3 font-semibold shadow-sm"
        >
          Voltar para descoberta
        </Link>
      </header>

      {matches.length === 0 ? (
        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-card">
          <h2 className="text-2xl font-semibold">Ainda sem matches</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ink/75">
            Quando voce der like em algum perfil, ele aparece aqui com a
            mensagem desbloqueada.
          </p>
        </section>
      ) : (
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {matches.map((profile) => (
            <article
              key={profile.slug}
              className="rounded-[2rem] bg-white p-7 shadow-card"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-ember">
                Match cronologico #{profile.order}
              </p>
              <h2 className="mt-3 text-3xl font-semibold">{profile.name}</h2>
              <p className="mt-2 text-ink/70">{profile.school}</p>
              <p className="mt-5 leading-7 text-ink/80">{profile.matchMessage}</p>
              <p className="mt-5 rounded-[1.25rem] bg-cream px-4 py-3 text-sm leading-6 text-ink/70">
                Destaque historico: {profile.experimentTitle}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

