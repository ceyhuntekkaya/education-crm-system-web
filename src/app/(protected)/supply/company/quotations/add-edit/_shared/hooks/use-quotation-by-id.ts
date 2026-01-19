"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseQuotationDto } from "@/types";

/**
 * Quotation detayını getirir
 * API Response: ApiResponseQuotationDto { success, message, data: QuotationDto }
 */
export const useQuotationById = (quotationId: number | null) => {
  const {
    data: response,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseQuotationDto>(
    quotationId ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_ID(quotationId) : null,
    {
      enabled: !!quotationId,
    }
  );

  return {
    quotation: response?.data || null, // ApiResponse wrapper'dan data'yı çıkar
    isLoading,
    error,
    refetch,
  };
};
