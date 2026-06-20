# Sukaj Construction — Design System & Decisions
*Synthesized from three independent deep-research reports (ChatGPT, Gemini, Claude). This is the locked source of truth — drop this file into the repo at `docs/design-system.md` so Claude Code can reference it directly during the build.*

---

## 1. Brand Brief

- **Company**: Sukaj Construction — residential developer (owns land, builds, sells/rents — not a hired contractor), Tirana, Albania.
- **Founded**: 2010 (placeholder, confirm later). Family heritage: sister company Sukaj SHPK, industrial pipe distributor, Shkodër, est. 1995, same ownership.
- **Track record**: ~10 completed apartment buildings (confirm exact figure later).
- **Audience**: dual, roughly equal — (1) real future buyers/investors in Tirana, (2) people evaluating this as a design/portfolio piece.
- **Project pages**: hybrid case-study tone, soft "inquire" CTA, **no pricing or live availability**.
- **Languages**: English / Albanian (SQ) toggle, both fully indexed.
- **No real project photography yet** — site launches with clearly-art-directed placeholder content, built so real assets swap in without redesign.

## 2. North-Star References

**Primary reference: Vide Infra (videinfra.com)** — independently surfaced by all three research reports as the closest match to this brief. Their portfolio (Springs, ERA/era.estate, Silver Pinewood Residences, AIR) repeatedly executes exactly the "non-literal, ultra-luxury, line-art-to-rendered-building" hero this brief calls for, with multiple Awwwards Site of the Day / FWA / CSSDA wins. **Recommendation: have whoever builds the 3D hero spend an hour studying videinfra.com/work directly.**

Secondary references for specific page types:
- **MERSI** (mersi.fr) — editorial restraint; every secondary page gets the same design care as the hero. Model for "no page feels like a brochure filler."
- **HBA** — case-study page depth (concept text + facts + named collaborators + gallery) without pricing.
- **Vaulk / Hubtown** — wireframe-assembles-on-scroll as an alternate/secondary hero technique if the line-art-to-render shader proves too costly to build well.
- **Terminal Industries** — render↔wireframe toggle as a nice secondary interaction, usable on project pages.

## 3. Color System (locked)

Reconciled from all three reports' convergent "warm stone / clay / espresso" direction:

| Token | Hex | Role |
|---|---|---|
| `--color-bg` (Alabaster) | `#FAF6EE` | Dominant background. Warm-tinted, never pure white. |
| `--color-surface` (Warm Sand) | `#EFE4D5` | Cards, section backgrounds, dividers. |
| `--color-text` (Espresso) | `#241F1A` | Primary text, anchors. Warm near-black, not cold charcoal. |
| `--color-accent` (Terracotta) | `#B96A43` | Primary accent — CTAs, hero "lit" glow, links. |
| `--color-accent-secondary` (Aged Bronze) | `#A98F6E` | Secondary accent — metadata tags, hover states, fine borders. |
| `--color-accent-deep` (Iron Red) | `#8C421F` | Sparing use only — a genuine Tirana soil-tone nod, for emphasis moments. |
| `--color-accent-muted` (Balkan Laurel) | `#4E5340` | Sparing use only — certification badges, sustainability mentions. |

**Discipline rule**: 1 anchor (espresso) + 1 primary accent (terracotta) + 2 neutrals on any given screen; reserve iron-red and laurel for rare, specific moments. Never exceed ~4 active colors on one view. Maintain WCAG AA — espresso-on-alabaster clears 4.5:1; keep terracotta to CTAs and large text, not body copy.

This shares the sister site's *neutral-system logic* (a calm base + one strong accent) while being unmistakably a different palette.

## 4. Typography (locked)

**Primary pairing**: **Fraunces** (display serif, variable, optical sizing — free Google Font) for headlines/hero statements + **Inter** (humanist sans — free Google Font) for body, UI, nav, specs, captions. Both have strong Latin Extended coverage — **verify ë/ç rendering explicitly before lock-in**, especially in Fraunces' display weights.

**Alternate pairing** (more classical/architectural feel, also free): **Cormorant Garamond** (display) + **Plus Jakarta Sans** (body/UI).

**Rule**: 2 fonts max, 3–4 weights total. Large sculptural serif for short statements only; sans for everything functional (nav, specs, labels, stats, language toggle). This is how the sister site's spacing/component rhythm carries over while typography still reads as a distinct brand.

## 5. Placeholder / Art-Direction Strategy (no real photos yet)

- **Be explicit, never fake.** Label provisional imagery "indicative render" — credibility cost of passing off stock/fake photos as real projects is severe for a developer.
- **Lean on what's legitimately available**: architectural line-art/wireframe site plans, material/finish macro shots (travertine, sand-blasted concrete, brushed bronze, raw oak), light-and-shadow studies of empty volumes, abstract geometry derived from the buildings' actual forms.
- **One consistent grading recipe across every image**: warm natural light, color grade matched to the palette above, consistent crop ratios, generous negative space, no promotional noise.
- **Build CMS/data slots 1:1 now** — same aspect ratio, same position — so real photography drops in later with zero redesign.

## 6. Information Architecture

`Home · About · Projects (index + case studies) · Process ("How We Build") · Contact` + persistent soft "Inquire" CTA + EN/SQ toggle. No dedicated Team page. Sister-brand relationship lives as a quiet mention in About/Footer, **not** a prominent Home section (judgment call — keeps the luxury tone undiluted).

**Home page sequence** (a "film," not a tab list): 3D hero moment → positioning statement (developer, not just contractor) → featured projects → credibility/trust strip → soft CTA.

**Project case-study template** (no pricing/availability):
1. Hero + one-line essence
2. Project facts strip — location, year, typology, unit-mix range, status (facts only, never prices)
3. Narrative / design rationale — concept, light, materials, orientation
4. Location & context — neighborhood, views, connectivity
5. *(Differentiator, from research)* a short sensory passage — "a day at [project]" — light, sound, daily rhythm
6. Gallery — organized Exteriors / Interiors / Materials, renders now with honest labeling, real photos later in the same slots
7. Soft CTA — "Inquire about this project"

## 7. Trust & Credibility Block (Albania-specific)

Display, even before full certification packaging is finalized:
- **NIPT** (business tax/registry number) — footer/About, the baseline legitimacy signal Albanian buyers are told to check.
- **"Permitted projects" language** referencing **Leje Ndërtimi** (building permit, issued via e-Leje/AKPT or the Municipality of Tirana/KKT) per project, once real permit data exists.
- **Construction license category** — Albanian firms hold graded licenses (e.g. NP‑2 structural construction, NP‑3 reconstruction/facade, NP‑7 water/drainage systems — the last one a nice nod to the sister company's pipe expertise). Surface the category once confirmed.
- **Professional associations** — Urdhri i Arkitektit (Order of Architects) / Urdhri i Inxhinierit (Order of Engineers) for named project collaborators, only when factually true.
- **Heritage stat** — "Family-owned since 1995 · Developer since 2010 · ~10 buildings delivered" (confirm exact number).
- **Aspirational, add when secured**: ISO 9001, any awards/press.

Never claim a certification not yet held — name what's true, not what sounds impressive.

## 8. The Signature 3D Hero (locked concept)

**Concept**: a structure resolves from glowing line-art/vertex paths into a lit, matte-rendered volume — the ERA/era.estate move, generalized to a non-literal architectural form (not a literal scan of a specific Sukaj building, since none is photographed yet).

| Tier | Build | Trigger |
|---|---|---|
| Desktop (primary) | React Three Fiber + drei + custom GLSL shader interpolating line-geometry → lit material; GSAP ScrollTrigger drives a slow camera dolly tied to scroll | Default |
| Tablet/low-power desktop | Same scene, reduced particle/poly count, drei `PerformanceMonitor` auto-adjusts DPR/quality | Detected via FPS monitor |
| Mobile | Pre-rendered Lottie/SVG line-draw of the same silhouette, or a short looping WebM, same framing/mood | Viewport + UA heuristics |
| Reduced motion | Static poster frame (the "resolved" final state) | `prefers-reduced-motion: reduce` |

**Secondary, stretch-goal interaction** (Terminal Industries idea): a render↔wireframe toggle on project-page hero images.

**Go/no-go performance gate**: if desktop can't hold ~60fps, or mobile LCP exceeds ~2.5s with the hero in place, fall back to the video-disguised-as-3D tier before launch rather than shipping a janky scene.

## 9. Technical Stack (locked)

- Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, pnpm — matches the sister site.
- **Lenis** — smooth scroll (single RAF loop, drive from GSAP's ticker, `autoRaf: false`, `syncTouch: false` on mobile).
- **GSAP + ScrollTrigger** (`@gsap/react` `useGSAP()` hook) — primary hero/scroll-choreography engine. Plugins are now free.
- **Framer Motion** — secondary, for UI-level micro-interactions (buttons, cards, modals, page transitions, mobile menu).
- **React Three Fiber + drei** — 3D hero (Draco-compressed glTF, instancing, `PerformanceMonitor`, `frameloop="demand"` where possible). **Spline** as the no-code fallback if a dedicated 3D build proves too slow to iterate on.
- **next-intl** — EN/SQ via `[locale]` segment routing, server-component friendly, correct `hreflang`.
- **next/image** — AVIF/WebP, blur placeholders, `priority` on the LCP element.
- Dynamic-import any R3F canvas with `ssr: false` to avoid hydration mismatches.

## 10. Performance & Accessibility Budget

- Render readable HTML/text via SSR first; lazy-init the 3D canvas; keep an LCP-friendly poster as the true first paint.
- Single RAF loop (Lenis driven by GSAP ticker) — never run two animation loops competing for the frame.
- Always honor `prefers-reduced-motion` with a static, meaningful fallback — never hide content behind motion.
- Keyboard focus order intact; visible focus states; AA contrast maintained on the warm palette.
- Confine heaviness to the ONE hero moment — "controlled extravagance," not five medium-expensive effects competing for GPU.
- Avoid scroll-jacking (overriding scroll speed/direction); use sticky/pinned reveals and restrained parallax (1–2 sections max) instead.

## 11. Voice & Copywriting (locked tone)

Calm, precise, restrained, place-rooted. Sells through atmosphere, never urgency. CTAs invite ("Inquire about this project," "Register your interest") rather than push ("Buy now," "Limited availability"). Write Albanian natively for tone, not as a literal translation.

**Locked example lines** (synthesized best-of-three, paraphrased patterns to adapt, not final copy):
- Hero: *"A new address above Tirana."* / SQ: *"Një adresë e re mbi Tiranën."*
- Positioning: *"We don't just build — we develop places people stay."* / SQ: *"Ne nuk ndërtojmë thjesht — ne zhvillojmë vende ku njerëzit jetojnë."*
- Heritage proof: *"Family-owned since 1995. Developer since 2010. Ten buildings delivered."*
- Project CTA: *"Inquire about this residence."* / SQ: *"Pyetni për këtë rezidencë."*

---
*Caveats inherited from the research: exact building count, founding year, NIPT, and license categories must be confirmed before publishing — everything above is built to make swapping those facts in later trivial, not to lock them as final.*
