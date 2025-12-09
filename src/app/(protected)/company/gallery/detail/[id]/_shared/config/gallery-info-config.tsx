import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { translateGalleryType, translateVisibility } from "../utils";

/**
 * Hızlı gallery bilgileri konfigürasyonu
 */
export const galleryInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Galeri Durumu",
    value: (gallery) => {
      const isActive = gallery?.isActive;
      return (
        <span
          className={`badge fw-semibold ${
            isActive
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger"
          }`}
        >
          <i
            className={`ph ${
              isActive ? "ph-check-circle" : "ph-x-circle"
            } me-4`}
          ></i>
          {isActive ? "Aktif" : "Pasif"}
        </span>
      );
    },
    isShowing: () => true,
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
    label: "Görünürlük",
    value: (gallery) => (
      <span
        className={`badge fw-semibold ${
          gallery?.visibility === "PUBLIC"
            ? "bg-success-subtle text-success"
            : gallery?.visibility === "PRIVATE"
            ? "bg-danger-subtle text-danger"
            : "bg-warning-subtle text-warning"
        }`}
      >
        <i className="ph ph-eye me-4"></i>
        {translateVisibility(gallery?.visibility)}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.visibility,
  },
  {
    label: "Öğe Sayısı",
    value: (gallery) => {
      const itemCount = gallery?.itemCount || gallery?.items?.length || 0;
      return (
        <span className="text-dark">
          <i className="ph ph-images me-4"></i>
          {itemCount} öğe
        </span>
      );
    },
    isShowing: (gallery) => !!(gallery?.itemCount || gallery?.items?.length),
  },
  {
    label: "Öne Çıkarılan",
    value: (gallery) =>
      gallery?.isFeatured ? (
        <span className="badge bg-warning-subtle text-warning fw-semibold">
          <i className="ph ph-star-fill me-4"></i>
          Evet
        </span>
      ) : (
        <span className="badge bg-secondary-subtle text-secondary fw-semibold">
          <i className="ph ph-star me-4"></i>
          Hayır
        </span>
      ),
    isShowing: () => true,
  },
];
