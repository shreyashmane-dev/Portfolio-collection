"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/profile"
import { BookOpen, GraduationCap } from "lucide-react"

export function Career() {
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!marqueeTrackRef.current) return
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) return

      // Marquee ticker driven by scroll velocity
      let currentSkew = 0

      gsap.to(marqueeTrackRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity() / 300
            currentSkew = Math.max(-12, Math.min(12, velocity))
            gsap.to(marqueeTrackRef.current, {
              skewX: currentSkew,
              duration: 0.3,
              overwrite: "auto"
            })
          }
        }
      })

      // Continuous loop
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="career"
      aria-label="Career Interests and Academic Foundation"
      className="relative w-full bg-[var(--bg-2)] py-20 border-b border-[var(--line)] overflow-hidden"
    >
      {/* Velocity-Reactive Marquee Ticker */}
      <div className="w-full overflow-hidden border-y border-[var(--line)] py-4 bg-[var(--bg)] select-none">
        <div
          ref={marqueeTrackRef}
          className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        >
          {[...profile.careerInterests, ...profile.careerInterests, ...profile.careerInterests].map(
            (role, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span className="font-display text-3xl md:text-5xl text-[var(--ink)] tracking-wider uppercase">
                  {role}
                </span>
                <span className="w-2.5 h-2.5 bg-[var(--red)] transform rotate-45" />
                <span className="font-mono text-xs text-[var(--blue)] font-bold tracking-widest">
                  SYS_PATH // 2026
                </span>
                <span className="w-2.5 h-2.5 bg-[var(--blue)] transform rotate-45" />
              </div>
            )
          )}
        </div>
      </div>

      {/* Academic Foundation 2-Column Typographic Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--red)]" />
            06 // CHAPTER : ACADEMICS
          </div>
          <div className="h-[1px] bg-[var(--line)] flex-1" />
          <div className="font-mono text-xs text-[var(--ink-dim)]">FIG. 06</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Degree & Institution */}
          <div className="lg:col-span-6 bg-[var(--bg)] border border-[var(--line)] p-8 clip-notch-tl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[var(--blue)] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
                <GraduationCap size={16} />
                <span>FORMAL EDUCATION</span>
              </div>

              <h3 className="font-display text-4xl text-[var(--ink)] tracking-tight mb-2">
                {profile.academics.degree} IN {profile.academics.branch}
              </h3>

              <div className="space-y-4 my-6 font-mono text-xs text-[var(--ink-dim)]">
                <div className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span>INSTITUTION</span>
                  <span className="text-[var(--ink)] text-right font-semibold">
                    {profile.academics.institution}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span>UNIVERSITY</span>
                  <span className="text-[var(--ink)] text-right font-semibold">
                    {profile.academics.university}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span>LOCATION</span>
                  <span className="text-[var(--ink)] font-semibold">{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] font-mono text-[10px] text-[var(--red)]">
              ACADEMIC MERIT // HARDWARE & SOFTWARE INTEGRATION
            </div>
          </div>

          {/* Column 2: Academic Focus & Learning Interests */}
          <div className="lg:col-span-6 bg-[var(--bg)] border border-[var(--line)] p-8 clip-notch-br flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[var(--red)] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
                <BookOpen size={16} />
                <span>CURRICULUM & RESEARCH TRACK</span>
              </div>

              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--ink-dim)] mb-3">
                  ACADEMIC FOCUS DISCIPLINES:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.academics.academicFocus.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-tl font-mono text-xs text-[var(--ink)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--ink-dim)] mb-3">
                  CURRENT RESEARCH & LEARNING INTERESTS:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.academics.learningInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-br font-mono text-xs text-[var(--blue)] font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line)] font-mono text-[10px] text-[var(--ink-dim)]">
              UPDATED TERM // 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
