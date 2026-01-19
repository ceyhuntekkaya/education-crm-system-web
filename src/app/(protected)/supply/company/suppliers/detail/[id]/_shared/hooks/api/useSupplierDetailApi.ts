"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseSupplierDto } from "@/types";

/**
 * Tedarikçi detayını getirir
 *
 * @param supplierId - Tedarikçi ID
 * @returns Tedarikçi detayı
 *
 * API Endpoint: GET /supply/suppliers/:id
 * Example: https://api.egitimiste.com/api/supply/suppliers/1
 */
export const useSupplierById = (supplierId: number) => {
  return useGet<ApiResponseSupplierDto>(
    supplierId > 0
      ? `${API_ENDPOINTS.SUPPLY.SUPPLIERS.GET_ALL}/${supplierId}`
      : null,
    {
      enabled: supplierId > 0,
    }
  );
};
