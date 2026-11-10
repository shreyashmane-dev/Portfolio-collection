import Lenis from 'lenis'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: -64, duration: 1.6 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}