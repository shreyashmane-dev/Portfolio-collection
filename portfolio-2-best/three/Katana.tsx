"use client";

import { useMemo, forwardRef } from "react";
import * as THREE from "three";

function makeBladeGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.016, 0);
  shape.lineTo(-0.014, 1.14);
  shape.lineTo(0.012, 1.31);
  shape.lineTo(0.034, 1.16);
  shape.lineTo(0.03, 0);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.014, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 1 });
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const t = Math.max(0, y) / 1.31;
    pos.setX(i, pos.getX(i) + t * t * 0.14);
  }
  geo.computeVertexNormals();
  return geo;
}

export interface KatanaProps {
  edgeColor?: string;
  edgeIntensity?: number;
  scale?: number;
}

export const Katana = forwardRef<THREE.Group, KatanaProps>(function Katana(
  { edgeColor = "#2F6BFF", edgeIntensity = 1.4, scale = 1 },
  ref
) {
  const bladeGeo = useMemo(makeBladeGeometry, []);
  const materials = useMemo(
    () => ({
      blade: new THREE.MeshStandardMaterial({ color: "#c9ccd4", metalness: 0.95, roughness: 0.22 }),
      dark: new THREE.MeshStandardMaterial({ color: "#0c0d12", metalness: 0.6, roughness: 0.5 }),
      wrap: new THREE.MeshStandardMaterial({ color: "#1a1016", metalness: 0.2, roughness: 0.85 }),
      accent: new THREE.MeshStandardMaterial({ color: "#E5243B", metalness: 0.4, roughness: 0.4 }),
      edge: new THREE.MeshStandardMaterial({
        color: edgeColor,
        emissive: edgeColor,
        emissiveIntensity: edgeIntensity,
        metalness: 0.2,
        roughness: 0.3,
      }),
    }),
    [edgeColor, edgeIntensity]
  );

  return (
    <group ref={ref} scale={scale}>
      <mesh geometry={bladeGeo} material={materials.blade} position={[0, 0.02, -0.007]} />
      <mesh name="katana-edge" material={materials.edge} position={[-0.012, 0.62, 0]}>
        <boxGeometry args={[0.004, 1.16, 0.02]} />
      </mesh>
      <mesh material={materials.dark} position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.018, 24]} />
      </mesh>
      <mesh material={materials.accent} position={[0, -0.005, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.012, 16]} />
      </mesh>
      <mesh material={materials.wrap} position={[0, -0.19, 0]}>
        <cylinderGeometry args={[0.03, 0.034, 0.34, 12]} />
      </mesh>
      {[-0.08, -0.14, -0.2, -0.26].map((y) => (
        <mesh key={y} material={materials.dark} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.033, 0.005, 6, 16]} />
        </mesh>
      ))}
      <mesh material={materials.dark} position={[0, -0.365, 0]}>
        <cylinderGeometry args={[0.036, 0.032, 0.02, 12]} />
      </mesh>
    </group>
  );
});