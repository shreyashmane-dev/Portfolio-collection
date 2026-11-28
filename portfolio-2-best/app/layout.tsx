import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono, Zen_Antique } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site-url";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const zenAntique = Zen_Antique({ weight: "400", subsets: ["latin"], variable: "--font-zen", display: "swap", preload: false });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shreyash Mane | AI and Full-Stack Developer Portfolio",
    template: "%s | Shreyash Mane",
  },
  description:
    "Official portfolio of Shreyash Mane — Computer Science & Engineering student, AI and Full-Stack Developer building intelligent systems, developer tools, and IoT solutions.",
  keywords: [
    "Shreyash Mane",
    "Shreyash Mane portfolio",
    "Shreyash Mane developer",
    "Shreyash Mane GitHub",
    "Shreyash Mane LinkedIn",
    "Shreyash Mane CSE student",
    "Shreyash Mane Kolhapur",
    "Shreyash Mane D.Y. Patil College of Engineering",
    "shreyashmane-dev",
    "AI developer portfolio",
    "Full-Stack developer India",
    "OmSearch",
    "Drishti AI",
    "Nexyris",
    "SecureCode AI",
    "KisanDirect",
    "Zynth Browser",
    "DEV Tools Suite",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    firstName: "Shreyash",
    lastName: "Mane",
    username: "shreyashmane-dev",
    gender: "male",
    locale: "en_IN",
    url: siteUrl,
    title: "Shreyash Mane | AI and Full-Stack Developer Portfolio",
    description:
      "Official portfolio of Shreyash Mane — Computer Science & Engineering student, AI and Full-Stack Developer building intelligent systems, developer tools, and IoT solutions.",
    siteName: "Shreyash Mane Portfolio",
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
      "Official portfolio of Shreyash Mane — Computer Science & Engineering student, AI and Full-Stack Developer building intelligent systems, developer tools, and IoT solutions.",
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
      name: "Shreyash Mane — Developer Portfolio",
      alternateName: "Shreyash Mane Portfolio",
      description:
        "Official portfolio of Shreyash Mane, Computer Science and Engineering student building practical AI, full-stack web applications, developer tools, and IoT hardware systems.",
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#person` },
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      alternateName: ["Shreyash", "shreyashmane-dev", "Shreyash Mane Developer"],
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      jobTitle: "Computer Science & Engineering Student | AI and Full-Stack Developer",
      email: `mailto:${site.email}`,
      telephone: "",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolhapur",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: site.college,
        sameAs: "https://coek.dypgroup.edu.in",
      },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: site.university,
        sameAs: "https://www.unishivaji.ac.in",
      },
      sameAs: [
        site.github,
        site.linkedin,
        "https://github.com/shreyashmane-dev/OmSearch",
        "https://github.com/shreyashmane-dev/Nexyris",
        "https://github.com/shreyashmane-dev/Drishti-AI",
        "https://github.com/shreyashmane-dev/Secure-codeb-AI",
        "https://github.com/shreyashmane-dev/krushi-direct",
        "https://github.com/shreyashmane-dev/zynth-browser",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Full-Stack Development",
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
        "Internet of Things (IoT)",
        "Cybersecurity",
        "Software Engineering",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Shreyash Mane | AI and Full-Stack Developer Portfolio",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#itemlist`,
      name: "Software, AI, and Hardware Projects by Shreyash Mane",
      description: "Complete catalog of engineering projects and open-source software authored by Shreyash Mane.",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, index) => ({
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
