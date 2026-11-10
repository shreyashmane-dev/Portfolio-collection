import React, { useState } from 'react';
import { RESEARCH_NODES } from '../../data/portfolioData';
import type { ResearchNode } from '../../types';
import { useAudio } from '../../context/AudioContext';
import { Activity } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<ResearchNode>(RESEARCH_NODES[0]);
  const { playHover, playClick } = useAudio();

  return (
    <section id="research" className="relative py-28 px-4 sm:px-8 w-full border-t border-[var(--border-color)]">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-2 tracking-wider">
            <span>SECTION // 07</span>
            <span>-</span>
            <span className="font-jp">研究所</span>
            <span>-</span>
            <span>CURRENT RESEARCH &amp; EXPLORATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)]">
            RESEARCH LAB &amp; <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-blue)] to-[#00E5FF]">
              FRONTIER EXPERIMENTS
            </span>
          </h2>
          <p className="text-sm font-heading text-[var(--text-secondary)] mt-3 max-w-xl">
            Active technical investigations into multi-agent consensus, 3D spatial interfaces, TinyML on embedded silicon, and shader-driven interaction design.
          </p>
        </div>

        {/* Futuristic Research Lab Cockpit Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: Research Modules */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {RESEARCH_NODES.map((node) => {
              const isSelected = activeNode.code === node.code;
              return (
                <div
                  key={node.code}
                  onClick={() => {
                    playClick();
                    setActiveNode(node);
                  }}
                  onMouseEnter={() => {
                    playHover();
                    setActiveNode(node);
                  }}
                  className={`p-6 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[var(--bg-elevated)] border-[var(--accent-red)] shadow-[0_0_20px_var(--border-glow)]'
                      : 'glass-card hover:border-[var(--accent-blue)]'
                  }`}
                >
                  {/* Active Indicator Accent Line */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-blue)]" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[var(--accent-red)]">
                      {node.code}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                        node.status === 'EXPERIMENTING'
                          ? 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border-[var(--accent-red)]/30'
                          : node.status === 'INTEGRATING'
                          ? 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border-[var(--accent-blue)]/30'
                          : 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-[var(--text-primary)] mb-2">
                    {node.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                    {node.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {node.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Lab Diagnostic Terminal */}
          <div className="lg:col-span-5 sticky top-28 text-left">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-[var(--border-color)] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              {/* Corner Cyber Ticks */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-red)]" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)]" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-blue)]" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-blue)]" />

              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                  <Activity className="w-4 h-4 text-[var(--accent-red)]" />
                  <span>DIAGNOSTIC READOUT // 実験記録</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--accent-blue)]">
                  {activeNode.code}
                </span>
              </div>

              {/* Terminal Code Readout */}
              <div className="font-mono text-xs text-[var(--text-secondary)] space-y-2 mb-6">
                <div>&gt; QUERYING LAB SUITE NODE [{activeNode.code}]...</div>
                <div>&gt; DESIGNATION: <span className="text-[var(--text-primary)] font-bold">{activeNode.title}</span></div>
                <div>&gt; CLASSIFICATION: <span className="text-[var(--accent-blue)]">{activeNode.kanji}</span></div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-heading text-[var(--text-primary)] leading-relaxed mb-6">
                {activeNode.readout}
              </div>

              {/* Research Tags */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                  CORE TECHNICAL INVESTIGATIONS
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeNode.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer status */}
              <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                <span>LAB PROTOCOL: 05-ALPHA</span>
                <span className="font-jp text-[var(--accent-blue)]">研究進行中</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
