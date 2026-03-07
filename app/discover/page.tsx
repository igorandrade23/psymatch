"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MatchModal } from "@/components/match-modal";
import { ProfileCard } from "@/components/profile-card";
import { psychologists } from "@/data/psychologists";
import { loadState, saveState } from "@/lib/storage";

export default function DiscoverPage() {
  const [userName, setUserName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSlugs, setLikedSlugs] = useState<string[]>([]);
  const [matchedSlug, setMatchedSlug] = useState<string | null>(null);

  useEffect(() => {
    const state = loadState();
    if (!state) {
      return;
    }

    setUserName(state.userName);
    setCurrentIndex(state.currentIndex);
    setLikedSlugs(state.likedSlugs);
  }, []);

  const profile = psychologists[currentIndex];

  useEffect(() => {
    if (!userName) {
      return;
    }

    saveState({ userName, currentIndex, likedSlugs });
  }, [currentIndex, likedSlugs, userName]);

  const matchedProfile = useMemo(
    () => psychologists.find((item) => item.slug === matchedSlug) ?? null,
    [matchedSlug],
  );

  function goNext() {
    setCurrentIndex((current) => Math.min(current + 1, psychologists.length));
  }

  function handlePass() {
    goNext();
  }

  function handleLike() {
    if (!profile) {
      return;
    }

    if (!likedSlugs.includes(profile.slug)) {
      setLikedSlugs((current) => [...current, profile.slug]);
    }

    setMatchedSlug(profile.slug);
    goNext();
  }

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-ember">
          Jornada concluida
        </p>
        <h1 className="mt-4 text-5xl font-semibold">
          Voce chegou ao fim da linha do tempo inicial.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          {userName || "Voce"} explorou todos os perfis disponiveis por enquanto.
          Seus matches continuam salvos localmente.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/matches"
            className="rounded-full bg-ember px-6 py-4 font-semibold text-white"
          >
            Ver matches
          </Link>
          <Link
            href="/"
            className="rounded-full border border-ink/15 px-6 py-4 font-semibold"
          >
            Voltar ao inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-ember">
            Ola, {userName || "estudante"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold">
            Explorando a linha do tempo em ordem cronologica
          </h1>
        </div>

        <Link
          href="/matches"
          className="rounded-full border border-ink/15 bg-white px-5 py-3 font-semibold shadow-sm"
        >
          Ver matches ({likedSlugs.length})
        </Link>
      </header>

      <div className="mb-6 flex items-center justify-between text-sm uppercase tracking-[0.25em] text-ink/55">
        <span>
          Perfil {currentIndex + 1} de {psychologists.length}
        </span>
        <span>Modo cronologico</span>
      </div>

      <ProfileCard profile={profile} onPass={handlePass} onLike={handleLike} />

      <MatchModal
        profile={matchedProfile}
        userName={userName}
        onClose={() => setMatchedSlug(null)}
      />
    </main>
  );
}

