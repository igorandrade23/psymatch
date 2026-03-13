"use client";

import { motion } from "framer-motion";
import { BrandFlameIcon } from "@/components/brand-logo";

type AppLoadingScreenProps = {
  label: string;
  fullscreen?: boolean;
};

export function AppLoadingScreen({
  label,
  fullscreen = true,
}: AppLoadingScreenProps) {
  return (
    <main
      className={`flex items-center justify-center bg-[#060608] text-white ${
        fullscreen ? "fixed inset-0 z-50" : "min-h-screen"
      }`}
    >
      <div className="relative grid w-full max-w-sm place-items-center overflow-hidden px-6 text-center">
        <motion.div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(244,114,182,0.22)_0%,_rgba(251,113,133,0.16)_34%,_rgba(56,189,248,0.12)_58%,_transparent_78%)] blur-3xl"
          animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.38, 0.9, 0.38] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.8, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-8 top-[28%] h-2.5 w-2.5 rounded-full bg-pink-200/80"
          animate={{ y: [0, -14, 0], x: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.1, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-10 top-[34%] h-2 w-2 rounded-full bg-sky-200/80"
          animate={{ y: [0, 10, 0], x: [0, -8, 0], opacity: [0.25, 0.95, 0.25] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-[24%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/80"
          animate={{ y: [0, -10, 0], opacity: [0.2, 0.85, 0.2] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.9, ease: "easeInOut", delay: 0.2 }}
        />

        <div className="relative z-10 h-16 w-full max-w-[16.5rem] sm:max-w-[17.5rem]">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 1, x: 0, scale: 1 }}
            animate={{
              x: [0, 0, -100, -100],
              opacity: [1, 1, 1, 1],
              scale: [1, 1, 1, 1],
            }}
            transition={{
              duration: 1.15,
              times: [0, 0.36, 0.78, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <BrandFlameIcon size="md" animated />
          </motion.div>

          <motion.div
            className="absolute left-[5.8rem] right-0 top-[calc(50%+10px)] overflow-hidden whitespace-nowrap text-left"
            initial={{ opacity: 0, width: 0, x: 8 }}
            animate={{
              opacity: [0, 0, 1, 1],
              width: ["0rem", "0rem", "calc(100% - 5.8rem)", "calc(100% - 5.8rem)"],
              x: [8, 8, 0, 0],
            }}
            transition={{
              duration: 1.1,
              times: [0, 0.5, 0.82, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="font-black leading-none"
              style={{
                fontFamily: "var(--font-title), var(--font-body), system-ui, sans-serif",
                fontSize: "clamp(1.7rem, 9vw, 2.35rem)",
              }}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"] }}
              transition={{
                duration: 1.1,
                times: [0, 0.5, 0.82, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-white">Psy</span>
              <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-sky-300 bg-clip-text text-transparent">
                Match
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mt-8 h-2 w-40 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[inset_0_0_18px_rgba(255,255,255,0.06)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(249,168,212,0.95)_0%,_rgba(251,113,133,0.78)_42%,_rgba(56,189,248,0.52)_72%,_transparent_100%)] blur-[2px]"
            animate={{
              x: ["-130%", "130%", "-90%"],
              scale: [0.88, 1.1, 0.92],
              opacity: [0.45, 0.95, 0.55],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          className="relative z-10 mt-5 text-sm font-medium uppercase tracking-[0.34em] text-white/65"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -1, 0] }}
          transition={{ delay: 1, repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: "easeInOut" }}
        >
          {label}
        </motion.p>
      </div>
    </main>
  );
}
