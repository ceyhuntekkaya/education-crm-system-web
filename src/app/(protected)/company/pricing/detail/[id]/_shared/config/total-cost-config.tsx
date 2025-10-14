import React from "react";
import type { TotalCostItemConfig } from "../types";

/**
 * Toplam maliyetler konfigürasyonu
 */
export const totalCostConfig: TotalCostItemConfig[] = [
  {
    label: "Yıllık Toplam Maliyet",
    value: (pricing, formatPrice) => (
      <span className="bg-danger-50 text-danger-600 px-12 py-6 rounded-8 fw-bold d-inline-flex align-items-center gap-4">
        <i className="ph-bold ph-wallet text-sm"></i>
        {pricing?.formattedTotalCost ||
          (formatPrice
            ? formatPrice(pricing?.totalAnnualCost, pricing?.currency)
            : "Belirtilmemiş")}
      </span>
    ),
    isShowing: (pricing) => (pricing?.totalAnnualCost || 0) > 0,
  },
  {
    label: "Aylık Toplam Maliyet",
    value: (pricing, formatPrice) => (
      <span className="bg-warning-50 text-warning-600 px-12 py-6 rounded-8 fw-bold d-inline-flex align-items-center gap-4">
        <i className="ph-bold ph-calendar-star text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.totalMonthlyCost, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.totalMonthlyCost || 0) > 0,
  },
  {
    label: "Tek Seferlik Ücretler Toplamı",
    value: (pricing, formatPrice) => (
      <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 fw-bold d-inline-flex align-items-center gap-4">
        <i className="ph-bold ph-receipt text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.totalOneTimeFees, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.totalOneTimeFees || 0) > 0,
  },
];
