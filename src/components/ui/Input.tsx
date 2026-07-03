import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  rightElement?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, rightElement, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`input ${error ? "border-white/50 focus:border-white" : ""} ${rightElement ? "pr-12" : ""} ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-white">{error}</p>}
        {hint && !error && <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
