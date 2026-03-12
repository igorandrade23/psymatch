"use client";

import { AnimatePresence } from "framer-motion";
import { EraCard } from "@/components/era-card";
import { MatchModal } from "@/components/match-modal";
import { MessageNotice } from "@/components/message-notice";
import { ProfileCard } from "@/components/profile-card";
import { useLocale } from "@/lib/i18n-client";
import { DiscoverBottomBar } from "./_components/discover-bottom-bar";
import { DiscoverHeader } from "./_components/discover-header";
import {
  DiscoverActionEffectOverlay,
  DiscoverSwipeOverlay,
} from "./_components/discover-overlays";
import {
  DiscoverCompletionScreen,
  DiscoverLoadingScreen,
} from "./_components/discover-screens";
import { discoverCopy } from "./_lib/discover-copy";
import { useDiscoverFlow } from "./_lib/use-discover-flow";

export default function DiscoverPage() {
  const { t } = useLocale();
  const {
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
  } = useDiscoverFlow();

  if (isLoading) {
    return <DiscoverLoadingScreen />;
  }

  if (!currentItem) {
    return (
      <DiscoverCompletionScreen
        canUndo={swipeHistory.length > 0 && currentIndex > 0}
        onUndo={handleUndoLastAction}
      />
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-sm bg-[#060608] px-4 py-6 text-white">
      <DiscoverHeader likedCount={likedSlugs.length} userName={userName} />

      <p className="mb-4 text-xs font-medium text-white/70">
        {isEraCard
          ? t(discoverCopy.eraInstruction)
          : t(discoverCopy.profileInstruction)}
      </p>

      <DiscoverSwipeOverlay currentIndex={currentIndex} overlaySwipe={overlaySwipe} />

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

      <DiscoverActionEffectOverlay actionEffect={actionEffect} />

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
            showIconicPhoto
          />
        ) : null}
      </AnimatePresence>

      <DiscoverBottomBar
        isEraCard={Boolean(isEraCard)}
        isFlowLocked={isFlowLocked}
        onActionTap={handleActionTap}
        onUndo={handleUndoLastAction}
        swipeHistoryCount={swipeHistory.length}
      />
    </main>
  );
}
