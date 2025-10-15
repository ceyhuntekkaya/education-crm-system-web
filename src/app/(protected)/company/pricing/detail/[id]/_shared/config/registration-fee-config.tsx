import React from "react";
import type { RegistrationFeeItemConfig } from "../types";

/**
 * Kayıt ve başvuru ücretleri konfigürasyonu
 */
export const registrationFeeConfig: RegistrationFeeItemConfig[] = [
  {
    label: "Kayıt Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-primary-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-identification-badge text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.registrationFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.registrationFee || 0) > 0,
  },
  {
    label: "Başvuru Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-info-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-file-text text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.applicationFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.applicationFee || 0) > 0,
  },
  {
    label: "Kesin Kayıt Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-success-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-check-circle text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.enrollmentFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.enrollmentFee || 0) > 0,
  },
];
