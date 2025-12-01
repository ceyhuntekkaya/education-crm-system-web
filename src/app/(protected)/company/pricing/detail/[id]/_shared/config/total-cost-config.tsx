import React from "react";
import type { TotalCostItemConfig } from "../types";

/**
 * Toplam maliyetler konfigürasyonu
 */
export const totalCostConfig: TotalCostItemConfig[] = [
  {
    label: "Yıllık Toplam Maliyet",
    value: (pricing, formatPrice) => (
      <div className="d-flex align-items-center gap-8">
        <span className="bg-danger-50 text-danger-600 px-12 py-6 rounded-8 fw-bold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-wallet text-sm"></i>
          {pricing?.formattedTotalCost ||
            (formatPrice
              ? formatPrice(pricing?.totalAnnualCost, pricing?.currency)
              : "Belirtilmemiş")}
        </span>
        <span className="text-neutral-500 text-xs d-flex align-items-center gap-4">
          <i className="ph ph-info text-xs"></i>
          Yıllık öğrenim + tüm ek ücretler toplamı
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.totalAnnualCost || 0) > 0,
  },
  {
    label: "Aylık Toplam Maliyet",
    value: (pricing, formatPrice) => (
      <div className="d-flex align-items-center gap-8">
        <span className="bg-warning-50 text-warning-600 px-12 py-6 rounded-8 fw-bold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-calendar-star text-sm"></i>
          {formatPrice
            ? formatPrice(pricing?.totalMonthlyCost, pricing?.currency)
            : "Belirtilmemiş"}
        </span>
        <span className="text-neutral-500 text-xs d-flex align-items-center gap-4">
          <i className="ph ph-info text-xs"></i>
          Yıllık toplam / 12 ay olarak hesaplanır
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.totalMonthlyCost || 0) > 0,
  },
  {
    label: "Tek Seferlik Ücretler Toplamı",
    value: (pricing, formatPrice) => (
      <div className="d-flex align-items-center gap-8">
        <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 fw-bold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-receipt text-sm"></i>
          {formatPrice
            ? formatPrice(pricing?.totalOneTimeFees, pricing?.currency)
            : "Belirtilmemiş"}
        </span>
        <span className="text-neutral-500 text-xs d-flex align-items-center gap-4">
          <i className="ph ph-info text-xs"></i>
          Kayıt, başvuru ve kesin kayıt ücretleri toplamı
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.totalOneTimeFees || 0) > 0,
  },
];
