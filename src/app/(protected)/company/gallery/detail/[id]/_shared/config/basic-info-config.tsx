import React from "react";
import Image from "next/image";
import type { BasicInfoItemConfig } from "../types";
import {
  translateGalleryType,
  translateVisibility,
  formatBoolean,
} from "../utils";

/**
 * Temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Galeri Başlığı",
    value: (gallery) => (
      <span className="fw-semibold text-primary-600">
        <i className="ph ph-images me-4"></i>
        {gallery?.title || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.title,
  },
  {
    label: "Galeri Türü",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-tag me-4"></i>
        {translateGalleryType(gallery?.galleryType)}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.galleryType,
  },
  {
    label: "Görünürlük Durumu",
    value: (gallery) => {
      const visibility = gallery?.visibility;
      const badgeClass =
        visibility === "PUBLIC"
          ? "bg-success-subtle text-success"
          : visibility === "PRIVATE"
          ? "bg-danger-subtle text-danger"
          : visibility === "REGISTERED_ONLY"
          ? "bg-warning-subtle text-warning"
          : "bg-secondary-subtle text-secondary";

      return (
        <span className={`badge fw-semibold ${badgeClass}`}>
          <i className="ph ph-eye me-4"></i>
          {translateVisibility(gallery?.visibility)}
        </span>
      );
    },
    isShowing: (gallery) => !!gallery?.visibility,
  },
  {
    label: "Açıklama",
    value: (gallery) => (
      <p className="mb-0 text-neutral-700">
        {gallery?.description || "Açıklama girilmemiş"}
      </p>
    ),
    isShowing: (gallery) => !!gallery?.description,
  },
  {
    label: "Kapak Görseli",
    value: (gallery) => (
      <div className="d-flex align-items-center gap-3">
        {gallery?.coverImageUrl ? (
          <div className="position-relative">
            <Image
              src={gallery.coverImageUrl}
              alt={gallery?.title || "Galeri Kapak Görseli"}
              width={120}
              height={80}
              className="rounded"
              style={{ objectFit: "cover", border: "1px solid #e5e7eb" }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
              }}
            />
          </div>
        ) : (
          <div
            className="rounded d-flex align-items-center justify-content-center"
            style={{
              width: "120px",
              height: "80px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #e5e7eb",
            }}
          >
            <i
              className="ph ph-image text-neutral-400"
              style={{ fontSize: "32px" }}
            />
          </div>
        )}
      </div>
    ),
    isShowing: (gallery) => !!gallery?.coverImageUrl,
  },
  {
    label: "Öne Çıkarılan",
    value: (gallery) => (
      <span
        className={`badge ${
          gallery?.isFeatured
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            gallery?.isFeatured ? "ph-star-fill" : "ph-star"
          } me-4`}
        ></i>
        {formatBoolean(gallery?.isFeatured)}
      </span>
    ),
    isShowing: (gallery) => gallery?.isFeatured !== undefined,
  },
];
