"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseQuotationDto } from "@/types";

/**
 * Teklif detayını ID'ye göre getirir
 *
 * @param quotationId - Teklif ID'si
 * @returns Teklif detayı
 *
 * API Endpoint: GET /supply/quotations/{id}
 */
export const useQuotationById = (quotationId: number) => {
  const { data, loading, error, refetch } = useGet<ApiResponseQuotationDto>(
    quotationId > 0 ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_ID(quotationId) : null,
  );

  return {
    quotation: data?.data ?? null,
    isLoading: loading,
    error: error,
    refetch,
  };
};
