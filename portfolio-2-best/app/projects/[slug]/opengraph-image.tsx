import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? "Engineering Project";
  const tagline = project?.tagline ?? "Software & Hardware Architecture";
  const tech = project?.tech.slice(0, 4).join(" · ") ?? "Full-Stack Development";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07080B",
          color: "#F4F2EE",
          fontFamily: "sans-serif",
          padding: "60px 80px",
          border: "4px solid #1E2330",
          position: "relative",
        }}
      >
        {/* Top badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "24px", height: "3px", backgroundColor: "#2F6BFF" }} />
            <span style={{ fontSize: "18px", letterSpacing: "3px", color: "#9A9DA8", textTransform: "uppercase" }}>
              Shreyash Mane &middot; Project Showcase
            </span>
          </div>
          <span style={{ fontSize: "16px", color: "#E5243B", fontFamily: "monospace", textTransform: "uppercase" }}>
            {project?.status ?? "Experimental"}
          </span>
        </div>

        {/* Project Name and Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <span style={{ fontSize: "24px", color: "#2F6BFF", letterSpacing: "2px", textTransform: "uppercase" }}>
            {tagline}
          </span>
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-1px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#9A9DA8",
              maxWidth: "900px",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {project?.description ?? ""}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1E2330",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#F4F2EE", fontFamily: "monospace" }}>{tech}</span>
          <span style={{ fontSize: "16px", color: "#9A9DA8", fontFamily: "monospace" }}>SHREYASHMANE.DEV</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
