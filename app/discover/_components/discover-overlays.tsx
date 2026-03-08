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
          <div
            className={`z-10 grid grid-cols-[2.5rem_auto] items-center gap-3 ${overlaySwipe.className}`}
          >
            <span className="grid h-10 w-10 place-items-center text-current" aria-hidden>
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
  );
}
