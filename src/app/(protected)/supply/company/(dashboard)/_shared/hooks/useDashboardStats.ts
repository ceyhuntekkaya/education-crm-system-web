"use client";

import { useActiveOrders } from "./useActiveOrders";
import { usePendingQuotations } from "./usePendingQuotations";
import { useActiveRFQs } from "./useActiveRFQs";

/**
 * Dashboard istatistiklerini döndürür
 *
 * API Kaynağı:
 * - Aktif Siparişler: useActiveOrders hook'undan (CONFIRMED + PREPARING + SHIPPED)
 * - Bekleyen Teklifler: usePendingQuotations hook'undan (SUBMITTED + UNDER_REVIEW + ACCEPTED)
 * - Aktif İlanlar: useActiveRFQs hook'undan (PUBLISHED)
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

  // Active RFQs Hook
  const { activeRFQs, rfqsLoading, rfqsError, refetchRFQs } =
    useActiveRFQs(companyId);

  // Combined loading & error states
  const isLoading = ordersLoading || quotationsLoading || rfqsLoading;
  const error = ordersError || quotationsError || rfqsError;

  // Combined refetch function
  const refetchAll = () => {
    refetchOrders();
    refetchQuotations();
    refetchRFQs();
  };

  return {
    activeOrders,
    pendingQuotations,
    activeRFQs,
    statsLoading: isLoading,
    statsError: error,
    refetchStats: refetchAll,
  };
};
