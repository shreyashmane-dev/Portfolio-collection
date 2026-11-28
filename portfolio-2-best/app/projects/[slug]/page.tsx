import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Github, ArrowLeft, ArrowRight, ArrowUpRight, ShieldAlert, Code2, UserCheck, Sparkles } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
import { KeyVisual } from "@/components/KeyVisual";
import { StatusTag, DocBadge } from "@/components/StatusTag";
import { TechIcon } from "@/components/TechIcon";
import { pad2 } from "@/lib/utils";

const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };

  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;
  const fullWithTagline = `${project.name} — ${project.tagline}`;
  const title = fullWithTagline.length <= 44 ? fullWithTagline : project.name;
  const rawDescription = `${project.name} by Shreyash Santosh Mane (Shreyash Mane): ${project.description} Stack: ${project.tech.slice(0, 4).join(", ")}.`;
  const description = rawDescription.length > 158 ? `${rawDescription.slice(0, 155).trimEnd()}...` : rawDescription;

  return {
    title,
    description,
    keywords: [
      project.name,
      `${project.name} Shreyash Mane`,
      `${project.name} Shreyash Santosh Mane`,
      `${project.name} GitHub`,
      "Shreyash Mane",
      "Shreyash Santosh Mane",
      "Shreyash Mane portfolio",
      "Shreyash Mane projects",
      ...project.tech,
      ...project.labels,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: `${project.name} by Shreyash Mane`,
      description,
      url: canonicalUrl,
      siteName: "Shreyash Mane Portfolio",
      images: [
        {
          url: `/projects/${project.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.name} — Architecture & Details by Shreyash Santosh Mane`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Shreyash Mane`,
      description,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  // Related projects by matching technology or label
  const relatedProjects = projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        (p.labels.some((l) => project.labels.includes(l)) ||
          p.tech.some((t) => project.tech.includes(t)))
    )
    .slice(0, 3);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    headline: `${project.name} — ${project.tagline}`,
    description: project.description,
    codeRepository: project.repo,
    url: `${siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: site.name,
      alternateName: site.fullName,
      url: siteUrl,
      sameAs: [site.github, site.linkedin],
      jobTitle: "Computer Science & Engineering Student | Developer",
      alumniOf: site.college,
    },
    maintainer: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    programmingLanguage: project.tech,
    keywords: [project.name, ...project.tech, ...project.labels].join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Project Archive",
        item: `${siteUrl}/#archive`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteUrl}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <main id="main" className="relative min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[100rem] px-5 pb-24 md:px-10">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#archive" className="transition-colors hover:text-ink">
                Archive
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink" aria-current="page">
              {project.name}
            </li>
          </ol>
        </nav>

        <Link href="/#archive" className="label inline-flex items-center gap-2 transition-colors hover:text-blue">
          <ArrowLeft size={13} aria-hidden="true" /> Back to Project Archive
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusTag status={project.status} />
              {project.docNeeded && <DocBadge />}
              {project.thirdParty && <span className="status-tag">Upstream Project</span>}
              {project.team && <span className="status-tag">Team Project</span>}
              <span className="status-tag">
                {project.featured ? "Featured" : "Archive"} / {pad2(project.rank)}
              </span>
            </div>

            <p className="label mt-8 text-blue">{project.tagline}</p>
            <h1 className="font-display mt-2 text-5xl uppercase leading-[0.92] md:text-7xl">{project.name}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{project.description}</p>

            {project.docNeeded && (
              <div className="mt-6 flex items-start gap-3 border border-red/40 bg-red/5 p-4 text-sm text-ink">
                <ShieldAlert size={18} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-red">Documentation Under Active Development</p>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    This repository is under active development. Project architecture and codebase are actively maintained by Shreyash Mane on GitHub.
                  </p>
                </div>
              </div>
            )}

            {project.note && (
              <p className="mt-4 max-w-xl border-l-2 border-red pl-4 text-sm leading-relaxed text-muted">
                {project.note}
              </p>
            )}

            {/* Developer Authorship Card */}
            <div className="mt-8 border border-line bg-surface/50 p-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue">
                <UserCheck size={14} aria-hidden="true" />
                <span>Developer &amp; Authorship</span>
              </div>
              <div className="mt-2 text-sm text-ink font-medium">
                Engineered by <span className="text-blue font-bold">{site.fullName}</span> ({site.name})
              </div>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                Computer Science &amp; Engineering Student at {site.college} ({site.university}).
                Specializing in AI systems, full-stack web applications, and developer tools.
              </p>
              <div className="mt-3 flex items-center gap-3 font-mono text-xs">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-blue flex items-center gap-1"
                >
                  <Github size={12} aria-hidden="true" /> GitHub Profile
                </a>
                <span className="text-line">|</span>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-blue"
                >
                  LinkedIn
                </a>
                <span className="text-line">|</span>
                <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-blue">
                  Contact
                </a>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-8">
              <h2 className="label mb-3 flex items-center gap-2">
                <Code2 size={13} aria-hidden="true" />
                <span>Technologies &amp; Architecture</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.length > 0 ? (
                  project.tech.map((t) => (
                    <span key={t} className="flex items-center gap-2 border border-line px-3 py-2">
                      <TechIcon name={t} size={15} />
                      <span className="font-mono text-xs">{t}</span>
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-xs text-muted">Not documented in public README</span>
                )}
              </div>
            </div>

            {/* Classification */}
            <div className="mt-8">
              <h2 className="label mb-3">Domain Classification</h2>
              <div className="flex flex-wrap gap-2">
                {project.labels.map((l) => (
                  <span key={l} className="border border-blue/40 px-3 py-1.5 font-mono text-xs text-blue">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Repository Link */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-slash"
                aria-label={`View ${project.name} source code on GitHub`}
              >
                <Github size={15} aria-hidden="true" /> View GitHub Repository <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:pt-16">
            <div className="panel panel-slash corner-ticks overflow-hidden">
              <KeyVisual project={project} className="block w-full text-ink" />
            </div>
            <p className="label mt-3 text-right">Procedural Key Visual Representation</p>

            {/* Related Projects by Shreyash Mane */}
            {relatedProjects.length > 0 && (
              <div className="mt-10 border-t border-line pt-6">
                <h3 className="label mb-3 flex items-center gap-1.5 text-ink">
                  <Sparkles size={12} className="text-blue" aria-hidden="true" />
                  <span>More Projects by Shreyash Mane</span>
                </h3>
                <div className="space-y-2">
                  {relatedProjects.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/projects/${rp.slug}`}
                      className="group flex items-center justify-between border border-line p-3 transition-colors hover:border-blue/50 hover:bg-surface/60"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-sm uppercase text-ink group-hover:text-blue transition-colors truncate">
                          {rp.name}
                        </div>
                        <div className="text-xs text-muted truncate">{rp.tagline}</div>
                      </div>
                      <ArrowUpRight size={14} className="text-muted group-hover:text-blue transition-colors shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project navigation footer */}
        <nav className="mt-20 flex items-center justify-between border-t border-line pt-6" aria-label="Project pagination">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="label flex items-center gap-2 transition-colors hover:text-blue"
              aria-label={`Previous project: ${prev.name}`}
            >
              <ArrowLeft size={13} aria-hidden="true" /> {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="label flex items-center gap-2 text-right transition-colors hover:text-blue"
              aria-label={`Next project: ${next.name}`}
            >
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
