import React from "react";
import type { TuitionFeeItemConfig } from "../types";

/**
 * Öğrenim ücretleri konfigürasyonu
 */
export const tuitionFeeConfig: TuitionFeeItemConfig[] = [
  {
    label: "Aylık Öğrenim Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-success-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-calendar text-sm"></i>
        {pricing?.formattedMonthlyTuition ||
          (formatPrice
            ? formatPrice(pricing?.monthlyTuition, pricing?.currency)
            : "Belirtilmemiş")}
      </span>
    ),
    isShowing: (pricing) => (pricing?.monthlyTuition || 0) > 0,
  },
  {
    label: "Yıllık Öğrenim Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-warning-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-calendar-check text-sm"></i>
        {pricing?.formattedAnnualTuition ||
          (formatPrice
            ? formatPrice(pricing?.annualTuition, pricing?.currency)
            : "Belirtilmemiş")}
      </span>
    ),
    isShowing: (pricing) => (pricing?.annualTuition || 0) > 0,
  },
  {
    label: "Dönemlik Öğrenim Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-info-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-calendar-dots text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.semesterTuition, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.semesterTuition || 0) > 0,
  },
];
