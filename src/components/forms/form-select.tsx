"use client";

import React from "react";
import { useFormField } from "@/contexts";
import { Select, SelectOption } from "@/components/ui/select";

// FormSelect props tipi
type FormSelectOption = SelectOption;

interface FormSelectProps {
  name: string;
  options: FormSelectOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
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
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (selectedValue: string | number) => {
    // Boş değer kontrolü
    if (selectedValue === "") {
      await onChange("");
      return;
    }
    // Number değeri kontrol et
    const option = options.find(
      (opt) => opt.value.toString() === selectedValue.toString()
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
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Select
        options={options}
        value={
          typeof value === "string" || typeof value === "number" ? value : ""
        }
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />

      {helperText && !error && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}

      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};
