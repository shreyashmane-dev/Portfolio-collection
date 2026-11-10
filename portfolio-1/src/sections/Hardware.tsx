"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export function Hardware() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) return

      const svgPaths = containerRef.current.querySelectorAll(".blueprint-wire")
      const nodes = containerRef.current.querySelectorAll(".blueprint-node")

      svgPaths.forEach((path) => {
        const svgEl = path as SVGGeometryElement
        const length = svgEl.getTotalLength ? svgEl.getTotalLength() : 200
        gsap.set(svgEl, { strokeDasharray: length, strokeDashoffset: length })

        gsap.to(svgEl, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: path,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.5
          }
        })
      })

      nodes.forEach((node, idx) => {
        gsap.fromTo(
          node,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: idx * 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: node,
              start: "top 85%"
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hardware"
      aria-label="Hardware and IoT Schematics"
      className="relative w-full bg-[#080D1A] text-[#E0E7FF] py-20 px-4 md:px-8 border-b border-[rgba(242,240,234,0.14)] overflow-hidden"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 border-b border-blue-500/20 pb-8">
          <div>
            <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-blue-400" />
              04 // CHAPTER : EMBEDDED SYSTEMS
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-white tracking-tight">
              HARDWARE & IOT SCHEMATICS
            </h2>
          </div>
          <div className="font-mono text-xs text-blue-300/70 text-right">
            <div>FIG. 04 — BLUEPRINT SPECIFICATION</div>
            <div className="text-[var(--red)] font-semibold">SIMPLIFIED DIAGRAM (ILLUSTRATIVE)</div>
          </div>
        </div>

        {/* 3 Hardware Schematics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Schematic 1: RFID Attendance System */}
          <div className="bg-[#0B1226]/80 border border-blue-500/30 p-6 clip-notch-tl flex flex-col justify-between group hover:border-blue-400 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-blue-400 mb-3">
                <span>CIRCUIT 01</span>
                <span>ESP32 // I2C & SPI</span>
              </div>
              <h3 className="font-display text-2xl text-white tracking-wide mb-2">
                RFID Attendance System
              </h3>
              <p className="font-mono text-xs text-blue-200/70 mb-6">
                Purpose: RFID-based attendance recording.
              </p>

              {/* Animated SVG Schematic */}
              <div className="relative w-full h-52 bg-[#060A14] border border-blue-500/20 clip-notch-br p-4 mb-6 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 240 140">
                  {/* Wires */}
                  <path
                    className="blueprint-wire"
                    d="M 60 70 L 120 70"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="blueprint-wire"
                    d="M 120 70 L 180 40"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="blueprint-wire"
                    d="M 120 70 L 180 100"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Components */}
                  <g className="blueprint-node">
                    <rect x="10" y="50" width="50" height="40" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="35" y="74" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">RC522</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="95" y="45" width="50" height="50" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
                    <text x="120" y="72" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ESP32</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="170" y="20" width="50" height="40" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="195" y="44" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">OLED 0.96</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="170" y="80" width="50" height="40" fill="#0E1B38" stroke="#E5243B" strokeWidth="1.5" />
                    <text x="195" y="104" fill="#FCA5A5" fontSize="8" fontFamily="monospace" textAnchor="middle">STORAGE</text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="font-mono text-[11px] text-blue-300/80 border-t border-blue-500/20 pt-3">
              <span className="text-blue-400 font-bold">[1]</span> RC522 SPI scan -&gt; ESP32 verification -&gt; OLED display
            </div>
          </div>

          {/* Schematic 2: Smart Water-Level Monitoring */}
          <div className="bg-[#0B1226]/80 border border-blue-500/30 p-6 clip-notch-tl flex flex-col justify-between group hover:border-blue-400 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-blue-400 mb-3">
                <span>CIRCUIT 02</span>
                <span>ESP32 // SENSORS & RELAY</span>
              </div>
              <h3 className="font-display text-2xl text-white tracking-wide mb-2">
                Water-Level Monitoring
              </h3>
              <p className="font-mono text-xs text-blue-200/70 mb-6">
                Purpose: Water-level monitoring and pump-control experimentation.
              </p>

              {/* Animated SVG Schematic */}
              <div className="relative w-full h-52 bg-[#060A14] border border-blue-500/20 clip-notch-br p-4 mb-6 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 240 140">
                  <path
                    className="blueprint-wire"
                    d="M 60 70 L 120 70"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="blueprint-wire"
                    d="M 120 70 L 180 35"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="blueprint-wire"
                    d="M 120 70 L 180 70"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="blueprint-wire"
                    d="M 120 70 L 180 105"
                    stroke="#E5243B"
                    strokeWidth="2"
                    fill="none"
                  />

                  <g className="blueprint-node">
                    <rect x="10" y="50" width="50" height="40" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="35" y="74" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">HC-SR04</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="95" y="45" width="50" height="50" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
                    <text x="120" y="72" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ESP32</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="170" y="15" width="50" height="30" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="195" y="34" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">OLED</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="170" y="55" width="50" height="30" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="195" y="74" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">RELAY</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="170" y="95" width="50" height="30" fill="#0E1B38" stroke="#E5243B" strokeWidth="1.5" />
                    <text x="195" y="114" fill="#FCA5A5" fontSize="8" fontFamily="monospace" textAnchor="middle">BUZZER</text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="font-mono text-[11px] text-blue-300/80 border-t border-blue-500/20 pt-3">
              <span className="text-blue-400 font-bold">[2]</span> Ultrasonic telemetry -&gt; ESP32 threshold logic -&gt; relay & buzzer
            </div>
          </div>

          {/* Schematic 3: Smart Classroom System */}
          <div className="bg-[#0B1226]/80 border border-blue-500/30 p-6 clip-notch-tl flex flex-col justify-between group hover:border-blue-400 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-blue-400 mb-3">
                <span>CIRCUIT 03</span>
                <span>ARDUINO UNO // DUAL BUS</span>
              </div>
              <h3 className="font-display text-2xl text-white tracking-wide mb-2">
                Smart Classroom System
              </h3>
              <p className="font-mono text-xs text-blue-200/70 mb-6">
                Purpose: Attendance and emergency headcount management.
              </p>

              {/* Animated SVG Schematic */}
              <div className="relative w-full h-52 bg-[#060A14] border border-blue-500/20 clip-notch-br p-4 mb-6 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 240 140">
                  <path
                    className="blueprint-wire"
                    d="M 60 40 L 120 70"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="blueprint-wire"
                    d="M 60 100 L 120 70"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="blueprint-wire"
                    d="M 120 70 L 180 70"
                    stroke="#2F6BFF"
                    strokeWidth="2"
                    fill="none"
                  />

                  <g className="blueprint-node">
                    <rect x="10" y="20" width="50" height="35" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="35" y="41" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">RC522 #1</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="10" y="85" width="50" height="35" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="35" y="106" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">RC522 #2</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="95" y="45" width="50" height="50" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
                    <text x="120" y="72" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">UNO</text>
                  </g>

                  <g className="blueprint-node">
                    <rect x="170" y="50" width="50" height="40" fill="#0E1B38" stroke="#2F6BFF" strokeWidth="1.5" />
                    <text x="195" y="74" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">HOST PC</text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="font-mono text-[11px] text-blue-300/80 border-t border-blue-500/20 pt-3">
              <span className="text-blue-400 font-bold">[3]</span> Dual entry/exit scanning -&gt; Arduino state tracking -&gt; PySide6 GUI
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
