"use client";

import React from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      "transition-all duration-200 border rounded-lg focus:outline-none focus:ring-2 resize-vertical";
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

    const textareaClasses = [
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
        {label && (
          <label
            htmlFor={textareaId}
            className={`block text-sm font-medium mb-2 ${
              error ? "text-red-700" : "text-gray-700"
            } ${disabled ? "opacity-50" : ""}`}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          className={
            error
              ? `${textareaClasses} text-red-600 placeholder-red-400`
              : textareaClasses
          }
          {...props}
        />
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

Textarea.displayName = "Textarea";

export default Textarea;
