"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageQuotationDto,
  GetQuotationsByCompanyParams,
} from "@/types";

// ================== API HOOKS ==================

/**
 * Tedarikçiye ait teklifleri getirir
 *
 * @param supplierId - Tedarikçi ID'si
 * @param params - Sayfalama parametreleri
 * @returns Teklif listesi
 *
 * API Endpoint: GET /supply/quotations/by-supplier/{supplierId}
 */
export const useGetQuotationsBySupplier = (
  supplierId: number,
  params?: GetQuotationsByCompanyParams,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageQuotationDto>(
    supplierId ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_SUPPLIER(supplierId) : null,
    {
      params: params as Record<string, unknown>,
      enabled: options?.enabled ?? !!supplierId,
    },
  );
};
