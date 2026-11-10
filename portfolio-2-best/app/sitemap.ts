import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shreyash-portfolllio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Exclude thin / docNeeded projects from sitemap to prevent low-quality indexing penalties
  const indexableProjects = projects.filter((p) => !p.docNeeded);

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/credits`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...indexableProjects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
