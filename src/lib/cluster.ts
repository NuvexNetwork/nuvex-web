const CLUSTERS = ["localnet", "devnet", "mainnet"] as const;

export type ClusterName = (typeof CLUSTERS)[number] | "unconfigured" | "invalid";

export function publicCluster(value: string | undefined): ClusterName {
  const trimmed = value?.trim();
  if (!trimmed) {
    return "unconfigured";
  }
  if ((CLUSTERS as readonly string[]).includes(trimmed)) {
    return trimmed as (typeof CLUSTERS)[number];
  }
  return "invalid";
}
