import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[72rem] px-[clamp(1rem,4vw,2rem)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
