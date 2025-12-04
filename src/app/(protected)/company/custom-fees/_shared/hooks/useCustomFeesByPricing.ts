"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CustomFeeDto } from "@/types";

interface UseCustomFeesBySchoolReturn {
  customFees: CustomFeeDto[];
  customFeeLoading: boolean;
  customFeeError: string | null;
  refetchCustomFees: () => void;
}

/**
 * Seçili Kurum için custom fee verilerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Custom fee verileri ve yönetim fonksiyonları
 */
export const useCustomFeesByPricing = (
  schoolId: number | null
): UseCustomFeesBySchoolReturn => {
  const {
    data: customFeesResponse,
    loading: customFeeLoading,
    error: customFeeError,
    refetch: refetchCustomFees,
  } = useGet<ApiResponseDto<CustomFeeDto[]>>(
    schoolId ? API_ENDPOINTS.PRICING.CUSTOM_FEES_BY_SCHOOL(schoolId) : null
  );

  return {
    customFees: customFeesResponse?.data || [],
    customFeeLoading,
    customFeeError,
    refetchCustomFees,
  };
};
