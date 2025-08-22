"use client";

import React from "react";
import { useFormField } from "@/contexts";
import Input, { InputProps } from "@/components/ui/input";

// FormInput props tipi
interface FormInputProps extends Partial<InputProps> {
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
  // Allow passing UI Input extras via extension of InputProps
  variant,
  size,
  startIcon,
  endIcon,
  fullWidth = true,
  id,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    let convertedValue: string | number = inputValue;
    if (type === "number" && inputValue !== "") {
      convertedValue = Number(inputValue);
    }

    await onChange(convertedValue);
  };

  return (
    <div className={`${className}`}>
      <Input
        id={id || name}
        name={name}
        type={type}
        value={
          typeof value === "string" || typeof value === "number" ? value : ""
        }
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClassName}
        label={label}
        error={error}
        helperText={helperText}
        variant={variant}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        fullWidth={fullWidth}
        {...rest}
      />
    </div>
  );
};
