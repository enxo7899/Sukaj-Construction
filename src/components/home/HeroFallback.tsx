"use client";

// Static poster shown on mobile and when prefers-reduced-motion is set.
// Positioned to the right half of the hero, mirroring the desktop R3F tower
// offset (position=[1.1, -0.1, 0]). Detailed line-art: windows, balconies,
// floor plates, setback massing — the "resolved" end-state of the animation.

export function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-end justify-end pr-6 md:pr-14 pb-20 md:pb-24 pointer-events-none"
    >
      <svg
        viewBox="0 0 160 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[78vh] w-auto max-w-[45vw] opacity-85"
        aria-hidden="true"
      >
        {/* ── Podium / base ───────────────────────────────────────────── */}
        <rect
          x="18" y="390" width="124" height="42"
          fill="var(--color-surface)" fillOpacity="0.5"
          stroke="var(--color-accent)" strokeWidth="1"
        />
        {/* Podium banding lines */}
        <line x1="18" y1="404" x2="142" y2="404" stroke="var(--color-accent-secondary)" strokeWidth="0.5" strokeOpacity="0.5" />
        <line x1="18" y1="418" x2="142" y2="418" stroke="var(--color-accent-secondary)" strokeWidth="0.5" strokeOpacity="0.5" />

        {/* ── Main tower body ─────────────────────────────────────────── */}
        <rect
          x="32" y="170" width="96" height="224"
          fill="var(--color-surface)" fillOpacity="0.4"
          stroke="var(--color-accent)" strokeWidth="1"
        />

        {/* Floor-plate lines on main body (every 28px = one storey) */}
        {[198, 226, 254, 282, 310, 338, 366].map((y) => (
          <line
            key={y}
            x1="32" y1={y} x2="128" y2={y}
            stroke="var(--color-accent-secondary)" strokeWidth="0.4" strokeOpacity="0.45"
          />
        ))}

        {/* Window grid — 3 cols × 7 rows on main body */}
        {[178, 206, 234, 262, 290, 318, 346].map((wy) =>
          [42, 68, 94].map((wx) => (
            <rect
              key={`${wx}-${wy}`}
              x={wx} y={wy} width="14" height="18"
              fill="var(--color-bg)" fillOpacity="0.6"
              stroke="var(--color-accent-secondary)" strokeWidth="0.6"
            />
          ))
        )}

        {/* Balcony projections — every other storey, full width */}
        {[226, 282, 338].map((y) => (
          <rect
            key={`bal-${y}`}
            x="28" y={y} width="104" height="4"
            fill="var(--color-surface)" fillOpacity="0.8"
            stroke="var(--color-accent)" strokeWidth="0.6"
          />
        ))}

        {/* ── Setback upper floor ─────────────────────────────────────── */}
        <rect
          x="44" y="72" width="72" height="102"
          fill="var(--color-surface)" fillOpacity="0.4"
          stroke="var(--color-accent)" strokeWidth="1"
        />

        {/* Floor plates on setback */}
        {[98, 124, 150].map((y) => (
          <line
            key={y}
            x1="44" y1={y} x2="116" y2={y}
            stroke="var(--color-accent-secondary)" strokeWidth="0.4" strokeOpacity="0.45"
          />
        ))}

        {/* Window grid — 2 cols × 3 rows on setback */}
        {[80, 106, 132].map((wy) =>
          [54, 86].map((wx) => (
            <rect
              key={`s-${wx}-${wy}`}
              x={wx} y={wy} width="14" height="18"
              fill="var(--color-bg)" fillOpacity="0.6"
              stroke="var(--color-accent-secondary)" strokeWidth="0.6"
            />
          ))
        )}

        {/* ── Crown / parapet ─────────────────────────────────────────── */}
        <rect
          x="58" y="30" width="44" height="44"
          fill="var(--color-surface)" fillOpacity="0.4"
          stroke="var(--color-accent)" strokeWidth="1"
        />
        {/* Parapet coping line */}
        <line x1="54" y1="30" x2="106" y2="30" stroke="var(--color-accent)" strokeWidth="1.2" />
        {/* Crown windows */}
        {[[66, 38], [88, 38]].map(([wx, wy]) => (
          <rect
            key={`c-${wx}`}
            x={wx} y={wy} width="10" height="14"
            fill="var(--color-bg)" fillOpacity="0.7"
            stroke="var(--color-accent-secondary)" strokeWidth="0.6"
          />
        ))}

        {/* ── Terracotta cornice accent line ──────────────────────────── */}
        <line
          x1="32" y1="170" x2="128" y2="170"
          stroke="var(--color-accent)" strokeWidth="1.5"
        />

        {/* ── Ground glow ─────────────────────────────────────────────── */}
        <ellipse
          cx="80" cy="432" rx="52" ry="7"
          fill="var(--color-accent)" fillOpacity="0.18"
        />
      </svg>
    </div>
  );
}
