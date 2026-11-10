import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono, Zen_Antique } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const zenAntique = Zen_Antique({ weight: "400", subsets: ["latin"], variable: "--font-zen", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Shreyash Mane — Builder of Search Engines, AI Tools & Hardware Systems",
    template: "%s — Shreyash Mane",
  },
  description:
    "Portfolio of Shreyash Mane, Computer Science & Engineering student in Kolhapur, India. 43 projects across AI/ML, full-stack development, developer tools and IoT hardware.",
  keywords: ["Shreyash Mane", "portfolio", "AI", "full-stack developer", "IoT", "Kolhapur", "OmSearch", "Drishti AI"],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: "Shreyash Mane — Portfolio",
    description: "Search engines, AI tools, hardware systems. 43 projects, one builder.",
    siteName: "Shreyash Mane",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Shreyash Mane portfolio key visual" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyash Mane — Portfolio",
    description: "Search engines, AI tools, hardware systems. 43 projects, one builder.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080B" },
    { media: "(prefers-color-scheme: light)", color: "#F4F2EE" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var t=localStorage.getItem("sm-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressRegion: "Maharashtra", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: site.college },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [...site.interests],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${zenAntique.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="grain scanlines">
        <ThemeProvider>
          <SmoothScroll>
            <a
              href="#main"
              className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-base focus:px-4 focus:py-2 focus:text-ink"
            >
              Skip to content
            </a>
            <CustomCursor />
            <Nav />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}