"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponseDto, PageOrderDto } from "@/types";

/**
 * Tedarikçiye ait siparişleri getirir
 *
 * @param supplierId - Tedarikçi ID'si
 * @returns Sayfalanmış sipariş listesi
 *
 * API Endpoint: GET /supply/orders/by-supplier/{supplierId}
 */
export const useSupplierOrders = (supplierId: number | null) => {
  return useGet<ApiResponseDto<PageOrderDto>>(
    supplierId ? API_ENDPOINTS.SUPPLY.ORDERS.BY_SUPPLIER(supplierId) : null
  );
};
