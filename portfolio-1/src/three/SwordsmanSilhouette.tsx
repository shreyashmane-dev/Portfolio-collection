"use client"

import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface SwordsmanSilhouetteProps {
  progressState: React.RefObject<{ progress: number }> | { current: { progress: number } }
}

export function SwordsmanSilhouette({ progressState }: SwordsmanSilhouetteProps) {
  const figureGroup = useRef<THREE.Group>(null)
  const swordArmGroup = useRef<THREE.Group>(null)
  const bladeGlintRef = useRef<THREE.MeshStandardMaterial>(null)
  const slashTrailRef = useRef<THREE.Mesh>(null)

  const blackClothMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#050505"),
        roughness: 0.9,
        metalness: 0.1
      }),
    []
  )

  const bladeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D1D5DB"),
        roughness: 0.2,
        metalness: 0.95,
        emissive: new THREE.Color("#FFFFFF"),
        emissiveIntensity: 0.1
      }),
    []
  )

  useFrame((state) => {
    const p = progressState.current ? progressState.current.progress : 0

    // 0.00 - 0.15: Idle breathing
    const breath = Math.sin(state.clock.elapsedTime * 2) * 0.02
    if (figureGroup.current) {
      figureGroup.current.position.y = breath
    }

    // 0.15 - 0.35: Draw / raise sword
    // 0.35 - 0.50: The fast slash
    if (swordArmGroup.current) {
      if (p < 0.15) {
        swordArmGroup.current.rotation.x = 0
        swordArmGroup.current.rotation.z = -0.2
        swordArmGroup.current.rotation.y = 0
      } else if (p < 0.35) {
        const drawT = (p - 0.15) / 0.2
        swordArmGroup.current.rotation.x = THREE.MathUtils.lerp(0, -1.2, drawT)
        swordArmGroup.current.rotation.z = THREE.MathUtils.lerp(-0.2, 0.4, drawT)
        swordArmGroup.current.rotation.y = THREE.MathUtils.lerp(0, 0.3, drawT)
      } else if (p < 0.50) {
        const slashT = (p - 0.35) / 0.15
        swordArmGroup.current.rotation.x = THREE.MathUtils.lerp(-1.2, 0.8, slashT)
        swordArmGroup.current.rotation.z = THREE.MathUtils.lerp(0.4, -1.4, slashT)
        swordArmGroup.current.rotation.y = THREE.MathUtils.lerp(0.3, -0.6, slashT)
      } else {
        swordArmGroup.current.rotation.x = 0.8
        swordArmGroup.current.rotation.z = -1.4
        swordArmGroup.current.rotation.y = -0.6
      }
    }

    // Blade glint emissive pulse
    if (bladeGlintRef.current) {
      if (p >= 0.25 && p <= 0.4) {
        const glint = Math.sin(((p - 0.25) / 0.15) * Math.PI) * 2.5
        bladeGlintRef.current.emissiveIntensity = 0.1 + glint
      } else {
        bladeGlintRef.current.emissiveIntensity = 0.1
      }
    }

    // Slash arc trail visibility
    if (slashTrailRef.current) {
      if (p >= 0.38 && p <= 0.48) {
        const alpha = Math.sin(((p - 0.38) / 0.1) * Math.PI)
        slashTrailRef.current.visible = true
        slashTrailRef.current.scale.set(alpha, alpha, alpha)
      } else {
        slashTrailRef.current.visible = false
      }
    }
  })

  return (
    <group ref={figureGroup} position={[0, -0.8, 0]} rotation={[0, -0.4, 0]}>
      {/* Torso / Robe */}
      <mesh material={blackClothMaterial} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.26, 0.45, 1.4, 16]} />
      </mesh>

      {/* Hood / Head */}
      <mesh material={blackClothMaterial} position={[0, 2.05, -0.04]}>
        <sphereGeometry args={[0.22, 16, 16]} />
      </mesh>

      {/* Face cowl shadow mask */}
      <mesh material={blackClothMaterial} position={[0, 2.02, 0.08]}>
        <boxGeometry args={[0.18, 0.15, 0.15]} />
      </mesh>

      {/* Flowing Cape */}
      <mesh material={blackClothMaterial} position={[0, 0.35, -0.1]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.7, 1.2, 16]} />
      </mesh>

      {/* Left arm */}
      <mesh material={blackClothMaterial} position={[-0.32, 1.1, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.08, 0.07, 0.9, 12]} />
      </mesh>

      {/* Right Arm + Katana */}
      <group ref={swordArmGroup} position={[0.34, 1.6, 0]}>
        <mesh material={blackClothMaterial} position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.8, 12]} />
        </mesh>

        <mesh material={blackClothMaterial} position={[0, -0.9, 0.15]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.7, 12]} />
        </mesh>

        <group position={[0, -1.2, 0.3]} rotation={[-1.2, 0, 0]}>
          <mesh material={blackClothMaterial} position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.035, 0.04, 0.8, 12]} />
          </mesh>

          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
            <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
          </mesh>

          <mesh ref={bladeGlintRef as unknown as React.RefObject<THREE.Mesh>} material={bladeMaterial} position={[0, 1.2, 0]}>
            <boxGeometry args={[0.02, 2.3, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* Slash Arc Ribbon Mesh */}
      <mesh ref={slashTrailRef} position={[0.2, 1.2, 0.6]} rotation={[0.2, -0.3, -0.6]} visible={false}>
        <torusGeometry args={[1.6, 0.08, 8, 32, Math.PI * 0.9]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
