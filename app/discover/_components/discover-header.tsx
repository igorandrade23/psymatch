"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";
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
        <BrandLogo size="sm" className="mt-2" />
      </div>

      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
      >
        <motion.div whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Link
          href="/messages"
          className="rounded-full border border-sky-300/25 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 shadow-sm backdrop-blur"
          >
            {t(discoverCopy.messagesButton)}
          </Link>
        </motion.div>
        <motion.div whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Link
          href="/matches"
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 shadow-sm backdrop-blur"
          >
            {t(discoverCopy.matchesButton)} ({likedCount})
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
}
