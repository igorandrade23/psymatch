"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n-client";
import { discoverCopy } from "../_lib/discover-copy";

type DiscoverHeaderProps = {
  likedCount: number;
  userName: string;
};

export function DiscoverHeader({ likedCount, userName }: DiscoverHeaderProps) {
  const { t } = useLocale();

  return (
    <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-white/70">
          {t(discoverCopy.greetingPrefix)}, {userName || t(discoverCopy.fallbackUserName)}
        </p>
        <h1 className="mt-2 text-2xl font-semibold">{t(discoverCopy.appName)}</h1>
      </div>

      <div className="flex gap-2">
        <Link
          href="/messages"
          className="rounded-full border border-sky-300/25 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 shadow-sm backdrop-blur"
        >
          {t(discoverCopy.messagesButton)}
        </Link>
        <Link
          href="/matches"
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 shadow-sm backdrop-blur"
        >
          {t(discoverCopy.matchesButton)} ({likedCount})
        </Link>
      </div>
    </header>
  );
}
