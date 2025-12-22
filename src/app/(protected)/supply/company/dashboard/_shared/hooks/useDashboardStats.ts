"use client";

import { useActiveOrders } from "./useActiveOrders";

/**
 * Dashboard istatistiklerini döndürür
 *
 * API Kaynağı:
 * - Aktif Siparişler: useActiveOrders hook'undan (CONFIRMED + PREPARING + SHIPPED)
 *
 * @param companyId - Şirket ID'si
 * @returns Dashboard istatistikleri, loading ve error durumları
 */
export const useDashboardStats = (companyId: number | null) => {
  // Active Orders Hook
  const { activeOrders, ordersLoading, ordersError, refetchOrders } =
    useActiveOrders(companyId);

  return {
    activeOrders,
    statsLoading: ordersLoading,
    statsError: ordersError,
    refetchStats: refetchOrders,
  };
};
