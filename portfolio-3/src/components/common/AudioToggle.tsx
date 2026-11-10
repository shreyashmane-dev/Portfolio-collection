import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const { isMuted, toggleMute, playHover } = useAudio();

  return (
    <button
      onClick={toggleMute}
      onMouseEnter={playHover}
      aria-label={isMuted ? 'Enable Audio Ambience' : 'Mute Audio Ambience'}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md transition-all duration-300 hover:border-[var(--accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)]"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
        )}
      </div>

      <span className="text-[11px] font-mono tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
        {isMuted ? 'AUDIO OFF' : 'AUDIO ON'}
      </span>

      {/* Live frequency equalizer bars when sound is ON */}
      {!isMuted && (
        <div className="flex items-end gap-0.5 h-2.5 ml-0.5" aria-hidden="true">
          <span className="w-0.5 bg-[var(--accent-blue)] rounded-full" style={{ height: '60%' }} />
          <span className="w-0.5 bg-[var(--accent-blue)] rounded-full" style={{ height: '100%' }} />
          <span className="w-0.5 bg-[var(--accent-blue)] rounded-full" style={{ height: '40%' }} />
        </div>
      )}
    </button>
  );
};
