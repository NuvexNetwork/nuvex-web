import type { ReactNode } from "react";

/**
 * Rendered from `app/template.tsx`, which remounts on every navigation, so the CSS fade
 * replays per route. It is CSS rather than JS so server HTML is never hidden before hydration.
 * The reference has no route animation, so this stays a short fade.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
