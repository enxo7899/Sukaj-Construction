"use client";

// Single-RAF-loop smooth scroll per design-system §9 and §10.
// Lenis is driven by GSAP's ticker (autoRaf: false) so that both Lenis and
// GSAP ScrollTrigger share one frame loop and never compete for GPU time.
// syncTouch: false — mobile uses native momentum scroll; Lenis only smooths
// wheel/trackpad on desktop.
// prefers-reduced-motion — if the user has opted out of motion, we skip Lenis
// entirely so the page uses native scroll without any interpolation.

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false,   // we drive it; no competing requestAnimationFrame
      syncTouch: false, // native touch momentum on mobile
    });

    // Keep GSAP ScrollTrigger in sync with Lenis's virtual scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000); // gsap ticker passes seconds; lenis.raf expects ms
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // prevent GSAP throttling on tab switch

    // Refresh all ScrollTrigger positions now that Lenis is driving scroll
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return <>{children}</>;
}
