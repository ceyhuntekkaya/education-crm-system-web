import React from "react";
import type { DiscountItemConfig } from "../types";

/**
 * İndirimler ve yardımlar konfigürasyonu
 */
export const discountConfig: DiscountItemConfig[] = [
  {
    label: "Peşinat Oranı",
    value: (pricing) => (
      <span className="badge bg-primary-subtle text-primary-600 fw-semibold px-12 py-6">
        <i className="ph ph-coins me-4"></i>%
        {pricing?.downPaymentPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.downPaymentPercentage || 0) > 0,
  },
  {
    label: "Erken Ödeme İndirimi",
    value: (pricing) => (
      <span className="badge bg-success-subtle text-success-600 fw-semibold px-12 py-6">
        <i className="ph ph-timer me-4"></i>%
        {pricing?.earlyPaymentDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.earlyPaymentDiscountPercentage || 0) > 0,
  },
  {
    label: "Kardeş İndirimi",
    value: (pricing) => (
      <span className="badge bg-success-subtle text-success-600 fw-semibold px-12 py-6">
        <i className="ph ph-users me-4"></i>%
        {pricing?.siblingDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.siblingDiscountPercentage || 0) > 0,
  },
  {
    label: "Çok Yıllık İndirim",
    value: (pricing) => (
      <span className="badge bg-success-subtle text-success-600 fw-semibold px-12 py-6">
        <i className="ph ph-calendar-star me-4"></i>%
        {pricing?.multiYearDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.multiYearDiscountPercentage || 0) > 0,
  },
  {
    label: "Sadakat İndirimi",
    value: (pricing) => (
      <span className="badge bg-success-subtle text-success-600 fw-semibold px-12 py-6">
        <i className="ph ph-medal me-4"></i>%
        {pricing?.loyaltyDiscountPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.loyaltyDiscountPercentage || 0) > 0,
  },
  {
    label: "İhtiyaç Temelli Yardım",
    value: (pricing) => (
      <span className="badge bg-info-subtle text-info-600 fw-semibold px-12 py-6">
        <i className="ph ph-hand-heart me-4"></i>
        Mevcut
      </span>
    ),
    isShowing: (pricing) => pricing?.needBasedAidAvailable === true,
  },
  {
    label: "Başarı Temelli Yardım",
    value: (pricing) => (
      <span className="badge bg-info-subtle text-info-600 fw-semibold px-12 py-6">
        <i className="ph ph-trophy me-4"></i>
        Mevcut
      </span>
    ),
    isShowing: (pricing) => pricing?.meritBasedAidAvailable === true,
  },
];
