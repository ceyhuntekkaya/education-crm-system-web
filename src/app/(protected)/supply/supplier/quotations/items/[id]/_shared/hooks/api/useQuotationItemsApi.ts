"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseListQuotationItemDto } from "@/types";

// ================== API HOOKS ==================

/**
 * Quotation'ın kalemlerini getirir
 *
 * @param quotationId - Quotation ID'si
 * @returns Quotation kalemleri listesi
 *
 * API Endpoint: GET /supply/quotations/{id}/items
 */
export const useGetQuotationItems = (
  quotationId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseListQuotationItemDto>(
    quotationId
      ? API_ENDPOINTS.SUPPLY.QUOTATION_ITEMS.GET_ALL(quotationId)
      : null,
    {
      enabled: options?.enabled ?? !!quotationId,
    },
  );
};
