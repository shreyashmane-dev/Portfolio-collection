import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { projects, Project } from "@/data/projects"
import { TechIcon } from "@/components/icons/TechIcon"
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder"
import { Navbar } from "@/components/nav/Navbar"
import { GithubIcon } from "@/components/icons/CustomIcons"
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  ShieldAlert,
  ExternalLink
} from "lucide-react"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.title} // Shreyash Mane Portfolio`,
    description: project.description
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (projectIndex === -1) {
    notFound()
  }

  const project: Project = projects[projectIndex]
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto w-full px-4 md:px-8 pt-32 pb-20 flex-1">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/#featured"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--ink-dim)] hover:text-[var(--red)] transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO ARCHIVE MATRIX</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="border-b border-[var(--line)] pb-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[var(--red)] px-2.5 py-1 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-tl">
                EPISODE #{project.rank.toString().padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-[var(--ink-dim)] uppercase tracking-wider">
                {"//"} {project.subtitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.docsNeeded && (
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 clip-notch-tl">
                  <AlertCircle size={14} />
                  Documentation Needed
                </span>
              )}

              <span className="px-3 py-1 bg-[var(--blue)]/10 border border-[var(--blue)]/30 text-[var(--blue)] font-mono text-xs uppercase tracking-wider clip-notch-br">
                STATUS: {project.status.toUpperCase()}
              </span>
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[var(--ink)] tracking-tight uppercase">
            {project.title}
          </h1>
        </div>

        {/* Ownership Verification Alert for Recordly (Rank 37) */}
        {project.ownershipNote && (
          <div className="mb-8 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400 font-mono text-xs flex items-center gap-3">
            <ShieldAlert size={18} className="flex-shrink-0" />
            <span>{project.ownershipNote}</span>
          </div>
        )}

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Specifications, description & tech */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-mono text-xs text-[var(--red)] uppercase tracking-widest font-bold mb-3">
                01 // OVERVIEW
              </h2>
              <p className="font-mono text-base md:text-lg text-[var(--ink)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technical Architecture */}
            <div>
              <h2 className="font-mono text-xs text-[var(--blue)] uppercase tracking-widest font-bold mb-3">
                02 // TECHNOLOGIES & RUNTIMES
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.tech.map((t) => (
                  <div
                    key={t}
                    className="p-3 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-tl flex items-center gap-2.5 font-mono text-xs text-[var(--ink)]"
                  >
                    <TechIcon name={t} size={16} className="text-[var(--blue)]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Labels and Categories */}
            <div>
              <h2 className="font-mono text-xs text-[var(--ink-dim)] uppercase tracking-widest font-bold mb-3">
                03 // CLASSIFICATION LABELS
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.labels.map((lbl) => (
                  <span
                    key={lbl}
                    className="px-3 py-1 bg-[var(--bg-2)] border border-[var(--line)] clip-notch-br font-mono text-xs text-[var(--ink-dim)]"
                  >
                    {lbl}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--red)] hover:bg-[var(--red-hover)] text-white font-mono text-xs uppercase tracking-wider font-semibold clip-notch-tl transition-colors"
              >
                <GithubIcon size={16} />
                <span>Open Source Repository</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Blueprint Placeholder */}
          <div className="lg:col-span-5">
            <ProjectPlaceholder
              title={project.title}
              rank={project.rank}
              slug={project.slug}
              className="min-h-[420px]"
            />
          </div>
        </div>

        {/* Previous / Next Project Pagination */}
        <div className="border-t border-[var(--line)] pt-8 flex items-center justify-between gap-4 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-[var(--ink-dim)] hover:text-[var(--blue)] transition-colors group text-left"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[var(--ink-dim)]">PREVIOUS ENTRY</div>
                <div className="font-bold text-[var(--ink)] group-hover:text-[var(--blue)]">{prevProject.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-[var(--ink-dim)] hover:text-[var(--blue)] transition-colors group text-right"
            >
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[var(--ink-dim)]">NEXT ENTRY</div>
                <div className="font-bold text-[var(--ink)] group-hover:text-[var(--blue)]">{nextProject.title}</div>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <footer className="border-t border-[var(--line)] py-6 px-4 md:px-8 text-center font-mono text-xs text-[var(--ink-dim)]">
        SHREYASH MANE // EPISODE {project.rank} SPECIFICATION
      </footer>
    </div>
  )
}
