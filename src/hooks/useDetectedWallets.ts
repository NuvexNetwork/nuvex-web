"use client";

import { useWallets } from "@wallet-standard/react";

export function useDetectedWallets() {
  return useWallets();
}
