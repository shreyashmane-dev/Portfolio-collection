import React from 'react';
import { JOURNEY_MILESTONES } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import { CheckCircle2, Radio } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { playHover } = useAudio();

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-8 w-full border-t border-[var(--border-color)]">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-2 tracking-wider">
            <span>SECTION // 06</span>
            <span>-</span>
            <span className="font-jp">航海日誌</span>
            <span>-</span>
            <span>LEARNING EXPEDITION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)]">
            THE EVOLUTION OF <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-blue)] to-[#00E5FF]">
              AN ENGINEER
            </span>
          </h2>
          <p className="text-sm font-heading text-[var(--text-secondary)] mt-3 max-w-xl">
            A chronological progression through core computer science, modern full-stack web engineering, physical IoT systems, and the generative AI frontier.
          </p>
        </div>

        {/* Vertical Cinematic Laser Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-[var(--border-color)] flex flex-col gap-12 text-left">
          {JOURNEY_MILESTONES.map((milestone) => {
            const isCompleted = milestone.status === 'CONQUERED';
            return (
              <div
                key={milestone.era}
                onMouseEnter={playHover}
                className="relative group"
              >
                {/* Milestone Node Pin on the Line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-[var(--bg-elevated)] border-[var(--accent-red)] text-[var(--accent-red)]'
                      : 'bg-[var(--bg-elevated)] border-[var(--accent-blue)] text-[var(--accent-blue)]'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Radio className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Milestone Card */}
                <div className="p-6 sm:p-8 rounded-2xl glass-card relative overflow-hidden group-hover:border-[var(--accent-red)]">
                  {/* Subtle Act Badge & Kanji */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--accent-red)] border border-[var(--border-color)]">
                        {milestone.era}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        // {milestone.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-jp text-[var(--text-secondary)]">
                        {milestone.kanji}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                          isCompleted
                            ? 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border-[var(--accent-red)]/30'
                            : 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border-[var(--accent-blue)]/30'
                        }`}
                      >
                        {milestone.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-red)] transition-colors mb-1">
                    {milestone.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--accent-blue)] mb-4">
                    {milestone.subtitle}
                  </div>

                  {/* Narrative Description */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-heading mb-6">
                    {milestone.description}
                  </p>

                  {/* Technologies Explored in this Act */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)]">
                    {milestone.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
