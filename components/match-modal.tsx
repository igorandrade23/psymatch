"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Psychologist } from "@/data/psychologists";

type MatchModalProps = {
  profile: Psychologist | null;
  onClose: () => void;
  onViewProfile: () => void;
};

export function MatchModal({ profile, onClose, onViewProfile }: MatchModalProps) {
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
            className="grid max-h-[88vh] w-full max-w-sm overflow-hidden rounded-[1.8rem] border border-fuchsia-300/35 bg-gradient-to-b from-[#1c1222] via-[#16111c] to-[#0d0912] p-6 text-white shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
            initial={{ y: 30, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200 sm:text-sm">
              <span className="text-rose-300">💖</span>
              Deu Match
              <span className="text-rose-300">💖</span>
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
              {profile.name}
            </h2>
            <p className="mt-2 text-sm text-white/75">
              Vocês deram match.
            </p>

            <p className="mt-4 text-sm leading-6 text-white/75">
              O chat foi liberado e o perfil completo já está salvo nos seus matches.
            </p>

            <button
              type="button"
              onClick={onViewProfile}
              className="mt-5 w-full rounded-full border border-sky-300/35 bg-sky-500/20 px-4 py-3 text-center text-sm font-semibold tracking-[0.08em] text-sky-100 shadow-lg shadow-sky-500/30 transition hover:scale-[1.01] sm:text-base"
            >
              Ver perfil
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-red-500 px-4 py-3 text-sm font-semibold tracking-[0.08em] text-white shadow-lg shadow-fuchsia-500/45 transition hover:scale-[1.01] sm:text-base"
            >
              Continuar explorando
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

