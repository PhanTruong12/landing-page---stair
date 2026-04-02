"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { PAGE_SECTION_DURATION, PAGE_SECTION_EASE } from "./transition";

type FadeUpProps = {
  children: ReactNode;
  /** Trễ giữa các section (ms) — chỉ khi không bật reduced motion */
  delayMs?: number;
};

/** Wrapper scroll-reveal dùng cho từng block trong `App` */
export function FadeUp({ children, delayMs = 0 }: FadeUpProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        // Giảm ngưỡng để section không bị kẹt opacity/y trên một số máy/level zoom
        amount: 0.05,
        margin: "0px 0px -80px 0px",
      }}
      transition={{
        duration: reduce ? 0 : PAGE_SECTION_DURATION,
        ease: PAGE_SECTION_EASE,
        delay: reduce ? 0 : delayMs / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
