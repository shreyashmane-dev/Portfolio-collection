import { MetadataRoute } from "next"
import { projects } from "@/data/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shreyashmane.dev"

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/credits`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    ...projectUrls
  ]
}
