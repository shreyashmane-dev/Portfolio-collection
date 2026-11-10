"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Katana } from "./Katana";

function Rig() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.rotation.y += delta * 0.35;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, py * 0.3 + 0.15, 3, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -0.6 + px * 0.25, 3, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, px * 0.4, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, py * 0.3, 3, delta);
    if (ring.current) {
      ring.current.rotation.z -= delta * 0.12;
      ring.current.rotation.x = Math.PI / 2.6 + py * 0.1;
    }
  });

  return (
    <>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.6}>
        <group ref={group} rotation={[0.15, 0, -0.6]} position={[0, -0.5, 0]}>
          <Katana scale={2.1} edgeIntensity={2} />
        </group>
      </Float>
      <mesh ref={ring} rotation={[Math.PI / 2.6, 0, 0]} position={[0, 0.2, -1.5]}>
        <torusGeometry args={[2.1, 0.008, 8, 96]} />
        <meshBasicMaterial color="#2F6BFF" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, 0]} position={[0, 0.2, -1.6]}>
        <torusGeometry args={[2.5, 0.004, 8, 96]} />
        <meshBasicMaterial color="#E5243B" transparent opacity={0.35} />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "auto" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <pointLight position={[-4, 1, 3]} intensity={14} color="#2F6BFF" />
      <pointLight position={[4, -1, 2]} intensity={10} color="#E5243B" />
      <Rig />
    </Canvas>
  );
}