import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { RollText } from "@/components/ui/RollText";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

const variants = {
  /** White pill with dark text. Blue halves cover it on hover. */
  primary: "bg-fg text-bg",
  /** Grey pill used in the navbar. */
  nav: "bg-line-strong text-fg rounded-[var(--radius-2xl)] pr-3",
  /** Plain white text, used beside a primary button. */
  text: "text-fg px-3",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  /** Show the sliding chevron. On for primary buttons by default. */
  icon?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: string;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children"> & { href: string };

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const rollColor: Record<Variant, string> = {
  primary: "var(--n2)",
  nav: "var(--n8)",
  text: "var(--n8)",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", icon, fullWidth = false, className, children } = props;
  const showIcon = icon ?? variant === "primary";
  const filled = variant !== "text";

  const classes = cn(
    "btn roll-trigger relative isolate inline-flex min-h-[34px] shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[var(--radius-btn)] text-base leading-none font-medium whitespace-nowrap",
    filled && "py-1.5 pr-2 pl-3",
    variants[variant],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {variant === "primary" ? (
        <>
          <span aria-hidden className="btn-bg btn-bg-left -z-10" />
          <span aria-hidden className="btn-bg btn-bg-right -z-10" />
        </>
      ) : null}
      <RollText text={children} color={rollColor[variant]} reverse={variant === "primary"} />
      {showIcon ? (
        <span aria-hidden className="btn-icon">
          <ChevronRight size={16} strokeWidth={2} />
          <ChevronRight size={16} strokeWidth={2} />
        </span>
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const {
      variant: _variant,
      icon: _icon,
      fullWidth: _fullWidth,
      className: _className,
      children: _children,
      href,
      ...anchorProps
    } = props;
    return (
      <SmartLink href={href} className={classes} {...anchorProps}>
        {content}
      </SmartLink>
    );
  }

  const {
    variant: _variant,
    icon: _icon,
    fullWidth: _fullWidth,
    className: _className,
    children: _children,
    href: _href,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
