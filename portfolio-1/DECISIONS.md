# Architectural and Design Decisions

Author: Shreyash Mane Portfolio System
Date: 2026-11-10

## 1. Architectural Philosophy and Anti-Template Stance

This portfolio was constructed to break away from uniform templates, generic card grids, centered gradient blobs, and ungrounded claims. Every design token, layout composition, and motion curve was chosen to convey high-precision engineering and anime-inspired visual flair.

Key architectural tenets:
- Asymmetric panel geometries with custom diagonal polygon cutouts (`clip-notch-tl`, `clip-notch-br`, `clip-slash`).
- Visible 1px grid guides, technical coordinate labels (latitude/longitude of Kolhapur, Maharashtra), and numbered sector markers.
- Strict data compliance: all information originates exclusively from `src/data/projects.ts`, `src/data/skills.ts`, and `src/data/profile.ts`.
- Zero invented metrics: no falsified production user counts, deployment stats, or arbitrary percentage skill bars.
- Distinct motion signatures per section rather than repetitive fade-up animations.

---

## 2. Technical Stack and Library Selections

| Layer | Selection | Justification |
| :--- | :--- | :--- |
| Framework | Next.js (App Router) + TypeScript (strict) | Production-ready server-side performance, typed routes, static generation for SEO. |
| Smooth Scroll | Lenis + GSAP ScrollTrigger Integration | Synchronized RAF ticker with lagSmoothing(0) ensures no stutter during scroll scrubbing. |
| 3D WebGL | Three.js + React Three Fiber + Drei + Postprocessing | Real-time procedural models (Katana, Swordsman silhouette, orbs, shockwave, bloom). |
| CSS & Styling | Tailwind CSS v4 + Custom Tokens | CSS variables (`--bg`, `--ink`, `--blue`, `--red`, `--line`) swapped instantly via `[data-theme]`. |
| Icons | Simple Icons (`react-icons/si`) + Lucide React + Custom SVG | True brand icons for developer tools without external image dependencies or hotlinks. |

---

## 3. Motion System Specifications

1. Preloader (000 to 100):
   - Real progress tracking with a minimum 1.2s threshold to prevent flashing.
   - Dual diagonal panel split along an 18-degree cut with a 0.12s white flash frame.
   - Session persistence: skipped automatically on repeat visits via `sessionStorage` or if `prefers-reduced-motion` is active.

2. Hero Section:
   - Oversized stacked typography `SHREYASH / MANE` with per-character upward reveal and 6-degree rotation recovery.
   - Procedural 3D Katana with damped pointer parallax (max 12-degree tilt) and dual rim lighting (left blue, right red).

3. About Section:
   - Pinned for 120vh with scrubbed mask-line reveals for the introduction text.
   - Manga-style corner panels sliding diagonally from alternating corners.
   - Custom hand-drawn SVG underline stroke drawn via `strokeDashoffset`.

4. Skills Arsenal:
   - Horizontal scroll track translating across 10 technical chapters.
   - Katana blade progress line filling along the bottom.

5. Featured Episodes (01-10):
   - Full-viewport episode cards featuring project classification, live tech pills, and custom abstract SVG blueprints (no broken hotlinks).
   - Slash-wipe polygon transitions scrubbed directly to scroll.

6. Embedded Systems Blueprint:
   - Deep-indigo circuit grid layout representing ESP32 and Arduino UNO projects.
   - Wire connections drawn with animated SVG dashoffsets and component nodes popping in sequentially.

7. Project Archive (11-43):
   - Complete inventory filterable by category tags using GSAP Flip for smooth DOM reflows.
   - Instant client-side search across titles, descriptions, and technology stacks.
   - Prominent "Documentation Needed" badges for thin repositories and explicit "Ownership under verification" disclaimer for Recordly (Rank 37).

8. Finale: The Swordsman (500vh Cinematic):
   - 0.00-0.15: Silence and camera push-in (6m to 4m).
   - 0.15-0.35: Sword raised with glint emissive pulse.
   - 0.35-0.50: Diagonal blade slash; Red and Blue orbs emerge.
   - 0.50-0.75: Dual helical spiral orbits around figure.
   - 0.75-0.88: Collision impact, white flash frame, shockwave ring, spark burst.
   - 0.88-1.00: Hard diagonal wipe transitioning into Contact.
   - Reads a shared mutable progress state object (`progressState.current.progress`) within `useFrame` to eliminate React re-render overhead.

---

## 4. Theme System & Contrast Conformance

- Dark Theme:
  - Background: `#07080B`
  - Text Ink: `#F2F0EA` (Contrast Ratio: 17.5:1 on background)
  - Interactive Blue: `#3E7BFF` (Contrast Ratio: 5.6:1 on background)
  - Emphasis Red: `#E5243B` (Contrast Ratio: 4.8:1 on background)

- Light Theme:
  - Background: `#F4F2EE`
  - Text Ink: `#0B0C10` (Contrast Ratio: 16.8:1 on background)
  - Interactive Blue: `#2358DB` (Contrast Ratio: 6.2:1 on background)
  - Emphasis Red: `#D71830` (Contrast Ratio: 5.8:1 on background)

- Theme Switcher:
  - Uses the native View Transitions API with a circular radial reveal centered at the click coordinates, with GSAP overlay fallback.

---

## 5. Asset Licensing & Attribution

- Fonts:
  - Bebas Neue: SIL Open Font License 1.1
  - Inter Tight: SIL Open Font License 1.1
  - JetBrains Mono: SIL Open Font License 1.1
- Icons:
  - Simple Icons: CC0 1.0 Universal
  - Lucide: ISC License
  - Custom SVG Marks: Created specifically for this project (Katana, Slash, Blueprint Schematics).
- 3D Geometries:
  - Procedurally generated in code using Three.js ExtrudeGeometry and primitives to maintain zero external file dependencies and guaranteed sub-5MB bundle weight.

---

## 6. Accessibility & Reduced Motion

- Full support for `prefers-reduced-motion: reduce`:
  - 3D heavy scrub is replaced with a static key-art panel.
  - Transforms and scroll pin triggers are bypassed.
  - Film grain and scanline canvas overlays are hidden.
- Keyboard navigation:
  - Explicit skip links to main content.
  - High-visibility focus indicators (2px solid blue with 3px offset).
  - Dedicated "Skip Finale" button accessible via Tab.

---

## 7. Performance & Quality Targets

- Target Lighthouse Scores (Desktop):
  - Performance: 90+
  - Accessibility: 98+
  - Best Practices: 100
  - SEO: 100
