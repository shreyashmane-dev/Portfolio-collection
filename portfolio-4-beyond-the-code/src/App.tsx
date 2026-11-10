import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useWorld } from './store/useWorld'
import { setLenis } from './lib/scroll'
import { nav } from './config/content'
import Cursor from './components/fx/Cursor'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Exploring from './components/Exploring'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const introDone = useWorld((s) => s.introDone)
  const setActiveSection = useWorld((s) => s.setActiveSection)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis: Lenis | null = null
    let raf = 0
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
      setLenis(lenis)
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const exploringEl = document.getElementById('exploring')
    if (exploringEl) observer.observe(exploringEl)
    return () => observer.disconnect()
  }, [setActiveSection])

  useEffect(() => {
    if (introDone) {
      ScrollTrigger.refresh()
      window.dispatchEvent(new Event('world-ready'))
    }
  }, [introDone])

  return (
    <div className="grain relative min-h-screen bg-bg text-ink">
      <Cursor />
      <AnimatePresence>{!introDone && <Intro />}</AnimatePresence>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Exploring />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}