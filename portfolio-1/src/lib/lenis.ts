import Lenis from "lenis"
import { gsap, ScrollTrigger } from "./gsap"

let lenisInstance: Lenis | null = null

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null
  if (lenisInstance) return lenisInstance

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (isReducedMotion) return null

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    touchMultiplier: 1.5
  })

  lenis.on("scroll", ScrollTrigger.update)

  const updateTicker = (time: number) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(updateTicker)
  gsap.ticker.lagSmoothing(0)

  lenisInstance = lenis
  return lenis
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}
