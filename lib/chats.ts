import type { Psychologist } from "@/data/psychologists";
import type { MatchChat } from "@/lib/storage";
import { getCurrentLocale, type LocalizedText, resolveLocalizedValue } from "@/lib/i18n";

export function buildMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function syncChatsWithMatches(existingChats: MatchChat[], matchedProfiles: Psychologist[]) {
  const bySlug = new Map(existingChats.map((chat) => [chat.slug, chat]));
  const locale = getCurrentLocale();

  for (const profile of matchedProfiles) {
    const existing = bySlug.get(profile.slug);
    if (!existing) {
      bySlug.set(profile.slug, {
        slug: profile.slug,
        messages: [
          {
            id: buildMessageId(),
            sender: "match",
            text: resolveLocalizedValue(profile.matchMessage, locale),
            createdAt: Date.now(),
          },
        ],
      });
      continue;
    }

    if (existing.messages.length === 0) {
      existing.messages = [
        {
          id: buildMessageId(),
          sender: "match",
          text: resolveLocalizedValue(profile.matchMessage, locale),
          createdAt: Date.now(),
        },
      ];
    }
  }

  return Array.from(bySlug.values());
}

export function ensureChatForProfile(
  chats: MatchChat[],
  slug: string,
  matchMessage: LocalizedText,
): MatchChat[] {
  const locale = getCurrentLocale();
  if (chats.some((chat) => chat.slug === slug)) {
    return chats;
  }

  const newChat: MatchChat = {
    slug,
    messages: [
      {
        id: buildMessageId(),
        sender: "match",
        text: resolveLocalizedValue(matchMessage, locale),
        createdAt: Date.now(),
      },
    ],
  };

  return [
    ...chats,
    newChat,
  ];
}

export function removeChatForProfile(chats: MatchChat[], slug: string): MatchChat[] {
  return chats.filter((chat) => chat.slug !== slug);
}
