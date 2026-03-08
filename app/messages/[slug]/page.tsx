"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { uiCopy } from "@/app/ui-copy";
import { psychologists } from "@/data/psychologists";
import { buildMessageId, ensureChatForProfile } from "@/lib/chats";
import { useLocale } from "@/lib/i18n-client";
import {
  loadChats,
  loadState,
  saveChats,
  type ChatMessage,
  type MatchChat,
} from "@/lib/storage";

export default function MessageThreadPage() {
  const { t } = useLocale();
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

    const newMessage: ChatMessage = {
      id: buildMessageId(),
      sender: "user",
      text,
      createdAt: Date.now(),
    };

    const nextChats = chats.map<MatchChat>((item) => {
      if (item.slug !== chat.slug) {
        return item;
      }

      const updatedChat: MatchChat = {
        ...item,
        repliedAt: Date.now(),
        messages: [
          ...item.messages,
          newMessage,
        ],
      };

      return updatedChat;
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
            {t(uiCopy.backToInbox)}
          </Link>
        </header>
        <section className="rounded-[1.6rem] border border-white/15 bg-gradient-to-b from-[#17151d] to-[#0f0e14] p-6">
          <h1 className="text-2xl font-semibold">{t(uiCopy.conversationNotFound)}</h1>
          <p className="mt-2 text-white/70">{t(uiCopy.conversationNotFoundBody)}</p>
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
          {t(uiCopy.inbox)}
        </Link>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">{t(uiCopy.conversation)}</p>
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
            {profile.name} {t(uiCopy.offlineNotice)}
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`${t(uiCopy.replyTo)} ${profile.name}...`}
              className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-fuchsia-300/45 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSendReply}
              className="rounded-xl border border-fuchsia-300/45 bg-fuchsia-500/25 px-4 py-2 text-sm font-semibold text-fuchsia-100"
            >
              {t(uiCopy.send)}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
