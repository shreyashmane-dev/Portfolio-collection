import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { Compass, ArrowDown } from 'lucide-react';

interface ArchivePortalTriggerProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export const ArchivePortalTrigger: React.FC<ArchivePortalTriggerProps> = ({ onUnlock, isUnlocked }) => {
  const { playHover, playClick } = useAudio();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    playClick();
    onUnlock();
  };

  return (
    <div className="relative my-20 py-12 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center border-t border-b border-[var(--border-color)]">
      {/* Section Subhead & Kanji */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-3 tracking-widest uppercase">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
        <span className="font-jp">秘匿記録開放</span>
        <span>//</span>
        <span>DEEP ARCHIVE PORTAL</span>
      </div>

      <h3 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[var(--text-primary)] mb-3">
        THERE&apos;S MORE TO THE STORY
      </h3>

      <p className="text-sm sm:text-base font-heading text-[var(--text-secondary)] max-w-xl mb-8">
        10 projects are only the beginning. Discover everything I&apos;ve built across AI agents, embedded hardware, security analyzers, and web engines.
      </p>

      {/* The Central Portal Trigger Button - Solid, crisp, no transformation */}
      <div className="relative">
        <button
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovered(true);
            playHover();
          }}
          onMouseLeave={() => setIsHovered(false)}
          className={`px-8 sm:px-12 py-5 rounded-2xl border-2 transition-colors flex flex-col sm:flex-row items-center gap-4 cursor-pointer ${
            isHovered
              ? 'border-[var(--accent-red)] bg-[var(--bg-elevated)]'
              : 'border-[var(--border-color)] bg-[var(--glass-bg)]'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-red)]/15 border border-[var(--accent-red)]/30 flex items-center justify-center text-[var(--accent-red)]">
            <Compass className="w-6 h-6" />
          </div>

          <div className="flex flex-col text-center sm:text-left">
            <span className="font-display font-black text-base sm:text-lg tracking-wider text-[var(--text-primary)]">
              {isUnlocked ? 'ARCHIVE DECLASSIFIED // BROWSE MATRIX' : 'UNLOCK THE COMPLETE ARCHIVE'}
            </span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              +34 ADDITIONAL REPOSITORIES &amp; EXPERIMENTS
            </span>
          </div>

          <div className="px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-blue)] font-bold">
            44 TOTAL
          </div>
        </button>
      </div>

      {isUnlocked && (
        <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[var(--accent-blue)]">
          <ArrowDown className="w-4 h-4" />
          <span>FULL ARCHIVE ACTIVE BELOW</span>
        </div>
      )}
    </div>
  );
};
