---
name: feedback-mobile-hero
description: Mobile hero building/text overlap — the fix and why
metadata:
  type: feedback
---

The original HeroFallback positioned the SVG building with `items-end justify-end pb-20` — this placed it at the bottom-right. The hero text was also at the bottom-left. On a 375px phone the building took 45vw (168px) from the right and the text could extend 327px from the left — they overlapped by ~120px in the middle.

**Why:** `flex items-start justify-end` with `pt-16` (below the 64px fixed header) positions the building in the top-right corner, leaving the bottom portion clear for headline text which sits at `justify-end pb-10`. No overlap possible.

**How to apply:** On any hero-style section with an absolute background element and an absolute text overlay, ensure they occupy different vertical zones. Mobile hero text should always be at the bottom (`justify-end`); decorative/illustrative elements should live in the top portion or far right — never both bottom.
