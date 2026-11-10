"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothstep } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SwordsmanScene = dynamic(() => import("@/three/SwordsmanScene"), { ssr: false });

function StaticPoster() {
  return (
    <div className="vh-full relative flex items-center justify-center overflow-hidden bg-[#05060a] text-[#F2F0EA]">
      <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <polygon points="0,600 420,0 520,0 100,600" fill="#E5243B" opacity="0.16" />
        <polygon points="700,600 800,600 800,0 780,0" fill="#2F6BFF" opacity="0.2" />
        <circle cx="400" cy="240" r="150" fill="none" stroke="#2F6BFF" strokeWidth="1" opacity="0.4" />
        {/* stylized swordsman silhouette */}
        <g fill="#0b0c11" stroke="#3a4152" strokeWidth="1.5">
          <circle cx="400" cy="225" r="26" />
          <polygon points="374,218 400,180 426,218 420,232 380,232" />
          <polygon points="372,255 428,255 440,340 360,340" />
          <polygon points="360,340 440,340 462,470 338,470" />
          <rect x="352" y="470" width="34" height="14" />
          <rect x="414" y="470" width="34" height="14" />
          <polygon points="428,262 470,240 476,250 436,276" />
        </g>
        <line x1="472" y1="246" x2="580" y2="120" stroke="#dfe4ff" strokeWidth="4" />
        <line x1="472" y1="246" x2="580" y2="120" stroke="#2F6BFF" strokeWidth="10" opacity="0.35" />
        <circle cx="250" cy="300" r="8" fill="#E5243B" opacity="0.9" />
        <circle cx="560" cy="330" r="8" fill="#2F6BFF" opacity="0.9" />
      </svg>
      <div className="relative z-10 text-center">
        <p className="label mb-4 text-[#9a9da8]">07 / Finale — The Swordsman</p>
        <p className="font-display text-5xl uppercase md:text-7xl">
          <span className="text-[#E5243B]">Red</span> meets <span className="text-[#2F6BFF]">Blue</span>
        </p>
        <p className="label mt-6">Cinematic scrub disabled — reduced motion</p>
      </div>
    </div>
  );
}

export function Finale() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    if (isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120% 0px" }
    );
    if (rootRef.current) observer.observe(rootRef.current);

    const ctx = gsap.context(() => {
      const captions = gsap.utils.toArray<HTMLElement>(".finale-caption", stageRef.current);
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "+=420%",
        pin: stageRef.current,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;
          captions.forEach((cap, i) => {
            const windows = [
              [0.02, 0.2],
              [0.26, 0.48],
              [0.54, 0.86],
            ];
            const [a, b] = windows[i];
            const o = smoothstep(p, a, a + 0.04) * (1 - smoothstep(p, b - 0.04, b));
            gsap.set(cap, { opacity: o, y: (1 - o) * 14 });
          });
          if (flashRef.current) {
            gsap.set(flashRef.current, { opacity: smoothstep(p, 0.9, 0.985) });
          }
        },
      });
    }, rootRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  if (reduced) {
    return (
      <section id="finale" aria-label="Finale — The Swordsman">
        <StaticPoster />
      </section>
    );
  }

  return (
    <section ref={rootRef} id="finale" className="relative" aria-label="Finale — The Swordsman">
      <div ref={stageRef} className="vh-full relative overflow-hidden bg-[#05060a]">
        {active && <SwordsmanScene progress={progressRef} mobile={mobile} />}

        <div className="pointer-events-none absolute left-5 top-20 z-10 md:left-10">
          <p className="label text-[#9a9da8]">07 / Finale</p>
          <h2 className="font-display mt-1 text-2xl uppercase text-[#F2F0EA]">The Swordsman</h2>
        </div>
        <a
          href="#contact"
          className="label absolute right-5 top-20 z-10 border border-white/20 px-3 py-2 text-[#9a9da8] transition-colors hover:border-white/60 hover:text-white md:right-10"
        >
          Skip cinematic
        </a>
        <span className="kanji absolute right-6 top-1/2 z-10 -translate-y-1/2 text-6xl text-[#E5243B] opacity-60 md:right-14" aria-hidden="true">
          斬
        </span>

        <div className="pointer-events-none absolute bottom-10 left-5 z-10 md:left-10">
          {["I — Silence", "II — The Draw", "III — Collision"].map((c) => (
            <p key={c} className="finale-caption font-display absolute bottom-0 left-0 whitespace-nowrap text-3xl uppercase text-[#F2F0EA] opacity-0 md:text-5xl">
              {c}
            </p>
          ))}
        </div>
        <p className="label absolute bottom-10 right-5 z-10 hidden text-[#9a9da8] md:block">Scroll to draw the blade</p>

        <div
          ref={flashRef}
          className="pointer-events-none absolute inset-0 z-20 opacity-0"
          style={{ background: "linear-gradient(105deg, #E5243B 0%, #ffffff 22%, #ffffff 78%, #2F6BFF 100%)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}