"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CustomFeeDto } from "@/types";

interface UseCustomFeeByIdReturn {
  customFee: CustomFeeDto | null;
  customFeeLoading: boolean;
  customFeeError: string | null;
  refetchCustomFee: () => void;
}

/**
 * ID'ye göre custom fee detayını getiren hook
 * @param id - Custom fee ID
 * @returns Custom fee detayı ve yönetim fonksiyonları
 */
export const useCustomFeeById = (
  id: number | string | null
): UseCustomFeeByIdReturn => {
  const {
    data: customFeeResponse,
    loading: customFeeLoading,
    error: customFeeError,
    refetch: refetchCustomFee,
  } = useGet<ApiResponseDto<CustomFeeDto>>(
    id && id !== "new" ? API_ENDPOINTS.PRICING.CUSTOM_FEE_BY_ID(id) : null
  );

  return {
    customFee: customFeeResponse?.data || null,
    customFeeLoading,
    customFeeError,
    refetchCustomFee,
  };
};
