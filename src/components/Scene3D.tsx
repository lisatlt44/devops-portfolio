"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Shader material personnalisé pour un effet "Cyberpunk"
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorStart: { value: new THREE.Color("#A259FF") },
      uColorEnd: { value: new THREE.Color("#00C2FF") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      // Rotation continue
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
      
      // Mise à jour du temps pour le shader (si on utilisait un shader custom)
      // Ici on va animer la scale pour un effet de respiration
      const scale = 1 + Math.sin(clock.getElapsedTime()) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Mise à jour des uniforms si shader custom
      uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 15]} />
        <meshStandardMaterial
          color="#111"
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
          emissive="#A259FF"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Glow interne */}
      <mesh scale={2.4}>
        <icosahedronGeometry args={[1, 15]} />
        <meshBasicMaterial color="#00C2FF" transparent opacity={0.05} />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#A259FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00C2FF" />
        
        <AnimatedSphere />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
