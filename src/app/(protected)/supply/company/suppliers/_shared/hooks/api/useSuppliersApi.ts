"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponsePageSupplierDto } from "@/types";

// ================== API HOOKS ==================

/**
 * Tüm tedarikçileri getirir
 *
 * @param params - Sayfalama parametreleri
 * @returns Tedarikçiler listesi
 *
 * API Endpoint: GET /supply/suppliers
 */
export const useGetAllSuppliers = (
  params?: Record<string, unknown>,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponsePageSupplierDto>(
    API_ENDPOINTS.SUPPLY.SUPPLIERS.GET_ALL,
    {
      params,
      enabled: options?.enabled ?? true,
    }
  );
};
