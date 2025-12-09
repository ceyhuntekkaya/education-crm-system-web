import React from "react";
import type { PaymentInfoItemConfig } from "../types";

/**
 * Ödeme bilgileri konfigürasyonu
 */
export const paymentInfoConfig: PaymentInfoItemConfig[] = [
  {
    label: "Ödeme Sıklığı",
    value: (pricing) => (
      <span className="text-primary-600 fw-semibold">
        {pricing?.paymentFrequency === "ONE_TIME"
          ? "Tek Seferlik"
          : pricing?.paymentFrequency === "MONTHLY"
          ? "Aylık"
          : pricing?.paymentFrequency === "QUARTERLY"
          ? "Üç Aylık"
          : pricing?.paymentFrequency === "SEMESTER"
          ? "Dönemlik"
          : pricing?.paymentFrequency === "ANNUAL"
          ? "Yıllık"
          : pricing?.paymentFrequency === "BIANNUAL"
          ? "Altı Aylık"
          : pricing?.paymentFrequency || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.paymentFrequency,
  },
  {
    label: "Taksit Sayısı",
    value: (pricing) => (
      <span className="text-primary-600 fw-semibold">
        {pricing?.installmentCount || 0} Taksit
      </span>
    ),
    isShowing: (pricing) => (pricing?.installmentCount || 0) > 0,
  },
  {
    label: "Taksit Tutarı",
    value: (pricing, formatPrice) => (
      <span className="text-primary-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-credit-card text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.installmentAmount, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.installmentAmount || 0) > 0,
  },
  {
    label: "Peşinat Oranı",
    value: (pricing) => (
      <span className="text-warning-600 fw-semibold">
        %{pricing?.downPaymentPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.downPaymentPercentage || 0) > 0,
  },
  {
    label: "Peşinat Tutarı",
    value: (pricing, formatPrice) => (
      <span className="text-warning-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-money text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.downPaymentAmount, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.downPaymentAmount || 0) > 0,
  },
  {
    label: "Geç Ödeme Ceza Oranı",
    value: (pricing) => (
      <span className="text-danger-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-warning text-sm"></i>%
        {pricing?.latePaymentPenaltyPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.latePaymentPenaltyPercentage || 0) > 0,
  },
  {
    label: "İptal Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-danger-600 fw-bold d-flex align-items-center gap-4">
        <i className="ph ph-x-circle text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.cancellationFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.cancellationFee || 0) > 0,
  },
  {
    label: "Çekilme İade Oranı",
    value: (pricing) => (
      <span className="text-info-600 fw-semibold">
        %{pricing?.withdrawalRefundPercentage || 0}
      </span>
    ),
    isShowing: (pricing) => (pricing?.withdrawalRefundPercentage || 0) > 0,
  },
];
