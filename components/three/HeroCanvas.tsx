'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <MeshDistortMaterial
          color="#00fff5"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          opacity={0.15}
          transparent
          wireframe={false}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[2.25, 1]} />
        <meshBasicMaterial
          color="#00fff5"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00fff5" />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ffffff" />
      <IcosahedronMesh />
    </Canvas>
  );
}
