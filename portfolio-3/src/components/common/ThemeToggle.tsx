import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { playHover } = useAudio();

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={playHover}
      aria-label={`Switch to ${theme === 'void' ? 'PAPER (Light)' : 'VOID (Dark)'} Mode`}
      className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md transition-all duration-300 hover:border-[var(--accent-red)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-red)]"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {theme === 'void' ? (
          <Moon className="w-3.5 h-3.5 text-[#FF304F] transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#D6283D] transition-transform duration-300 group-hover:rotate-90" />
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider font-semibold">
        <span className="text-[var(--text-primary)]">
          {theme === 'void' ? 'VOID' : 'PAPER'}
        </span>
        <span className="text-[9px] text-[var(--text-secondary)] font-jp opacity-70">
          {theme === 'void' ? '深淵' : '白紙'}
        </span>
      </div>

      {/* Decorative cyber corner tick */}
      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[var(--accent-red)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};
