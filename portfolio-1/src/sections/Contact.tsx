"use client"

import React, { useState } from "react"
import Link from "next/link"
import { profile } from "@/data/profile"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { KatanaIcon, GithubIcon, LinkedinIcon } from "@/components/icons/CustomIcons"
import { Mail, Check, Copy, ArrowUp } from "lucide-react"

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      id="contact"
      aria-label="Direct Contact and Network Links"
      className="relative w-full bg-[var(--bg)] text-[var(--ink)] pt-24 pb-12 px-4 md:px-8 border-t border-[var(--line)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--red)]" />
            07 // TERMINATION : CONTACT
          </div>
          <div className="h-[1px] bg-[var(--line)] flex-1" />
          <div className="font-mono text-xs text-[var(--ink-dim)]">TRANSMISSION ACTIVE</div>
        </div>

        {/* Heading with chromatic split */}
        <div className="my-8">
          <h2
            className="font-display text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase select-none group chromatic-text hover:scale-[1.01] transition-transform duration-300"
            data-text="INITIATE CONTACT"
          >
            INITIATE CONTACT
          </h2>
          <p className="mt-4 font-mono text-sm md:text-base text-[var(--ink-dim)] max-w-xl">
            Available for software engineering roles, AI product development, and full-stack technical collaboration.
          </p>
        </div>

        {/* Contact Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          {/* GitHub Magnetic Action */}
          <div className="bg-[var(--card-bg)] border border-[var(--line)] p-6 clip-notch-tl flex flex-col justify-between group hover:border-[var(--blue)] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <GithubIcon size={24} className="text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors" />
              <span className="font-mono text-[10px] text-[var(--ink-dim)]">OPEN REPOSITORIES</span>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--ink)] mb-1">GITHUB</h3>
              <p className="font-mono text-xs text-[var(--ink-dim)] mb-6">
                Explore source code, labs, and development history.
              </p>
              <MagneticButton
                variant="blue"
                asLink
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Open @shreyashmane-dev
              </MagneticButton>
            </div>
          </div>

          {/* LinkedIn Magnetic Action */}
          <div className="bg-[var(--card-bg)] border border-[var(--line)] p-6 clip-notch-tl flex flex-col justify-between group hover:border-[var(--blue)] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <LinkedinIcon size={24} className="text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors" />
              <span className="font-mono text-[10px] text-[var(--ink-dim)]">PROFESSIONAL NETWORK</span>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--ink)] mb-1">LINKEDIN</h3>
              <p className="font-mono text-xs text-[var(--ink-dim)] mb-6">
                Connect for technical discussions and career opportunities.
              </p>
              <MagneticButton
                variant="outline"
                asLink
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                View LinkedIn Profile
              </MagneticButton>
            </div>
          </div>

          {/* Email Direct Action & Copy Button */}
          <div className="bg-[var(--card-bg)] border border-[var(--line)] p-6 clip-notch-br flex flex-col justify-between group hover:border-[var(--red)] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <Mail size={24} className="text-[var(--ink)] group-hover:text-[var(--red)] transition-colors" />
              <span className="font-mono text-[10px] text-[var(--red)]">DIRECT DISPATCH</span>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--ink)] mb-1">DIRECT INBOX</h3>
              <p className="font-mono text-xs text-[var(--ink-dim)] mb-6 truncate" title={profile.email}>
                {profile.email}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 py-3 px-4 bg-[var(--red)] text-white font-mono text-xs uppercase tracking-wider text-center font-semibold clip-notch-tl hover:bg-[var(--red-hover)] transition-colors"
                >
                  Send Email
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--red)] clip-notch-br transition-colors"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon and Back to top */}
        <div className="pt-12 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[var(--ink-dim)]">
          <div className="flex flex-wrap items-center gap-4">
            <span>(C) 2026 SHREYASH MANE</span>
            <span>|</span>
            <Link
              href="/credits"
              className="hover:text-[var(--ink)] underline underline-offset-4 decoration-[var(--line)] hover:decoration-[var(--blue)] transition-colors"
            >
              ASSET & THIRD-PARTY CREDITS
            </Link>
          </div>

          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] border border-[var(--line)] hover:border-[var(--red)] text-[var(--ink)] transition-colors clip-notch-tl group"
            aria-label="Back to top of page"
          >
            <KatanaIcon size={16} className="text-[var(--red)] -rotate-45 group-hover:-translate-y-1 transition-transform" />
            <span>BACK TO TOP</span>
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
