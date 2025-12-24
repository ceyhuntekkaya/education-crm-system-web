import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { ProductDtoStatus } from "@/types";
import { CustomImage } from "@/components/ui";

/**
 * Ürün durumu için renk belirleme
 */
const getStatusColor = (status?: string): string => {
  switch (status) {
    case ProductDtoStatus.ACTIVE:
      return "text-success-600";
    case ProductDtoStatus.PASSIVE:
      return "text-warning-600";
    case ProductDtoStatus.OUT_OF_STOCK:
      return "text-danger-600";
    case ProductDtoStatus.DISCONTINUED:
      return "text-neutral-500";
    default:
      return "text-neutral-600";
  }
};

/**
 * Ürün durumu için label belirleme
 */
const getStatusLabel = (status?: string): string => {
  switch (status) {
    case ProductDtoStatus.ACTIVE:
      return "Aktif";
    case ProductDtoStatus.PASSIVE:
      return "Pasif";
    case ProductDtoStatus.OUT_OF_STOCK:
      return "Stokta Yok";
    case ProductDtoStatus.DISCONTINUED:
      return "Üretimi Durduruldu";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Ürün Görseli",
    value: (product) =>
      product?.mainImageUrl ? (
        <CustomImage
          src={product.mainImageUrl}
          alt={product.name || "Ürün görseli"}
          width={200}
          height={200}
        />
      ) : (
        <span className="text-neutral-500">Görsel yok</span>
      ),
    isShowing: (product) => !!product?.mainImageUrl,
  },
  {
    label: "Ürün Adı",
    value: (product) => (
      <span className="fw-semibold text-primary-600">
        {product?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "SKU",
    value: (product) => (
      <span className="text-neutral-700 font-monospace">
        {product?.sku || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) => !!product?.sku,
  },
  {
    label: "Durum",
    value: (product) => (
      <span className={`fw-semibold ${getStatusColor(product?.status)}`}>
        {getStatusLabel(product?.status)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Kategori",
    value: (product) => (
      <span className="text-neutral-700">
        {product?.categoryName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) => !!product?.categoryName,
  },
  {
    label: "Açıklama",
    value: (product) => (
      <span className="text-neutral-600">
        {product?.description || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) => !!product?.description,
  },
  {
    label: "Teknik Özellikler",
    value: (product) => (
      <span className="text-neutral-600 text-pre-wrap">
        {product?.technicalSpecs || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) => !!product?.technicalSpecs,
  },
];
