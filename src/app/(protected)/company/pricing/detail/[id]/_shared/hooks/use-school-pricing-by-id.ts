"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SchoolPricingDto } from "@/types";

interface UseSchoolPricingByIdReturn {
  pricing: SchoolPricingDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir school pricing verisi getiren hook
 * @param id - Pricing ID'si
 * @returns Pricing verisi ve yönetim fonksiyonları
 */
export const useSchoolPricingById = (
  id: number
): UseSchoolPricingByIdReturn => {
  const {
    data: schoolPricingResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SchoolPricingDto[]>>(
    id ? API_ENDPOINTS.PRICING.SCHOOL_PRICING_BY_ID(id) : null
  );

  return {
    pricing: schoolPricingResponse?.data?.[0] || null,
    isLoading,
    error,
    refetch,
  };
};
