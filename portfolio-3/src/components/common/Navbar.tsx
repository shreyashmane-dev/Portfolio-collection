import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { AudioToggle } from './AudioToggle';
import { Menu, X } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface NavItem {
  id: string;
  label: string;
  kanji: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'HOME', kanji: '起点' },
  { id: 'about', label: 'ABOUT', kanji: '人物' },
  { id: 'skills', label: 'SKILLS', kanji: '技術' },
  { id: 'projects', label: 'PROJECTS', kanji: '計画' },
  { id: 'journey', label: 'JOURNEY', kanji: '軌跡' },
  { id: 'contact', label: 'CONTACT', kanji: '交信' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { playHover, playClick } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 sm:px-8 ${
          isScrolled
            ? 'backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--border-color)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / SH Monogram */}
          <button
            onClick={() => scrollTo('hero')}
            onMouseEnter={playHover}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Shreyash Portfolio Home"
          >
            <div className="relative w-9 h-9 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center transition-all duration-300 group-hover:border-[var(--accent-red)] group-hover:shadow-[0_0_15px_var(--border-glow)] overflow-hidden">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <path
                  d="M10 12 C10 8 18 8 20 8 C22 8 26 10 26 13 C26 17 20 18 18 20 C14 22 12 25 12 28 C12 32 16 34 20 34 C24 34 28 32 28 29"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-[var(--text-primary)] transition-colors group-hover:stroke-[var(--accent-red)]"
                />
                <line x1="16" y1="9" x2="16" y2="33" stroke="var(--accent-red)" strokeWidth="1.5" />
                <line x1="26" y1="9" x2="26" y2="33" stroke="var(--accent-blue)" strokeWidth="1.5" />
              </svg>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[var(--accent-red)] rounded-bl" />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold tracking-widest text-sm text-[var(--text-primary)]">
                  SHREYASH
                </span>
                <span className="text-[10px] text-[var(--accent-red)] font-mono font-semibold">
                  .EXE
                </span>
              </div>
              <span className="text-[9px] font-jp text-[var(--text-secondary)] tracking-wider">
                超越したコード
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={playHover}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-color)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
                  )}
                  <span>{item.label}</span>
                  <span className="text-[9px] font-jp opacity-50">{item.kanji}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Audio Toggle, Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2">
              <AudioToggle />
              <ThemeToggle />
            </div>

            <div className="sm:hidden">
              <ThemeToggle />
            </div>

            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              onMouseEnter={playHover}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-2 rounded-lg border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-primary)] hover:border-[var(--accent-red)] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[var(--bg-primary)]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 transition-all">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--border-color)]">
            <div className="text-xs font-mono text-[var(--text-secondary)]">
              SYSTEM NAVIGATION // 案内
            </div>
            <AudioToggle />
          </div>

          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-left hover:border-[var(--accent-red)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--accent-red)]">
                    0{idx + 1}
                  </span>
                  <span className="font-heading font-semibold text-lg text-[var(--text-primary)]">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-jp text-[var(--text-secondary)]">
                  {item.kanji}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-[var(--border-color)] text-center text-xs font-mono text-[var(--text-secondary)]">
            SHREYASH — BEYOND THE CODE
          </div>
        </div>
      )}
    </>
  );
};
