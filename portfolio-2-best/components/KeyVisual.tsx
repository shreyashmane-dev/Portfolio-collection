import type { Project } from "@/lib/projects";

function seeded(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function KeyVisual({ project, className }: { project: Project; className?: string }) {
  const rand = seeded(project.rank * 7 + 13);
  const red = project.rank % 2 === 0;
  const accent = red ? "#E5243B" : "#2F6BFF";
  const other = red ? "#2F6BFF" : "#E5243B";
  const fx = Number((320 + rand() * 360).toFixed(2));
  const fy = Number((140 + rand() * 260).toFixed(2));
  const lines = Array.from({ length: 26 }, (_, i) => {
    const angle = (i / 26) * Math.PI * 2 + rand() * 0.2;
    const inner = 90 + rand() * 120;
    const outer = 700;
    const r2 = (n: number) => Number(n.toFixed(2));
    return {
      x1: r2(fx + Math.cos(angle) * inner),
      y1: r2(fy + Math.sin(angle) * inner),
      x2: r2(fx + Math.cos(angle) * outer),
      y2: r2(fy + Math.sin(angle) * outer),
      w: r2(0.6 + rand() * 1.6),
    };
  });
  const initials = project.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const pid = `kv-${project.slug}`;

  return (
    <svg
      viewBox="0 0 1000 560"
      className={className}
      role="img"
      aria-label={`${project.name} designed key visual`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`${pid}-dots`} width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill={accent} opacity="0.5" />
        </pattern>
        <pattern id={`${pid}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.14" />
        </pattern>
        <clipPath id={`${pid}-diag`}>
          <polygon points={red ? "620,0 1000,0 1000,560 380,560" : "0,0 420,0 660,560 0,560"} />
        </clipPath>
      </defs>

      <rect width="1000" height="560" fill="var(--surface)" />
      <rect width="1000" height="560" fill={`url(#${pid}-grid)`} />

      <g clipPath={`url(#${pid}-diag)`}>
        <rect width="1000" height="560" fill={accent} opacity="0.1" />
        <rect width="1000" height="560" fill={`url(#${pid}-dots)`} />
      </g>

      <g stroke="currentColor" opacity="0.28">
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeWidth={l.w} />
        ))}
      </g>

      <circle cx={fx} cy={fy} r="58" fill="none" stroke={accent} strokeWidth="2" opacity="0.9" />
      <circle cx={fx} cy={fy} r="4" fill={other} />
      <line x1={fx - 80} y1={fy} x2={fx - 62} y2={fy} stroke={accent} strokeWidth="2" />
      <line x1={fx + 62} y1={fy} x2={fx + 80} y2={fy} stroke={accent} strokeWidth="2" />
      <line x1={fx} y1={fy - 80} x2={fx} y2={fy - 62} stroke={accent} strokeWidth="2" />
      <line x1={fx} y1={fy + 62} x2={fx} y2={fy + 80} stroke={accent} strokeWidth="2" />

      <text
        x="952"
        y="528"
        textAnchor="end"
        fontSize="300"
        fontFamily="var(--font-anton), Impact, sans-serif"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.32"
      >
        {String(project.rank).padStart(2, "0")}
      </text>

      <text
        x="44"
        y="120"
        fontSize="92"
        fontFamily="var(--font-anton), Impact, sans-serif"
        fill={accent}
        letterSpacing="2"
      >
        {initials}
      </text>

      <rect x="44" y="470" width="130" height="3" fill={other} />
      <text x="44" y="502" fontSize="15" fontFamily="var(--font-jetbrains-mono), monospace" fill="currentColor" opacity="0.65" letterSpacing="3">
        KEY VISUAL / {String(project.rank).padStart(2, "0")}
      </text>
      <text x="44" y="526" fontSize="12" fontFamily="var(--font-jetbrains-mono), monospace" fill="currentColor" opacity="0.4" letterSpacing="2">
        DESIGNED PLACEHOLDER — NO UI CAPTURE
      </text>

      <rect x="1" y="1" width="998" height="558" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <path d="M0 22V0H22 M978 0H1000V22 M1000 538V560H978 M22 560H0V538" fill="none" stroke={accent} strokeWidth="3" />
    </svg>
  );
}