"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseDto, RFQDto } from "@/types";

interface UseRFQByIdReturn {
  rfq: RFQDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir RFQ verisi getiren hook
 * @param id - RFQ ID'si
 * @returns RFQ verisi ve yönetim fonksiyonları
 */
export const useRFQById = (id: number): UseRFQByIdReturn => {
  const {
    data: rfqResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<RFQDto>>(
    id ? API_ENDPOINTS.SUPPLY.RFQS.BY_ID(id) : null
  );

  return {
    rfq: rfqResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
