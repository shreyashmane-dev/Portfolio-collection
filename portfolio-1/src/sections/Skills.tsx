"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { skillsData, skillsNote } from "@/data/skills"
import { TechIcon } from "@/components/icons/TechIcon"

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const bladeProgressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !trackRef.current) return

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const isMobile = window.innerWidth < 768

      if (prefersReduced || isMobile) return

      const track = trackRef.current
      const scrollWidth = track.scrollWidth - window.innerWidth + 120

      // Pin and scrub horizontal track
      gsap.to(track, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bladeProgressRef.current) {
              bladeProgressRef.current.style.transform = `scaleX(${self.progress})`
            }
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Technical Skills Arsenal"
      className="relative w-full bg-[var(--bg-2)] overflow-hidden border-b border-[var(--line)]"
    >
      <div
        ref={pinContainerRef}
        className="min-h-screen w-full flex flex-col justify-between py-12 px-4 md:px-8 overflow-hidden"
      >
        {/* Header with chapter info */}
        <div className="max-w-7xl mx-auto w-full pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-[var(--red)]" />
                02 // CHAPTER : ARSENAL
              </div>
              <h2 className="font-display text-4xl md:text-6xl text-[var(--ink)] tracking-tight">
                TECHNICAL CAPABILITIES
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--ink-dim)] max-w-md">
              {skillsNote}
            </p>
          </div>
        </div>

        {/* Horizontal scroll track for desktop / swipeable track for mobile */}
        <div className="w-full my-auto overflow-x-auto md:overflow-visible py-8 scrollbar-none">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 md:gap-10 w-max px-4 md:px-8"
          >
            {skillsData.map((category, catIdx) => (
              <div
                key={category.name}
                className="w-[280px] md:w-[320px] bg-[var(--bg)] border border-[var(--line)] p-6 clip-notch-tl flex flex-col justify-between flex-shrink-0 relative group hover:border-[var(--blue)] transition-colors"
              >
                {/* Category Header */}
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--red)] font-bold mb-3">
                    <span>SECTOR 0{catIdx + 1}</span>
                    <span className="text-[var(--ink-dim)]">{category.skills.length} TOOLS</span>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--ink)] tracking-wide mb-6 pb-2 border-b border-[var(--line)]">
                    {category.name}
                  </h3>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-br flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 hover:border-[var(--blue)] hover:shadow-[0_0_15px_rgba(47,107,255,0.2)] hover:-translate-y-1 group/tile"
                      >
                        <TechIcon
                          name={skill.name}
                          size={24}
                          className="text-[var(--ink-dim)] group-hover/tile:text-[var(--blue)] transition-colors duration-200"
                        />
                        <span className="font-mono text-[11px] text-[var(--ink)] tracking-wider">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Index */}
                <div className="pt-6 mt-4 border-t border-[var(--line)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-dim)]">
                  <span>DISC // {catIdx + 1}</span>
                  <span className="text-[var(--blue)] font-bold">READY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Katana Blade Progress Bar indicator along the bottom */}
        <div className="max-w-7xl mx-auto w-full pb-4">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--ink-dim)] mb-2">
            <span>BLADE GAUGING // HORIZONTAL TRACK</span>
            <span>SCROLL TO ADVANCE</span>
          </div>
          <div className="relative w-full h-[3px] bg-[var(--line)] overflow-hidden">
            <div
              ref={bladeProgressRef}
              className="absolute top-0 left-0 h-full w-full bg-[var(--red)] origin-left scale-x-0 transition-transform duration-100 ease-linear shadow-[0_0_8px_#E5243B]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
