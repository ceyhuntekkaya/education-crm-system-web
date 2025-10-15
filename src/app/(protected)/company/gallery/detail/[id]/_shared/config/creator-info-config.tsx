import React from "react";
import CustomImage from "@/components/ui/custom-image";
import type { BasicInfoItemConfig } from "../types";

/**
 * Oluşturan kullanıcı konfigürasyonu
 */
export const creatorInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Kullanıcı Adı",
    value: (gallery) => (
      <div className="d-flex align-items-center gap-3">
        {gallery?.createdByUser?.profileImageUrl ? (
          <CustomImage
            src={gallery.createdByUser.profileImageUrl}
            alt={gallery.createdByUser.fullName}
            width={48}
            height={48}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-warning-100"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="ph ph-user text-warning-600 fs-4"></i>
          </div>
        )}
        <div>
          <span className="fw-semibold text-warning-600">
            <i className="ph ph-user me-2"></i>
            {gallery?.createdByUser?.fullName || "Belirtilmemiş"}
          </span>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.createdByUser?.fullName,
  },
  {
    label: "E-posta Adresi",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-envelope me-1"></i>
        {gallery?.createdByUser?.email || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.createdByUser?.email,
  },
  {
    label: "Telefon Numarası",
    value: (gallery) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-phone me-1"></i>
        {gallery?.createdByUser?.phone || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.createdByUser?.phone,
  },
  {
    label: "Kullanıcı Türü",
    value: (gallery) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-identification-card me-1"></i>
        {gallery?.createdByUser?.userType === "INSTITUTION_USER"
          ? "Kurum Kullanıcısı"
          : gallery?.createdByUser?.userType === "PARENT_USER"
          ? "Veli Kullanıcısı"
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => !!gallery?.createdByUser?.userType,
  },
  {
    label: "Kullanıcı Durumu",
    value: (gallery) => (
      <span
        className={`badge fw-semibold ${
          gallery?.createdByUser?.isActive
            ? "bg-success-subtle text-success"
            : "bg-danger-subtle text-danger"
        }`}
      >
        <i
          className={`ph ${
            gallery?.createdByUser?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {gallery?.createdByUser?.isActive
          ? "Aktif Kullanıcı"
          : "Pasif Kullanıcı"}
      </span>
    ),
    isShowing: (gallery) => gallery?.createdByUser?.isActive !== undefined,
  },
];
