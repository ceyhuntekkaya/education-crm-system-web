"use client";

import { useActiveOrders } from "./useActiveOrders";
import { usePendingQuotations } from "./usePendingQuotations";

/**
 * Dashboard istatistiklerini döndürür
 *
 * API Kaynağı:
 * - Aktif Siparişler: useActiveOrders hook'undan (CONFIRMED + PREPARING + SHIPPED)
 * - Bekleyen Teklifler: usePendingQuotations hook'undan (SUBMITTED + UNDER_REVIEW + ACCEPTED)
 *
 * @param companyId - Şirket ID'si
 * @returns Dashboard istatistikleri, loading ve error durumları
 */
export const useDashboardStats = (companyId: number | null) => {
  // Active Orders Hook
  const { activeOrders, ordersLoading, ordersError, refetchOrders } =
    useActiveOrders(companyId);

  // Pending Quotations Hook
  const {
    pendingQuotations,
    quotationsLoading,
    quotationsError,
    refetchQuotations,
  } = usePendingQuotations(companyId);

  // Combined loading & error states
  const isLoading = ordersLoading || quotationsLoading;
  const error = ordersError || quotationsError;

  // Combined refetch function
  const refetchAll = () => {
    refetchOrders();
    refetchQuotations();
  };

  return {
    activeOrders,
    pendingQuotations,
    statsLoading: isLoading,
    statsError: error,
    refetchStats: refetchAll,
  };
};
