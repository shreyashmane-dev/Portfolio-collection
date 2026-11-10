import { motion } from 'framer-motion'
import { exploring } from '../config/content'
import SectionHeader from './fx/SectionHeader'
import Reveal from './fx/Reveal'
import TiltCard from './fx/TiltCard'

export default function Exploring() {
  return (
    <section id="exploring" className="relative overflow-hidden bg-bg py-24 md:py-36">
      {/* rotating lab ornament */}
      <div aria-hidden className="pointer-events-none absolute -right-52 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 lg:block">
        <div className="absolute inset-0 rounded-full border border-dashed border-line animate-spin-slow" />
        <div className="absolute inset-14 rounded-full border border-line/60" style={{ animation: 'spin-slow 36s linear infinite reverse' }}>
          <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-red" />
        </div>
        <div className="absolute inset-28 rounded-full border border-blue/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="06"
          jp="研究"
          title="CURRENTLY EXPLORING"
          sub="Active research modules in the lab — signal strength reflects present focus, not mastery."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {exploring.map((mod, i) => (
            <Reveal key={mod.code} delay={i * 0.07}>
              <TiltCard className="group h-full" max={6}>
                <div className="glass relative h-full overflow-hidden rounded-sm p-6 transition-colors hover:border-blue/40">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-[0.35em] text-red">{mod.code}</span>
                    <span className="flex items-center gap-2 font-mono text-[8px] tracking-[0.3em] text-ink2">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" />
                      ACTIVE
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg uppercase leading-snug md:text-xl">{mod.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink2">{mod.detail}</p>
                  <div className="mt-6">
                    <div className="mb-1.5 flex justify-between font-mono text-[8px] tracking-[0.3em] text-ink2">
                      <span>SIGNAL</span>
                      <span className="text-blue">{mod.signal}%</span>
                    </div>
                    <div className="h-[3px] w-full overflow-hidden bg-line">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue to-red"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${mod.signal}%` }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                  {/* corner ticks */}
                  <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l border-t border-blue/50 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-red/50 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}