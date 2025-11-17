"use client";

import React, { useState } from "react";
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
  isShowAll?: boolean; // Devamını göster özelliği aktif mi
  minShowingValues?: number; // Başlangıçta gösterilecek minimum değer sayısı (default: 6)
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
  isShowAll = false,
  minShowingValues = 6,
  ...rest
}) => {
  const { value: formValue, error, onChange } = useFormField(name);
  const [isExpanded, setIsExpanded] = useState(false);

  // Gösterilecek seçenekleri hesapla
  const hasMoreOptions =
    isShowAll && options && options.length > minShowingValues;

  // Toggle fonksiyonu
  const toggleShowAll = () => {
    setIsExpanded(!isExpanded);
  };

  // Multi radio ile birden fazla seçenek göster
  if (options && multi) {
    return (
      <div className={className}>
        {/* İlk gösterilen seçenekler */}
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
          {(isShowAll ? options.slice(0, minShowingValues) : options).map(
            (option) => {
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
            }
          )}
        </div>

        {/* Genişletilmiş seçenekler - Accordion gibi animasyonlu */}
        {isShowAll && hasMoreOptions && (
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              maxHeight: isExpanded ? "2000px" : "0px",
              opacity: isExpanded ? 1 : 0,
              overflow: isExpanded ? "visible" : "hidden",
              transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
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
                  ? { gap: "16px", marginTop: "16px" }
                  : direction === "vertical"
                  ? { gap: "16px", marginTop: "16px" }
                  : { marginTop: "16px" }
              }
            >
              {options.slice(minShowingValues).map((option) => {
                const handleChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
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
          </div>
        )}

        {/* Hepsini Göster Butonu - Sade ve Ortalanmış */}
        {hasMoreOptions && (
          <div className="text-center mt-24">
            <button
              type="button"
              onClick={toggleShowAll}
              className="btn d-inline-flex align-items-center gap-8 px-16 py-8 bg-transparent border-0 text-neutral-600 hover-text-main-600"
              style={{
                transition: "color 0.2s ease",
              }}
            >
              <span className="text-sm fw-medium">
                {isExpanded ? "Daha Az Göster" : "Hepsini Göster"}
              </span>
              <i
                className={`ph-bold ${
                  isExpanded ? "ph-caret-up" : "ph-caret-down"
                }`}
              />
            </button>
          </div>
        )}

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
