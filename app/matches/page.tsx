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

  const matches = useMemo(() => {
    const ordered = [...psychologists].sort((a, b) => a.order - b.order);
    return ordered.filter((profile) => likedSlugs.includes(profile.slug));
  }, [likedSlugs]);

  return (
    <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-8 text-white">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">Biblioteca afetiva</p>
          <h1 className="mt-2 text-3xl font-semibold">
            Matches de {userName || "quem estuda com criterio"}
          </h1>
        </div>

        <Link
          href="/discover"
          className="rounded-full border border-white/20 bg-black/45 px-4 py-2 font-semibold text-white shadow-sm backdrop-blur"
        >
          Voltar
        </Link>
      </header>

      {matches.length === 0 ? (
        <section className="mt-10 rounded-[2rem] border border-white/15 bg-gradient-to-b from-[#17151d] to-[#0f0e14] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <h2 className="text-2xl font-semibold">Ainda sem matches</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/70">
            Quando voce der like em algum perfil, ele aparece aqui com a mensagem desbloqueada.
          </p>
        </section>
      ) : (
        <section className="mt-8 grid gap-4">
          {matches.map((profile) => (
            <article
              key={profile.slug}
              className="rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#1a1820] via-[#16141d] to-[#121018] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-200">
                Match #{profile.order}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{profile.name}</h2>
              <p className="mt-1 text-white/75">{profile.school}</p>
              <p className="mt-4 leading-7 text-white/90">{profile.matchMessage}</p>
              <p className="mt-4 rounded-[1.25rem] border border-white/10 bg-black/35 px-4 py-3 text-sm leading-6 text-white/75">
                Destaque historico: {profile.experimentTitle}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
