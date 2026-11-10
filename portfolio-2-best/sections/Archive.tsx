"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ChevronRight } from "lucide-react";
import { archiveProjects } from "@/lib/projects";
import { contentLabels, type ContentLabel } from "@/lib/site";
import { DocBadge } from "@/components/StatusTag";
import { pad2, cx } from "@/lib/utils";

gsap.registerPlugin(Flip, ScrollTrigger);

type Filter = "All Projects" | ContentLabel;
const filters: Filter[] = ["All Projects", ...contentLabels];

export function Archive() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const listRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const firstRender = useRef(true);

  const visible = (labels: ContentLabel[]) => filter === "All Projects" || labels.includes(filter);
  const count = archiveProjects.filter((p) => visible(p.labels)).length;

  const changeFilter = (f: Filter) => {
    if (f === filter) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && listRef.current) {
      flipState.current = Flip.getState(listRef.current.querySelectorAll(".archive-row"));
    }
    setFilter(f);
  };

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced) {
        gsap.from(".archive-row", {
          opacity: 0,
          y: 24,
          stagger: 0.02,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 85%" },
        });
      }
      return;
    }
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.55,
      ease: "power3.inOut",
      absolute: true,
      stagger: 0.008,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.97, duration: 0.25 }),
    });
    flipState.current = null;
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <section id="archive" className="relative py-28" aria-label="Project archive">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-3 text-red">05 / Archive</p>
            <h2 className="font-display text-4xl uppercase leading-none md:text-6xl">
              The <span className="text-stroke">vault</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-muted" aria-live="polite">
            {pad2(count)} / {pad2(archiveProjects.length)} repositories
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => changeFilter(f)}
              aria-pressed={filter === f}
              className={cx(
                "border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-300",
                filter === f ? "border-blue bg-blue text-white" : "border-line text-muted hover:border-line-strong hover:text-ink"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <ul ref={listRef} className="border-t border-line">
          {archiveProjects.map((p) => (
            <li
              key={p.slug}
              className="archive-row border-b border-line"
              style={{ display: visible(p.labels) ? undefined : "none" }}
            >
              <div className="group flex items-center gap-4 py-4 transition-colors duration-300 hover:bg-surface md:gap-6 md:px-4">
                <span className="font-display w-10 shrink-0 text-2xl text-stroke">{pad2(p.rank)}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-display truncate text-lg uppercase tracking-wide transition-colors group-hover:text-blue md:text-xl"
                    >
                      {p.name}
                    </Link>
                    {p.docNeeded && <DocBadge />}
                    {p.thirdParty && (
                      <span className="status-tag text-muted">Upstream Project</span>
                    )}
                    {p.team && <span className="status-tag text-muted">Team</span>}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted md:text-sm">{p.description}</p>
                </div>
                <span className="label hidden shrink-0 lg:block">{p.tagline}</span>
                <span
                  className={cx("status-dot shrink-0", p.status === "Experimental" && "bg-blue")}
                  title={`Status: ${p.status}`}
                  aria-label={`Status: ${p.status}`}
                />
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} on GitHub`}
                  className="shrink-0 p-2 text-muted transition-colors hover:text-ink"
                >
                  <Github size={16} />
                </a>
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={`${p.name} details`}
                  className="hidden shrink-0 p-2 text-muted transition-colors hover:text-blue sm:block"
                >
                  <ChevronRight size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="label mt-6 max-w-2xl leading-relaxed">
          Status defaults to Experimental where completion is unverified. Documentation Needed marks repositories with thin readmes.
        </p>
      </div>
    </section>
  );
}