import React from "react";
import type { AdditionalInfoItemConfig } from "../types";

/**
 * Tarih formatla
 */
const formatDate = (dateString?: string): string => {
  if (!dateString) return "Belirtilmemiş";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/**
 * Ek bilgiler konfigürasyonu
 */
export const additionalInfoConfig: AdditionalInfoItemConfig[] = [
  {
    label: "Oluşturulma Tarihi",
    value: (product) => (
      <span className="text-neutral-700">{formatDate(product?.createdAt)}</span>
    ),
    isShowing: (product) => !!product?.createdAt,
  },
  {
    label: "Son Güncellenme",
    value: (product) => (
      <span className="text-neutral-700">{formatDate(product?.updatedAt)}</span>
    ),
    isShowing: (product) => !!product?.updatedAt,
  },
];
