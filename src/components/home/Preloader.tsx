"use client";

// Signature intro — a restrained brand-mark reveal that dissolves into the
// page, per the luxury-property reference set (Springs, Aretè, ERA all open
// with a minimal mark that resolves into the hero). Shows once per session;
// honours prefers-reduced-motion by dismissing immediately.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Preloader({ wordmark }: { wordmark: string }) {
  // Start hidden during SSR/hydration to avoid a flash; decide on mount.
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("sukaj-intro-seen");
    if (reduce || seen) return;

    sessionStorage.setItem("sukaj-intro-seen", "1");
    setShow(true);
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 1900);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-sm md:text-base tracking-[0.42em] uppercase text-text"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            >
              {wordmark}
            </motion.p>
          </div>

          {/* Hairline that draws across beneath the mark */}
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 mt-16 block h-px bg-accent/45"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
