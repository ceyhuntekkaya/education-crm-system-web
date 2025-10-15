import React from "react";
import CustomImage from "@/components/ui/custom-image";
import type { BasicInfoItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";

/**
 * Okul bilgileri konfigürasyonu
 */
export const schoolInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Okul Adı",
    value: (gallery) => (
      <div className="d-flex align-items-center gap-3">
        {gallery?.school?.logoUrl ? (
          <CustomImage
            src={gallery.school.logoUrl}
            alt={gallery.school.name}
            width={48}
            height={48}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-success-100"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="ph ph-graduation-cap text-success-600 fs-4"></i>
          </div>
        )}
        <div>
          <span className="fw-semibold text-success-600">
            <i className="ph ph-graduation-cap me-2"></i>
            {gallery?.school?.name || "Belirtilmemiş"}
          </span>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.school?.name,
  },
  {
    label: "Okul Slug",
    value: (gallery) => (
      <span className="badge bg-success-subtle text-success fw-semibold font-monospace">
        <i className="ph ph-link-simple me-1"></i>
        {gallery?.school?.slug || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.school?.slug,
  },
  {
    label: "Kurum Türü",
    value: (gallery) => (
      <span className="badge bg-success-subtle text-success fw-semibold">
        <i className="ph ph-building me-1"></i>
        {gallery?.school?.institutionTypeName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.school?.institutionTypeName,
  },
  {
    label: "Okul Değerlendirmesi",
    value: (gallery) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-star-fill me-1"></i>
        <i className="ph ph-star me-1"></i>
        {gallery?.school?.ratingAverage || "0"} Puan
      </span>
    ),
    isShowing: (gallery) => !!gallery?.school?.ratingAverage,
  },
  {
    label: "Değerlendirme Sayısı",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-users me-1"></i>
        {formatNumber(gallery?.school?.ratingCount || 0)} Değerlendirme
      </span>
    ),
    isShowing: (gallery) => gallery?.school?.ratingCount !== undefined,
  },
  {
    label: "Aylık Ücret",
    value: (gallery) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-money me-1"></i>
        {gallery?.school?.monthlyFee
          ? `${gallery.school.monthlyFee.toLocaleString("tr-TR")} ₺/ay`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.school?.monthlyFee,
  },
  {
    label: "Yaş Aralığı",
    value: (gallery) => (
      <span className="badge bg-neutral-subtle text-neutral fw-semibold">
        <i className="ph ph-calendar me-1"></i>
        {gallery?.school?.minAge && gallery?.school?.maxAge
          ? `${gallery.school.minAge}-${gallery.school.maxAge} yaş`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) =>
      !!(gallery?.school?.minAge || gallery?.school?.maxAge),
  },
  {
    label: "Kampanya Durumu",
    value: (gallery) => (
      <span
        className={`badge fw-semibold ${
          gallery?.school?.hasActiveCampaigns
            ? "bg-danger-subtle text-danger"
            : "bg-secondary-subtle text-secondary"
        }`}
      >
        <i
          className={`ph ${
            gallery?.school?.hasActiveCampaigns ? "ph-fire" : "ph-x-circle"
          } me-1`}
        ></i>
        {gallery?.school?.hasActiveCampaigns
          ? "Aktif Kampanya Var"
          : "Aktif Kampanya Yok"}
      </span>
    ),
    isShowing: (gallery) => gallery?.school?.hasActiveCampaigns !== undefined,
  },
];
