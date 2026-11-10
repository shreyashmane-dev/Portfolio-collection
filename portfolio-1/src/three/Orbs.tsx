"use client"

import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface OrbsProps {
  progressState: React.RefObject<{ progress: number }> | { current: { progress: number } }
}

export function Orbs({ progressState }: OrbsProps) {
  const redOrbRef = useRef<THREE.Group>(null)
  const blueOrbRef = useRef<THREE.Group>(null)
  const redLightRef = useRef<THREE.PointLight>(null)
  const blueLightRef = useRef<THREE.PointLight>(null)

  useFrame(() => {
    const p = progressState.current ? progressState.current.progress : 0

    if (!redOrbRef.current || !blueOrbRef.current) return

    // Hidden before slash
    if (p < 0.4) {
      redOrbRef.current.visible = false
      blueOrbRef.current.visible = false
      return
    }

    redOrbRef.current.visible = true
    blueOrbRef.current.visible = true

    // 0.40 to 0.50: Emergence from blade
    if (p >= 0.4 && p < 0.5) {
      const t = (p - 0.4) / 0.1
      redOrbRef.current.position.set(-1.8 * t, 0.8 + 0.4 * t, 0.5 + 0.3 * t)
      blueOrbRef.current.position.set(1.8 * t, 0.8 - 0.2 * t, 0.5 + 0.3 * t)

      const scale = t * 1.0
      redOrbRef.current.scale.set(scale, scale, scale)
      blueOrbRef.current.scale.set(scale, scale, scale)
    }

    // 0.50 to 0.75: Helical Orbit around the figure
    else if (p >= 0.5 && p < 0.75) {
      const t = (p - 0.5) / 0.25
      const angle = t * Math.PI * 4
      const radius = THREE.MathUtils.lerp(2.2, 1.2, t)

      const redX = Math.cos(angle) * radius
      const redZ = Math.sin(angle) * radius
      const redY = 0.8 + Math.sin(angle * 2) * 0.5
      redOrbRef.current.position.set(redX, redY, redZ)

      const blueX = Math.cos(angle + Math.PI) * radius
      const blueZ = Math.sin(angle + Math.PI) * radius
      const blueY = 0.8 - Math.sin(angle * 2) * 0.5
      blueOrbRef.current.position.set(blueX, blueY, blueZ)

      redOrbRef.current.scale.set(1.1, 1.1, 1.1)
      blueOrbRef.current.scale.set(1.1, 1.1, 1.1)
    }

    // 0.75 to 0.88: Collision towards center front (0, 0.8, 0.8)
    else if (p >= 0.75 && p < 0.88) {
      const t = (p - 0.75) / 0.13
      const easeT = t * t * t

      const collisionPoint = new THREE.Vector3(0, 0.8, 0.8)
      const startRed = new THREE.Vector3(-1.2, 0.8, 0.8)
      const startBlue = new THREE.Vector3(1.2, 0.8, 0.8)

      redOrbRef.current.position.lerpVectors(startRed, collisionPoint, easeT)
      blueOrbRef.current.position.lerpVectors(startBlue, collisionPoint, easeT)

      if (redLightRef.current && blueLightRef.current) {
        redLightRef.current.intensity = 15 + easeT * 35
        blueLightRef.current.intensity = 15 + easeT * 35
      }

      if (t > 0.95) {
        redOrbRef.current.visible = false
        blueOrbRef.current.visible = false
      }
    } else {
      redOrbRef.current.visible = false
      blueOrbRef.current.visible = false
    }
  })

  return (
    <>
      {/* RED ORB */}
      <group ref={redOrbRef} visible={false}>
        <mesh>
          <sphereGeometry args={[0.15, 24, 24]} />
          <meshBasicMaterial color="#FF1A35" />
        </mesh>
        <mesh scale={1.4}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color="#E5243B"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <pointLight
          ref={redLightRef}
          color="#E5243B"
          intensity={12}
          distance={8}
        />
      </group>

      {/* BLUE ORB */}
      <group ref={blueOrbRef} visible={false}>
        <mesh>
          <sphereGeometry args={[0.15, 24, 24]} />
          <meshBasicMaterial color="#3B82F6" />
        </mesh>
        <mesh scale={1.4}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color="#2F6BFF"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <pointLight
          ref={blueLightRef}
          color="#2F6BFF"
          intensity={12}
          distance={8}
        />
      </group>
    </>
  )
}
