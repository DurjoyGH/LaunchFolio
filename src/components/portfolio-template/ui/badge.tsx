import type { HTMLAttributes } from "react";
import { cn } from "../utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] px-2.5 py-1 text-xs font-medium text-[var(--portfolio-muted)]",
        className,
      )}
      {...props}
    />
  );
}
