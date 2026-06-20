# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # start dev server (port 3000)
pnpm build        # production build
pnpm exec tsc --noEmit  # type-check without emitting
```

There is no test suite.

## Architecture

### Next.js 16 breaking changes
`middleware.ts` is renamed to `proxy.ts` in Next.js 16. The file at `src/proxy.ts` is the correct location. Read `node_modules/next/dist/docs/` before touching routing, layouts, or proxy logic.

### Locale routing
All pages live under `src/app/[locale]/`. The `[locale]` segment is `en` or `sq` (Albanian), enforced by next-intl via `src/i18n/routing.ts`. The root `src/app/layout.tsx` is a pass-through; the real root layout is `src/app/[locale]/layout.tsx`.

**Pattern for new pages:** Server Components call `useTranslations()` and pass translated strings as props to any Client Components that need them. Client Components must not call `useTranslations()` directly if they also use Framer Motion or GSAP — the RSC boundary keeps pages SSR-able. See `src/app/[locale]/page.tsx` → `HomeSections` for the established pattern.

Both `messages/en.json` and `messages/sq.json` must be updated together whenever copy changes.

### Animation hierarchy
Two animation systems, one for each use case. **Never mix them on the same element.**

- **GSAP + ScrollTrigger** — hero only. Driven by Lenis via `src/components/layout/SmoothScroll.tsx` (`autoRaf: false`). The single RAF loop is GSAP's ticker; adding a second `requestAnimationFrame` loop anywhere will cause frame-budget conflicts.
- **Framer Motion** — all other scroll reveals, page transitions, and UI micro-interactions.

`SmoothScroll` guards `prefers-reduced-motion` — when the user has reduced motion set, Lenis never initialises. The GSAP tween in `HeroScene` also checks this flag and skips to the resolved state immediately.

### 3D hero
`HeroWrapper` (Client Component) detects the viewport and `prefers-reduced-motion` on mount. It dynamically imports `HeroScene` with `ssr: false` — this must stay inside a Client Component, which is why the wrapper exists (Next.js 16 requires `ssr:false` dynamic imports to be in Client Components). Three tiers:

| Tier | Condition | Component |
|------|-----------|-----------|
| Full 3D | Desktop | `HeroScene` (R3F canvas, GSAP dolly) |
| Static resolved | `prefers-reduced-motion` on desktop | `HeroScene` with `reducedMotion={true}` |
| SVG poster | Mobile (≤768px) | `HeroFallback` |

### Tailwind v4
No `tailwind.config.js`. Brand tokens are CSS custom properties in `src/app/globals.css` under `:root` and exposed as Tailwind utilities via the `@theme inline` block. Use the semantic names (`bg-bg`, `text-accent`, `bg-surface`, etc.) — never hardcode hex values.

### Project data and placeholders
`src/data/projects.ts` holds all 10 projects. Every field is marked `// PLACEHOLDER`. Hero images reference `/images/placeholder-*.jpg` which do not exist in `/public` — image slots are intentionally wired up ahead of real assets. Do not add `<img>` tags pointing at these paths; use the existing SVG placeholder pattern in `ProjectCard`.

### Design decisions
`docs/design-system.md` is the locked source of truth for the color system (§3), typography (§4), placeholder strategy (§5), IA (§6), trust signals (§7), 3D hero concept (§8), tech stack (§9), performance budget (§10), and copy tone (§11). Consult it before making visual or structural changes.
