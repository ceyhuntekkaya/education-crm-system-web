"use client";

import { useMemo } from "react";
import type { SupplierDto } from "@/types";
import type { SortField, SortOrder, FilterState } from "../types";

import { useGetAllSuppliers } from "./api";

/**
 * 🔍 SUPPLIERS DATA HOOK
 * Tedarikçi verilerini ve API çağrılarını yöneten hook
 */
export const useSuppliersData = (
  companyId: number,
  sortBy: SortField,
  sortOrder: SortOrder,
  filters: FilterState
) => {
  // 📊 API DATA
  const { data, loading, error, refetch } = useGetAllSuppliers();

  // 📦 DATA WITH FILTERS AND SORTING
  const suppliers = useMemo<SupplierDto[]>(() => {
    if (!data?.data?.content || !Array.isArray(data.data.content)) return [];

    let filteredData = data.data.content.filter(
      (supplier) => supplier && typeof supplier === "object"
    );

    // 🔍 APPLY FILTERS

    // Active status filter
    if (filters.isActive !== "ALL") {
      const isActiveValue = filters.isActive === "true";
      filteredData = filteredData.filter(
        (supplier) => supplier.isActive === isActiveValue
      );
    }

    // Rating filter
    if (filters.minRating !== null) {
      filteredData = filteredData.filter(
        (supplier) => (supplier.averageRating ?? 0) >= filters.minRating!
      );
    }

    // Date range filter (createdAt)
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filteredData = filteredData.filter((supplier) => {
        if (!supplier.createdAt) return false;
        return new Date(supplier.createdAt) >= fromDate;
      });
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      filteredData = filteredData.filter((supplier) => {
        if (!supplier.createdAt) return false;
        return new Date(supplier.createdAt) <= toDate;
      });
    }

    // Search filter (companyName, email, phone)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filteredData = filteredData.filter(
        (supplier) =>
          supplier.companyName?.toLowerCase().includes(query) ||
          supplier.email?.toLowerCase().includes(query) ||
          supplier.phone?.toLowerCase().includes(query) ||
          supplier.taxNumber?.toLowerCase().includes(query)
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
      if (sortBy === "createdAt") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      // String karşılaştırması (companyName)
      if (sortBy === "companyName") {
        const comparison = (aValue as string).localeCompare(bValue as string);
        return sortOrder === "asc" ? comparison : -comparison;
      }

      // Sayısal karşılaştırması (averageRating)
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortBy, sortOrder, filters]);

  // 📊 TOTAL ELEMENTS
  const totalElements = data?.data?.totalElements ?? 0;

  // 📊 IS EMPTY
  const isEmpty = !loading && (!suppliers || suppliers.length === 0);

  return {
    suppliers,
    loading,
    error,
    totalElements,
    isEmpty,
    refetch,
  };
};
