"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ArrowUpRight } from "lucide-react";
import { featuredProjects, type Project } from "@/lib/projects";
import { KeyVisual } from "@/components/KeyVisual";
import { StatusTag, DocBadge } from "@/components/StatusTag";
import { TechIcon } from "@/components/TechIcon";
import { pad2, clamp } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function EpisodeVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      rotateX: ((e.clientY - r.top) / r.height - 0.5) * -8,
      rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="panel panel-slash relative overflow-hidden will-change-transform">
      <KeyVisual project={project} className="block h-full max-h-[28vh] w-full min-h-[8rem] text-ink md:max-h-[46vh] md:min-h-[10rem]" />
    </div>
  );
}

function Episode({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="episode absolute inset-0 flex flex-col justify-center px-5 pt-20 md:px-10 md:pt-0"
      style={{ zIndex: index, clipPath: index === 0 ? "none" : "polygon(0 0, -30% 0, -60% 100%, 0 100%)" }}
      data-index={index}
      aria-label={`Featured project ${project.rank}: ${project.name}`}
    >
      <div className="absolute inset-0 bg-base" aria-hidden="true" />
      <div className="halftone pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-25" aria-hidden="true" />
      <span
        className="font-display pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 text-[38vw] leading-none text-stroke opacity-30 md:text-[24vw]"
        aria-hidden="true"
      >
        {pad2(project.rank)}
      </span>

      <div className="relative mx-auto grid w-full max-w-[110rem] grid-cols-1 items-center gap-6 md:grid-cols-[1.15fr_1fr] md:gap-14">
        <div className="episode-copy order-2 md:order-1">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusTag status={project.status} />
            {project.docNeeded && <DocBadge />}
            {project.team && <span className="status-tag">Team Project</span>}
          </div>
          <p className="label mb-2 text-blue">
            EP.{pad2(project.rank)} — {project.tagline}
          </p>
          <h3 className="font-display text-4xl uppercase leading-[0.92] sm:text-5xl lg:text-7xl">{project.name}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted line-clamp-3 md:mt-4 md:line-clamp-none md:text-base">{project.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-muted md:mt-5 md:gap-3">
            {project.tech.map((t) => (
              <span key={t} className="flex items-center gap-1.5 border border-line px-2 py-1" title={t}>
                <TechIcon name={t} size={14} />
                <span className="font-mono text-[0.6rem] uppercase tracking-wide">{t}</span>
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-slash">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
            <Link href={`/projects/${project.slug}`} className="btn-slash btn-red">
              Details <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <EpisodeVisual project={project} />
        </div>
      </div>
    </article>
  );
}

export function Featured() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const count = featuredProjects.length;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const episodes = gsap.utils.toArray<HTMLElement>(".episode", stageRef.current);
      if (reduced) {
        episodes.forEach((ep) => {
          ep.style.position = "relative";
          ep.style.clipPath = "none";
          ep.style.minHeight = "100vh";
        });
        if (stageRef.current) stageRef.current.style.height = "auto";
        return;
      }
      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: () => `+=${count * 90}%`,
        pin: stageRef.current,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const scaled = p * count;
          episodes.forEach((ep, i) => {
            if (i === 0) return;
            const t = clamp(scaled - (i - 1) - 0.55, 0, 1);
            const edge = t * 165 - 30;
            ep.style.clipPath = `polygon(0 0, ${edge}% 0, ${edge - 32}% 100%, 0 100%)`;
            const copy = ep.querySelector(".episode-copy");
            if (copy) gsap.set(copy, { y: (1 - t) * 50, opacity: 0.2 + t * 0.8 });
          });
          const idx = clamp(Math.round(scaled - 0.5), 0, count - 1);
          setCurrent((prev) => (prev === idx ? prev : idx));
        },
      });
      return () => st.kill();
    }, rootRef);
    return () => ctx.revert();
  }, [count]);

  return (
    <section ref={rootRef} id="featured" className="relative" aria-label="Featured projects">
      <div ref={stageRef} className="vh-full relative overflow-hidden">
        <div className="pointer-events-none absolute left-5 top-20 z-[60] md:left-10">
          <p className="label mb-2 text-red">03 / Featured</p>
          <h2 className="font-display text-2xl uppercase tracking-wider text-ink md:text-3xl">
            Selected <span className="text-stroke">Works</span>
          </h2>
          <p className="font-mono text-xs text-muted" aria-live="polite">
            EP.{pad2(current + 1)} <span className="text-line-strong">/ {pad2(count)}</span>
          </p>
          <div className="mt-3 flex gap-1" aria-hidden="true">
            {featuredProjects.map((p, i) => (
              <span key={p.slug} className={`h-[3px] w-5 transition-colors duration-300 ${i <= current ? "bg-blue" : "bg-line"}`} />
            ))}
          </div>
        </div>
        {featuredProjects.map((p, i) => (
          <Episode key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
