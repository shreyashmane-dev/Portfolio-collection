"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getLenis } from "./SmoothScroll";

export function Marquee({
  children,
  baseSpeed = 60,
  direction = -1,
  className,
}: {
  children: React.ReactNode;
  baseSpeed?: number;
  direction?: 1 | -1;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let x = 0;
    let half = track.scrollWidth / 2;
    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const tick = (_: number, delta: number) => {
      const velocity = getLenis()?.velocity ?? 0;
      const boost = Math.min(Math.abs(velocity) * 2.2, 260);
      x += (direction * (baseSpeed + boost) * delta) / 1000;
      if (half > 0) {
        x = ((x % half) + half) % half;
        if (direction === -1) x -= half;
      }
      gsap.set(track, { x });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", measure);
    };
  }, [baseSpeed, direction]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={trackRef} className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}