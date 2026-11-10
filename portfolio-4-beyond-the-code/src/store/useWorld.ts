import { create } from 'zustand'

type Theme = 'void' | 'paper'

function initialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const t = document.documentElement.dataset.theme
    if (t === 'paper' || t === 'void') return t
  }
  return 'void'
}

type WorldState = {
  theme: Theme
  soundOn: boolean
  introDone: boolean
  activeSection: string
  openProject: string | null
  menuOpen: boolean
  toggleTheme: () => void
  setSound: (on: boolean) => void
  finishIntro: () => void
  setActiveSection: (id: string) => void
  setOpenProject: (id: string | null) => void
  setMenuOpen: (open: boolean) => void
}

export const useWorld = create<WorldState>((set, get) => ({
  theme: initialTheme(),
  soundOn: false,
  introDone: false,
  activeSection: 'home',
  openProject: null,
  menuOpen: false,
  toggleTheme: () => {
    const next = get().theme === 'void' ? 'paper' : 'void'
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.dataset.theme = next
    try {
      localStorage.setItem('shreyash-theme', next)
    } catch {
      /* private mode */
    }
    window.setTimeout(() => root.classList.remove('theme-transition'), 700)
    set({ theme: next })
  },
  setSound: (on) => set({ soundOn: on }),
  finishIntro: () => set({ introDone: true }),
  setActiveSection: (id) => set({ activeSection: id }),
  setOpenProject: (id) => set({ openProject: id }),
  setMenuOpen: (open) => set({ menuOpen: open }),
}))