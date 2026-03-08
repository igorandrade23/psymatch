"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import type { SchoolEra } from "@/data/psychologists";

type EraCardProps = {
  era: SchoolEra;
  onContinue?: () => void;
  onSwipeHint?: (hint: "left" | "right" | null) => void;
  isBusy?: boolean;
  swipeDirection: "left" | "right" | "super" | null;
};

const SWIPE_DISTANCE_MIN = 92;
const SWIPE_DISTANCE_MAX = 240;

export function EraCard({
  era,
  onContinue,
  onSwipeHint,
  isBusy = false,
  swipeDirection,
}: EraCardProps) {
  const [dragHint, setDragHint] = useState<"left" | "right" | null>(null);
  const dragX = useMotionValue(0);
  const dragRotation = useTransform(dragX, [-420, 0, 420], [-12, 0, 12]);

  const accentStyles = useMemo(() => {
    if (era.accent === "sky") {
      return {
        badge:
          "border-sky-300/35 bg-sky-400/15 text-sky-100 shadow-sky-500/20",
        period: "border-sky-300/25 bg-sky-400/10 text-sky-100",
        panel: "from-sky-500/18 via-sky-400/8 to-transparent",
        ring: "ring-sky-300/18",
        glow: "shadow-sky-500/20",
        cta: "text-sky-100",
      };
    }

    return {
      badge:
        "border-amber-300/35 bg-amber-400/15 text-amber-100 shadow-amber-500/20",
      period: "border-amber-300/25 bg-amber-400/10 text-amber-100",
      panel: "from-amber-500/18 via-amber-400/8 to-transparent",
      ring: "ring-amber-300/18",
      glow: "shadow-amber-500/20",
      cta: "text-amber-100",
    };
  }, [era.accent]);

  useEffect(() => {
    const direction =
      dragHint ?? (swipeDirection === "left" || swipeDirection === "right" ? swipeDirection : null);
    onSwipeHint?.(direction);
  }, [dragHint, onSwipeHint, swipeDirection]);

  function swipeDistanceThreshold() {
    if (typeof window === "undefined") {
      return SWIPE_DISTANCE_MIN;
    }

    const width = Math.min(window.innerWidth, 420);
    return Math.max(SWIPE_DISTANCE_MIN, Math.min(Math.round(width * 0.22), SWIPE_DISTANCE_MAX));
  }

  function handleDrag(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy) {
      return;
    }

    const threshold = swipeDistanceThreshold();
    if (info.offset.x > threshold) {
      setDragHint("right");
      return;
    }
    if (info.offset.x < -threshold) {
      setDragHint("left");
      return;
    }
    setDragHint(null);
  }

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy) {
      return;
    }

    setDragHint(null);

    if (info.offset.x > swipeDistanceThreshold()) {
      animate(dragX, 0, { type: "spring", stiffness: 340, damping: 28 });
      onContinue?.();
      return;
    }

    if (info.offset.x < -swipeDistanceThreshold()) {
      animate(dragX, 0, { type: "spring", stiffness: 340, damping: 28 });
      onContinue?.();
      return;
    }

    dragX.stop();
    animate(dragX, 0, { type: "spring", stiffness: 320, damping: 26 });
  }

  const swipeExit = useMemo(() => {
    if (swipeDirection === "right") {
      return { x: 1400, y: -180, rotate: 12, opacity: 0 };
    }
    if (swipeDirection === "left") {
      return { x: -1400, y: 180, rotate: -12, opacity: 0 };
    }
    return { x: 0, y: 0, rotate: 0, opacity: 1 };
  }, [swipeDirection]);

  return (
    <motion.article
      drag="x"
      dragElastic={0.08}
      dragMomentum={false}
      dragConstraints={{ left: -340, right: 340 }}
      style={{ x: dragX, rotate: dragRotation }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragStart={() => setDragHint(null)}
      initial={{ x: 0, opacity: 0, rotate: 0, scale: 0.97 }}
      animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
      exit={swipeExit}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#17151c] via-[#121018] to-[#0b0a0f] shadow-[0_26px_65px_rgba(0,0,0,0.55)] ${accentStyles.glow}`}
      whileTap={{ cursor: "grabbing" }}
    >
      <div className="relative isolate h-[54vh] min-h-[25rem] overflow-hidden">
        <Image
          src={era.image}
          alt={`Capítulo da era ${era.name}`}
          fill
          sizes="(max-width: 420px) 100vw, 420px"
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${accentStyles.panel} via-black/15 from-black/82`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_32%)]" />

        <div className="absolute inset-x-5 top-5 flex items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] shadow-lg backdrop-blur ${accentStyles.badge}`}>
            {era.chapterLabel}
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5">
          <div className={`rounded-[1.6rem] border border-white/10 bg-black/45 p-5 shadow-2xl backdrop-blur-md ring-1 ${accentStyles.ring}`}>
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/55">
              {era.periodLabel}
            </p>
            <h1 className="mt-3 text-4xl font-black leading-none text-white">
              {era.name}
            </h1>
            <p className="mt-4 max-w-[18rem] text-lg font-medium leading-7 text-white/88">
              {era.tagline}
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-4 px-5 py-6">
        <div className="rounded-[1.4rem] bg-black/30 p-4 ring-1 ring-white/10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
            Resumo da fase
          </p>
          <p className="mt-3 leading-7 text-white/88">{era.summary}</p>
        </div>

        <div className="rounded-[1.4rem] bg-black/30 p-4 ring-1 ring-white/10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
            Clima educacional com piada interna
          </p>
          <p className="mt-3 leading-7 text-white/88">{era.vibe}</p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          disabled={isBusy}
          className="flex w-full items-center justify-between gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Próximo passo
            </p>
            <p className={`mt-2 text-sm font-semibold ${accentStyles.cta}`}>
              {era.cta}
            </p>
          </div>
          <span className="text-2xl text-white/50" aria-hidden>
            →
          </span>
        </button>
      </section>
    </motion.article>
  );
}
