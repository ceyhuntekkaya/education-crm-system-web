"use client";

import React from "react";
import { useFormField } from "@/contexts";

type FormTextareaVariant = "inline" | "outline";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  variant?: FormTextareaVariant;
  customStyle?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  placeholder,
  label,
  className,
  variant = "primary",
  disabled = false,
  rows = 4,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Variant bazlı stil sınıfları
  const getVariantClasses = (): string => {
    const baseClasses = "rounded-24 outline-0 w-100 px-16 py-12";

    switch (variant) {
      case "inline":
        return `${baseClasses} common-input bg-main-25 border-neutral-30`;
      case "outline":
        return `${baseClasses} bg-white text-black border border-transparent focus-border-main-600`;
      default:
        return `${baseClasses} common-input border-transparent focus-border-main-600`;
    }
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id || name}
          className={"text-neutral-700 text-lg fw-medium mb-12"}
        >
          {label}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        className={getVariantClasses()}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        value={typeof value === "string" ? value : ""}
        onChange={handleChange}
        required={required}
        {...rest}
      />
      {error && <div className="text-danger-600 text-sm mt-8">{error}</div>}
    </div>
  );
};
