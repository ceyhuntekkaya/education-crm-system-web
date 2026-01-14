"use client";

import { useMemo } from "react";
import type { QuotationComparisonDto } from "@/types/dto/supply/quotation.dto";
import type { QuotationFilters } from "./use-quotations-filter";
import type { QuotationSortBy, SortOrder } from "./use-quotations-sort";

interface UseProcessedQuotationsParams {
  quotations: QuotationComparisonDto[];
  searchQuery: string;
  filters: QuotationFilters;
  sortBy: QuotationSortBy;
  sortOrder: SortOrder;
}

/**
 * 🔄 PROCESSED QUOTATIONS HOOK
 * Teklifleri arama, filtreleme ve sıralama ile işler
 */
export const useProcessedQuotations = ({
  quotations,
  searchQuery,
  filters,
  sortBy,
  sortOrder,
}: UseProcessedQuotationsParams) => {
  const processedQuotations = useMemo(() => {
    let result = [...quotations];

    // 1. Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((quotation) =>
        (quotation.supplierCompanyName || "").toLowerCase().includes(query)
      );
    }

    // 2. Apply status filter
    if (filters.status !== "ALL") {
      result = result.filter((q) => q.status === filters.status);
    }

    // 3. Apply amount filters
    if (filters.minAmount !== undefined) {
      result = result.filter((q) => (q.totalAmount ?? 0) >= filters.minAmount!);
    }
    if (filters.maxAmount !== undefined) {
      result = result.filter((q) => (q.totalAmount ?? 0) <= filters.maxAmount!);
    }

    // 4. Apply rating filter
    if (filters.minRating !== undefined) {
      result = result.filter(
        (q) => (q.averageRating ?? 0) >= filters.minRating!
      );
    }

    // 5. Apply valid date filters
    if (filters.validFrom) {
      const fromDate = new Date(filters.validFrom);
      result = result.filter((q) => {
        if (!q.validUntil) return false;
        const validDate = new Date(q.validUntil);
        return validDate >= fromDate;
      });
    }
    if (filters.validTo) {
      const toDate = new Date(filters.validTo);
      result = result.filter((q) => {
        if (!q.validUntil) return false;
        const validDate = new Date(q.validUntil);
        return validDate <= toDate;
      });
    }

    // 6. Apply sorting
    if (sortBy !== "none") {
      result.sort((a, b) => {
        let compareValue = 0;

        switch (sortBy) {
          case "totalAmount":
            compareValue = (a.totalAmount ?? 0) - (b.totalAmount ?? 0);
            break;
          case "deliveryDays":
            compareValue = (a.deliveryDays ?? 0) - (b.deliveryDays ?? 0);
            break;
          case "averageRating":
            compareValue = (a.averageRating ?? 0) - (b.averageRating ?? 0);
            break;
          case "supplierName":
            compareValue = (a.supplierCompanyName || "").localeCompare(
              b.supplierCompanyName || ""
            );
            break;
        }

        return sortOrder === "asc" ? compareValue : -compareValue;
      });
    }

    return result;
  }, [quotations, searchQuery, filters, sortBy, sortOrder]);

  return processedQuotations;
};
