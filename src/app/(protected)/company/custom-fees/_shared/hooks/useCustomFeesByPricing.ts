"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CustomFeeDto } from "@/types";

interface UseCustomFeesByPricingReturn {
  customFees: CustomFeeDto[];
  customFeeLoading: boolean;
  customFeeError: string | null;
  refetchCustomFees: () => void;
}

/**
 * Seçili pricing için custom fee verilerini yöneten hook
 * @param pricingId - Pricing ID'si
 * @returns Custom fee verileri ve yönetim fonksiyonları
 */
export const useCustomFeesByPricing = (
  pricingId: number | null
): UseCustomFeesByPricingReturn => {
  const {
    data: customFeesResponse,
    loading: customFeeLoading,
    error: customFeeError,
    refetch: refetchCustomFees,
  } = useGet<ApiResponseDto<CustomFeeDto[]>>(
    pricingId ? API_ENDPOINTS.PRICING.CUSTOM_FEES_BY_PRICING(pricingId) : null
  );

  return {
    customFees: customFeesResponse?.data || [],
    customFeeLoading,
    customFeeError,
    refetchCustomFees,
  };
};
