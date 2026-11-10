"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { clipPath: "polygon(0 0, 0 0, -20% 100%, 0 100%)" }}
      animate={reduced ? { opacity: 1 } : { clipPath: "polygon(0 0, 120% 0, 100% 100%, 0 100%)" }}
      transition={{ duration: reduced ? 0.25 : 0.65, ease: [0.87, 0, 0.13, 1] }}
    >
      {children}
    </motion.div>
  );
}