import { motion } from 'framer-motion'
import { about } from '../config/content'
import SectionHeader from './fx/SectionHeader'
import Reveal from './fx/Reveal'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg py-24 md:py-36">
      {/* ambient accents */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue/[0.07] blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-red/[0.06] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader index="02" jp="紹介" title="THE CHARACTER BEHIND THE CODE" />

        <div className="grid items-start gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
          {/* character art panel */}
          <Reveal>
            <div className="border-energy glass relative overflow-hidden rounded-sm">
              <div className="absolute left-3 top-3 z-10 font-mono text-[9px] tracking-[0.35em] text-ink2">
                FILE.01 — PROFILE
              </div>
              <div className="absolute right-3 top-3 z-10 flex gap-1.5" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-red" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink2" />
              </div>
              <motion.img
                src="/assets/about-character.svg"
                alt="Anime-style illustrated avatar representing Shreyash — a stylized character, not a photograph"
                className="mx-auto block w-full max-w-md"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-bg/60 px-4 py-3 font-mono text-[9px] tracking-[0.3em] text-ink2 backdrop-blur-sm">
                <span>SHREYASH MANE</span>
                <span className="text-blue">CLASS: EXPLORER</span>
              </div>
              {/* scanline */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
                <span className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-blue to-transparent" style={{ animation: 'scan-y 5s linear infinite' }} />
              </div>
            </div>
          </Reveal>

          {/* info */}
          <div>
            <Reveal>
              <h3 className="font-display text-[clamp(1.7rem,3.6vw,2.9rem)] uppercase leading-tight">
                Not just a developer<span className="text-red">.</span>
                <br />
                An explorer<span className="text-blue">.</span>
              </h3>
            </Reveal>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink2 md:text-[15px]">{p}</p>
              </Reveal>
            ))}

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {about.facts.map((f, i) => (
                <Reveal key={f.label} delay={0.15 + i * 0.08}>
                  <div className="glass group rounded-sm px-4 py-3.5 transition-colors hover:border-blue/50">
                    <p className="font-mono text-[9px] tracking-[0.3em] text-red">{f.label}</p>
                    <p className="mt-1.5 text-[13px] leading-snug text-ink">{f.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* character progression */}
        <Reveal className="mt-20">
          <p className="mb-8 font-mono text-[10px] tracking-[0.4em] text-ink2">
            CHARACTER PROGRESSION <span className="text-red">//</span> 成長記録
          </p>
        </Reveal>
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-line lg:block" />
          {about.progression.map((stage, i) => (
            <Reveal key={stage.stage} delay={i * 0.1}>
              <div className="relative">
                <div
                  className={`relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-full border font-mono text-[9px] ${
                    stage.active
                      ? 'border-red bg-red/10 text-red shadow-[0_0_24px_var(--glow-red)]'
                      : 'border-line bg-bg2 text-ink2'
                  }`}
                >
                  {stage.stage}
                  {stage.active && (
                    <span aria-hidden className="absolute inset-0 rounded-full border border-red" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                  )}
                </div>
                <p className={`font-display text-sm uppercase tracking-wide ${stage.active ? 'text-red' : 'text-ink'}`}>
                  {stage.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink2">{stage.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}