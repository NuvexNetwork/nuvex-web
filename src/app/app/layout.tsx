import type { ReactNode } from "react";

import { ConsoleShell } from "@/components/layout/ConsoleShell";

export const metadata = {
  title: { default: "Console", template: "%s — Nuvex console" },
};

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return <ConsoleShell>{children}</ConsoleShell>;
}
