import { AnimatePresence, motion } from "framer-motion";
import {
  ACTION_PARTICLES,
  SUPERLIKE_PARTICLES,
  type ActionType,
} from "../_lib/discover-config";

type SwipeOverlayProps = {
  currentIndex: number;
  overlaySwipe: {
    icon: "heart" | "star" | "times";
    label: string;
    className: string;
  } | null;
};

type ActionEffectOverlayProps = {
  actionEffect: {
    id: number;
    type: ActionType;
  } | null;
};

export function DiscoverSwipeOverlay({
  currentIndex,
  overlaySwipe,
}: SwipeOverlayProps) {
  const accentPalette =
    overlaySwipe?.icon === "heart"
      ? {
          glow: "from-emerald-300/24 via-emerald-400/10 to-transparent",
          halo: "bg-emerald-300/22",
          ring: "border-emerald-200/70",
        }
      : overlaySwipe?.icon === "star"
        ? {
            glow: "from-sky-300/24 via-cyan-300/10 to-transparent",
            halo: "bg-sky-300/22",
            ring: "border-sky-200/70",
          }
        : {
            glow: "from-rose-300/24 via-rose-400/10 to-transparent",
            halo: "bg-rose-300/22",
            ring: "border-rose-200/70",
          };

  return (
    <AnimatePresence>
      {overlaySwipe ? (
        <motion.div
          key={`${overlaySwipe.label}-${currentIndex}`}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${accentPalette.halo}`}
              animate={{ scale: [0.82, 1.08, 0.92], opacity: [0.18, 0.42, 0.2] }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </motion.div>

          <motion.div
            className={`z-10 overflow-hidden rounded-[2rem] bg-gradient-to-br ${accentPalette.glow} p-[1px]`}
            initial={{ scale: 0.8, rotate: overlaySwipe.icon === "times" ? -10 : 10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          >
            <div
              className={`grid grid-cols-[2.9rem_auto] items-center gap-4 rounded-[calc(2rem-1px)] border ${accentPalette.ring} bg-black/55 px-6 py-5 backdrop-blur-xl ${overlaySwipe.className}`}
            >
              <motion.span
                className="relative grid h-11 w-11 place-items-center text-current"
                aria-hidden
                animate={{ scale: [0.95, 1.08, 1], rotate: [0, overlaySwipe.icon === "times" ? -6 : 6, 0] }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <span className={`absolute inset-0 rounded-full blur-md ${accentPalette.halo}`} />
                {overlaySwipe.icon === "heart" ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative h-8 w-8 -translate-x-[1px]"
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
                    className="relative h-8 w-8"
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
                    className="relative h-8 w-8"
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
              </motion.span>
              <span>{overlaySwipe.label}</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function DiscoverActionEffectOverlay({
  actionEffect,
}: ActionEffectOverlayProps) {
  return (
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
            className={`absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
              actionEffect.type === "right"
                ? "bg-emerald-300/18"
                : actionEffect.type === "super"
                  ? "bg-sky-300/18"
                  : "bg-rose-300/18"
            }`}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{
              opacity: actionEffect.type === "super" ? [0.1, 0.55, 0.08] : [0.08, 0.35, 0.06],
              scale: actionEffect.type === "super" ? [0.55, 1.15, 0.92] : [0.65, 1, 0.86],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: actionEffect.type === "super" ? 0.72 : 0.55,
              ease: "easeOut",
            }}
          />

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
              opacity: actionEffect.type === "super" ? [0, 0.75, 0.2, 0] : [0, 0.45, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: actionEffect.type === "super" ? 0.7 : 0.45,
              ease: "easeOut",
            }}
          />

          {[0, 1].map((ring) => (
            <motion.span
              key={`ring-${actionEffect.id}-${ring}`}
              className={`absolute rounded-full border ${
                actionEffect.type === "right"
                  ? "border-emerald-200/35"
                  : actionEffect.type === "super"
                    ? "border-sky-200/40"
                    : "border-rose-200/35"
              }`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 0.55, 0],
                scale: ring === 0 ? [0.5, 1.4, 1.9] : [0.4, 1.15, 1.6],
              }}
              transition={{
                duration: actionEffect.type === "super" ? 0.85 : 0.6,
                delay: ring * 0.08,
                ease: "easeOut",
              }}
              style={{
                width: ring === 0 ? 160 : 220,
                height: ring === 0 ? 160 : 220,
              }}
            />
          ))}

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
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ rotate: [0, actionEffect.type === "left" ? -18 : 18, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <span className="text-3xl drop-shadow-[0_0_24px_currentColor]">
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
  );
}
