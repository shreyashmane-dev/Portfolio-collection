import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shreyash Mane — AI and Full-Stack Developer Portfolio",
    short_name: "Shreyash Mane",
    description:
      "Portfolio of Shreyash Mane, Computer Science and Engineering student building AI systems, full-stack applications, developer tools, and IoT hardware.",
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
