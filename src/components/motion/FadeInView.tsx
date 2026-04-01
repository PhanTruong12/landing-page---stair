import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT } from "./transition";

type FadeInViewProps = {
  children: ReactNode;
  y?: number;
  delay?: number;
  amount?: number;
};

export function FadeInView({
  children,
  y = 15,
  delay = 0,
  amount = 0.12,
}: FadeInViewProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -32px 0px" }}
      transition={{
        duration: reduce ? 0 : DURATION,
        ease: EASE_OUT,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
