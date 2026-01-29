"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseListQuotationItemDto } from "@/types";

/**
 * Quotation'ın kalemlerini getirir
 *
 * @param quotationId - Quotation ID'si
 * @returns Quotation kalemleri listesi
 *
 * API Endpoint: GET /supply/quotations/{id}/items
 */
export const useQuotationItemsApi = (quotationId: number) => {
  const { data, loading, error, refetch } =
    useGet<ApiResponseListQuotationItemDto>(
      quotationId > 0
        ? API_ENDPOINTS.SUPPLY.QUOTATION_ITEMS.GET_ALL(quotationId)
        : null,
    );

  return {
    items: data?.data ?? [],
    isLoading: loading,
    error: error,
    refetch,
  };
};
