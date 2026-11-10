import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { journey } from '../config/content'
import SectionHeader from './fx/SectionHeader'
import Reveal from './fx/Reveal'

export default function Journey() {
  const wrap = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrap.current || !line.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      line.current.style.transform = 'scaleY(1)'
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 },
        }
      )
      gsap.utils.toArray<HTMLElement>('.journey-node').forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: node, start: 'top 72%', toggleActions: 'play reverse play reverse' },
          }
        )
      })
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" className="relative overflow-hidden bg-bg2 py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line/40 lg:left-[70%]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="05"
          jp="旅路"
          title="THE LEARNING JOURNEY"
          sub="A vertical save file — every phase unlocked by building, breaking and understanding."
        />

        <div ref={wrap} className="relative mx-auto max-w-3xl lg:mx-0 lg:max-w-[62%]">
          {/* track + progress */}
          <div aria-hidden className="absolute bottom-0 left-[13px] top-0 w-px bg-line md:left-[17px]" />
          <div
            ref={line}
            aria-hidden
            className="absolute bottom-0 left-[13px] top-0 w-px origin-top bg-gradient-to-b from-red via-blue to-red will-change-transform md:left-[17px]"
            style={{ transform: 'scaleY(0)', boxShadow: '0 0 10px var(--glow-red)' }}
          />

          <ol className="space-y-12 md:space-y-16">
            {journey.map((step, i) => (
              <li key={step.phase} className="relative pl-12 md:pl-16">
                <span
                  className={`journey-node absolute left-0 top-1 flex h-[27px] w-[27px] items-center justify-center rounded-full border md:h-[35px] md:w-[35px] ${
                    step.current
                      ? 'border-red bg-red/15 shadow-[0_0_20px_var(--glow-red)]'
                      : 'border-line bg-bg'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${step.current ? 'bg-red' : 'bg-blue'}`} />
                  {step.current && (
                    <span aria-hidden className="absolute inset-0 rounded-full border border-red" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                  )}
                </span>
                <Reveal delay={i * 0.04}>
                  <p className="font-mono text-[9px] tracking-[0.4em] text-red">
                    {step.phase} {step.current && <span className="ml-2 text-blue">— CURRENT</span>}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase md:text-3xl">{step.title}</h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-blue">{step.subtitle.toUpperCase()}</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink2">{step.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}