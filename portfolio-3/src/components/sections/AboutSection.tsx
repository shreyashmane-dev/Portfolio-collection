import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { GraduationCap, BrainCircuit, Lightbulb, Cpu } from 'lucide-react';
import aboutCharacter from '../../assets/anime/about-character.jpg';

export const AboutSection: React.FC = () => {
  const { playHover } = useAudio();

  const developerAttributes = [
    { label: 'System Architecture', score: 92, kanji: '構造', color: 'var(--accent-red)' },
    { label: 'AI & Cognitive Engineering', score: 94, kanji: '知能', color: 'var(--accent-blue)' },
    { label: 'Creative WebGL & 3D UI', score: 88, kanji: '空間', color: '#00E5FF' },
    { label: 'Hardware & IoT Systems', score: 86, kanji: '実機', color: 'var(--accent-red)' },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 w-full border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-2 tracking-wider">
            <span>SECTION // 03</span>
            <span>-</span>
            <span className="font-jp">人物像</span>
            <span>-</span>
            <span>CHARACTER PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)]">
            NOT JUST A DEVELOPER. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-blue)]">
              AN EXPLORER.
            </span>
          </h2>
        </div>

        {/* Anime Character Introduction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Real Anime Character Artwork Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-elevated)] p-3 shadow-xl">
              <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)]">
                <span>SPEC // ARCH-05</span>
                <span className="text-[var(--accent-red)] font-bold">VERIFIED IDENTITY</span>
              </div>

              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-zinc-950">
                <img
                  src={aboutCharacter}
                  alt="Anime Character Portrait"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between pt-3 px-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
                  <span className="font-bold text-[var(--text-primary)]">SHREYASH MANE</span>
                </div>
                <span className="text-[10px] text-[var(--accent-blue)] px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 font-bold">
                  CSE STUDENT
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Progression Stats */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Core Narrative */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card">
              <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-heading mb-4">
                &ldquo;I&apos;m Shreyash Mane, a Computer Science and Engineering student interested in software development, artificial intelligence, creative technology, and building useful digital experiences.&rdquo;
              </p>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-heading">
                I enjoy experimenting with ideas, understanding complex systems, and turning concepts into working products. Whether it&apos;s orchestrating autonomous AI agents, writing micro-controllers for embedded IoT devices, or building interactive web environments, I believe in exploring beyond conventional boundaries.
              </p>
            </div>

            {/* Profile Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education Card */}
              <div
                onMouseEnter={playHover}
                className="p-5 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent-blue)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center border border-[var(--accent-blue)]/20">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">EDUCATION</h3>
                    <div className="font-heading font-bold text-sm text-[var(--text-primary)]">B.Tech in CSE</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-heading">
                  Solid foundations in algorithms, operating systems, and computer architecture.
                </p>
              </div>

              {/* Technical Interests */}
              <div
                onMouseEnter={playHover}
                className="p-5 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent-red)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-red)]/10 text-[var(--accent-red)] flex items-center justify-center border border-[var(--accent-red)]/20">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">INTERESTS</h3>
                    <div className="font-heading font-bold text-sm text-[var(--text-primary)]">AI &amp; Systems</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-heading">
                  Multi-agent workflows, vector databases, and high-performance serverless systems.
                </p>
              </div>

              {/* Development Philosophy */}
              <div
                onMouseEnter={playHover}
                className="p-5 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent-red)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-red)]/10 text-[var(--accent-red)] flex items-center justify-center border border-[var(--accent-red)]/20">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">PHILOSOPHY</h3>
                    <div className="font-heading font-bold text-sm text-[var(--text-primary)]">Clean &amp; Purposeful</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-heading">
                  Deep respect for code craft: avoid bloated shortcuts, build tactile human interfaces.
                </p>
              </div>

              {/* Current Learning */}
              <div
                onMouseEnter={playHover}
                className="p-5 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent-blue)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center border border-[var(--accent-blue)]/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">CURRENT FOCUS</h3>
                    <div className="font-heading font-bold text-sm text-[var(--text-primary)]">Agentic Pipelines</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-heading">
                  Personal AI assistants (Veyra, SOL) and Windows developer toolkits (AnoS).
                </p>
              </div>
            </div>

            {/* Progression Metrics */}
            <div className="p-6 rounded-2xl glass-panel border border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--text-secondary)] tracking-wider">
                  PROGRESSION METRICS // 能力値
                </span>
                <span className="text-[10px] font-mono text-[var(--accent-red)] font-bold">
                  LEVEL 05 // ADVANCED STUDENT
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {developerAttributes.map((attr) => (
                  <div key={attr.label} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--text-primary)] font-medium">{attr.label}</span>
                        <span className="text-[10px] font-jp opacity-50">{attr.kanji}</span>
                      </div>
                      <span className="text-[var(--text-secondary)] font-bold">{attr.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden border border-[var(--border-color)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${attr.score}%`,
                          backgroundColor: attr.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
