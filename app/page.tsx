"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppLoadingScreen } from "@/components/app-loading-screen";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { IntroForm } from "@/components/intro-form";
import { useLocale } from "@/lib/i18n-client";
import { clearAllLocalStorage } from "@/lib/storage";
import { homeCopy } from "./home-copy";

export default function HomePage() {
  const { resetLocale, t } = useLocale();
  const [isBooting, setIsBooting] = useState(true);
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (hasBootstrapped.current) {
      return;
    }

    hasBootstrapped.current = true;
    clearAllLocalStorage();
    resetLocale();

    const timeoutId = window.setTimeout(() => {
      setIsBooting(false);
    }, 2600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [resetLocale]);

  if (isBooting) {
    return <AppLoadingScreen label={t(homeCopy.loadingLabel)} />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1b1324_0%,_#120f16_52%,_#08070b_100%)] px-4 py-10">
      <LanguageSwitcher />
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm flex-col justify-center">
        <BrandLogo size="md" className="mt-6" />
        <motion.p
          className="mt-2 text-[0.94rem] leading-6 font-medium text-white"
          style={{ fontFamily: "var(--font-title), var(--font-body), system-ui, sans-serif" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
        >
          {t(homeCopy.subtitle)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <IntroForm />
        </motion.div>
      </section>
    </main>
  );
}
