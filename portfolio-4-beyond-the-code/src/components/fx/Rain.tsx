import { useEffect, useRef } from 'react'

export default function Rain({ density = 70, className = '' }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const drops = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: 0.02 + Math.random() * 0.045,
      speed: 0.012 + Math.random() * 0.02,
      alpha: 0.04 + Math.random() * 0.1,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      for (const d of drops) {
        ctx.strokeStyle = `rgba(170, 195, 255, ${d.alpha})`
        const x = d.x * w
        const y = d.y * h
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x - d.len * w * 0.12, y + d.len * h)
        ctx.stroke()
        d.y += d.speed
        d.x -= d.speed * 0.12
        if (d.y > 1.05) {
          d.y = -0.06
          d.x = Math.random() * 1.1
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [density])

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />
}