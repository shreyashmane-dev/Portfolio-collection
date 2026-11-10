"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { KatanaIcon } from "@/components/icons/CustomIcons"
import { Sun, Moon, Menu, X } from "lucide-react"
import { getInitialTheme, toggleThemeWithTransition, Theme } from "@/lib/theme"

export function Navbar() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const handleThemeToggle = (e: React.MouseEvent) => {
    toggleThemeWithTransition(theme, e, (newTheme) => {
      setTheme(newTheme)
    })
  }

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100001] focus:px-4 focus:py-2 focus:bg-[var(--blue)] focus:text-white font-mono text-xs"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo / Brand mark */}
          <Link
            href="/"
            className="flex items-center gap-2 group px-3 py-1.5 bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--line)] clip-notch-tl hover:border-[var(--red)] transition-colors duration-200"
            aria-label="Home - Shreyash Mane"
          >
            <KatanaIcon className="w-5 h-5 text-[var(--red)] group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display tracking-wider text-lg text-[var(--ink)]">
              SHREYASH<span className="text-[var(--red)] font-bold">.</span>M
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--line)] clip-notch-tl font-mono text-xs tracking-wider text-[var(--ink-dim)]">
            <a
              href="#about"
              className="px-3 py-1 hover:text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
            >
              01 {"//"} ABOUT
            </a>
            <a
              href="#skills"
              className="px-3 py-1 hover:text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
            >
              02 {"//"} SKILLS
            </a>
            <a
              href="#featured"
              className="px-3 py-1 hover:text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
            >
              03 {"//"} EPISODES
            </a>
            <a
              href="#hardware"
              className="px-3 py-1 hover:text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
            >
              04 {"//"} HARDWARE
            </a>
            <a
              href="#archive"
              className="px-3 py-1 hover:text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
            >
              05 {"//"} ARCHIVE
            </a>
            <a
              href="#contact"
              className="px-3 py-1 hover:text-[var(--ink)] hover:text-[var(--red)] transition-colors"
            >
              06 {"//"} CONTACT
            </a>
          </nav>

          {/* Right actions: Theme toggle and mobile menu button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleThemeToggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="p-2.5 bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--line)] text-[var(--ink)] hover:border-[var(--blue)] transition-colors clip-notch-tl"
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-[var(--blue)]" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--line)] text-[var(--ink)] clip-notch-tl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-[var(--bg)]/95 backdrop-blur-xl border border-[var(--line)] flex flex-col gap-3 font-mono text-xs pointer-events-auto">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--line)] text-[var(--ink)]"
            >
              01 {"//"} ABOUT
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--line)] text-[var(--ink)]"
            >
              02 {"//"} SKILLS
            </a>
            <a
              href="#featured"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--line)] text-[var(--ink)]"
            >
              03 {"//"} EPISODES
            </a>
            <a
              href="#hardware"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--line)] text-[var(--ink)]"
            >
              04 {"//"} HARDWARE
            </a>
            <a
              href="#archive"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--line)] text-[var(--ink)]"
            >
              05 {"//"} ARCHIVE
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[var(--red)]"
            >
              06 {"//"} CONTACT
            </a>
          </div>
        )}
      </header>
    </>
  )
}
