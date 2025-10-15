import React from "react";
import CustomImage from "@/components/ui/custom-image";
import type { BasicInfoItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";

/**
 * Kampüs bilgileri konfigürasyonu
 */
export const campusInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Kampüs Adı",
    value: (gallery) => (
      <div className="d-flex align-items-center gap-3">
        {gallery?.campus?.logoUrl ? (
          <CustomImage
            src={gallery.campus.logoUrl}
            alt={gallery.campus.name}
            width={48}
            height={48}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-info-100"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="ph ph-building text-info-600 fs-4"></i>
          </div>
        )}
        <div>
          <span className="fw-semibold text-info-600">
            <i className="ph ph-building me-2"></i>
            {gallery?.campus?.name || "Belirtilmemiş"}
          </span>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.campus?.name,
  },
  {
    label: "Kampüs Slug",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold font-monospace">
        <i className="ph ph-link-simple me-1"></i>
        {gallery?.campus?.slug || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.campus?.slug,
  },
  {
    label: "Konum Bilgisi",
    value: (gallery) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-map-pin me-1"></i>
        {gallery?.campus?.district?.name && gallery?.campus?.province?.name
          ? `${gallery.campus.district.name}, ${gallery.campus.province.name}`
          : "Konum belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) =>
      !!(gallery?.campus?.district?.name || gallery?.campus?.province?.name),
  },
  {
    label: "Kampüs Değerlendirmesi",
    value: (gallery) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-star-fill me-1"></i>
        <i className="ph ph-star me-1"></i>
        {gallery?.campus?.ratingAverage || "0"} Puan
      </span>
    ),
    isShowing: (gallery) => !!gallery?.campus?.ratingAverage,
  },
  {
    label: "Okul Sayısı",
    value: (gallery) => (
      <span className="badge bg-success-subtle text-success fw-semibold">
        <i className="ph ph-graduation-cap me-1"></i>
        {formatNumber(gallery?.campus?.schoolCount || 0)} Okul
      </span>
    ),
    isShowing: (gallery) => gallery?.campus?.schoolCount !== undefined,
  },
  {
    label: "Abonelik Durumu",
    value: (gallery) => (
      <span
        className={`badge fw-semibold ${
          gallery?.campus?.isSubscribed
            ? "bg-primary-subtle text-primary"
            : "bg-danger-subtle text-danger"
        }`}
      >
        <i
          className={`ph ${
            gallery?.campus?.isSubscribed ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {gallery?.campus?.isSubscribed ? "Abonelik Aktif" : "Abonelik Yok"}
      </span>
    ),
    isShowing: (gallery) => gallery?.campus?.isSubscribed !== undefined,
  },
];
