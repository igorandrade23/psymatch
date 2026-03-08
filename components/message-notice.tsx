"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Psychologist } from "@/data/psychologists";
import { localizedText } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";

type MessageNoticeProps = {
  profile: Psychologist | null;
  onClose: () => void;
  onOpen: () => void;
  noticeKeyPrefix?: string;
};

export function MessageNotice({
  profile,
  onClose,
  onOpen,
  noticeKeyPrefix = "message-notice",
}: MessageNoticeProps) {
  const { t } = useLocale();
  const lastPlayedSlugRef = useRef<string | null>(null);

  useEffect(() => {
    if (!profile || lastPlayedSlugRef.current === profile.slug || typeof window === "undefined") {
      return;
    }

    lastPlayedSlugRef.current = profile.slug;

    const AudioContextCtor = window.AudioContext ?? (window as Window & {
      webkitAudioContext?: typeof AudioContext;
    }).webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }

    try {
      const context = new AudioContextCtor();
      const now = context.currentTime;
      const gain = context.createGain();
      const oscillatorA = context.createOscillator();
      const oscillatorB = context.createOscillator();

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.045, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

      oscillatorA.type = "sine";
      oscillatorA.frequency.setValueAtTime(880, now);
      oscillatorA.frequency.exponentialRampToValueAtTime(1174.66, now + 0.18);

      oscillatorB.type = "triangle";
      oscillatorB.frequency.setValueAtTime(659.25, now);
      oscillatorB.frequency.exponentialRampToValueAtTime(880, now + 0.18);

      oscillatorA.connect(gain);
      oscillatorB.connect(gain);
      gain.connect(context.destination);

      oscillatorA.start(now);
      oscillatorB.start(now);
      oscillatorA.stop(now + 0.34);
      oscillatorB.stop(now + 0.34);

      window.setTimeout(() => {
        void context.close().catch(() => undefined);
      }, 450);
    } catch {
      // Ignore browsers that block autoplay or Web Audio setup.
    }
  }, [profile]);

  return (
    <AnimatePresence>
      {profile ? (
        <motion.div
          key={`${noticeKeyPrefix}-${profile.slug}`}
          className="fixed inset-x-0 top-3 z-[95] mx-auto w-full max-w-sm px-4"
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <motion.div
            drag="x"
            dragElastic={0.12}
            dragMomentum={false}
            dragConstraints={{ left: -220, right: 220 }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 110) {
                onClose();
              }
            }}
            onClick={onOpen}
            className="cursor-pointer rounded-2xl border border-sky-200/35 bg-gradient-to-r from-sky-500/25 via-cyan-500/20 to-blue-500/20 px-4 py-3 shadow-2xl shadow-sky-500/25 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.24em] text-sky-100/80">
                  {t(localizedText("Nova mensagem", { en: "New message" }))}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {t(
                    localizedText(`Você tem uma nova mensagem de ${profile.name}. Clique para ver.`, {
                      en: `You have a new message from ${profile.name}. Tap to open.`,
                    }),
                  )}
                </p>
              </div>
              <button
                type="button"
                aria-label="Fechar notificação"
                onClick={(event) => {
                  event.stopPropagation();
                  onClose();
                }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-black/15 text-sm font-bold text-white/85 transition hover:bg-black/25"
              >
                ×
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
