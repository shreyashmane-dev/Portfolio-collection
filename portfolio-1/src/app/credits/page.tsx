import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/nav/Navbar"
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "Asset & Library Credits // Shreyash Mane Portfolio",
  description: "Comprehensive attribution of open-source libraries, typography, icons, and 3D specifications."
}

interface CreditItem {
  asset: string
  author: string
  role: string
  license: string
  url: string
}

const creditsList: CreditItem[] = [
  {
    asset: "Bebas Neue",
    author: "Ryoichi Tsunekawa / Dharma Type",
    role: "Display Typography",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/Bebas+Neue"
  },
  {
    asset: "Inter Tight",
    author: "Rasmus Andersson",
    role: "Body and UI Typography",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/Inter+Tight"
  },
  {
    asset: "JetBrains Mono",
    author: "JetBrains",
    role: "Monospace and Technical Annotations",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/JetBrains+Mono"
  },
  {
    asset: "GSAP (GreenSock Animation Platform)",
    author: "GreenSock Inc.",
    role: "Core Animation & ScrollTrigger Engine",
    license: "Standard GreenSock License",
    url: "https://greensock.com/gsap/"
  },
  {
    asset: "Lenis",
    author: "Studio Freight / Darkroom Engineering",
    role: "Smooth Scroll Library",
    license: "MIT License",
    url: "https://github.com/darkroomengineering/lenis"
  },
  {
    asset: "Three.js & React Three Fiber",
    author: "Mr.doob & Poimandres",
    role: "3D WebGL Engine & React Canvas Integration",
    license: "MIT License",
    url: "https://github.com/pmndrs/react-three-fiber"
  },
  {
    asset: "Simple Icons",
    author: "Simple Icons Collaborators",
    role: "Technology Brand Marks & Vector Logos",
    license: "CC0 1.0 Universal",
    url: "https://simpleicons.org"
  },
  {
    asset: "Lucide Icons",
    author: "Lucide Contributors",
    role: "Interface UI Icons",
    license: "ISC License",
    url: "https://lucide.dev"
  },
  {
    asset: "Procedural Katana & Swordsman 3D Model",
    author: "Shreyash Mane Portfolio Team",
    role: "Custom Procedural Geometries & Dynamic Lights",
    license: "Custom Portfolio Creative Assets",
    url: "https://github.com/shreyashmane-dev"
  }
]

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-32 pb-20 flex-1">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--ink-dim)] hover:text-[var(--red)] transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO HOME</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[var(--line)] pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--red)] font-bold tracking-widest mb-2">
            <span className="w-2 h-2 bg-[var(--red)]" />
            ATTRIBUTION DISCLOSURE // SECTION 11 COMPLIANT
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-[var(--ink)] tracking-tight uppercase">
            CREDITS & LICENSES
          </h1>
          <p className="mt-4 font-mono text-sm text-[var(--ink-dim)] max-w-2xl">
            Every external asset, font family, open-source library, and icon set utilized across this portfolio is cataloged below with corresponding authorship and licensing permissions.
          </p>
        </div>

        {/* Table / List */}
        <div className="space-y-4">
          {creditsList.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-[var(--card-bg)] border border-[var(--line)] clip-notch-tl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[var(--blue)] transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl text-[var(--ink)] tracking-wide">
                    {item.asset}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--blue)] px-2 py-0.5 bg-[var(--blue)]/10 clip-notch-br">
                    {item.role}
                  </span>
                </div>
                <div className="font-mono text-xs text-[var(--ink-dim)]">
                  Author: <span className="text-[var(--ink)]">{item.author}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-center font-mono text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck size={14} />
                  <span>{item.license}</span>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[var(--line)] hover:border-[var(--red)] text-[var(--ink-dim)] hover:text-[var(--red)] transition-colors clip-notch-tl"
                  aria-label={`External link to ${item.asset}`}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-[var(--line)] py-6 px-4 md:px-8 text-center font-mono text-xs text-[var(--ink-dim)]">
        ATTRIBUTION VERIFIED // SHREYASH MANE
      </footer>
    </div>
  )
}
