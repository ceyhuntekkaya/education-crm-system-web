import React from "react";
import type { StockInfoItemConfig } from "../types";
import { ProductDtoStockTrackingType } from "@/types";

/**
 * Stok takip tipi için label belirleme
 */
const getStockTrackingTypeLabel = (type?: string): string => {
  switch (type) {
    case ProductDtoStockTrackingType.UNLIMITED:
      return "Sınırsız";
    case ProductDtoStockTrackingType.LIMITED:
      return "Sınırlı";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Stok seviyesi renk belirleme
 */
const getStockLevelColor = (quantity?: number, minLevel?: number): string => {
  if (!quantity) return "text-danger-600";
  if (minLevel && quantity <= minLevel) return "text-warning-600";
  return "text-success-600";
};

/**
 * Stok bilgileri konfigürasyonu
 */
export const stockInfoConfig: StockInfoItemConfig[] = [
  {
    label: "Stok Takip Tipi",
    value: (product) => (
      <span className="text-neutral-700">
        {getStockTrackingTypeLabel(product?.stockTrackingType)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Mevcut Stok",
    value: (product) => (
      <span
        className={`fw-semibold ${getStockLevelColor(
          product?.stockQuantity,
          product?.minStockLevel
        )}`}
      >
        {product?.stockQuantity !== undefined
          ? `${product.stockQuantity} adet`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) =>
      product?.stockTrackingType === ProductDtoStockTrackingType.LIMITED,
  },
  {
    label: "Minimum Stok Seviyesi",
    value: (product) => (
      <span className="text-neutral-700">
        {product?.minStockLevel !== undefined
          ? `${product.minStockLevel} adet`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) =>
      product?.stockTrackingType === ProductDtoStockTrackingType.LIMITED &&
      product?.minStockLevel !== undefined,
  },
  {
    label: "Minimum Sipariş Miktarı",
    value: (product) => (
      <span className="text-neutral-700">
        {product?.minOrderQuantity !== undefined
          ? `${product.minOrderQuantity} adet`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) => product?.minOrderQuantity !== undefined,
  },
  {
    label: "Teslimat Süresi",
    value: (product) => (
      <span className="text-neutral-700">
        {product?.deliveryDays !== undefined
          ? `${product.deliveryDays} gün`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) => product?.deliveryDays !== undefined,
  },
];
