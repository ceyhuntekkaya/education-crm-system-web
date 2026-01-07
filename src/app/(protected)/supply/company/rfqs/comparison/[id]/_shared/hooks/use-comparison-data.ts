"use client";

import { useGetRFQComparison } from "./api";
import type { QuotationComparisonDto } from "../types";

/**
 * Teklif karşılaştırma verilerini yönetir
 */
export const useComparisonData = (rfqId: number) => {
  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGetRFQComparison(rfqId);

  const comparisons: QuotationComparisonDto[] = response?.data || [];

  return {
    comparisons,
    loading,
    error: error ? "Karşılaştırma verileri yüklenirken hata oluştu" : null,
    refetch,
  };
};
