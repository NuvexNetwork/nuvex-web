import { statusLabels, type CapabilityStatus } from "@/data/protocol";
import { cn } from "@/lib/utils";

const tones: Record<CapabilityStatus, string> = {
  live: "text-[var(--status-live)]",
  "in-development": "text-[var(--status-dev)]",
  planned: "text-[var(--status-planned)]",
  research: "text-[var(--status-research)]",
};

export function StatusBadge({
  status,
  className,
}: {
  status: CapabilityStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-2 py-0.5 text-[11px] leading-4 font-medium tracking-wide",
        tones[status],
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
