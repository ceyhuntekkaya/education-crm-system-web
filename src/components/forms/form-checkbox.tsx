"use client";

import React from "react";
import { useFormField } from "@/contexts";
import Checkbox from "@/components/ui/checkbox";

// FormCheckbox props tipi
interface FormCheckboxProps {
  name: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  checkboxClassName?: string;
  id?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

// FormCheckbox bileşeni
export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  helperText,
  disabled = false,
  checkboxClassName = "",
  id,
  variant = "default",
  size = "md",
  fullWidth = false,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await onChange(e.target.checked);
  };

  return (
    <Checkbox
      id={id || name}
      name={name}
      label={label}
      error={error}
      helperText={helperText}
      checked={Boolean(value)}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={checkboxClassName}
      {...rest}
    />
  );
};
