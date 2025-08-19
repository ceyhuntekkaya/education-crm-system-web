"use client";

import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      variant = "default",
      size = "md",
      startIcon,
      endIcon,
      fullWidth = false,
      disabled,
      type = "text",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      "transition-all duration-200 border rounded-lg focus:outline-none focus:ring-2";

    const variantClasses = {
      default:
        "border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white",
      filled:
        "border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-200",
      outlined:
        "border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white",
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };

    const errorClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "";

    const disabledClasses = disabled
      ? "opacity-50 cursor-not-allowed bg-gray-50"
      : "";

    const widthClasses = fullWidth ? "w-full" : "";

    const paddingWithIcons = () => {
      let paddingClasses = sizeClasses[size];
      if (startIcon) {
        paddingClasses = paddingClasses.replace("px-", "pl-10 pr-");
      }
      if (endIcon) {
        paddingClasses = paddingClasses
          .replace("px-", "pl-")
          .replace("pr-", "pr-10");
      }
      return paddingClasses;
    };

    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      paddingWithIcons(),
      errorClasses,
      disabledClasses,
      widthClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium mb-2 ${
              error ? "text-red-700" : "text-gray-700"
            } ${disabled ? "opacity-50" : ""}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {endIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            className={`mt-1 text-sm text-gray-500 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
