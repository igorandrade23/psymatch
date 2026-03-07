"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MatchModal } from "@/components/match-modal";
import { ProfileCard } from "@/components/profile-card";
import { psychologists } from "@/data/psychologists";
import { loadState, saveState } from "@/lib/storage";

export default function DiscoverPage() {
  const orderedProfiles = useMemo(
    () => [...psychologists].sort((a, b) => a.order - b.order),
    [],
  );
  const [userName, setUserName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSlugs, setLikedSlugs] = useState<string[]>([]);
  const [matchedSlug, setMatchedSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "super" | null>(null);
  const [swipeHint, setSwipeHint] = useState<"left" | "right" | "super" | null>(null);
  const [swipeHistory, setSwipeHistory] = useState<
    Array<{ slug: string; action: "left" | "right" | "super" }>
  >([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swipeTimerRef = useRef<number | null>(null);
  const actionGuardRef = useRef(false);

  useEffect(() => {
    const state = loadState();
    if (!state) {
      setIsLoading(false);
      return;
    }

    const safeIndex = Math.min(Math.max(0, state.currentIndex), orderedProfiles.length);
    setUserName(state.userName);
    setCurrentIndex(safeIndex);
    setLikedSlugs(state.likedSlugs);
    setIsLoading(false);
  }, [orderedProfiles.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [orderedProfiles.length]);

  const profile = orderedProfiles[currentIndex];
  const isMatchPending = Boolean(matchedSlug);

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

  const overlaySwipe = useMemo(() => {
    const direction = swipeHint ?? swipeDirection;
    if (!direction) {
      return null;
    }

    if (direction === "right") {
      return {
        icon: "heart",
        label: "GOSTEI",
        className:
          "pointer-events-none rounded-full border border-emerald-200/70 bg-emerald-400/12 text-emerald-100 px-14 py-7 text-center font-black text-3xl shadow-2xl shadow-emerald-400/30 ring-1 ring-emerald-200/35",
      };
    }

    if (direction === "super") {
      return {
        icon: "star",
        label: "SUPER",
        className:
          "pointer-events-none rounded-full border border-sky-200/70 bg-sky-400/12 text-sky-100 px-14 py-7 text-center font-black text-3xl shadow-2xl shadow-sky-400/30 ring-1 ring-sky-200/35",
      };
    }

    return {
      icon: "times",
      label: "PASSEI",
      className:
          "pointer-events-none rounded-full border border-rose-200/70 bg-rose-400/12 text-rose-100 px-14 py-7 text-center font-black text-3xl shadow-2xl shadow-rose-400/30 ring-1 ring-rose-200/35",
      };
  }, [swipeDirection, swipeHint]);

  function goNext() {
    setCurrentIndex((current) => Math.min(current + 1, orderedProfiles.length));
  }

  function handleAction(type: "left" | "right" | "super") {
    if (isTransitioning || isMatchPending || !profile || actionGuardRef.current) {
      return;
    }

    actionGuardRef.current = true;
    setIsTransitioning(true);
    setSwipeDirection(type);
    setSwipeHistory((current) => [...current, { slug: profile.slug, action: type }]);

    if (type === "right" || type === "super") {
      if (!likedSlugs.includes(profile.slug)) {
        setLikedSlugs((current) => [...current, profile.slug]);
      }

      setMatchedSlug(profile.slug);
    }

    if (type === "left") {
      setMatchedSlug(null);
    }

    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
    }

    if (type === "right" || type === "super") {
      swipeTimerRef.current = window.setTimeout(() => {
        setSwipeDirection(null);
        setSwipeHint(null);
        setIsTransitioning(false);
        actionGuardRef.current = false;
      }, 260);
      return;
    }

    swipeTimerRef.current = window.setTimeout(() => {
      goNext();
      setSwipeDirection(null);
      setSwipeHint(null);
      setIsTransitioning(false);
      actionGuardRef.current = false;
      swipeTimerRef.current = null;
    }, 260);
  }

  function handleResetTimeline() {
    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }

    setCurrentIndex(0);
    setLikedSlugs([]);
    setSwipeHistory([]);
    setMatchedSlug(null);
    setSwipeDirection(null);
    setSwipeHint(null);
    setIsTransitioning(false);
    actionGuardRef.current = false;
  }

  function handleContinueAfterMatch() {
    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }

    setMatchedSlug(null);
    setSwipeDirection(null);
    setSwipeHint(null);
    setIsTransitioning(false);
    actionGuardRef.current = false;
    goNext();
  }

  function handleActionTap(type: "left" | "right" | "super") {
    return () => {
      if (isTransitioning || actionGuardRef.current) {
        return;
      }

      handleAction(type);
    };
  }

  useEffect(() => {
    return () => {
      if (swipeTimerRef.current !== null) {
        window.clearTimeout(swipeTimerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#060608] text-white">
        <div className="relative grid w-full max-w-sm place-items-center px-6 text-center">
          <motion.div
            className="mb-7 grid h-28 w-28 place-items-center rounded-full border border-fuchsia-300/35 bg-fuchsia-500/20 shadow-[0_0_35px_rgba(240,114,210,0.35)]"
            initial={{ scale: 0.9, rotate: -8, opacity: 0.7 }}
            animate={{
              scale: [0.9, 1.03, 0.9],
              rotate: [-8, 4, -8],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
          >
            <span className="text-[1.6rem] font-black tracking-[0.32em] text-fuchsia-100">
              🧠
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl font-black tracking-[0.24em] text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-300 to-sky-300 bg-clip-text"
            initial={{ letterSpacing: "0.24em", opacity: 0.8 }}
            animate={{ letterSpacing: "0.3em", opacity: 1 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
          >
            PsyMatch
          </motion.h1>

          <motion.p
            className="mt-4 text-sm uppercase tracking-[0.35em] text-white/65"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
          >
            Carregando experiência
          </motion.p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center bg-[#060608] px-6 py-16 text-center text-white">
        <p className="text-sm uppercase tracking-[0.35em] text-white/70">
          Jornada concluida
        </p>
        <h1 className="mt-4 text-5xl font-semibold">
          Voce chegou ao fim da linha do tempo inicial.
        </h1>
        <p className="mt-5 text-lg leading-8 text-white/75">
          {userName || "Voce"} explorou todos os perfis disponiveis por enquanto.
          Seus matches continuam salvos localmente.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {swipeHistory.length > 0 && currentIndex > 0 ? (
            <button
              type="button"
              onClick={handleResetTimeline}
              className="rounded-full border border-cyan-200/25 bg-gradient-to-r from-cyan-500/55 via-sky-500/55 to-blue-500/55 px-6 py-4 text-sm font-black tracking-[0.2em] text-white shadow-lg shadow-cyan-500/30 backdrop-blur-lg"
            >
              ↺ Voltar
            </button>
          ) : null}
          <Link
            href="/matches"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-6 py-4 font-semibold text-white shadow-lg shadow-fuchsia-500/35"
          >
            Ver matches
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/25 bg-black/45 px-6 py-4 font-semibold text-white"
          >
            Voltar ao inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-6 text-white">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/70">
            Ola, {userName || "estudante"}
          </p>
          <h1 className="mt-2 text-2xl font-semibold">PsyMatch</h1>
        </div>

        <Link
          href="/matches"
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 shadow-sm backdrop-blur"
        >
          Ver matches ({likedSlugs.length})
        </Link>
      </header>

      <p className="mb-4 text-xs font-medium text-white/70">
        Arraste o card para a direita para gostar, para cima para super gostar e para a esquerda para pular.
      </p>

      <AnimatePresence>
        {overlaySwipe ? (
          <motion.div
            key={`${overlaySwipe.label}-${currentIndex}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`z-10 grid grid-cols-[2.5rem_auto] items-center gap-3 ${overlaySwipe.className}`}
            >
              <span
              className="grid h-10 w-10 place-items-center text-current"
                aria-hidden
              >
                {overlaySwipe.icon === "heart" ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 -translate-x-[1px]"
                  >
                    <path
                      d="m12 20.8-7.2-6.6c-1.7-1.56-2.8-3.35-2.8-5.3 0-3.76 3.04-6.9 6.8-6.9 1.75 0 3.3.68 4.5 1.8 1.2-1.12 2.75-1.8 4.5-1.8 3.76 0 6.8 3.14 6.8 6.9 0 2-.95 3.7-2.5 5.06L12 20.8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : overlaySwipe.icon === "times" ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                  >
                    <path
                      d="M18 6 6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                  >
                    <path
                      d="m12 2.5 3.1 6.3 6.9.6-5.1 4.7 1.6 6.8L12 18.4 6 20.9l1.4-6.8-5.1-4.7 6.9-.6L12 2.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span>{overlaySwipe.label}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
          <ProfileCard
            key={profile.slug}
            profile={profile}
            onPass={() => handleAction("left")}
            onLike={() => handleAction("right")}
            onSuperLike={() => handleAction("super")}
            onUndo={swipeHistory.length > 0 || currentIndex > 0 ? handleResetTimeline : undefined}
            onSwipeHint={setSwipeHint}
            isBusy={isTransitioning || isMatchPending}
            swipeDirection={swipeDirection}
          />
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-6">
        <div className="mx-auto flex max-w-sm items-center justify-between gap-6 px-4 pb-2 pt-1">
          <button
            type="button"
            onClick={handleResetTimeline}
            onTouchStart={(event) => {
              event.preventDefault();
              handleResetTimeline();
            }}
            onPointerDown={(event) => {
              event.currentTarget.focus();
            }}
            disabled={swipeHistory.length === 0 && currentIndex === 0}
            className="z-50 grid h-10 w-10 place-items-center shrink-0 rounded-full border border-amber-300/35 bg-amber-300/10 p-0 text-amber-200 shadow-lg shadow-amber-300/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-40"
            aria-label="Voltar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 12a9 9 0 1 1 2.635 6.364"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.8 15.8v-3.6h3.6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="grid flex-1 max-w-[17.5rem] grid-cols-3 gap-5">
            <button
              type="button"
              onTouchStart={(event) => {
                event.preventDefault();
                handleActionTap("left")();
              }}
              onClick={handleActionTap("left")}
              disabled={isTransitioning || isMatchPending}
              className="grid h-12 w-12 place-items-center rounded-full border border-rose-300/35 bg-rose-500/10 text-rose-200 shadow-lg shadow-rose-500/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-60"
              aria-label="Passei"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="m18 6-12 12M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onTouchStart={(event) => {
                event.preventDefault();
                handleActionTap("super")();
              }}
              onClick={handleActionTap("super")}
              disabled={isTransitioning || isMatchPending}
              className="grid h-12 w-12 place-items-center rounded-full border border-sky-300/35 bg-sky-500/10 text-sky-200 shadow-lg shadow-sky-500/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-60"
              aria-label="Super gostar"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="m12 2.5 3.1 6.3 6.9.6-5.1 4.7 1.6 6.8L12 18.4 6 20.9l1.4-6.8-5.1-4.7 6.9-.6L12 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onTouchStart={(event) => {
                event.preventDefault();
                handleActionTap("right")();
              }}
              onClick={handleActionTap("right")}
              disabled={isTransitioning || isMatchPending}
              className="grid h-12 w-12 place-items-center rounded-full border border-emerald-300/35 bg-emerald-500/10 text-emerald-200 shadow-lg shadow-emerald-500/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-60"
              aria-label="Gostei"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="m12 21-1.3-.9C5 16.6 2 13.8 2 10.4c0-3 2.3-5.4 5.4-5.4 1.8 0 3.6.8 4.6 2.2.15.2.29.4.4.6.11-.2.25-.4.4-.6 1-1.4 2.8-2.2 4.6-2.2 3.1 0 5.4 2.4 5.4 5.4 0 3.4-3 6.2-8.7 9.7Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MatchModal
        profile={matchedProfile}
        userName={userName}
        onClose={handleContinueAfterMatch}
      />
    </main>
  );
}
