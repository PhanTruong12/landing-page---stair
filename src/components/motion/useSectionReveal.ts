import { useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT } from "./transition";

/** Props cho motion.section — fade nhẹ khi scroll, once */
export function useSectionReveal() {
  const reduce = useReducedMotion();
  if (reduce) {
    return {};
  }
  return {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.03, margin: "0px 0px -80px 0px" },
    transition: { duration: DURATION, ease: EASE_OUT },
  };
}
