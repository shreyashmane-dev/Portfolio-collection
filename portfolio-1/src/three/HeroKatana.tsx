"use client"

import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function HeroKatana() {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0.1, y: 0.2 })

  // Build high-detail procedural katana geometries
  const { bladeGeo, habakiGeo, tsubaGeo, handleGeo, pommelGeo } = useMemo(() => {
    // 1. Blade: slightly curved long sword
    const bladeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0.04, -0.6, 0),
      new THREE.Vector3(0.12, 0.8, 0),
      new THREE.Vector3(0.24, 2.2, 0),
      new THREE.Vector3(0.32, 2.8, 0)
    ])

    // Blade cross-section (rhombic diamond/katana kissaki profile)
    const bladeShape = new THREE.Shape()
    bladeShape.moveTo(0, -0.015)
    bladeShape.lineTo(0.05, 0)
    bladeShape.lineTo(0, 0.015)
    bladeShape.lineTo(-0.015, 0)
    bladeShape.closePath()

    const bladeGeometry = new THREE.ExtrudeGeometry(bladeShape, {
      steps: 40,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.005,
      bevelThickness: 0.005,
      extrudePath: bladeCurve
    })

    // 2. Habaki (collar below blade)
    const habakiGeometry = new THREE.BoxGeometry(0.12, 0.22, 0.06)

    // 3. Tsuba (guard: oval with cutouts)
    const tsubaGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 32)
    tsubaGeometry.scale(1, 1, 0.75) // Oval shape

    // 4. Handle (Tsuka)
    const handleGeometry = new THREE.CylinderGeometry(0.065, 0.08, 1.3, 16)
    handleGeometry.scale(1, 1, 0.65)

    // 5. Pommel (Kashira)
    const pommelGeometry = new THREE.CylinderGeometry(0.085, 0.075, 0.12, 16)
    pommelGeometry.scale(1, 1, 0.65)

    return {
      bladeGeo: bladeGeometry,
      habakiGeo: habakiGeometry,
      tsubaGeo: tsubaGeometry,
      handleGeo: handleGeometry,
      pommelGeo: pommelGeometry
    }
  }, [])

  // Materials
  const bladeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E2E8F0"),
        metalness: 0.95,
        roughness: 0.18,
        envMapIntensity: 1.5
      }),
    []
  )

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D4AF37"),
        metalness: 0.85,
        roughness: 0.3
      }),
    []
  )

  const ironMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111317"),
        metalness: 0.8,
        roughness: 0.4
      }),
    []
  )

  const handleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1A1A1E"),
        roughness: 0.8,
        metalness: 0.1
      }),
    []
  )

  // Floating animation and mouse tracking with lerp
  useFrame((state) => {
    if (!groupRef.current) return

    // Pointer parallax (damped max 12 deg = ~0.2 rad)
    const pointerX = state.pointer.x * 0.2
    const pointerY = state.pointer.y * 0.2

    targetRotation.current.y = pointerX + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    targetRotation.current.x = -pointerY + Math.cos(state.clock.elapsedTime * 0.4) * 0.08

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.08
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.08
    )

    // Gentle floating bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08
  })

  return (
    <group ref={groupRef} rotation={[0.2, 0.4, -0.35]} position={[0.2, 0, 0]}>
      {/* Blade */}
      <mesh geometry={bladeGeo} material={bladeMaterial} castShadow receiveShadow />

      {/* Habaki */}
      <mesh
        geometry={habakiGeo}
        material={goldMaterial}
        position={[0, -1.8, 0]}
        castShadow
      />

      {/* Tsuba guard */}
      <mesh
        geometry={tsubaGeo}
        material={ironMaterial}
        position={[0, -1.92, 0]}
        castShadow
      />

      {/* Handle (Tsuka) */}
      <mesh
        geometry={handleGeo}
        material={handleMaterial}
        position={[0, -2.6, 0]}
        castShadow
      />

      {/* Pommel (Kashira) */}
      <mesh
        geometry={pommelGeo}
        material={ironMaterial}
        position={[0, -3.28, 0]}
        castShadow
      />

      {/* Red accent ribbon / sageo cord */}
      <mesh position={[0.02, -2.1, 0.08]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.04, 0.4, 0.02]} />
        <meshStandardMaterial color="#E5243B" roughness={0.6} />
      </mesh>
    </group>
  )
}
