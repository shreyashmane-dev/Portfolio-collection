"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".contact-reveal", {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: EASE.out,
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="contact" className="relative overflow-hidden py-32" aria-label="Contact">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 top-0 h-full w-1/3 -skew-x-12 bg-red opacity-[0.06]" />
        <div className="absolute -right-20 top-0 h-full w-1/3 -skew-x-12 bg-blue opacity-[0.07]" />
        <div className="halftone absolute inset-x-0 bottom-0 h-40 opacity-30" />
      </div>

      <div className="relative mx-auto max-w-[110rem] px-5 md:px-10">
        <p className="contact-reveal label mb-6 text-red">08 / Contact</p>
        <h2 className="font-display overflow-hidden text-[clamp(3.5rem,12vw,11rem)] uppercase leading-[0.9]">
          <span className="contact-reveal block">
            <span className="chromatic" data-text="LET'S BUILD">
              LET&apos;S BUILD
            </span>
          </span>
          <span className="contact-reveal block pl-[6vw] text-stroke">SOMETHING REAL.</span>
        </h2>

        <div className="contact-reveal mt-14">
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex flex-wrap items-center gap-3 border-b-2 border-line-strong pb-2 font-mono text-lg transition-colors hover:border-blue hover:text-blue md:text-3xl"
            >
              <Mail size={22} className="text-red" aria-hidden="true" />
              {site.email}
              <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Magnetic>
        </div>

        <div className="contact-reveal mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Shreyash Mane on GitHub"
              className="btn-slash"
            >
              <Github size={15} aria-hidden="true" /> GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Shreyash Mane on LinkedIn"
              className="btn-slash btn-red"
            >
              <Linkedin size={15} aria-hidden="true" /> LinkedIn
            </a>
          </Magnetic>
        </div>

        <p className="contact-reveal label mt-14">
          {site.location} — open to internships, collaborations and hard problems.
        </p>
      </div>
    </section>
  );
}
