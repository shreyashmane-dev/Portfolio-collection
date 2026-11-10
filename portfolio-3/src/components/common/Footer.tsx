import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  const { playHover, playClick } = useAudio();

  const scrollToTop = () => {
    playClick();
    window.scrollTo(0, 0);
  };

  return (
    <footer className="relative w-full py-16 px-4 sm:px-8 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Tier: Monogram & Philosophy */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border-color)] text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <path
                  d="M10 12 C10 8 18 8 20 8 C22 8 26 10 26 13 C26 17 20 18 18 20 C14 22 12 25 12 28 C12 32 16 34 20 34 C24 34 28 32 28 29"
                  stroke="var(--text-primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line x1="16" y1="9" x2="16" y2="33" stroke="var(--accent-red)" strokeWidth="1.5" />
                <line x1="26" y1="9" x2="26" y2="33" stroke="var(--accent-blue)" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="font-display font-black text-lg text-[var(--text-primary)] tracking-wider">
                {PERSONAL_INFO.name.toUpperCase()}
              </div>
              <div className="text-xs font-mono text-[var(--text-secondary)]">
                DESIGNED TO EXPLORE. BUILT TO CREATE.
              </div>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-red)] transition-all"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-blue)] transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onMouseEnter={playHover}
              aria-label="Send Email"
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-red)] transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={playHover}
              aria-label="Back to Top"
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-red)] transition-all flex items-center gap-1.5 text-xs font-mono"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Anime Kanji signature */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-secondary)] gap-3">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="font-jp text-[var(--accent-red)] opacity-80">創造と知能の極致</span>
            <span>//</span>
            <span>SHREYASH.EXE</span>
            <span>//</span>
            <span>AUTONOMOUS ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
