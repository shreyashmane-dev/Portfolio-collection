import React, { useState } from 'react';
import { SKILLS_DATA } from '../../data/portfolioData';
import type { SkillItem, SkillCategory } from '../../types';
import { useAudio } from '../../context/AudioContext';
import { Terminal, Code, Cpu, Database, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

const CATEGORIES: { id: SkillCategory; label: string; kanji: string; icon: React.ReactNode }[] = [
  { id: 'PROGRAMMING', label: 'PROGRAMMING', kanji: '言語', icon: <Code className="w-4 h-4" /> },
  { id: 'FRONTEND', label: 'FRONTEND', kanji: '表層', icon: <Cpu className="w-4 h-4" /> },
  { id: 'BACKEND', label: 'BACKEND', kanji: '基盤', icon: <Database className="w-4 h-4" /> },
  { id: 'AI & DEVELOPMENT', label: 'AI & DEVELOPMENT', kanji: '知能', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'TOOLS', label: 'TOOLS', kanji: '道具', icon: <Wrench className="w-4 h-4" /> },
];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('PROGRAMMING');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const { playHover, playClick } = useAudio();

  const filteredSkills = SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-8 w-full border-t border-[var(--border-color)]">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-2 tracking-wider">
            <span>SECTION // 04</span>
            <span>-</span>
            <span className="font-jp">兵装庫</span>
            <span>-</span>
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)]">
            ENGINEERED CAPABILITIES &amp; <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-blue)] to-[#00E5FF]">
              TECHNOLOGY STACK
            </span>
          </h2>
          <p className="text-sm font-heading text-[var(--text-secondary)] mt-3 max-w-xl">
            Selected instruments, languages, and cognitive AI pipelines leveraged to engineer resilient digital systems.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[var(--border-color)]">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat.id);
                  const firstInCat = SKILLS_DATA.find((s) => s.category === cat.id);
                  if (firstInCat) setSelectedSkill(firstInCat);
                }}
                onMouseEnter={playHover}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'bg-[var(--accent-red)] text-white border-[var(--accent-red)] shadow-[0_0_15px_var(--border-glow)]'
                    : 'bg-[var(--glass-bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--accent-red)]/50'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span className="text-[10px] font-jp opacity-70">{cat.kanji}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Main Layout: Interactive Grid + Detail Inspection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: Skills in Active Category */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    playClick();
                    setSelectedSkill(skill);
                  }}
                  onMouseEnter={() => {
                    playHover();
                    setSelectedSkill(skill);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 relative group overflow-hidden border ${
                    isSelected
                      ? 'bg-[var(--bg-elevated)] border-[var(--accent-red)] shadow-[0_0_20px_var(--border-glow)]'
                      : 'glass-card hover:border-[var(--accent-blue)]'
                  }`}
                >
                  {/* Active Indicator Accent Line */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-red)]" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center font-mono font-bold text-sm text-[var(--accent-red)] group-hover:border-[var(--accent-red)] transition-colors">
                        {skill.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-[var(--text-primary)]">
                          {skill.name}
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                          {skill.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 px-2 py-0.5 rounded border border-[var(--accent-blue)]/20">
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-secondary)] opacity-80">
                    <CheckCircle2 className="w-3 h-3 text-[var(--accent-red)]" />
                    <span>{skill.highlights[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Holographic Detail Inspection HUD */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden text-left border border-[var(--border-color)] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              {/* Corner Cyber Ticks */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-red)]" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)]" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-blue)]" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-blue)]" />

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                  <Terminal className="w-4 h-4 text-[var(--accent-red)]" />
                  <span>INSPECTION RADAR // 詳細情報</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--accent-blue)]">
                  STATUS: VERIFIED
                </span>
              </div>

              {/* Title & Badge */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl sm:text-3xl font-display font-black text-[var(--text-primary)]">
                  {selectedSkill.name}
                </h4>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/30 font-semibold">
                  {selectedSkill.level}
                </span>
              </div>

              <div className="text-xs font-mono text-[var(--accent-blue)] mb-4">
                DOMAIN: {selectedSkill.categoryLabel}
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-heading mb-6">
                {selectedSkill.description}
              </p>

              {/* Highlights & Architecture Capabilities */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)] mb-3">
                  PRACTICAL IMPLEMENTATIONS &amp; HIGHLIGHTS
                </h5>
                <div className="flex flex-col gap-2.5">
                  {selectedSkill.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Footer */}
              <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                <span>SHREYASH // ARSENAL</span>
                <span className="font-jp text-[var(--accent-red)]">戦闘配備完了</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
