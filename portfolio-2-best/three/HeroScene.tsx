"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

function BlenderKatana({ scale = 2.1, edgeIntensity = 1.8 }: { scale?: number; edgeIntensity?: number }) {
  const { scene, animations } = useGLTF("/models/katana.glb");

  const model = useMemo(() => {
    const c = clone(scene);
    const rig = c.getObjectByName("Katana_Rig");
    if (rig) {
      // Neutralize Blender's presentation tilt so the hero rig controls rotation cleanly
      rig.rotation.set(0, 0, 0);
    }

    c.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.frustumCulled = false;

        const enhanceMat = (m: THREE.Material) => {
          const mat = m.clone() as THREE.MeshStandardMaterial;
          if (mat.emissive && (mat.emissive.r > 0.05 || mat.emissive.g > 0.05 || mat.emissive.b > 0.05)) {
            const base = mat.emissiveIntensity && mat.emissiveIntensity > 0 ? mat.emissiveIntensity : 1;
            mat.emissiveIntensity = base * edgeIntensity;
            mat.toneMapped = false;
          }
          return mat;
        };

        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map(enhanceMat);
        } else if (mesh.material) {
          mesh.material = enhanceMat(mesh.material);
        }
      }
    });

    return c;
  }, [scene, edgeIntensity]);

  // Keep Blender's cord sway & root breathe from idle_float without overriding Hero Rig's tilt/spin
  const cordClips = useMemo(() => {
    const idle = animations.find((a) => a.name === "idle_float");
    if (!idle) return [];
    const filtered = idle.clone();
    filtered.tracks = filtered.tracks.filter((t) => !t.name.startsWith("Katana_Rig."));
    return [filtered];
  }, [animations]);

  const { ref, actions } = useAnimations(cordClips);

  useEffect(() => {
    const action = actions["idle_float"];
    if (!action) return;
    action.reset().setLoop(THREE.LoopRepeat, Infinity).play();
    return () => {
      action.stop();
    };
  }, [actions]);

  return (
    <group ref={ref} scale={scale * 1.75}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload("/models/katana.glb");

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
          <Suspense fallback={null}>
            <BlenderKatana scale={2.1} edgeIntensity={2} />
          </Suspense>
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
