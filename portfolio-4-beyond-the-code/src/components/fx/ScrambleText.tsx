import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Half-width katakana: reads as a Japanese transmission decoding into English
// without the full-width glyphs blowing out heading layout mid-scramble.
const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ01<>/#*+'

export default function ScrambleText({
  text,
  className = '',
  duration = 900,
  delay = 0,
}: {
  text: string
  className?: string
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, margin: '-10% 0px' })
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }
    let frame = 0
    let raf = 0
    let start = 0
    const total = Math.max(1, Math.round(duration / 16))
    const tick = (t: number) => {
      if (!start) start = t
      const elapsed = t - start - delay
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      frame++
      const progress = Math.min(1, frame / total)
      const settled = Math.floor(progress * text.length)
      let out = text.slice(0, settled)
      for (let i = settled; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setDisplay(out)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text, duration, delay])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  )
}