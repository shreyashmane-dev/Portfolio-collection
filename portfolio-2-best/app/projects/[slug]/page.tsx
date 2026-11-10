import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Github, ArrowLeft, ArrowRight, ArrowUpRight, FolderGit2, Calendar, ShieldAlert } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";
import { KeyVisual } from "@/components/KeyVisual";
import { StatusTag, DocBadge } from "@/components/StatusTag";
import { TechIcon } from "@/components/TechIcon";
import { pad2 } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shreyash-portfolllio.vercel.app";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };

  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;
  const title = `${project.name} — ${project.tagline}`;
  const description = `${project.name}: ${project.description} Engineered with ${project.tech.slice(0, 4).join(", ")}. Part of Shreyash Mane's portfolio.`;

  return {
    title: project.name,
    description: description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: `${project.name} | Shreyash Mane`,
      description: description.slice(0, 160),
      url: canonicalUrl,
      images: [
        {
          url: `/projects/${project.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.name} — Key Visual & Architecture`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Shreyash Mane`,
      description: description.slice(0, 160),
      images: [`/projects/${project.slug}/opengraph-image`],
    },
    robots: project.docNeeded
      ? {
          index: false,
          follow: true,
        }
      : {
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

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    headline: project.tagline,
    description: project.description,
    codeRepository: project.repo,
    author: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
      sameAs: [site.github, site.linkedin],
    },
    programmingLanguage: project.tech,
    url: `${siteUrl}/projects/${project.slug}`,
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
                    This repository has limited documentation. In keeping with our strict portfolio verification rules, claims are restricted to verified repository metadata and code structure.
                  </p>
                </div>
              </div>
            )}

            {project.note && (
              <p className="mt-4 max-w-xl border-l-2 border-red pl-4 text-sm leading-relaxed text-muted">
                {project.note}
              </p>
            )}

            {/* Technologies */}
            <div className="mt-8">
              <h2 className="label mb-3">Technologies &amp; Architecture</h2>
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
