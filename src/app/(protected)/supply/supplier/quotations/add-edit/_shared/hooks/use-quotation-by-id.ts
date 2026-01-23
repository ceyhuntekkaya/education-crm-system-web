"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseDto, QuotationDto } from "@/types";

/**
 * Quotation by ID hook'u
 */
export const useQuotationById = (quotationId: number | null) => {
  const {
    data: quotationResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<QuotationDto>>(
    quotationId ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_ID(quotationId) : null
  );

  return {
    quotation: quotationResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
