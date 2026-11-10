import React from "react"

interface ProjectPlaceholderProps {
  title: string
  rank: number
  slug: string
  className?: string
}

export function ProjectPlaceholder({
  title,
  rank,
  className = ""
}: ProjectPlaceholderProps) {
  const initials = title
    .split(/[-_\s]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase()

  return (
    <div
      className={`relative w-full h-full min-h-[260px] md:min-h-[380px] bg-[var(--bg-2)] overflow-hidden border border-[var(--line)] clip-notch-tl flex items-center justify-center p-6 ${className}`}
    >
      {/* Background Halftone & Technical Grid */}
      <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />

      {/* Abstract Geometric Manga Slash Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1="20%"
          y1="100%"
          x2="100%"
          y2="20%"
          stroke="var(--blue)"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="0%"
          y1="80%"
          x2="80%"
          y2="0%"
          stroke="var(--red)"
          strokeWidth="1"
          opacity="0.4"
        />
        <polygon
          points="20,20 120,20 80,100"
          fill="none"
          stroke="var(--blue)"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx="85%"
          cy="80%"
          r="48"
          fill="none"
          stroke="var(--red)"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </svg>

      {/* Technical Corner Brackets */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-[var(--ink-dim)]">
        FRAME_{rank.toString().padStart(2, "0")}
      </div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--red)]">
        SYS_GEO // 0x{rank.toString(16)}
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[var(--blue)]">
        SCALE 1.0 // NO_HOTLINK
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[var(--ink-dim)]">
        DIAGNOSTIC_RENDER
      </div>

      {/* Central stylized initials badge */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md flex items-center justify-center clip-notch-tl group-hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(47,107,255,0.15)]">
          <span className="font-display text-4xl md:text-5xl text-[var(--ink)] tracking-widest chromatic-text" data-text={initials}>
            {initials}
          </span>
        </div>
        <span className="mt-3 font-mono text-xs uppercase tracking-wider text-[var(--ink-dim)]">
          EP.{rank.toString().padStart(2, "0")} ARCHIVE VISUAL
        </span>
      </div>
    </div>
  )
}
