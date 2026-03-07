"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { psychologists } from "@/data/psychologists";
import { ensureChatForProfile } from "@/lib/chats";
import { loadChats, loadState, saveChats, type MatchChat } from "@/lib/storage";

export default function MessagesPage() {
  const [userName, setUserName] = useState("");
  const [chats, setChats] = useState<MatchChat[]>([]);

  useEffect(() => {
    const state = loadState();
    const storedChats = loadChats();

    if (!state) {
      setChats([]);
      return;
    }

    setUserName(state.userName);
    const likedSlugSet = new Set(state.likedSlugs);
    const chatsForCurrentMatches = storedChats.filter((chat) => likedSlugSet.has(chat.slug));
    const likedProfiles = psychologists.filter((profile) => likedSlugSet.has(profile.slug));
    const syncedChats = likedProfiles.reduce(
      (current, profile) => ensureChatForProfile(current, profile.slug, profile.matchMessage),
      chatsForCurrentMatches,
    );
    setChats(syncedChats);
    saveChats(syncedChats);
  }, []);

  const profilesBySlug = useMemo(
    () => new Map(psychologists.map((profile) => [profile.slug, profile])),
    [],
  );

  const orderedChats = useMemo(() => {
    return [...chats]
      .filter((chat) => profilesBySlug.has(chat.slug))
      .sort((a, b) => {
        const aLast = a.messages[a.messages.length - 1]?.createdAt ?? 0;
        const bLast = b.messages[b.messages.length - 1]?.createdAt ?? 0;
        return bLast - aLast;
      });
  }, [chats, profilesBySlug]);

  return (
    <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-6 text-white">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">Mensagens</p>
          <h1 className="mt-2 text-2xl font-semibold">Inbox de {userName || "voce"}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/discover"
            className="rounded-full border border-white/20 bg-black/45 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur"
          >
            Descobrir
          </Link>
          <Link
            href="/matches"
            className="rounded-full border border-white/20 bg-black/45 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur"
          >
            Matches
          </Link>
        </div>
      </header>

      {orderedChats.length === 0 ? (
        <section className="mt-10 rounded-[2rem] border border-white/15 bg-gradient-to-b from-[#17151d] to-[#0f0e14] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <h2 className="text-2xl font-semibold">Sem conversa por enquanto</h2>
          <p className="mt-3 leading-7 text-white/70">
            Deu match? As conversas aparecem aqui com a primeira mensagem automatica.
          </p>
        </section>
      ) : (
        <section className="grid gap-3">
          {orderedChats.map((chat) => {
            const profile = profilesBySlug.get(chat.slug);
            if (!profile) {
              return null;
            }

            const lastMessage = chat.messages[chat.messages.length - 1];
            const senderLabel = lastMessage?.sender === "user" ? "Voce" : profile.name;

            return (
              <Link
                key={chat.slug}
                href={`/messages/${chat.slug}`}
                className="w-full rounded-[1.3rem] border border-white/15 bg-gradient-to-b from-[#17151d] to-[#0f0e14] p-3 text-left shadow-[0_14px_30px_rgba(0,0,0,0.35)] transition hover:border-fuchsia-300/40"
              >
                <div className="grid grid-cols-[3.8rem_1fr] items-center gap-3">
                  <Image
                    src={profile.photos[0]}
                    alt={`Foto de ${profile.name}`}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{profile.name}</p>
                    <p className="mt-1 truncate text-sm text-white/70">
                      {senderLabel}: {lastMessage?.text ?? "Sem mensagem"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
