"use client";

// Mobile / reduced-motion hero — a proper architectural elevation drawing.
// Replaces the abstract monolith with a stepped residential building front
// elevation: podium → main body (with window grid + balcony slab lines)
// → setback → crown. Same terracotta / limestone palette as the 3D scene.
//
// Animation: the building outline traces in first (stroke-dasharray),
// then windows + floor plates fade in, then the warm fill appears.
// All animations respect prefers-reduced-motion.

const C = {
  bg:      "#FAF6EE",
  surface: "#EFE4D5",
  accent:  "#B96A43",
  bronze:  "#A98F6E",
  deep:    "#8C421F",
  text:    "#241F1A",
};

export function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none flex items-center justify-end"
    >
      {/* Warm atmospheric glow behind the building */}
      <div
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[560px] max-h-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(185,106,67,0.09) 0%, rgba(185,106,67,0.02) 45%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 220 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-elevation relative h-[72vh] w-auto max-w-[52vw] md:h-[86vh] md:max-w-[42vw] opacity-95"
      >
        <style>{`
          /* Stroke draw-in for the building outline */
          .hero-elevation .outline {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: elevDraw 2.8s cubic-bezier(0.22, 0, 0, 1) 0.2s forwards;
          }
          /* Fade-in for fills, windows, and floor plates */
          .hero-elevation .fill-in {
            opacity: 0;
            animation: elevFade 1.2s ease 1.8s forwards;
          }
          .hero-elevation .fill-late {
            opacity: 0;
            animation: elevFade 1.0s ease 2.4s forwards;
          }
          @keyframes elevDraw { to { stroke-dashoffset: 0; } }
          @keyframes elevFade { to { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .hero-elevation .outline  { stroke-dashoffset: 0; animation: none; }
            .hero-elevation .fill-in  { opacity: 1; animation: none; }
            .hero-elevation .fill-late { opacity: 1; animation: none; }
          }
        `}</style>

        <defs>
          {/* Warm facade fill gradient */}
          <linearGradient id="hf-facade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={C.surface} stopOpacity="0.72" />
            <stop offset="100%" stopColor={C.surface} stopOpacity="0.35" />
          </linearGradient>
          {/* Subtle terracotta warm wash across windows */}
          <radialGradient id="hf-glow" cx="50%" cy="55%" r="65%">
            <stop offset="0%"   stopColor={C.accent} stopOpacity="0.10" />
            <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 1. Warm facade fill — fades in after outline draws ── */}
        {/* Podium fill */}
        <rect
          className="fill-in"
          x="25" y="494" width="170" height="46"
          fill={C.surface} fillOpacity="0.65"
        />
        {/* Body fill */}
        <rect
          className="fill-in"
          x="50" y="194" width="120" height="300"
          fill="url(#hf-facade)"
        />
        <rect
          className="fill-in"
          x="50" y="194" width="120" height="300"
          fill="url(#hf-glow)"
        />
        {/* Setback fill */}
        <rect
          className="fill-in"
          x="67" y="110" width="86" height="86"
          fill={C.surface} fillOpacity="0.52"
        />
        {/* Crown fill */}
        <rect
          className="fill-in"
          x="87" y="70" width="46" height="42"
          fill={C.surface} fillOpacity="0.45"
        />

        {/* ── 2. Stepped building outline — draws in ── */}
        {/*
          Silhouette traces clockwise from crown top-left:
          Crown (87,70)→(133,70) top
          → step to setback (153,110)
          → step to body (170,196)
          → step to podium (195,494)
          → ground (195,540) → (25,540)
          → up podium left side
          → step up through each volume
        */}
        <path
          className="outline"
          d="
            M 87 70
            L 133 70
            L 133 110
            L 153 110
            L 153 196
            L 170 196
            L 170 494
            L 195 494
            L 195 540
            L 25 540
            L 25 494
            L 50 494
            L 50 196
            L 67 196
            L 67 110
            L 87 110
            Z
          "
          stroke={C.accent}
          strokeWidth="1.3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── 3. Floor / cornice plates in the body — fade in ── */}
        {/* 9 horizontal plates spaced ~33px apart in the body (194→494) */}
        {[227, 260, 293, 326, 359, 392, 425, 458, 491].map((y) => (
          <line
            key={y}
            className="fill-in"
            x1="50" y1={y} x2="170" y2={y}
            stroke={C.bronze}
            strokeWidth="0.65"
            strokeOpacity="0.55"
          />
        ))}
        {/* Setback floor plates */}
        {[143, 170].map((y) => (
          <line
            key={`s-${y}`}
            className="fill-in"
            x1="67" y1={y} x2="153" y2={y}
            stroke={C.bronze}
            strokeWidth="0.55"
            strokeOpacity="0.45"
          />
        ))}
        {/* Crown floor plate */}
        <line
          className="fill-in"
          x1="87" y1="95" x2="133" y2="95"
          stroke={C.bronze}
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* ── 4. Terracotta accent: setback-to-body cornice line ── */}
        <line
          className="fill-late"
          x1="50" y1="196" x2="170" y2="196"
          stroke={C.accent}
          strokeWidth="1.5"
          strokeOpacity="0.9"
        />
        {/* Body-to-setback step */}
        <line
          className="fill-late"
          x1="67" y1="110" x2="153" y2="110"
          stroke={C.deep}
          strokeWidth="1.1"
          strokeOpacity="0.7"
        />

        {/* ── 5. Window grid — body (4 cols × 9 rows) ── */}
        {/* col x-positions (left edge): 58, 74, 102, 126, 146 → 4 cols */}
        {[228, 261, 294, 327, 360, 393, 426, 459].map((wy) =>
          [58, 80, 106, 130, 148].map((wx) => (
            <rect
              key={`w-${wx}-${wy}`}
              className="fill-in"
              x={wx} y={wy} width="13" height="21"
              fill={C.bg}
              fillOpacity="0.82"
              stroke={C.bronze}
              strokeWidth="0.38"
            />
          ))
        )}

        {/* ── 6. Window grid — setback (3 cols × 2 rows) ── */}
        {[117, 149].map((wy) =>
          [75, 99, 123].map((wx) => (
            <rect
              key={`sw-${wx}-${wy}`}
              className="fill-in"
              x={wx} y={wy} width="12" height="18"
              fill={C.bg}
              fillOpacity="0.75"
              stroke={C.bronze}
              strokeWidth="0.35"
            />
          ))
        )}

        {/* ── 7. Crown windows (2 cols × 1 row) ── */}
        {[91, 113].map((wx) => (
          <rect
            key={`cw-${wx}`}
            className="fill-in"
            x={wx} y={76} width="11" height="17"
            fill={C.bg}
            fillOpacity="0.7"
            stroke={C.bronze}
            strokeWidth="0.35"
          />
        ))}

        {/* ── 8. Balcony slab lines (full-width protrusions) ── */}
        {[327, 393].map((y) => (
          <rect
            key={`bal-${y}`}
            className="fill-late"
            x="48" y={y - 1} width="124" height="3.5"
            fill={C.surface}
            fillOpacity="0.8"
            stroke={C.accent}
            strokeWidth="0.5"
          />
        ))}

        {/* ── 9. Ground line + shadow ellipse ── */}
        <line
          className="fill-in"
          x1="5" y1="540" x2="215" y2="540"
          stroke={C.bronze}
          strokeWidth="0.7"
          strokeOpacity="0.45"
        />
        <ellipse
          className="fill-in"
          cx="110" cy="547"
          rx="100" ry="7"
          fill={C.accent}
          fillOpacity="0.08"
        />

        {/* ── 10. Elevation caption ── */}
        <text
          className="fill-late"
          x="110" y="570"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="7"
          letterSpacing="2.5"
          fill={C.bronze}
          fillOpacity="0.45"
        >
          SOUTH ELEVATION · INDICATIVE RENDER
        </text>
      </svg>
    </div>
  );
}
