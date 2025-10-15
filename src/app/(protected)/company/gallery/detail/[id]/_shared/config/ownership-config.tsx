import React from "react";
import Image from "next/image";
import type { OwnershipItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";

/**
 * Sahiplik bilgileri konfigürasyonu
 */
export const ownershipConfig: OwnershipItemConfig[] = [
  {
    label: "Marka Bilgileri",
    value: (gallery) => (
      <div className="card border-0 bg-primary-50 p-3">
        <div className="d-flex align-items-center gap-3">
          {gallery?.brand?.logoUrl ? (
            <Image
              src={gallery.brand.logoUrl}
              alt={gallery.brand.name}
              width={48}
              height={48}
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-primary-100"
              style={{ width: "48px", height: "48px" }}
            >
              <i className="ph ph-buildings text-primary-600 fs-4"></i>
            </div>
          )}
          <div className="flex-grow-1">
            <div className="fw-semibold text-primary-700 mb-1">
              {gallery?.brand?.name || "Belirtilmemiş"}
            </div>
            {gallery?.brand && (
              <div className="d-flex flex-wrap gap-2">
                {gallery.brand.ratingAverage && (
                  <span className="badge bg-warning-subtle text-warning fw-semibold">
                    <i className="ph ph-star-fill me-1"></i>
                    {gallery.brand.ratingAverage}
                  </span>
                )}
                {gallery.brand.campusCount && (
                  <span className="badge bg-info-subtle text-info fw-semibold">
                    <i className="ph ph-buildings me-1"></i>
                    {formatNumber(gallery.brand.campusCount)} Kampüs
                  </span>
                )}
                {gallery.brand.schoolCount && (
                  <span className="badge bg-success-subtle text-success fw-semibold">
                    <i className="ph ph-graduation-cap me-1"></i>
                    {formatNumber(gallery.brand.schoolCount)} Okul
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.brand?.name,
  },
  {
    label: "Kampüs Bilgileri",
    value: (gallery) => (
      <div className="card border-0 bg-info-50 p-3">
        <div className="d-flex align-items-center gap-3">
          {gallery?.campus?.logoUrl ? (
            <div
              className="rounded-circle bg-white d-flex align-items-center justify-content-center p-1"
              style={{ width: "48px", height: "48px" }}
            >
              <i className="ph ph-building text-info-600 fs-4"></i>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-info-100"
              style={{ width: "48px", height: "48px" }}
            >
              <i className="ph ph-building text-info-600 fs-4"></i>
            </div>
          )}
          <div className="flex-grow-1">
            <div className="fw-semibold text-info-700 mb-1">
              {gallery?.campus?.name || "Belirtilmemiş"}
            </div>
            {gallery?.campus && (
              <div className="d-flex flex-wrap gap-2">
                {gallery.campus.province && (
                  <span className="badge bg-secondary-subtle text-secondary fw-semibold">
                    <i className="ph ph-map-pin me-1"></i>
                    {gallery.campus.district?.name},{" "}
                    {gallery.campus.province?.name}
                  </span>
                )}
                {gallery.campus.ratingAverage && (
                  <span className="badge bg-warning-subtle text-warning fw-semibold">
                    <i className="ph ph-star-fill me-1"></i>
                    {gallery.campus.ratingAverage}
                  </span>
                )}
                {gallery.campus.schoolCount && (
                  <span className="badge bg-success-subtle text-success fw-semibold">
                    <i className="ph ph-graduation-cap me-1"></i>
                    {formatNumber(gallery.campus.schoolCount)} Okul
                  </span>
                )}
                {gallery.campus.isSubscribed && (
                  <span className="badge bg-primary-subtle text-primary fw-semibold">
                    <i className="ph ph-check-circle me-1"></i>
                    Abonelik
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.campus?.name,
  },
  {
    label: "Okul Bilgileri",
    value: (gallery) => (
      <div className="card border-0 bg-success-50 p-3">
        <div className="d-flex align-items-center gap-3">
          {gallery?.school?.logoUrl ? (
            <div
              className="rounded-circle bg-white d-flex align-items-center justify-content-center p-1"
              style={{ width: "48px", height: "48px" }}
            >
              <i className="ph ph-graduation-cap text-success-600 fs-4"></i>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-success-100"
              style={{ width: "48px", height: "48px" }}
            >
              <i className="ph ph-graduation-cap text-success-600 fs-4"></i>
            </div>
          )}
          <div className="flex-grow-1">
            <div className="fw-semibold text-success-700 mb-1">
              {gallery?.school?.name || "Belirtilmemiş"}
            </div>
            {gallery?.school && (
              <div className="d-flex flex-wrap gap-2">
                {gallery.school.institutionTypeName && (
                  <span className="badge bg-success-subtle text-success fw-semibold">
                    <i className="ph ph-building me-1"></i>
                    {gallery.school.institutionTypeName}
                  </span>
                )}
                {gallery.school.ratingAverage && (
                  <span className="badge bg-warning-subtle text-warning fw-semibold">
                    <i className="ph ph-star-fill me-1"></i>
                    {gallery.school.ratingAverage}
                  </span>
                )}
                {gallery.school.ratingCount && (
                  <span className="badge bg-info-subtle text-info fw-semibold">
                    <i className="ph ph-users me-1"></i>
                    {formatNumber(gallery.school.ratingCount)} Değerlendirme
                  </span>
                )}
                {gallery.school.monthlyFee && (
                  <span className="badge bg-secondary-subtle text-secondary fw-semibold">
                    <i className="ph ph-money me-1"></i>
                    {gallery.school.monthlyFee.toLocaleString("tr-TR")} ₺/ay
                  </span>
                )}
                {gallery.school.minAge && gallery.school.maxAge && (
                  <span className="badge bg-neutral-subtle text-neutral fw-semibold">
                    <i className="ph ph-calendar me-1"></i>
                    {gallery.school.minAge}-{gallery.school.maxAge} yaş
                  </span>
                )}
                {gallery.school.hasActiveCampaigns && (
                  <span className="badge bg-danger-subtle text-danger fw-semibold">
                    <i className="ph ph-fire me-1"></i>
                    Aktif Kampanya
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.school?.name,
  },
  {
    label: "Oluşturan Kullanıcı",
    value: (gallery) => (
      <div className="card border-0 bg-warning-50 p-3">
        <div className="d-flex align-items-center gap-3">
          {gallery?.createdByUser?.profileImageUrl ? (
            <div
              className="rounded-circle bg-white d-flex align-items-center justify-content-center p-1"
              style={{ width: "48px", height: "48px" }}
            >
              <i className="ph ph-user text-warning-600 fs-4"></i>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-warning-100"
              style={{ width: "48px", height: "48px" }}
            >
              <i className="ph ph-user text-warning-600 fs-4"></i>
            </div>
          )}
          <div className="flex-grow-1">
            <div className="fw-semibold text-warning-700 mb-1">
              {gallery?.createdByUser?.fullName || "Belirtilmemiş"}
            </div>
            {gallery?.createdByUser && (
              <div className="d-flex flex-wrap gap-2">
                {gallery.createdByUser.email && (
                  <span className="badge bg-info-subtle text-info fw-semibold">
                    <i className="ph ph-envelope me-1"></i>
                    {gallery.createdByUser.email}
                  </span>
                )}
                {gallery.createdByUser.phone && (
                  <span className="badge bg-secondary-subtle text-secondary fw-semibold">
                    <i className="ph ph-phone me-1"></i>
                    {gallery.createdByUser.phone}
                  </span>
                )}
                {gallery.createdByUser.userType && (
                  <span className="badge bg-warning-subtle text-warning fw-semibold">
                    <i className="ph ph-identification-card me-1"></i>
                    {gallery.createdByUser.userType === "INSTITUTION_USER"
                      ? "Kurum Kullanıcısı"
                      : "Veli"}
                  </span>
                )}
                <span
                  className={`badge fw-semibold ${
                    gallery.createdByUser.isActive
                      ? "bg-success-subtle text-success"
                      : "bg-danger-subtle text-danger"
                  }`}
                >
                  <i
                    className={`ph ${
                      gallery.createdByUser.isActive
                        ? "ph-check-circle"
                        : "ph-x-circle"
                    } me-1`}
                  ></i>
                  {gallery.createdByUser.isActive ? "Aktif" : "Pasif"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.createdByUser,
  },
];
