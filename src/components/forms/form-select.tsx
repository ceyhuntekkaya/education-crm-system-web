"use client";

import React from "react";
import { useFormField } from "@/contexts";

type FormSelectVariant = "inline" | "outline" | "primary";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  variant?: FormSelectVariant;
  options: { value: string; label: string }[];
  iconLeft?: string;
  iconRight?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  variant = "primary",
  options,
  className,
  disabled = false,
  iconLeft,
  iconRight,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  // Variant bazlı stil sınıfları
  const getVariantClasses = (): string => {
    const baseClasses = "rounded-pill outline-0 w-100 h-48";
    const leftPadding = iconLeft ? "ps-60" : "px-16";
    const rightPadding = iconRight ? "pe-60" : "";

    switch (variant) {
      case "inline":
        return `${baseClasses} common-input bg-main-25 ${
          iconLeft ? "ps-48" : ""
        } ${iconRight ? "pe-48" : ""} border-neutral-30`;
      case "outline":
        return `${baseClasses} bg-white text-black border border-transparent focus-border-main-600 ${leftPadding} ${rightPadding}`;
      default:
        return `${baseClasses} common-input ${iconLeft ? "ps-48" : ""} ${
          iconRight ? "pe-48" : ""
        } border-transparent focus-border-main-600`;
    }
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-neutral-700 text-lg fw-medium mb-12"
        >
          {label}
        </label>
      )}
      <div className={iconLeft || iconRight ? "position-relative" : ""}>
        <select
          id={id || name}
          name={name}
          className={getVariantClasses()}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {iconLeft && (
          <span
            className={`${
              variant === "outline"
                ? "bg-white text-neutral-200 border border-main-25 border-4 w-48 h-48 text-2xl"
                : "bg-main-600 hover-bg-main-700 text-white w-36 h-36 text-md ms-8"
            } rounded-circle flex-center position-absolute top-50 translate-middle-y inset-inline-start-0`}
          >
            <i className={`ph-bold ${iconLeft}`} />
          </span>
        )}
        {iconRight && (
          <span
            className={`${
              variant === "outline"
                ? "bg-white text-neutral-200 border border-main-25 border-4 w-48 h-48 text-2xl"
                : "bg-main-600 hover-bg-main-700 text-white w-36 h-36 text-md me-8"
            } rounded-circle flex-center position-absolute top-50 translate-middle-y inset-inline-end-0`}
          >
            <i className={`ph-bold ${iconRight}`} />
          </span>
        )}
      </div>
      {error && <div className="text-danger-600 text-sm mt-8">{error}</div>}
    </div>
  );
};
