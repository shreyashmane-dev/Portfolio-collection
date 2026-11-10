import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useWorld } from '../store/useWorld'

function Particles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 650
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = -Math.random() * 14
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012
      ref.current.position.y = Math.sin(performance.now() * 0.00012) * 0.4
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={color} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  )
}

const SHARDS: { pos: [number, number, number]; scale: number; color: string; speed: number }[] = [
  { pos: [5.4, 2.2, -3], scale: 0.9, color: '#397BFF', speed: 1.1 },
  { pos: [7.2, -0.6, -5], scale: 1.4, color: '#FF304F', speed: 0.8 },
  { pos: [3.2, 3.4, -6], scale: 0.7, color: '#397BFF', speed: 1.4 },
  { pos: [-6.4, 2.8, -7], scale: 1.1, color: '#FF304F', speed: 0.9 },
  { pos: [-4.8, -1.8, -5], scale: 0.6, color: '#397BFF', speed: 1.2 },
  { pos: [1.4, -2.6, -4], scale: 0.5, color: '#FF304F', speed: 1.5 },
]

function Shards() {
  return (
    <>
      {SHARDS.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.7} floatIntensity={1.4}>
          <mesh position={s.pos} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={s.color} wireframe transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function CameraRig() {
  const target = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  useFrame(({ camera }, delta) => {
    const k = Math.min(1, delta * 2.2)
    camera.position.x += (target.current.x * 0.9 - camera.position.x) * k
    camera.position.y += (-target.current.y * 0.5 - camera.position.y) * k
    camera.lookAt(0, 0, -2)
  })
  return null
}

export default function HeroScene() {
  const theme = useWorld((s) => s.theme)
  const dark = theme === 'void'
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 55, position: [0, 0, 11] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <fog attach="fog" args={[dark ? '#08090C' : '#F5F3EF', 10, 26]} />
      <Particles color={dark ? '#9FB4E8' : '#2459C4'} />
      <Shards />
      <CameraRig />
    </Canvas>
  )
}