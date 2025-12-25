"use client";

import { useMemo } from "react";
import { useCompanyOrders, OrderDto } from "./api";

/**
 * Tüm siparişleri ve aktif siparişleri getirir
 *
 * @param companyId - Şirket ID'si
 * @returns Tüm siparişler, aktif siparişler, loading ve error durumları
 */
export const useOrders = (companyId: number | null) => {
  // Tüm siparişleri getir (filtrelenmemiş)
  const {
    data: ordersResponse,
    loading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useCompanyOrders(companyId);

  // Siparişleri çıkar
  const orders = useMemo(() => {
    return ordersResponse?.data?.content ?? [];
  }, [ordersResponse]);

  // Aktif siparişleri filtrele: CONFIRMED, PREPARING, SHIPPED
  const activeOrders = useMemo(() => {
    return orders.filter((order) =>
      ["CONFIRMED", "PREPARING", "SHIPPED"].includes(order.status ?? "")
    );
  }, [orders]);

  return {
    orders,
    activeOrders,
    ordersLoading,
    ordersError,
    refetchOrders,
  };
};
