"use client";

import { useMemo, useRef, useEffect, Suspense, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Trail, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BloomEffect } from "postprocessing";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { Katana } from "./Katana";
import { mapRange, smoothstep } from "@/lib/utils";

type ProgressRef = MutableRefObject<number>;

const RED = "#E5243B";
const BLUE = "#2F6BFF";
const COLLISION = new THREE.Vector3(0, 1.5, 1.1);

function pulse(p: number, a: number, b: number) {
  return smoothstep(p, a, (a + b) / 2) * (1 - smoothstep(p, (a + b) / 2, b));
}

function Swordsman({ progress, tip }: { progress: ProgressRef; tip: MutableRefObject<THREE.Vector3> }) {
  const { scene, animations } = useGLTF("/models/swordsman.glb");
  const group = useRef<THREE.Group>(null);
  const katanaRef = useRef<THREE.Group>(null);
  const tipMarker = useRef<THREE.Object3D>(null);

  const cloned = useMemo(() => {
    const c = clone(scene);
    c.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({ color: "#0b0c11", roughness: 0.82, metalness: 0.25 });
        mesh.castShadow = true;
        mesh.frustumCulled = false;
      }
    });
    return c;
  }, [scene]);

  const { actions, mixer } = useAnimations(animations, group);

  const setup = useRef(false);
  useFrame((_, delta) => {
    const idle = actions["Idle"];
    const attack = actions["1H_Melee_Attack_Slice_Diagonal"];
    if (!idle || !attack) return;
    if (!setup.current) {
      idle.play();
      attack.play();
      idle.paused = true;
      attack.paused = true;
      attack.setLoop(THREE.LoopOnce, 1);
      attack.clampWhenFinished = true;
      setup.current = true;
    }
    const p = progress.current;
    const attackW = smoothstep(p, 0.22, 0.29) * (1 - smoothstep(p, 0.64, 0.76));
    idle.time = (p * 14) % (idle.getClip().duration || 1);
    idle.setEffectiveWeight(1 - attackW);
    attack.time = mapRange(p, 0.24, 0.6, 0, attack.getClip().duration * 0.96);
    attack.setEffectiveWeight(attackW);
    mixer.update(delta);

    if (tipMarker.current) tipMarker.current.getWorldPosition(tip.current);
    if (group.current) {
      group.current.rotation.y = Math.sin(p * Math.PI * 2) * 0.06 + smoothstep(p, 0.3, 0.5) * 0.25;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <primitive object={cloned} />
      <HandKatana cloned={cloned} katanaRef={katanaRef} tipMarker={tipMarker} progress={progress} />
    </group>
  );
}

function HandKatana({
  cloned,
  katanaRef,
  tipMarker,
  progress,
}: {
  cloned: THREE.Object3D;
  katanaRef: MutableRefObject<THREE.Group | null>;
  tipMarker: MutableRefObject<THREE.Object3D | null>;
  progress: ProgressRef;
}) {
  const slot = useMemo(() => {
    let bone: THREE.Object3D | null = null;
    cloned.traverse((o) => {
      if (o.name === "handslot.r") bone = o;
    });
    return bone as THREE.Object3D | null;
  }, [cloned]);

  useEffect(() => {
    const g = katanaRef.current;
    if (!slot || !g) return;
    slot.add(g);
    return () => {
      slot.remove(g);
    };
  }, [slot, katanaRef]);

  const edgeMat = useRef<THREE.MeshStandardMaterial | null>(null);
  useFrame(() => {
    if (!edgeMat.current && katanaRef.current) {
      const edge = katanaRef.current.getObjectByName("katana-edge") as THREE.Mesh | undefined;
      if (edge) edgeMat.current = edge.material as THREE.MeshStandardMaterial;
    }
    if (edgeMat.current) {
      const p = progress.current;
      edgeMat.current.emissiveIntensity = 0.6 + pulse(p, 0.42, 0.62) * 6 + smoothstep(p, 0.55, 0.85) * 1.5;
    }
  });

  return (
    <group ref={katanaRef} scale={0.9}>
      <Katana edgeColor="#dfe4ff" edgeIntensity={0.6} />
      <object3D ref={tipMarker} position={[0.16, 1.33, 0]} />
    </group>
  );
}

function Orb({
  progress,
  tip,
  color,
  side,
}: {
  progress: ProgressRef;
  tip: MutableRefObject<THREE.Vector3>;
  color: string;
  side: 1 | -1;
}) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = progress.current;
    const born = smoothstep(p, 0.47, 0.52);
    const dead = 1 - smoothstep(p, 0.885, 0.915);
    const s = born * dead;
    g.scale.setScalar(Math.max(s, 0.0001));
    g.visible = s > 0.001;

    if (p < 0.58) {
      const t = smoothstep(p, 0.48, 0.58);
      tmp.copy(tip.current);
      tmp.x += side * t * 3.2;
      tmp.y += t * 0.6;
      tmp.z += t * 1.4;
      g.position.copy(tmp);
    } else if (p < 0.86) {
      const t = (p - 0.58) / 0.28;
      const angle = side * (Math.PI * 0.5 + t * Math.PI * 3.2);
      const radius = 3.2 - t * 2.1;
      g.position.set(
        Math.cos(angle) * radius * side,
        1.3 + Math.sin(t * Math.PI * 2.4) * 0.7,
        Math.sin(angle) * radius + 0.4
      );
    } else {
      const t = smoothstep(p, 0.86, 0.9);
      const angle = side * (Math.PI * 0.5 + Math.PI * 3.2);
      tmp.set(Math.cos(angle) * 1.1 * side, 1.3, Math.sin(angle) * 1.1 + 0.4);
      g.position.lerpVectors(tmp, COLLISION, t);
    }
    if (light.current) light.current.intensity = s * (10 + pulse(p, 0.84, 0.94) * 90);
    if (mesh.current) {
      const mat = mesh.current.material as THREE.MeshBasicMaterial;
      mat.color.set(color);
    }
  });

  return (
    <group ref={group}>
      <Trail width={1.6} length={5} color={color} attenuation={(w) => w * w}>
        <mesh ref={mesh}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </Trail>
      <pointLight ref={light} color={color} intensity={0} distance={9} decay={2} />
    </group>
  );
}

function Shockwave({ progress }: { progress: ProgressRef }) {
  const ring = useRef<THREE.Mesh>(null);
  const sparks = useRef<THREE.Points>(null);
  const dirs = useMemo(() => {
    const arr = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      const v = new THREE.Vector3().randomDirection();
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = Math.abs(v.y) * 0.9;
      arr[i * 3 + 2] = v.z;
    }
    return arr;
  }, []);
  const positions = useMemo(() => new Float32Array(140 * 3), []);

  useFrame(() => {
    const p = progress.current;
    const t = mapRange(p, 0.885, 0.99, 0, 1);
    if (ring.current) {
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      ring.current.scale.setScalar(Math.max(t * 13, 0.0001));
      mat.opacity = (1 - t) * 0.9;
      ring.current.visible = t > 0 && t < 1;
    }
    if (sparks.current) {
      const geo = sparks.current.geometry;
      const spread = t * 5.5;
      for (let i = 0; i < 140; i++) {
        positions[i * 3] = COLLISION.x + dirs[i * 3] * spread;
        positions[i * 3 + 1] = COLLISION.y + dirs[i * 3 + 1] * spread - t * t * 2.2;
        positions[i * 3 + 2] = COLLISION.z + dirs[i * 3 + 2] * spread;
      }
      geo.attributes.position.needsUpdate = true;
      (sparks.current.material as THREE.PointsMaterial).opacity = (1 - t) * (t > 0 ? 1 : 0);
      sparks.current.visible = t > 0 && t < 1;
    }
  });

  return (
    <>
      <mesh ref={ring} position={COLLISION} rotation={[-Math.PI / 2.4, 0, 0]} visible={false}>
        <ringGeometry args={[0.92, 1, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <points ref={sparks} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#ffd9a0" transparent opacity={0} toneMapped={false} sizeAttenuation />
      </points>
    </>
  );
}

function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015;
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8fa8ff" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CameraRig({ progress }: { progress: ProgressRef }) {
  useFrame(({ camera }, delta) => {
    const p = progress.current;
    const push = smoothstep(p, 0, 0.3);
    const orbit = smoothstep(p, 0.26, 0.52) * 0.55 - smoothstep(p, 0.6, 0.85) * 0.3;
    const shake = pulse(p, 0.875, 0.955) * 0.14;
    const z = 8.2 - push * 3.1;
    const targetX = Math.sin(orbit) * z + (Math.random() - 0.5) * shake;
    const targetZ = Math.cos(orbit) * z + (Math.random() - 0.5) * shake;
    const targetY = 1.5 + push * 0.25 + (Math.random() - 0.5) * shake;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 6, delta);
    camera.lookAt(0, 1.15, 0);
  });
  return null;
}

function Lights({ progress }: { progress: ProgressRef }) {
  const red = useRef<THREE.SpotLight>(null);
  const blue = useRef<THREE.SpotLight>(null);
  useFrame(() => {
    const p = progress.current;
    const energy = smoothstep(p, 0.48, 0.7);
    const flash = pulse(p, 0.875, 0.96);
    if (red.current) red.current.intensity = 30 + energy * 160 + flash * 500;
    if (blue.current) blue.current.intensity = 30 + energy * 160 + flash * 500;
  });
  return (
    <>
      <ambientLight intensity={0.12} />
      <spotLight ref={red} position={[-6, 3.5, 2.5]} angle={0.5} penumbra={1} color={RED} intensity={30} distance={20} />
      <spotLight ref={blue} position={[6, 3.5, 2.5]} angle={0.5} penumbra={1} color={BLUE} intensity={30} distance={20} />
      <directionalLight position={[0, 5, -6]} intensity={2.2} color="#aebbff" />
      <directionalLight position={[0, 8, 3]} intensity={0.35} color="#ffffff" />
    </>
  );
}

function Post({ progress, mobile }: { progress: ProgressRef; mobile: boolean }) {
  const bloom = useRef<BloomEffect>(null);
  useFrame(() => {
    if (bloom.current) {
      const p = progress.current;
      bloom.current.intensity = 0.7 + smoothstep(p, 0.5, 0.85) * 0.9 + pulse(p, 0.875, 0.97) * 5.5;
    }
  });
  return (
    <EffectComposer multisampling={0}>
      <Bloom ref={bloom} mipmapBlur intensity={0.7} luminanceThreshold={0.55} luminanceSmoothing={0.2} radius={0.75} />
      {mobile ? (
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      ) : (
        <>
          <ChromaticAberration offset={new THREE.Vector2(0.0009, 0.0009)} radialModulation modulationOffset={0.4} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </>
      )}
    </EffectComposer>
  );
}

export default function SwordsmanScene({ progress, mobile }: { progress: ProgressRef; mobile: boolean }) {
  const tip = useRef(new THREE.Vector3(0, 1.5, 0));
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 1.6, 8.2], fov: 40 }}
      gl={{ antialias: !mobile, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <color attach="background" args={["#05060a"]} />
      <fogExp2 attach="fog" args={["#05060a", 0.038]} />
      <Lights progress={progress} />
      <Suspense fallback={null}>
        <Swordsman progress={progress} tip={tip} />
      </Suspense>
      <Orb progress={progress} tip={tip} color={RED} side={-1} />
      <Orb progress={progress} tip={tip} color={BLUE} side={1} />
      <Shockwave progress={progress} />
      <Dust count={mobile ? 90 : 260} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        {mobile ? (
          <meshStandardMaterial color="#07080d" roughness={0.4} metalness={0.7} />
        ) : (
          <MeshReflectorMaterial
            blur={[220, 80]}
            resolution={512}
            mixBlur={0.9}
            mixStrength={2.2}
            roughness={0.85}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#07080d"
            metalness={0.55}
            mirror={0.55}
          />
        )}
      </mesh>
      <CameraRig progress={progress} />
      <Post progress={progress} mobile={mobile} />
    </Canvas>
  );
}

useGLTF.preload("/models/swordsman.glb");