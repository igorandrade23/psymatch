"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import type { Psychologist } from "@/data/psychologists";

type ProfileCardProps = {
  profile: Psychologist;
  onPass?: () => void;
  onLike?: () => void;
  onSuperLike?: () => void;
  onUndo?: () => void;
  onOpenProfile?: () => void;
  onSwipeHint?: (hint: "left" | "right" | "super" | null) => void;
  isBusy?: boolean;
  swipeDirection: "left" | "right" | "super" | null;
  interactive?: boolean;
  photoSwipeEnabled?: boolean;
  fullProfileView?: boolean;
};

const SWIPE_DISTANCE_PERCENT = 0.42;
const SWIPE_DISTANCE_MIN = 92;
const SWIPE_DISTANCE_MAX = 240;

type TextSection = {
  title: string;
  eyebrow: string;
  tone: string;
  content: string;
};

type ListSection = {
  title: string;
  eyebrow: string;
  tone: string;
  items: string[];
};

type ProfileSection = TextSection | ListSection;

export function ProfileCard({
  profile,
  onPass,
  onLike,
  onSuperLike,
  onUndo,
  onOpenProfile,
  onSwipeHint,
  isBusy = false,
  swipeDirection,
  interactive = true,
  photoSwipeEnabled = true,
  fullProfileView = false,
}: ProfileCardProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [dragPhotoPreview, setDragPhotoPreview] = useState(0);
  const [dragHint, setDragHint] = useState<"left" | "right" | "super" | null>(null);
  const isFunnyMode = false;

  const dragX = useMotionValue(0);
  const dragRotation = useTransform(dragX, [-420, 0, 420], [-16, 0, 16]);
  const photoDragX = useMotionValue(0);

  const metaRows = useMemo(
    () => [
      {
        icon: "📍",
        label: "Distância",
        value: profile.distanceLabel,
      },
      {
        icon: "🗓️",
        label: "Época",
        value: profile.ageLabel,
      },
    ],
    [profile],
  );

  const profileSections = useMemo(() => {
    const sections: ProfileSection[] = [
      {
        title: "Sobre mim",
        eyebrow: "Sobre mim",
        tone: "text-white/85",
        content: profile.bio,
      },
      {
        title: "Buscando",
        eyebrow: "Buscando",
        tone: "text-fuchsia-100",
        content: profile.lookingFor,
      },
      {
        title: profile.experimentTitle,
        eyebrow: profile.experimentTitle,
        tone: "text-white/85",
        content: profile.experimentBody,
      },
    ];

    if (profile.likes.length > 0) {
      sections.push({
        title: "Curte",
        eyebrow: "Curte",
        tone: "text-emerald-100",
        items: profile.likes,
      });
    }

    if (profile.dislikes && profile.dislikes.length > 0) {
      sections.push({
        title: "Evita",
        eyebrow: "Evita",
        tone: "text-rose-100",
        items: profile.dislikes,
      });
    }

    sections.push({
      title: isFunnyMode ? "Modo cãozinho" : "Cantadas de laboratório",
      eyebrow: isFunnyMode ? "Modo cãozinho" : "Cantadas de laboratório",
      tone: "text-amber-100",
      items: profile.labPuns,
    });

    return sections;
  }, [
    isFunnyMode,
    profile.bio,
    profile.dislikes,
    profile.experimentBody,
    profile.experimentTitle,
    profile.labPuns,
    profile.likes,
    profile.lookingFor,
  ]);

  const visibleSections = useMemo(() => {
    return profileSections.filter((section) => {
      if ("content" in section) {
        return section.content.trim().length > 0;
      }

      return section.items.length > 0;
    });
  }, [profileSections]);

  useEffect(() => {
    if (!interactive) {
      onSwipeHint?.(null);
      return;
    }

    const direction = dragHint ?? swipeDirection ?? null;
    onSwipeHint?.(direction);
  }, [dragHint, swipeDirection, onSwipeHint, interactive]);

  function swipeDistanceThreshold() {
    if (typeof window === "undefined") {
      return SWIPE_DISTANCE_MIN;
    }

    const width = Math.min(window.innerWidth, 420);
    return Math.max(SWIPE_DISTANCE_MIN, Math.min(Math.round(width * 0.22), SWIPE_DISTANCE_MAX));
  }

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy || !interactive) {
      return;
    }

    setDragHint(null);

    if (info.offset.x > swipeDistanceThreshold()) {
      animate(dragX, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      onLike?.();
      return;
    }

    if (info.offset.x < -swipeDistanceThreshold()) {
      animate(dragX, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      onPass?.();
      return;
    }

    dragX.stop();
    animate(dragX, 0, {
      type: "spring",
      stiffness: 320,
      damping: 26,
    });
  }

  function handleDrag(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy || !interactive) {
      return;
    }

    const { x } = info.offset;
    const threshold = swipeDistanceThreshold();

    if (x > threshold) {
      setDragHint("right");
      return;
    }

    if (x < -threshold) {
      setDragHint("left");
      return;
    }

    setDragHint(null);
  }

  function nextPhoto() {
    setActivePhoto((current) => Math.min(current + 1, profile.photos.length - 1));
  }

  function prevPhoto() {
    setActivePhoto(
      (current) => Math.max(current - 1, 0),
    );
  }

  const photoCount = profile.photos.length;
  const canSwipePhotos = photoSwipeEnabled && photoCount > 1;

  function previewFromOffset(offsetX: number) {
    if (photoCount <= 1) {
      return 0;
    }

    if (offsetX > 40) {
      return Math.max(activePhoto - 1, 0);
    }

    if (offsetX < -40) {
      return Math.min(activePhoto + 1, photoCount - 1);
    }

    return activePhoto;
  }

  function handlePhotoDrag(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy || !canSwipePhotos) {
      return;
    }

    setDragPhotoPreview(previewFromOffset(info.offset.x));
  }

  function handlePhotoDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy || !canSwipePhotos) {
      return;
    }

    const threshold = 72;
    const nextPreview = previewFromOffset(info.offset.x);
    photoDragX.stop();

    const shouldChangePhoto =
      info.offset.x > threshold || info.offset.x < -threshold;

    if (info.offset.x > threshold) {
      prevPhoto();
    } else if (info.offset.x < -threshold) {
      nextPhoto();
    }

    animate(photoDragX, 0, {
      type: "spring",
      stiffness: 340,
      damping: 28,
    });
    setDragPhotoPreview(shouldChangePhoto ? nextPreview : activePhoto);
  }

  useEffect(() => {
    setDragPhotoPreview(activePhoto);
  }, [activePhoto]);

  const swipeExit = useMemo(() => {
    const exitX = 1400;
    const exitY = 240;
    const superExitY = 360;

    if (swipeDirection === "right") {
      return { x: exitX, y: -exitY, rotate: 16, opacity: 0 };
    }
    if (swipeDirection === "left") {
      return { x: -exitX, y: exitY, rotate: -16, opacity: 0 };
    }
    if (swipeDirection === "super") {
      return { x: 0, y: -superExitY, rotate: 0, opacity: 0 };
    }
    return { x: 0, y: 0, rotate: 0, opacity: 1 };
  }, [swipeDirection]);

  return (
    <motion.article
      key={profile.slug}
      drag={interactive ? "x" : false}
      dragElastic={0.08}
      dragMomentum={false}
      dragConstraints={{ left: -340, right: 340 }}
      style={{ x: dragX, rotate: dragRotation }}
      onDragEnd={interactive ? handleDragEnd : undefined}
      onDrag={interactive ? handleDrag : undefined}
      onDragStart={() => {
        setDragHint(null);
      }}
      initial={{ x: 0, opacity: 0, rotate: 0, scale: 0.97 }}
      animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
      exit={swipeExit}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="relative w-full overflow-hidden rounded-[2rem] border border-fuchsia-500/20 bg-gradient-to-b from-[#17151c] via-[#121018] to-[#0b0a0f] pb-6 shadow-[0_26px_65px_rgba(0,0,0,0.55)]"
      whileTap={interactive ? { cursor: "grabbing" } : undefined}
      onTap={() => {
        onOpenProfile?.();
      }}
    >
      <motion.div
        className="relative isolate h-[56vh] min-h-[55vh] overflow-hidden"
        drag={canSwipePhotos ? "x" : false}
        dragElastic={0.08}
        dragConstraints={{ left: -120, right: 120 }}
        dragMomentum={false}
        onDragStart={(event) => {
          if (!canSwipePhotos) {
            return;
          }

          event.stopPropagation();
          setDragHint(null);
          setDragPhotoPreview(activePhoto);
        }}
        onDrag={handlePhotoDrag}
        onDragEnd={handlePhotoDragEnd}
        onTap={(event) => {
          event.stopPropagation();
          onOpenProfile?.();
        }}
        style={{ x: photoDragX }}
      >
        <Image
          src={profile.photos[dragPhotoPreview]}
          alt={`Perfil de ${profile.name}`}
          fill
          sizes="(max-width: 420px) 100vw, 420px"
          className="object-cover"
          loading="lazy"
        />

        {profile.photos.length > 1 ? (
          <>
              <button
                type="button"
                onClick={prevPhoto}
                onPointerDown={(event) => event.stopPropagation()}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 px-3 py-2 text-lg font-black text-fuchsia-200 backdrop-blur-md ring-1 ring-fuchsia-300/25"
              >
                ‹
              </button>

            <button
              type="button"
              onClick={nextPhoto}
              onPointerDown={(event) => event.stopPropagation()}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 px-3 py-2 text-lg font-black text-fuchsia-200 backdrop-blur-md ring-1 ring-fuchsia-300/25"
              >
                ›
              </button>

              <div className="absolute inset-x-3 top-3 flex gap-1">
                {profile.photos.map((_, index) => (
                  <span
                    key={`${profile.slug}-bar-${index}`}
                    className={`h-1 rounded-full transition-all ${
                      index === dragPhotoPreview ? "flex-[3] bg-white" : "flex-1 bg-white/30"
                    }`}
                  />
                ))}
              </div>

          </>
        ) : null}

      </motion.div>

      <section
        className={`relative -mt-7 flex-1 rounded-t-[2rem] border-t border-fuchsia-400/20 bg-gradient-to-b from-[#1a1821] via-[#15131c] to-[#0d0b12] px-5 py-6 ${
          fullProfileView ? "" : interactive ? "" : "overflow-y-auto"
        }`}
        style={fullProfileView || interactive ? undefined : { maxHeight: "39vh" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[2rem] font-bold leading-tight text-white">
              {profile.name}
            </h1>
            <p className="mt-1 text-2xl font-medium text-white/80">
              {profile.ageLabel} | {profile.role}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-sky-300/25 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                Signo: {profile.sign}
              </span>
              <span className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100">
                Escola: {profile.school}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {metaRows.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-sm text-white/85"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-base text-white/85">
                {item.icon}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {item.label}
                </p>
                <p className="mt-1 leading-6 text-white/95">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {visibleSections.map((section) => (
            <div
              key={section.title}
              className="rounded-[1.25rem] bg-black/30 p-4 ring-1 ring-white/10"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
                {section.eyebrow}
              </p>

              {"content" in section ? (
                <p className={`mt-3 whitespace-pre-line leading-7 ${section.tone}`}>
                  {section.content}
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className={`rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 leading-6 ${section.tone}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </section>
    </motion.article>
  );
}
