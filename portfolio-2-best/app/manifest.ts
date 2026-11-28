import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shreyash Santosh Mane — Developer Portfolio",
    short_name: "Shreyash Mane",
    description:
      "Portfolio of Shreyash Santosh Mane (Shreyash Mane), Computer Science and Engineering student building AI systems, web apps, and IoT hardware.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080B",
    theme_color: "#07080B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
