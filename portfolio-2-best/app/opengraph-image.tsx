import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shreyash Mane — AI and Full-Stack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        {/* Decorative corner accents */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "30px",
            fontSize: "48px",
            color: "#E5243B",
            fontWeight: "bold",
          }}
        >
          侍
        </div>

        {/* Header metadata */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "32px", height: "3px", backgroundColor: "#E5243B" }} />
          <span style={{ fontSize: "20px", letterSpacing: "4px", color: "#9A9DA8", textTransform: "uppercase" }}>
            Portfolio &middot; Engineering Archive
          </span>
        </div>

        {/* Center Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h1
            style={{
              fontSize: "84px",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-2px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            SHREYASH <span style={{ color: "#2F6BFF" }}>MANE</span>
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#9A9DA8",
              maxWidth: "850px",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Computer Science and Engineering Student &middot; AI, Full-Stack &amp; IoT Hardware
          </p>
        </div>

        {/* Footer badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1E2330",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{ fontSize: "18px", color: "#2F6BFF", fontFamily: "monospace" }}>43 REPOSITORIES</span>
            <span style={{ fontSize: "18px", color: "#9A9DA8", fontFamily: "monospace" }}>KOLHAPUR, MAHARASHTRA</span>
          </div>
          <span style={{ fontSize: "18px", color: "#E5243B", fontFamily: "monospace", letterSpacing: "2px" }}>
            SHREYASHMANE.DEV
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
