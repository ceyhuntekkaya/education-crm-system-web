import React from "react";
import type { AdditionalFeeItemConfig } from "../types";

/**
 * Ek ücretler konfigürasyonu
 */
export const additionalFeeConfig: AdditionalFeeItemConfig[] = [
  {
    label: "Kitap Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-book text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.bookFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.bookFee || 0) > 0,
  },
  {
    label: "Üniforma Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-t-shirt text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.uniformFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.uniformFee || 0) > 0,
  },
  {
    label: "Aktivite Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-activity text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.activityFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.activityFee || 0) > 0,
  },
  {
    label: "Teknoloji Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-laptop text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.technologyFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.technologyFee || 0) > 0,
  },
  {
    label: "Laboratuvar Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-flask text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.laboratoryFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.laboratoryFee || 0) > 0,
  },
  {
    label: "Kütüphane Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-books text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.libraryFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.libraryFee || 0) > 0,
  },
  {
    label: "Spor Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-soccer-ball text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.sportsFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.sportsFee || 0) > 0,
  },
  {
    label: "Sanat Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-palette text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.artFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.artFee || 0) > 0,
  },
  {
    label: "Müzik Ücreti",
    value: (pricing, formatPrice) => (
      <span className="text-secondary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-music-note text-sm"></i>
        {formatPrice
          ? formatPrice(pricing?.musicFee, pricing?.currency)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => (pricing?.musicFee || 0) > 0,
  },
];
