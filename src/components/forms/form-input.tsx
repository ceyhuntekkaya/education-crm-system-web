"use client";

import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useFormField } from "@/contexts";

type FormInputVariant = "inline" | "outline";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  variant?: FormInputVariant;
  customStyle?: boolean;
  iconLeft?: string;
  iconRight?: string;
  fullWidth?: boolean;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "telephone"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "color";
  // Number format özel ayarları
  numberFormatProps?: {
    thousandSeparator?: string;
    decimalSeparator?: string;
    allowNegative?: boolean;
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    prefix?: string;
    suffix?: string;
  };
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
  fullWidth = false,
  numberFormatProps,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  // Telefon için display state
  const [displayValue, setDisplayValue] = useState<string>("");

  // Türkiye telefon formatlaması - sadece gösterim için
  const formatPhoneDisplay = (value: string): string => {
    // Sadece rakamları al
    const cleaned = value.replace(/\D/g, "");

    // Türkiye telefon numarası kontrolü (05XX format)
    if (cleaned.length === 0) return "";

    // İlk rakam 0 değilse, başına 0 ekle
    let phone = cleaned;
    if (phone.length > 0 && phone[0] !== "0") {
      phone = "0" + phone;
    }

    // Formatla: (05XX) XXX XX XX
    if (phone.length <= 4) {
      return `(${phone}`;
    } else if (phone.length <= 7) {
      return `(${phone.slice(0, 4)}) ${phone.slice(4)}`;
    } else if (phone.length <= 9) {
      return `(${phone.slice(0, 4)}) ${phone.slice(4, 7)} ${phone.slice(7)}`;
    } else {
      return `(${phone.slice(0, 4)}) ${phone.slice(4, 7)} ${phone.slice(
        7,
        9
      )} ${phone.slice(9, 11)}`;
    }
  };

  // Telefon numarasından sadece rakamları al
  const getCleanPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    // İlk rakam 0 değilse, başına 0 ekle
    if (cleaned.length > 0 && cleaned[0] !== "0") {
      return "0" + cleaned;
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;

    if (type === "telephone" || type === "tel") {
      // Display value'yu formatla
      const formatted = formatPhoneDisplay(val as string);
      setDisplayValue(formatted);

      // Actual value olarak sadece rakamları gönder
      const cleanValue = getCleanPhoneNumber(val as string);
      onChange(cleanValue);
    } else if (type === "number" && val !== "") {
      val = Number(val);
      onChange(val);
    } else {
      onChange(val);
    }
  };

  // NumericFormat için özel onChange handler
  const handleNumericChange = (values: any) => {
    const { floatValue } = values;
    onChange(floatValue || 0);
  };

  // Akıllı varsayılan format belirleme
  const getSmartNumberFormat = () => {
    // Eğer özel numberFormatProps verilmişse onu kullan
    if (numberFormatProps) {
      return numberFormatProps;
    }

    // İsim bazlı akıllı format tanıması
    const nameLower = name.toLowerCase();

    // Yüzde formatları
    if (
      nameLower.includes("percentage") ||
      nameLower.includes("percent") ||
      nameLower.includes("discount")
    ) {
      return {
        suffix: " %",
        thousandSeparator: ".",
        decimalSeparator: ",",
        decimalScale: 2,
        allowNegative: false,
      };
    }

    // Sayı formatları (count, quantity, installment)
    if (
      nameLower.includes("count") ||
      nameLower.includes("quantity") ||
      nameLower.includes("installment")
    ) {
      return {
        thousandSeparator: ".",
        decimalSeparator: ",",
        decimalScale: 0,
        allowNegative: false,
      };
    }

    // Para formatları (fee, tuition, cost, price, amount, salary)
    if (
      nameLower.includes("fee") ||
      nameLower.includes("tuition") ||
      nameLower.includes("cost") ||
      nameLower.includes("price") ||
      nameLower.includes("amount") ||
      nameLower.includes("salary")
    ) {
      return {
        prefix: "₺ ",
        thousandSeparator: ".",
        decimalSeparator: ",",
        decimalScale: 2,
        allowNegative: false,
      };
    }

    // Varsayılan number formatı
    return {
      thousandSeparator: ".",
      decimalSeparator: ",",
      decimalScale: 2,
      allowNegative: false,
    };
  };

  // Telefon tipinde value'yu kontrol et
  useEffect(() => {
    if ((type === "telephone" || type === "tel") && value) {
      const formatted = formatPhoneDisplay(value as string);
      setDisplayValue(formatted);
    }
  }, [value, type]);

  // Variant bazlı stil sınıfları
  const getVariantClasses = (): string => {
    const baseClasses = "rounded-pill outline-0 h-48";
    const widthClass = fullWidth ? "w-100" : "";
    const leftPadding = iconLeft ? "ps-60" : "px-16";
    const rightPadding = iconRight ? "pe-60" : "";
    const errorClasses = error
      ? "border-danger-600 text-danger-600 placeholder-danger-600"
      : "";

    switch (variant) {
      case "inline":
        return `${baseClasses} ${widthClass} common-input bg-main-25 ${
          iconLeft ? "ps-48" : ""
        } ${iconRight ? "pe-48" : ""} ${
          error ? "border-danger-600" : "border-neutral-30"
        } ${errorClasses}`;
      case "outline":
        return `${baseClasses} ${widthClass} bg-white ${
          error ? "text-danger-600" : "text-black"
        } border ${
          error
            ? "border-danger-600"
            : "border-transparent focus-border-main-600"
        } ${leftPadding} ${rightPadding} ${
          error ? "placeholder-danger-600" : ""
        }`;
      default:
        return `${baseClasses} ${widthClass} common-input ${
          iconLeft ? "ps-48" : ""
        } ${iconRight ? "pe-48" : ""} ${
          error
            ? "border-danger-600 focus-border-danger-600"
            : "border-transparent focus-border-main-600"
        } ${errorClasses}`;
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

  // Number tipinde NumericFormat kullan
  if (type === "number") {
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
          <NumericFormat
            id={id || name}
            name={name}
            className={getVariantClasses()}
            placeholder={placeholder}
            disabled={disabled}
            value={
              typeof value === "number"
                ? value
                : typeof value === "string" && value !== ""
                ? parseFloat(value) || 0
                : undefined
            }
            onValueChange={handleNumericChange}
            required={required}
            {...getSmartNumberFormat()}
          />
          {iconLeft && (
            <span
              className={`${
                variant === "outline"
                  ? "bg-white text-neutral-200 border-4 border-main-25 w-48 h-48 text-2xl"
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
                  ? "bg-white text-neutral-200 border-4 border-main-25 w-48 h-48 text-2xl"
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
          type={type === "telephone" ? "tel" : type}
          className={getVariantClasses()}
          placeholder={placeholder}
          disabled={disabled}
          value={
            type === "telephone" || type === "tel"
              ? displayValue
              : typeof value === "string" || typeof value === "number"
              ? value
              : ""
          }
          onChange={handleChange}
          required={required}
          {...rest}
        />
        {iconLeft && (
          <span
            className={`${
              variant === "outline"
                ? "bg-white text-neutral-200 border-4 border-main-25 w-48 h-48 text-2xl"
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
                ? "bg-white text-neutral-200 border-4 border-main-25 w-48 h-48 text-2xl"
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
