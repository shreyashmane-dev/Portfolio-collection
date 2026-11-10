import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { identity, projects, type Project } from '../config/content'
import { useWorld } from '../store/useWorld'
import SectionHeader from './fx/SectionHeader'
import Reveal from './fx/Reveal'
import TiltCard from './fx/TiltCard'
import Magnetic from './fx/Magnetic'
import { blip } from '../lib/audio'

const FILTERS = ['ALL', 'AI', 'WEB', 'IOT', 'TOOLS'] as const

const STATUS_META: Record<Project['status'], { label: string; cls: string }> = {
  completed: { label: 'COMPLETED', cls: 'text-blue border-blue/50 bg-blue/10' },
  'in-development': { label: 'IN DEVELOPMENT', cls: 'text-red border-red/50 bg-red/10' },
  concept: { label: 'CONCEPT', cls: 'text-ink2 border-line bg-glass' },
}

function ProjectCard({ project, featured, onOpen }: { project: Project; featured?: boolean; onOpen: () => void }) {
  const status = STATUS_META[project.status]
  return (
    <TiltCard className={`group ${featured ? 'md:col-span-2' : ''}`} max={featured ? 3 : 6}>
      <article className="glass relative h-full overflow-hidden rounded-sm transition-colors duration-300 hover:border-blue/40">
        {/* artwork */}
        <button onClick={onOpen} className={`relative block w-full overflow-hidden text-left ${featured ? 'h-64 md:h-80' : 'h-52 md:h-56'}`} aria-label={`Open details for ${project.name}`}>
          <img
            src={project.art}
            alt={`${project.name} concept artwork`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            style={project.accent === 'red' && project.art.includes('ai-core') ? { filter: undefined } : undefined}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 font-display text-4xl text-outline opacity-70 md:text-5xl">{project.index}</span>
          <span className={`absolute right-4 top-4 border px-2.5 py-1 font-mono text-[8px] tracking-[0.25em] backdrop-blur-sm ${status.cls}`}>
            {status.label}
          </span>
          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/60 text-ink opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </button>

        <div className="p-5 md:p-6">
          <p className="font-mono text-[9px] tracking-[0.3em] text-red">{project.codename}</p>
          <h3 className="mt-2 font-display text-xl uppercase leading-tight md:text-2xl">{project.name}</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-ink2">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span key={t} className="border border-line px-2 py-0.5 font-mono text-[9px] tracking-wider text-ink2">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            <button
              onClick={onOpen}
              onMouseEnter={() => blip('hover')}
              className="font-mono text-[10px] tracking-[0.25em] text-blue transition-colors hover:text-ink"
            >
              MISSION BRIEF →
            </button>
            <a
              href={project.repo || identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-ink2 transition-colors hover:text-ink"
              aria-label={`${project.name} on GitHub`}
            >
              <Github size={13} /> GITHUB
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-ink2 transition-colors hover:text-ink"
              >
                <ExternalLink size={13} /> LIVE
              </a>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const status = STATUS_META[project.status]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[160] flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
    >
      <motion.div
        className="glass max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-md border-energy bg-bg/90 sm:rounded-md"
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 overflow-hidden md:h-64">
          <img src={project.art} alt="" className="h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/70 backdrop-blur-sm transition-colors hover:border-red hover:text-red"
            aria-label="Close project details"
          >
            <X size={16} />
          </button>
          <span className="absolute bottom-4 left-6 font-display text-5xl text-outline">{project.index}</span>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[9px] tracking-[0.3em] text-red">{project.codename}</p>
            <span className={`border px-2.5 py-1 font-mono text-[8px] tracking-[0.25em] ${status.cls}`}>{status.label}</span>
            <span className="border border-line px-2.5 py-1 font-mono text-[8px] tracking-[0.25em] text-ink2">{project.category}</span>
          </div>
          <h3 className="mt-4 font-display text-3xl uppercase leading-tight md:text-4xl">{project.name}</h3>
          <p className="mt-5 text-sm leading-relaxed text-ink2 md:text-[15px]">{project.detail}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="border border-line bg-glass px-3 py-1 font-mono text-[10px] tracking-wider">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            <Magnetic>
              <a
                href={project.repo || identity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-ink px-6 py-3 font-mono text-[10px] tracking-[0.25em] text-bg transition-opacity hover:opacity-85"
              >
                <Github size={14} /> {project.repo ? 'VIEW REPOSITORY' : 'VIEW GITHUB PROFILE'}
              </a>
            </Magnetic>
            {project.demo && (
              <Magnetic>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 px-6 py-3 font-mono text-[10px] tracking-[0.25em] hover:border-blue hover:text-blue"
                >
                  <ExternalLink size={14} /> LIVE DEMO
                </a>
              </Magnetic>
            )}
          </div>
          {project.status === 'concept' && (
            <p className="mt-5 font-mono text-[9px] tracking-[0.2em] text-ink2">
              * CONCEPT-STAGE PROJECT — ARCHITECTURE AND DESIGN IN PROGRESS.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL')
  const openProject = useWorld((s) => s.openProject)
  const setOpenProject = useWorld((s) => s.setOpenProject)
  const visible = projects.filter((p) => filter === 'ALL' || p.category === filter)
  const active = projects.find((p) => p.id === openProject) ?? null

  return (
    <section id="projects" className="relative overflow-hidden bg-bg py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-red/[0.05] blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="04"
          jp="創造"
          title="MY CREATIONS"
          sub="Mission files from the workshop — completed builds, active developments and concepts in orbit."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const count = f === 'ALL' ? projects.length : projects.filter((p) => p.category === f).length
              return (
                <button
                  key={f}
                  onClick={() => { setFilter(f); blip('click') }}
                  onMouseEnter={() => blip('hover')}
                  aria-pressed={filter === f}
                  className={`relative px-5 py-2.5 font-mono text-[10px] tracking-[0.3em] transition-colors ${
                    filter === f ? 'text-white' : 'glass text-ink2 hover:text-ink'
                  }`}
                >
                  {filter === f && (
                    <motion.span layoutId="project-filter" className="absolute inset-0 bg-blue" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                  )}
                  <span className="relative z-10">{f} <span className="opacity-60">/{String(count).padStart(2, '0')}</span></span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 md:grid-cols-2 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={filter === 'ALL' && i === 0 ? 'md:col-span-2' : ''}
              >
                <ProjectCard
                  project={p}
                  featured={filter === 'ALL' && i === 0}
                  onOpen={() => { setOpenProject(p.id); blip('transition') }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  )
}