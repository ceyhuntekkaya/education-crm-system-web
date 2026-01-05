"use client";

import { useMemo } from "react";
import type { RFQDto } from "@/types";
import type { SortField, SortOrder, FilterState } from "../types";

import { useGetRFQsByCompany } from "./api";

/**
 * 🔍 RFQS DATA HOOK
 * Teklif talebi verilerini ve API çağrılarını yöneten hook
 */
export const useRFQsData = (
  companyId: number,
  sortBy: SortField,
  sortOrder: SortOrder,
  filters: FilterState
) => {
  // 📊 API DATA
  const { data, loading, error, refetch } = useGetRFQsByCompany(companyId);

  // 📦 DATA WITH FILTERS AND SORTING
  const rfqs = useMemo<RFQDto[]>(() => {
    if (!data?.data?.content || !Array.isArray(data.data.content)) return [];

    let filteredData = data.data.content.filter(
      (rfq) => rfq && typeof rfq === "object"
    );

    // 🔍 APPLY FILTERS

    // Status filter
    if (filters.status !== "ALL") {
      filteredData = filteredData.filter(
        (rfq) => rfq.status === filters.status
      );
    }

    // Type filter
    if (filters.type !== "ALL") {
      filteredData = filteredData.filter((rfq) => rfq.rfqType === filters.type);
    }

    // Date range filter (createdAt)
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filteredData = filteredData.filter((rfq) => {
        if (!rfq.createdAt) return false;
        return new Date(rfq.createdAt) >= fromDate;
      });
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      filteredData = filteredData.filter((rfq) => {
        if (!rfq.createdAt) return false;
        return new Date(rfq.createdAt) <= toDate;
      });
    }

    // Search filter (title)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filteredData = filteredData.filter((rfq) =>
        rfq.title?.toLowerCase().includes(query)
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

      // Tarih sıralaması
      if (
        sortBy === "createdAt" ||
        sortBy === "submissionDeadline" ||
        sortBy === "expectedDeliveryDate"
      ) {
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
  }, [data, sortBy, sortOrder, filters]);

  // 🎯 COMPUTED VALUES
  const totalElements = useMemo(() => data?.data?.totalElements ?? 0, [data]);
  const totalPages = useMemo(() => data?.data?.totalPages ?? 0, [data]);
  const isEmpty = useMemo(() => !loading && rfqs.length === 0, [loading, rfqs]);
  const hasError = useMemo(() => !!error, [error]);

  return {
    // API State
    loading,
    error: error as Error | null,
    refetch,

    // Data
    rfqs,

    // Computed Values
    totalElements,
    totalPages,
    isEmpty,
    hasError,
  };
};
