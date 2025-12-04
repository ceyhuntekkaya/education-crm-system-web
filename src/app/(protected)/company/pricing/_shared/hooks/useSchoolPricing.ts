"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SchoolPricingDto } from "@/types";

interface UseSchoolPricingReturn {
  schoolPricings: SchoolPricingDto[];
  pricingLoading: boolean;
  pricingError: string | null;
  refetchPricings: () => void;
}

/**
 * Seçili Kurum için pricing verilerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Pricing verileri ve yönetim fonksiyonları
 */
export const useSchoolPricing = (schoolId: number | null): UseSchoolPricingReturn => {
  const {
    data: schoolPricingsResponse,
    loading: pricingLoading,
    error: pricingError,
    refetch: refetchPricings,
  } = useGet<ApiResponseDto<SchoolPricingDto[]>>(
    schoolId ? API_ENDPOINTS.PRICING.SCHOOL_PRICING(schoolId) : null
  );

  return {
    schoolPricings: schoolPricingsResponse?.data || [],
    pricingLoading,
    pricingError,
    refetchPricings,
  };
};
