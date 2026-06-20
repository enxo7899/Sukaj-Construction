"use client";

// v1 approximation of the design-system §8 hero:
// Target is a custom GLSL shader that interpolates line/vertex geometry → lit
// matte volume in a single pass. This pass uses the simpler two-mesh approach:
// EdgesGeometry wireframe fades OUT while the solid mesh fades IN at the same
// position. The camera dolly is driven by GSAP ScrollTrigger (no scroll-jacking
// — ScrollTrigger reads scroll position, never overrides it).

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ─── Tower geometry ────────────────────────────────────────────────────────────
// Three stacked volumes: podium → main body → narrow crown.
// Scaled up from the original to fill more of the viewport.
const PODIUM_GEO = new THREE.BoxGeometry(1.2, 0.28, 0.9);
const BODY_GEO   = new THREE.BoxGeometry(0.72, 2.1,  0.58);
const CROWN_GEO  = new THREE.BoxGeometry(0.46, 0.92, 0.36);

const PODIUM_EDGES = new THREE.EdgesGeometry(PODIUM_GEO);
const BODY_EDGES   = new THREE.EdgesGeometry(BODY_GEO);
const CROWN_EDGES  = new THREE.EdgesGeometry(CROWN_GEO);

// Stack: podium base → body → crown. Total span ≈ -1.54 to +1.82 = 3.36 units.
const PODIUM_Y = -1.4;
const BODY_Y   = -0.19;
const CROWN_Y  =  1.36;

// ─── CameraRig ─────────────────────────────────────────────────────────────────
function CameraRig({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    // Straight-on camera; the tower group is offset in world space to sit
    // right-of-center, leaving the bottom-left clear for the headline text.
    camera.position.set(0, 0.2, 4.2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    const p = scrollProgress.current;
    // Gentle dolly in as user scrolls past the hero
    camera.position.z = THREE.MathUtils.lerp(4.2, 3.4, p);
    camera.position.y = THREE.MathUtils.lerp(0.2, 0.5, p);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── TowerScene ────────────────────────────────────────────────────────────────
function TowerScene({ reducedMotion }: { reducedMotion: boolean }) {
  const wireRefs = useRef<THREE.LineBasicMaterial[]>([]);
  const solidRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const progress = useRef(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) return;
    const tween = gsap.to(progress, {
      current: 1,
      duration: 2.2,
      delay: 0.4,
      ease: "power2.inOut",
    });
    return () => { tween.kill(); };
  }, [reducedMotion]);

  useFrame(() => {
    const p = progress.current;
    for (const m of wireRefs.current) {
      if (m) m.opacity = 1 - p;
    }
    for (const m of solidRefs.current) {
      if (m) m.opacity = p;
    }
  });

  const setWireRef = (i: number) => (el: THREE.LineBasicMaterial | null) => {
    if (el) wireRefs.current[i] = el;
  };
  const setSolidRef = (i: number) => (el: THREE.MeshStandardMaterial | null) => {
    if (el) solidRefs.current[i] = el;
  };

  const volumes: Array<{
    solid: THREE.BufferGeometry;
    edges: THREE.BufferGeometry;
    y: number;
  }> = [
    { solid: PODIUM_GEO, edges: PODIUM_EDGES, y: PODIUM_Y },
    { solid: BODY_GEO,   edges: BODY_EDGES,   y: BODY_Y },
    { solid: CROWN_GEO,  edges: CROWN_EDGES,  y: CROWN_Y },
  ];

  return (
    // Offset right so tower sits in the right half while headline text claims the left.
    // Rotation gives a slight 3-quarter perspective read.
    <group position={[1.1, -0.1, 0]} rotation={[0, -0.3, 0]}>
      {volumes.map(({ solid, edges, y }, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Wireframe layer — fades out */}
          <lineSegments geometry={edges}>
            <lineBasicMaterial
              ref={setWireRef(i)}
              color="#B96A43"
              transparent
              opacity={reducedMotion ? 0 : 1}
              depthWrite={false}
            />
          </lineSegments>
          {/* Solid layer — fades in */}
          <mesh geometry={solid}>
            <meshStandardMaterial
              ref={setSolidRef(i)}
              color="#EFE4D5"
              roughness={0.85}
              metalness={0.05}
              transparent
              opacity={reducedMotion ? 1 : 0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── HeroScene (exported) ──────────────────────────────────────────────────────
export function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => { trigger.kill(); };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.2, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr([0.5, 1])}
          onIncline={() => setDpr([1, 2])}
        />

        {/* Lighting */}
        <ambientLight intensity={0.4} color="#FAF6EE" />
        <directionalLight
          position={[3, 5, 3]}
          intensity={1.8}
          color="#FAF6EE"
          castShadow={false}
        />
        {/* Warm accent fill from below — mimics terracotta ground bounce */}
        <pointLight
          position={[0, -2, 2]}
          intensity={0.8}
          color="#B96A43"
          distance={8}
        />

        <TowerScene reducedMotion={reducedMotion} />
        {!reducedMotion && <CameraRig scrollProgress={scrollProgress} />}
      </Canvas>
    </div>
  );
}
