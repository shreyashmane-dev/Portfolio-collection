export const EASE = {
  out: "power4.out",
  inOut: "expo.inOut",
  slash: "power3.in",
  snap: "back.out(1.4)",
} as const;

export const CSS_EASE = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.87, 0, 0.13, 1)",
  slash: "cubic-bezier(0.7, 0, 0.2, 1)",
} as const;

export const DUR = {
  fast: 0.3,
  base: 0.6,
  slow: 1.1,
  reveal: 1.4,
} as const;

export const COLORS = {
  blue: "#2F6BFF",
  red: "#E5243B",
  dark: "#07080B",
  light: "#F4F2EE",
} as const;