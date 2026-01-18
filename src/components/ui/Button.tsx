"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-shine";

    const variants = {
      primary:
        "bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white hover:from-[#0f766e] hover:to-[#0d9488] focus-visible:ring-[#14b8a6] shadow-lg shadow-[#14b8a6]/25",
      secondary:
        "bg-[#1e293b] text-white hover:bg-[#334155] focus-visible:ring-[#475569]",
      outline:
        "border-2 border-[#14b8a6] text-[#0d9488] hover:bg-[#14b8a6] hover:text-white focus-visible:ring-[#14b8a6]",
      ghost:
        "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] focus-visible:ring-[#94a3b8]",
      danger:
        "bg-gradient-to-r from-[#e11d48] to-[#f43f5e] text-white hover:from-[#be123c] hover:to-[#e11d48] focus-visible:ring-[#f43f5e] shadow-lg shadow-[#f43f5e]/25",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
