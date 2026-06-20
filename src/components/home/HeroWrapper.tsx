"use client";

// Per Next.js 16 docs: ssr:false must live in a Client Component.
// This wrapper handles capability detection (mobile, reduced-motion) and
// gates the dynamic import of the R3F canvas so the main page stays SSR-able.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeroFallback } from "./HeroFallback";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

type Tier = "loading" | "scene" | "fallback";

export function HeroWrapper() {
  const [tier, setTier] = useState<Tier>("loading");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    setReducedMotion(motionQuery.matches);

    // Mobile → static fallback; desktop (even with reduced-motion) → scene
    // with animation skipped and resolved state shown immediately.
    setTier(mobileQuery.matches ? "fallback" : "scene");

    const onMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    motionQuery.addEventListener("change", onMotionChange);
    return () => motionQuery.removeEventListener("change", onMotionChange);
  }, []);

  if (tier === "loading") {
    // During SSR and the hydration frame — render nothing so the canvas
    // never flashes on server, and the text behind it is already visible.
    return null;
  }

  if (tier === "fallback") {
    return <HeroFallback />;
  }

  // Desktop: full R3F scene. reducedMotion skips the animation and shows
  // the solid "resolved" state immediately (design-system §8 requirement).
  return <HeroScene reducedMotion={reducedMotion} />;
}
