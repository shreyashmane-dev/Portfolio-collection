"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, GraduationCap, Building2, Award } from "lucide-react";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const facts = [
  { icon: GraduationCap, k: "Degree", v: "B.Tech — Computer Science & Engineering" },
  { icon: Building2, k: "College", v: site.college },
  { icon: Award, k: "University", v: site.university },
  { icon: MapPin, k: "Base", v: site.location },
];

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;
      const lines = root.querySelectorAll(".about-line");
      const panels = root.querySelectorAll(".fact-panel");
      const chips = root.querySelectorAll(".interest-chip");
      if (reduced) {
        gsap.set([lines, panels, chips], { opacity: 1, clearProps: "transform" });
        return;
      }
      gsap.set(lines, { yPercent: 110 });
      gsap.set(panels, { opacity: 0, x: 80, y: 40, rotate: 2 });
      gsap.set(chips, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.8,
        },
      });
      tl.to(lines, { yPercent: 0, duration: 1, stagger: 0.35, ease: EASE.out })
        .to(panels, { opacity: 1, x: 0, y: 0, rotate: 0, duration: 0.7, stagger: 0.25, ease: EASE.out }, 0.9)
        .to(chips, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.8);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="about" className="vh-full relative overflow-hidden bg-surface cut-top" aria-label="About">
      <div className="halftone pointer-events-none absolute right-0 top-0 h-1/2 w-1/3 opacity-40" aria-hidden="true" />
      <div className="mx-auto grid h-full max-w-[110rem] grid-cols-1 content-center gap-10 px-5 py-24 md:grid-cols-[1fr_1.6fr] md:gap-16 md:px-10">
        <div className="relative">
          <p className="label mb-4 text-red">01 / About</p>
          <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            Builder
            <br />
            <span className="text-stroke">first.</span>
          </h2>
          <span className="kanji absolute -left-2 top-40 hidden text-3xl text-muted opacity-50 md:block" aria-hidden="true">
            自己紹介
          </span>
        </div>

        <div>
          <div className="space-y-1 text-xl leading-snug md:text-3xl md:leading-tight">
            <span className="block overflow-hidden">
              <span className="about-line block">I learn a technology by shipping</span>
            </span>
            <span className="block overflow-hidden">
              <span className="about-line block">
                something <span className="text-blue">real</span> with it —
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="about-line block">practical software, AI applications,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="about-line block">
                developer tools, automation, and <span className="text-red">hardware</span>.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="about-line block text-muted">Ideas in. Functional applications out.</span>
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facts.map(({ icon: Icon, k, v }, i) => (
              <div
                key={k}
                className={`fact-panel panel panel-slash-sm corner-ticks p-4 ${i % 2 === 1 ? "sm:translate-y-4" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-blue" aria-hidden="true" />
                  <span className="label">{k}</span>
                </div>
                <p className="mt-2 text-sm leading-snug">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {site.interests.map((interest) => (
              <span key={interest} className="interest-chip border border-line px-3 py-1.5 font-mono text-xs text-muted">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}