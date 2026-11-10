"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState<string>("")
  const [isCrosshair, setIsCrosshair] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    setIsVisible(true)

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      gsap.set(dot, { x: mouse.x, y: mouse.y })
    }

    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.18
      pos.y += (mouse.y - pos.y) * 0.18
      gsap.set(ring, { x: pos.x, y: pos.y })
    }

    gsap.ticker.add(ticker)
    window.addEventListener("mousemove", onMouseMove)

    // Handle interactive hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const projectCard = target.closest("[data-cursor='view']")
      const canvas3D = target.closest("canvas, [data-cursor='crosshair']")
      const link = target.closest("a, button, [role='button'], input, textarea, select")

      if (projectCard) {
        setCursorText("VIEW")
        setIsCrosshair(false)
        setIsExpanded(true)
      } else if (canvas3D) {
        setCursorText("")
        setIsCrosshair(true)
        setIsExpanded(false)
      } else if (link) {
        setCursorText("")
        setIsCrosshair(false)
        setIsExpanded(true)
      } else {
        setCursorText("")
        setIsCrosshair(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      gsap.ticker.remove(ticker)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--red)] mix-blend-difference pointer-events-none"
      />

      {/* Outer morphing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border border-[var(--ink)] flex items-center justify-center transition-all duration-200 pointer-events-none mix-blend-difference ${
          isCrosshair
            ? "w-8 h-8 rounded-none border-dashed border-[var(--blue)] -ml-4 -mt-4 rotate-45"
            : isExpanded
            ? cursorText
              ? "w-16 h-16 -ml-8 -mt-8 bg-[var(--red)] text-white font-mono text-[10px] tracking-widest font-bold border-none"
              : "w-12 h-12 -ml-6 -mt-6 border-[var(--blue)] bg-[var(--blue)]/10"
            : "w-8 h-8 opacity-70"
        }`}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  )
}
