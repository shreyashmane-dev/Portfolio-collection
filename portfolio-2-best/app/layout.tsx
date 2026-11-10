import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono, Zen_Antique } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { featuredProjects } from "@/lib/projects";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const zenAntique = Zen_Antique({ weight: "400", subsets: ["latin"], variable: "--font-zen", display: "swap", preload: false });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shreyash-portfolllio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shreyash Mane | AI and Full-Stack Developer Portfolio",
    template: "%s | Shreyash Mane",
  },
  description:
    "Shreyash Mane is a Computer Science and Engineering student building practical AI, full-stack web applications, developer tools, and IoT hardware systems.",
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "./",
    title: "Shreyash Mane | AI and Full-Stack Developer Portfolio",
    description:
      "Shreyash Mane is a Computer Science and Engineering student building practical AI, full-stack web applications, developer tools, and IoT hardware systems.",
    siteName: "Shreyash Mane",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Shreyash Mane - AI and Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyash Mane | AI and Full-Stack Developer Portfolio",
    description:
      "Shreyash Mane is a Computer Science and Engineering student building practical AI, full-stack web applications, developer tools, and IoT hardware systems.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google6ba000893a0dc8c1",
  },
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

const rootSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shreyash Mane Portfolio",
      description:
        "Portfolio of Shreyash Mane, Computer Science and Engineering student building practical AI, full-stack web applications, developer tools, and IoT hardware systems.",
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      url: siteUrl,
      jobTitle: "Computer Science and Engineering Student & Developer",
      email: `mailto:${site.email}`,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: site.college,
      },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: site.university,
      },
      sameAs: [site.github, site.linkedin],
      knowsAbout: [
        "Python",
        "TypeScript",
        "JavaScript",
        "C",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "Firebase",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "OpenSearch",
        "PyTorch",
        "LangChain",
        "Scikit-learn",
        "XGBoost",
        "ESP32",
        "Arduino",
        "Internet of Things",
        "Artificial Intelligence",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Shreyash Mane | AI and Full-Stack Developer Portfolio",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#itemlist`,
      name: "Featured Engineering Projects by Shreyash Mane",
      description: "Selected software, AI, and hardware projects built by Shreyash Mane.",
      itemListElement: featuredProjects.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: p.name,
        description: p.description,
        url: `${siteUrl}/projects/${p.slug}`,
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${zenAntique.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }} />
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
