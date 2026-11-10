import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced || !dot.current || !ring.current) return

    document.body.classList.add('world-cursor')
    const d = dot.current
    const r = ring.current
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 })
    const dx = gsap.quickTo(d, 'x', { duration: 0.08, ease: 'power2.out' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.08, ease: 'power2.out' })
    const rx = gsap.quickTo(r, 'x', { duration: 0.35, ease: 'power3.out' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.35, ease: 'power3.out' })

    const move = (e: MouseEvent) => {
      gsap.to([d, r], { opacity: 1, duration: 0.3, overwrite: 'auto' })
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, [data-cursor]')
      gsap.to(r, {
        scale: t ? 2.1 : 1,
        borderColor: t ? 'var(--red)' : 'var(--ink2)',
        duration: 0.3,
      })
      gsap.to(d, { scale: t ? 0.5 : 1, duration: 0.3 })
    }
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.3 })

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      document.body.classList.remove('world-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-red"
        style={{ opacity: 0 }}
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-ink2"
        style={{ opacity: 0 }}
      />
    </div>
  )
}