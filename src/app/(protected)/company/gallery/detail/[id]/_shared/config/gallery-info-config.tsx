import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translateGalleryType,
  translateVisibility,
  formatBoolean,
} from "../utils";
import { formatNumber } from "@/utils/format-number";

/**
 * Hızlı gallery bilgileri konfigürasyonu
 */
export const galleryInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Galeri Durumu",
    value: (gallery) => {
      const isActive = gallery?.isActive;
      return (
        <div className="d-flex align-items-center gap-3">
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
              } me-1`}
            ></i>
            {isActive ? "Aktif" : "Pasif"}
          </span>
          <span className="text-neutral-600 fs-7">
            {gallery?.itemCount || 0} öğe
          </span>
        </div>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Galeri Türü & Görünürlük",
    value: (gallery) => (
      <div className="d-flex flex-wrap gap-2">
        <span className="badge bg-info-subtle text-info fw-semibold">
          <i className="ph ph-tag me-1"></i>
          {translateGalleryType(gallery?.galleryType)}
        </span>
        <span
          className={`badge fw-semibold ${
            gallery?.visibility === "PUBLIC"
              ? "bg-success-subtle text-success"
              : gallery?.visibility === "PRIVATE"
              ? "bg-danger-subtle text-danger"
              : "bg-warning-subtle text-warning"
          }`}
        >
          <i className="ph ph-eye me-1"></i>
          {translateVisibility(gallery?.visibility)}
        </span>
      </div>
    ),
    isShowing: (gallery) => !!(gallery?.galleryType || gallery?.visibility),
  },
  {
    label: "Performans Metrikleri",
    value: (gallery) => (
      <div className="row g-2 mb-1">
        <div className="col-6">
          <div className="text-center p-2 bg-primary-50 rounded">
            <div className="fs-7 mb-1 text-primary-600 fw-semibold">
              <i className="ph ph-eye me-2"></i>
              {formatNumber(gallery?.viewCount || 0)}
            </div>
            <small className="text-primary-700" style={{ fontSize: "0.7rem" }}>
              Görüntüleme
            </small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-success-50 rounded">
            <div className="fs-7 mb-1 text-success-600 fw-semibold">
              <i className="ph ph-download me-2"></i>
              {formatNumber(gallery?.downloadCount || 0)}
            </div>
            <small className="text-success-700" style={{ fontSize: "0.7rem" }}>
              İndirme
            </small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-info-50 rounded">
            <div className="fs-7 mb-1 text-info-600 fw-semibold">
              <i className="ph ph-images me-2"></i>
              {formatNumber(gallery?.itemCount || 0)}
            </div>
            <small className="text-info-700" style={{ fontSize: "0.7rem" }}>
              Medya
            </small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-warning-50 rounded">
            <div className="fs-7 mb-1 text-warning-600 fw-semibold">
              <i className="ph ph-hard-drive me-2"></i>
              {((gallery?.totalSizeBytes || 0) / (1024 * 1024)).toFixed(1)} MB
            </div>
            <small className="text-warning-700" style={{ fontSize: "0.7rem" }}>
              Boyut
            </small>
          </div>
        </div>
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Özel Durumlar",
    value: (gallery) => (
      <div className="d-flex flex-wrap gap-2">
        {gallery?.isFeatured && (
          <span className="badge bg-warning-subtle text-warning fw-semibold">
            <i className="ph ph-star-fill me-1"></i>
            Öne Çıkarılan
          </span>
        )}
        {gallery?.allowComments && (
          <span className="badge bg-info-subtle text-info fw-semibold">
            <i className="ph ph-chat-circle me-1"></i>
            Yorum Açık
          </span>
        )}
        {gallery?.allowDownloads && (
          <span className="badge bg-success-subtle text-success fw-semibold">
            <i className="ph ph-download me-1"></i>
            İndirme Açık
          </span>
        )}
      </div>
    ),
    isShowing: (gallery) =>
      !!(
        gallery?.isFeatured ||
        gallery?.allowComments ||
        gallery?.allowDownloads
      ),
  },
];
