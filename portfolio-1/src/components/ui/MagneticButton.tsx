"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "red" | "outline"
  children: React.ReactNode
  className?: string
  asLink?: boolean
  href?: string
  target?: string
  rel?: string
}

export function MagneticButton({
  variant = "blue",
  children,
  className = "",
  asLink = false,
  href = "#",
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return

    // Disable magnetic physics on touch
    if (window.matchMedia("(pointer: coarse)").matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)

      if (dist < 80) {
        const deltaX = (e.clientX - centerX) * 0.35
        const deltaY = (e.clientY - centerY) * 0.35
        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        })
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto"
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const baseStyles =
    "relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider font-semibold px-6 py-3.5 transition-all duration-300 group overflow-hidden select-none"

  const variantStyles = {
    blue: "bg-[var(--blue)] text-white hover:bg-[var(--blue-hover)] clip-notch-tl",
    red: "bg-[var(--red)] text-white hover:bg-[var(--red-hover)] clip-notch-br",
    outline:
      "border border-[var(--line)] bg-transparent text-[var(--ink)] hover:text-white clip-notch-tl before:absolute before:inset-0 before:bg-[var(--blue)] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300 before:ease-out"
  }

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  )

  if (asLink) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  )
}
