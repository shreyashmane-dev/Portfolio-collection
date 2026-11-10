"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Radio, Monitor, Waves } from "lucide-react";
import { hardwareProjects } from "@/lib/site";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function Blueprint() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = svgRef.current?.querySelectorAll(".draw");
    if (!paths) return;
    paths.forEach((p) => {
      const el = p as SVGPathElement;
      const len = el.getTotalLength?.() ?? 300;
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = reduced ? "0" : String(len);
    });
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(paths, {
        strokeDashoffset: 0,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: { trigger: svgRef.current, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 900 380" className="w-full text-blue" role="img" aria-label="Blueprint schematic: ESP32 connected to RC522 RFID reader, OLED display and ultrasonic sensor">
      <defs>
        <pattern id="bp-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.22" />
        </pattern>
      </defs>
      <rect width="900" height="380" fill="url(#bp-grid)" />

      {/* ESP32 main board */}
      <path className="draw" d="M340 110 H560 V270 H340 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M390 150 H510 V230 H390 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path className="draw" d="M420 90 V110 M450 90 V110 M480 90 V110 M420 270 V290 M450 270 V290 M480 270 V290" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <text x="450" y="196" textAnchor="middle" fontSize="17" fill="currentColor" fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="2">ESP32</text>

      {/* RC522 left */}
      <path className="draw" d="M70 130 H230 V250 H70 Z" fill="none" stroke="#E5243B" strokeWidth="2" />
      <path className="draw" d="M110 165 a25 25 0 1 1 0.1 0 M125 180 a12 12 0 1 1 0.1 0" fill="none" stroke="#E5243B" strokeWidth="1.2" />
      <path className="draw" d="M230 160 H290 V140 H340 M230 200 H300 V220 H340" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="150" y="232" textAnchor="middle" fontSize="13" fill="#E5243B" fontFamily="var(--font-jetbrains-mono), monospace">RC522 RFID</text>

      {/* OLED right top */}
      <path className="draw" d="M660 70 H830 V150 H660 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M675 85 H815 V135 H675 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path className="draw" d="M560 140 H610 V110 H660" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="745" y="115" textAnchor="middle" fontSize="13" fill="currentColor" fontFamily="var(--font-jetbrains-mono), monospace">OLED 0.96</text>

      {/* HC-SR04 right bottom */}
      <path className="draw" d="M660 220 H830 V310 H660 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M690 250 a16 16 0 1 1 0.1 0 M770 250 a16 16 0 1 1 0.1 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path className="draw" d="M560 240 H610 V265 H660" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="745" y="298" textAnchor="middle" fontSize="13" fill="currentColor" fontFamily="var(--font-jetbrains-mono), monospace">HC-SR04</text>

      {/* callouts */}
      <path className="draw" d="M450 60 V90 M445 60 H455" stroke="#E5243B" strokeWidth="1" fill="none" />
      <text x="450" y="48" textAnchor="middle" fontSize="11" fill="#E5243B" fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="2">3.3V LOGIC</text>
      <text x="285" y="128" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7" fontFamily="var(--font-jetbrains-mono), monospace">SPI</text>
      <text x="610" y="98" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7" fontFamily="var(--font-jetbrains-mono), monospace">I2C</text>
      <text x="610" y="252" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7" fontFamily="var(--font-jetbrains-mono), monospace">GPIO</text>
      <text x="30" y="355" fontSize="11" fill="currentColor" opacity="0.6" fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="3">SCHEMATIC / REV 03 — NOT TO SCALE</text>
    </svg>
  );
}

const hwIcons = [Radio, Waves, Cpu];

export function Hardware() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".hw-card", {
        opacity: 0,
        y: 60,
        rotate: (i) => (i % 2 === 0 ? -1.5 : 1.5),
        stagger: 0.15,
        duration: 0.9,
        ease: EASE.out,
        scrollTrigger: { trigger: ".hw-grid", start: "top 78%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="hardware" className="cut-both relative bg-surface py-28" aria-label="Hardware and IoT projects">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-3 text-red">04 / Hardware &amp; IoT</p>
            <h2 className="font-display text-4xl uppercase leading-none md:text-6xl">
              Code meets <span className="text-blue">copper</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            ESP32 and Arduino builds — attendance readers, water-level monitors, classroom headcount systems. Firmware, sensors and desktop software wired together.
          </p>
        </div>

        <div className="panel corner-ticks relative overflow-hidden p-4 md:p-8" style={{ background: "color-mix(in srgb, var(--blue) 5%, var(--surface))" }}>
          <Blueprint />
        </div>

        <div className="hw-grid mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {hardwareProjects.map((hw, i) => {
            const Icon = hwIcons[i] ?? Monitor;
            return (
              <div key={hw.name} className={`hw-card panel panel-slash-sm p-5 ${i === 1 ? "md:translate-y-8" : ""} ${i === 2 ? "md:translate-y-16" : ""}`}>
                <div className="flex items-center justify-between">
                  <Icon size={20} className="text-red" aria-hidden="true" />
                  <span className="label">UNIT {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display mt-4 text-xl uppercase leading-tight">{hw.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{hw.purpose}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {hw.components.map((c) => (
                    <span key={c} className="border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-blue">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}