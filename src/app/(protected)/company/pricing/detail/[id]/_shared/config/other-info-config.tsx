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
      <span className="text-primary-600 fw-semibold">{pricing?.ageRange}</span>
    ),
    isShowing: (pricing) => {
      // "1-80 yaş" gibi genel/varsayılan değerleri gösterme
      const ageRange = pricing?.ageRange;
      if (!ageRange) return false;
      if (ageRange === "1-80 yaş" || ageRange === "0-100 yaş") return false;
      return true;
    },
  },
  {
    label: "Güncel Sürüm",
    value: (pricing) => (
      <span className="badge bg-success-subtle text-success fw-semibold">
        Evet
      </span>
    ),
    isShowing: (pricing) => pricing?.isCurrent === true,
  },
  {
    label: "Sürüm",
    value: (pricing) => (
      <span className="text-secondary-600 fw-semibold">
        v{pricing?.version || "1"}
      </span>
    ),
    isShowing: (pricing) => pricing?.version && pricing.version > 1,
  },
  {
    label: "Oluşturan",
    value: (pricing) => (
      <span className="text-primary-600 fw-semibold d-flex align-items-center gap-4">
        <i className="ph ph-user text-sm"></i>
        {pricing?.createdByUserName}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.createdByUserName,
  },
  {
    label: "Oluşturulma Tarihi",
    value: (pricing) => (
      <span className="text-secondary-600 fw-semibold">
        {pricing?.createdAt
          ? new Date(pricing?.createdAt).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.createdAt,
  },
  {
    label: "Son Güncelleme",
    value: (pricing) => (
      <span className="text-secondary-600 fw-semibold">
        {pricing?.updatedAt
          ? new Date(pricing?.updatedAt).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) =>
      !!pricing?.updatedAt && pricing?.updatedAt !== pricing?.createdAt,
  },
];
