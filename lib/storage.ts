"use client";

export type StoredState = {
  userName: string;
  currentIndex: number;
  likedSlugs: string[];
};

export type ChatSender = "match" | "user";

export type ChatMessage = {
  id: string;
  sender: ChatSender;
  text: string;
  createdAt: number;
};

export type MatchChat = {
  slug: string;
  messages: ChatMessage[];
  repliedAt?: number;
};

const STORAGE_KEY = "psymatch-state";
const CHAT_STORAGE_KEY = "psymatch-chats";

export function loadState(): StoredState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredState;
  } catch {
    return null;
  }
}

export function saveState(state: StoredState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadChats(): MatchChat[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as MatchChat[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

export function saveChats(chats: MatchChat[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
}

