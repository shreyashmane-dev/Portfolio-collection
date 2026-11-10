import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Github, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import { KeyVisual } from "@/components/KeyVisual";
import { StatusTag, DocBadge } from "@/components/StatusTag";
import { TechIcon } from "@/components/TechIcon";
import { pad2 } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    if (!project) return { title: "Project not found" };
    return {
      title: project.name,
      description: project.description,
      openGraph: { title: `${project.name} — Shreyash Mane`, description: project.description },
    };
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    codeRepository: project.repo,
    author: { "@type": "Person", name: "Shreyash Mane" },
    programmingLanguage: project.tech,
  };

  return (
    <main id="main" className="relative min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[100rem] px-5 pb-24 md:px-10">
        <Link href="/#archive" className="label inline-flex items-center gap-2 transition-colors hover:text-blue">
          <ArrowLeft size={13} aria-hidden="true" /> Back to archive
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusTag status={project.status} />
              {project.docNeeded && <DocBadge />}
              {project.thirdParty && <span className="status-tag">Upstream Project</span>}
              {project.team && <span className="status-tag">Team Project</span>}
              <span className="status-tag">{project.featured ? "Featured" : "Archive"} / {pad2(project.rank)}</span>
            </div>
            <p className="label mt-8 text-blue">{project.tagline}</p>
            <h1 className="font-display mt-2 text-5xl uppercase leading-[0.92] md:text-7xl">{project.name}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{project.description}</p>
            {project.note && (
              <p className="mt-4 max-w-xl border-l-2 border-red pl-4 text-sm leading-relaxed text-muted">{project.note}</p>
            )}

            <div className="mt-8">
              <p className="label mb-3">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.length > 0 ? (
                  project.tech.map((t) => (
                    <span key={t} className="flex items-center gap-2 border border-line px-3 py-2">
                      <TechIcon name={t} size={15} />
                      <span className="font-mono text-xs">{t}</span>
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-xs text-muted">Not documented</span>
                )}
              </div>
            </div>

            <div className="mt-8">
              <p className="label mb-3">Filed under</p>
              <div className="flex flex-wrap gap-2">
                {project.labels.map((l) => (
                  <span key={l} className="border border-blue/40 px-3 py-1.5 font-mono text-xs text-blue">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-slash">
                <Github size={15} aria-hidden="true" /> View repository <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:pt-16">
            <div className="panel panel-slash corner-ticks overflow-hidden">
              <KeyVisual project={project} className="block w-full text-ink" />
            </div>
            <p className="label mt-3 text-right">Designed key visual — no UI capture available</p>
          </div>
        </div>

        <nav className="mt-20 flex items-center justify-between border-t border-line pt-6" aria-label="Project navigation">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="label flex items-center gap-2 transition-colors hover:text-blue">
              <ArrowLeft size={13} aria-hidden="true" /> {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="label flex items-center gap-2 text-right transition-colors hover:text-blue">
              {next.name} <ArrowRight size={13} aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}