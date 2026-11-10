"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { SplitChars } from "@/components/SplitText";
import { PRELOADER_DONE } from "@/components/Preloader";
import { site } from "@/lib/site";
import { EASE, DUR } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/three/HeroScene"), { ssr: false });

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const burstRef = useRef<SVGSVGElement>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;
      const chars = root.querySelectorAll(".hero-name .split-char");
      const meta = root.querySelectorAll(".hero-meta");
      const cue = root.querySelector(".scroll-cue");
      const stamp = root.querySelector(".hero-stamp");

      if (reduced) {
        gsap.set([chars, meta, cue, stamp], { opacity: 1, clearProps: "transform" });
        setSceneReady(true);
        return;
      }

      gsap.set(chars, { yPercent: 115, rotate: 4 });
      gsap.set(meta, { opacity: 0, y: 24 });
      gsap.set(cue, { opacity: 0 });
      gsap.set(stamp, { opacity: 0, scale: 1.6, rotate: -14 });
      gsap.set(burstRef.current, { opacity: 0, scale: 0.6 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(burstRef.current, { opacity: 0.5, scale: 1.15, duration: 0.5, ease: EASE.out })
        .to(burstRef.current, { opacity: 0, scale: 1.6, duration: 0.9, ease: EASE.out }, 0.35)
        .to(chars, { yPercent: 0, rotate: 0, duration: DUR.reveal, ease: EASE.out, stagger: 0.035 }, 0.1)
        .to(stamp, { opacity: 1, scale: 1, rotate: -8, duration: 0.7, ease: EASE.snap }, 0.9)
        .to(meta, { opacity: 1, y: 0, duration: DUR.base, ease: EASE.out, stagger: 0.12 }, 0.8)
        .to(cue, { opacity: 1, duration: DUR.base }, 1.3);

      const start = () => {
        intro.play();
        setSceneReady(true);
      };
      window.addEventListener(PRELOADER_DONE, start, { once: true });
      const fallback = window.setTimeout(start, 6000);
      return () => {
        window.removeEventListener(PRELOADER_DONE, start);
        window.clearTimeout(fallback);
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const cue = rootRef.current?.querySelector(".scroll-cue-line");
    if (!cue) return;
    const tween = gsap.to(cue, { scaleY: 0.2, transformOrigin: "top", repeat: -1, yoyo: true, duration: 0.9, ease: "power2.inOut" });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={rootRef} id="hero" className="vh-full relative overflow-hidden" aria-label="Introduction">
      <div className="grid-lines absolute inset-0 opacity-50" aria-hidden="true" />

      <svg
        ref={burstRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 opacity-0"
        viewBox="0 0 1000 1000"
        aria-hidden="true"
      >
        {Array.from({ length: 48 }, (_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const r1 = 180 + (i % 5) * 30;
          const r2 = (n: number) => Number(n.toFixed(2));
          return (
            <line
              key={i}
              x1={r2(500 + Math.cos(a) * r1)}
              y1={r2(500 + Math.sin(a) * r1)}
              x2={r2(500 + Math.cos(a) * 520)}
              y2={r2(500 + Math.sin(a) * 520)}
              stroke={i % 6 === 0 ? "#E5243B" : "currentColor"}
              strokeWidth={i % 3 === 0 ? 2 : 0.8}
              opacity={0.5}
            />
          );
        })}
      </svg>

      <div className="absolute inset-y-0 right-0 w-full opacity-40 md:w-[55%] md:opacity-100">
        {sceneReady && <HeroScene />}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-24 md:justify-center md:px-10 md:pb-0">
        <p className="hero-meta label mb-5 flex items-center gap-3 opacity-0">
          <span className="inline-block h-[2px] w-10 bg-red" aria-hidden="true" />
          {site.title}
        </p>

        <h1 className="hero-name font-display leading-[0.86]">
          <span className="block overflow-hidden text-[clamp(4rem,15.5vw,15rem)]">
            <SplitChars text="SHREYASH" />
          </span>
          <span className="block overflow-hidden pl-[8vw] text-[clamp(4rem,15.5vw,15rem)] text-transparent [-webkit-text-stroke:2px_var(--ink)] md:pl-[14vw]">
            <SplitChars text="MANE" />
            <span className="split-char inline-block text-red [-webkit-text-stroke:0]">.</span>
          </span>
        </h1>

        <div className="hero-meta mt-8 max-w-md opacity-0">
          <p className="text-base leading-relaxed text-muted md:text-lg">
            I build search engines, AI tools and hardware systems — then ship them. {site.location}.
          </p>
        </div>

        <div className="hero-meta mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 opacity-0">
          <span className="label">43 Projects</span>
          <span className="label text-blue">AI / Full-Stack / IoT</span>
          <span className="label">{site.college}</span>
        </div>
      </div>

      <div className="hero-stamp absolute right-6 top-24 z-10 flex h-24 w-24 items-center justify-center border-2 border-red opacity-0 md:right-[12%] md:top-[18%] md:h-32 md:w-32" aria-hidden="true">
        <span className="kanji text-4xl text-red md:text-5xl">侍</span>
        <span className="label absolute -bottom-6 left-0 text-[0.55rem]">BUILDER / 開発者</span>
      </div>

      <div className="scroll-cue absolute bottom-6 left-5 z-10 flex items-center gap-3 opacity-0 md:left-10">
        <ArrowDown size={14} className="text-blue" aria-hidden="true" />
        <span className="label">Scroll</span>
        <span className="scroll-cue-line block h-10 w-px bg-line-strong" aria-hidden="true" />
      </div>

      <p className="label absolute bottom-6 right-5 z-10 hidden md:block" aria-hidden="true">
        EP.00 — OPENING
      </p>
    </section>
  );
}