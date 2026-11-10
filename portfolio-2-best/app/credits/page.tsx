import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shreyash-portfolllio.vercel.app";

export const metadata: Metadata = {
  title: "Credits & Colophon",
  description: "Asset, model, font and library credits for the Shreyash Mane anime-inspired developer portfolio.",
  alternates: {
    canonical: `${siteUrl}/credits`,
  },
};

const models = [
  {
    name: "Rogue (Hooded) — KayKit Adventurers Character Pack 1.0",
    author: "Kay Lousberg",
    license: "CC0 (Public Domain)",
    source: "https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0",
    site: "https://kaylousberg.itch.io/kaykit-adventurers",
    changes: "Materials replaced with a near-black silhouette shader, meshopt-compressed to 2.0 MB, procedural katana attached to the hand slot, idle and diagonal-slash clips scrubbed by scroll.",
  },
];

const fonts = [
  { name: "Anton", author: "Vernon Adams", license: "SIL Open Font License 1.1" },
  { name: "Space Grotesk", author: "Florian Karsten", license: "SIL Open Font License 1.1" },
  { name: "JetBrains Mono", author: "JetBrains", license: "SIL Open Font License 1.1" },
  { name: "Zen Antique", author: "Yoshimichi Ohira", license: "SIL Open Font License 1.1" },
];

const libs = [
  ["Next.js", "App framework"],
  ["GSAP + ScrollTrigger + Flip", "Scroll choreography and FLIP filtering"],
  ["Lenis", "Smooth scroll"],
  ["Three.js / React Three Fiber / drei / postprocessing", "3D scenes and effects"],
  ["Framer Motion", "Page transitions and menu state"],
  ["Tailwind CSS", "Utility styling"],
  ["Lucide", "Interface icons"],
  ["Simple Icons", "Technology logos"],
];

export default function CreditsPage() {
  return (
    <main id="main" className="relative min-h-screen pt-28">
      <div className="mx-auto max-w-[70rem] px-5 pb-24 md:px-10">
        <Link href="/" className="label inline-flex items-center gap-2 transition-colors hover:text-blue">
          <ArrowLeft size={13} aria-hidden="true" /> Back home
        </Link>
        <p className="label mt-10 text-red">Colophon</p>
        <h1 className="font-display mt-2 text-5xl uppercase md:text-7xl">Credits</h1>

        <section className="mt-14" aria-label="3D model credits">
          <h2 className="font-display mb-5 text-2xl uppercase text-blue">3D Model</h2>
          {models.map((m) => (
            <div key={m.name} className="panel panel-slash-sm p-6">
              <h3 className="text-lg font-medium">{m.name}</h3>
              <p className="mt-2 text-sm text-muted">
                {m.author} — {m.license}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.changes}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a href={m.source} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1 text-blue hover:underline">
                  Source <ExternalLink size={11} aria-hidden="true" />
                </a>
                <a href={m.site} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1 text-blue hover:underline">
                  Author <ExternalLink size={11} aria-hidden="true" />
                </a>
                <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1 text-blue hover:underline">
                  License <ExternalLink size={11} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The hero katana and the finale blade are procedural geometry built for this site — no external model.
          </p>
        </section>

        <section className="mt-14" aria-label="Font credits">
          <h2 className="font-display mb-5 text-2xl uppercase text-blue">Typefaces</h2>
          <ul className="border-t border-line">
            {fonts.map((f) => (
              <li key={f.name} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-3">
                <span className="font-medium">{f.name}</span>
                <span className="text-sm text-muted">
                  {f.author} — {f.license}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-label="Library credits">
          <h2 className="font-display mb-5 text-2xl uppercase text-blue">Libraries</h2>
          <ul className="border-t border-line">
            {libs.map(([name, role]) => (
              <li key={name} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-3">
                <span className="font-mono text-sm">{name}</span>
                <span className="text-sm text-muted">{role}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-label="Content and data notes">
          <h2 className="font-display mb-5 text-2xl uppercase text-blue">Content &amp; Data</h2>
          <div className="space-y-3 text-sm leading-relaxed text-muted">
            <p>
              All project text, skills and links come from the Portfolio Data source file. Repository metadata (fork status, README depth)
              was verified against the GitHub API on 2026-11-10. Tracking parameters were stripped from every URL.
            </p>
            <p>
              Project statuses default to Experimental because completion is not independently verified. Repositories with thin readmes
              carry a Documentation Needed badge. Recordly is a copy of the open-source recordly.dev app (AGPL-3.0) and is not presented
              as original work. No screenshots were available in the repositories, so every project uses a designed key-visual placeholder.
            </p>
            <p>
              Decorative Japanese terms are used with their correct meanings: 侍 (samurai), 斬 (slash), 開発者 (developer),
              自己紹介 (self-introduction), 技術 (technology).
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}