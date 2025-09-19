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
  direction?: "horizontal" | "vertical";
  col?: number; // Bootstrap col değeri (3, 4, 6, etc.)
}

export const FormRadio: React.FC<FormRadioProps> = ({
  id,
  name,
  label,
  value,
  options,
  multi = false,
  direction = "vertical",
  col,
  className,
  disabled = false,
  ...rest
}) => {
  const { value: formValue, error, onChange } = useFormField(name);

  // Multi radio ile birden fazla seçenek göster
  if (options && multi) {
    return (
      <div className={className}>
        <div
          className={`d-flex ${
            direction === "horizontal"
              ? col
                ? "row g-2"
                : "flex-wrap"
              : "flex-column"
          }`}
          style={
            direction === "horizontal" && !col
              ? { gap: "16px" }
              : direction === "vertical"
              ? { gap: "8px" }
              : {}
          }
        >
          {options.map((option) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                onChange(option.value);
              }
            };

            const radioElement = (
              <div
                className="form-check common-check common-radio mb-0 d-flex align-items-start"
                style={
                  direction === "horizontal" && !col
                    ? { minWidth: "fit-content", whiteSpace: "nowrap" }
                    : {}
                }
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
                  className="form-check-label fw-normal"
                  htmlFor={`${name}-${option.value}`}
                  style={{ lineHeight: "1.2", marginLeft: "-6px" }}
                >
                  {option.label}
                </label>
              </div>
            );

            // Col değeri varsa ve horizontal ise her radio button'u col ile sar
            if (col && direction === "horizontal") {
              return (
                <div key={option.value} className={`col-${col}`}>
                  {radioElement}
                </div>
              );
            }

            return <div key={option.value}>{radioElement}</div>;
          })}
        </div>
        {error && (
          <div className="text-danger-600 text-sm mt-24 ps-12">{error}</div>
        )}
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
        style={{ marginLeft: "2px" }}
      >
        {label}
      </label>
      {error && (
        <div className="text-danger-600 text-sm mt-8 ps-0">{error}</div>
      )}
    </div>
  );
};
