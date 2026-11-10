import type { Metadata } from "next"
import { Bebas_Neue, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { CustomCursor } from "@/components/cursor/CustomCursor"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap"
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Shreyash Mane // Software Engineer & Systems Architect",
  description:
    "Production-grade, anime-inspired portfolio of Shreyash Mane. Computer Science and Engineering student building AI products, IoT hardware, and full-stack software architectures.",
  metadataBase: new URL("https://shreyashmane.dev"),
  keywords: [
    "Shreyash Mane",
    "Software Engineer",
    "AI Engineer",
    "IoT Developer",
    "Full-Stack Developer",
    "FastAPI",
    "Next.js",
    "ESP32",
    "Computer Science"
  ],
  authors: [{ name: "Shreyash Mane", url: "https://github.com/shreyashmane-dev" }],
  creator: "Shreyash Mane",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shreyashmane.dev",
    title: "Shreyash Mane // Portfolio 2026",
    description:
      "Computer Science & Engineering student. AI products, IoT hardware, and full-stack software architectures.",
    siteName: "Shreyash Mane Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyash Mane // Portfolio 2026",
    description:
      "Computer Science & Engineering student. AI products, IoT hardware, and full-stack software architectures."
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD Person Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shreyash Mane",
    url: "https://shreyashmane.dev",
    sameAs: [
      "https://github.com/shreyashmane-dev",
      "https://www.linkedin.com/in/shreyashmane-7675a4385"
    ],
    jobTitle: "Computer Science and Engineering Student",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "D.Y. Patil College of Engineering, Kolhapur"
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Full-Stack Development",
      "Internet of Things",
      "Python",
      "Next.js",
      "TypeScript",
      "Embedded Systems"
    ]
  }

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${bebasNeue.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash inline theme loader script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (supportDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-[var(--red)] selection:text-white">
        {/* Film grain and scanlines global textures */}
        <div className="film-grain" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />

        {/* Morphing interactive cursor */}
        <CustomCursor />

        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}
