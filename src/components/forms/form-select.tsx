"use client";

import React from "react";
import { useFormField } from "@/contexts";

// FormSelect props tipi
interface FormSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  name: string;
  options: FormSelectOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

// FormSelect bileşeni
export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  options,
  placeholder = "Seçiniz...",
  label,
  helperText,
  disabled = false,
  className = "",
  selectClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperClassName = "",
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // Boş değer kontrolü
    if (selectedValue === "") {
      await onChange("");
      return;
    }

    // Number değeri kontrol et
    const option = options.find(
      (opt) => opt.value.toString() === selectedValue
    );
    if (option) {
      await onChange(option.value);
    }
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

      <select
        id={name}
        name={name}
        value={value ? value.toString() : ""}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        className={`
          px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 text-red-600 focus:ring-red-500 focus:border-red-500"
              : "text-gray-900"
          }
          ${selectClassName}
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

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
