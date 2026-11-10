"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getLenis } from "./SmoothScroll";
import { EASE } from "@/lib/motion";

export const PRELOADER_DONE = "sm:preloader-done";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    let cancelled = false;
    const state = { fonts: 0, model: 0 };
    const update = () => {
      if (cancelled) return;
      const p = Math.round(state.fonts * 30 + state.model * 70);
      setProgress(p);
      if (counterRef.current) counterRef.current.textContent = String(p).padStart(3, "0");
      if (barRef.current) gsap.set(barRef.current, { scaleX: p / 100 });
    };

    const fontsReady = document.fonts.ready.then(() => {
      state.fonts = 1;
      update();
    });

    const modelReady = (async () => {
      try {
        const res = await fetch("/models/swordsman.glb");
        if (!res.ok || !res.body) {
          state.model = 1;
          update();
          return;
        }
        const total = Number(res.headers.get("content-length") ?? 0);
        const reader = res.body.getReader();
        let loaded = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          loaded += value.byteLength;
          state.model = total ? Math.min(loaded / total, 1) : 0.5;
          update();
        }
        state.model = 1;
        update();
      } catch {
        state.model = 1;
        update();
      }
    })();

    Promise.all([fontsReady, modelReady]).then(() => {
      if (cancelled) return;
      const finish = () => {
        document.body.style.overflow = "";
        lenis?.start();
        window.dispatchEvent(new Event(PRELOADER_DONE));
        setGone(true);
      };
      const tl = gsap.timeline({ onComplete: finish });
      if (reduced) {
        tl.to(rootRef.current, { opacity: 0, duration: 0.3 });
      } else {
        tl.to(rootRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          duration: 0.85,
          ease: EASE.inOut,
          delay: 0.25,
        });
      }
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-[#07080B] text-[#F2F0EA]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      role="status"
      aria-label={`Loading portfolio, ${progress} percent`}
    >
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="speedlines absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative flex w-full max-w-xl flex-col items-center px-6">
        <p className="label mb-6 text-[#9a9da8]">Portfolio — Loading Assets</p>
        <div className="font-display flex items-baseline text-[clamp(5rem,18vw,11rem)] leading-none">
          <span ref={counterRef}>000</span>
          <span className="text-[0.35em] text-[#E5243B]">%</span>
        </div>
        <div className="mt-8 h-[3px] w-full overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-[#2F6BFF]" />
        </div>
        <div className="mt-6 flex w-full items-center justify-between">
          <span className="label text-[#9a9da8]">Shreyash Mane</span>
          <span className="kanji text-2xl text-[#E5243B]" aria-hidden="true">
            斬
          </span>
        </div>
      </div>
    </div>
  );
}