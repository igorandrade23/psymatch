"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { psychologists } from "@/data/psychologists";
import { buildMessageId, ensureChatForProfile } from "@/lib/chats";
import { loadChats, loadState, saveChats, type MatchChat } from "@/lib/storage";

export default function MessageThreadPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [userName, setUserName] = useState("");
  const [chats, setChats] = useState<MatchChat[]>([]);
  const [draft, setDraft] = useState("");

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

  const profile = useMemo(
    () => psychologists.find((item) => item.slug === slug) ?? null,
    [slug],
  );

  const chat = useMemo(
    () => chats.find((item) => item.slug === slug) ?? null,
    [chats, slug],
  );

  function handleSendReply() {
    if (!chat || !profile) {
      return;
    }

    const text = draft.trim();
    if (!text || chat.repliedAt) {
      return;
    }

    const nextChats = chats.map((item) => {
      if (item.slug !== chat.slug) {
        return item;
      }

      return {
        ...item,
        repliedAt: Date.now(),
        messages: [
          ...item.messages,
          {
            id: buildMessageId(),
            sender: "user",
            text,
            createdAt: Date.now(),
          },
        ],
      };
    });

    setChats(nextChats);
    saveChats(nextChats);
    setDraft("");
  }

  if (!profile || !chat) {
    return (
      <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-6 text-white">
        <header className="mb-6">
          <Link
            href="/messages"
            className="rounded-full border border-white/20 bg-black/45 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur"
          >
            Voltar para inbox
          </Link>
        </header>
        <section className="rounded-[1.6rem] border border-white/15 bg-gradient-to-b from-[#17151d] to-[#0f0e14] p-6">
          <h1 className="text-2xl font-semibold">Conversa nao encontrada</h1>
          <p className="mt-2 text-white/70">Esse chat ainda nao existe para este perfil.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-6 text-white">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link
          href="/messages"
          className="rounded-full border border-white/20 bg-black/45 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur"
        >
          Inbox
        </Link>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">Conversa</p>
          <h1 className="text-xl font-semibold">{profile.name}</h1>
        </div>
      </header>

      <section className="rounded-[1.6rem] border border-fuchsia-300/20 bg-gradient-to-b from-[#191622] to-[#0f0d16] p-4 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
        <div className="space-y-3">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.sender === "match"
                  ? "mr-auto bg-white/10 text-white"
                  : "ml-auto bg-fuchsia-500/30 text-white"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {chat.repliedAt ? (
          <p className="mt-4 rounded-xl border border-amber-200/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
            {userName || "Voce"} respondeu. Desde entao, ficou no vacuo.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`Responder para ${profile.name}...`}
              className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-fuchsia-300/45 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSendReply}
              className="rounded-xl border border-fuchsia-300/45 bg-fuchsia-500/25 px-4 py-2 text-sm font-semibold text-fuchsia-100"
            >
              Enviar
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
