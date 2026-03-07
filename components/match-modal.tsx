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
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-[2rem] bg-[#fff8ef] p-8 shadow-card"
            initial={{ y: 30, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.98 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-ember">
              Deu match
            </p>
            <h2 className="mt-3 text-3xl font-semibold">{profile.name}</h2>
            <p className="mt-2 text-ink/70">
              {userName}, seu like foi registrado com sucesso na linha do tempo.
            </p>

            <div className="mt-6 rounded-[1.5rem] bg-white p-5 text-lg leading-8 text-ink shadow-sm">
              “{profile.matchMessage}”
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-ember px-5 py-4 font-semibold text-white transition hover:bg-ink"
            >
              Continuar explorando
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

