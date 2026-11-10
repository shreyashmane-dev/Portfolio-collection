"use client"

import React, { useState, useEffect } from "react"
import { initLenis, destroyLenis } from "@/lib/lenis"
import { Preloader } from "@/components/preloader/Preloader"
import { Navbar } from "@/components/nav/Navbar"
import { Hero } from "@/sections/Hero"
import { About } from "@/sections/About"
import { Skills } from "@/sections/Skills"
import { Featured } from "@/sections/Featured"
import { Hardware } from "@/sections/Hardware"
import { Archive } from "@/sections/Archive"
import { Career } from "@/sections/Career"
import { Finale } from "@/sections/Finale"
import { Contact } from "@/sections/Contact"
import { ScrollTrigger } from "@/lib/gsap"

export default function HomePage() {
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  useEffect(() => {
    initLenis()

    // Refresh ScrollTrigger after DOM has settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timeout)
      destroyLenis()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* 4.0 Preloader */}
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* 4.1 Hero */}
        <Hero />

        {/* 4.2 About */}
        <About />

        {/* 4.3 Skills */}
        <Skills />

        {/* 4.4 Featured Projects 1-10 */}
        <Featured />

        {/* 4.5 Hardware and IoT Schematics */}
        <Hardware />

        {/* 4.6 Complete Project Archive 11-43 */}
        <Archive />

        {/* 4.7 Career Interests and Academics */}
        <Career />

        {/* 4.8 Finale: The Swordsman (Scroll-Scrubbed Cinematic) */}
        <Finale />

        {/* 4.9 Contact and Footer */}
        <Contact />
      </main>
    </div>
  )
}
