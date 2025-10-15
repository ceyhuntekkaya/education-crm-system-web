import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translateGalleryType,
  translateVisibility,
  formatBoolean,
} from "../utils";
import { formatNumber } from "@/utils/format-number";

/**
 * Temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Galeri Başlığı",
    value: (gallery) => (
      <span className="fw-semibold text-primary-600">
        <i className="ph ph-images me-2"></i>
        {gallery?.title || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.title,
  },
  {
    label: "Galeri Türü",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-tag me-1"></i>
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
          <i className="ph ph-eye me-1"></i>
          {translateVisibility(gallery?.visibility)}
        </span>
      );
    },
    isShowing: (gallery) => !!gallery?.visibility,
  },
  {
    label: "Galeri Slug",
    value: (gallery) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold font-monospace">
        <i className="ph ph-link-simple me-1"></i>
        {gallery?.slug || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.slug,
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
          } me-1`}
        ></i>
        {formatBoolean(gallery?.isFeatured)}
      </span>
    ),
    isShowing: (gallery) => gallery?.isFeatured !== undefined,
  },
  {
    label: "Yorumlara İzin Ver",
    value: (gallery) => (
      <span
        className={`badge ${
          gallery?.allowComments
            ? "bg-success-subtle text-success"
            : "bg-danger-subtle text-danger"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            gallery?.allowComments ? "ph-chat-circle" : "ph-chat-circle-slash"
          } me-1`}
        ></i>
        {formatBoolean(gallery?.allowComments)}
      </span>
    ),
    isShowing: (gallery) => gallery?.allowComments !== undefined,
  },
  {
    label: "İndirmeye İzin Ver",
    value: (gallery) => (
      <span
        className={`badge ${
          gallery?.allowDownloads
            ? "bg-success-subtle text-success"
            : "bg-danger-subtle text-danger"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            gallery?.allowDownloads ? "ph-download" : "ph-download-slash"
          } me-1`}
        ></i>
        {formatBoolean(gallery?.allowDownloads)}
      </span>
    ),
    isShowing: (gallery) => gallery?.allowDownloads !== undefined,
  },
  {
    label: "Sıralama",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-sort-ascending me-1"></i>
        {gallery?.sortOrder || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => gallery?.sortOrder !== undefined,
  },
];
