"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SchoolPricingDto } from "@/types";

interface UseInstitutionPricingHookParams {
  schoolId: string;
}

export function useInstitutionPricingHook({
  schoolId,
}: UseInstitutionPricingHookParams) {
  const {
    data: pricingResponse,
    loading: pricingLoading,
    error: pricingError,
    refetch: refetchPricing,
  } = useGet<ApiResponseDto<SchoolPricingDto[]>>(
    schoolId ? API_ENDPOINTS.PRICING.SCHOOL_PRICING(schoolId) : null
  );

  return {
    pricings: pricingResponse?.data || [],
    loading: pricingLoading,
    error: pricingError,
    refetch: refetchPricing,
  };
}

export default useInstitutionPricingHook;
