"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechIcon } from "@/components/TechIcon";
import { skillGroups } from "@/lib/site";
import { pad2 } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function TiltTile({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -18;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 18;
    gsap.to(el, { rotateX: rx, rotateY: ry, scale: 1.06, duration: 0.4, ease: "power2.out", transformPerspective: 600 });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="panel panel-slash-sm flex h-28 w-32 flex-col items-center justify-center gap-3 will-change-transform md:h-32 md:w-36"
      data-cursor
    >
      <TechIcon name={name} size={28} className="text-ink" />
      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">{name}</span>
    </div>
  );
}

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      if (reduced) {
        track.style.overflowX = "auto";
        return;
      }
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="skills" className="vh-full relative overflow-hidden" aria-label="Technical skills">
      <div className="flex h-full flex-col justify-center">
        <div className="mb-10 flex items-end justify-between px-5 md:px-10">
          <div>
            <p className="label mb-3 text-red">02 / Skills</p>
            <h2 className="font-display text-4xl uppercase leading-none md:text-6xl">
              The <span className="text-blue">arsenal</span>
            </h2>
          </div>
          <p className="label hidden max-w-[16rem] text-right md:block">
            Used across projects. Proficiency not independently assessed.
          </p>
        </div>

        <div ref={trackRef} className="flex w-max items-stretch gap-6 px-5 will-change-transform md:px-10">
          {skillGroups.map((group, gi) => (
            <div key={group.category} className="flex shrink-0 flex-col">
              <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-3">
                <span className="font-display text-3xl text-stroke">{pad2(gi + 1)}</span>
                <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-ink">{group.category}</h3>
              </div>
              <div className="grid flex-1 auto-rows-min grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <TiltTile key={item} name={item} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex w-[40vw] shrink-0 items-center justify-center">
            <p className="kanji text-5xl text-muted opacity-40" aria-hidden="true">
              技術
            </p>
          </div>
        </div>

        <p className="label mt-10 px-5 md:hidden">Used across projects. Proficiency not independently assessed.</p>
      </div>
    </section>
  );
}