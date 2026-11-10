import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ChevronRight } from 'lucide-react'
import { useWorld } from '../store/useWorld'
import { identity } from '../config/content'
import { scrollToSection } from '../lib/scroll'
import { blip } from '../lib/audio'
import Magnetic from './fx/Magnetic'
import Rain from './fx/Rain'

const HeroScene = lazy(() => import('../three/HeroScene'))

function supports3D() {
  if (typeof window === 'undefined') return false
  if (window.innerWidth < 768) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Hero() {
  const introDone = useWorld((s) => s.introDone)
  const section = useRef<HTMLElement>(null)
  const sky = useRef<HTMLImageElement>(null)
  const far = useRef<HTMLImageElement>(null)
  const near = useRef<HTMLImageElement>(null)
  const char = useRef<HTMLImageElement>(null)
  const roof = useRef<HTMLImageElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [render3D] = useState(supports3D)
  const [roleIdx, setRoleIdx] = useState(0)
  const [clock, setClock] = useState('')
  const entered = useRef(false)

  useEffect(() => {
    const t = window.setInterval(() => setRoleIdx((i) => (i + 1) % identity.roles.length), 2800)
    const c = window.setInterval(() => {
      const d = new Date()
      setClock(d.toTimeString().slice(0, 8))
    }, 1000)
    return () => {
      window.clearInterval(t)
      window.clearInterval(c)
    }
  }, [])

  // Mouse parallax
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layers: [HTMLElement | null, number][] = [
      [sky.current, 8],
      [far.current, 16],
      [near.current, 28],
      [char.current, 40],
      [roof.current, 12],
    ]
    const setters = layers.map(([el, depth]) => {
      if (!el) return null
      return {
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
        depth,
      }
    })
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      setters.forEach((s) => s && s.x(nx * -s.depth))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Scroll parallax + entrance
  useEffect(() => {
    if (!section.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduced) {
        const cfg = { trigger: section.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(sky.current, { y: 90, scale: 1.06, scrollTrigger: cfg })
        gsap.to(far.current, { y: 60, scrollTrigger: { ...cfg } })
        gsap.to(near.current, { y: 34, scrollTrigger: { ...cfg } })
        gsap.to(char.current, { y: -70, scrollTrigger: { ...cfg } })
        gsap.to(content.current, {
          y: -90,
          opacity: 0,
          scrollTrigger: { trigger: section.current, start: 'top top', end: '70% top', scrub: true },
        })
      }
    }, section)
    // Viewport changes (resize / device emulation) can leave scrubbed tweens
    // mid-flight; force the hero back to its settled state at the top.
    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh()
        if (window.scrollY < 4) {
          gsap.set([sky.current, far.current, near.current, char.current], { y: 0, scale: 1 })
          gsap.set(content.current, { opacity: 1, y: 0 })
        }
      }, 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (!introDone || !section.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced || entered.current) {
        gsap.set('.hero-char, .hero-sub, .hero-tag, .hero-cta, .hero-meta', { opacity: 1, y: 0, clearProps: 'transform' })
        return
      }
      entered.current = true
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        '.hero-title',
        { textShadow: '4px 0 rgba(255,48,79,0.45), -4px 0 rgba(57,123,255,0.45)' },
        { textShadow: '0px 0 rgba(255,48,79,0), 0px 0 rgba(57,123,255,0)', duration: 1.6 },
        0
      )
      tl.fromTo(
        '.hero-char',
        { yPercent: 115, opacity: 0, rotateX: -50 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.15, stagger: 0.055 },
        0
      )
        .fromTo('.hero-sub', { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9 }, '-=0.7')
        .fromTo('.hero-tag', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.55')
        .fromTo('.hero-cta', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .fromTo('.hero-meta', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.4')
    }, section)
    return () => ctx.revert()
  }, [introDone])

  return (
    <section id="home" ref={section} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      {/* ===== CINEMATIC LAYERS ===== */}
      <div className="art-invert absolute inset-0" aria-hidden>
        <img ref={sky} src="/assets/hero-sky.svg" alt="" className="absolute inset-0 h-full w-full object-cover will-change-transform" />
        <img ref={far} src="/assets/hero-city-far.svg" alt="" className="absolute -left-[5%] bottom-[8%] h-[54%] w-[110%] object-cover object-bottom will-change-transform" />
        <img ref={near} src="/assets/hero-city-near.svg" alt="" className="absolute -left-[10%] bottom-0 h-[58%] w-[120%] object-cover object-bottom will-change-transform" />
      </div>

      {render3D && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <div className="absolute inset-0" aria-hidden>
        <motion.div
          className="absolute bottom-[2%] right-[-14%] h-[40vh] max-h-[600px] md:bottom-[9%] md:right-[7%] md:h-[66vh]"
          animate={{ y: [0, -9, 0], rotate: [0, 0.35, 0, -0.25, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            ref={char}
            src="/assets/hero-character.svg"
            alt=""
            className="h-full w-auto will-change-transform"
          />
        </motion.div>
        {/* ground energy glow */}
        <div className="absolute bottom-[5%] right-[4%] h-28 w-[46vw] max-w-[560px] opacity-40 md:right-[6%]"
          style={{ background: 'radial-gradient(ellipse at center, var(--glow-red), transparent 60%), radial-gradient(ellipse at 70% 50%, var(--glow-blue), transparent 65%)' }}
        />
        <img ref={roof} src="/assets/hero-rooftop.svg" alt="" className="absolute bottom-0 left-0 h-[16%] w-full object-cover will-change-transform" />
      </div>

      {/* drifting fog */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <div className="fog-band" style={{ bottom: '16%' }} />
        <div className="fog-band" style={{ bottom: '38%', animationDuration: '58s', animationDelay: '-20s' }} />
      </div>

      {/* entrance energy streaks */}
      {introDone && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[9] overflow-hidden">
          <span className="hero-streak" style={{ top: '24%', animationDelay: '0.15s' }} />
          <span className="hero-streak" style={{ top: '58%', animationDelay: '0.4s', background: 'linear-gradient(90deg, transparent, var(--blue), transparent)' }} />
          <span className="hero-streak" style={{ top: '76%', animationDelay: '0.65s' }} />
        </div>
      )}

      {/* character file tag */}
      <div className="hero-meta absolute right-[26%] top-[31%] z-10 hidden items-center opacity-0 lg:flex" aria-hidden>
        <span className="glass animate-float-slow px-3 py-2 font-mono text-[8px] tracking-[0.3em] text-ink2">
          FILE.00 <span className="text-red">//</span> THE EXPLORER
        </span>
        <span className="h-px w-14 bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-red" />
      </div>

      <Rain density={64} className="z-[6] opacity-70" />

      {/* atmosphere + section fade */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[7] bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--scrim)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-40 bg-gradient-to-b from-transparent to-bg" />

      {/* ===== CONTENT ===== */}
      <div ref={content} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 md:px-8">
        <div className="max-w-3xl pt-14">
          <div className="hero-meta mb-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-ink2 opacity-0 md:text-[11px]">
            <span className="inline-block h-2 w-2 animate-pulse bg-red" aria-hidden />
            <span className="hidden sm:inline">SYSTEM ONLINE</span>
            <span className="hidden text-line sm:inline">/</span>
            <span className="relative inline-block h-4 min-w-[220px] overflow-hidden text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute left-0 top-0 whitespace-nowrap text-blue"
                >
                  {identity.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <h1 className="font-display uppercase leading-[0.88]" style={{ perspective: 800 }}>
            <span className="hero-title block overflow-hidden text-[clamp(4.2rem,14vw,11.5rem)]">
              {identity.name.split('').map((c, i) => (
                <span key={i} className="hero-char inline-block opacity-0 will-change-transform">
                  {c}
                </span>
              ))}
            </span>
            <span className="hero-sub mt-3 block text-[clamp(1.3rem,3.6vw,2.7rem)] tracking-[0.08em] opacity-0">
              BEYOND THE CODE<span className="text-red">.</span>
            </span>
          </h1>

          <p className="hero-tag mt-7 max-w-md text-sm leading-relaxed text-ink2 opacity-0 [text-shadow:0_1px_12px_var(--bg)] md:text-base">
            {identity.heroLine}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={() => { blip('click'); scrollToSection('about') }}
                onMouseEnter={() => blip('hover')}
                className="hero-cta border-energy group relative flex items-center gap-3 bg-red px-7 py-4 font-mono text-[11px] font-bold tracking-[0.25em] text-white opacity-0 transition-transform"
              >
                EXPLORE MY WORLD
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => { blip('click'); scrollToSection('projects') }}
                onMouseEnter={() => blip('hover')}
                className="hero-cta glass flex items-center gap-3 px-7 py-4 font-mono text-[11px] tracking-[0.25em] text-ink opacity-0 transition-colors hover:border-blue hover:text-blue"
              >
                VIEW MY PROJECTS
              </button>
            </Magnetic>
          </div>
        </div>

        {/* vertical japanese typography */}
        <div className="hero-meta absolute right-5 top-[22%] hidden -translate-y-0 items-center gap-5 opacity-0 md:right-8 lg:flex" aria-hidden>
          <span className="jp-vertical text-[11px] text-ink2">コードの向こう側へ</span>
          <span className="h-24 w-px bg-line" />
          <span className="jp-vertical text-[11px] text-red">探索者・構築者</span>
        </div>

        {/* system readout */}
        <div className="hero-meta absolute bottom-8 left-5 flex items-center gap-6 font-mono text-[9px] tracking-[0.25em] text-ink2 opacity-0 md:left-8 md:text-[10px]">
          <span>{identity.coordinates}</span>
          <span className="hidden text-blue sm:inline">{clock || '00:00:00'} LOCAL</span>
          <span className="hidden md:inline">V.2.0.26</span>
        </div>

        {/* scroll indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="hero-meta absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 [text-shadow:0_1px_10px_var(--bg),0_0_18px_var(--bg)]"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[9px] tracking-[0.5em] text-ink">SCROLL</span>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute left-0 top-0 h-4 w-full bg-red"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          <ArrowDown size={12} className="text-ink" />
        </button>
      </div>
    </section>
  )
}