"use client";

import React from "react";
import { useFormField } from "@/contexts";

export interface CheckboxGroup {
  groupId: number | string;
  groupName: string;
  groupDisplayName: string;
  isMultiple?: boolean;
  properties: { value: string; label: string }[];
}

type FormCheckboxVariant = "inline" | "outlined";

interface FormCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label: string | React.ReactNode;
  value?: string;
  options?: { value: string; label: string }[];
  multi?: boolean;
  grouped?: boolean;
  groups?: CheckboxGroup[];
  groupedTitle?: string;
  groupedDescription?: string;
  direction?: "vertical" | "horizontal";
  col?: 1 | 2 | 3 | 4 | 6 | 12; // Bootstrap grid column sayısı
  variant?: FormCheckboxVariant; // Yeni variant özelliği
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  name,
  label,
  value,
  options,
  multi = false,
  grouped = false,
  groups,
  groupedTitle,
  groupedDescription,
  direction = "vertical",
  col = 12,
  variant = "inline",
  className,
  disabled = false,
  ...rest
}) => {
  const { value: formValue, onChange } = useFormField(name);

  // Column class'ını oluştur
  const columnClass = `col-${col}`;

  // Variant bazlı container stilleri
  const getContainerClasses = () => {
    if (variant === "outlined") {
      return "bg-white border border-neutral-30 rounded-12 p-24";
    }
    return "";
  };

  // Grouped checkbox - Gruplandırılmış seçenekler
  if (grouped && groups && groups.length > 0) {
    return (
      <div className={className || ""}>
        {/* Başlık ve Açıklama */}
        {(groupedTitle || groupedDescription) && (
          <div className="mb-24">
            {groupedTitle && <h5 className="mb-16">{groupedTitle}</h5>}
            {groupedDescription && (
              <p className="text-neutral-500 text-sm mb-16">
                {groupedDescription}
              </p>
            )}
          </div>
        )}

        {/* Checkbox Grupları */}
        <div className="d-flex flex-column gap-20">
          {groups.map((group) => {
            const handleChange = (
              e: React.ChangeEvent<HTMLInputElement>,
              propertyValue: string
            ) => {
              const isChecked = e.target.checked;
              const currentValues = Array.isArray(formValue) ? formValue : [];

              if (isChecked) {
                // Eğer grup isMultiple=false ise (tek seçim), önce aynı gruptaki diğer seçenekleri kaldır
                if (group.isMultiple === false) {
                  const otherGroupValues = group.properties
                    .map((p) => p.value)
                    .filter((v) => v !== propertyValue);
                  const filteredValues = currentValues.filter(
                    (item: any) => !otherGroupValues.includes(item)
                  );
                  onChange([...filteredValues, propertyValue] as any);
                } else {
                  // Çoklu seçim - direkt ekle
                  onChange([...currentValues, propertyValue] as any);
                }
              } else {
                // Checkbox kaldırıldı - değeri çıkar
                onChange(
                  currentValues.filter(
                    (item: any) => item !== propertyValue
                  ) as any
                );
              }
            };

            return (
              <div
                key={group.groupId}
                className={`property-group mb-20 ${getContainerClasses()}`}
              >
                <h6 className="mb-12 text-neutral-600 fw-semibold">
                  {group.groupDisplayName}
                  {group.isMultiple === false && (
                    <span className="text-neutral-400 ms-2 fw-normal text-sm">
                      (Tek seçim)
                    </span>
                  )}
                </h6>
                <div
                  className={
                    direction === "horizontal"
                      ? "row row-gap-12"
                      : "d-flex flex-column gap-12"
                  }
                >
                  {group.properties.map((property) => {
                    const isChecked = Array.isArray(formValue)
                      ? formValue.includes(property.value)
                      : false;

                    return (
                      <div
                        key={property.value}
                        className={
                          direction === "horizontal"
                            ? `${columnClass} form-check common-check mb-0 mt-20 ps-32`
                            : "form-check common-check mb-0"
                        }
                      >
                        <input
                          id={`${name}-${group.groupId}-${property.value}`}
                          name={`${name}-${group.groupId}`}
                          type="checkbox"
                          className="form-check-input bg-main-25"
                          checked={isChecked}
                          onChange={(e) => handleChange(e, property.value)}
                          disabled={disabled}
                          {...rest}
                        />
                        <label
                          className="form-check-label fw-normal flex-grow-1"
                          htmlFor={`${name}-${group.groupId}-${property.value}`}
                        >
                          {property.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Multi checkbox ile birden fazla seçenek göster
  if (options && multi) {
    return (
      <div className={`${getContainerClasses()} ${className || ""}`}>
        {label && (
          <h6 className="mb-12 text-neutral-600 fw-semibold">{label}</h6>
        )}
        <div className="d-flex flex-column gap-16">
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
    <div
      className={`form-check common-check mb-0 ${
        variant === "outlined" ? "ps-48" : ""
      } ${getContainerClasses()} ${className || ""}`}
    >
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
