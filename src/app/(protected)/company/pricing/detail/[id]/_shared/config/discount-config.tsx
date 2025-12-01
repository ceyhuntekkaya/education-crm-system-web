import React from "react";
import type { DiscountItemConfig } from "../types";

/**
 * İndirimler ve yardımlar konfigürasyonu
 */
export const discountConfig: DiscountItemConfig[] = [
  {
    label: "Erken Ödeme İndirimi",
    value: (pricing) => (
      <span className="text-success-600 fw-semibold">
        %{pricing?.earlyPaymentDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.earlyPaymentDiscountPercentage || 0) > 0,
  },
  {
    label: "Kardeş İndirimi",
    value: (pricing) => (
      <span className="text-success-600 fw-semibold">
        %{pricing?.siblingDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.siblingDiscountPercentage || 0) > 0,
  },
  {
    label: "Çok Yıllık İndirim",
    value: (pricing) => (
      <span className="text-success-600 fw-semibold">
        %{pricing?.multiYearDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.multiYearDiscountPercentage || 0) > 0,
  },
  {
    label: "Sadakat İndirimi",
    value: (pricing) => (
      <span className="text-success-600 fw-semibold">
        %{pricing?.loyaltyDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.loyaltyDiscountPercentage || 0) > 0,
  },
  {
    label: "İhtiyaç Temelli Yardım",
    value: (pricing) => (
      <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-hand-heart text-sm"></i>
        Mevcut
      </span>
    ),
    isShowing: (pricing) => pricing?.needBasedAidAvailable === true,
  },
  {
    label: "Başarı Temelli Yardım",
    value: (pricing) => (
      <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-trophy text-sm"></i>
        Mevcut
      </span>
    ),
    isShowing: (pricing) => pricing?.meritBasedAidAvailable === true,
  },
];
