import React from "react";
import type { BasicInfoItemConfig } from "../types";

/**
 * Temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Okul Adı",
    value: (pricing) => (
      <span className="fw-semibold text-primary-600">
        {pricing?.schoolName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Akademik Yıl",
    value: (pricing) => (
      <span className="text-info-600 fw-semibold">
        {pricing?.academicYear || "Belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Sınıf Seviyesi",
    value: (pricing) => (
      <span className="text-warning-600 fw-semibold">
        {pricing?.gradeLevel || "Belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Sınıf Düzeyi",
    value: (pricing) => (
      <span className="text-secondary-600 fw-semibold">
        {pricing?.classLevel || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.classLevel,
  },
  {
    label: "Para Birimi",
    value: (pricing) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold">
        {pricing?.currency || "TRY"}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Durum",
    value: (pricing) => (
      <span
        className={`badge ${
          pricing?.status === "ACTIVE"
            ? "bg-success-subtle text-success"
            : pricing?.status === "DRAFT"
            ? "bg-warning-subtle text-warning"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        {pricing?.status === "ACTIVE"
          ? "Aktif"
          : pricing?.status === "DRAFT"
          ? "Taslak"
          : pricing?.status === "PENDING_APPROVAL"
          ? "Onay Bekliyor"
          : pricing?.status === "APPROVED"
          ? "Onaylandı"
          : pricing?.status === "INACTIVE"
          ? "Pasif"
          : pricing?.status === "ARCHIVED"
          ? "Arşivlendi"
          : pricing?.status || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.status,
  },
];
