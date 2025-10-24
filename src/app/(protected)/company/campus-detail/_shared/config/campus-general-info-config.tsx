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
    label: "Website",
    value: (campus) =>
      campus?.websiteUrl ? (
        <a
          href={campus.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2 hover-text-main-700 transition-colors"
        >
          <i className="ph ph-globe"></i>
          <span className="text-truncate" style={{ maxWidth: "300px" }}>
            {campus.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">Website mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.websiteUrl,
  },
  {
    label: "E-posta",
    value: (campus) =>
      campus?.email ? (
        <a
          href={`mailto:${campus.email}`}
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph ph-envelope"></i>
          {campus.email}
        </a>
      ) : (
        <span className="text-neutral-500">E-posta mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.email,
  },
  {
    label: "Telefon",
    value: (campus) =>
      campus?.phone ? (
        <a
          href={`tel:${campus.phone}`}
          className="text-main-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph ph-phone"></i>
          {campus.phone}
        </a>
      ) : (
        <span className="text-neutral-500">Telefon mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.phone,
  },
  {
    label: "Fax",
    value: (campus) =>
      campus?.fax ? (
        <span className="text-neutral-700 d-flex align-items-center gap-2">
          <i className="ph ph-printer"></i>
          {campus.fax}
        </span>
      ) : (
        <span className="text-neutral-500">Fax mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.fax,
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
    label: "Adres",
    value: (campus) => (
      <div className="text-neutral-700">
        <p className="mb-0">
          <i className="ph ph-map-pin me-2"></i>
          {campus?.addressLine1 || ""}
          {campus?.addressLine2 ? `, ${campus.addressLine2}` : ""}
        </p>
        {(campus?.district || campus?.province || campus?.country) && (
          <p className="mb-0 mt-1 text-sm text-neutral-600">
            {campus?.district?.name && `${campus.district.name}, `}
            {campus?.province?.name && `${campus.province.name}, `}
            {campus?.country?.name}
            {campus?.postalCode && ` - ${campus.postalCode}`}
          </p>
        )}
      </div>
    ),
    isShowing: (campus) => !!(campus?.addressLine1 || campus?.addressLine2),
  },
  {
    label: "Konum",
    value: (campus) => (
      <div className="text-neutral-700">
        {campus?.latitude && campus?.longitude ? (
          <a
            href={`https://www.google.com/maps?q=${campus.latitude},${campus.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-main-600 text-decoration-none d-flex align-items-center gap-2"
          >
            <i className="ph ph-map-trifold"></i>
            Haritada Gör ({campus.latitude.toFixed(6)},{" "}
            {campus.longitude.toFixed(6)})
            <i className="ph ph-arrow-square-out text-xs"></i>
          </a>
        ) : (
          <span className="text-neutral-500">Konum bilgisi mevcut değil</span>
        )}
      </div>
    ),
    isShowing: (campus) => !!(campus?.latitude && campus?.longitude),
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
        <span className="text-main-600 fw-semibold d-flex align-items-center gap-2">
          <i className="ph ph-buildings"></i>
          {campus.brand.name}
        </span>
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
