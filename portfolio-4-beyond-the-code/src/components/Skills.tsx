import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  siC, siCplusplus, siPython, siJavascript, siTypescript,
  siReact, siHtml5, siCss3, siTailwindcss,
  siNodedotjs, siSwagger, siFirebase,
  siOpenai, siLanggraph, siLangchain, siN8n, siPostgresql,
  siGit, siGithub, siDocker, siBlender,
} from 'simple-icons'
import { skillCategories, type Skill } from '../config/content'
import SectionHeader from './fx/SectionHeader'
import Reveal from './fx/Reveal'
import TiltCard from './fx/TiltCard'
import { blip } from '../lib/audio'

const ICONS: Record<string, { path: string; hex: string }> = {
  siC, siCplusplus, siPython, siJavascript, siTypescript,
  siReact, siHtml5, siCss3, siTailwindcss,
  siNodedotjs, siSwagger, siFirebase,
  siOpenai, siLanggraph, siLangchain, siN8n, siPostgresql,
  siGit, siGithub, siDocker, siBlender,
}

const VSCODE_PATH =
  'M17.5 2.2 22 4.4v15.2l-4.5 2.2c-.4.2-.9.1-1.2-.2L7.4 14l-3.6 2.8c-.3.3-.8.3-1.1.1l-1.2-.9c-.4-.3-.4-.9 0-1.2L4.6 12 1.5 9.2c-.4-.3-.4-.9 0-1.2l1.2-.9c.3-.2.8-.2 1.1.1L7.4 10l8.9-7.6c.3-.3.8-.4 1.2-.2ZM17.5 7.3 11.6 12l5.9 4.7V7.3Z'

function SkillIcon({ skill, className }: { skill: Skill; className?: string }) {
  const path = skill.icon === 'custom:vscode' ? VSCODE_PATH : ICONS[skill.icon]?.path
  if (!path) return null
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  )
}

const LEVEL_STYLE: Record<Skill['level'], string> = {
  CORE: 'text-blue border-blue/40 bg-blue/10',
  BUILDING: 'text-ink border-line bg-glass',
  EXPLORING: 'text-red border-red/40 bg-red/10',
}

export default function Skills() {
  const [catId, setCatId] = useState(skillCategories[0].id)
  const [hovered, setHovered] = useState<Skill | null>(null)
  const [selected, setSelected] = useState<Skill | null>(null)
  const cat = skillCategories.find((c) => c.id === catId)!
  const detail = hovered ?? selected ?? cat.skills[0]

  return (
    <section id="skills" className="relative overflow-hidden bg-bg2 py-24 md:py-36">
      {/* animated connection field */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" preserveAspectRatio="none" viewBox="0 0 1200 800">
        <g stroke="var(--blue)" strokeWidth="1" fill="none" strokeDasharray="6 10" style={{ animation: 'dash-flow 12s linear infinite' }}>
          <path d="M-20 160 H420 L520 260 H1220" />
          <path d="M-20 640 H300 L420 520 H900 L1000 620 H1220" />
        </g>
        <g stroke="var(--red)" strokeWidth="1" fill="none" strokeDasharray="4 12" style={{ animation: 'dash-flow 16s linear infinite reverse' }}>
          <path d="M200 -20 V220 L360 380 V820" />
          <path d="M980 -20 V300 L860 420 V820" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="03"
          jp="武器庫"
          title="MY ARSENAL"
          sub="Technologies I work with and study — organized as loadout modules. Hover or tap a module to inspect it."
        />

        {/* category selector */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
            {skillCategories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={catId === c.id}
                onClick={() => { setCatId(c.id); setSelected(null); setHovered(null); blip('click') }}
                onMouseEnter={() => blip('hover')}
                className={`relative px-5 py-2.5 font-mono text-[10px] tracking-[0.25em] transition-colors ${
                  catId === c.id ? 'text-white' : 'glass text-ink2 hover:text-ink'
                }`}
              >
                {catId === c.id && (
                  <motion.span layoutId="skill-tab" className="absolute inset-0 bg-red" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                )}
                <span className="relative z-10">
                  {c.label} <span className="ml-1 opacity-60">{c.jp}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[7fr_4fr]">
          {/* module grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <TiltCard className="group h-full" max={9}>
                    <button
                      onMouseEnter={() => { setHovered(skill); blip('hover') }}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(skill)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setSelected(skill)}
                      className={`glass flex h-full w-full flex-col items-start gap-4 rounded-sm p-5 text-left transition-colors ${
                        detail.name === skill.name ? 'border-blue/60' : 'hover:border-line'
                      }`}
                      style={detail.name === skill.name ? { borderColor: 'color-mix(in srgb, var(--blue) 55%, transparent)' } : undefined}
                    >
                      <SkillIcon skill={skill} className="h-8 w-8 text-ink2 transition-colors duration-300 group-hover:text-blue" />
                      <div>
                        <p className="text-sm font-bold tracking-wide">{skill.name}</p>
                        <span className={`mt-2 inline-block border px-2 py-0.5 font-mono text-[8px] tracking-[0.25em] ${LEVEL_STYLE[skill.level]}`}>
                          {skill.level}
                        </span>
                      </div>
                    </button>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* inspection panel */}
          <div className="glass border-energy relative hidden self-start rounded-sm p-7 lg:block" aria-live="polite">
            <p className="font-mono text-[9px] tracking-[0.4em] text-ink2">MODULE INSPECTION</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={detail.name}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <SkillIcon skill={detail} className="h-12 w-12 text-blue" />
                <h3 className="mt-5 font-display text-2xl uppercase">{detail.name}</h3>
                <span className={`mt-3 inline-block border px-2.5 py-1 font-mono text-[9px] tracking-[0.25em] ${LEVEL_STYLE[detail.level]}`}>
                  {detail.level}
                </span>
                <p className="mt-5 text-sm leading-relaxed text-ink2">{detail.note}</p>
                <div className="mt-6 h-px w-full bg-line" />
                <p className="mt-4 font-mono text-[9px] tracking-[0.3em] text-ink2">
                  CATEGORY <span className="text-red">//</span> {cat.label}
                </p>
              </motion.div>
            </AnimatePresence>
            {/* floating readout chips */}
            <span className="absolute -right-3 -top-3 glass animate-float-slow px-3 py-1.5 font-mono text-[8px] tracking-[0.3em] text-blue">
              {cat.skills.length} MODULES
            </span>
          </div>
        </div>

        {/* mobile detail readout */}
        <div className="glass mt-6 rounded-sm p-5 lg:hidden" aria-live="polite">
          <p className="font-mono text-[9px] tracking-[0.35em] text-red">{detail.name} — {detail.level}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink2">{detail.note}</p>
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center gap-5 font-mono text-[9px] tracking-[0.25em] text-ink2">
            <span className="flex items-center gap-2"><span className="h-2 w-2 border border-blue bg-blue/20" /> CORE — DAILY DRIVER</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 border border-line bg-glass" /> BUILDING — ACTIVELY USED</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 border border-red bg-red/20" /> EXPLORING — LEARNING NOW</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}