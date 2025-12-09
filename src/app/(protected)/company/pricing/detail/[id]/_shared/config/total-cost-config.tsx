import React from "react";
import type { TotalCostItemConfig } from "../types";

/**
 * Toplam maliyetler konfigürasyonu
 */
export const totalCostConfig: TotalCostItemConfig[] = [
  {
    label: "Yıllık Toplam Maliyet",
    value: (pricing, formatPrice) => (
      <div className="d-flex flex-column gap-8">
        <span className="bg-danger-50 text-danger-700 px-20 py-12 rounded-12 fw-bold d-inline-flex align-items-center gap-8 fs-5">
          <i className="ph-bold ph-wallet text-xl"></i>
          {pricing?.formattedTotalCost ||
            (formatPrice
              ? formatPrice(pricing?.totalAnnualCost, pricing?.currency)
              : "Belirtilmemiş")}
        </span>
        <span className="text-neutral-600 text-sm d-flex align-items-center gap-6 ms-8">
          <i className="ph ph-info text-sm"></i>
          Yıllık öğrenim + tüm ek ücretler toplamı
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.totalAnnualCost || 0) > 0,
  },
  {
    label: "Aylık Toplam Maliyet",
    value: (pricing, formatPrice) => (
      <div className="d-flex flex-column gap-8">
        <span className="bg-warning-50 text-warning-700 px-20 py-12 rounded-12 fw-bold d-inline-flex align-items-center gap-8 fs-5">
          <i className="ph-bold ph-calendar-star text-xl"></i>
          {formatPrice
            ? formatPrice(pricing?.totalMonthlyCost, pricing?.currency)
            : "Belirtilmemiş"}
        </span>
        <span className="text-neutral-600 text-sm d-flex align-items-center gap-6 ms-8">
          <i className="ph ph-info text-sm"></i>
          Yıllık toplam / 12 ay olarak hesaplanır
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.totalMonthlyCost || 0) > 0,
  },
  {
    label: "Tek Seferlik Ücretler Toplamı",
    value: (pricing, formatPrice) => (
      <div className="d-flex flex-column gap-8">
        <span className="bg-info-50 text-info-700 px-16 py-10 rounded-12 fw-bold d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-receipt text-lg"></i>
          {formatPrice
            ? formatPrice(pricing?.totalOneTimeFees, pricing?.currency)
            : "Belirtilmemiş"}
        </span>
        <span className="text-neutral-600 text-sm d-flex align-items-center gap-6 ms-8">
          <i className="ph ph-info text-sm"></i>
          Kayıt, başvuru ve kesin kayıt ücretleri toplamı
        </span>
      </div>
    ),
    isShowing: (pricing) => (pricing?.totalOneTimeFees || 0) > 0,
  },
];
