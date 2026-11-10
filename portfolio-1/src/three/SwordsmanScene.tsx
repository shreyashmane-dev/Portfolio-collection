/* eslint-disable react-hooks/immutability */
"use client"

import React, { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { SwordsmanSilhouette } from "./SwordsmanSilhouette"
import { Orbs } from "./Orbs"
import { Shockwave } from "./Shockwave"
import { Particles } from "./Particles"
import * as THREE from "three"
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

interface SwordsmanSceneProps {
  progressState: React.RefObject<{ progress: number }> | { current: { progress: number } }
  enablePostprocessing?: boolean
}

function CameraRig({ progressState }: { progressState: React.RefObject<{ progress: number }> | { current: { progress: number } } }) {
  const { camera } = useThree()
  const shakeRef = useRef({ x: 0, y: 0 })

  useFrame(() => {
    const p = progressState.current ? progressState.current.progress : 0

    // Camera dolly push-in (6m to 4m)
    const dist = THREE.MathUtils.lerp(6.0, 3.8, Math.min(1, p * 2))

    // Gentle orbit angle around figure
    const orbitAngle = -0.3 + p * 0.45

    const targetX = Math.sin(orbitAngle) * dist
    const targetZ = Math.cos(orbitAngle) * dist
    const targetY = 0.8 + Math.sin(p * Math.PI) * 0.4

    // FOV punch at slash apex (0.40 - 0.46)
    if (p >= 0.38 && p <= 0.48) {
      const punchT = Math.sin(((p - 0.38) / 0.1) * Math.PI)
      const perspCam = camera as THREE.PerspectiveCamera
      perspCam.fov = THREE.MathUtils.lerp(50, 42, punchT)
      perspCam.updateProjectionMatrix()
    }

    // Screen shake at collision (0.84 - 0.90)
    let shakeOffset = 0
    if (p >= 0.84 && p <= 0.90) {
      const shakeT = 1 - (p - 0.84) / 0.06
      shakeOffset = (Math.random() - 0.5) * 0.18 * shakeT
      shakeRef.current.x = shakeOffset
      shakeRef.current.y = (Math.random() - 0.5) * 0.18 * shakeT
    } else {
      shakeRef.current.x = 0
      shakeRef.current.y = 0
    }

    camera.position.x = targetX + shakeRef.current.x
    camera.position.y = targetY + shakeRef.current.y
    camera.position.z = targetZ

    camera.lookAt(0, 0.7, 0)
  })

  return null
}

export function SwordsmanScene({
  progressState,
  enablePostprocessing = true
}: SwordsmanSceneProps) {
  return (
    <div className="w-full h-full relative bg-[#050608]" data-cursor="crosshair">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#050608"]} />
        <fogExp2 attach="fog" args={["#050608", 0.08]} />

        {/* Ambient base lighting */}
        <ambientLight intensity={0.12} />

        {/* Cool white rim back light for silhouette definition */}
        <directionalLight
          position={[0, 4, -4]}
          color="#B8C4D8"
          intensity={3.5}
        />

        {/* Dynamic RED spotlight/point from left */}
        <pointLight
          position={[-3.5, 2.5, 1]}
          color="#E5243B"
          intensity={6.0}
          distance={10}
        />

        {/* Dynamic BLUE spotlight/point from right */}
        <pointLight
          position={[3.5, 2.5, 1]}
          color="#2F6BFF"
          intensity={6.0}
          distance={10}
        />

        {/* Reflective Ground Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial
            color="#040507"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        <CameraRig progressState={progressState} />
        <SwordsmanSilhouette progressState={progressState} />
        <Orbs progressState={progressState} />
        <Shockwave progressState={progressState} />
        <Particles count={250} />

        {/* Postprocessing Bloom, Vignette, ChromaticAberration */}
        {enablePostprocessing && (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.55}
              luminanceSmoothing={0.3}
              intensity={1.2}
            />
            <Vignette
              offset={0.35}
              darkness={0.8}
              blendFunction={BlendFunction.NORMAL}
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.002, 0.002)}
              radialModulation={false}
              modulationOffset={0.15}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
