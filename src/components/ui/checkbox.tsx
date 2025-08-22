"use client";

import React from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      variant = "default",
      size = "md",
      fullWidth = false,
      disabled,
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      "transition-all duration-200 rounded focus:outline-none focus:ring-2";
    const variantClasses = {
      default:
        "border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white",
      filled:
        "border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-200",
      outlined:
        "border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white",
    };
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };
    const errorClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "";
    const disabledClasses = disabled
      ? "opacity-50 cursor-not-allowed bg-gray-50"
      : "";
    const widthClasses = fullWidth ? "w-full" : "";

    const checkboxClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      errorClasses,
      disabledClasses,
      widthClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        <div className="flex items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className={checkboxClasses}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={`ml-2 text-sm font-medium ${
                error ? "text-red-700" : "text-gray-700"
              } ${disabled ? "opacity-50" : ""}`}
            >
              {label}
            </label>
          )}
        </div>
        {error && <span className="ml-6 text-sm text-red-600">{error}</span>}
        {helperText && !error && (
          <span className="ml-6 text-xs text-gray-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
