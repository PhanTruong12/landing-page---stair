"use client";

import { useEffect } from "react";
import { initTracking } from "../lib/tracking/initTracking";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initTracking();
  }, []);

  return <div id="app">{children}</div>;
}
