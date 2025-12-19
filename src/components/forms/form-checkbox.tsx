"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFormField } from "@/contexts";
import { formatTitle } from "@/utils";
import Icon from "../ui/icon";

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
  helperText?: string; // Yardımcı metin
  isRequired?: boolean; // Helper text kırmızı renkte gösterilir
  isRequiredText?: string; // isRequired aktifken gösterilecek özel metin
  options?: { value: string; label: string }[];
  multi?: boolean;
  grouped?: boolean;
  groups?: CheckboxGroup[];
  groupedTitle?: string;
  groupedDescription?: string;
  direction?: "vertical" | "horizontal";
  col?: 1 | 2 | 3 | 4 | 6 | 12; // Bootstrap grid column sayısı
  variant?: FormCheckboxVariant; // Yeni variant özelliği
  maxSelection?: number; // Maksimum seçim sayısı (sadece multi ve grouped modda)
  isCollapsible?: boolean; // Collapse/Accordion özelliği (her grup için)
  defaultCollapsed?: boolean; // Varsayılan olarak kapalı mı (default: true)
}

// Collapsible Group Item Component - Her grup için ayrı collapse state'i
interface CollapsibleGroupItemProps {
  group: CheckboxGroup;
  formValue: any;
  onChange: (value: any) => void;
  maxSelection?: number;
  disabled: boolean;
  direction: "vertical" | "horizontal";
  columnClass: string;
  containerClasses: string;
  isCollapsible: boolean;
  defaultCollapsed: boolean;
  name: string;
  rest: any;
}

const CollapsibleGroupItem: React.FC<CollapsibleGroupItemProps> = ({
  group,
  formValue,
  onChange,
  maxSelection,
  disabled,
  direction,
  columnClass,
  containerClasses,
  isCollapsible,
  defaultCollapsed,
  name,
  rest,
}) => {
  const [isOpen, setIsOpen] = useState(!defaultCollapsed);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  // Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      if (isCollapsible) {
        setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
      } else {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }
  }, [isOpen, isCollapsible, group.properties]);

  // Scroll to group when opened
  useEffect(() => {
    if (isOpen && isCollapsible && groupRef.current) {
      // Biraz gecikme ile scroll yap (animasyon başladıktan sonra)
      const scrollTimeout = setTimeout(() => {
        if (groupRef.current) {
          const elementRect = groupRef.current.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const offset = 20; // Üstten biraz boşluk bırak

          window.scrollTo({
            top: absoluteElementTop - offset,
            behavior: "smooth",
          });
        }
      }, 150);
      return () => clearTimeout(scrollTimeout);
    }
  }, [isOpen, isCollapsible]);

  // Toggle collapse
  const toggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    propertyValue: string
  ) => {
    const isChecked = e.target.checked;
    const currentValues = Array.isArray(formValue) ? formValue : [];

    if (isChecked) {
      // Maksimum seçim kontrolü
      if (maxSelection && currentValues.length >= maxSelection) {
        return; // Maksimum seçim sayısına ulaşıldı, yeni seçime izin verme
      }

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
        currentValues.filter((item: any) => item !== propertyValue) as any
      );
    }
  };

  // Grup içinden seçili öğe sayısını hesapla
  const selectedCount = Array.isArray(formValue)
    ? group.properties.filter((p) => formValue.includes(p.value)).length
    : 0;
  const hasSelection = selectedCount > 0;

  return (
    <div
      ref={groupRef}
      key={group.groupId}
      className={`property-group mb-20 ${containerClasses}`}
      style={{ scrollMarginTop: "20px" }}
    >
      {/* Group Header with Collapse Toggle */}
      <div
        className={`d-flex align-items-center justify-content-between ${
          isCollapsible ? "cursor-pointer" : ""
        }`}
        onClick={isCollapsible ? toggleCollapse : undefined}
      >
        <div className="d-flex align-items-center gap-8">
          {/* Seçili ise tik ikonu göster */}
          {hasSelection && (
            <span
              className="d-flex align-items-center justify-content-center bg-success-100 text-success-600 rounded-circle"
              style={{ width: "24px", height: "24px" }}
            >
              <i className="ph ph-check text-sm fw-bold"></i>
            </span>
          )}
          <h6 className="mb-0 text-neutral-600 fw-semibold">
            {formatTitle(group.groupDisplayName)}
            {group.isMultiple === false && (
              <span className="text-neutral-400 ms-2 fw-normal text-sm">
                ({formatTitle("tek seçim")})
              </span>
            )}
          </h6>
        </div>
        <div className="d-flex align-items-center gap-12">
          {/* Seçili öğe sayısını göster */}
          {hasSelection && (
            <span className="badge bg-main-100 text-main-600 fw-medium px-12 py-4 rounded-pill text-sm">
              {selectedCount} {formatTitle("seçenek seçildi")}
            </span>
          )}
          {isCollapsible && (
            <Icon
              icon={isOpen ? "ph-caret-up" : "ph-caret-down"}
              variant="inline"
              size="md"
              onClick={toggleCollapse}
              className="accordion-toggle-icon"
              animate={false}
            />
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className={
          isCollapsible
            ? `overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "card-expand-transition opacity-100" : "opacity-0"
              }`
            : ""
        }
        style={{
          maxHeight: isCollapsible ? `${contentHeight}px` : "none",
          transition: isCollapsible
            ? "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out"
            : "none",
        }}
      >
        {/* Inner wrapper with padding to prevent clipping */}
        <div className={isCollapsible ? "pb-16 ps-4" : ""}>
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
                    data-field-name={name}
                    type="checkbox"
                    className="form-check-input bg-main-25"
                    checked={isChecked}
                    onChange={(e) => handleChange(e, property.value)}
                    disabled={
                      disabled ||
                      Boolean(
                        maxSelection &&
                          !isChecked &&
                          Array.isArray(formValue) &&
                          formValue.length >= maxSelection
                      )
                    }
                    {...rest}
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor={`${name}-${group.groupId}-${property.value}`}
                  >
                    {formatTitle(property.label)}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  name,
  label,
  value,
  helperText,
  isRequired = false,
  isRequiredText,
  options,
  multi = false,
  grouped = false,
  groups,
  groupedTitle,
  groupedDescription,
  direction = "vertical",
  col = 12,
  variant = "inline",
  maxSelection,
  isCollapsible = false,
  defaultCollapsed = true,
  className,
  disabled = false,
  ...rest
}) => {
  const { value: formValue, error, required, onChange } = useFormField(name);

  // Column class'ını oluştur
  const columnClass = `col-${col}`;

  // Variant bazlı container stilleri
  const getContainerClasses = () => {
    if (variant === "outlined") {
      return grouped
        ? "bg-white rounded-32 px-24 pt-24 pb-32"
        : "bg-white rounded-32 px-24 py-12";
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
            {groupedTitle && (
              <h5 className="mb-16">{formatTitle(groupedTitle)}</h5>
            )}
            {groupedDescription && (
              <p className="text-neutral-500 text-sm mb-0">
                {groupedDescription}
              </p>
            )}
          </div>
        )}

        {/* Checkbox Grupları - Her biri kendi collapse state'ine sahip */}
        <div className="d-flex flex-column gap-20">
          {groups.map((group) => (
            <CollapsibleGroupItem
              key={group.groupId}
              group={group}
              formValue={formValue}
              onChange={onChange}
              maxSelection={maxSelection}
              disabled={disabled}
              direction={direction}
              columnClass={columnClass}
              containerClasses={getContainerClasses()}
              isCollapsible={isCollapsible}
              defaultCollapsed={defaultCollapsed}
              name={name}
              rest={rest}
            />
          ))}
        </div>
      </div>
    );
  }

  // Multi checkbox ile birden fazla seçenek göster
  if (options && multi) {
    return (
      <div className={`${getContainerClasses()} ${className || ""}`}>
        {label && (
          <h6 className="mb-12 text-neutral-600 fw-semibold">
            {typeof label === "string" ? formatTitle(label) : label}
          </h6>
        )}
        <div className="d-flex flex-column gap-16">
          {options.map((option) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const isChecked = e.target.checked;
              const currentValues = Array.isArray(formValue) ? formValue : [];

              if (isChecked) {
                // Maksimum seçim kontrolü
                if (maxSelection && currentValues.length >= maxSelection) {
                  return; // Maksimum seçim sayısına ulaşıldı, yeni seçime izin verme
                }
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
                  data-field-name={name}
                  type="checkbox"
                  className="form-check-input bg-main-25"
                  checked={isChecked}
                  onChange={handleChange}
                  disabled={
                    disabled ||
                    Boolean(
                      maxSelection &&
                        !isChecked &&
                        Array.isArray(formValue) &&
                        formValue.length >= maxSelection
                    )
                  }
                  {...rest}
                />
                <label
                  className="form-check-label fw-normal flex-grow-1"
                  htmlFor={`${name}-${option.value}`}
                >
                  {formatTitle(option.label)}
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
    <div className={className || ""}>
      <div
        className={`form-check common-check mb-0 ${
          variant === "outlined" ? "ps-48" : ""
        } ${getContainerClasses()}`}
      >
        <input
          id={id || `${name}-${value || label}`}
          name={name}
          data-field-name={name}
          type="checkbox"
          className="form-check-input bg-main-25"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          {...rest}
        />
        <label
          className="form-check-label fw-normal flex-grow-1"
          htmlFor={id || `${name}-${value || label}`}
        >
          {typeof label === "string" ? formatTitle(label) : label}
        </label>
      </div>
      {error && (
        <div className="text-danger-600 text-sm mt-8 ps-24">{error}</div>
      )}
      {!error && isRequired && !isChecked && (
        <small className="text-danger-600 fw-semibold d-block mt-8 ms-28">
          {isRequiredText || "* Bu alan zorunludur."}
        </small>
      )}
      {!error && !isRequired && helperText && (
        <small className="text-muted d-block mt-8 ms-28">{helperText}</small>
      )}
    </div>
  );
};
