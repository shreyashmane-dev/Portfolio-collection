"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Github } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { getLenis } from "./SmoothScroll";
import { site } from "@/lib/site";
import { cx } from "@/lib/utils";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "featured", label: "Work" },
  { id: "hardware", label: "Hardware" },
  { id: "archive", label: "Archive" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const jump = (id: string) => (e: React.MouseEvent) => {
    if (!isHome) return;
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-500",
          scrolled ? "border-line bg-[var(--scrim)] backdrop-blur-md" : "border-transparent"
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <nav className="mx-auto flex h-full max-w-[160rem] items-center justify-between px-5 md:px-10" aria-label="Primary">
          <Link href="/" className="font-display text-lg tracking-wide" data-cursor>
            SM<span className="text-red">.</span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) =>
              isHome ? (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={jump(l.id)}
                  className={cx(
                    "label transition-colors hover:text-ink",
                    active === l.id && "text-blue"
                  )}
                  aria-current={active === l.id ? "true" : undefined}
                >
                  {l.label}
                </a>
              ) : (
                <Link key={l.id} href={`/#${l.id}`} className="label transition-colors hover:text-ink">
                  {l.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden p-2 text-muted transition-colors hover:text-ink sm:block"
            >
              <Github size={17} />
            </a>
            <button
              type="button"
              onClick={(e) => toggle(e.clientX, e.clientY)}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="border border-line p-2 text-ink transition-colors hover:border-blue hover:text-blue"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="border border-line p-2 text-ink lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.55, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-[95] flex flex-col justify-center bg-base px-8 lg:hidden"
          >
            <div className="halftone pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={isHome ? `#${l.id}` : `/#${l.id}`}
                  onClick={isHome ? jump(l.id) : () => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display border-b border-line py-3 text-4xl uppercase text-ink"
                >
                  <span className="label mr-4 text-red">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}