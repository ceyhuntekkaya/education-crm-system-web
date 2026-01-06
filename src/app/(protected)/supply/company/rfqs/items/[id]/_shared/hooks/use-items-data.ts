"use client";

import { useMemo } from "react";
import type { RFQItemDto } from "@/types";
import type { SortField, SortOrder, FilterState } from "../types";

import { useGetRFQItems } from "./api";

/**
 * 🔍 ITEMS DATA HOOK
 * RFQ kalemleri verilerini ve API çağrılarını yöneten hook
 */
export const useItemsData = (
  rfqId: number,
  sortBy: SortField,
  sortOrder: SortOrder,
  filters: FilterState
) => {
  // 📊 API DATA
  const { data, loading, error, refetch } = useGetRFQItems(rfqId);

  // 📦 RAW DATA (filtrelenmemiş)
  const rawItems = useMemo<RFQItemDto[]>(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];
    return data.data.filter((item) => item && typeof item === "object");
  }, [data]);

  // 📦 DATA WITH FILTERS AND SORTING
  const items = useMemo<RFQItemDto[]>(() => {
    let filteredData = [...rawItems];

    // 🔍 APPLY FILTERS

    // Category filter
    if (filters.categoryId !== "ALL") {
      filteredData = filteredData.filter(
        (item) => item.categoryId === filters.categoryId
      );
    }

    // Search filter (itemName)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filteredData = filteredData.filter((item) =>
        item.itemName?.toLowerCase().includes(query)
      );
    }

    // 🔄 APPLY SORTING

    // Sıralama yok ise, filtrelenmiş haliyle dön
    if (sortBy === "none") {
      return filteredData;
    }

    // Sıralama
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Undefined/null kontrolü
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      // Sayısal karşılaştırma
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      // String karşılaştırması (fallback)
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [rawItems, sortBy, sortOrder, filters]);

  // 🎯 COMPUTED VALUES
  const totalElements = useMemo(() => items.length, [items]);
  const isEmpty = useMemo(
    () => !loading && items.length === 0,
    [loading, items]
  );
  const hasError = useMemo(() => !!error, [error]);

  return {
    // API State
    loading,
    error: error as Error | null,
    refetch,

    // Data
    items,
    rawItems,

    // Computed Values
    totalElements,
    isEmpty,
    hasError,
  };
};
