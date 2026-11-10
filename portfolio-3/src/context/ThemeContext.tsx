import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode } from '../types';
import { audio } from '../utils/audio';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shreyash_portfolio_theme') as ThemeMode;
      if (saved === 'void' || saved === 'paper') return saved;
    }
    return 'void';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shreyash_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    audio.playThemeSwitch();
    const nextTheme: ThemeMode = theme === 'void' ? 'paper' : 'void';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning: false }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
