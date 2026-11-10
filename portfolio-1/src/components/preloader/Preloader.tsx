"use client"

import React, { useEffect, useState, useRef } from "react"
import { gsap } from "@/lib/gsap"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("INITIALIZING CORE")
  const containerRef = useRef<HTMLDivElement>(null)
  const topHalfRef = useRef<HTMLDivElement>(null)
  const bottomHalfRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const slashLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check session storage or reduced motion
    const hasVisited = sessionStorage.getItem("has-visited-portfolio")
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (hasVisited || prefersReduced) {
      onComplete()
      return
    }

    const startTime = Date.now()
    const minDuration = 1200 // minimum 1.2s

    // Real progress simulation tracking fonts and assets
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const simulated = Math.min(100, Math.floor((elapsed / minDuration) * 100))

      if (simulated < 30) {
        setStatusText("INITIALIZING RUNTIME")
      } else if (simulated < 65) {
        setStatusText("LOADING 3D ASSETS")
      } else if (simulated < 90) {
        setStatusText("COMPOSING SCENERY")
      } else {
        setStatusText("SYSTEM READY")
      }

      setProgress(simulated)

      if (simulated >= 100) {
        clearInterval(interval)
        triggerExit()
      }
    }, 40)

    const triggerExit = () => {
      sessionStorage.setItem("has-visited-portfolio", "true")

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
        }
      })

      // Slash cut and slide apart
      tl.to(slashLineRef.current, {
        scaleX: 1,
        duration: 0.25,
        ease: "power4.in"
      })
      .to(flashRef.current, {
        opacity: 1,
        duration: 0.12,
        ease: "power1.inOut"
      })
      .to(flashRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out"
      }, "+=0.05")
      .to(topHalfRef.current, {
        xPercent: -100,
        yPercent: -20,
        duration: 0.7,
        ease: "power4.inOut"
      }, "<")
      .to(bottomHalfRef.current, {
        xPercent: 100,
        yPercent: 20,
        duration: 0.7,
        ease: "power4.inOut"
      }, "<")
    }

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] overflow-hidden bg-black select-none pointer-events-auto"
      aria-label="Loading site assets"
    >
      {/* Flash frame */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-50 bg-white pointer-events-none opacity-0"
      />

      {/* Slash cut beam */}
      <div
        ref={slashLineRef}
        className="absolute top-1/2 left-0 w-full h-[3px] bg-white -translate-y-1/2 rotate-[-18deg] origin-left scale-x-0 z-40 shadow-[0_0_20px_#2F6BFF,0_0_35px_#E5243B]"
      />

      {/* Top half for diagonal split */}
      <div
        ref={topHalfRef}
        className="absolute inset-0 bg-[#07080B] flex flex-col justify-end p-8 md:p-16"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(50% + 8vw), 0 calc(50% - 8vw))"
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 text-[var(--red)] font-mono text-xs uppercase tracking-widest mb-2">
            <span className="w-2 h-2 bg-[var(--red)] animate-ping" />
            <span>SYS_BOOT // {statusText}</span>
          </div>
          <div className="text-white font-display text-[18vw] leading-none tracking-tight">
            {progress.toString().padStart(3, "0")}
            <span className="text-2xl md:text-5xl font-mono text-[var(--ink-dim)] ml-2">%</span>
          </div>
        </div>
      </div>

      {/* Bottom half for diagonal split */}
      <div
        ref={bottomHalfRef}
        className="absolute inset-0 bg-[#07080B] flex flex-col justify-start p-8 md:p-16"
        style={{
          clipPath: "polygon(0 calc(50% - 8vw), 100% calc(50% + 8vw), 100% 100%, 0 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto w-full pt-12 md:pt-24 border-t border-[var(--line)] flex justify-between items-center text-xs font-mono text-[var(--ink-dim)]">
          <div>SHREYASH MANE // PORTFOLIO 2026</div>
          <div className="text-[var(--blue)]">AI // FULL-STACK // IOT</div>
        </div>
      </div>
    </div>
  )
}
