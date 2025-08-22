"use client";

import React from "react";
import { useFormField } from "@/contexts";
import Textarea from "@/components/ui/textarea";

// FormTextarea props tipi
import { TextareaHTMLAttributes } from "react";
interface FormTextareaProps
  extends Partial<TextareaHTMLAttributes<HTMLTextAreaElement>> {
  name: string;
  // UI Textarea props
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  rows?: number;
  disabled?: boolean;
  textareaClassName?: string;
  id?: string;
  // ...existing code...
}

// FormTextarea bileşeni
export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  helperText,
  variant = "default",
  size = "md",
  fullWidth = false,
  rows = 3,
  disabled = false,
  textareaClassName = "",
  id,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    await onChange(e.target.value);
  };

  return (
    <Textarea
      id={id || name}
      name={name}
      label={label}
      error={error}
      helperText={helperText}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      rows={rows}
      disabled={disabled}
      required={required}
      value={typeof value === "string" ? value : ""}
      onChange={handleChange}
      className={textareaClassName}
      {...rest}
    />
  );
};
