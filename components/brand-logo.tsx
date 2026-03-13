"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
};

type FlameIconProps = {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: {
    wrap: "gap-2",
    icon: "h-10 w-10",
    title: "text-xl",
    spark: "h-1.5 w-1.5",
  },
  md: {
    wrap: "gap-3",
    icon: "h-14 w-14",
    title: "text-3xl",
    spark: "h-2 w-2",
  },
  lg: {
    wrap: "gap-3",
    icon: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
    title: "text-[2.4rem] sm:text-[2.8rem]",
    spark: "h-2 w-2",
  },
} as const;

export function BrandFlameIcon({
  size = "md",
  animated = false,
  className = "",
}: FlameIconProps) {
  const gradientId = useId();
  const glowId = useId();
  const styles = sizeStyles[size];
  const prefersReducedMotion = useReducedMotion();
  const canAnimate = animated && !prefersReducedMotion;

  return (
    <motion.div
      className={`relative shrink-0 ${styles.icon} ${className}`.trim()}
      animate={
        canAnimate
          ? {
              rotate: [-4, 3, -4],
              y: [0, -2, 0],
              scale: [1, 1.03, 1],
            }
          : undefined
      }
      transition={
        canAnimate
          ? { duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          : undefined
      }
    >
      <motion.div
        className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,_rgba(244,114,182,0.32)_0%,_rgba(56,189,248,0.14)_45%,_transparent_72%)] blur-md"
        animate={canAnimate ? { scale: [0.92, 1.08, 0.92], opacity: [0.55, 0.95, 0.55] } : undefined}
        transition={
          canAnimate
            ? { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            : undefined
        }
      />

      <motion.span
        className={`absolute left-[10%] top-[14%] rounded-full bg-white/80 ${styles.spark}`}
        animate={canAnimate ? { opacity: [0.2, 1, 0.2], y: [0, -4, 0], x: [0, 2, 0] } : undefined}
        transition={
          canAnimate
            ? { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            : undefined
        }
      />
      <motion.span
        className={`absolute bottom-[18%] right-[8%] rounded-full bg-sky-300/80 ${styles.spark}`}
        animate={canAnimate ? { opacity: [0.25, 0.85, 0.25], y: [0, 3, 0], x: [0, -2, 0] } : undefined}
        transition={
          canAnimate
            ? { duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }
            : undefined
        }
      />

      <svg viewBox="0 0 64 64" className="relative h-full w-full drop-shadow-[0_10px_24px_rgba(244,114,182,0.35)]">
        <defs>
          <linearGradient id={gradientId} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f9a8d4" />
            <stop offset="0.45" stopColor="#fb7185" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id={glowId} cx="0" cy="0" r="1" gradientTransform="translate(33 15) rotate(66) scale(28)">
            <stop stopColor="#fff7fb" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fff7fb" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d="M34.2 6.2C38.6 12.5 44.8 20.6 46.1 30.6C47.8 43.6 40.1 54.7 28.2 56.3C18.2 57.7 10.2 50.8 8.8 41C7.4 30.9 13.3 23.2 20.2 17C26.2 11.6 30.8 8.2 34.2 6.2Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M34.2 6.2C38.6 12.5 44.8 20.6 46.1 30.6C47.8 43.6 40.1 54.7 28.2 56.3C18.2 57.7 10.2 50.8 8.8 41C7.4 30.9 13.3 23.2 20.2 17C26.2 11.6 30.8 8.2 34.2 6.2Z"
          fill={`url(#${glowId})`}
        />
        <path
          d="M33.5 11.6C37.2 16.9 40.8 22.6 41.7 29.8C42.9 39.2 37.1 47 29 48.1C21.4 49.2 15.2 44 14.1 36.4C13.1 29.3 17.3 23.8 22.6 19.1C27.1 15.1 30.7 12.5 33.5 11.6Z"
          fill="rgba(255,255,255,0.14)"
        />
        <motion.path
          d="M32.8 19.3C35.4 22.7 37.8 26.7 38.4 31.5C39.2 37.1 35.8 41.9 30.8 42.6C26.1 43.2 22.3 40 21.7 35.3C21.1 31 23.7 27.6 27 24.7C29.5 22.4 31.5 20.8 32.8 19.3Z"
          fill="rgba(255,255,255,0.9)"
          animate={canAnimate ? { scale: [0.96, 1.02, 0.96], opacity: [0.78, 0.96, 0.78] } : undefined}
          transition={
            canAnimate
              ? { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              : undefined
          }
          style={{ transformOrigin: "30px 31px" }}
        />
      </svg>
    </motion.div>
  );
}

export function BrandLogo({
  size = "md",
  className = "",
  animated = false,
}: BrandLogoProps) {
  const styles = sizeStyles[size];
  const prefersReducedMotion = useReducedMotion();
  const canAnimate = animated && !prefersReducedMotion;

  return (
    <motion.div
      className={`inline-flex items-center ${styles.wrap} ${className}`.trim()}
      initial={canAnimate ? { opacity: 0, y: 12 } : false}
      animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <BrandFlameIcon size={size} animated={animated} />

      <div className="leading-none">
        <motion.div
          className={`font-black ${styles.title}`}
          style={{ fontFamily: "var(--font-title), var(--font-body), system-ui, sans-serif" }}
          animate={canAnimate ? { y: [0, -1, 0] } : undefined}
          transition={
            canAnimate
              ? { duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              : undefined
          }
        >
          <span className="text-white">Psy</span>
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-sky-300 bg-clip-text text-transparent">
            Match
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
