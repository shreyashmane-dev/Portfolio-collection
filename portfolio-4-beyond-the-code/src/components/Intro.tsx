import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useWorld } from '../store/useWorld'
import ScrambleText from './fx/ScrambleText'
import { blip } from '../lib/audio'

export default function Intro() {
  const finishIntro = useWorld((s) => s.finishIntro)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'boot' | 'load' | 'online'>('boot')
  const done = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try {
      seen = sessionStorage.getItem('shreyash-intro-seen') === '1'
    } catch { /* ignore */ }
    if (reduced || seen) {
      finishIntro()
      return
    }
    const DURATION = 2300
    let raf = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const p = Math.min(100, ((t - start) / DURATION) * 100)
      setProgress(p)
      if (p > 12 && p < 100) setPhase('load')
      if (p >= 100) {
        setPhase('online')
        if (!done.current) {
          done.current = true
          blip('transition')
          window.setTimeout(() => {
            try { sessionStorage.setItem('shreyash-intro-seen', '1') } catch { /* ignore */ }
            finishIntro()
          }, 650)
        }
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [finishIntro])

  const skip = () => {
    if (done.current) return
    done.current = true
    try { sessionStorage.setItem('shreyash-intro-seen', '1') } catch { /* ignore */ }
    finishIntro()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden bg-[#040508]"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      style={{ clipPath: 'inset(0 0 0% 0)' }}
      role="status"
      aria-label="Loading experience"
    >
      {/* red energy streaks */}
      <div aria-hidden className="absolute inset-0">
        {[18, 46, 74].map((top, i) => (
          <motion.div
            key={top}
            className="absolute h-px w-[46vw]"
            style={{ top: `${top}%`, background: 'linear-gradient(90deg, transparent, #FF304F, transparent)' }}
            initial={{ x: '-60vw', opacity: 0 }}
            animate={{ x: '160vw', opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.6, delay: 0.25 + i * 0.4, ease: 'easeInOut' }}
          />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-white/40"
            style={{ left: `${(i * 137) % 100}%`, top: `${(i * 61) % 100}%` }}
            animate={{ y: [-10, 10], opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* silhouette emerging */}
      <motion.img
        src="/assets/hero-character.svg"
        alt=""
        aria-hidden
        className="absolute bottom-0 right-[4%] h-[62vh] opacity-[0.16]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.16, y: 0 }}
        transition={{ duration: 1.8, delay: 0.5 }}
      />

      <div className="relative z-10 w-[min(560px,86vw)] text-center text-[#F5F5F5]">
        <motion.p
          className="font-mono text-[10px] tracking-[0.55em] text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {phase === 'online' ? 'SYSTEM ONLINE' : 'INITIALIZING EXPERIENCE'}
        </motion.p>
        <div className="mt-6 font-display text-[clamp(2rem,7vw,3.6rem)] tracking-wide">
          <ScrambleText text="SHREYASH.EXE" duration={1100} />
        </div>
        <div className="mx-auto mt-8 h-px w-full max-w-sm overflow-hidden bg-white/15">
          <motion.div
            className="h-full bg-[#FF304F]"
            style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(255,48,79,0.8)' }}
          />
        </div>
        <p className="mt-3 font-mono text-xs tabular-nums tracking-[0.3em] text-white/60">
          {String(Math.floor(progress)).padStart(3, '0')}%
        </p>
        <p className="mt-10 font-jp text-[10px] tracking-[0.5em] text-white/30">コードの向こう側へ</p>
      </div>

      <button
        onClick={skip}
        className="absolute bottom-8 right-8 border border-white/20 px-5 py-2 font-mono text-[10px] tracking-[0.35em] text-white/60 transition-colors hover:border-[#FF304F] hover:text-white"
      >
        SKIP →
      </button>
    </motion.div>
  )
}