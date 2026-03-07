"use client";

export type StoredState = {
  userName: string;
  currentIndex: number;
  likedSlugs: string[];
};

const STORAGE_KEY = "psymatch-state";

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

