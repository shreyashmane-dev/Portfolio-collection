import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING EXPERIENCE');
  const [subStatus, setSubStatus] = useState('ALLOCATING NEURAL MEMORY...');
  const [isFading, setIsFading] = useState(false);
  const { playHover, playClick } = useAudio();

  useEffect(() => {
    // Check reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatusText('SYSTEM ONLINE');
          setSubStatus('AUTHENTICATION CONFIRMED. ENTERING WORLD.');
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 350);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const capped = next > 100 ? 100 : next;

        if (capped > 25 && capped <= 60) {
          setStatusText('SHREYASH.EXE');
          setSubStatus('COMPILING 3D CORE & REPOSITORIES...');
        } else if (capped > 60 && capped < 100) {
          setStatusText('SYNCHRONIZING REPOSITORIES');
          setSubStatus('LINKING 40+ GITHUB NODES & COGNITIVE HUD...');
        }

        return capped;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    playClick();
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#08090C] text-[#F5F5F5] flex flex-col justify-between p-6 sm:p-12 transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF304F] animate-pulse" />
          <span className="tracking-widest">BOOT SEQUENCE // 起動手順</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline font-mono text-zinc-400">
            LOC: 19.0760° N, 72.8777° E
          </span>
          <button
            onClick={handleSkip}
            onMouseEnter={playHover}
            className="px-3 py-1 rounded border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#FF304F] transition-colors"
          >
            [SKIP BOOT]
          </button>
        </div>
      </div>

      {/* Central Anime Loading Sequence */}
      <div className="flex flex-col items-center justify-center my-auto relative">
        {/* Subtle Anime Light Streaks */}
        <div className="absolute w-[360px] h-1 bg-gradient-to-r from-transparent via-[#FF304F] to-transparent blur-sm animate-pulse" />
        <div className="absolute h-[360px] w-1 bg-gradient-to-b from-transparent via-[#397BFF]/30 to-transparent blur-sm" />

        {/* Japanese Accent Kanji */}
        <div className="text-zinc-600 font-jp text-5xl font-black mb-4 tracking-[0.25em] opacity-40 select-none">
          電脳覚醒
        </div>

        {/* Main Loading Title */}
        <h1 className="text-2xl sm:text-4xl font-display font-black tracking-widest text-center text-white mb-2">
          {statusText}
        </h1>

        <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider text-center max-w-md h-5 mb-8">
          {subStatus}
        </p>

        {/* Progress Bar & Counter */}
        <div className="w-full max-w-md flex flex-col gap-2">
          <div className="flex justify-between items-end text-xs font-mono text-zinc-400">
            <span className="text-[#FF304F]">LOADING EXPERIENCE</span>
            <span className="font-bold text-white text-base">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#FF304F] to-[#397BFF] transition-all duration-100 ease-out shadow-[0_0_12px_#FF304F]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 pt-4 border-t border-white/10 gap-2">
        <div>SHREYASH MANE — BEYOND THE CODE</div>
        <div className="font-jp text-zinc-600">創造と知能の極致</div>
        <div>V2.6.4 // READY</div>
      </div>
    </div>
  );
};
