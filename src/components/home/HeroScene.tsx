"use client";

// Signature 3D hero — a warm limestone residential monument that resolves from
// terracotta line-art into a solid, dramatically-lit building. Five stacked
// volumes (podium → body → setback → crown → cap) with floor/cornice plates
// give real architectural rhythm; a strong warm key light carves a lit face
// against a shadowed side so the form reads as dimensional, not a flat slab.
//
// Motion: GSAP-driven wireframe→solid reveal on load, subtle cursor parallax,
// gentle idle float, and a restrained scroll-dolly. All reads scroll/pointer —
// it never hijacks them. Honours prefers-reduced-motion (resolved + still).

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, ContactShadows, Float } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ─── Building massing ───────────────────────────────────────────────────────
type Vol = { w: number; h: number; d: number; y: number };
type Plate = { w: number; d: number; y: number };

// Stack from podium base (y ≈ -2.55) to cap (y ≈ 3.0). Centred around y ≈ 0.2.
const VOLS: Vol[] = [
  { w: 2.7, h: 0.55, d: 1.55, y: -2.525 }, // podium — widest, grounds the form
  { w: 2.05, h: 3.5, d: 1.2,  y: -0.55  }, // main body
  { w: 1.5,  h: 1.25, d: 0.92, y:  1.825 }, // setback
  { w: 0.95, h: 0.6,  d: 0.62, y:  2.75  }, // crown
  { w: 0.4,  h: 0.22, d: 0.4,  y:  3.16  }, // cap
];

// Floor / cornice plates — fine slabs barely proud of each volume face,
// reading as elegant storey bands (balcony lines) rather than heavy trays.
const PLATES: Plate[] = (() => {
  const rows: Plate[] = [];
  // body: ~8 storeys
  for (let i = 0; i <= 7; i++) rows.push({ w: 2.1, d: 1.25, y: -2.2 + i * 0.5 });
  // setback: 3 cornices
  for (let i = 0; i <= 2; i++) rows.push({ w: 1.55, d: 0.97, y: 1.3 + i * 0.5 });
  // crown band
  rows.push({ w: 1.0, d: 0.67, y: 2.48 });
  return rows;
})();

// Palette — warm limestone, deeper cornices, terracotta linework.
const STONE_COLOR  = "#CFB99B";
const PLATE_COLOR  = "#BCA483";
const WIRE_COLOR   = "#9E4A24";

const GROUP_POS: [number, number, number] = [1.95, -0.32, 0];
const GROUP_ROT: [number, number, number] = [0, -0.32, 0];

// ─── Building ───────────────────────────────────────────────────────────────
function Building({
  reducedMotion,
  pointer,
}: {
  reducedMotion: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const progress = useRef(reducedMotion ? 1 : 0);

  // Geometry + edge lines, memoised once.
  const volGeos = useMemo(() => VOLS.map((v) => new THREE.BoxGeometry(v.w, v.h, v.d)), []);
  const volEdges = useMemo(() => volGeos.map((g) => new THREE.EdgesGeometry(g)), [volGeos]);
  const plateGeos = useMemo(() => PLATES.map((p) => new THREE.BoxGeometry(p.w, 0.03, p.d)), []);

  // Shared materials — one per layer, so a single opacity tween drives every
  // volume/plate/line at once (not just the first mesh).
  const mats = useMemo(
    () => ({
      stone: new THREE.MeshStandardMaterial({
        color: STONE_COLOR, roughness: 0.82, metalness: 0.02,
        transparent: true, opacity: reducedMotion ? 0.97 : 0,
      }),
      plate: new THREE.MeshStandardMaterial({
        color: PLATE_COLOR, roughness: 0.8, metalness: 0.02,
        transparent: true, opacity: reducedMotion ? 0.99 : 0,
      }),
      wire: new THREE.LineBasicMaterial({
        color: WIRE_COLOR, transparent: true,
        opacity: reducedMotion ? 0.3 : 1, depthWrite: false,
      }),
    }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    return () => {
      volGeos.forEach((g) => g.dispose());
      volEdges.forEach((g) => g.dispose());
      plateGeos.forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [volGeos, volEdges, plateGeos, mats]);

  // Reveal tween — line-art draws, then stone materialises beneath it.
  useEffect(() => {
    if (reducedMotion) return;
    const tween = gsap.to(progress, { current: 1, duration: 2.6, delay: 0.45, ease: "power2.inOut" });
    return () => { tween.kill(); };
  }, [reducedMotion]);

  useFrame(() => {
    const p = progress.current;
    // Stone fades to near-solid slightly ahead; terracotta edges resolve to a
    // crisp architectural line accent that stays over the finished stone.
    mats.stone.opacity = 0.97 * Math.min(p * 1.25, 1);
    mats.plate.opacity = 0.99 * Math.min(p * 1.25, 1);
    mats.wire.opacity = Math.max(1 - p, 0.3);

    // Subtle cursor parallax — the monument turns a few degrees toward the pointer.
    if (group.current && !reducedMotion) {
      const tx = pointer.current.x * 0.12;
      const ty = pointer.current.y * 0.06;
      group.current.rotation.y += (GROUP_ROT[1] + tx - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (ty - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group} position={GROUP_POS} rotation={GROUP_ROT}>
      {VOLS.map((v, i) => (
        <mesh key={`v-${i}`} geometry={volGeos[i]} material={mats.stone} position={[0, v.y, 0]} castShadow receiveShadow />
      ))}
      {PLATES.map((pl, i) => (
        <mesh key={`p-${i}`} geometry={plateGeos[i]} material={mats.plate} position={[0, pl.y, 0]} castShadow />
      ))}
      {VOLS.map((v, i) => (
        <lineSegments key={`e-${i}`} geometry={volEdges[i]} material={mats.wire} position={[0, v.y, 0]} renderOrder={2} />
      ))}
    </group>
  );
}

// ─── CameraRig — restrained scroll dolly ────────────────────────────────────
function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0.25, 0.45, 6.8);
    camera.lookAt(1.45, 0.25, 0);
  }, [camera]);

  useFrame(() => {
    const p = scrollProgress.current;
    camera.position.z = THREE.MathUtils.lerp(6.6, 5.9, p);
    camera.position.y = THREE.MathUtils.lerp(0.45, 0.95, p);
    camera.lookAt(1.45, 0.25, 0);
  });

  return null;
}

// ─── HeroScene (exported) ───────────────────────────────────────────────────
export function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });

    const el = containerRef.current;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    el.addEventListener("pointermove", onMove);

    return () => {
      trigger.kill();
      el.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  const building = (
    <Building reducedMotion={reducedMotion} pointer={pointer} />
  );

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows
        camera={{ position: [0.25, 0.45, 6.8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr([0.5, 1])}
          onIncline={() => setDpr([1, 2])}
        />

        {/* Warm ambient floor */}
        <ambientLight intensity={0.55} color="#FBF1E4" />

        {/* Key light — strong warm sun from upper-left-front; carves a clearly
            lit face against a shadowed side for real dimensionality. */}
        <directionalLight
          position={[-5, 7, 5]}
          intensity={2.7}
          color="#FFF1DE"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Cool sky fill from the right — softens the shadow side without flattening. */}
        <directionalLight position={[5, 4, 2]} intensity={0.55} color="#CCD8E6" />

        {/* Terracotta bounce from below — warm ground reflection. */}
        <pointLight position={[1, -2.5, 3]} intensity={0.8} color="#B25F38" distance={11} />

        {reducedMotion ? building : (
          <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.25} floatingRange={[-0.05, 0.05]}>
            {building}
          </Float>
        )}

        {/* Grounding contact shadow under the podium */}
        <group position={[1.95, -2.78, 0]} rotation={[0, -0.32, 0]}>
          <ContactShadows opacity={0.42} scale={9} blur={2.4} far={5} resolution={1024} color="#2e2014" />
        </group>

        {!reducedMotion && <CameraRig scrollProgress={scrollProgress} />}
      </Canvas>
    </div>
  );
}
