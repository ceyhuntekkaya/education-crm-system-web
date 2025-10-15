import React from "react";
import CustomImage from "@/components/ui/custom-image";
import type { BasicInfoItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";

/**
 * Marka bilgileri konfigürasyonu
 */
export const brandInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Marka Adı",
    value: (gallery) => (
      <div className="d-flex align-items-center gap-3">
        {gallery?.brand?.logoUrl ? (
          <CustomImage
            src={gallery.brand.logoUrl}
            alt={gallery.brand.name}
            width={48}
            height={48}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-primary-100"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="ph ph-buildings text-primary-600 fs-4"></i>
          </div>
        )}
        <div>
          <span className="fw-semibold text-primary-600">
            <i className="ph ph-buildings me-2"></i>
            {gallery?.brand?.name || "Belirtilmemiş"}
          </span>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.brand?.name,
  },
  {
    label: "Marka Slug",
    value: (gallery) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold font-monospace">
        <i className="ph ph-link-simple me-1"></i>
        {gallery?.brand?.slug || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.brand?.slug,
  },
  {
    label: "Marka Değerlendirmesi",
    value: (gallery) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-star-fill me-1"></i>
        <i className="ph ph-star me-1"></i>
        {gallery?.brand?.ratingAverage || "0"} Puan
      </span>
    ),
    isShowing: (gallery) => !!gallery?.brand?.ratingAverage,
  },
  {
    label: "Kampüs Sayısı",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-buildings me-1"></i>
        {formatNumber(gallery?.brand?.campusCount || 0)} Kampüs
      </span>
    ),
    isShowing: (gallery) => gallery?.brand?.campusCount !== undefined,
  },
  {
    label: "Toplam Okul Sayısı",
    value: (gallery) => (
      <span className="badge bg-success-subtle text-success fw-semibold">
        <i className="ph ph-graduation-cap me-1"></i>
        {formatNumber(gallery?.brand?.schoolCount || 0)} Okul
      </span>
    ),
    isShowing: (gallery) => gallery?.brand?.schoolCount !== undefined,
  },
];
