export interface GpuTier {
  isMobile: boolean
  dpr: number
  particleCountMultiplier: number
  enablePostprocessing: boolean
}

export function getGpuTier(): GpuTier {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      dpr: 1.5,
      particleCountMultiplier: 1.0,
      enablePostprocessing: true
    }
  }

  const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return {
    isMobile,
    dpr: isMobile ? 1.25 : Math.min(window.devicePixelRatio || 1, 2),
    particleCountMultiplier: isMobile ? 0.4 : 1.0,
    enablePostprocessing: !isMobile && !isReducedMotion
  }
}
