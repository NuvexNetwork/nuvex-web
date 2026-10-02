import type { ReactNode } from "react";

import { MotionProvider } from "@/components/animations/MotionProvider";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll />
      {children}
    </MotionProvider>
  );
}
