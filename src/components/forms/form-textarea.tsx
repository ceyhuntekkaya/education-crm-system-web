"use client";

import React from "react";
import { useFormField } from "@/contexts";

// FormTextarea props tipi
interface FormTextareaProps {
  name: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

// FormTextarea bileşeni
export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  placeholder,
  label,
  helperText,
  rows = 3,
  disabled = false,
  className = "",
  textareaClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperClassName = "",
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    await onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-sm font-medium ${
            error ? "text-red-600" : "text-gray-700"
          } ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={typeof value === "string" ? value : ""}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={`
          px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-vertical
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 text-red-600 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
              : "text-gray-900 placeholder-gray-400"
          }
          ${textareaClassName}
        `}
      />

      {helperText && !error && (
        <span className={`text-xs text-gray-500 ${helperClassName}`}>
          {helperText}
        </span>
      )}

      {error && (
        <span className={`text-sm text-red-600 ${errorClassName}`}>
          {error}
        </span>
      )}
    </div>
  );
};
