import { useEffect, useRef, useState } from "react";

const DEFAULT_MS = 650;

/** Đếm số mượt tới `target` — hủy animation cũ khi target đổi. */
export function useAnimatedNumber(target: number, durationMs = DEFAULT_MS): number {
  const [value, setValue] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    const from = displayRef.current;
    const start = performance.now();
    let raf = 0;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      const next = from + (target - from) * eased;
      displayRef.current = next;
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);

  return value;
}
