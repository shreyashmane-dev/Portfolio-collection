import { gsap } from "./gsap"

export type Theme = "dark" | "light"

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  const saved = localStorage.getItem("portfolio-theme") as Theme | null
  if (saved === "dark" || saved === "light") return saved
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

export function setThemeAttr(theme: Theme) {
  if (typeof document === "undefined") return
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("portfolio-theme", theme)
}

export function toggleThemeWithTransition(
  currentTheme: Theme,
  clickEvent?: React.MouseEvent | MouseEvent,
  onComplete?: (newTheme: Theme) => void
) {
  const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark"

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReduced || typeof document === "undefined") {
    setThemeAttr(nextTheme)
    onComplete?.(nextTheme)
    return
  }

  // Safe check without narrowing Document type to never
  const docAny = document as unknown as {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> }
  }

  if (typeof docAny.startViewTransition === "function") {
    const transition = docAny.startViewTransition(() => {
      setThemeAttr(nextTheme)
      onComplete?.(nextTheme)
    })

    const x = clickEvent ? clickEvent.clientX : window.innerWidth / 2
    const y = clickEvent ? clickEvent.clientY : window.innerHeight / 2
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
        document.documentElement.animate(
          {
            clipPath: clipPath
          },
          {
            duration: 900,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)"
          }
        )
      })
      .catch(() => {
        setThemeAttr(nextTheme)
        onComplete?.(nextTheme)
      })
    return
  }

  // Fallback with GSAP circular overlay
  const overlay = document.createElement("div")
  overlay.style.position = "fixed"
  overlay.style.inset = "0"
  overlay.style.zIndex = "9999"
  overlay.style.pointerEvents = "none"
  overlay.style.backgroundColor = nextTheme === "dark" ? "#07080B" : "#F4F2EE"

  const x = clickEvent ? clickEvent.clientX : window.innerWidth / 2
  const y = clickEvent ? clickEvent.clientY : window.innerHeight / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`
  document.body.appendChild(overlay)

  gsap.to(overlay, {
    clipPath: `circle(${endRadius}px at ${x}px ${y}px)`,
    duration: 0.9,
    ease: "expo.inOut",
    onComplete: () => {
      setThemeAttr(nextTheme)
      onComplete?.(nextTheme)
      overlay.remove()
    }
  })
}
