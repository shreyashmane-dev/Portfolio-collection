"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { CSS_EASE } from "@/lib/motion";

type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme; toggle: (x?: number, y?: number) => void }>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("sm-theme", theme);
  } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "dark");
  }, []);

  const toggle = useCallback(
    (x?: number, y?: number) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const vt = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } })
        .startViewTransition;
      if (!vt || reduced || x === undefined || y === undefined) {
        setTheme(next);
        apply(next);
        return;
      }
      const transition = vt.call(document, () => {
        flushSync(() => setTheme(next));
        apply(next);
      });
      transition.ready.then(() => {
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 750, easing: CSS_EASE.inOut, pseudoElement: "::view-transition-new(root)" }
        );
      });
    },
    [theme]
  );

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}