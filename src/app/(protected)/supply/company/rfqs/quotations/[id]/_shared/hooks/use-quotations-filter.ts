"use client";

import { useState, useMemo, useCallback } from "react";
import type { QuotationComparisonDtoStatus } from "@/types/supply/quotation";

export interface QuotationFilters {
  status: QuotationComparisonDtoStatus | "ALL";
  minAmount?: number;
  maxAmount?: number;
  minRating?: number;
  validFrom?: string;
  validTo?: string;
}

/**
 * 🔍 QUOTATIONS FILTER HOOK
 * Teklif filtreleme işlemleri
 */
export const useQuotationsFilter = () => {
  const [filters, setFilters] = useState<QuotationFilters>({
    status: "ALL",
  });

  // Filter handlers
  const filterHandlers = useMemo(
    () => ({
      setStatus: (status: QuotationComparisonDtoStatus | "ALL") => {
        setFilters((prev) => ({ ...prev, status }));
      },
      setMinAmount: (minAmount?: number) => {
        setFilters((prev) => ({ ...prev, minAmount }));
      },
      setMaxAmount: (maxAmount?: number) => {
        setFilters((prev) => ({ ...prev, maxAmount }));
      },
      setMinRating: (minRating?: number) => {
        setFilters((prev) => ({ ...prev, minRating }));
      },
      setValidFrom: (validFrom?: string) => {
        setFilters((prev) => ({ ...prev, validFrom }));
      },
      setValidTo: (validTo?: string) => {
        setFilters((prev) => ({ ...prev, validTo }));
      },
      resetFilters: () => {
        setFilters({
          status: "ALL",
        });
      },
    }),
    []
  );

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== "ALL") count++;
    if (filters.minAmount !== undefined) count++;
    if (filters.maxAmount !== undefined) count++;
    if (filters.minRating !== undefined) count++;
    if (filters.validFrom !== undefined) count++;
    if (filters.validTo !== undefined) count++;
    return count;
  }, [filters]);

  return {
    filters,
    filterHandlers,
    activeFilterCount,
  };
};
