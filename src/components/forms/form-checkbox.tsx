"use client";

import React from "react";
import { useFormField } from "@/contexts";

// FormCheckbox props tipi
interface FormCheckboxProps {
  name: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

// FormCheckbox bileşeni
export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  helperText,
  disabled = false,
  className = "",
  checkboxClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperClassName = "",
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await onChange(e.target.checked);
  };

  const isChecked = Boolean(value);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-start gap-2">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={`
            mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600
            focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${checkboxClassName}
          `}
        />

        {label && (
          <label
            htmlFor={name}
            className={`text-sm cursor-pointer ${
              error ? "text-red-600" : "text-gray-700"
            } ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>

      {helperText && !error && (
        <span className={`text-xs text-gray-500 ml-6 ${helperClassName}`}>
          {helperText}
        </span>
      )}

      {error && (
        <span className={`text-sm text-red-600 ml-6 ${errorClassName}`}>
          {error}
        </span>
      )}
    </div>
  );
};
