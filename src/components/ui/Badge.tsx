"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "pending" | "progress";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-[#f1f5f9] text-[#475569]",
      success: "bg-gradient-to-r from-[#d1fae5] to-[#a7f3d0] text-[#065f46]",
      warning: "bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#92400e]",
      error: "bg-gradient-to-r from-[#fee2e2] to-[#fecaca] text-[#991b1b]",
      info: "bg-gradient-to-r from-[#dbeafe] to-[#bfdbfe] text-[#1e40af]",
      pending: "bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#92400e]",
      progress: "bg-gradient-to-r from-[#dbeafe] to-[#bfdbfe] text-[#1e40af]",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
