import React from "react";
import type { OtherInfoItemConfig } from "../types";

/**
 * Diğer bilgiler konfigürasyonu
 */
export const otherInfoConfig: OtherInfoItemConfig[] = [
  {
    label: "Geçerlilik Başlangıcı",
    value: (pricing) => (
      <span className="text-secondary-600 fw-semibold">
        {pricing?.validFrom
          ? new Date(pricing?.validFrom).toLocaleDateString("tr-TR")
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.validFrom,
  },
  {
    label: "Geçerlilik Bitişi",
    value: (pricing) => (
      <span className="text-secondary-600 fw-semibold">
        {pricing?.validUntil
          ? new Date(pricing?.validUntil).toLocaleDateString("tr-TR")
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.validUntil,
  },
  {
    label: "Pazar Konumu",
    value: (pricing) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        {pricing?.marketPosition || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.marketPosition,
  },
  {
    label: "Yaş Aralığı",
    value: (pricing) => (
      <span className="text-primary-600 fw-semibold">
        {pricing?.ageRange || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.ageRange,
  },
  {
    label: "Güncel Sürüm",
    value: (pricing) => (
      <span
        className={`badge ${
          pricing?.isCurrent
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        {pricing?.isCurrent ? "Evet" : "Hayır"}
      </span>
    ),
    isShowing: (pricing) => pricing?.isCurrent !== undefined,
  },
  {
    label: "Sürüm",
    value: (pricing) => (
      <span className="text-secondary-600 fw-semibold">
        v{pricing?.version || "1"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.version,
  },
];
