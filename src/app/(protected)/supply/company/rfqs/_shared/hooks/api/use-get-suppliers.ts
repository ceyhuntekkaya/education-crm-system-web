"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";

/**
 * Tüm tedarikçileri getirir
 *
 * @returns Tedarikçi listesi
 *
 * API Endpoint: GET /supply/suppliers
 */
export const useGetSuppliers = (options?: { enabled?: boolean }) => {
  return useGet<any>(
    API_ENDPOINTS.SUPPLY.SUPPLIERS.LIST,
    {
      enabled: options?.enabled ?? true,
    }
  );
};
