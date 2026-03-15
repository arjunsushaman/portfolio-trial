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
    if (!heroPlayingRef.current) return;
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime * speed;
    lightRef.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.55) * yAmplitude + yOffset,
      Math.sin(t) * radius
    );
  });

  return <pointLight ref={lightRef} color={color} intensity={intensity} distance={9} decay={2} />;
}

// ─── Tiny glowing orbiting sphere ───────────────────────────────────────────
function OrbitingSphere({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const trailRefs = useRef<THREE.Mesh[]>([]);
  const TRAIL = 3;
  const history = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL }, () => new THREE.Vector3())
  );

  useFrame((state) => {
    if (!heroPlayingRef.current) return;
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const speed = 0.28 + index * 0.13;
    const angle = t * speed + (index * Math.PI * 2) / total;
    const r = 2.7 + index * 0.4;

    const nx = Math.cos(angle) * r;
    const ny = Math.sin(angle * 0.65) * 1.8;
    const nz = Math.sin(angle) * r;

    ref.current.position.set(nx, ny, nz);

    for (let i = TRAIL - 1; i > 0; i--) {
      history.current[i].copy(history.current[i - 1]);
    }
    history.current[0].set(nx, ny, nz);

    trailRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.copy(history.current[i]);
      const scale = 1 - i / TRAIL;
      mesh.scale.setScalar(scale * 0.6);
      (mesh.material as THREE.MeshStandardMaterial).opacity = scale * 0.35;
    });
  });

  const colors = ['#00fff5', '#40ffff', '#00e5e0'];
  const color = colors[index % colors.length];

  return (
    <group>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
        >
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
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={4}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Particle ring orbiting the torus knot ──────────────────────────────────
function ParticleRing({ count = 220, radius = 3.3 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.7;
      const y = (Math.random() - 0.5) * 1.1;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, radius]);

  useFrame((state) => {
    if (!heroPlayingRef.current) return;
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.055;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.12;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.08) * 0.05;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#00fff5"
        size={0.028}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Outer diffuse particle halo ────────────────────────────────────────────
function ParticleHalo({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 2.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!heroPlayingRef.current) return;
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#00fff5"
        size={0.018}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Main torus knot ────────────────────────────────────────────────────────
function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!heroPlayingRef.current) return;
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.09;
    if (wireRef.current) {
      wireRef.current.rotation.x = meshRef.current.rotation.x;
      wireRef.current.rotation.y = meshRef.current.rotation.y;
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.4}>
      {/* Solid distorted mesh */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.45, 80, 14, 2, 3]} />
        <MeshDistortMaterial
          color="#00fff5"
          distort={0.15}
          speed={0.8}
          roughness={0.05}
          metalness={0.95}
          opacity={0.14}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.54, 0.47, 90, 16, 2, 3]} />
        <meshBasicMaterial
          color="#00fff5"
          wireframe
          transparent
          opacity={0.055}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// ─── Scene ──────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <FrameDriver />
      <ambientLight intensity={0.25} />

      <OrbitLight radius={4.5} speed={0.35} color="#00fff5" yAmplitude={1.5} yOffset={0.5} intensity={2} />
      <OrbitLight radius={3.5} speed={-0.28} color="#ffffff" yAmplitude={1.2} yOffset={-0.5} intensity={1.2} />
      <OrbitLight radius={5.5} speed={0.18} color="#00e5ff" yAmplitude={0.8} yOffset={0} intensity={1.5} />

      <TorusKnotMesh />

      <OrbitingSphere index={0} total={3} />
      <OrbitingSphere index={1} total={3} />
      <OrbitingSphere index={2} total={3} />

      <ParticleRing count={100} radius={3.3} />
      <ParticleHalo count={25} />

      <Sparkles
        count={20}
        scale={9}
        size={1.8}
        speed={0.25}
        opacity={0.45}
        color="#00fff5"
      />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1]}
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
