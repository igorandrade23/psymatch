"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { uiCopy } from "@/app/ui-copy";
import type { Psychologist } from "@/data/psychologists";
import { useLocale } from "@/lib/i18n-client";

type MatchModalProps = {
  profile: Psychologist | null;
  onClose: () => void;
  onViewProfile: () => void;
};

export function MatchModal({ profile, onClose, onViewProfile }: MatchModalProps) {
  const { t } = useLocale();
  const heartIcons = [0, 1, 2, 3, 4, 5];

  return (
    <AnimatePresence>
      {profile ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black/80 via-fuchsia-900/35 to-rose-950/45 px-3 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(244,114,182,0.28)_0%,_rgba(251,113,133,0.12)_30%,_rgba(14,10,20,0)_72%)] blur-3xl"
            animate={{ scale: [0.92, 1.06, 0.92], opacity: [0.45, 0.9, 0.45] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.2, ease: "easeInOut" }}
          />

          {heartIcons.map((index) => (
            <motion.span
              key={index}
              className="pointer-events-none absolute text-3xl text-fuchsia-300/55"
              initial={{ opacity: 0, scale: 0.4, y: 28 }}
              animate={{
                opacity: [0.15, 0.85, 0.15],
                scale: [0.8, 1.2, 0.8],
                y: [24, -20, 24],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2.4 + index * 0.3,
                delay: index * 0.24,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + index * 13}%`,
                top: `${18 + (index % 2) * 24}%`,
              }}
            >
              ♥
            </motion.span>
          ))}

          <motion.div
            className="relative grid max-h-[88vh] w-full max-w-sm overflow-hidden rounded-[2rem] border border-fuchsia-300/35 bg-[linear-gradient(180deg,rgba(36,18,44,0.98)_0%,rgba(20,14,28,0.98)_48%,rgba(10,8,16,0.98)_100%)] p-6 text-white shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
            initial={{ y: 30, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

            <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200 sm:text-sm">
              <span className="text-rose-300">💖</span>
              {t(uiCopy.itsAMatch)}
              <span className="text-rose-300">💖</span>
            </p>

            <div className="relative mt-4 flex items-center justify-center">
              <motion.div
                className="relative z-10 h-36 w-36 overflow-hidden rounded-[1.8rem] border border-fuchsia-200/30 shadow-[0_20px_40px_rgba(244,114,182,0.25)]"
                initial={{ scale: 0.9, y: 8, opacity: 0.4 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={profile.photos[0]}
                  alt={`Foto de ${profile.name}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </motion.div>
            </div>

            <h2 className="mt-6 text-center text-4xl font-semibold leading-tight sm:text-5xl">
              {profile.name}
            </h2>
            <p className="mt-3 text-center text-sm text-white/75">
              {t(uiCopy.youMatched)}
            </p>

            <p className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {t(uiCopy.chatUnlocked)}
            </p>

            <button
              type="button"
              onClick={onViewProfile}
              className="mt-6 w-full rounded-full border border-sky-300/35 bg-[linear-gradient(90deg,rgba(56,189,248,0.28)_0%,rgba(14,165,233,0.2)_100%)] px-4 py-3 text-center text-sm font-semibold tracking-[0.08em] text-sky-100 shadow-lg shadow-sky-500/30 transition hover:scale-[1.01] sm:text-base"
            >
              {t(uiCopy.viewProfile)}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-red-500 px-4 py-3 text-sm font-semibold tracking-[0.08em] text-white shadow-lg shadow-fuchsia-500/45 transition hover:scale-[1.01] sm:text-base"
            >
              {t(uiCopy.continueExploring)}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

