import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react'
import { useWorld } from '../store/useWorld'
import { nav } from '../config/content'
import { scrollToSection } from '../lib/scroll'
import { blip, startAmbience, stopAmbience } from '../lib/audio'

function Monogram() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
      <rect width="64" height="64" rx="12" fill="var(--surface)" stroke="var(--line)" />
      <path
        d="M14 40c3 4 8 6 13 6 7 0 12-3.5 12-9 0-11-23-7.5-23-17 0-5 4.5-8 10.5-8 4.5 0 8.5 1.7 11 4.7"
        fill="none" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round"
      />
      <path d="M40 18v28M40 31h11M51 18v28" fill="none" stroke="var(--red)" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Nav() {
  const { theme, toggleTheme, soundOn, setSound, activeSection, menuOpen, setMenuOpen, introDone } = useWorld()
  const [scrolled, setScrolled] = useState(false)
  const [wipe, setWipe] = useState<null | 'void' | 'paper'>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (id: string) => {
    blip('click')
    setMenuOpen(false)
    scrollToSection(id)
  }

  const onSound = () => {
    const next = !soundOn
    setSound(next)
    if (next) {
      startAmbience()
      blip('click')
    } else {
      stopAmbience()
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={introDone ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'glass shadow-[0_8px_32px_rgba(0,0,0,0.18)]' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Primary">
          <button onClick={() => go('home')} className="flex items-center gap-3" aria-label="Shreyash — home">
            <Monogram />
            <span className="hidden font-display text-sm tracking-[0.2em] sm:block">SHREYASH</span>
          </button>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  onMouseEnter={() => blip('hover')}
                  className={`relative py-2 font-mono text-[11px] tracking-[0.25em] transition-colors ${
                    activeSection === item.id ? 'text-ink' : 'text-ink2 hover:text-ink'
                  }`}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-red"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onSound}
              aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
              aria-pressed={soundOn}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                soundOn ? 'border-red text-red' : 'border-line text-ink2 hover:text-ink'
              }`}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            <button
              onClick={() => {
                const next = theme === 'void' ? 'paper' : 'void'
                setWipe(next)
                toggleTheme()
                blip('transition')
                window.setTimeout(() => setWipe(null), 850)
              }}
              aria-label={theme === 'void' ? 'Switch to Paper light theme' : 'Switch to Void dark theme'}
              className="relative flex h-9 w-[64px] items-center rounded-full border border-line bg-glass px-1"
            >
              <motion.span
                className="absolute flex h-7 w-7 items-center justify-center rounded-full"
                animate={{ x: theme === 'void' ? 0 : 28, rotate: theme === 'void' ? 0 : 180 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{ background: theme === 'void' ? 'var(--blue)' : 'var(--red)' }}
              >
                {theme === 'void' ? <Moon size={13} color="#fff" /> : <Sun size={13} color="#fff" />}
              </motion.span>
              <span className="flex w-full justify-between px-1.5 text-ink2">
                <Moon size={11} className={theme === 'void' ? 'opacity-0' : ''} />
                <Sun size={11} className={theme === 'paper' ? 'opacity-0' : ''} />
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {wipe && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[95]"
            style={{ background: wipe === 'paper' ? '#F5F3EF' : '#08090C' }}
            initial={{ clipPath: 'circle(0% at calc(100% - 76px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 76px) 32px)' }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[140] flex flex-col bg-bg/[0.97] backdrop-blur-xl"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 32px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 32px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Monogram />
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => go(item.id)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="group flex items-baseline gap-4 py-1.5"
                >
                  <span className="font-mono text-[10px] text-red">0{i + 1}</span>
                  <span className={`font-display text-4xl uppercase tracking-wide transition-colors ${activeSection === item.id ? 'text-red' : 'group-hover:text-red'}`}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <p className="px-8 pb-10 font-jp text-[10px] tracking-[0.5em] text-ink2">コードの向こう側へ</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}