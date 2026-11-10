import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const HeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Swarm (Cinematic anime energy dust)
    const particleCount = window.innerWidth < 768 ? 600 : 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const isPaper = themeRef.current === 'paper';
    const primaryColor = new THREE.Color(isPaper ? 0xD6283D : 0xFF304F);
    const secondaryColor = new THREE.Color(isPaper ? 0x2459C4 : 0x397BFF);
    const neutralColor = new THREE.Color(isPaper ? 0x888888 : 0xFFFFFF);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const rand = Math.random();
      const c = rand < 0.25 ? primaryColor : rand < 0.5 ? secondaryColor : neutralColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Floating Cyber Core / Geometric Monoliths
    const group = new THREE.Group();

    // Central wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(4.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: isPaper ? 0xD6283D : 0xFF304F,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    group.add(icosahedron);

    // Inner Octahedron
    const octGeo = new THREE.OctahedronGeometry(2.4, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: isPaper ? 0x2459C4 : 0x397BFF,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    group.add(octahedron);

    // Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(6.2, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isPaper ? 0x333333 : 0xffffff,
      transparent: true,
      opacity: 0.18
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(7.8, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isPaper ? 0xD6283D : 0xFF304F,
      transparent: true,
      opacity: 0.15
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    group.position.set(0, 0, -4);
    scene.add(group);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      mouseX = (event.clientX - halfWidth) / halfWidth;
      mouseY = (event.clientY - halfHeight) / halfHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX * 2.5 - targetX) * 0.04;
      targetY += (-mouseY * 2.0 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, -4);

      // Core rotations
      icosahedron.rotation.x = elapsedTime * 0.12;
      icosahedron.rotation.y = elapsedTime * 0.18;

      octahedron.rotation.x = -elapsedTime * 0.18;
      octahedron.rotation.y = -elapsedTime * 0.22;

      ring1.rotation.z = elapsedTime * 0.1;
      ring2.rotation.x = elapsedTime * 0.08;

      // Particle movement
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.08;

      // React to theme changes dynamically
      const curPaper = themeRef.current === 'paper';
      icoMat.color.set(curPaper ? 0xD6283D : 0xFF304F);
      octMat.color.set(curPaper ? 0x2459C4 : 0x397BFF);
      ringMat1.color.set(curPaper ? 0x555555 : 0xffffff);
      pMaterial.blending = curPaper ? THREE.NormalBlending : THREE.AdditiveBlending;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up Three.js resources
      geometry.dispose();
      pMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  );
};
