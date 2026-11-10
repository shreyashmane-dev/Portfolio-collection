import React, { createContext, useContext, useState } from 'react';
import { audio } from '../utils/audio';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playGlitch: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audio.setMuted(next);
  };

  const playHover = () => audio.playHover();
  const playClick = () => audio.playClick();
  const playGlitch = () => audio.playGlitch();

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playGlitch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
