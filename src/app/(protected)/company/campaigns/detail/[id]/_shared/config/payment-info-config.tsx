import React from "react";
import type { PaymentInfoItemConfig } from "../types";
import { formatCurrency, formatNumber } from "@/utils/format-number";

/**
 * Ödeme bilgileri konfigürasyonu
 */
export const paymentInfoConfig: PaymentInfoItemConfig[] = [
  {
    label: "Ücretsiz Deneme Süresi",
    value: (campaign) => (
      <div className="bg-success-50 p-3 rounded border-start border-success-300 border-3">
        <div className="d-flex align-items-center mb-2">
          <i className="ph ph-gift text-success-600 me-2 fs-5"></i>
          <strong className="text-success-700">Ücretsiz Deneme</strong>
        </div>
        <p className="mb-0 text-success-600">
          {formatNumber(campaign?.freeTrialDays || 0)} gün ücretsiz kullanım
          hakkı
        </p>
      </div>
    ),
    isShowing: (campaign) => !!campaign?.freeTrialDays,
  },
  {
    label: "Taksit Seçenekleri",
    value: (campaign) => (
      <div className="bg-info-50 p-3 rounded border-start border-info-300 border-3">
        <div className="d-flex align-items-center mb-2">
          <i className="ph ph-credit-card text-info-600 me-2 fs-5"></i>
          <strong className="text-info-700">Taksit Seçenekleri</strong>
        </div>
        <p className="mb-0 text-info-600">{campaign?.installmentOptions}</p>
      </div>
    ),
    isShowing: (campaign) => !!campaign?.installmentOptions,
  },
  {
    label: "Ödeme Vadesi",
    value: (campaign) => (
      <div className="bg-danger-50 p-3 rounded border-start border-danger-300 border-3">
        <div className="d-flex align-items-center mb-2">
          <i className="ph ph-clock text-danger-600 me-2 fs-5"></i>
          <strong className="text-danger-700">Ödeme Vadesi</strong>
        </div>
        <p className="mb-0 text-danger-600">
          Ödemenin yapılması için{" "}
          {formatNumber(campaign?.paymentDeadlineDays || 0)} gün süre
        </p>
      </div>
    ),
    isShowing: (campaign) => !!campaign?.paymentDeadlineDays,
  },
  {
    label: "İade Politikası",
    value: (campaign) => (
      <div className="bg-warning-50 p-3 rounded border-start border-warning-300 border-3">
        <div className="d-flex align-items-center mb-2">
          <i className="ph ph-shield-check text-warning-600 me-2 fs-5"></i>
          <strong className="text-warning-700">İade Politikası</strong>
        </div>
        <p className="mb-0 text-warning-600">{campaign?.refundPolicy}</p>
      </div>
    ),
    isShowing: (campaign) => !!campaign?.refundPolicy,
  },
];
