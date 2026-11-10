export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function mapRange(v: number, a: number, b: number, c: number, d: number) {
  const t = clamp((v - a) / (b - a), 0, 1);
  return c + t * (d - c);
}

export function smoothstep(v: number, a: number, b: number) {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}