"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponseSupplierSummaryDto } from "@/types/dto/supply";

/**
 * Tedarikçi özet istatistiklerini getirir
 *
 * @param supplierId - Tedarikçi ID'si
 * @returns Tedarikçi özet verileri
 *
 * API Endpoint: GET /supply/dashboard/supplier/summary
 */
export const useSupplierSummary = (supplierId: number | null) => {
  const url = supplierId
    ? API_ENDPOINTS.SUPPLY.DASHBOARD.SUPPLIER_SUMMARY(supplierId)
    : null;

  return useGet<ApiResponseSupplierSummaryDto>(url);
};
