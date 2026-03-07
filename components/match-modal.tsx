"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Psychologist } from "@/data/psychologists";

type MatchModalProps = {
  profile: Psychologist | null;
  userName: string;
  onClose: () => void;
};

export function MatchModal({ profile, userName, onClose }: MatchModalProps) {
  return (
    <AnimatePresence>
      {profile ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-black/70 px-3 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        <motion.div
            className="grid max-h-[88vh] w-full max-w-sm overflow-hidden rounded-[1.6rem] border border-fuchsia-300/30 bg-gradient-to-b from-[#15131b] via-[#111016] to-[#0b0a10] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
            initial={{ y: 30, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-200 sm:text-sm">
              Deu match
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
              {profile.name}
            </h2>
            <p className="mt-2 text-sm text-white/75">
              {userName}, seu like foi registrado com sucesso na linha do tempo.
            </p>

            <div className="mt-5 overflow-y-auto rounded-[1.5rem] border border-white/10 bg-black/40 p-4 text-base leading-7 text-white/90 shadow-sm">
              “{profile.matchMessage}”
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/40 transition hover:from-fuchsia-400 hover:to-rose-400 sm:text-base"
            >
              Continuar explorando
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

