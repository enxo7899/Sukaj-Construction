"use client";

// Static poster shown on mobile and when prefers-reduced-motion is set.
// Renders a stylized tower silhouette in terracotta line art against the
// alabaster background — the "resolved" end state of the hero animation.

export function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full max-h-[70vh] w-auto opacity-60"
        aria-hidden="true"
      >
        {/* Podium / base */}
        <rect
          x="55"
          y="330"
          width="90"
          height="50"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          fill="var(--color-surface)"
          fillOpacity="0.4"
        />
        {/* Main tower body */}
        <rect
          x="68"
          y="160"
          width="64"
          height="174"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          fill="var(--color-surface)"
          fillOpacity="0.4"
        />
        {/* Upper setback */}
        <rect
          x="78"
          y="60"
          width="44"
          height="104"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          fill="var(--color-surface)"
          fillOpacity="0.4"
        />
        {/* Crown */}
        <rect
          x="88"
          y="20"
          width="24"
          height="44"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          fill="var(--color-surface)"
          fillOpacity="0.4"
        />

        {/* Horizontal floor lines — suggest storey divisions */}
        {[180, 205, 230, 255, 280, 305].map((y) => (
          <line
            key={y}
            x1="68"
            y1={y}
            x2="132"
            y2={y}
            stroke="var(--color-accent)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        ))}
        {[90, 115, 140].map((y) => (
          <line
            key={y}
            x1="78"
            y1={y}
            x2="122"
            y2={y}
            stroke="var(--color-accent)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        ))}

        {/* Terracotta accent glow at base — mimics the lit material */}
        <ellipse
          cx="100"
          cy="380"
          rx="38"
          ry="6"
          fill="var(--color-accent)"
          fillOpacity="0.12"
        />
      </svg>
    </div>
  );
}
