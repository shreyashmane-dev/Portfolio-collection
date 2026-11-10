import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { JourneySection } from './components/sections/JourneySection';
import { ResearchSection } from './components/sections/ResearchSection';
import { ContactSection } from './components/sections/ContactSection';

export const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Main Floating Header Navbar */}
      <Navbar />

      {/* Main Cinematic Sections without scroll-hijacking */}
      <main className="flex-1 w-full">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ResearchSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </ThemeProvider>
  );
}
