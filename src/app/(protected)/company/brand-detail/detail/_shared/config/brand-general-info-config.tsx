import React from "react";
import { CustomImage } from "@/components/ui";
import type { BrandGeneralInfoConfig } from "../types";
import { renderStars } from "@/utils";

/**
 * Genel marka bilgileri konfigürasyonu
 */
export const brandGeneralInfoConfig: BrandGeneralInfoConfig[] = [
  {
    label: "Logo",
    value: (brand) => (
      <div className="d-flex align-items-center w-full justify-content-start">
        {brand?.logoUrl ? (
          <CustomImage
            src={brand.logoUrl}
            alt={brand.name || "Marka logosu"}
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
    isShowing: (brand) => !!brand,
  },
  {
    label: "Marka Adı",
    value: (brand) => (
      <span className="text-main-600 fw-semibold">
        <i className="ph ph-buildings me-2"></i>
        {brand?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (brand) => !!brand?.name,
  },
  {
    label: "Slug",
    value: (brand) => (
      <code className="bg-neutral-50 px-8 py-4 rounded-4 text-sm">
        {brand?.slug || "Belirtilmemiş"}
      </code>
    ),
    isShowing: (brand) => !!brand?.slug,
  },
  {
    label: "Açıklama",
    value: (brand) => (
      <div className="text-neutral-700">
        <p className="mb-0 line-height-relaxed">
          {brand?.description || "Açıklama mevcut değil"}
        </p>
      </div>
    ),
    isShowing: (brand) => !!brand?.description,
  },
  {
    label: "Website",
    value: (brand) =>
      brand?.websiteUrl ? (
        <a
          href={brand.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2 hover-text-main-700 transition-colors"
        >
          <i className="ph ph-globe"></i>
          <span className="text-truncate" style={{ maxWidth: "300px" }}>
            {brand.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">Website mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.websiteUrl,
  },
  {
    label: "E-posta",
    value: (brand) =>
      brand?.email ? (
        <a
          href={`mailto:${brand.email}`}
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph ph-envelope"></i>
          {brand.email}
        </a>
      ) : (
        <span className="text-neutral-500">E-posta mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.email,
  },
  {
    label: "Telefon",
    value: (brand) =>
      brand?.phone ? (
        <a
          href={`tel:${brand.phone}`}
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph ph-phone"></i>
          {brand.phone}
        </a>
      ) : (
        <span className="text-neutral-500">Telefon mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.phone,
  },
  {
    label: "Kuruluş Yılı",
    value: (brand) => (
      <span className="text-neutral-700 d-flex align-items-center gap-2">
        <i className="ph ph-calendar"></i>
        {brand?.foundedYear || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (brand) => !!brand?.foundedYear,
  },
  {
    label: "Ortalama Puan",
    value: (brand) => (
      <div className="d-flex align-items-center gap-8">
        {brand?.ratingAverage ? (
          <>
            {renderStars(brand.ratingAverage)}
            <span className="fw-semibold text-warning-600">
              {brand.ratingAverage.toFixed(1)}
            </span>
            <span className="text-neutral-500">
              ({brand.ratingCount || 0} değerlendirme)
            </span>
          </>
        ) : (
          <span className="text-neutral-500">Henüz değerlendirme yok</span>
        )}
      </div>
    ),
    isShowing: (brand) => !!brand,
  },
  {
    label: "Görüntülenme",
    value: (brand) => (
      <span className="text-neutral-700 d-flex align-items-center gap-2">
        <i className="ph ph-eye"></i>
        {brand?.viewCount?.toLocaleString() || 0} görüntülenme
      </span>
    ),
    isShowing: (brand) => brand?.viewCount !== undefined,
  },
  {
    label: "Oluşturulma Tarihi",
    value: (brand) => (
      <span className="text-neutral-700 d-flex align-items-center gap-2">
        <i className="ph ph-calendar-plus"></i>
        {brand?.createdAt
          ? new Date(brand.createdAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (brand) => !!brand?.createdAt,
  },
  {
    label: "Durum",
    value: (brand) => (
      <span
        className={`badge fw-semibold ${
          brand?.isActive
            ? "bg-success-100 text-success-600"
            : "bg-neutral-100 text-neutral-600"
        }`}
      >
        <i
          className={`ph ${
            brand?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {brand?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (brand) => brand?.isActive !== undefined,
  },
];
