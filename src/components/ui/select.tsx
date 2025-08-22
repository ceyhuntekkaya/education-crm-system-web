import React from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "filled" | "outlined";
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Seçiniz...",
  disabled = false,
  className = "",
  variant = "default",
}) => {
  const baseClasses =
    "transition-all duration-200 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed";
  const variantClasses = {
    default:
      "border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white",
    filled:
      "border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-200",
    outlined:
      "border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white",
  };
  return (
    <select
      className={`${baseClasses} ${variantClasses[variant]} ${className} px-3 py-2`}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
