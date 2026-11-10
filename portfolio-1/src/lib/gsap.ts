import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Flip } from "gsap/Flip"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip)
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger, Flip }
