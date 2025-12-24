import React from "react";
import Link from "next/link";
import type { SupplierInfoItemConfig } from "../types";
import { formatPhoneNumber, renderStars } from "@/utils";

/**
 * Tedarikçi Temel Bilgileri
 */
export const supplierBasicInfoConfig: SupplierInfoItemConfig[] = [
  {
    label: "Firma Adı",
    value: (supplier) => {
      const companyName = supplier?.companyName || "Belirtilmemiş";
      const supplierDetailUrl = `/supply/company/suppliers/detail/${supplier?.id}`;

      return (
        <Link
          href={supplierDetailUrl}
          className="group inline-flex items-center gap-8 text-base fw-semibold text-primary-600 text-decoration-none hover:text-primary-700 transition-colors"
        >
          <span>{companyName}</span>
          <i className="ph ph-arrow-right text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all ps-8"></i>
        </Link>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Vergi Numarası",
    value: (supplier) => (
      <span className="text-neutral-700 font-monospace">
        {supplier?.taxNumber || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (supplier) => !!supplier?.taxNumber,
  },
  {
    label: "Durum",
    value: (supplier) => (
      <span
        className={`fw-semibold ${
          supplier?.isActive ? "text-success-600" : "text-danger-600"
        }`}
      >
        {supplier?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: () => true,
  },
];

/**
 * Tedarikçi İletişim Bilgileri
 */
export const supplierContactInfoConfig: SupplierInfoItemConfig[] = [
  {
    label: "E-posta",
    value: (supplier) => (
      <a
        href={`mailto:${supplier?.email}`}
        className="text-primary-600 text-decoration-none hover:text-primary-700"
      >
        {supplier?.email || "Belirtilmemiş"}
      </a>
    ),
    isShowing: (supplier) => !!supplier?.email,
  },
  {
    label: "Telefon",
    value: (supplier) => (
      <a
        href={`tel:${supplier?.phone}`}
        className="text-primary-600 text-decoration-none hover:text-primary-700"
      >
        {formatPhoneNumber(supplier?.phone) || "Belirtilmemiş"}
      </a>
    ),
    isShowing: (supplier) => !!supplier?.phone,
  },
  {
    label: "Adres",
    value: (supplier) => (
      <span className="text-neutral-600">
        {supplier?.address || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (supplier) => !!supplier?.address,
  },
];

/**
 * Tedarikçi Değerlendirme ve Ek Bilgiler
 */
export const supplierAdditionalInfoConfig: SupplierInfoItemConfig[] = [
  {
    label: "Ortalama Değerlendirme",
    value: (supplier) => (
      <div className="d-flex align-items-center gap-2">
        <span className="text-warning-600 fw-semibold me-2">
          {supplier?.averageRating?.toFixed(1) || "0.0"}
        </span>
        {renderStars(supplier?.averageRating || 0)}
      </div>
    ),
    isShowing: (supplier) =>
      supplier?.averageRating !== undefined && supplier.averageRating !== null,
  },
  {
    label: "Açıklama",
    value: (supplier) => (
      <span className="text-neutral-600">
        {supplier?.description || "Açıklama bulunmuyor"}
      </span>
    ),
    isShowing: (supplier) => !!supplier?.description,
  },
];
