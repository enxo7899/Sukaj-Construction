"use client";

// v1 approximation of the design-system §8 hero:
// Target: custom GLSL shader interpolating line/vertex geometry → lit matte
// volume. This pass uses a two-mesh approach: EdgesGeometry wireframe fades OUT
// while a solid mesh fades IN at the same position.
// Camera dolly driven by GSAP ScrollTrigger (reads scroll; never overrides it).

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, ContactShadows, Float } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ─── Tower geometry ────────────────────────────────────────────────────────────
// Three stacked volumes: podium → main body → narrow crown.
const PODIUM_GEO = new THREE.BoxGeometry(1.3, 0.3, 1.0);
const BODY_GEO   = new THREE.BoxGeometry(0.8, 2.4, 0.65);
const CROWN_GEO  = new THREE.BoxGeometry(0.5, 1.0, 0.4);

const PODIUM_EDGES = new THREE.EdgesGeometry(PODIUM_GEO);
const BODY_EDGES   = new THREE.EdgesGeometry(BODY_GEO);
const CROWN_EDGES  = new THREE.EdgesGeometry(CROWN_GEO);

// Stack: podium base → body → crown. Y positions centre each volume.
const PODIUM_Y = -1.55;
const BODY_Y   = -0.15;
const CROWN_Y  =  1.55;

// Warm travertine solid — natural limestone read once the wireframe dissolves.
// Per-volume tints give the massing depth instead of one flat monolith.
const SOLID_COLOR  = "#C6B193"; // body — warm travertine
const PODIUM_COLOR = "#B49B79"; // podium — grounded, slightly deeper
const CROWN_COLOR  = "#D2C0A4"; // crown — catches more light

// ─── CameraRig ─────────────────────────────────────────────────────────────────
function CameraRig({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.55, 4.7);
    camera.lookAt(0.5, 0.4, 0);
  }, [camera]);

  useFrame(() => {
    const p = scrollProgress.current;
    // Restrained dolly in + slight upward drift as user scrolls past the hero.
    camera.position.z = THREE.MathUtils.lerp(4.7, 4.1, p);
    camera.position.y = THREE.MathUtils.lerp(0.55, 0.95, p);
    camera.lookAt(0.5, 0.4, 0);
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
      duration: 2.6,
      delay: 0.5,
      ease: "power2.inOut",
    });
    return () => { tween.kill(); };
  }, [reducedMotion]);

  useFrame(() => {
    const p = progress.current;
    // The monument resolves to an elegant *hybrid*: a translucent travertine
    // mass held inside crisp terracotta linework — an architectural drawing
    // that has been gently materialised, not a hard wireframe→solid cut.
    // This reads as premium on both software and GPU renderers.
    for (const m of wireRefs.current) {
      if (m) m.opacity = Math.max(1 - p, 0.9 * p);
    }
    for (const m of solidRefs.current) {
      if (m) m.opacity = 0.5 * p;
    }
  });

  // Per-volume stone tint — podium grounded, crown catches light.
  const solidColors = [PODIUM_COLOR, SOLID_COLOR, CROWN_COLOR];

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

  // Gentle idle motion gives the monument life; skipped under reduced motion.
  const content = (
    // Offset right so tower sits in the right half while headline text claims
    // the left. Slight Y-axis rotation gives a 3-quarter perspective read.
    <group position={[1.0, -0.1, 0]} rotation={[0, -0.25, 0]}>
      {volumes.map(({ solid, edges, y }, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Solid layer — translucent warm stone */}
          <mesh geometry={solid} castShadow receiveShadow>
            <meshStandardMaterial
              ref={setSolidRef(i)}
              color={solidColors[i]}
              roughness={0.78}
              metalness={0.02}
              transparent
              opacity={reducedMotion ? 0.42 : 0}
            />
          </mesh>
          {/* Wireframe layer — crisp iron-red linework that holds the form */}
          <lineSegments geometry={edges} renderOrder={1}>
            <lineBasicMaterial
              ref={setWireRef(i)}
              color="#8A3D1C"
              transparent
              opacity={reducedMotion ? 0.9 : 1}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );

  if (reducedMotion) return content;
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.22} floatingRange={[-0.04, 0.04]}>
      {content}
    </Float>
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
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.55, 4.7], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr([0.5, 1])}
          onIncline={() => setDpr([1, 2])}
        />

        {/* Three-point lighting for architectural model quality */}

        {/* Warm ambient base — raised so the translucent stone reads evenly */}
        <ambientLight intensity={0.95} color="#FBF3E8" />

        {/* Key light — warm, upper-right-front, softened to avoid a hard smear */}
        <directionalLight
          position={[4, 7, 3]}
          intensity={1.35}
          color="#FFF4E8"
        />

        {/* Cool rim light from behind — separates the form from the background */}
        <directionalLight
          position={[-3, 4, -6]}
          intensity={0.9}
          color="#C8D8E8"
        />

        {/* Terracotta bounce from below — mimics warm ground reflection */}
        <pointLight
          position={[0, -3, 2.5]}
          intensity={0.7}
          color="#B96A43"
          distance={9}
        />

        <TowerScene reducedMotion={reducedMotion} />

        {/* Soft contact shadow grounds the monument in warm light instead of
            leaving it floating against a flat field. */}
        <group position={[1.0, -1.92, 0]} rotation={[0, -0.25, 0]}>
          <ContactShadows
            opacity={0.34}
            scale={7}
            blur={2.6}
            far={4}
            resolution={512}
            color="#3a2a1c"
          />
        </group>

        {!reducedMotion && <CameraRig scrollProgress={scrollProgress} />}
      </Canvas>
    </div>
  );
}
