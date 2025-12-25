"use client";

import { useMemo } from "react";
import { useCompanyOrders, OrderDto } from "./api";

/**
 * Aktif siparişleri getirir ve filtreler
 * Aktif Durumlar: CONFIRMED, PREPARING, SHIPPED
 *
 * @param companyId - Şirket ID'si
 * @returns Aktif siparişler, loading ve error durumları
 */
export const useActiveOrders = (companyId: number | null) => {
  const {
    data: ordersResponse,
    loading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useCompanyOrders(companyId);

  // Aktif siparişleri filtrele: CONFIRMED, PREPARING, SHIPPED
  const activeOrders = useMemo(() => {
    const orders = ordersResponse?.data?.content ?? [];
    return orders.filter((order) =>
      ["CONFIRMED", "PREPARING", "SHIPPED"].includes(order.status ?? "")
    );
  }, [ordersResponse]);

  return {
    activeOrders,
    ordersLoading,
    ordersError,
    refetchOrders,
  };
};
