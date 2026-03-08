"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EraCard } from "@/components/era-card";
import { MatchModal } from "@/components/match-modal";
import { MessageNotice } from "@/components/message-notice";
import { ProfileCard } from "@/components/profile-card";
import {
  discoverItems,
  psychologists,
  schoolEras,
  type Psychologist,
} from "@/data/psychologists";
import { ensureChatForProfile, removeChatForProfile } from "@/lib/chats";
import {
  clearPendingMessageNotice,
  loadChats,
  loadPendingMessageNotice,
  loadState,
  saveChats,
  savePendingMessageNotice,
  saveState,
} from "@/lib/storage";

const ACTION_PARTICLES = [
  { x: -130, y: -70, delay: 0.02 },
  { x: -96, y: 34, delay: 0.06 },
  { x: -58, y: -98, delay: 0.1 },
  { x: 0, y: -118, delay: 0.14 },
  { x: 58, y: -98, delay: 0.18 },
  { x: 96, y: 34, delay: 0.22 },
  { x: 130, y: -70, delay: 0.26 },
];
const SUPERLIKE_PARTICLES = [
  { x: -180, y: -210, delay: 0.01 },
  { x: -130, y: -280, delay: 0.04 },
  { x: -82, y: -235, delay: 0.07 },
  { x: -40, y: -315, delay: 0.1 },
  { x: 0, y: -350, delay: 0.13 },
  { x: 40, y: -315, delay: 0.16 },
  { x: 82, y: -235, delay: 0.19 },
  { x: 130, y: -280, delay: 0.22 },
  { x: 180, y: -210, delay: 0.25 },
];
const ACTION_EFFECT_DURATION_MS = 520;
const MATCH_MODAL_DELAY_MS = 560;
type ActionType = "left" | "right" | "super";
type SwipeHistoryEntry = {
  index: number;
  action: ActionType;
  profileSlug?: string;
};

export default function DiscoverPage() {
  const orderedDiscoverItems = useMemo(
    () => [...discoverItems].sort((a, b) => a.order - b.order),
    [],
  );
  const profilesBySlug = useMemo(
    () => new Map(psychologists.map((profile) => [profile.slug, profile])),
    [],
  );
  const erasBySlug = useMemo(
    () => new Map(schoolEras.map((era) => [era.slug, era])),
    [],
  );
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSlugs, setLikedSlugs] = useState<string[]>([]);
  const [newMessageProfile, setNewMessageProfile] = useState<Psychologist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<ActionType | null>(null);
  const [swipeHint, setSwipeHint] = useState<ActionType | null>(null);
  const [swipeHistory, setSwipeHistory] = useState<SwipeHistoryEntry[]>([]);
  const [actionEffect, setActionEffect] = useState<{
    id: number;
    type: ActionType;
  } | null>(null);
  const [matchModalProfile, setMatchModalProfile] = useState<Psychologist | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swipeTimerRef = useRef<number | null>(null);
  const actionEffectTimerRef = useRef<number | null>(null);
  const actionGuardRef = useRef(false);

  useEffect(() => {
    const state = loadState();
    const pendingNoticeSlug = loadPendingMessageNotice();
    if (!state) {
      if (pendingNoticeSlug) {
        const pendingProfile = profilesBySlug.get(pendingNoticeSlug) ?? null;
        setNewMessageProfile(pendingProfile);
      }
      setIsLoading(false);
      return;
    }

    const safeIndex = Math.min(Math.max(0, state.currentIndex), orderedDiscoverItems.length);
    setUserName(state.userName);
    setCurrentIndex(safeIndex);
    setLikedSlugs(state.likedSlugs);
    if (pendingNoticeSlug) {
      const pendingProfile = profilesBySlug.get(pendingNoticeSlug) ?? null;
      setNewMessageProfile(pendingProfile);
    }
    setIsLoading(false);
  }, [orderedDiscoverItems.length, profilesBySlug]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [orderedDiscoverItems.length]);

  const currentItem = orderedDiscoverItems[currentIndex];
  const profile =
    currentItem?.type === "profile" ? (profilesBySlug.get(currentItem.profileSlug) ?? null) : null;
  const era =
    currentItem?.type === "era" ? (erasBySlug.get(currentItem.eraSlug) ?? null) : null;
  const isEraCard = currentItem?.type === "era";
  const isFlowLocked = isTransitioning || Boolean(matchModalProfile);

  useEffect(() => {
    if (!userName) {
      return;
    }

    saveState({ userName, currentIndex, likedSlugs });
  }, [currentIndex, likedSlugs, userName]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentIndex]);

  const overlaySwipe = useMemo(() => {
    const direction = swipeHint ?? swipeDirection;
    if (!direction) {
      return null;
    }

    if (isEraCard) {
      return {
        icon: "star",
        label: "CONTINUAR",
        className:
          "pointer-events-none rounded-full border border-amber-200/70 bg-amber-400/12 px-10 py-6 text-center font-black text-2xl text-amber-100 shadow-2xl shadow-amber-400/30 ring-1 ring-amber-200/35",
      };
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
  }, [isEraCard, swipeDirection, swipeHint]);

  function goNext() {
    setCurrentIndex((current) => Math.min(current + 1, orderedDiscoverItems.length));
  }

  function handleAction(type: ActionType) {
    if (isFlowLocked || !currentItem || actionGuardRef.current) {
      return;
    }
    const normalizedAction = currentItem.type === "era" ? "right" : type;
    const currentProfile = currentItem.type === "profile" ? profile : null;

    actionGuardRef.current = true;
    setIsTransitioning(true);
    setSwipeDirection(normalizedAction);
    setSwipeHistory((current) => [
      ...current,
      {
        index: currentIndex,
        action: normalizedAction,
        profileSlug: currentProfile?.slug,
      },
    ]);

    if (actionEffectTimerRef.current !== null) {
      window.clearTimeout(actionEffectTimerRef.current);
    }

    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
    }

    if (!currentProfile) {
      setActionEffect(null);
      swipeTimerRef.current = window.setTimeout(() => {
        setSwipeDirection(null);
        setSwipeHint(null);
        goNext();
        setIsTransitioning(false);
        actionGuardRef.current = false;
        swipeTimerRef.current = null;
      }, MATCH_MODAL_DELAY_MS);
      return;
    }

    setActionEffect({ id: Date.now(), type: normalizedAction });
    actionEffectTimerRef.current = window.setTimeout(() => {
      setActionEffect(null);
      actionEffectTimerRef.current = null;
    }, ACTION_EFFECT_DURATION_MS);

    if (normalizedAction === "right" || normalizedAction === "super") {
      if (!likedSlugs.includes(currentProfile.slug)) {
        setLikedSlugs((current) => [...current, currentProfile.slug]);
      }
      const nextChats = ensureChatForProfile(
        loadChats(),
        currentProfile.slug,
        currentProfile.matchMessage,
      );
      saveChats(nextChats);
    }

    swipeTimerRef.current = window.setTimeout(() => {
      setSwipeDirection(null);
      setSwipeHint(null);
      if (normalizedAction === "left") {
        goNext();
      } else {
        setMatchModalProfile(currentProfile);
      }
      setIsTransitioning(false);
      actionGuardRef.current = false;
      swipeTimerRef.current = null;
    }, MATCH_MODAL_DELAY_MS);
  }

  function handleCloseMatchModal() {
    if (!matchModalProfile) {
      return;
    }

    savePendingMessageNotice(matchModalProfile.slug);
    setNewMessageProfile(matchModalProfile);
    setMatchModalProfile(null);
    goNext();
  }

  function handleViewMatchedProfile() {
    if (!matchModalProfile) {
      return;
    }

    const slug = matchModalProfile.slug;
    savePendingMessageNotice(slug);
    setNewMessageProfile(matchModalProfile);
    setMatchModalProfile(null);
    setActionEffect(null);
    setSwipeDirection(null);
    setSwipeHint(null);
    setIsTransitioning(false);
    actionGuardRef.current = false;
    goNext();
    router.push(`/matches?profile=${slug}`);
  }

  function handleUndoLastAction() {
    const lastAction = swipeHistory[swipeHistory.length - 1];
    if (!lastAction || isTransitioning || actionGuardRef.current || matchModalProfile) {
      return;
    }

    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }
    if (actionEffectTimerRef.current !== null) {
      window.clearTimeout(actionEffectTimerRef.current);
      actionEffectTimerRef.current = null;
    }

    setSwipeHistory((current) => current.slice(0, -1));
    setCurrentIndex(lastAction.index);
    if (lastAction.profileSlug && (lastAction.action === "right" || lastAction.action === "super")) {
      setLikedSlugs((current) => current.filter((slug) => slug !== lastAction.profileSlug));
      const chatsWithoutProfile = removeChatForProfile(loadChats(), lastAction.profileSlug);
      saveChats(chatsWithoutProfile);
    }

    if (newMessageProfile?.slug === lastAction.profileSlug) {
      setNewMessageProfile(null);
    }

    setActionEffect(null);
    setSwipeDirection(null);
    setSwipeHint(null);
    setIsTransitioning(false);
    actionGuardRef.current = false;
  }

  function handleIgnoreMessageNotice() {
    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }
    if (actionEffectTimerRef.current !== null) {
      window.clearTimeout(actionEffectTimerRef.current);
      actionEffectTimerRef.current = null;
    }

    setNewMessageProfile(null);
    clearPendingMessageNotice();
    setMatchModalProfile(null);
    setActionEffect(null);
    setSwipeDirection(null);
    setSwipeHint(null);
    setIsTransitioning(false);
    actionGuardRef.current = false;
  }

  function handleOpenMessageNotice() {
    if (!newMessageProfile) {
      return;
    }

    const slug = newMessageProfile.slug;
    handleIgnoreMessageNotice();
    router.push(`/messages/${slug}`);
  }

  function handleActionTap(type: ActionType) {
    return () => {
      if (isFlowLocked || actionGuardRef.current) {
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
      if (actionEffectTimerRef.current !== null) {
        window.clearTimeout(actionEffectTimerRef.current);
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

  if (!currentItem) {
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center bg-[#060608] px-6 py-16 text-center text-white">
        <p className="text-sm uppercase tracking-[0.35em] text-white/70">
          Jornada concluída
        </p>
        <h1 className="mt-4 text-5xl font-semibold">
          Não temos mais pessoas disponíveis na sua área.
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {swipeHistory.length > 0 && currentIndex > 0 ? (
            <button
              type="button"
              onClick={handleUndoLastAction}
              className="rounded-full border border-cyan-200/25 bg-gradient-to-r from-cyan-500/55 via-sky-500/55 to-blue-500/55 px-6 py-4 text-sm font-black tracking-[0.2em] text-white shadow-lg shadow-cyan-500/30 backdrop-blur-lg"
            >
              ↺ Desfazer
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
            Olá, {userName || "estudante"}
          </p>
          <h1 className="mt-2 text-2xl font-semibold">PsyMatch</h1>
        </div>

        <div className="flex gap-2">
          <Link
            href="/messages"
            className="rounded-full border border-sky-300/25 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 shadow-sm backdrop-blur"
          >
            Mensagens
          </Link>
          <Link
            href="/matches"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 shadow-sm backdrop-blur"
          >
            Ver matches ({likedSlugs.length})
          </Link>
        </div>
      </header>

      <p className="mb-4 text-xs font-medium text-white/70">
        {isEraCard
          ? "Arraste para seguir de era."
          : "Arraste no card para a direita/esquerda para decidir. Na foto, arraste para trocar."}
      </p>

      <AnimatePresence>
        {overlaySwipe ? (
          <motion.div
            key={`${overlaySwipe.label}-${currentIndex}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none"
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

      <MatchModal
        profile={matchModalProfile}
        onClose={handleCloseMatchModal}
        onViewProfile={handleViewMatchedProfile}
      />

      <MessageNotice
        profile={newMessageProfile}
        onClose={handleIgnoreMessageNotice}
        onOpen={handleOpenMessageNotice}
      />

      <AnimatePresence>
        {actionEffect ? (
          <motion.div
            key={`${actionEffect.type}-${actionEffect.id}`}
            className="pointer-events-none fixed inset-0 z-[60] grid place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`absolute inset-0 ${
                actionEffect.type === "right"
                  ? "bg-emerald-500/20"
                  : actionEffect.type === "super"
                    ? "bg-sky-500/20"
                    : "bg-rose-500/20"
              }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  actionEffect.type === "super" ? [0, 0.75, 0.2, 0] : [0, 0.45, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: actionEffect.type === "super" ? 0.7 : 0.45,
                ease: "easeOut",
              }}
            />

            <motion.div
              className={`relative grid h-28 w-28 place-items-center rounded-full border ${
                actionEffect.type === "right"
                  ? "border-emerald-200/80 bg-emerald-400/22 text-emerald-100 shadow-emerald-500/35"
                  : actionEffect.type === "super"
                    ? "border-sky-200/80 bg-sky-400/22 text-sky-100 shadow-sky-500/35"
                    : "border-rose-200/80 bg-rose-400/22 text-rose-100 shadow-rose-500/35"
              } shadow-2xl backdrop-blur-sm`}
              initial={{
                opacity: 0,
                scale: 0.6,
                x: actionEffect.type === "right" ? 55 : actionEffect.type === "left" ? -55 : 0,
                y: actionEffect.type === "super" ? 70 : 8,
                rotate: actionEffect.type === "left" ? -12 : actionEffect.type === "right" ? 12 : 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: actionEffect.type === "super" ? [0.45, 1.28, 1, 0.7] : [0.6, 1.1, 1, 0.9],
                x: 0,
                y: actionEffect.type === "super" ? [70, -12, -54, -120] : 0,
                rotate: 0,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: actionEffect.type === "super" ? 0.68 : 0.52,
                ease: actionEffect.type === "super" ? "anticipate" : "easeOut",
              }}
            >
              <span className="text-3xl">
                {actionEffect.type === "right" ? "♥" : actionEffect.type === "super" ? "★" : "✕"}
              </span>
            </motion.div>

            {(actionEffect.type === "super" ? SUPERLIKE_PARTICLES : ACTION_PARTICLES).map(
              (particle, index) => (
                <motion.span
                  key={`${actionEffect.id}-${index}`}
                  className={`absolute text-2xl ${
                    actionEffect.type === "right"
                      ? "text-emerald-200/95"
                      : actionEffect.type === "super"
                        ? "text-sky-200/95"
                        : "text-rose-200/95"
                  }`}
                  initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale:
                      actionEffect.type === "super" ? [0.3, 1.45, 0.55] : [0.4, 1.15, 0.7],
                    x: particle.x,
                    y: particle.y,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: actionEffect.type === "super" ? 0.7 : 0.5,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                >
                  {actionEffect.type === "right" ? "♥" : actionEffect.type === "super" ? "★" : "✕"}
                </motion.span>
              ),
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {era ? (
          <EraCard
            key={era.slug}
            era={era}
            onContinue={() => handleAction("right")}
            onSwipeHint={setSwipeHint}
            isBusy={isFlowLocked}
            swipeDirection={swipeDirection}
          />
        ) : profile ? (
          <ProfileCard
            key={profile.slug}
            profile={profile}
            onPass={() => handleAction("left")}
            onLike={() => handleAction("right")}
            onSuperLike={() => handleAction("super")}
            onUndo={swipeHistory.length > 0 ? handleUndoLastAction : undefined}
            onSwipeHint={setSwipeHint}
            isBusy={isFlowLocked}
            swipeDirection={swipeDirection}
            interactive
            photoSwipeEnabled
          />
        ) : null}
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-6">
        <div className="mx-auto flex max-w-sm items-center justify-between gap-6 px-4 pb-2 pt-1">
          <button
            type="button"
            onClick={handleUndoLastAction}
            onTouchStart={(event) => {
              event.preventDefault();
              handleUndoLastAction();
            }}
            onPointerDown={(event) => {
              event.currentTarget.focus();
            }}
            disabled={swipeHistory.length === 0}
            className={`z-50 grid place-items-center shrink-0 rounded-full border border-amber-300/35 bg-amber-300/10 p-0 text-amber-200 shadow-lg shadow-amber-300/30 backdrop-blur-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-40 ${
              isEraCard ? "h-8 w-8" : "h-10 w-10"
            }`}
            aria-label="Desfazer último swipe"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={isEraCard ? "h-4 w-4" : "h-5 w-5"}
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

          {isEraCard ? null : (
            <div className="grid max-w-[17.5rem] flex-1 grid-cols-3 gap-5">
              <button
                type="button"
                onTouchStart={(event) => {
                  event.preventDefault();
                  handleActionTap("left")();
                }}
                onClick={handleActionTap("left")}
                disabled={isFlowLocked}
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
                disabled={isFlowLocked}
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
                disabled={isFlowLocked}
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
          )}
        </div>
      </div>

    </main>
  );
}
