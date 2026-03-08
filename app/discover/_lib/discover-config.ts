import type { AppLocale } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { discoverCopy } from "./discover-copy";

export const ACTION_PARTICLES = [
  { x: -130, y: -70, delay: 0.02 },
  { x: -96, y: 34, delay: 0.06 },
  { x: -58, y: -98, delay: 0.1 },
  { x: 0, y: -118, delay: 0.14 },
  { x: 58, y: -98, delay: 0.18 },
  { x: 96, y: 34, delay: 0.22 },
  { x: 130, y: -70, delay: 0.26 },
] as const;

export const SUPERLIKE_PARTICLES = [
  { x: -180, y: -210, delay: 0.01 },
  { x: -130, y: -280, delay: 0.04 },
  { x: -82, y: -235, delay: 0.07 },
  { x: -40, y: -315, delay: 0.1 },
  { x: 0, y: -350, delay: 0.13 },
  { x: 40, y: -315, delay: 0.16 },
  { x: 82, y: -235, delay: 0.19 },
  { x: 130, y: -280, delay: 0.22 },
  { x: 180, y: -210, delay: 0.25 },
] as const;

export const ACTION_EFFECT_DURATION_MS = 520;
export const MATCH_MODAL_DELAY_MS = 560;

export type ActionType = "left" | "right" | "super";

export type SwipeHistoryEntry = {
  index: number;
  action: ActionType;
  profileSlug?: string;
};

type OverlaySwipe = {
  icon: "heart" | "star" | "times";
  label: string;
  className: string;
};

export function getOverlaySwipe(
  direction: ActionType | null,
  isEraCard: boolean,
  locale: AppLocale,
): OverlaySwipe | null {
  if (!direction) {
    return null;
  }

  if (isEraCard) {
    return {
      icon: "star",
      label: resolveLocalizedValue(discoverCopy.overlayContinue, locale),
      className:
        "pointer-events-none rounded-full border border-amber-200/70 bg-amber-400/12 px-10 py-6 text-center font-black text-2xl text-amber-100 shadow-2xl shadow-amber-400/30 ring-1 ring-amber-200/35",
    };
  }

  if (direction === "right") {
    return {
      icon: "heart",
      label: resolveLocalizedValue(discoverCopy.overlayLike, locale),
      className:
        "pointer-events-none rounded-full border border-emerald-200/70 bg-emerald-400/12 px-14 py-7 text-center font-black text-3xl text-emerald-100 shadow-2xl shadow-emerald-400/30 ring-1 ring-emerald-200/35",
    };
  }

  if (direction === "super") {
    return {
      icon: "star",
      label: resolveLocalizedValue(discoverCopy.overlaySuper, locale),
      className:
        "pointer-events-none rounded-full border border-sky-200/70 bg-sky-400/12 px-14 py-7 text-center font-black text-3xl text-sky-100 shadow-2xl shadow-sky-400/30 ring-1 ring-sky-200/35",
    };
  }

  return {
    icon: "times",
    label: resolveLocalizedValue(discoverCopy.overlayPass, locale),
    className:
      "pointer-events-none rounded-full border border-rose-200/70 bg-rose-400/12 px-14 py-7 text-center font-black text-3xl text-rose-100 shadow-2xl shadow-rose-400/30 ring-1 ring-rose-200/35",
  };
}
