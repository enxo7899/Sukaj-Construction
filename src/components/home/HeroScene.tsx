"use client";

// Signature 3D hero (design-system §8) — architectural building.
//
// A stepped residential tower rendered in Three.js:
//   podium → main body → setback → crown → cap
// Each volume is a BoxGeometry so the form immediately reads as architecture.
// Thin horizontal floor/cornice plates run across each setback transition
// and across each floor level of the main body.
//
// Motion:
//   • wireframe → matte-stone reveal (≈2.8s, once)
//   • ultra-slow idle Y drift so the form breathes without spinning
//   • desktop cursor parallax — gentle tilt toward the pointer, reveals depth
//   • scroll-driven camera dolly (reads scroll, never overrides Lenis)
// reducedMotion → jumps to the resolved matte state immediately.

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ─── Building geometry constants ─────────────────────────────────────────────
//
// Stack from Y = -3.0 (bottom of podium) to Y ≈ 3.4 (top of cap)
// Total building height ≈ 6.4 world units → FORM_HEIGHT used for viewport fit.

type Vol = { w: number; h: number; d: number; y: number };
type PlateRow = { w: number; d: number; y: number };

const VOLS: Vol[] = [
  { w: 2.8,  h: 0.55, d: 1.6,  y: -2.725 }, // podium — widest
  { w: 2.2,  h: 3.6,  d: 1.3,  y: -0.65  }, // main body
  { w: 1.6,  h: 1.4,  d: 1.0,  y:  1.85  }, // first setback
  { w: 1.0,  h: 0.6,  d: 0.72, y:  2.85  }, // crown
  { w: 0.46, h: 0.22, d: 0.46, y:  3.26  }, // cap
];

// podium top = -2.45, body bottom = -2.45, body top = 1.15
// setback bottom = 1.15, setback top = 2.55
// crown bottom = 2.55, crown top = 3.15
// cap bottom = 3.15, cap top = 3.37

const BODY_PLATES: PlateRow[] = (() => {
  const rows: PlateRow[] = [];
  // 9 plates from body-bottom to body-top, spaced 0.45 units (≈ one floor)
  for (let i = 0; i <= 8; i++) {
    rows.push({ w: 2.24, d: 1.34, y: -2.45 + i * 0.45 });
  }
  return rows;
})();

const SETBACK_PLATES: PlateRow[] = [
  { w: 1.64, d: 1.04, y: 1.15  }, // setback base
  { w: 1.64, d: 1.04, y: 1.62  },
  { w: 1.64, d: 1.04, y: 2.09  },
  { w: 1.64, d: 1.04, y: 2.55  }, // setback top
];

const CROWN_PLATES: PlateRow[] = [
  { w: 1.04, d: 0.76, y: 2.55 }, // crown base
  { w: 1.04, d: 0.76, y: 3.15 }, // crown top
];

const PLATE_DATA: PlateRow[] = [...BODY_PLATES, ...SETBACK_PLATES, ...CROWN_PLATES];

const FORM_HEIGHT = 6.4;

// Palette
const SOLID_COLOR = "#D8C9B2"; // warm limestone
const PLATE_COLOR = "#C2AD96"; // slightly deeper — cornice stone
const WIRE_COLOR  = "#B96A43"; // terracotta line-art

// ─── Helpers ──────────────────────────────────────────────────────────────────
function smoothstep(e0: number, e1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

// ─── Building ─────────────────────────────────────────────────────────────────
function Building({
  reducedMotion,
  pointer,
}: {
  reducedMotion: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const progress = useRef(reducedMotion ? 1 : 0);

  // Shared materials — one solid, one plate, one wireframe
  const mats = useMemo(() => ({
    solid: new THREE.MeshStandardMaterial({
      color: SOLID_COLOR,
      roughness: 0.90,
      metalness: 0.02,
      transparent: true,
      opacity: reducedMotion ? 1 : 0,
    }),
    plate: new THREE.MeshStandardMaterial({
      color: PLATE_COLOR,
      roughness: 0.88,
      metalness: 0.01,
      transparent: true,
      opacity: reducedMotion ? 1 : 0,
    }),
    wire: new THREE.MeshBasicMaterial({
      color: WIRE_COLOR,
      wireframe: true,
      transparent: true,
      opacity: reducedMotion ? 0 : 0.82,
      depthWrite: false,
    }),
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  // Geometries — one per volume, one per plate
  const geos = useMemo(() => ({
    vols: VOLS.map((v) => new THREE.BoxGeometry(v.w, v.h, v.d)),
    plates: PLATE_DATA.map((p) => new THREE.BoxGeometry(p.w, 0.044, p.d)),
  }), []);

  // Cleanup
  useEffect(() => {
    return () => {
      geos.vols.forEach((g) => g.dispose());
      geos.plates.forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [geos, mats]);

  // Reveal tween
  useEffect(() => {
    if (reducedMotion) return;
    const tween = gsap.to(progress, {
      current: 1,
      duration: 2.8,
      delay: 0.45,
      ease: "power2.inOut",
    });
    return () => { tween.kill(); };
  }, [reducedMotion]);

  useFrame((state, delta) => {
    const p = progress.current;

    // Material cross-fade: wire fades out, solid + plates fade in
    mats.wire.opacity  = (1 - smoothstep(0.15, 0.9, p)) * 0.82 + 0.04 * (1 - p);
    mats.solid.opacity = smoothstep(0.25, 1, p);
    mats.plate.opacity = smoothstep(0.3,  1, p);

    const g = group.current;
    if (!g) return;

    // ── Responsive scale — fit building to 74 % of viewport height ────────
    const cam = state.camera as THREE.PerspectiveCamera;
    const dist = Math.abs(cam.position.z);
    const visibleH = 2 * Math.tan((cam.fov * Math.PI) / 180 / 2) * dist;
    const visibleW = visibleH * (state.size.width / state.size.height);

    const revealScale = 0.95 + 0.05 * smoothstep(0, 1, p);
    const targetScale = ((visibleH * 0.74) / FORM_HEIGHT) * revealScale;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 5, delta));

    // Right-zone anchor
    const xFactor = state.size.width < 1024 ? 0.18 : 0.26;
    g.position.x = THREE.MathUtils.damp(g.position.x, visibleW * xFactor, 5, delta);

    if (reducedMotion) {
      g.position.y = 0;
      g.rotation.set(0, -0.42, 0);
      return;
    }

    // Ultra-slow idle rotation — one revolution per ≈100s
    const idle = state.clock.elapsedTime * 0.0095;

    // Cursor parallax — eased tilt toward the pointer
    const targetRotY = -0.42 + idle + pointer.current.x * 0.14;
    const targetRotX = pointer.current.y * 0.045;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3, delta);

    // Subtle vertical float
    g.position.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.018;
  });

  return (
    <group ref={group} position={[2, 0, 0]} scale={0.5}>
      {/* ── Main volumes ── */}
      {VOLS.map((v, i) => (
        <group key={`vol-${i}`} position={[0, v.y, 0]}>
          {/* Solid matte stone */}
          <mesh geometry={geos.vols[i]} material={mats.solid} />
          {/* Bronze wireframe overlay — fades out during reveal */}
          <mesh
            geometry={geos.vols[i]}
            material={mats.wire}
            scale={[1.003, 1.003, 1.003]}
          />
        </group>
      ))}

      {/* ── Floor / cornice plates ── */}
      {PLATE_DATA.map((p, i) => (
        <mesh
          key={`plate-${i}`}
          geometry={geos.plates[i]}
          material={mats.plate}
          position={[0, p.y, 0]}
        />
      ))}
    </group>
  );
}

// ─── Camera dolly (scroll-driven) ───────────────────────────────────────────
function CameraRig({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.1, 5.0);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    const p = scrollProgress.current;
    const targetZ = THREE.MathUtils.lerp(5.0, 4.6, p);
    const targetY = THREE.MathUtils.lerp(0.1, 0.5, p);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── HeroScene (exported) ────────────────────────────────────────────────────
export function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  // Scroll dolly trigger
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });
    return () => { trigger.kill(); };
  }, [reducedMotion]);

  // Desktop cursor parallax
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.1, 5.0], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr([0.5, 1])}
          onIncline={() => setDpr([1, 2])}
        />

        {/* Architectural lighting — warm top key, cool fill, terracotta bounce */}
        <ambientLight intensity={0.5} color="#FFF8F0" />
        <directionalLight position={[4, 10, 5]} intensity={2.4} color="#FFF4E0" castShadow={false} />
        <directionalLight position={[-5, 2, -4]} intensity={0.7} color="#C8D8E8" />
        <pointLight position={[1, -3.5, 3.5]} intensity={0.9} color="#B96A43" distance={12} />

        <Building reducedMotion={reducedMotion} pointer={pointer} />
        {!reducedMotion && <CameraRig scrollProgress={scrollProgress} />}
      </Canvas>
    </div>
  );
}
