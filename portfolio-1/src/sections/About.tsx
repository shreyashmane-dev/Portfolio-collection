"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/profile"
import { UnderlineStroke, PanelCornerIcon } from "@/components/icons/CustomIcons"
import { MapPin, School, GraduationCap, Compass } from "lucide-react"

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pinWrapperRef.current) return

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) return

      const lines = textContainerRef.current?.querySelectorAll(".scrub-line")
      const mangaPanels = panelsRef.current?.querySelectorAll(".manga-panel-card")
      const underlinePath = underlineRef.current?.querySelector("path")

      // Pin timeline scrubbed for 120vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: pinWrapperRef.current,
          scrub: 1
        }
      })

      // Mask line reveals: opacity 0.15 to 1 plus y shift
      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { opacity: 0.15, y: 15 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
          0
        )
      }

      // Hand-drawn SVG underline draws
      if (underlinePath) {
        const length = underlinePath.getTotalLength ? underlinePath.getTotalLength() : 300
        gsap.set(underlinePath, {
          strokeDasharray: length,
          strokeDashoffset: length
        })
        tl.to(
          underlinePath,
          { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" },
          0.3
        )
      }

      // Manga panels slide diagonally from alternating corners
      if (mangaPanels && mangaPanels.length > 0) {
        mangaPanels.forEach((panel, i) => {
          const fromX = i % 2 === 0 ? 80 : -80
          const fromY = i < 2 ? -60 : 60
          tl.fromTo(
            panel,
            { x: fromX, y: fromY, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            0.15 * i
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Shreyash Mane"
      className="relative w-full bg-[var(--bg)] border-b border-[var(--line)]"
    >
      <div
        ref={pinWrapperRef}
        className="min-h-screen w-full flex flex-col justify-center px-4 md:px-8 py-16"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Marker */}
          <div className="flex items-center gap-4 mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--red)]" />
              01 // CHAPTER : ABOUT
            </div>
            <div className="h-[1px] bg-[var(--line)] flex-1" />
            <div className="font-mono text-xs text-[var(--ink-dim)]">FIG. 02</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mask line reveals */}
            <div ref={textContainerRef} className="lg:col-span-7 space-y-8">
              <div className="space-y-4 font-mono text-lg md:text-2xl lg:text-3xl font-light text-[var(--ink)] leading-relaxed">
                <div className="scrub-line">
                  {profile.introduction[0]}
                </div>

                <div className="scrub-line pt-4 text-base md:text-xl text-[var(--ink-dim)]">
                  {profile.introduction[1]}
                </div>
              </div>

              {/* Hand-drawn SVG underline under primary focus */}
              <div ref={underlineRef} className="pt-2 relative max-w-lg">
                <p className="font-display text-2xl md:text-3xl text-[var(--blue)] uppercase tracking-wide">
                  Building functional systems with zero compromises.
                </p>
                <UnderlineStroke className="h-4 -mt-1" />
              </div>

              <div className="pt-4 flex flex-wrap gap-2">
                {profile.primaryInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-tl font-mono text-xs text-[var(--ink-dim)] hover:border-[var(--blue)] transition-colors"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Manga-style Fact Panels */}
            <div
              ref={panelsRef}
              className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Panel 01: College */}
              <div className="manga-panel-card manga-panel p-5 relative overflow-hidden clip-notch-tl group hover:border-[var(--blue)] transition-colors">
                <div className="absolute top-2 right-2 text-[var(--ink-dim)] opacity-40">
                  <PanelCornerIcon size={12} />
                </div>
                <div className="font-mono text-[10px] text-[var(--red)] font-bold tracking-widest mb-2">
                  PANEL 01 // COLLEGE
                </div>
                <School className="w-6 h-6 text-[var(--blue)] mb-3" />
                <h3 className="font-mono text-xs font-semibold text-[var(--ink)] leading-snug">
                  {profile.college}
                </h3>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-halftone opacity-30 pointer-events-none" />
              </div>

              {/* Panel 02: University */}
              <div className="manga-panel-card manga-panel p-5 relative overflow-hidden clip-notch-br group hover:border-[var(--blue)] transition-colors">
                <div className="absolute top-2 right-2 text-[var(--ink-dim)] opacity-40">
                  <PanelCornerIcon size={12} />
                </div>
                <div className="font-mono text-[10px] text-[var(--red)] font-bold tracking-widest mb-2">
                  PANEL 02 // AFFILIATION
                </div>
                <GraduationCap className="w-6 h-6 text-[var(--blue)] mb-3" />
                <h3 className="font-mono text-xs font-semibold text-[var(--ink)] leading-snug">
                  {profile.university}
                </h3>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-halftone opacity-30 pointer-events-none" />
              </div>

              {/* Panel 03: Location */}
              <div className="manga-panel-card manga-panel p-5 relative overflow-hidden clip-notch-tl group hover:border-[var(--blue)] transition-colors">
                <div className="absolute top-2 right-2 text-[var(--ink-dim)] opacity-40">
                  <PanelCornerIcon size={12} />
                </div>
                <div className="font-mono text-[10px] text-[var(--red)] font-bold tracking-widest mb-2">
                  PANEL 03 // COORDINATES
                </div>
                <MapPin className="w-6 h-6 text-[var(--red)] mb-3" />
                <h3 className="font-mono text-xs font-semibold text-[var(--ink)] leading-snug">
                  {profile.location}
                </h3>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-halftone opacity-30 pointer-events-none" />
              </div>

              {/* Panel 04: Focus */}
              <div className="manga-panel-card manga-panel p-5 relative overflow-hidden clip-notch-br group hover:border-[var(--blue)] transition-colors">
                <div className="absolute top-2 right-2 text-[var(--ink-dim)] opacity-40">
                  <PanelCornerIcon size={12} />
                </div>
                <div className="font-mono text-[10px] text-[var(--red)] font-bold tracking-widest mb-2">
                  PANEL 04 // SPECIALIZATION
                </div>
                <Compass className="w-6 h-6 text-[var(--blue)] mb-3" />
                <h3 className="font-mono text-xs font-semibold text-[var(--ink)] leading-snug">
                  AI Systems & IoT Architecture
                </h3>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-halftone opacity-30 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
