"use client";

// Static SVG poster — shown on mobile and when prefers-reduced-motion is set.
// Mobile layout: building at top-right (below the 64px fixed header), so the
// bottom portion is fully clear for the hero headline text.
// Desktop: right-of-centre, vertically centred, larger.

const C = {
  bg:      "#FAF6EE",
  surface: "#EFE4D5",
  accent:  "#B96A43",
  bronze:  "#A98F6E",
};

export function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="
        absolute inset-0 pointer-events-none
        flex items-start justify-end
        pt-16 pr-4
        md:items-center md:justify-end md:pt-0 md:pr-14
      "
    >
      <svg
        viewBox="0 0 160 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          h-[50vh] w-auto max-w-[40vw] opacity-60
          md:h-[80vh] md:max-w-[42vw] md:opacity-88
        "
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hf-sky" cx="50%" cy="20%" r="72%">
            <stop offset="0%"   stopColor={C.bg} />
            <stop offset="100%" stopColor={C.surface} />
          </radialGradient>
          <radialGradient id="hf-win" cx="50%" cy="55%" r="65%">
            <stop offset="0%"   stopColor={C.accent} stopOpacity="0.14" />
            <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="160" height="440" fill="url(#hf-sky)" />

        {/* ── Podium ──────────────────────────────────────────────── */}
        <rect x="18" y="390" width="124" height="42"
          fill={C.surface} fillOpacity="0.6"
          stroke={C.accent} strokeWidth="1" />
        <line x1="18" y1="404" x2="142" y2="404" stroke={C.bronze} strokeWidth="0.5" strokeOpacity="0.5" />
        <line x1="18" y1="418" x2="142" y2="418" stroke={C.bronze} strokeWidth="0.5" strokeOpacity="0.5" />

        {/* ── Main body ───────────────────────────────────────────── */}
        <rect x="32" y="170" width="96" height="224"
          fill={C.surface} fillOpacity="0.5"
          stroke={C.accent} strokeWidth="0.9" />

        {/* Window warmth overlay */}
        <rect x="32" y="170" width="96" height="224" fill="url(#hf-win)" />

        {/* Floor plates */}
        {[198, 226, 254, 282, 310, 338, 366].map((y) => (
          <line key={y} x1="32" y1={y} x2="128" y2={y}
            stroke={C.bronze} strokeWidth="0.35" strokeOpacity="0.45" />
        ))}

        {/* Windows — main body */}
        {[178, 206, 234, 262, 290, 318, 346].map((wy) =>
          [42, 68, 94].map((wx) => (
            <rect key={`${wx}-${wy}`}
              x={wx} y={wy} width="14" height="18"
              fill={C.bg} fillOpacity="0.72"
              stroke={C.bronze} strokeWidth="0.5" />
          ))
        )}

        {/* Balconies */}
        {[226, 282, 338].map((y) => (
          <rect key={`b-${y}`}
            x="28" y={y} width="104" height="3.5"
            fill={C.surface}
            stroke={C.accent} strokeWidth="0.6" />
        ))}

        {/* ── Setback upper ───────────────────────────────────────── */}
        <rect x="44" y="72" width="72" height="102"
          fill={C.surface} fillOpacity="0.45"
          stroke={C.accent} strokeWidth="0.9" />
        {[98, 124, 150].map((y) => (
          <line key={y} x1="44" y1={y} x2="116" y2={y}
            stroke={C.bronze} strokeWidth="0.35" strokeOpacity="0.4" />
        ))}
        {[80, 106, 132].map((wy) =>
          [54, 86].map((wx) => (
            <rect key={`s-${wx}-${wy}`}
              x={wx} y={wy} width="14" height="18"
              fill={C.bg} fillOpacity="0.72"
              stroke={C.bronze} strokeWidth="0.5" />
          ))
        )}

        {/* ── Crown ───────────────────────────────────────────────── */}
        <rect x="58" y="30" width="44" height="44"
          fill={C.surface} fillOpacity="0.45"
          stroke={C.accent} strokeWidth="0.9" />
        <line x1="54" y1="30" x2="106" y2="30" stroke={C.accent} strokeWidth="1.1" />
        {[[66, 38], [88, 38]].map(([wx, wy]) => (
          <rect key={`c-${wx}`}
            x={wx} y={wy} width="10" height="14"
            fill={C.bg} fillOpacity="0.75"
            stroke={C.bronze} strokeWidth="0.5" />
        ))}

        {/* Terracotta cornice */}
        <line x1="32" y1="170" x2="128" y2="170"
          stroke={C.accent} strokeWidth="1.5" />

        {/* Ground glow */}
        <ellipse cx="80" cy="432" rx="52" ry="6"
          fill={C.accent} fillOpacity="0.15" />
      </svg>
    </div>
  );
}
