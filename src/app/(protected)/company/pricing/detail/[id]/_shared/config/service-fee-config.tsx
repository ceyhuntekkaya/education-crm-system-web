import React from "react";
import type { ServiceFeeItemConfig } from "../types";

/**
 * Hizmet ücretleri konfigürasyonu
 */
export const serviceFeeConfig: ServiceFeeItemConfig[] = [
  {
    label: "Ulaşım Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-bus text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.transportationFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.transportationFee || 0) > 0,
  },
  {
    label: "Kafeterya Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-fork-knife text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.cafeteriaFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.cafeteriaFee || 0) > 0,
  },
  {
    label: "Uzatılmış Gün Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-clock text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.extendedDayFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.extendedDayFee || 0) > 0,
  },
  {
    label: "Sigorta Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-shield-check text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.insuranceFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.insuranceFee || 0) > 0,
  },
  {
    label: "Güvenlik Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-info-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-shield text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.securityFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.securityFee || 0) > 0,
  },
];
