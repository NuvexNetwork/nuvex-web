import { Check, Minus } from "lucide-react";

import { Button } from "@/components/buttons/Button";
import { Cell } from "@/components/ui/Cell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { CapabilityStatus } from "@/data/protocol";

export type PriceFeature = { label: string; included: boolean };

export type PriceCardProps = {
  audience: string;
  /** Headline figure, or a phrase such as "Coming soon" when nothing is set. */
  amount: string;
  unit?: string;
  description: string;
  status?: CapabilityStatus;
  action: { label: string; href: string };
  features: PriceFeature[];
};

/** One column of the economics grid. The frame turns blue on hover. */
export function PriceCard({
  audience,
  amount,
  unit,
  description,
  status,
  action,
  features,
}: PriceCardProps) {
  return (
    <Cell className="cell-hover flex flex-col justify-between gap-[50px] p-6">
      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="t-h6 text-fg">{audience}</h3>
          {status ? <StatusBadge status={status} /> : null}
        </div>
        <p className="text-sm">{description}</p>
        <p className="mt-2.5 mb-4 flex items-baseline gap-3">
          <span className="t-h3 text-fg">{amount}</span>
          {unit ? <span className="t-small whitespace-nowrap text-muted">{unit}</span> : null}
        </p>
        <Button href={action.href}>{action.label}</Button>
      </div>
      <ul className="flex flex-col items-start gap-3 pr-3.5">
        {features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-1.5 self-stretch">
            {feature.included ? (
              <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-fg" />
            ) : (
              <Minus aria-hidden size={16} className="mt-0.5 shrink-0 text-muted" />
            )}
            <span className={feature.included ? "t-small text-fg-soft" : "t-small text-muted"}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>
    </Cell>
  );
}
