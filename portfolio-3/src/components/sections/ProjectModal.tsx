import React from 'react';
import type { ProjectItem } from '../../types';
import { useAudio } from '../../context/AudioContext';
import { X, ExternalLink, CheckCircle2, Terminal, Layers, AlertCircle, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { ProjectArtwork } from '../common/AnimeVisuals';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { playClick } = useAudio();

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-2xl glass-panel bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Artwork */}
        <div className="relative">
          <ProjectArtwork
            title={project.title}
            category={project.category}
            number={project.number}
            accentColor={project.accentColor}
            className="h-48 sm:h-60"
          />

          {/* Close Button */}
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            aria-label="Close Project Modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-[var(--accent-red)] transition-colors border border-white/20 z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-6 z-10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase border backdrop-blur-md bg-black/80 text-white border-white/20">
              RANK #{project.rank}
            </span>
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase border backdrop-blur-md"
              style={{
                borderColor: project.accentColor,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: project.accentColor,
              }}
            >
              {project.status}
            </span>
            <span className="text-xs font-jp text-white/80 backdrop-blur-md px-2.5 py-1 rounded-full bg-black/60 border border-white/10">
              {project.kanjiTitle}
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
          {/* Mission & Code Name Header */}
          <div className="flex flex-col gap-1 border-b border-[var(--border-color)] pb-4">
            <div className="text-xs font-mono text-[var(--accent-red)] tracking-widest">
              MISSION // {project.missionNumber} — {project.codeName}
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-[var(--text-primary)]">
              {project.title}
            </h3>
            <p className="text-sm font-heading text-[var(--text-secondary)] font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Problem Statement & Solution (if available) */}
          {(project.problemStatement || project.solution) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.problemStatement && (
                <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>THE PROBLEM STATEMENT</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-heading">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-blue)] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>THE ENGINEERING SOLUTION</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-heading">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Narrative Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
              SYSTEM OVERVIEW &amp; SPECIFICATION
            </h4>
            <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-heading">
              {project.description}
            </p>
          </div>

          {/* Key Features (if provided) */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                KEY CAPABILITIES &amp; HIGHLIGHTS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Architectural Details */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[var(--accent-red)]" />
              ARCHITECTURAL DETAILS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.architectureDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-heading text-[var(--text-primary)]"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: project.accentColor }}
                  />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
              TECHNOLOGIES DEPLOYED
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer: GitHub Link & Live Demo */}
          <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 mt-auto">
            <div className="text-xs font-mono text-[var(--text-secondary)]">
              REPOSITORY: <span className="text-[var(--text-primary)] font-bold">{project.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all font-mono text-xs font-semibold flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB REPOSITORY</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[var(--accent-red)] text-white hover:opacity-90 transition-all font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_var(--border-glow)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
