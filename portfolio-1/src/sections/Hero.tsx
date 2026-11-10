"use client"

import React, { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { gsap } from "@/lib/gsap"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ArrowDown, Code2, Sparkles, Terminal } from "lucide-react"

// Dynamically import Three.js scene
const HeroScene = dynamic(
  () => import("@/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const name1Ref = useRef<HTMLHeadingElement>(null)
  const name2Ref = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const speedlinesRef = useRef<HTMLDivElement>(null)
  const katanaWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Per-character split or span reveal
      const name1Chars = name1Ref.current?.querySelectorAll(".char")
      const name2Chars = name2Ref.current?.querySelectorAll(".char")

      const tl = gsap.timeline({ delay: 0.2 })

      // Speedlines initial burst
      if (speedlinesRef.current) {
        tl.fromTo(
          speedlinesRef.current,
          { scale: 0.2, opacity: 0.9, rotate: -15 },
          { scale: 1, opacity: 0.25, rotate: 0, duration: 0.9, ease: "power4.out" }
        )
      }

      // Name characters reveal
      if (name1Chars && name2Chars) {
        tl.fromTo(
          [...Array.from(name1Chars), ...Array.from(name2Chars)],
          { yPercent: 120, rotate: 6, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            stagger: 0.035,
            duration: 0.85,
            ease: "power4.out"
          },
          "-=0.6"
        )
      }

      // Role and CTA entrance
      if (roleRef.current) {
        tl.fromTo(
          roleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
      }

      // Katana 3D on scroll parallax scale out
      if (containerRef.current && katanaWrapperRef.current) {
        gsap.to(katanaWrapperRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          },
          yPercent: 30,
          scale: 0.85,
          opacity: 0.3
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const splitTextIntoSpans = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block will-change-transform"
      >
        {char}
      </span>
    ))
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero section"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 3vw), 0 100%)"
      }}
    >
      {/* Background Halftone & Manga Speedlines Burst */}
      <div className="absolute inset-0 bg-halftone pointer-events-none opacity-40" />

      <div
        ref={speedlinesRef}
        aria-hidden="true"
        className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vw] speed-lines pointer-events-none opacity-20"
      />

      {/* Off-grid technical annotations */}
      <div className="absolute top-28 right-8 hidden lg:flex flex-col items-end gap-1 font-mono text-[10px] text-[var(--ink-dim)] tracking-widest pointer-events-none">
        <span className="text-[var(--red)] font-bold">{"// SEC_01 // HERO"}</span>
        <span>LAT: 16.7050 DEG N, 74.2433 DEG E</span>
        <span>PORTFOLIO SYSTEM // VER 2.0</span>
      </div>

      {/* Main Hero grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left Column: Stacked Oversized Typography */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Micro status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-tl w-fit font-mono text-xs text-[var(--ink-dim)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
            <span className="text-[var(--ink)]">CS & ENGINEERING</span>
            <span className="text-[var(--line)]">|</span>
            <span>SHIVAJI UNIVERSITY</span>
          </div>

          {/* Giant Stacked Name */}
          <div className="overflow-hidden leading-none select-none">
            <h1
              ref={name1Ref}
              className="font-display text-[18vw] lg:text-[14vw] tracking-tighter text-[var(--ink)] -ml-1 md:-ml-2 leading-[0.85] uppercase"
            >
              {splitTextIntoSpans("SHREYASH")}
            </h1>
          </div>

          <div className="overflow-hidden leading-none select-none -mt-2 md:-mt-6">
            <h2
              ref={name2Ref}
              className="font-display text-[18vw] lg:text-[14vw] tracking-tighter text-[var(--ink-dim)] -ml-1 md:-ml-2 leading-[0.85] uppercase"
            >
              {splitTextIntoSpans("MANE")}
            </h2>
          </div>

          {/* Role Line & Core Focus */}
          <p
            ref={roleRef}
            className="mt-6 max-w-2xl font-mono text-sm md:text-base text-[var(--ink)] leading-relaxed flex items-center gap-2"
          >
            <span className="text-[var(--blue)] font-bold">&gt;</span>
            <span>
              Computer Science and Engineering student. AI products, IoT hardware, and full-stack software architectures.
            </span>
          </p>

          {/* Primary CTA Buttons */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton variant="blue" asLink href="#featured">
              <Sparkles size={14} />
              View Episodes
            </MagneticButton>

            <MagneticButton variant="outline" asLink href="#contact">
              <Terminal size={14} />
              Contact Direct
            </MagneticButton>

            <a
              href="https://github.com/shreyashmane-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[var(--ink-dim)] hover:text-[var(--ink)] flex items-center gap-1.5 transition-colors"
            >
              <Code2 size={14} />
              GitHub Profile
            </a>
          </div>
        </div>

        {/* Right Column: 3D Katana Canvas (Floating, rim-lit) */}
        <div
          ref={katanaWrapperRef}
          className="lg:col-span-4 h-[350px] lg:h-[580px] w-full relative flex items-center justify-center"
        >
          {/* Halftone circular badge backdrop */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-[var(--line)] bg-halftone opacity-60 pointer-events-none" />

          {/* Technical circular crosshair rings */}
          <div className="absolute w-72 h-72 rounded-full border border-dashed border-[var(--line)] pointer-events-none animate-spin-slow opacity-30" />

          <HeroScene />
        </div>
      </div>

      {/* Bottom bar with Scroll cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-[var(--line)]">
        <div className="flex items-center gap-6 font-mono text-xs text-[var(--ink-dim)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[var(--blue)]" />
            <span>EST. 2026</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[var(--red)]" />
            <span>KOLHAPUR, MAHARASHTRA</span>
          </div>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 font-mono text-xs text-[var(--ink-dim)] hover:text-[var(--red)] transition-colors group"
        >
          <span className="tracking-widest">SCROLL</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
