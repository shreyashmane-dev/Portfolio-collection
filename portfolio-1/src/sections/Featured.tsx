"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "@/lib/gsap"
import { projects, Project } from "@/data/projects"
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder"
import { TechIcon } from "@/components/icons/TechIcon"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { GithubIcon } from "@/components/icons/CustomIcons"
import { ArrowUpRight, AlertCircle } from "lucide-react"

export function Featured() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeEpisode, setActiveEpisode] = useState(0)
  const featuredList = projects.filter((p) => p.featured)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const isMobile = window.innerWidth < 1024

      if (prefersReduced || isMobile) return

      const cards = containerRef.current.querySelectorAll(".episode-card")
      if (cards.length === 0) return

      // Pinned stack with slash-wipe transitions between cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              featuredList.length - 1,
              Math.floor(self.progress * featuredList.length)
            )
            setActiveEpisode(idx)
          }
        }
      })

      cards.forEach((card, i) => {
        if (i === 0) return // First card is already visible
        tl.fromTo(
          card,
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            opacity: 0.8
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1,
            ease: "none"
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [featuredList.length])

  return (
    <section
      ref={containerRef}
      id="featured"
      aria-label="Featured Project Episodes"
      className="relative w-full bg-[var(--bg)] border-b border-[var(--line)]"
    >
      {/* Desktop Viewport Pinned Episode Showcase */}
      <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
        {/* Left Vertical Episode Index Tracker (Desktop) */}
        <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-2 z-30 font-mono text-xs">
          {featuredList.map((project, idx) => (
            <button
              key={project.slug}
              onClick={() => setActiveEpisode(idx)}
              className={`flex items-center gap-3 transition-colors duration-200 text-left ${
                activeEpisode === idx
                  ? "text-[var(--red)] font-bold translate-x-1"
                  : "text-[var(--ink-dim)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-current rounded-full" />
              <span>EP.{project.rank.toString().padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        {/* Episode Card Stack */}
        <div className="max-w-6xl mx-auto w-full relative h-full lg:h-[82vh] flex items-center">
          {featuredList.map((project: Project, idx: number) => {
            return (
              <div
                key={project.slug}
                data-cursor="view"
                className={`episode-card ${
                  idx === 0
                    ? "relative"
                    : "lg:absolute lg:inset-0 lg:z-10"
                } w-full bg-[var(--bg-2)] border-2 border-[var(--ink)] p-6 md:p-10 lg:p-12 clip-notch-tl flex flex-col justify-between mb-8 lg:mb-0 shadow-2xl transition-all duration-300`}
                style={{
                  zIndex: idx + 1
                }}
              >
                {/* Top Bar: Episode Number, Subtitle, Status */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl md:text-5xl text-[var(--red)] leading-none tracking-tight">
                      EP.{project.rank.toString().padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-[var(--ink-dim)] uppercase tracking-widest">
                      {"// "} {project.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.docsNeeded && (
                      <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 clip-notch-tl">
                        <AlertCircle size={12} />
                        Doc Needed
                      </span>
                    )}

                    <span className="px-2.5 py-1 bg-[var(--blue)]/10 border border-[var(--blue)]/30 text-[var(--blue)] font-mono text-[10px] uppercase tracking-wider clip-notch-br">
                      STATUS: {project.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Main Card Content: 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
                  {/* Left: Title, Description, Tech Stack, Links */}
                  <div className="lg:col-span-7 space-y-6">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group inline-block"
                    >
                      <h3 className="font-display text-4xl md:text-6xl text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors uppercase tracking-tight">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="font-mono text-sm md:text-base text-[var(--ink-dim)] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Icons Row */}
                    <div>
                      <div className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider mb-2">
                        STACK & FRAMEWORKS:
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.tech.map((t) => (
                          <div
                            key={t}
                            className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg)] border border-[var(--line)] clip-notch-tl font-mono text-xs text-[var(--ink)]"
                          >
                            <TechIcon name={t} size={14} className="text-[var(--blue)]" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <MagneticButton
                        variant="blue"
                        asLink
                        href={`/projects/${project.slug}`}
                      >
                        <span>Project Detail</span>
                        <ArrowUpRight size={14} />
                      </MagneticButton>

                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--red)] font-mono text-xs text-[var(--ink)] uppercase tracking-wider flex items-center gap-2 clip-notch-br transition-colors"
                      >
                        <GithubIcon size={14} />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right: Designed SVG Placeholder / Screenshot slot */}
                  <div className="lg:col-span-5">
                    <Link href={`/projects/${project.slug}`} className="block group">
                      <ProjectPlaceholder
                        title={project.title}
                        rank={project.rank}
                        slug={project.slug}
                      />
                    </Link>
                  </div>
                </div>

                {/* Bottom Bar: Metadata */}
                <div className="border-t border-[var(--line)] pt-3 flex flex-wrap items-center justify-between font-mono text-[10px] text-[var(--ink-dim)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--red)]">LABELS:</span>
                    <span>{project.labels.join(" / ")}</span>
                  </div>
                  <div>EPISODE {project.rank} OF 10 // MAIN SERIES</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
