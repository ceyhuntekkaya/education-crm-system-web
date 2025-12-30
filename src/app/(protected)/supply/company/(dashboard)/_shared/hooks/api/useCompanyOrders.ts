"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, OrderDto, PageOrderDto } from "@/types";

/**
 * Şirkete ait siparişleri getirir
 *
 * @param companyId - Şirket ID'si
 * @returns Sayfalanmış sipariş listesi
 *
 * API Endpoint: GET /supply/orders/by-company/{companyId}
 */
export const useCompanyOrders = (companyId: number | null) => {
  return useGet<ApiResponseDto<PageOrderDto>>(
    companyId ? API_ENDPOINTS.SUPPLY.ORDERS.BY_COMPANY(companyId) : null
  );
};
