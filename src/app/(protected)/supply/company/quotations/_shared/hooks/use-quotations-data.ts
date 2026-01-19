"use client";

import { useMemo } from "react";
import type { QuotationDto } from "@/types";
import type { SortField, SortOrder } from "../types";

import { useGetQuotationsByCompany } from "./api";

/**
 * 🔍 QUOTATIONS DATA HOOK
 * Teklif verilerini ve API çağrılarını yöneten hook
 */
export const useQuotationsData = (
  companyId: number,
  sortBy: SortField,
  sortOrder: SortOrder
) => {
  // 📊 API DATA
  const { data, loading, error, refetch } =
    useGetQuotationsByCompany(companyId);

  // 📦 DATA
  const quotations = useMemo<QuotationDto[]>(() => {
    if (!data?.data?.content || !Array.isArray(data.data.content)) return [];
    const filteredData = data.data.content.filter(
      (q) => q && typeof q === "object"
    );

    // Sıralama yok ise, default haliyle dön
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

      // Tarih sıralaması
      if (sortBy === "createdAt" || sortBy === "validUntil") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      // Sayısal veya tarih karşılaştırması
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      // String karşılaştırması (fallback)
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [data, sortBy, sortOrder]);

  // 🎯 COMPUTED VALUES
  const totalElements = useMemo(() => data?.data?.totalElements ?? 0, [data]);
  const totalPages = useMemo(() => data?.data?.totalPages ?? 0, [data]);
  const isEmpty = useMemo(
    () => !loading && quotations.length === 0,
    [loading, quotations]
  );
  const hasError = useMemo(() => !!error, [error]);

  return {
    // API State
    loading,
    error: error as Error | null,
    refetch,

    // Data
    quotations,

    // Computed Values
    totalElements,
    totalPages,
    isEmpty,
    hasError,
  };
};
