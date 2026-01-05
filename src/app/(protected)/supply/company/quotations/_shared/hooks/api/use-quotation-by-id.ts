"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseDto, QuotationDto } from "@/types";

interface UseQuotationByIdReturn {
  quotation: QuotationDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir quotation verisi getiren hook
 * @param id - Quotation ID'si
 * @returns Quotation verisi ve yönetim fonksiyonları
 */
export const useQuotationById = (id: number): UseQuotationByIdReturn => {
  const {
    data: quotationResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<QuotationDto>>(
    id ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_ID(id) : null
  );

  return {
    quotation: quotationResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};

