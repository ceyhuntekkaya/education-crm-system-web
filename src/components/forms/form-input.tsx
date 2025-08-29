"use client";

import React, { useState } from "react";
import { useFormField } from "@/contexts";

type FormInputVariant = "inline" | "outline";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  variant?: FormInputVariant;
  customStyle?: boolean;
  iconLeft?: string;
  iconRight?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  label,
  className,
  variant = "primary",
  disabled = false,
  iconLeft,
  iconRight,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;
    if (type === "number" && val !== "") {
      val = Number(val);
    }
    onChange(val);
  };

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

  // Password toggle state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((v) => !v);

  // Eğer type password ise özel tasarım
  if (type === "password") {
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
        <div className="position-relative">
          <input
            id={id || name}
            name={name}
            type={passwordVisible ? "text" : "password"}
            className={getVariantClasses() + " pe-44"}
            placeholder={placeholder}
            disabled={disabled}
            value={
              typeof value === "string" || typeof value === "number"
                ? value
                : ""
            }
            onChange={handleChange}
            required={required}
            {...rest}
          />
          <span
            className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${
              passwordVisible ? "ph-eye" : "ph-eye-closed"
            }`}
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          ></span>
        </div>
        {error && <div className="text-danger-600 text-sm mt-8">{error}</div>}
      </div>
    );
  }

  // Diğer inputlar için mevcut tasarım
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
      <div className={iconLeft || iconRight ? "position-relative" : ""}>
        <input
          id={id || name}
          name={name}
          type={type}
          className={getVariantClasses()}
          placeholder={placeholder}
          disabled={disabled}
          value={
            typeof value === "string" || typeof value === "number" ? value : ""
          }
          onChange={handleChange}
          required={required}
          {...rest}
        />
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
