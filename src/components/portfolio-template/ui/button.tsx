import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg" | "icon";
};

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

const variants = {
  default: "bg-[var(--portfolio-primary)] text-white shadow-sm hover:opacity-90",
  secondary: "bg-[var(--portfolio-secondary)] text-white hover:opacity-90",
  outline: "border border-[var(--portfolio-border)] bg-transparent text-[var(--portfolio-text)] hover:bg-[var(--portfolio-card)]",
  ghost: "text-[var(--portfolio-text)] hover:bg-[var(--portfolio-card)]",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function AnchorButton({ className, variant = "default", size = "default", ...props }: AnchorButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
