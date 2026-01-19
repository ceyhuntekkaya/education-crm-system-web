"use client";

import { useMemo } from "react";
import { useSupplierSummary } from "./api";
import { SupplierSummaryDto } from "@/types/dto/supply";

/**
 * Tedarikçi dashboard verilerini getirir ve işler
 *
 * @param supplierId - Tedarikçi ID'si
 * @returns Dashboard verileri, loading ve error durumları
 */
export const useSupplierDashboard = (supplierId: number | null) => {
  // API'den veri çek
  const {
    data: summaryResponse,
    loading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useSupplierSummary(supplierId);

  // Summary verisini çıkar
  const summary = useMemo<SupplierSummaryDto>(() => {
    return (
      summaryResponse?.data ?? {
        totalSales: 0,
        activeQuotations: 0,
        pendingQuotations: 0,
        submittedQuotations: 0,
        acceptedQuotations: 0,
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalProducts: 0,
        activeProducts: 0,
        averageRating: 0,
        totalRatings: 0,
      }
    );
  }, [summaryResponse]);

  return {
    summary,
    summaryLoading,
    summaryError,
    refetchSummary,
  };
};
