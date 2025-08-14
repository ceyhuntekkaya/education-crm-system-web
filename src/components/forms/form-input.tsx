"use client";

import React from "react";
import { useFormField } from "@/contexts";

// FormInput props tipi
interface FormInputProps {
  name: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

// FormInput bileşeni
export const FormInput: React.FC<FormInputProps> = ({
  name,
  type = "text",
  placeholder,
  label,
  helperText,
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperClassName = "",
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Type'a göre değer dönüştürme
    let convertedValue: string | number = inputValue;
    if (type === "number" && inputValue !== "") {
      convertedValue = Number(inputValue);
    }

    await onChange(convertedValue);
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

      <input
        id={name}
        name={name}
        type={type}
        value={
          typeof value === "string" || typeof value === "number" ? value : ""
        }
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 text-red-600 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
              : "text-gray-900 placeholder-gray-400"
          }
          ${inputClassName}
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
