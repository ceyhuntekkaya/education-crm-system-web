import React from "react";
import type { TuitionFeeItemConfig } from "../types";

/**
 * Öğrenim ücretleri konfigürasyonu
 */
export const tuitionFeeConfig: TuitionFeeItemConfig[] = [
  {
    label: "Yıllık Öğrenim Ücreti",
    value: (pricing, formatPrice) => (
      <div className="d-flex align-items-center gap-8">
        <span className="bg-warning-50 text-warning-700 px-16 py-8 rounded-8 fw-bold d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-calendar-check text-lg"></i>
          {pricing?.formattedAnnualTuition ||
            (formatPrice
              ? formatPrice(pricing?.annualTuition, pricing?.currency)
              : "Belirtilmemiş")}
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.annualTuition || 0) > 0,
  },
  {
    label: "Aylık Öğrenim Ücreti",
    value: (pricing, formatPrice) => (
      <div className="d-flex align-items-center gap-8">
        <span className="bg-success-50 text-success-700 px-16 py-8 rounded-8 fw-bold d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-calendar text-lg"></i>
          {pricing?.formattedMonthlyTuition ||
            (formatPrice
              ? formatPrice(pricing?.monthlyTuition, pricing?.currency)
              : "Belirtilmemiş")}
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.monthlyTuition || 0) > 0,
  },
  {
    label: "Dönemlik Öğrenim Ücreti",
    value: (pricing, formatPrice) => (
      <div className="d-flex align-items-center gap-8">
        <span className="bg-info-50 text-info-700 px-16 py-8 rounded-8 fw-bold d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-calendar-dots text-lg"></i>
          {formatPrice
            ? formatPrice(pricing?.semesterTuition, pricing?.currency)
            : "Belirtilmemiş"}
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.semesterTuition || 0) > 0,
  },
];
