---
name: project-overview
description: Sukaj Construction — stack, structure, locked conventions
metadata:
  type: project
---

Flagship website for Sukaj Construction, a Tirana residential developer. Built with Next.js 16 (App Router), TypeScript, Tailwind v4, shadcn/ui, Framer Motion, R3F/drei, GSAP + ScrollTrigger, Lenis, next-intl (EN/SQ).

**Why:** Dual audience — real buyers in Albania + design/portfolio judges.

`docs/design-system.md` is the locked source of truth for color, type, IA, hero concept, performance budget, and copy tone. Always read it before making visual or structural changes.

Key conventions:
- GSAP + ScrollTrigger: hero only. Framer Motion: everything else. Never mix on the same element.
- Lenis smooth scroll with `autoRaf: false` (driven by GSAP ticker).
- `middleware.ts` renamed to `proxy.ts` in Next.js 16.
- HeroWrapper: desktop → HeroScene (R3F, SSR false); mobile → HeroFallback (SVG).
- Brand palette: Alabaster bg `#FAF6EE`, Warm Sand surface `#EFE4D5`, Espresso text `#241F1A`, Terracotta accent `#B96A43`.

**How to apply:** Respect the animation hierarchy. Keep R3F inside SSR-false dynamic imports inside Client Components.
