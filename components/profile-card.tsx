"use client";

import { useEffect, useMemo, useState } from "react";
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
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onUndo?: () => void;
  onSwipeHint?: (hint: "left" | "right" | "super" | null) => void;
  isBusy?: boolean;
  swipeDirection: "left" | "right" | "super" | null;
};

const SWIPE_DISTANCE_PERCENT = 0.42;
const SWIPE_DISTANCE_MIN = 140;
const SWIPE_DISTANCE_MAX = 280;

export function ProfileCard({
  profile,
  onPass,
  onLike,
  onSuperLike,
  onUndo,
  onSwipeHint,
  isBusy = false,
  swipeDirection,
}: ProfileCardProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [dragPhotoPreview, setDragPhotoPreview] = useState(0);
  const [dragHint, setDragHint] = useState<"left" | "right" | "super" | null>(null);
  const isFunnyMode = false;

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const dragRotation = useTransform(dragX, [-420, 0, 420], [-16, 0, 16]);
  const photoDragX = useMotionValue(0);

  const metaRows = useMemo(
    () => [
      {
        icon: "🧠",
        label: "Escola",
        value: profile.school,
      },
      {
        icon: "🧪",
        label: "Papel",
        value: profile.role,
      },
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

  const aboutText = useMemo(() => {
    if (isFunnyMode) {
      return `${profile.lookingFor}\n\n${profile.labPuns.slice(0, 2).join("\n")}`;
    }

    return `${profile.bio}\n\n${profile.experimentTitle}: ${profile.experimentBody}`;
  }, [isFunnyMode, profile.bio, profile.experimentBody, profile.experimentTitle, profile.labPuns, profile.lookingFor]);

  useEffect(() => {
    const direction = dragHint ?? swipeDirection ?? null;
    onSwipeHint?.(direction);
  }, [dragHint, swipeDirection, onSwipeHint]);

  function swipeDistanceThreshold() {
    if (typeof window === "undefined") {
      return SWIPE_DISTANCE_MIN;
    }

    const width = Math.min(window.innerWidth, 420);
    return Math.min(
      Math.max(Math.round(width * SWIPE_DISTANCE_PERCENT), SWIPE_DISTANCE_MIN),
      SWIPE_DISTANCE_MAX,
    );
  }

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy) {
      return;
    }

    setDragHint(null);

    const superThreshold = 110;

    if (info.offset.y < -superThreshold && info.offset.y < -Math.abs(info.offset.x) * 0.6) {
      animate(dragX, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      animate(dragY, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      onSuperLike();
      return;
    }

    if (info.offset.x > swipeDistanceThreshold()) {
      animate(dragX, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      animate(dragY, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      onLike();
      return;
    }

    if (info.offset.x < -swipeDistanceThreshold()) {
      animate(dragX, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      animate(dragY, 0, {
        type: "spring",
        stiffness: 340,
        damping: 28,
      });
      onPass();
      return;
    }

    dragX.stop();
    dragY.stop();
    animate(dragX, 0, {
      type: "spring",
      stiffness: 320,
      damping: 26,
    });
    animate(dragY, 0, {
      type: "spring",
      stiffness: 320,
      damping: 26,
    });
  }

  function handleDrag(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy) {
      return;
    }

    const { x } = info.offset;
    const { y } = info.offset;
    const superThreshold = 72;
    const threshold = Math.min(Math.max(swipeDistanceThreshold() * 0.7, 70), 120);

    if (y < -superThreshold && y < -Math.abs(x) * 0.6) {
      setDragHint("super");
      return;
    }

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
    if (isBusy) {
      return;
    }

    setDragPhotoPreview(previewFromOffset(info.offset.x));
  }

  function handlePhotoDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (isBusy) {
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
      drag
      dragElastic={0.08}
      dragMomentum={false}
      dragConstraints={{ left: -340, right: 340, top: -340, bottom: 0 }}
      style={{ x: dragX, y: dragY, rotate: dragRotation }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onDragStart={() => {
        setDragHint(null);
      }}
      initial={{ x: 0, opacity: 0, rotate: 0, scale: 0.97 }}
      animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
      exit={swipeExit}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="relative w-full overflow-hidden rounded-[2rem] border border-fuchsia-500/20 bg-gradient-to-b from-[#17151c] via-[#121018] to-[#0b0a0f] pb-6 shadow-[0_26px_65px_rgba(0,0,0,0.55)]"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="relative isolate h-[56vh] min-h-[55vh] overflow-hidden"
        drag="x"
        dragElastic={0.08}
        dragConstraints={{ left: -120, right: 120 }}
        dragMomentum={false}
        onDragStart={(event) => {
          event.stopPropagation();
          setDragHint(null);
          setDragPhotoPreview(activePhoto);
        }}
        onDrag={handlePhotoDrag}
        onDragEnd={handlePhotoDragEnd}
        style={{ x: photoDragX }}
      >
        <img
          src={profile.photos[dragPhotoPreview]}
          alt={`Perfil de ${profile.name}`}
          className="h-full w-full object-cover"
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

      <section className="relative -mt-7 rounded-t-[2rem] border-t border-fuchsia-400/20 bg-gradient-to-b from-[#1a1821] via-[#15131c] to-[#0d0b12] px-5 py-6">
        <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-white">
            {profile.name}
          </h1>
          <p className="mt-1 text-2xl font-medium text-white/80">
            {profile.ageLabel}
          </p>
          <p className="mt-3 text-sm font-medium text-cyan-300">
            Verificado historicamente
          </p>
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

        <div className="mt-8 rounded-[1.25rem] bg-black/30 p-4 ring-1 ring-white/10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
            About me
          </p>
          <p className="mt-3 whitespace-pre-line leading-7 text-white/85">
            {aboutText}
          </p>
        </div>

      </section>
    </motion.article>
  );
}
