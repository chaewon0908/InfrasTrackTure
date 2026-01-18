"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#334155] mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border-2 bg-white text-[#0f172a] placeholder:text-[#94a3b8]",
            "transition-all duration-200",
            "focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10",
            error
              ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/10"
              : "border-[#e2e8f0] hover:border-[#cbd5e1]",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-[#ef4444]">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-[#64748b]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#334155] mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border-2 bg-white text-[#0f172a] placeholder:text-[#94a3b8]",
            "transition-all duration-200 resize-none min-h-[120px]",
            "focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10",
            error
              ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/10"
              : "border-[#e2e8f0] hover:border-[#cbd5e1]",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-[#ef4444]">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-[#64748b]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Input;
