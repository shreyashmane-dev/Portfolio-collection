import React, { useState, useRef } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import type { ProjectItem, ArchiveCategory, RankFilter } from '../../types';
import { ProjectArtwork } from '../common/AnimeVisuals';
import { ProjectModal } from './ProjectModal';
import { ArchivePortalTrigger } from './ArchivePortalTrigger';
import { useAudio } from '../../context/AudioContext';
import { Search, ExternalLink, Info, ArrowUp, Sparkles, Eye } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

const CATEGORIES: ArchiveCategory[] = [
  'All Projects',
  'Artificial Intelligence',
  'Machine Learning',
  'Cybersecurity',
  'Web Applications',
  'Mobile Applications',
  'Developer Tools',
  'Systems Engineering',
  'IoT & Hardware',
  'Academic & Experiments'
];

const RANK_FILTERS: RankFilter[] = ['All', 'Top 10', '11–20', '21–30', '31–44'];

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isArchiveUnlocked, setIsArchiveUnlocked] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ArchiveCategory>('All Projects');
  const [activeRank, setActiveRank] = useState<RankFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'ranking' | 'alpha' | 'tech'>('ranking');
  const archiveRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useAudio();

  // Top 10 Featured Projects (Ranks 1 to 10)
  const top10Projects = PROJECTS_DATA.slice(0, 10);

  const handleUnlockArchive = () => {
    setIsArchiveUnlocked(true);
  };

  // Filter and sort for the Archive view
  const filteredArchive = PROJECTS_DATA.filter((p) => {
    // Category filter
    const matchesCategory = activeCategory === 'All Projects' || p.category === activeCategory;

    // Rank filter
    let matchesRank = true;
    if (activeRank === 'Top 10') matchesRank = p.rank >= 1 && p.rank <= 10;
    else if (activeRank === '11–20') matchesRank = p.rank >= 11 && p.rank <= 20;
    else if (activeRank === '21–30') matchesRank = p.rank >= 21 && p.rank <= 30;
    else if (activeRank === '31–44') matchesRank = p.rank >= 31 && p.rank <= 44;

    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.codeName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q);

    return matchesCategory && matchesRank && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'alpha') return a.title.localeCompare(b.title);
    if (sortBy === 'tech') return (a.techStack[0] || '').localeCompare(b.techStack[0] || '');
    return a.rank - b.rank;
  });

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 w-full border-t border-[var(--border-color)]">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ========================================================================= */}
        {/* SECTION 1: TOP 10 FEATURED PROJECTS SHOWCASE                              */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-2 tracking-wider">
            <span>SECTION // 05</span>
            <span>-</span>
            <span className="font-jp">最高序列</span>
            <span>-</span>
            <span>TOP 10 FEATURED CREATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-display font-black tracking-tight text-[var(--text-primary)]">
            THE PINNACLE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-blue)] to-[#00E5FF]">
              TEN CREATIONS
            </span>
          </h2>
          <p className="text-sm sm:text-base font-heading text-[var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            The highest-priority engineering works. Each system represents an exploration into cognitive intelligence, developer ergonomics, medical vision, or autonomous IoT hardware.
          </p>
        </div>

        {/* Top 10 Featured Grid — Each with distinct personality */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {top10Projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl glass-card flex flex-col justify-between overflow-hidden text-left relative transition-colors duration-200 border border-[var(--border-color)] hover:border-[var(--accent-red)]"
            >
              {/* Artwork Header */}
              <div>
                <ProjectArtwork
                  title={project.title}
                  category={project.category}
                  number={project.number}
                  accentColor={project.accentColor}
                />

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)]">
                      RANK #{project.rank}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase border"
                      style={{
                        borderColor: project.accentColor,
                        backgroundColor: `${project.accentColor}15`,
                        color: project.accentColor,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-red)] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Highlights preview */}
                  {project.features && project.features[0] && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--accent-blue)]">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span className="truncate">{project.features[0]}</span>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--text-secondary)]">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0 mt-auto flex items-center justify-between border-t border-[var(--border-color)]/60 pt-4">
                <button
                  onClick={() => {
                    playClick();
                    setSelectedProject(project);
                  }}
                  onMouseEnter={playHover}
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>INSPECT DEEP</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    aria-label={`GitHub repo for ${project.title}`}
                    className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-red)] hover:border-[var(--accent-red)] transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      aria-label={`Live demo for ${project.title}`}
                      className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: THE SPECIAL TRIGGER — "UNLOCK THE COMPLETE ARCHIVE"           */}
        {/* ========================================================================= */}
        <ArchivePortalTrigger
          onUnlock={handleUnlockArchive}
          isUnlocked={isArchiveUnlocked}
        />

        {/* ========================================================================= */}
        {/* SECTION 3: THE COMPLETE INTERACTIVE ARCHIVE (ALL 44 PROJECTS)              */}
        {/* ========================================================================= */}
        {isArchiveUnlocked && (
          <div
            ref={archiveRef}
            className="mt-16 pt-16 border-t-2 border-[var(--border-color)]"
          >
            {/* Archive Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-blue)] mb-2 tracking-widest uppercase">
                  <span>DECLASSIFIED ARCHIVE // 44 REPOSITORIES</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-display font-black text-[var(--text-primary)]">
                  COMPLETE ARCHIVE MATRIX
                </h3>
                <p className="text-xs sm:text-sm font-heading text-[var(--text-secondary)] mt-2">
                  All 44 repositories from{' '}
                  <a
                    href="https://github.com/shreyashmane-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[var(--accent-red)] font-semibold"
                  >
                    @shreyashmane-dev
                  </a>{' '}
                  categorized and ranked.
                </p>
              </div>

              {/* Working Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 44 projects by name or stack..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-red)] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[var(--text-secondary)] hover:text-white"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>

            {/* Rank Filter Segmented Control */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 text-left">
              <span className="text-xs font-mono text-[var(--text-secondary)] mr-2 shrink-0">
                RANK SEGMENT:
              </span>
              {RANK_FILTERS.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    playClick();
                    setActiveRank(r);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
                    activeRank === r
                      ? 'bg-[var(--accent-blue)] text-white font-bold shadow-[0_0_12px_rgba(57,123,255,0.4)]'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Category Filters Grid */}
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[var(--border-color)] text-left">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === 'All Projects'
                    ? PROJECTS_DATA.length
                    : PROJECTS_DATA.filter((p) => p.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      playClick();
                      setActiveCategory(cat);
                    }}
                    onMouseEnter={playHover}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                      isActive
                        ? 'bg-[var(--accent-red)] text-white border-[var(--accent-red)] shadow-[0_0_12px_var(--border-glow)] font-bold'
                        : 'bg-[var(--glass-bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--accent-red)]/40'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-bold">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sorting & Result Readout Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[var(--text-secondary)] mb-8 gap-4 text-left">
              <div>
                SHOWING <strong className="text-[var(--text-primary)]">{filteredArchive.length}</strong> OF{' '}
                <strong className="text-[var(--text-primary)]">{PROJECTS_DATA.length}</strong> REPOSITORIES
              </div>

              <div className="flex items-center gap-2">
                <span>SORT BY:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'ranking' | 'alpha' | 'tech')}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-red)]"
                >
                  <option value="ranking">Portfolio Rank (1 &rarr; 44)</option>
                  <option value="alpha">Alphabetical (A &rarr; Z)</option>
                  <option value="tech">Primary Technology</option>
                </select>
              </div>
            </div>

            {/* Complete Archive Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArchive.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-2xl glass-card flex flex-col justify-between text-left group hover:border-[var(--accent-blue)] transition-all duration-300 relative"
                >
                  {/* Top line: Rank & Category */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[var(--accent-red)]">
                          #{project.rank < 10 ? `0${project.rank}` : project.rank}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                          // {project.category}
                        </span>
                      </div>
                      <span
                        className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase border"
                        style={{
                          borderColor: project.accentColor,
                          backgroundColor: `${project.accentColor}15`,
                          color: project.accentColor,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h4 className="font-heading font-extrabold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors mb-1.5">
                      {project.title}
                    </h4>

                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-3">
                      {project.tagline}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between mt-auto">
                    <button
                      onClick={() => {
                        playClick();
                        setSelectedProject(project);
                      }}
                      onMouseEnter={playHover}
                      className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>DETAILS</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repo for ${project.title}`}
                      className="p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-red)] hover:border-[var(--accent-red)] transition-all"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Collapse / Back to Top Button */}
            <div className="mt-14 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  playClick();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'auto' });
                }}
                className="px-6 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-xs font-mono font-bold text-[var(--text-primary)] hover:border-[var(--accent-red)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
                <span>RETURN TO TOP 10 FEATURED</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Inspection Modal Overlay */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
