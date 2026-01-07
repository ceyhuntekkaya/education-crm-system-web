"use client";

import { useState, useMemo, useCallback } from "react";

export type QuotationSortBy =
  | "none"
  | "totalAmount"
  | "deliveryDays"
  | "averageRating"
  | "supplierName";

export type SortOrder = "asc" | "desc";

export interface SortOption {
  value: QuotationSortBy;
  label: string;
  icon: string;
}

export const sortOptions: SortOption[] = [
  { value: "none", label: "Varsayılan", icon: "ph-list" },
  {
    value: "totalAmount",
    label: "Toplam Tutar",
    icon: "ph-currency-circle-dollar",
  },
  { value: "deliveryDays", label: "Teslimat Süresi", icon: "ph-truck" },
  { value: "averageRating", label: "Değerlendirme", icon: "ph-star" },
  { value: "supplierName", label: "Tedarikçi Adı", icon: "ph-building" },
];

/**
 * 🔄 QUOTATIONS SORT HOOK
 * Teklif sıralama işlemleri
 */
export const useQuotationsSort = () => {
  const [sortBy, setSortBy] = useState<QuotationSortBy>("none");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Current selected sort option
  const currentSortOption = useMemo(
    () => sortOptions.find((opt) => opt.value === sortBy),
    [sortBy]
  );

  // Sort change handler
  const onSortChange = useCallback((value: QuotationSortBy) => {
    setSortBy(value);
  }, []);

  // Toggle sort order
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // Reset sort
  const resetSort = useCallback(() => {
    setSortBy("none");
    setSortOrder("asc");
  }, []);

  return {
    sortBy,
    sortOrder,
    sortOptions,
    currentSortOption,
    setSortBy,
    setSortOrder,
    onSortChange,
    toggleSortOrder,
    resetSort,
  };
};
