"use client"

import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { HeroKatana } from "./HeroKatana"
import { Float } from "@react-three/drei"

export function HeroScene() {
  return (
    <div className="w-full h-full relative" data-cursor="crosshair">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="pointer-events-auto"
      >
        <ambientLight intensity={0.4} />

        {/* Rim light BLUE from left */}
        <pointLight
          position={[-4, 2, 2]}
          color="#2F6BFF"
          intensity={8}
          distance={10}
        />

        {/* Rim light RED from right */}
        <pointLight
          position={[4, -1, 2]}
          color="#E5243B"
          intensity={8}
          distance={10}
        />

        {/* Top cool key light */}
        <directionalLight
          position={[0, 5, 3]}
          color="#FFFFFF"
          intensity={1.2}
        />

        <Suspense fallback={null}>
          <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.3}
            floatingRange={[-0.1, 0.1]}
          >
            <HeroKatana />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}
