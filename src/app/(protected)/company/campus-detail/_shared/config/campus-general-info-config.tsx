import React from "react";
import { CustomImage } from "@/components/ui";
import type { CampusGeneralInfoConfig } from "../types";
import { renderStars } from "@/utils";

/**
 * Genel kampüs bilgileri konfigürasyonu
 */
export const campusGeneralInfoConfig: CampusGeneralInfoConfig[] = [
  {
    label: "Logo",
    value: (campus) => (
      <div className="d-flex align-items-center w-full justify-content-start">
        {campus?.logoUrl ? (
          <CustomImage
            src={campus.logoUrl}
            alt={campus.name || "Kampüs logosu"}
            width={120}
            height={120}
            className="rounded-12"
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-main-50 rounded-8 border border-main-200 me-3"
            style={{ width: "60px", height: "60px" }}
          >
            <i
              className="ph ph-buildings text-main-600"
              style={{ fontSize: "24px" }}
            />
          </div>
        )}
      </div>
    ),
    isShowing: (campus) => !!campus,
  },
  {
    label: "Kampüs Adı",
    value: (campus) => (
      <span className="text-main-600 fw-semibold">
        <i className="ph ph-buildings me-2"></i>
        {campus?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (campus) => !!campus?.name,
  },
  {
    label: "Slug",
    value: (campus) => (
      <code className="bg-neutral-50 px-8 py-4 rounded-4 text-sm">
        {campus?.slug || "Belirtilmemiş"}
      </code>
    ),
    isShowing: (campus) => !!campus?.slug,
  },
  {
    label: "Açıklama",
    value: (campus) => (
      <div className="text-neutral-700">
        <p className="mb-0 line-height-relaxed">
          {campus?.description || "Açıklama mevcut değil"}
        </p>
      </div>
    ),
    isShowing: (campus) => !!campus?.description,
  },
  {
    label: "Kuruluş Yılı",
    value: (campus) => (
      <span className="text-neutral-700 d-flex align-items-center gap-2">
        <i className="ph ph-calendar"></i>
        {campus?.establishedYear || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (campus) => !!campus?.establishedYear,
  },
  {
    label: "Ortalama Puan",
    value: (campus) => (
      <div className="d-flex align-items-center gap-8">
        {campus?.ratingAverage ? (
          <>
            {renderStars(campus.ratingAverage)}
            <span className="fw-semibold text-warning-600">
              {campus.ratingAverage.toFixed(1)}
            </span>
            <span className="text-neutral-500">
              ({campus.ratingCount || 0} değerlendirme)
            </span>
          </>
        ) : (
          <span className="text-neutral-500">Henüz değerlendirme yok</span>
        )}
      </div>
    ),
    isShowing: (campus) => !!campus,
  },
  {
    label: "Görüntülenme",
    value: (campus) => (
      <span className="text-neutral-700 d-flex align-items-center gap-2">
        <i className="ph ph-eye"></i>
        {campus?.viewCount?.toLocaleString("tr-TR") || "0"} görüntülenme
      </span>
    ),
    isShowing: (campus) => !!campus,
  },
  {
    label: "Bağlı Marka",
    value: (campus) =>
      campus?.brand ? (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-12">
            {campus.brand.logoUrl && campus.brand.logoUrl !== "default.jpg" ? (
              <CustomImage
                src={campus.brand.logoUrl}
                alt={campus.brand.name || "Marka logosu"}
                width={40}
                height={40}
                className="rounded-8"
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-main-50 rounded-8"
                style={{ width: "40px", height: "40px" }}
              >
                <i
                  className="ph ph-buildings text-main-600"
                  style={{ fontSize: "18px" }}
                />
              </div>
            )}
            <div className="d-flex flex-column">
              <span className="text-main-600 fw-semibold">
                {campus.brand.name}
              </span>
              {campus.brand.slug && (
                <code className="text-xs text-neutral-500">
                  {campus.brand.slug}
                </code>
              )}
            </div>
          </div>
          <div className="d-flex flex-wrap gap-12 mt-4">
            {typeof campus.brand.campusCount === "number" && (
              <span className="d-flex align-items-center gap-4 text-sm text-neutral-600">
                <i className="ph ph-buildings"></i>
                {campus.brand.campusCount} Kampüs
              </span>
            )}
            {typeof campus.brand.schoolCount === "number" && (
              <span className="d-flex align-items-center gap-4 text-sm text-neutral-600">
                <i className="ph ph-graduation-cap"></i>
                {campus.brand.schoolCount} Okul
              </span>
            )}
            {typeof campus.brand.ratingAverage === "number" &&
              campus.brand.ratingAverage > 0 && (
                <span className="d-flex align-items-center gap-4 text-sm text-warning-600">
                  <i className="ph-fill ph-star"></i>
                  {campus.brand.ratingAverage.toFixed(1)}
                </span>
              )}
          </div>
        </div>
      ) : (
        <span className="text-neutral-500">Marka bilgisi mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.brand,
  },
  {
    label: "Durum",
    value: (campus) => (
      <span
        className={`badge ${
          campus?.isActive
            ? "bg-success-50 text-success-600"
            : "bg-danger-50 text-danger-600"
        }`}
      >
        <i
          className={`ph ${
            campus?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {campus?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (campus) => !!campus,
  },
  {
    label: "Oluşturma Tarihi",
    value: (campus) => (
      <span className="text-neutral-700 d-flex align-items-center gap-2">
        <i className="ph ph-calendar-blank"></i>
        {campus?.createdAt
          ? new Date(campus.createdAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (campus) => !!campus?.createdAt,
  },
];
