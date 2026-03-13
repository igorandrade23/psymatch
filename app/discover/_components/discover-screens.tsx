"use client";

import Link from "next/link";
import { AppLoadingScreen } from "@/components/app-loading-screen";
import { useLocale } from "@/lib/i18n-client";
import { discoverCopy } from "../_lib/discover-copy";

type CompletionScreenProps = {
  canUndo: boolean;
  onUndo: () => void;
};

export function DiscoverLoadingScreen() {
  const { t } = useLocale();

  return <AppLoadingScreen label={t(discoverCopy.loadingLabel)} />;
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
