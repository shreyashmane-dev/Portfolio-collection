"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Asterisk } from "lucide-react";
import { Marquee } from "@/components/Marquee";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Career() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".career-role", {
        opacity: 0,
        x: -40,
        stagger: 0.08,
        duration: 0.7,
        ease: EASE.out,
        scrollTrigger: { trigger: ".career-list", start: "top 80%" },
      });
      gsap.from(".acad-block", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: { trigger: ".acad-grid", start: "top 85%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="career" className="cut-top relative overflow-hidden bg-surface pb-24 pt-28" aria-label="Career interests and academics">
      <Marquee baseSpeed={70} className="border-y border-line py-4">
        {site.career.map((role) => (
          <span key={role} className="flex items-center">
            <span className="font-display px-6 text-3xl uppercase text-stroke md:text-5xl">{role}</span>
            <Asterisk size={26} className="text-red" aria-hidden="true" />
          </span>
        ))}
      </Marquee>

      <div className="mx-auto mt-16 grid max-w-[110rem] grid-cols-1 gap-14 px-5 md:grid-cols-2 md:px-10">
        <div>
          <p className="label mb-3 text-red">06 / Direction</p>
          <h2 className="font-display mb-8 text-4xl uppercase leading-none md:text-5xl">
            Roles I&apos;m <span className="text-blue">aiming at</span>
          </h2>
          <ul className="career-list space-y-0 border-t border-line">
            {site.career.map((role, i) => (
              <li key={role} className="career-role flex items-baseline gap-4 border-b border-line py-3">
                <span className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg md:text-xl">{role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="acad-grid grid content-start gap-5">
          <p className="label text-red">07 / Education</p>
          <div className="acad-block panel panel-slash-sm corner-ticks p-6">
            <h3 className="font-display text-3xl uppercase">{site.academics.degree} — CSE</h3>
            <p className="mt-2 text-sm text-muted">{site.academics.institution}</p>
            <p className="text-sm text-muted">{site.academics.university}</p>
          </div>
          <div className="acad-block panel p-6 md:ml-10">
            <h4 className="label mb-3">Academic focus</h4>
            <div className="flex flex-wrap gap-2">
              {site.academics.focus.map((f) => (
                <span key={f} className="border border-line px-2.5 py-1 font-mono text-xs text-muted">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="acad-block panel p-6 md:ml-20">
            <h4 className="label mb-3">Learning next</h4>
            <div className="flex flex-wrap gap-2">
              {site.academics.learning.map((l) => (
                <span key={l} className="border border-blue/40 px-2.5 py-1 font-mono text-xs text-blue">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
