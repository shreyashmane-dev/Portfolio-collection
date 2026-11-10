"use client"

import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticlesProps {
  count?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function generateParticlePositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 12
    pos[i * 3 + 1] = pseudoRandom(i * 3 + 2) * 5 - 0.5
    pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 10
  }
  return pos
}

export function Particles({ count = 200 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    return generateParticlePositions(count)
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      // Gentle drift upward and undulating
      pos[i * 3 + 1] += delta * 0.12
      pos[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002

      // Reset when floating too high
      if (pos[i * 3 + 1] > 4.5) {
        pos[i * 3 + 1] = -0.5
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8B8E98"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
