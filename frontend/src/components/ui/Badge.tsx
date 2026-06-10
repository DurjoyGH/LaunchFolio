type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-white/5 text-white/60 border-white/10",
  success: "bg-white/10 text-white border-white/30",
  warning: "bg-white/10 text-white border-white/30",
  error: "bg-white/10 text-white border-white/30",
  info: "bg-white/10 text-white border-white/30",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-white/50",
  success: "bg-white",
  warning: "bg-white",
  error: "bg-white",
  info: "bg-white",
};

export default function Badge({ children, variant = "default", dot = false, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
