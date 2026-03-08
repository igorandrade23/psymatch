"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageNotice } from "@/components/message-notice";
import { ProfileCard } from "@/components/profile-card";
import { psychologists } from "@/data/psychologists";
import type { Psychologist } from "@/data/psychologists";
import {
  clearPendingMessageNotice,
  loadPendingMessageNotice,
  loadState,
} from "@/lib/storage";

export default function MatchesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState("");
  const [likedSlugs, setLikedSlugs] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Psychologist | null>(null);
  const [newMessageProfile, setNewMessageProfile] = useState<Psychologist | null>(null);

  useEffect(() => {
    const state = loadState();
    const pendingNoticeSlug = loadPendingMessageNotice();
    if (!state) {
      if (pendingNoticeSlug) {
        const pendingProfile = psychologists.find((item) => item.slug === pendingNoticeSlug) ?? null;
        setNewMessageProfile(pendingProfile);
      }
      return;
    }

    setUserName(state.userName);
    setLikedSlugs(state.likedSlugs);
    if (pendingNoticeSlug) {
      const pendingProfile = psychologists.find((item) => item.slug === pendingNoticeSlug) ?? null;
      setNewMessageProfile(pendingProfile);
    }
  }, []);

  const matches = useMemo(() => {
    const ordered = [...psychologists].sort((a, b) => a.order - b.order);
    return ordered.filter((profile) => likedSlugs.includes(profile.slug));
  }, [likedSlugs]);

  useEffect(() => {
    const requestedSlug = searchParams.get("profile");
    if (!requestedSlug || matches.length === 0) {
      return;
    }

    const requestedProfile = matches.find((profile) => profile.slug === requestedSlug) ?? null;
    if (requestedProfile) {
      setSelectedProfile(requestedProfile);
    }
  }, [matches, searchParams]);

  function handleIgnoreMessageNotice() {
    setNewMessageProfile(null);
    clearPendingMessageNotice();
  }

  function handleOpenMessageNotice() {
    if (!newMessageProfile) {
      return;
    }

    const slug = newMessageProfile.slug;
    handleIgnoreMessageNotice();
    router.push(`/messages/${slug}`);
  }

  if (selectedProfile) {
    return (
      <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-6 text-white">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/65">Revisar match</p>
            <h1 className="mt-2 text-2xl font-semibold">Perfil completo</h1>
          </div>

          <button
            type="button"
            onClick={() => setSelectedProfile(null)}
            className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/15 px-4 py-2 text-sm font-semibold text-fuchsia-100"
          >
            Voltar
          </button>
        </header>

        <ProfileCard
          profile={selectedProfile}
          swipeDirection={null}
          interactive={false}
          photoSwipeEnabled
          fullProfileView
        />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-8 text-white">
      <MessageNotice
        profile={newMessageProfile}
        onClose={handleIgnoreMessageNotice}
        onOpen={handleOpenMessageNotice}
        noticeKeyPrefix="matches-message-notice"
      />

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">Biblioteca afetiva</p>
          <h1 className="mt-2 text-3xl font-semibold">
            Matches de {userName || "quem estuda com critério"}
          </h1>
        </div>

        <div className="flex gap-2">
          <Link
            href="/messages"
            className="rounded-full border border-sky-300/25 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 shadow-sm backdrop-blur"
          >
            Mensagens
          </Link>
          <Link
            href="/discover"
            className="rounded-full border border-white/20 bg-black/45 px-4 py-2 font-semibold text-white shadow-sm backdrop-blur"
          >
            Voltar
          </Link>
        </div>
      </header>

      {matches.length === 0 ? (
        <section className="mt-10 rounded-[2rem] border border-white/15 bg-gradient-to-b from-[#17151d] to-[#0f0e14] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <h2 className="text-2xl font-semibold">Ainda sem matches</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/70">
            Quando você der like em algum perfil, ele aparece aqui e o chat abre na aba Mensagens.
          </p>
        </section>
      ) : (
        <section className="mt-8 grid gap-4">
          {matches.map((profile) => (
            <article
              key={profile.slug}
              className="grid w-full grid-cols-[6.5rem_1fr] items-center gap-4 rounded-[1.3rem] border border-white/15 bg-gradient-to-b from-[#17151d] to-[#0f0e14] p-3 shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
            >
              <button
                type="button"
                onClick={() => setSelectedProfile(profile)}
                className="relative h-24 w-24 overflow-hidden rounded-xl border border-white/15"
              >
                <Image
                  src={profile.photos[0]}
                  alt={`Miniatura de ${profile.name}`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </button>

              <div>
                <button
                  type="button"
                  onClick={() => setSelectedProfile(profile)}
                  className="text-left text-lg font-semibold leading-tight text-white transition hover:text-fuchsia-100"
                >
                  {profile.name}
                </button>
                <p className="mt-1 text-sm text-white/80">{profile.ageLabel}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-fuchsia-200/90">
                  {profile.school}
                </p>
                <p className="mt-2 text-sm text-white/70">{profile.distanceLabel}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
