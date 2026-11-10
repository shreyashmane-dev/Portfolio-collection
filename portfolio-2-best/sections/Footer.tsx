"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { getLenis } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

export function Footer() {
  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-[110rem] flex-wrap items-center justify-between gap-4 px-5 md:px-10">
        <p className="label">© 2026 {site.name} — Kolhapur, India</p>
        <div className="flex items-center gap-6">
          <Link href="/credits" className="label transition-colors hover:text-blue">
            Credits
          </Link>
          <p className="label hidden sm:block">Next.js / GSAP / Three.js</p>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="border border-line p-2 transition-colors hover:border-blue hover:text-blue"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}