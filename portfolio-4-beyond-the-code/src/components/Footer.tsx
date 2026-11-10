import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { identity, nav } from '../config/content'
import { scrollToSection } from '../lib/scroll'
import { blip } from '../lib/audio'

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg2">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl uppercase tracking-wide">{identity.fullName}</p>
            <p className="mt-2 font-mono text-[9px] tracking-[0.4em] text-ink2">
              DESIGNED TO EXPLORE<span className="text-red">.</span> BUILT TO CREATE<span className="text-blue">.</span>
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => { scrollToSection(n.id); blip('click') }}
                    className="font-mono text-[10px] tracking-[0.25em] text-ink2 transition-colors hover:text-red"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {[
              { href: identity.github, icon: Github, label: 'GitHub' },
              { href: identity.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${identity.email}`, icon: Mail, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink2 transition-colors hover:border-red hover:text-red"
              >
                <s.icon size={15} />
              </a>
            ))}
            <button
              onClick={() => { scrollToSection('home'); blip('transition') }}
              aria-label="Back to top"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-red text-white transition-transform hover:-translate-y-1"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 font-mono text-[9px] tracking-[0.3em] text-ink2 sm:flex-row sm:items-center">
          <p>© 2026 {identity.fullName.toUpperCase()} — ALL SYSTEMS NOMINAL</p>
          <p className="font-jp tracking-[0.4em]">コードの向こう側へ</p>
        </div>
      </div>
    </footer>
  )
}