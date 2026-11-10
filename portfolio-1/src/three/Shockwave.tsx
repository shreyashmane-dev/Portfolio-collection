"use client"

import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ShockwaveProps {
  progressState: React.RefObject<{ progress: number }> | { current: { progress: number } }
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function generateSparks(count: number) {
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const u = pseudoRandom(i * 4 + 1)
    const v = pseudoRandom(i * 4 + 2)
    const theta = u * 2.0 * Math.PI
    const phi = Math.acos(2.0 * v - 1.0)
    const r = Math.cbrt(pseudoRandom(i * 4 + 3))

    const sinPhi = Math.sin(phi)
    const x = r * sinPhi * Math.cos(theta)
    const y = r * sinPhi * Math.sin(theta)
    const z = r * Math.cos(phi)

    pos[i * 3] = x
    pos[i * 3 + 1] = y
    pos[i * 3 + 2] = z

    if (i % 2 === 0) {
      col[i * 3] = 0.95
      col[i * 3 + 1] = 0.15
      col[i * 3 + 2] = 0.25
    } else {
      col[i * 3] = 0.18
      col[i * 3 + 1] = 0.45
      col[i * 3 + 2] = 1.0
    }
  }

  return { pos, col }
}

export function Shockwave({ progressState }: ShockwaveProps) {
  const shockwaveRingRef = useRef<THREE.Mesh>(null)
  const sparkGroupRef = useRef<THREE.Points>(null)

  const sparkCount = 120
  const { pos: positions, col: colors } = useMemo(() => {
    return generateSparks(sparkCount)
  }, [sparkCount])

  useFrame(() => {
    const p = progressState.current ? progressState.current.progress : 0

    if (shockwaveRingRef.current) {
      if (p >= 0.84 && p <= 0.94) {
        const t = (p - 0.84) / 0.1
        shockwaveRingRef.current.visible = true
        const scale = 0.2 + t * 6.5
        shockwaveRingRef.current.scale.set(scale, scale, scale)
        const mat = shockwaveRingRef.current.material as THREE.MeshBasicMaterial
        mat.opacity = Math.max(0, 1 - t)
      } else {
        shockwaveRingRef.current.visible = false
      }
    }

    if (sparkGroupRef.current) {
      if (p >= 0.85 && p <= 0.96) {
        const t = (p - 0.85) / 0.11
        sparkGroupRef.current.visible = true
        const scale = t * 4.5
        sparkGroupRef.current.scale.set(scale, scale, scale)
        const mat = sparkGroupRef.current.material as THREE.PointsMaterial
        mat.opacity = Math.max(0, 1 - t)
      } else {
        sparkGroupRef.current.visible = false
      }
    }
  })

  return (
    <>
      <mesh
        ref={shockwaveRingRef}
        position={[0, 0.8, 0.8]}
        rotation={[-Math.PI / 4, 0, 0]}
        visible={false}
      >
        <torusGeometry args={[1, 0.05, 16, 64]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <points ref={sparkGroupRef} position={[0, 0.8, 0.8]} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}
