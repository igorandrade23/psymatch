"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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
import {
  ACTION_EFFECT_DURATION_MS,
  type ActionType,
  getOverlaySwipe,
  MATCH_MODAL_DELAY_MS,
  type SwipeHistoryEntry,
} from "./discover-config";
import { useLocale } from "@/lib/i18n-client";

export function useDiscoverFlow() {
  const { locale } = useLocale();
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

  const currentItem = orderedDiscoverItems[currentIndex];
  const profile =
    currentItem?.type === "profile" ? (profilesBySlug.get(currentItem.profileSlug) ?? null) : null;
  const era =
    currentItem?.type === "era" ? (erasBySlug.get(currentItem.eraSlug) ?? null) : null;
  const isEraCard = currentItem?.type === "era";
  const isFlowLocked = isTransitioning || Boolean(matchModalProfile);

  useEffect(() => {
    const state = loadState();
    const pendingNoticeSlug = loadPendingMessageNotice();

    if (!state) {
      if (pendingNoticeSlug) {
        setNewMessageProfile(profilesBySlug.get(pendingNoticeSlug) ?? null);
      }
      setIsLoading(false);
      return;
    }

    const safeIndex = Math.min(Math.max(0, state.currentIndex), orderedDiscoverItems.length);
    setUserName(state.userName);
    setCurrentIndex(safeIndex);
    setLikedSlugs(state.likedSlugs);

    if (pendingNoticeSlug) {
      setNewMessageProfile(profilesBySlug.get(pendingNoticeSlug) ?? null);
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

  const overlaySwipe = useMemo(
    () => getOverlaySwipe(swipeHint ?? swipeDirection, Boolean(isEraCard), locale),
    [isEraCard, locale, swipeDirection, swipeHint],
  );

  function goNext() {
    setCurrentIndex((current) => Math.min(current + 1, orderedDiscoverItems.length));
  }

  function clearActiveTimers() {
    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }
    if (actionEffectTimerRef.current !== null) {
      window.clearTimeout(actionEffectTimerRef.current);
      actionEffectTimerRef.current = null;
    }
  }

  function resetTransientState() {
    setActionEffect(null);
    setSwipeDirection(null);
    setSwipeHint(null);
    setIsTransitioning(false);
    actionGuardRef.current = false;
  }

  function handleAction(type: ActionType) {
    if (isFlowLocked || !currentItem || actionGuardRef.current) {
      return;
    }

    const normalizedAction = currentItem.type === "era"
      ? (type === "left" ? "left" : "right")
      : type;
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
      saveChats(
        ensureChatForProfile(loadChats(), currentProfile.slug, currentProfile.matchMessage),
      );
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
    resetTransientState();
    goNext();
    router.push(`/matches?profile=${slug}`);
  }

  function handleUndoLastAction() {
    const lastAction = swipeHistory[swipeHistory.length - 1];
    if (!lastAction || isTransitioning || actionGuardRef.current || matchModalProfile) {
      return;
    }

    clearActiveTimers();
    setSwipeHistory((current) => current.slice(0, -1));
    setCurrentIndex(lastAction.index);

    if (lastAction.profileSlug && (lastAction.action === "right" || lastAction.action === "super")) {
      setLikedSlugs((current) => current.filter((slug) => slug !== lastAction.profileSlug));
      saveChats(removeChatForProfile(loadChats(), lastAction.profileSlug));
    }

    if (newMessageProfile?.slug === lastAction.profileSlug) {
      setNewMessageProfile(null);
    }

    resetTransientState();
  }

  function handleIgnoreMessageNotice() {
    clearActiveTimers();
    setNewMessageProfile(null);
    clearPendingMessageNotice();
    setMatchModalProfile(null);
    resetTransientState();
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

  return {
    actionEffect,
    currentIndex,
    currentItem,
    era,
    handleAction,
    handleActionTap,
    handleCloseMatchModal,
    handleIgnoreMessageNotice,
    handleOpenMessageNotice,
    handleUndoLastAction,
    handleViewMatchedProfile,
    isEraCard,
    isFlowLocked,
    isLoading,
    likedSlugs,
    matchModalProfile,
    newMessageProfile,
    overlaySwipe,
    profile,
    setSwipeHint,
    swipeDirection,
    swipeHistory,
    userName,
  };
}
