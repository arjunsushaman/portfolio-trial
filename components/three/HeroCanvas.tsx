'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Module-level ref so Hero.tsx can toggle rendering on/off
export const heroPlayingRef = { current: true };

// ─── Frame driver: only invalidates when hero is visible ─────────────────────
function FrameDriver() {
  const { invalidate } = useThree();
  useFrame(() => {
    if (heroPlayingRef.current) invalidate();
  });
  return null;
}

// ─── Scene Wrapper with smooth mouse parallax ────────────────────────────────
// The whole scene gently tilts toward the mouse cursor using lerp
function SceneWrapper({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!heroPlayingRef.current || !groupRef.current) return;

    // Mouse pointer is in [-1, 1] range already in R3F
    const targetX = state.pointer.y * 0.18 + Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
    const targetY = state.pointer.x * 0.22 + Math.cos(state.clock.elapsedTime * 0.18) * 0.04;

    // Ease factor of 0.035 gives a buttery ~28-frame lag
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.035);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.035);
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Animated orbiting point light ──────────────────────────────────────────
function OrbitLight({
  radius,
  speed,
  color,
  yAmplitude = 1.5,
  yOffset = 0,
  intensity = 1.8,
}: {
  radius: number;
  speed: number;
  color: string;
  yAmplitude?: number;
  yOffset?: number;
  intensity?: number;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!heroPlayingRef.current || !lightRef.current) return;
    const t = state.clock.elapsedTime * speed;
    lightRef.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.55) * yAmplitude + yOffset,
      Math.sin(t) * radius,
    );
  });

  return <pointLight ref={lightRef} color={color} intensity={intensity} distance={10} decay={2} />;
}

// ─── Tiny glowing orbiting sphere with motion trail ─────────────────────────
function OrbitingSphere({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const trailRefs = useRef<THREE.Mesh[]>([]);
  const TRAIL = 4;
  const history = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL }, () => new THREE.Vector3()),
  );

  useFrame((state) => {
    if (!heroPlayingRef.current || !ref.current) return;
    const t = state.clock.elapsedTime;
    const speed = 0.26 + index * 0.11;
    const angle = t * speed + (index * Math.PI * 2) / total;
    const r = 2.6 + index * 0.45;

    const nx = Math.cos(angle) * r;
    const ny = Math.sin(angle * 0.62) * 1.7;
    const nz = Math.sin(angle) * r;

    ref.current.position.set(nx, ny, nz);

    for (let i = TRAIL - 1; i > 0; i--) {
      history.current[i].copy(history.current[i - 1]);
    }
    history.current[0].set(nx, ny, nz);

    trailRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.copy(history.current[i]);
      const s = 1 - i / TRAIL;
      mesh.scale.setScalar(s * 0.65);
      (mesh.material as THREE.MeshStandardMaterial).opacity = s * 0.3;
    });
  });

  const colors = ['#00fff5', '#40ffff', '#00e5e0'];
  const color = colors[index % colors.length];

  return (
    <group>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) trailRefs.current[i] = el; }}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <mesh ref={ref}>
        <sphereGeometry args={[0.068, 14, 14]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={5}
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Particle ring orbiting the torus knot ──────────────────────────────────
function ParticleRing({ count = 200, radius = 3.3 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.8;
      const y = (Math.random() - 0.5) * 1.2;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, radius]);

  useFrame((state) => {
    if (!heroPlayingRef.current || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.09) * 0.11;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.07) * 0.045;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#00fff5"
        size={0.03}
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Outer diffuse particle halo ────────────────────────────────────────────
function ParticleHalo({ count = 70 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 2.8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!heroPlayingRef.current || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
    ref.current.rotation.x = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#00fff5"
        size={0.02}
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Main torus knot ────────────────────────────────────────────────────────
// Rotation is driven purely by time — no per-frame mesh duplication.
// Smoother segment counts (128/20) give cleaner edges.
function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!heroPlayingRef.current || !meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * 0.16) * 0.45;
    meshRef.current.rotation.y = t * 0.08;
    if (wireRef.current) {
      wireRef.current.rotation.x = meshRef.current.rotation.x;
      wireRef.current.rotation.y = meshRef.current.rotation.y;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.45}>
      {/* Solid distorted mesh */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.44, 128, 18, 2, 3]} />
        <MeshDistortMaterial
          color="#00fff5"
          distort={0.12}
          speed={0.7}
          roughness={0.04}
          metalness={0.97}
          opacity={0.16}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer wireframe — slightly bigger so it halos the solid */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.55, 0.46, 100, 18, 2, 3]} />
        <meshBasicMaterial
          color="#00fff5"
          wireframe
          transparent
          opacity={0.045}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <SceneWrapper>
      <FrameDriver />
      <ambientLight intensity={0.22} />

      <OrbitLight radius={4.5} speed={0.32}  color="#00fff5" yAmplitude={1.5} yOffset={0.5}  intensity={2.2} />
      <OrbitLight radius={3.4} speed={-0.25} color="#ffffff" yAmplitude={1.2} yOffset={-0.5} intensity={1.1} />
      <OrbitLight radius={5.8} speed={0.17}  color="#00e5ff" yAmplitude={0.8} yOffset={0}    intensity={1.4} />

      <TorusKnotMesh />

      <OrbitingSphere index={0} total={3} />
      <OrbitingSphere index={1} total={3} />
      <OrbitingSphere index={2} total={3} />

      <ParticleRing count={180} radius={3.3} />
      <ParticleHalo count={50} />

      <Sparkles
        count={24}
        scale={10}
        size={2}
        speed={0.2}
        opacity={0.4}
        color="#00fff5"
      />
    </SceneWrapper>
  );
}

// ─── Canvas ───────────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [5, 0.5, 6], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <Scene />
    </Canvas>
  );
}
