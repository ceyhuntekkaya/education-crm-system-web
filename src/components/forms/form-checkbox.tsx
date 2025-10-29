"use client";

import React from "react";
import { useFormField } from "@/contexts";

interface FormCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label: string | React.ReactNode;
  value?: string;
  options?: { value: string; label: string }[];
  multi?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
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

  // Multi checkbox ile birden fazla seçenek göster
  if (options && multi) {
    return (
      <div className={`d-flex flex-column gap-16 ${className || ""}`}>
        {options.map((option) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const isChecked = e.target.checked;
            const currentValues = Array.isArray(formValue) ? formValue : [];

            if (isChecked) {
              onChange([...currentValues, option.value] as any);
            } else {
              onChange(
                currentValues.filter(
                  (item: any) => item !== option.value
                ) as any
              );
            }
          };

          const isChecked = Array.isArray(formValue)
            ? formValue.includes(option.value)
            : false;

          return (
            <div key={option.value} className="form-check common-check mb-0">
              <input
                id={`${name}-${option.value}`}
                name={name}
                type="checkbox"
                className="form-check-input bg-main-25"
                checked={isChecked}
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

  // Tek checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (Array.isArray(formValue)) {
      // Multiple checkbox values
      if (isChecked) {
        onChange([...formValue, value || label] as any);
      } else {
        onChange(
          formValue.filter((item: any) => item !== (value || label)) as any
        );
      }
    } else {
      // Single checkbox
      onChange(isChecked);
    }
  };

  const isChecked = Array.isArray(formValue)
    ? formValue.includes(value || label)
    : Boolean(formValue);

  return (
    <div className={`form-check common-check mb-0 ${className || ""}`}>
      <input
        id={id || `${name}-${value || label}`}
        name={name}
        type="checkbox"
        className="form-check-input bg-main-25"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <label
        className="form-check-label fw-normal flex-grow-1"
        htmlFor={id || `${name}-${value || label}`}
      >
        {label}
      </label>
    </div>
  );
};
