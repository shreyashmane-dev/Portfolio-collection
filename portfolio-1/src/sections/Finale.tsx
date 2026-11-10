"use client"

import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { gsap } from "@/lib/gsap"
import { getGpuTier } from "@/lib/detectGpu"
import { FastForward } from "lucide-react"

// Dynamically import SwordsmanScene with ssr: false
const SwordsmanScene = dynamic(
  () => import("@/three/SwordsmanScene").then((mod) => mod.SwordsmanScene),
  { ssr: false }
)

export function Finale() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const flashOverlayRef = useRef<HTMLDivElement>(null)
  const wipeCoverRef = useRef<HTMLDivElement>(null)

  // Shared mutable progress state (read by useFrame at 60fps without triggering React renders)
  const progressState = useRef({ progress: 0 })
  const [mounted, setMounted] = useState(false)
  const [isReduced] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })
  const [gpuSettings] = useState(() => {
    const tier = getGpuTier()
    return {
      enablePostprocessing: tier.enablePostprocessing,
      isMobile: tier.isMobile
    }
  })

  useEffect(() => {
    if (isReduced) return

    const tier = getGpuTier()

    // IntersectionObserver gating: mount canvas when near ~1.5 viewports
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMounted(true)
          }
        })
      },
      { rootMargin: "600px 0px" }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinWrapperRef.current) return

      const pinHeight = tier.isMobile ? "+=300%" : "+=500%"

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinWrapperRef.current,
          start: "top top",
          end: pinHeight,
          scrub: 1,
          onUpdate: (self) => {
            progressState.current.progress = self.progress
          }
        }
      })

      // 0.00 - 0.15: Silence, caption fades in then out
      if (captionRef.current) {
        tl.fromTo(
          captionRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power1.out" },
          0.02
        ).to(
          captionRef.current,
          { opacity: 0, y: -10, duration: 0.06, ease: "power1.in" },
          0.14
        )
      }

      // 0.75 - 0.88: Collision flash overlay
      if (flashOverlayRef.current) {
        tl.fromTo(
          flashOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.04, ease: "power4.in" },
          0.84
        ).to(
          flashOverlayRef.current,
          { opacity: 0.3, duration: 0.06, ease: "power2.out" },
          0.88
        )
      }

      // 0.88 - 1.00: Wipe to contact
      if (wipeCoverRef.current) {
        tl.fromTo(
          wipeCoverRef.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.12,
            ease: "none"
          },
          0.88
        )
      }
    }, containerRef)

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [isReduced])

  const handleSkip = () => {
    const contactEl = document.getElementById("contact")
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Fallback for reduced motion
  if (isReduced) {
    return (
      <section
        id="finale"
        aria-label="The Swordsman Finale"
        className="relative w-full h-[60vh] bg-[#050608] flex items-center justify-center p-8 border-b border-[var(--line)]"
      >
        <div className="text-center space-y-4">
          <div className="font-mono text-xs text-[var(--red)] uppercase tracking-widest">
            FINALE // THE SWORDSMAN
          </div>
          <h2 className="font-display text-4xl text-white">THE CONVERGENCE</h2>
          <p className="font-mono text-xs text-[var(--ink-dim)] max-w-md mx-auto">
            Static visualization engaged under system reduced-motion preference.
          </p>
          <button
            onClick={handleSkip}
            className="px-4 py-2 bg-[var(--blue)] text-white font-mono text-xs clip-notch-tl"
          >
            Advance to Contact
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      id="finale"
      aria-label="The Swordsman Interactive Scroll Experience"
      className="relative w-full bg-[#050608] text-white"
    >
      <div
        ref={pinWrapperRef}
        className="h-screen w-full relative overflow-hidden flex items-center justify-center"
      >
        {/* Full-screen 3D Scene */}
        {mounted && (
          <div className="absolute inset-0 z-10">
            <SwordsmanScene
              progressState={progressState}
              enablePostprocessing={gpuSettings.enablePostprocessing}
            />
          </div>
        )}

        {/* Ambient HUD and Technical Meta */}
        <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-[var(--ink-dim)] pointer-events-none flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse" />
          <span>ACT III // THE CONVERGENCE</span>
          <span className="hidden md:inline text-[var(--line)]">|</span>
          <span className="hidden md:inline">500VH MASTER SCRUB</span>
        </div>

        {/* Skip Button for Accessibility */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-30 px-3 py-1.5 bg-[#0A0D14]/80 border border-[var(--line)] hover:border-[var(--blue)] font-mono text-[10px] text-white uppercase tracking-wider flex items-center gap-1.5 clip-notch-tl transition-colors focus:outline-none focus:border-[var(--blue)]"
          aria-label="Skip Swordsman finale sequence and proceed to contact"
        >
          <FastForward size={12} />
          <span>SKIP FINALE</span>
        </button>

        {/* Story Mono Caption at 0.00-0.15 */}
        <div
          ref={captionRef}
          className="absolute bottom-20 z-20 text-center font-mono text-xs md:text-sm tracking-widest text-zinc-400 pointer-events-none uppercase"
        >
          <span className="text-[var(--red)] font-bold">{"// "}</span>
          The last panel.
        </div>

        {/* Impact White Flash Frame */}
        <div
          ref={flashOverlayRef}
          aria-hidden="true"
          className="absolute inset-0 z-40 bg-white pointer-events-none opacity-0"
        />

        {/* Diagonal wipe cover transitioning to contact */}
        <div
          ref={wipeCoverRef}
          aria-hidden="true"
          className="absolute inset-0 z-50 bg-[var(--bg)] pointer-events-none"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
          }}
        />
      </div>
    </section>
  )
}
