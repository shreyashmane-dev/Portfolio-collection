"use client"

import React, { useState, useMemo, useRef } from "react"
import Link from "next/link"
import { projects, filterLabels, Label, Project } from "@/data/projects"
import { Flip } from "@/lib/gsap"
import { GithubIcon } from "@/components/icons/CustomIcons"
import { Search, AlertCircle, ShieldAlert, ArrowUpRight } from "lucide-react"

export function Archive() {
  const [selectedLabel, setSelectedLabel] = useState<Label | "All">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Archive projects 11 to 43
  const archiveList = useMemo(() => {
    return projects.filter((p) => !p.featured)
  }, [])

  // Filtered list
  const filteredProjects = useMemo(() => {
    return archiveList.filter((project) => {
      const matchesLabel =
        selectedLabel === "All" || project.labels.includes(selectedLabel)

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesLabel && matchesSearch
    })
  }, [archiveList, selectedLabel, searchQuery])

  // GSAP Flip animation when filter changes
  const handleFilterChange = (label: Label | "All") => {
    if (!gridRef.current) {
      setSelectedLabel(label)
      return
    }

    const state = Flip.getState(gridRef.current.children)
    setSelectedLabel(label)

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
        absolute: false
      })
    })
  }

  return (
    <section
      ref={containerRef}
      id="archive"
      aria-label="Complete Project Archive 11 to 43"
      className="relative w-full bg-[var(--bg)] py-20 px-4 md:px-8 border-b border-[var(--line)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[var(--red)]" />
              05 // CHAPTER : ARCHIVES
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-[var(--ink)] tracking-tight">
              INDEX OF WORKS // 11-43
            </h2>
          </div>

          <div className="font-mono text-xs text-[var(--ink-dim)] flex items-center gap-4">
            <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-tl">
              DISPLAYING <strong className="text-[var(--red)]">{filteredProjects.length}</strong> OF {archiveList.length} REPOSITORIES
            </span>
          </div>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Label Filter Buttons */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="toolbar"
            aria-label="Filter archive projects by label"
          >
            {filterLabels.map((label) => {
              const isSelected = selectedLabel === label
              return (
                <button
                  key={label}
                  onClick={() => handleFilterChange(label)}
                  aria-pressed={isSelected}
                  className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-all duration-200 clip-notch-tl ${
                    isSelected
                      ? "bg-[var(--blue)] border-[var(--blue)] text-white shadow-[0_0_12px_rgba(47,107,255,0.3)]"
                      : "bg-[var(--card-bg)] border-[var(--line)] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:border-[var(--line)]"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-dim)] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or stack..."
              className="w-full pl-9 pr-4 py-2 bg-[var(--card-bg)] border border-[var(--line)] font-mono text-xs text-[var(--ink)] placeholder:text-[var(--ink-dim)] clip-notch-tl focus:outline-none focus:border-[var(--blue)]"
              aria-label="Search archive projects"
            />
          </div>
        </div>

        {/* Projects List Grid */}
        <div
          ref={gridRef}
          className="flex flex-col gap-3"
        >
          {filteredProjects.map((project: Project) => (
            <div
              key={project.slug}
              className="group relative bg-[var(--card-bg)] border border-[var(--line)] p-4 md:p-5 clip-notch-tl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[var(--blue)] hover:translate-x-2 transition-all duration-300"
            >
              {/* Sweep Underline Hover Slash */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--red)] group-hover:w-full transition-all duration-300" />

              {/* Left Details: Rank, Title, Subtitle, Category */}
              <div className="flex items-start md:items-center gap-4 flex-1">
                <span className="font-mono text-xs font-bold text-[var(--red)] min-w-[32px]">
                  #{project.rank.toString().padStart(2, "0")}
                </span>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-display text-xl md:text-2xl text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors tracking-wide"
                    >
                      {project.title}
                    </Link>

                    <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase">
                      {"// "} {project.subtitle}
                    </span>

                    {project.docsNeeded && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-[9px] uppercase tracking-wider clip-notch-tl">
                        <AlertCircle size={10} />
                        Doc Needed
                      </span>
                    )}

                    {project.rank === 37 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-[9px] uppercase tracking-wider clip-notch-tl">
                        <ShieldAlert size={10} />
                        Ownership Under Verification
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-xs text-[var(--ink-dim)] line-clamp-2 md:line-clamp-1">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Right Details: Tech Pills & Repo Action */}
              <div className="flex items-center gap-4 self-end md:self-center">
                <div className="hidden lg:flex items-center gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-[var(--bg)] border border-[var(--line)] font-mono text-[10px] text-[var(--ink-dim)] clip-notch-br"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="font-mono text-[10px] text-[var(--ink-dim)]">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="p-2 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink-dim)] hover:text-[var(--blue)] hover:border-[var(--blue)] transition-colors clip-notch-tl"
                    aria-label={`View details for ${project.title}`}
                  >
                    <ArrowUpRight size={14} />
                  </Link>

                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink-dim)] hover:text-[var(--red)] hover:border-[var(--red)] transition-colors clip-notch-tl"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <GithubIcon size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="p-12 text-center border border-dashed border-[var(--line)] font-mono text-xs text-[var(--ink-dim)]">
              NO CORRESPONDING ARCHIVES MATCHING FILTER CRITERIA
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
