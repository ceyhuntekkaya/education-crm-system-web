"use client";

import React from "react";
import { useFormField } from "@/contexts";

interface FormRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label: string;
  value: string;
  options?: { value: string; label: string }[];
  multi?: boolean;
}

export const FormRadio: React.FC<FormRadioProps> = ({
  id,
  name,
  label,
  value,
  options,
  multi = false,
  className,
  disabled = false,
  ...rest
}) => {
  const { value: formValue, onChange } = useFormField(name);

  // Multi radio ile birden fazla seçenek göster
  if (options && multi) {
    return (
      <div className={`d-flex flex-column gap-16 ${className || ""}`}>
        {options.map((option) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
              onChange(option.value);
            }
          };

          return (
            <div
              key={option.value}
              className="form-check common-check common-radio mb-0"
            >
              <input
                id={`${name}-${option.value}`}
                name={name}
                type="radio"
                className="form-check-input"
                value={option.value}
                checked={formValue === option.value}
                onChange={handleChange}
                disabled={disabled}
                {...rest}
              />
              <label
                className="form-check-label fw-normal flex-grow-1"
                htmlFor={`${name}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }

  // Tek radio
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(value);
    }
  };

  return (
    <div
      className={`form-check common-check common-radio mb-0 ${className || ""}`}
    >
      <input
        id={id || `${name}-${value}`}
        name={name}
        type="radio"
        className="form-check-input"
        value={value}
        checked={formValue === value}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <label
        className="form-check-label fw-normal flex-grow-1"
        htmlFor={id || `${name}-${value}`}
      >
        {label}
      </label>
    </div>
  );
};
