export type CapabilityStatus = "live" | "in-development" | "planned" | "research";

export const statusLabels: Record<CapabilityStatus, string> = {
  live: "Live",
  "in-development": "In development",
  planned: "Planned",
  research: "Research",
};
