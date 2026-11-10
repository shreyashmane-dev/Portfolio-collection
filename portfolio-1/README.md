# Shreyash Mane // Creative Engineering Portfolio

A production-grade, anime-inspired portfolio system for Shreyash Mane. Built with Next.js App Router, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Lenis, and React Three Fiber.

---

## Technical Specifications

- Framework: Next.js (App Router)
- Language: TypeScript (strict mode enabled)
- Animation: GSAP 3 (ScrollTrigger, Flip) + Lenis Smooth Scroll
- 3D Engine: Three.js, React Three Fiber, Drei, Postprocessing (Bloom, Vignette, ChromaticAberration)
- Styling: Tailwind CSS v4 with custom CSS variable tokens
- Typography: Bebas Neue (Display), Inter Tight (Text), JetBrains Mono (Code/Technical)
- Icons: Simple Icons (react-icons/si), Lucide React, Hand-drawn Custom SVGs

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm 9+ or pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/shreyashmane-dev/portfolio.git
cd portfolio

# Install dependencies
npm install --legacy-peer-deps
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## How to Add or Modify Projects

All project records are centralized in a single typed file:
`src/data/projects.ts`

### Project Schema

```typescript
type Status = "completed" | "in-progress" | "experimental" | "planned"
type Label =
  | "AI & Machine Learning"
  | "Full-Stack Development"
  | "Developer Tools"
  | "Mobile Applications"
  | "IoT & Hardware"
  | "Research & Experiments"
  | "Academic Projects"
  | "Open Source & Learning"

interface Project {
  rank: number
  slug: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  repo: string
  labels: Label[]
  status: Status
  docsNeeded: boolean
  screenshot?: string
  featured: boolean
  ownershipNote?: string
}
```

### Adding a Project

1. Open `src/data/projects.ts`.
2. Append a new object into the `projects` array.
3. If the project is in the top 10, set `featured: true` (ranks 1 to 10). If it is part of the general archive, set `featured: false` (ranks 11 to 43+).
4. If descriptions are thin or preliminary, set `docsNeeded: true`.
5. Run `npm run build` to verify typed static route generation.

### Adding Screenshots

To associate an actual screenshot with a project:
1. Place the optimized `.webp` image into `public/screenshots/<slug>.webp`.
2. Reference the path in `src/data/projects.ts`:
   ```typescript
   screenshot: "/screenshots/omsearch.webp"
   ```
3. If no image is provided, the system renders an abstract geometric blueprint SVG composition using the project's initials and rank index. Broken hotlinks are strictly prohibited.

---

## Deployment to Vercel

### Standard Deployment

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Select "Add New Project" and import your GitHub repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Set the build command:
   ```bash
   npm run build
   ```
6. Click **Deploy**.

---

## Asset & License Attribution

- Bebas Neue: SIL Open Font License 1.1 (Ryoichi Tsunekawa)
- Inter Tight: SIL Open Font License 1.1 (Rasmus Andersson)
- JetBrains Mono: SIL Open Font License 1.1 (JetBrains)
- Simple Icons: CC0 1.0 Universal (Simple Icons Contributors)
- Lucide: ISC License (Lucide Contributors)
- GSAP: GreenSock Standard License
- Three.js: MIT License (Mr.doob & Contributors)

For the complete legal registry, visit the `/credits` route.
