import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import { Terminal, Compass, ArrowDown } from 'lucide-react';
import heroCharacter from '../../assets/anime/hero-character.jpg';
import heroCity from '../../assets/anime/hero-city.jpg';

export const HeroSection: React.FC = () => {
  const { playHover, playClick } = useAudio();

  const scrollToSection = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 border-b border-[var(--border-color)]"
    >
      {/* Background Anime Atmospheric City Panorama */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none opacity-25">
        <img
          src={heroCity}
          alt="Anime Cyberpunk City Background"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Monumental Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tactical Header Badge */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
            <span className="text-xs font-mono tracking-widest text-[var(--text-primary)] font-semibold">
              SYSTEM ONLINE // {PERSONAL_INFO.location}
            </span>
            <span className="text-xs font-jp text-[var(--text-secondary)]">
              超越開発者
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter text-[var(--text-primary)] leading-[0.95] mb-5">
            SHREYASH
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] via-[var(--text-primary)] to-[var(--accent-blue)] mt-2">
              BEYOND THE CODE.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl font-heading text-[var(--text-secondary)] font-normal max-w-2xl leading-relaxed mb-8">
            &ldquo;{PERSONAL_INFO.subTagline}&rdquo;
          </p>

          {/* Direct CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection('about')}
              onMouseEnter={playHover}
              className="px-7 py-3.5 rounded-xl bg-[var(--accent-red)] text-white font-mono text-xs sm:text-sm font-bold tracking-wider transition-colors hover:bg-[var(--accent-red)]/90 flex items-center gap-3 cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE MY WORLD</span>
              <span className="font-jp text-xs opacity-75">探索</span>
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={playHover}
              className="px-7 py-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-primary)] font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] flex items-center gap-3 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[var(--accent-blue)]" />
              <span>VIEW 44 PROJECTS</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--accent-blue)] border border-[var(--border-color)]">
                44
              </span>
            </button>
          </div>

          {/* Clean Telemetry Readout Bar */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-6 border-t border-[var(--border-color)] w-full max-w-xl text-left">
            <div>
              <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">CORE DOMAIN</div>
              <div className="text-sm font-mono font-bold text-[var(--text-primary)] mt-1">
                AI &amp; Full-Stack
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">STATUS</div>
              <div className="text-sm font-mono font-bold text-[var(--accent-red)] mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
                Active Explorer
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">REPOSITORIES</div>
              <div className="text-sm font-mono font-bold text-[var(--accent-blue)] mt-1">
                44 Public Repos
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real, High-Quality Anime Character Artwork Framing */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[420px] rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-elevated)] p-3 shadow-2xl">
            {/* Top Tactical Window Bar */}
            <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
                <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)]" />
                <span className="text-[var(--text-primary)] font-bold ml-1">SHREYASH.EXE</span>
              </div>
              <span className="font-semibold text-[var(--accent-blue)]">VERIFIED AVATAR</span>
            </div>

            {/* High-Resolution Real Anime Character Artwork Container */}
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-zinc-950">
              <img
                src={heroCharacter}
                alt="Shreyash - High Quality Anime Character Portrait"
                className="w-full h-full object-cover object-top"
              />

              {/* Gradient Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-70" />

              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white font-semibold">
                IDENTITY // SHREYASH MANE
              </div>

              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg bg-[var(--bg-elevated)]/95 backdrop-blur-md border border-[var(--border-color)] flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
                    SHREYASH MANE
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                    CSE Student &amp; Creative Developer
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[var(--accent-red)]/15 text-[var(--accent-red)] border border-[var(--accent-red)]/40 font-bold">
                  ARCH-05
                </span>
              </div>
            </div>

            {/* Bottom Terminal Telemetry */}
            <div className="flex items-center justify-between pt-2.5 px-2 text-[9px] font-mono text-[var(--text-secondary)]">
              <span>LAT 19.0760° N // LON 72.8777° E</span>
              <span className="font-jp text-[var(--accent-red)] font-semibold">超越したコード</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Bottom Navigation Scroll Pill */}
      <button
        onClick={() => scrollToSection('about')}
        onMouseEnter={playHover}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        aria-label="Scroll to About Section"
      >
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-red)]" />
      </button>
    </section>
  );
};
