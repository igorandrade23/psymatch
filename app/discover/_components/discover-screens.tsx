"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n-client";
import { discoverCopy } from "../_lib/discover-copy";

type CompletionScreenProps = {
  canUndo: boolean;
  onUndo: () => void;
};

export function DiscoverLoadingScreen() {
  const { t } = useLocale();

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#060608] text-white">
      <div className="relative grid w-full max-w-sm place-items-center px-6 text-center">
        <motion.div
          className="mb-7 grid h-28 w-28 place-items-center rounded-full border border-fuchsia-300/35 bg-fuchsia-500/20 shadow-[0_0_35px_rgba(240,114,210,0.35)]"
          initial={{ scale: 0.9, rotate: -8, opacity: 0.7 }}
          animate={{
            scale: [0.9, 1.03, 0.9],
            rotate: [-8, 4, -8],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
        >
          <span className="text-[1.6rem] font-black tracking-[0.32em] text-fuchsia-100">
            🧠
          </span>
        </motion.div>

        <motion.h1
          className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-sky-300 bg-clip-text text-4xl font-black tracking-[0.24em] text-transparent"
          initial={{ letterSpacing: "0.24em", opacity: 0.8 }}
          animate={{ letterSpacing: "0.3em", opacity: 1 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
        >
          {t(discoverCopy.loadingTitle)}
        </motion.h1>

        <motion.p
          className="mt-4 text-sm uppercase tracking-[0.35em] text-white/65"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
        >
          {t(discoverCopy.loadingLabel)}
        </motion.p>
      </div>
    </main>
  );
}

export function DiscoverCompletionScreen({
  canUndo,
  onUndo,
}: CompletionScreenProps) {
  const { t } = useLocale();

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center bg-[#060608] px-6 py-16 text-center text-white">
      <p className="text-sm uppercase tracking-[0.35em] text-white/70">
        {t(discoverCopy.completionEyebrow)}
      </p>
      <h1 className="mt-4 text-5xl font-semibold">
        {t(discoverCopy.completionTitle)}
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {canUndo ? (
          <button
            type="button"
            onClick={onUndo}
            className="rounded-full border border-cyan-200/25 bg-gradient-to-r from-cyan-500/55 via-sky-500/55 to-blue-500/55 px-6 py-4 text-sm font-black tracking-[0.2em] text-white shadow-lg shadow-cyan-500/30 backdrop-blur-lg"
          >
            ↺ {t(discoverCopy.undoButton)}
          </button>
        ) : null}
        <Link
          href="/matches"
          className="rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-6 py-4 font-semibold text-white shadow-lg shadow-fuchsia-500/35"
        >
          {t(discoverCopy.seeMatchesButton)}
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/25 bg-black/45 px-6 py-4 font-semibold text-white"
        >
          {t(discoverCopy.backHomeButton)}
        </Link>
      </div>
    </main>
  );
}
